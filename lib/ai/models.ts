export const DEFAULT_CHAT_MODEL: string = "chat-model";

export type ChatModel = {
  id: string;
  name: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  {
    id: "chat-model",
    name: "DeepSeek V3",
    description: "Advanced multimodal model with text capabilities",
  },
  {
    id: "chat-model-reasoning",
    name: "DeepSeek R1 (Reasoning)",
    description:
      "Advanced reasoning model that shows step-by-step thinking process",
  },
];
