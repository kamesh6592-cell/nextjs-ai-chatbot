import { createOpenAI } from "@ai-sdk/openai";
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
          model: openrouter("deepseek/deepseek-reasoner"),
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),
        "title-model": openrouter("deepseek/deepseek-chat"),
        "artifact-model": openrouter("deepseek/deepseek-chat"),
      },
    });
