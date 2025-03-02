import { useCallback } from "react";
import { encodeFunctionData } from "viem";
import { waitForTransactionReceipt } from "@wagmi/core";
import { usePublicClient } from "wagmi";
import { Message } from "@/types/messages";
import { ZerePyClient } from "@/lib/ZerePyClient";
import { ERC20_ABI } from "@/utils/abis";
import { AddLiquidity, TransactionStatus } from "@/types/transaction";
import { config } from "@/providers/WalletProvider";
import { useCancelTransaction } from "@/hooks/useCancelTransaction";

interface UseAddLiquidityProps {
  tx: AddLiquidity;
  account: string;
  sendTransaction: any;
  setMessages: (messages: Message[]) => void;
  messages: Message[];
  client: ZerePyClient;
  updateStatus: (state: TransactionStatus["state"], message?: string) => void;
  chat: string;
}

export const useAddLiquidity = ({
  tx,
  account,
  sendTransaction,
  setMessages,
  messages,
  client,
  updateStatus,
  chat,
}: UseAddLiquidityProps) => {
  const publicClient = usePublicClient();
  const cancelTransaction = useCancelTransaction({
    txType: "deposit",
    client,
    setMessages,
    messages,
    isUser: false,
  });

  return useCallback(async () => {
    try {
      updateStatus("approving");
      
      // Process all required token approvals
      for (const approval of tx.approvals) {
        const allowance = (await publicClient?.readContract({
          address: approval.token as `0x${string}`,
          abi: ERC20_ABI,
          functionName: "allowance",
          args: [account, approval.spender],
        })) as unknown as bigint;

        if (BigInt(allowance) < BigInt(approval.amount)) {
          const approveTx = await sendTransaction({
            to: approval.token as `0x${string}`,
            data: encodeFunctionData({
              abi: ERC20_ABI,
              functionName: "approve",
              args: [approval.spender, approval.amount],
            }),
          });
          
          try {
            const txReceipt = await waitForTransactionReceipt(config, {
              hash: approveTx,
            });
            
            if (txReceipt.status === "reverted") {
              updateStatus("failed", "Approval reverted");
              await cancelTransaction(chat);
              return;
            }
          } catch (error) {
            updateStatus("failed", "Approval failed");
            await cancelTransaction(chat);
            return;
          }
        }
      }
      
      // All approvals successful, proceed with actual transaction
      updateStatus("confirming");
      
      const result = {
        to: tx.transaction.to as `0x${string}`,
        data: tx.transaction.data as `0x${string}`,
        value: tx.transaction.value,
      };
      
      await sendTransaction(result, {
        onSuccess: async (data: any) => {
          const confirmMessage = `Add liquidity transaction done - https://testnet.soniclabs.com/${data}`;
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
    publicClient,
    cancelTransaction,
    updateStatus,
    chat
  ]);
};
