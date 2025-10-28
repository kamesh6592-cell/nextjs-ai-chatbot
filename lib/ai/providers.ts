import { createOpenAI } from "@ai-sdk/openai";
import { createGroq } from "@ai-sdk/groq";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import { isTestEnvironment } from "../constants";

// OpenRouter provider for DeepSeek models
const openrouter = createOpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY, // Using your OpenRouter API key
  baseURL: 'https://openrouter.ai/api/v1',
});

// Groq provider for DeepSeek R1 reasoning model
const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY || process.env.DEEPSEEK_API_KEY, // Add your Groq API key or use fallback
});

// OpenAI provider for reasoning models
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.DEEPSEEK_API_KEY, // Fallback to same key if OpenAI not set
  baseURL: process.env.OPENAI_API_KEY ? 'https://api.openai.com/v1' : 'https://openrouter.ai/api/v1',
});

export const myProvider = isTestEnvironment
  ? (() => {
      const {
        artifactModel,
        chatModel,
        reasoningModel,
        titleModel,
      } = require("./models.mock");
      return customProvider({
        languageModels: {
          "chat-model": chatModel,
          "chat-model-reasoning": reasoningModel,
          "title-model": titleModel,
          "artifact-model": artifactModel,
        },
      });
    })()
  : customProvider({
      languageModels: {
        "chat-model": openrouter("deepseek/deepseek-chat"),
        "chat-model-reasoning": wrapLanguageModel({
          model: groq("deepseek-r1-distill-llama-70b"),
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),
        "title-model": openrouter("deepseek/deepseek-chat"),
        "artifact-model": openrouter("deepseek/deepseek-chat"),
      },
    });
