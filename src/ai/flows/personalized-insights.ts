'use server';
/**
 * @fileOverview This file contains the Genkit flow for providing personalized insights to users based on their logged data.
 *
 * - personalizedInsights - A function that orchestrates the process of analyzing user data and generating personalized insights.
 * - PersonalizedInsightsInput - The input type for the personalizedInsights function.
 * - PersonalizedInsightsOutput - The return type for the personalizedInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedInsightsInputSchema = z.object({
  goals: z.string().describe('The user specified goals for quitting drinking.'),
  activities: z.string().describe('The user activity logs, including triggers and progress.'),
});

export type PersonalizedInsightsInput = z.infer<typeof PersonalizedInsightsInputSchema>;

const PersonalizedInsightsOutputSchema = z.object({
  insights: z.string().describe('Personalized insights into the user\'s behavior and triggers.'),
  customizedTips: z.string().describe('Customized tips based on the user\'s tracked progress and goals.'),
});

export type PersonalizedInsightsOutput = z.infer<typeof PersonalizedInsightsOutputSchema>;

export async function personalizedInsights(input: PersonalizedInsightsInput): Promise<PersonalizedInsightsOutput> {
  return personalizedInsightsFlow(input);
}

const personalizedInsightsPrompt = ai.definePrompt({
  name: 'personalizedInsightsPrompt',
  input: {schema: PersonalizedInsightsInputSchema},
  output: {schema: PersonalizedInsightsOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized insights and customized tips to users who are trying to quit drinking.

  Analyze the user's goals and activity logs to identify patterns, triggers, and progress.

  Based on your analysis, provide personalized insights into the user's behavior and suggest coping strategies.

  Also, generate customized tips based on the user's tracked progress and goals to help them stay on track.

  Goals: {{{goals}}}
  Activity Logs: {{{activities}}}

  Insights and Tips:
`,
});

const personalizedInsightsFlow = ai.defineFlow(
  {
    name: 'personalizedInsightsFlow',
    inputSchema: PersonalizedInsightsInputSchema,
    outputSchema: PersonalizedInsightsOutputSchema,
  },
  async input => {
    const {output} = await personalizedInsightsPrompt(input);
    return output!;
  }
);
