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
  "price",
  "image"
];

export const DEFAULT_PROMPTS: Record<string, string> = {
  scheduler: "You are a scheduling assistant.",
  price: "You are a cryptocurrency price prediction agent.",
  text: "You are a text processing agent.",
  email: "You are an email sending agent",
  image: "You are an image generation agent. Focus on the image prompt and ignore anything else. Output the image URL - https://ipfs.io/ipfs/[ipfs_hash]"
};
