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
    name: "DeepSeek R1",
    description:
      "Uses advanced chain-of-thought reasoning for complex problems",
  },
];
