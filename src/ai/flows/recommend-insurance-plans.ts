'use server';

/**
 * @fileOverview Insurance plan recommendation AI agent.
 *
 * - recommendInsurancePlans - A function that handles the insurance plan recommendation process.
 * - RecommendInsurancePlansInput - The input type for the recommendInsurancePlans function.
 * - RecommendInsurancePlansOutput - The return type for the recommendInsurancePlans function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendInsurancePlansInputSchema = z.object({
  age: z.number().describe('The age of the customer.'),
  income: z.number().describe('The annual income of the customer.'),
  familyStatus: z
    .string()
    .describe(
      'The family status of the customer (e.g., single, married, divorced).' 
    ),
  healthCondition: z
    .string()
    .describe('The current health condition of the customer.'),
  preferences: z
    .string()
    .describe('Any specific insurance preferences of the customer.'),
});
export type RecommendInsurancePlansInput = z.infer<
  typeof RecommendInsurancePlansInputSchema
>;

const RecommendInsurancePlansOutputSchema = z.object({
  plans: z.array(
    z.object({
      name: z.string().describe('The name of the insurance plan.'),
      coverage: z.string().describe('The coverage details of the plan.'),
      premium: z.string().describe('The premium amount of the plan.'),
      benefits: z.string().describe('The benefits of the insurance plan.'),
    })
  ).describe('A list of recommended insurance plans.'),
});
export type RecommendInsurancePlansOutput = z.infer<
  typeof RecommendInsurancePlansOutputSchema
>;

export async function recommendInsurancePlans(
  input: RecommendInsurancePlansInput
): Promise<RecommendInsurancePlansOutput> {
  return recommendInsurancePlansFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendInsurancePlansPrompt',
  input: {schema: RecommendInsurancePlansInputSchema},
  output: {schema: RecommendInsurancePlansOutputSchema},
  prompt: `You are an AI assistant specialized in recommending insurance plans.

  Based on the customer's information and preferences, recommend suitable insurance plans.

  Customer Information:
  Age: {{{age}}}
  Income: {{{income}}}
  Family Status: {{{familyStatus}}}
  Health Condition: {{{healthCondition}}}
  Preferences: {{{preferences}}}

  Please provide a list of recommended insurance plans with their names, coverage details, premium amounts, and benefits.
  Ensure the recommendations align with the customer's needs and financial situation.
  Return the plans in JSON format.`,
});

const recommendInsurancePlansFlow = ai.defineFlow(
  {
    name: 'recommendInsurancePlansFlow',
    inputSchema: RecommendInsurancePlansInputSchema,
    outputSchema: RecommendInsurancePlansOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
