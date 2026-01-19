import { GoogleGenAI, Type } from "@google/genai";
import { PlaylistResponse, CurateOptions } from "../types";

const apiKey = process.env.API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export const generateCuratedPlaylist = async (
  prompt: string,
  options: CurateOptions
): Promise<PlaylistResponse> => {
  if (!apiKey) {
    throw new Error("API Key not found in environment variables.");
  }

  const model = "gemini-3-flash-preview";

  const systemInstruction = `
    You are CurateFlow, an intelligent video curation engine. 
    Your goal is to generate a structured YouTube playlist based on user intent.
    
    Adhere to these rules:
    1. STRICTLY respect the time constraints.
    2. Curate real, high-quality content that fits the 'Depth' and 'Vibe'.
    3. If 'Course Mode' is on, structure the videos in a logical learning order (Lesson 1, Lesson 2...).
    4. Provide a 'reasoning' for why this video fits the specific user flow.
    5. Do not include generic filler. Every video must add value.
  `;

  const userPrompt = `
    User Request: "${prompt}"
    Constraints:
    - Target Duration: ${options.durationMinutes} minutes
    - Depth Level: ${options.depth}
    - Vibe: ${options.vibe}
    - Course Mode: ${options.isCourseMode ? "Enabled (Structure as a syllabus)" : "Disabled (Flow playlist)"}

    Generate a JSON response representing the curated playlist.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            playlistName: { type: Type.STRING, description: "A catchy title for the curated playlist" },
            totalDuration: { type: Type.STRING, description: "Estimated total duration string (e.g. '45 mins')" },
            description: { type: Type.STRING, description: "A short summary of what the user will learn or experience" },
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING, description: "The likely title of a real YouTube video" },
                  channelName: { type: Type.STRING, description: "The name of the creator/channel" },
                  duration: { type: Type.STRING, description: "Approximate duration (e.g. '12:30')" },
                  description: { type: Type.STRING, description: "Brief content summary" },
                  reasoning: { type: Type.STRING, description: "Why this specific video was chosen for this flow" },
                },
                required: ["title", "channelName", "duration", "description", "reasoning"],
              },
            },
          },
          required: ["playlistName", "totalDuration", "description", "items"],
        },
      },
    });

    if (!response.text) {
      throw new Error("No response text received from Gemini.");
    }

    const data = JSON.parse(response.text) as PlaylistResponse;
    return data;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate playlist. Please try again.");
  }
};