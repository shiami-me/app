export interface Agent {
  title: string;
  type: string;
  prompt: string;
  next: string;
}

export const AGENT_TYPES = [
  "text",
  "scheduler",
  "email",
  "transactions",
  "silo",
  "price_predictor",
  "image"
];

export const DEFAULT_PROMPTS: Record<string, string> = {
  scheduler: "You are a scheduling assistant.",
  price_predictor: "You are a cryptocurrency price agent.",
  text: "You are a text processing agent.",
  email: "You are an email sending agent",
  transactions: "You are a transaction processing agent.",
  silo: "You are a silo finance agent.",
  image: "You are an image generation agent. Focus on the image prompt and ignore anything else. Output the image URL - https://ipfs.io/ipfs/[ipfs_hash]"
};
