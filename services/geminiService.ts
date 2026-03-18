
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { RESUME_CONTEXT } from "../constants";

export const getGeminiResponse = async (prompt: string): Promise<string> => {
  try {
    // Create a new GoogleGenAI instance right before making an API call
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: RESUME_CONTEXT,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    });
    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having a bit of trouble connecting to my brain right now. Please try again later!";
  }
};

export const getGeminiStream = async (prompt: string, onChunk: (text: string) => void) => {
  try {
    // Create a new GoogleGenAI instance right before making an API call
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const result = await ai.models.generateContentStream({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: RESUME_CONTEXT,
      },
    });

    let fullText = "";
    for await (const chunk of result) {
      const chunkText = chunk.text || "";
      fullText += chunkText;
      onChunk(fullText);
    }
  } catch (error) {
    console.error("Gemini Streaming Error:", error);
    onChunk("I encountered an error while thinking. Please try again.");
  }
};

export const analyzeProjectDepth = async (projectTitle: string, projectDesc: string): Promise<string> => {
  try {
    // Create a new GoogleGenAI instance right before making an API call
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Provide a deep technical analysis of the project "${projectTitle}". 
    Description: ${projectDesc}
    Format the response as 3 professional bullet points covering:
    1. Technical Innovation
    2. Architecture Strengths
    3. Scalability Roadmap`;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // Complex reasoning task, use pro model
      contents: prompt,
      config: {
        temperature: 0.5,
      }
    });
    return response.text || "Analysis unavailable.";
  } catch (error) {
    return "Could not perform deep analysis at this time.";
  }
};
