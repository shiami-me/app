import { useCallback } from "react";
import { waitForTransactionReceipt } from "@wagmi/core";
import { Message } from "@/types/messages";
import { ZerePyClient } from "@/lib/ZerePyClient";
import { RemoveLiquidity, TransactionStatus } from "@/types/transaction";
import { config } from "@/providers/WalletProvider";
import { useCancelTransaction } from "@/hooks/useCancelTransaction";

interface UseRemoveLiquidityProps {
  tx: RemoveLiquidity;
  account: string;
  sendTransaction: any;
  setMessages: (messages: Message[]) => void;
  messages: Message[];
  client: ZerePyClient;
  updateStatus: (state: TransactionStatus["state"], message?: string) => void;
  chat: string;
}

export const useRemoveLiquidity = ({
  tx,
  account,
  sendTransaction,
  setMessages,
  messages,
  client,
  updateStatus,
  chat,
}: UseRemoveLiquidityProps) => {
  const cancelTransaction = useCancelTransaction({
    txType: "withdraw",
    client,
    setMessages,
    messages,
    isUser: false,
  });

  return useCallback(async () => {
    try {
      updateStatus("confirming");
      
      const result = {
        to: tx.transaction.to as `0x${string}`,
        data: tx.transaction.data as `0x${string}`,
        value: tx.transaction.value,
      };
      
      await sendTransaction(result, {
        onSuccess: async (data: any) => {
          const confirmMessage = `## Liquidity Removed Successfully 🎉\n\n**Transaction Details:**\n- **Status:** Confirmed ✅\n- **Hash:** [${data.slice(0,10)}...${data.slice(-8)}](https://sonicscan.org/tx/${data})\n\nView complete transaction on [Sonic Explorer](https://sonicscan.org/tx/${data})`;
          try {
            const txReceipt = await waitForTransactionReceipt(config, {
              hash: data,
            });
            
            if (txReceipt.status === "reverted") {
              await cancelTransaction(chat);
              updateStatus("failed", "Transaction reverted");
            } else {
              updateStatus("confirmed");
              await client.performAction("gemini", "continue-execution", [
                confirmMessage,
                chat
              ]);
              setMessages([
                ...messages.slice(0, -1),
                {
                  id: messages.length,
                  sender: "bot",
                  text: confirmMessage,
                },
              ]);
            }
          } catch {
            await cancelTransaction(chat);
            updateStatus("failed", "Transaction failed");
          }
        },
        onError: async () => {
          await cancelTransaction(chat);
          updateStatus("failed", "Transaction failed");
        },
      });
    } catch (error: any) {
      updateStatus("failed", error.message);
      console.error(error);
    }
  }, [
    tx,
    account,
    sendTransaction,
    setMessages,
    messages,
    client,
    cancelTransaction,
    updateStatus,
    chat
  ]);
};
