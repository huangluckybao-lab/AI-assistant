import { GoogleGenAI, ChatSession, GenerateContentResponse } from "@google/genai";
import { Message } from '../types';

let ai: GoogleGenAI | null = null;
let chatSession: ChatSession | null = null;
let currentAgentId: string | null = null;

const initializeAI = () => {
  if (!ai) {
    // 修改点 1: 使用标准的 Vite 环境变量读取方式
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error("API_KEY is missing! Please check your Cloudflare Environment Variables.");
      return;
    }
    ai = new GoogleGenAI({ apiKey: apiKey });
  }
};

export const startChat = async (agentId: string, systemPrompt: string) => {
  initializeAI();
  if (!ai) throw new Error("AI not initialized");

  currentAgentId = agentId;
  
  // Use Gemini 3 Pro Preview as requested
  const model = 'gemini-3-pro-preview';
  
  chatSession = ai.chats.create({
    model: model,
    config: {
      systemInstruction: systemPrompt,
    },
  });

  return chatSession;
};

export const sendMessage = async (text: string): Promise<string> => {
  if (!chatSession) throw new Error("Chat not initialized");
  
  try {
    const result: GenerateContentResponse = await chatSession.sendMessage({
      message: text
    });
    
    return result.text || "No response text generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
