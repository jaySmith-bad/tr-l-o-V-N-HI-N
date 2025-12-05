import { GoogleGenAI, Chat } from "@google/genai";

// Initialize the Gemini Client
// The API key must be obtained exclusively from the environment variable process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are an intelligent academic assistant for a university student named "Võ Văn Quốc Bảo" at VHU (Van Hien University).
Your tone should be encouraging, professional, yet friendly.
You can help with:
1. Explaining complex academic concepts (IT, Programming, Math).
2. Advising on course registration based on the user's major (Information Technology).
3. Providing study tips and time management advice.
4. Summarizing text or translating materials.

Keep responses concise and formatted nicely. If you don't know something specific about the university's internal private data (like exact real-time grades), admit it but offer general advice.
`;

// Helper to create a chat session
export const createChatSession = (): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });
};

// Helper to send a message stream
export const sendMessageStream = async (chat: Chat, message: string) => {
  return await chat.sendMessageStream({ message });
};