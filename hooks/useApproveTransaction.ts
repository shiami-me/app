import { useCallback } from "react";
import { encodeFunctionData } from "viem";
import { waitForTransactionReceipt } from "@wagmi/core";
import { usePublicClient } from "wagmi";
import { Message } from "@/types/messages";
import { ERC20_ABI } from "@/utils/abis";
import { ApproveTransaction, TransactionStatus } from "@/types/transaction";
import { config } from "@/providers/WalletProvider";
import { useCancelTransaction } from "@/hooks/useCancelTransaction";
import { ZerePyClient } from "@/lib/ZerePyClient";

interface UseApproveTransactionProps {
  tx: ApproveTransaction;
  account: string;
  sendTransaction: any;
  setMessages: (messages: Message[]) => void;
  messages: Message[];
  client: ZerePyClient;
  updateStatus: (state: TransactionStatus['state'], message?: string) => void;
  chat: string;
}

export const useApproveTransaction = ({
  tx,
  account,
  sendTransaction,
  setMessages,
  messages,
  client,
  updateStatus,
  chat
}: UseApproveTransactionProps) => {
  const publicClient = usePublicClient();
  const cancelTransaction = useCancelTransaction({
    txType: "approve",
    client,
    setMessages,
    messages,
    isUser: false
  });

  return useCallback(async () => {
    const txApprove = tx["approve"];
    try {
      updateStatus('approving');
      
      if (txApprove.tokenIn !== "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
        const allowance = (await publicClient?.readContract({
          address: txApprove.tokenIn as `0x${string}`,
          abi: ERC20_ABI,
          functionName: "allowance",
          args: [account, txApprove.routerAddress],
        })) as unknown as bigint;

        if (BigInt(allowance) < BigInt(txApprove.amountIn)) {
          const approveTx = await sendTransaction({
            to: txApprove.tokenIn as `0x${string}`,
            data: encodeFunctionData({
              abi: ERC20_ABI,
              functionName: "approve",
              args: [txApprove.routerAddress, txApprove.amountIn],
            }),
            chainId: txApprove.chainId,
          });
          try {
            const txApproveReceipt = await waitForTransactionReceipt(config, {
              hash: approveTx,
            });
            
            if (txApproveReceipt.status === "reverted") {
              updateStatus('failed', 'Approval reverted');
              await cancelTransaction(chat);
              return;
            }
          } catch {
            updateStatus('failed', 'Approval failed');
            await cancelTransaction(chat);
            return;
          }
        }

        updateStatus('approved');
        setMessages([
          ...messages,
          {
            id: messages.length + 1,
            sender: "bot",
            text: JSON.stringify({
              ...tx["swap"],
              type: "swap",
            }),
          },
        ]);
      } else {
        updateStatus('approved');
        setMessages([
          ...messages,
          {
            id: messages.length + 1,
            sender: "bot",
            text: JSON.stringify({
              ...tx["swap"],
              type: "swap",
            }),
          },
        ]);
      }
    } catch (error: any) {
      console.error("Error in allowance check or approval:", error);
      updateStatus('failed', error.message);
      await cancelTransaction(chat);
    }
  }, [tx, account, sendTransaction, setMessages, messages, publicClient, cancelTransaction, updateStatus]);
};
