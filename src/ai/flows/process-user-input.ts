'use server';

/**
 * @fileOverview A Genkit flow that processes user input to refine insurance plan recommendations.
 *
 * - processUserInputForRecommendations - A function that processes user inputs and returns refined insurance plan recommendations.
 * - ProcessUserInputForRecommendationsInput - The input type for the processUserInputForRecommendations function.
 * - ProcessUserInputForRecommendationsOutput - The return type for the processUserInputForRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProcessUserInputForRecommendationsInputSchema = z.object({
  age: z.number().describe('The age of the user.'),
  income: z.number().describe('The income of the user.'),
  familyStatus: z.string().describe('The family status of the user.'),
  healthCondition: z.string().describe('The health condition of the user.'),
  preferences: z.string().describe('The preferences of the user.'),
});
export type ProcessUserInputForRecommendationsInput = z.infer<
  typeof ProcessUserInputForRecommendationsInputSchema
>;

const ProcessUserInputForRecommendationsOutputSchema = z.string().describe('Refined insurance plan recommendations based on user input.');
export type ProcessUserInputForRecommendationsOutput = z.infer<
  typeof ProcessUserInputForRecommendationsOutputSchema
>;

export async function processUserInputForRecommendations(
  input: ProcessUserInputForRecommendationsInput
): Promise<ProcessUserInputForRecommendationsOutput> {
  return processUserInputForRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'processUserInputForRecommendationsPrompt',
  input: {schema: ProcessUserInputForRecommendationsInputSchema},
  output: {schema: ProcessUserInputForRecommendationsOutputSchema},
  prompt: `You are an AI assistant specializing in providing personalized insurance plan recommendations.

  Based on the following user information, refine the insurance plan recommendations to be as relevant as possible.

  Age: {{{age}}}
  Income: {{{income}}}
  Family Status: {{{familyStatus}}}
  Health Condition: {{{healthCondition}}}
  Preferences: {{{preferences}}}

  Provide a detailed recommendation.`,
});

const processUserInputForRecommendationsFlow = ai.defineFlow(
  {
    name: 'processUserInputForRecommendationsFlow',
    inputSchema: ProcessUserInputForRecommendationsInputSchema,
    outputSchema: ProcessUserInputForRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
