import { GoogleGenAI, Type, Schema } from "@google/genai";
import { IdeaData } from "../types";

// Define the response schema strictly to ensure Gemini returns valid JSON matching our IdeaData interface
const ideaSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    appName: {
      type: Type.STRING,
      description: "A catchy, modern name for the startup idea.",
    },
    tagline: {
      type: Type.STRING,
      description: "A short, punchy tagline describing the value proposition.",
    },
    elevatorPitch: {
      type: Type.STRING,
      description: "A 2-3 sentence elevator pitch describing the problem and solution.",
    },
    features: {
      type: Type.ARRAY,
      description: "List of 4-6 key features.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
        },
        required: ["title", "description"],
      },
    },
    techStack: {
      type: Type.OBJECT,
      properties: {
        frontend: { type: Type.STRING, description: "Recommended frontend technologies." },
        backend: { type: Type.STRING, description: "Recommended backend technologies." },
        database: { type: Type.STRING, description: "Recommended database technologies." },
        aiIntegration: { type: Type.STRING, description: "How AI/ML fits into the stack." },
      },
      required: ["frontend", "backend", "database", "aiIntegration"],
    },
    viability: {
      type: Type.OBJECT,
      description: "Scores from 0 to 100 for various viability metrics.",
      properties: {
        innovation: { type: Type.NUMBER },
        feasibility: { type: Type.NUMBER },
        marketDemand: { type: Type.NUMBER },
        monetization: { type: Type.NUMBER },
        scalability: { type: Type.NUMBER },
      },
      required: ["innovation", "feasibility", "marketDemand", "monetization", "scalability"],
    },
    targetAudience: {
      type: Type.ARRAY,
      description: "List of 4 target audience personas or groups.",
      items: { type: Type.STRING },
    },
  },
  required: ["appName", "tagline", "elevatorPitch", "features", "techStack", "viability", "targetAudience"],
};

export const generateStartupIdea = async (userInput: string): Promise<IdeaData> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    You are an expert startup consultant and product manager. 
    Analyze the following product idea or topic and generate a comprehensive startup profile.
    
    User Input: "${userInput}"

    If the input is vague, be creative and invent a solid concept around it.
    If the input is a specific name (like 'CognitoFlow'), infer what it could be or use general knowledge if it's a known concept, otherwise invent a plausible app for that name.
    
    Ensure the tone is professional, exciting, and visionary.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: ideaSchema,
        temperature: 0.7, // A bit of creativity
      },
    });

    const jsonText = response.text;
    if (!jsonText) {
        throw new Error("Empty response from Gemini");
    }
    
    const data = JSON.parse(jsonText) as IdeaData;
    return data;
  } catch (error) {
    console.error("Error generating startup idea:", error);
    throw error;
  }
};