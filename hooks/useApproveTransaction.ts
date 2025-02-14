import { useCallback } from "react";
import { encodeFunctionData } from "viem";
import { waitForTransactionReceipt } from "@wagmi/core";
import { usePublicClient } from "wagmi";
import { Message } from "@/types/messages";
import { ERC20_ABI } from "@/utils/abis";
import { ApproveTransaction } from "@/types/transaction";
import { config } from "@/providers/WalletProvider";

interface UseApproveTransactionProps {
  tx: ApproveTransaction;
  account: string;
  sendTransaction: any;
  setMessages: (messages: Message[]) => void;
  messages: Message[];
}

export const useApproveTransaction = ({
  tx,
  account,
  sendTransaction,
  setMessages,
  messages,
}: UseApproveTransactionProps) => {
  const publicClient = usePublicClient();

  return useCallback(async () => {
    const txApprove = tx["approve"];

    if (txApprove.tokenIn !== "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
      try {
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

          const txApproveReceipt = await waitForTransactionReceipt(config, {
            hash: approveTx,
          });
          if (txApproveReceipt.status === "reverted") {
            setMessages([
              ...messages,
              {
                id: messages.length + 1,
                sender: "bot",
                text: "Approval failed. Please try again.",
              },
            ]);
            return;
          }
        }

        setMessages([
          ...messages,
          {
            id: messages.length + 1,
            sender: "bot",
            text: JSON.stringify(
              JSON.stringify({
                ...tx["swap"],
                type: "swap",
              })
            ),
          },
        ]);
      } catch (error) {
        console.error("Error in allowance check or approval:", error);
      }
    } else {
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
  }, [tx, account, sendTransaction, setMessages, messages, publicClient]);
};
