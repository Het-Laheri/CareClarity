'use server';

/**
 * @fileOverview This file implements the AI safety validation flow.
 *
 * It includes:
 * - `validateResponse` - A function to validate AI responses for safety and compliance.
 * - `SafetyValidationInput` - The input type for the `validateResponse` function.
 * - `SafetyValidationOutput` - The output type for the `validateResponse` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SafetyValidationInputSchema = z.object({
  response: z.string().describe('The AI generated response to validate.'),
});
export type SafetyValidationInput = z.infer<typeof SafetyValidationInputSchema>;

const SafetyValidationOutputSchema = z.object({
  isSafe: z.boolean().describe('Whether the response is safe and compliant.'),
  reason: z.string().describe('The reason for the safety determination.'),
});
export type SafetyValidationOutput = z.infer<typeof SafetyValidationOutputSchema>;

export async function validateResponse(input: SafetyValidationInput): Promise<SafetyValidationOutput> {
  return safetyValidationFlow(input);
}

const safetyValidationPrompt = ai.definePrompt({
  name: 'safetyValidationPrompt',
  input: {schema: SafetyValidationInputSchema},
  output: {schema: SafetyValidationOutputSchema},
  prompt: `You are a safety validation expert.

You will receive an AI generated response, and you will determine if it is safe and compliant with the following rules:

1.  The response must not diagnose any condition.
2.  The response must not recommend medication.
3.  The response must not suggest therapy plans.
4.  The response must not provide any medical advice.
5.  The response must not provide any harmful or inappropriate guidance, and be in line with providing assistance to parents and caregivers of children with Autism Spectrum Disorder (ASD) and related neurodevelopmental conditions.

Response to validate: {{{response}}}

Based on these rules, determine if the response is safe and compliant. Explain your reasoning.
`,
});

const safetyValidationFlow = ai.defineFlow(
  {
    name: 'safetyValidationFlow',
    inputSchema: SafetyValidationInputSchema,
    outputSchema: SafetyValidationOutputSchema,
  },
  async input => {
    const {output} = await safetyValidationPrompt(input);
    return output!;
  }
);
