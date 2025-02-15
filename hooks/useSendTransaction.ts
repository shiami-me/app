import { useCallback } from "react";
import { encodeFunctionData } from "viem";
import { waitForTransactionReceipt } from "@wagmi/core";
import { usePublicClient } from "wagmi";
import { Message } from "@/types/messages";
import { ZerePyClient } from "@/lib/ZerePyClient";
import { ERC20_ABI } from "@/utils/abis";
import { BaseTransaction } from "@/types/transaction";
import { config } from "@/providers/WalletProvider";
import { useCancelTransaction } from "@/hooks/useCancelTransaction";

interface UseSendTransactionProps {
  tx: BaseTransaction;
  account: string;
  sendTransaction: any;
  setMessages: (messages: Message[]) => void;
  messages: Message[];
  client: ZerePyClient;
}

export const useSendTransaction = ({
  tx,
  account,
  sendTransaction,
  setMessages,
  messages,
  client,
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
    const result = {
      to: tx.to,
      value: BigInt(tx.value ? tx.value.toString() : "0"),
      chainId: tx.chainId,
      data: tx.data || undefined,
      gas: tx.gas ? BigInt(tx.gas) : undefined,
      maxFeePerGas: tx.maxFeePerGas ? BigInt(tx.maxFeePerGas) : undefined,
      maxPriorityFeePerGas:
        tx.maxFeePerGas && tx.maxPriorityFeePerGas
          ? BigInt(tx.maxPriorityFeePerGas) > BigInt(tx.maxFeePerGas)
            ? BigInt(tx.maxFeePerGas)
            : BigInt(tx.maxPriorityFeePerGas)
          : undefined,
    };

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

        const txReceipt = await waitForTransactionReceipt(config, {
          hash: approveTx,
        });
        if (txReceipt.status === "reverted") {
          await cancelTransaction();
          return;
        }
      }
    }

    await sendTransaction(result, {
      onSuccess: async (data: any) => {
        const confirmMessage = `${tx.type} done - https://testnet.soniclabs.com/${data}`;
        const txReceipt = await waitForTransactionReceipt(config, {
          hash: data,
        });
        if (txReceipt.status === "reverted") {
          await cancelTransaction();
        } else {
          await client.performAction("gemini", "continue-execution", [
            confirmMessage,
          ]);
          setMessages([
            ...messages,
            {
              id: messages.length + 1,
              sender: "bot",
              text: confirmMessage,
            },
          ]);
        }
      },
      onError: async () => {
        await cancelTransaction();
      },
    });
  }, [
    tx,
    account,
    sendTransaction,
    setMessages,
    messages,
    client,
    publicClient,
    cancelTransaction,
  ]);
};
