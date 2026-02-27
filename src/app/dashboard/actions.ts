'use server';
import { z } from 'zod';
import { aiExplainableResponses } from '@/ai/flows/ai-explainable-responses';
import { validateResponse } from '@/ai/flows/ai-safety-validation';

const getAIResponseSchema = z.object({
  query: z.string().min(10, "Please enter a query of at least 10 characters."),
});

export type AIResponseState = {
  form: {
    query: string;
  };
  error?: string;
  result?: {
    response: string;
    explanation: string;
    sourceCategory: string;
    disclaimer: string;
  };
};

export async function getAIResponse(
  prevState: AIResponseState,
  formData: FormData
): Promise<AIResponseState> {
  const query = formData.get('query') as string;

  const validatedFields = getAIResponseSchema.safeParse({ query });

  if (!validatedFields.success) {
    return {
      form: { query },
      error: validatedFields.error.flatten().fieldErrors.query?.[0] || "Invalid input.",
    };
  }

  try {
    const aiResult = await aiExplainableResponses({ query: validatedFields.data.query });
    
    const safetyCheck = await validateResponse({ response: aiResult.response });

    if (!safetyCheck.isSafe) {
      return {
        form: { query },
        error: "The generated response was deemed unsafe and has been blocked. Please try rephrasing your query.",
        result: {
          response: "The generated response was blocked for safety reasons.",
          explanation: safetyCheck.reason,
          sourceCategory: "Safety Filter",
          disclaimer: "This tool is for informational purposes only and does not provide medical advice. Consult with a qualified healthcare professional for any medical concerns."
        }
      };
    }
    
    return {
      form: { query },
      result: aiResult,
    };
  } catch (e) {
    const error = e instanceof Error ? e.message : "An unexpected error occurred.";
    return {
      form: { query },
      error: `An error occurred: ${error}`,
    };
  }
}
