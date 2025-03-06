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
    const txTypeFormatted = txType.charAt(0).toUpperCase() + txType.slice(1);
    
    const cancelMessage = isUser 
      ? `## ❌ ${txTypeFormatted} Cancelled\n\nTransaction was cancelled by user.`
      : `## ⚠️ ${txTypeFormatted} Failed\n\nThe transaction could not be completed. Please try again or contact support if the issue persists.`;
    
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
  }, [txType, client, setMessages, messages, isUser]);
};
