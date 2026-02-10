'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating activity ideas based on user input.
 *
 * The flow takes keywords related to a child's challenges or interests as input and returns AI-generated ideas for activities or interventions.
 *
 * @exports generateActivityIdeas - The main function to trigger the activity idea generation flow.
 * @exports GenerateActivityIdeasInput - The input type for the generateActivityIdeas function.
 * @exports GenerateActivityIdeasOutput - The output type for the generateActivityIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateActivityIdeasInputSchema = z.object({
  keywords: z
    .string()
    .describe(
      'Keywords related to the childs challenges or interests (e.g., sensory play, social skills, fine motor skills).'
    ),
});
export type GenerateActivityIdeasInput = z.infer<typeof GenerateActivityIdeasInputSchema>;

const GenerateActivityIdeasOutputSchema = z.object({
  ideas: z
    .string()
    .describe('A list of AI-generated ideas for activities or interventions.'),
});
export type GenerateActivityIdeasOutput = z.infer<typeof GenerateActivityIdeasOutputSchema>;

export async function generateActivityIdeas(
  input: GenerateActivityIdeasInput
): Promise<GenerateActivityIdeasOutput> {
  return generateActivityIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateActivityIdeasPrompt',
  input: {schema: GenerateActivityIdeasInputSchema},
  output: {schema: GenerateActivityIdeasOutputSchema},
  prompt: `You are an AI assistant that helps parents and caregivers of children with Autism Spectrum Disorder (ASD) and related neurodevelopmental conditions by generating ideas for activities or interventions.

  Based on the following keywords, generate a list of creative and engaging activity ideas. The ideas should be tailored to address the challenges or interests indicated by the keywords.

  Keywords: {{{keywords}}}

  Ideas:`,
});

const generateActivityIdeasFlow = ai.defineFlow(
  {
    name: 'generateActivityIdeasFlow',
    inputSchema: GenerateActivityIdeasInputSchema,
    outputSchema: GenerateActivityIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
