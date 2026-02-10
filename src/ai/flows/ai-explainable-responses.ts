'use server';

/**
 * @fileOverview Implements the AI-assisted guidance flow with explainable responses.
 *
 * - aiExplainableResponses - A function that handles the AI interaction process.
 * - AIExplainableResponsesInput - The input type for the aiExplainableResponses function.
 * - AIExplainableResponsesOutput - The return type for the aiExplainableResponses function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIExplainableResponsesInputSchema = z.object({
  query: z.string().describe('The user query.'),
});
export type AIExplainableResponsesInput = z.infer<typeof AIExplainableResponsesInputSchema>;

const AIExplainableResponsesOutputSchema = z.object({
  response: z.string().describe('The AI response to the query.'),
  explanation: z.string().describe('The explanation for the AI response, including source category and reasoning.'),
  sourceCategory: z.string().describe('The category of the source used to generate the response.'),
  disclaimer: z.string().describe('A disclaimer message.'),
});
export type AIExplainableResponsesOutput = z.infer<typeof AIExplainableResponsesOutputSchema>;

export async function aiExplainableResponses(input: AIExplainableResponsesInput): Promise<AIExplainableResponsesOutput> {
  return aiExplainableResponsesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiExplainableResponsesPrompt',
  input: {schema: AIExplainableResponsesInputSchema},
  output: {schema: AIExplainableResponsesOutputSchema},
  prompt: `You are a helpful AI assistant providing guidance to caregivers of children with ASD and related neurodevelopmental conditions.
  Provide an explainable response, including the source category and reasoning behind the recommendations, so the caregiver can understand the context and make informed decisions.

  User Query: {{{query}}}

  Your response should include:
  - response: The AI response to the query.
  - explanation: The explanation for the AI response, including source category and reasoning.
  - sourceCategory: The category of the source used to generate the response.
  - disclaimer: A disclaimer message stating that this is not a diagnostic or treatment tool.
  `,
});

const aiExplainableResponsesFlow = ai.defineFlow(
  {
    name: 'aiExplainableResponsesFlow',
    inputSchema: AIExplainableResponsesInputSchema,
    outputSchema: AIExplainableResponsesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
