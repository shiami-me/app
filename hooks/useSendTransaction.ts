import { useCallback } from "react";
import { encodeFunctionData } from "viem";
import { waitForTransactionReceipt } from "@wagmi/core";
import { usePublicClient } from "wagmi";
import { Message } from "@/types/messages";
import { ZerePyClient } from "@/lib/ZerePyClient";
import { ERC20_ABI } from "@/utils/abis";
import { BaseTransaction, TransactionStatus } from "@/types/transaction";
import { config } from "@/providers/WalletProvider";
import { useCancelTransaction } from "@/hooks/useCancelTransaction";

interface UseSendTransactionProps {
  tx: BaseTransaction;
  account: string;
  sendTransaction: any;
  setMessages: (messages: Message[]) => void;
  messages: Message[];
  client: ZerePyClient;
  updateStatus: (state: TransactionStatus["state"], message?: string) => void;
  chat: string;
}

export const useSendTransaction = ({
  tx,
  account,
  sendTransaction,
  setMessages,
  messages,
  client,
  updateStatus,
  chat,
}: UseSendTransactionProps) => {
  const publicClient = usePublicClient();
  const cancelTransaction = useCancelTransaction({
    txType: tx.type,
    client,
    setMessages,
    messages,
    isUser: false,
  });

  return useCallback(async () => {
    try {
      updateStatus("confirming");
      let result: any = {
        to: tx.to,
        value: BigInt(tx.value ? tx.value.toString() : "0"),
        chainId: tx.chainId,
        data: tx.data || undefined,
      };
      if (tx.type !== "bridge") {
        result = {
          ...result,
          gas: tx.gas ? BigInt(tx.gas) : undefined,
          maxFeePerGas: tx.maxFeePerGas ? BigInt(tx.maxFeePerGas) : undefined,
          maxPriorityFeePerGas:
            tx.maxFeePerGas && tx.maxPriorityFeePerGas
              ? BigInt(tx.maxPriorityFeePerGas) > BigInt(tx.maxFeePerGas)
                ? BigInt(tx.maxFeePerGas)
                : BigInt(tx.maxPriorityFeePerGas)
              : undefined,
        };
      }

      if (tx.type === "deposit" || tx.type === "repay") {
        const allowance = (await publicClient?.readContract({
          address: tx.tokenAddress as `0x${string}`,
          abi: ERC20_ABI,
          functionName: "allowance",
          args: [account, tx.to],
        })) as unknown as bigint;

        if (BigInt(allowance) < BigInt(tx.amount ? tx.amount : "0")) {
          const approveTx = await sendTransaction({
            to: tx.tokenAddress as `0x${string}`,
            data: encodeFunctionData({
              abi: ERC20_ABI,
              functionName: "approve",
              args: [tx.to, tx.amount],
            }),
            chainId: tx.chainId,
          });
          try {
            const txReceipt = await waitForTransactionReceipt(config, {
              hash: approveTx,
            });
            if (txReceipt.status === "reverted") {
              await cancelTransaction(chat);
              updateStatus("failed", "Transaction reverted");
              return;
            }
          } catch {
            await cancelTransaction(chat);
            updateStatus("failed", "Transaction failed");
            return;
          }
        }
      }

      await sendTransaction(result, {
        onSuccess: async (data: any) => {
          const confirmMessage = `## ${tx.type.charAt(0).toUpperCase() + tx.type.slice(1)} Transaction Successful ✅\n\n**Transaction Hash:** [${data.slice(0,10)}...${data.slice(-8)}](https://sonicscan.org/tx/${data})\n\nView complete details on [Sonic Explorer](https://sonicscan.org/tx/${data})`;
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
  ]);
};
