'use server';
/**
 * @fileOverview A Genkit flow for generating background music based on a text prompt and desired duration.
 *
 * - generateMusicWithDuration - A function that handles the music generation process.
 * - GenerateMusicWithDurationInput - The input type for the generateMusicWithDuration function.
 * - GenerateMusicWithDurationOutput - The return type for the generateMusicWithDuration function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMusicWithDurationInputSchema = z.object({
  prompt: z.string().describe('A descriptive text prompt for the music to be generated.'),
  durationSeconds: z.union([z.literal(15), z.literal(30)]).describe('The desired duration of the music in seconds (15 or 30).'),
});
export type GenerateMusicWithDurationInput = z.infer<typeof GenerateMusicWithDurationInputSchema>;

const GenerateMusicWithDurationOutputSchema = z.object({
  audioDataUri: z
    .string()
    .describe('The generated audio as a data URI (e.g., data:audio/wav;base64,...).'),
});
export type GenerateMusicWithDurationOutput = z.infer<typeof GenerateMusicWithDurationOutputSchema>;

/**
 * Calls the external MusicGen FastAPI backend to generate music.
 * In a real application, the `MUSICGEN_API_URL` would be configured via environment variables.
 * This tool assumes the FastAPI endpoint returns a JSON object with `audioDataUri`.
 */
const callMusicGenAPI = ai.defineTool(
  {
    name: 'callMusicGenAPI',
    description: 'Generates music using an external MusicGen FastAPI backend.',
    inputSchema: GenerateMusicWithDurationInputSchema,
    outputSchema: GenerateMusicWithDurationOutputSchema,
  },
  async (input) => {
    // In a real deployment, replace with your actual FastAPI backend URL
    const musicGenApiUrl = process.env.MUSICGEN_API_URL || 'http://localhost:8000';
    const response = await fetch(
      `${musicGenApiUrl}/generate?prompt=${encodeURIComponent(input.prompt)}&duration=${input.durationSeconds}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to generate music: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    if (!data.audioDataUri) {
      throw new Error('MusicGen API response did not contain audioDataUri.');
    }
    return {
      audioDataUri: data.audioDataUri,
    };
  }
);

export async function generateMusicWithDuration(
  input: GenerateMusicWithDurationInput
): Promise<GenerateMusicWithDurationOutput> {
  return generateMusicWithDurationFlow(input);
}

const generateMusicWithDurationFlow = ai.defineFlow(
  {
    name: 'generateMusicWithDurationFlow',
    inputSchema: GenerateMusicWithDurationInputSchema,
    outputSchema: GenerateMusicWithDurationOutputSchema,
  },
  async (input) => {
    const output = await callMusicGenAPI(input);
    return output;
  }
);
