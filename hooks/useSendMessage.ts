import { useCallback } from "react";
import { ZerePyClient } from "@/lib/ZerePyClient";
import { BrowserResponse, Message } from "@/types/messages";
import { useAccount } from "wagmi";

export const useSendMessage = (
  client: ZerePyClient,
  account: ReturnType<typeof useAccount>,
  messages: Message[],
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  useBrowser: boolean
) => {
  return useCallback(
    async (input: string) => {
      if (!input.trim()) return;

      const userMessage = `${input}`;
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, sender: "user", text: input },
      ]);

      setIsLoading(true);
      try {
        if (useBrowser) {
          const response = await client.performAction("browser_use", "browse", [
            userMessage,
          ]);

          const browserResponse = response as BrowserResponse;
          const history = browserResponse.result.result.history;

          const logs = history.map((entry) => ({
            memory: entry.model_output.current_state.memory,
            goal: entry.model_output.current_state.next_goal,
            url: entry.state?.url || "N/A",
          }));

          const finalEntry = history.find((entry) =>
            entry.result.some((r) => r.is_done)
          );

          if (finalEntry) {
            const doneAction = finalEntry.model_output.action.find(
              (a) => "done" in a
            ) as { done: { text: string } } | undefined;

            const responseText = doneAction?.done.text || "No response found";
            setMessages((prev) => [
              ...prev,
              {
                id: prev.length + 1,
                sender: "bot",
                text: responseText,
                browserLogs: logs,
              },
            ]);
          }
          setIsLoading(false);
        } else {
          const response = await client.agentChat(
            "gemini",
            "generate-text",
            [
              userMessage,
              `You are a helpful AI assistant - Connected Wallet(sender for sonic transactions) - ${account.address}`,
            ],
            setMessages,
            setIsLoading
          );
        }
      } catch (error) {
        console.error(error);
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            sender: "bot",
            text: "Sorry, there was an error processing your request.",
          },
        ]);
        setIsLoading(false);
      }
    },
    [client, account, setMessages, setIsLoading, useBrowser]
  );
};
