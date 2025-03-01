import { useCallback } from "react";
import { Message } from "@/types/messages";
import { ZerePyClient } from "@/lib/ZerePyClient";

interface UseCancelTransactionProps {
  txType: string;
  client: ZerePyClient;
  setMessages: (messages: Message[]) => void;
  messages: Message[];
  isUser: boolean;
}

export const useCancelTransaction = ({
  txType,
  client,
  setMessages,
  messages,
  isUser = false,
}: UseCancelTransactionProps) => {
  return useCallback(async (chat: string) => {
    const cancelMessage = `${txType.charAt(0).toUpperCase() + txType.slice(1)} ${isUser ? "cancelled by user" : "failed"}`;
    await client.performAction("gemini", "continue-execution", [
      cancelMessage,
      chat
    ]);
    setMessages([
      ...messages.slice(0, -1),
      {
        id: messages.length,
        sender: "bot",
        text: cancelMessage,
      },
    ]);
  }, [txType, client, setMessages, messages]);
};
