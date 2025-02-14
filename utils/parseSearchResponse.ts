import { Source } from "@/types/messages";

export const parseResponse = (
  text: string
): { sources: Source[]; response: string } => {
  try {
    const match = text.match(/^\s*(\[.*?\])\s*([\s\S]*)/);

    if (!match) {
      return { sources: [], response: text };
    }

    const [, sourcesJson, remainingText] = match;

    try {
      const sources = JSON.parse(sourcesJson) as Source[];
      return {
        sources,
        response: remainingText.trim(),
      };
    } catch {
      return { sources: [], response: text };
    }
  } catch (error) {
    console.error("Error parsing response:", error);
    return { sources: [], response: text };
  }
};
