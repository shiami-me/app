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
  return useCallback(async () => {
    const cancelMessage = `${txType.charAt(0).toUpperCase() + txType.slice(1)} ${isUser ? "cancelled by user" : "failed"}`;
    await client.performAction("gemini", "continue-execution", [
      cancelMessage,
    ]);
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        sender: "bot",
        text: cancelMessage,
      },
    ]);
  }, [txType, client, setMessages, messages]);
};
