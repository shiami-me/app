import { useCallback } from "react";
import { encodeFunctionData } from "viem";
import { waitForTransactionReceipt } from "@wagmi/core";
import { usePublicClient, useWalletClient } from "wagmi";
import { Message } from "@/types/messages";
import { ZerePyClient } from "@/lib/ZerePyClient";
import { ERC20_ABI } from "@/utils/abis";
import { AddLiquidity, TransactionStatus } from "@/types/transaction";
import { config } from "@/providers/WalletProvider";
import { useCancelTransaction } from "@/hooks/useCancelTransaction";
import {
  AddLiquidityBoostedV3,
  Permit2Helper,
  Slippage,
  TokenAmount,
} from "@balancer/sdk";

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
  const walletClient = useWalletClient();
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
      let transaction: any;
      if (tx.permitData && walletClient.data?.account) {
        updateStatus("signing");
        const client = {
          ...publicClient, // ✅ Use publicClient for reads
          signTypedData: walletClient.data.signTypedData.bind(walletClient), // ✅ Use walletClient for signing
        };
        
        const addLiquidity = new AddLiquidityBoostedV3();
        const slippage = Slippage.fromPercentage(
          tx.permitData.slippage.percentage.toString() as `${number}`
        );
        const queryOutput = {
          ...tx.permitData.queryOutput,
          amountsIn: tx.permitData.queryOutput.amountsIn.map((amount) =>
            TokenAmount.fromRawAmount(amount.token, BigInt(amount.amount))
          ),
          bptOut: TokenAmount.fromRawAmount(
            tx.permitData.queryOutput.bptOut.token,
            BigInt(tx.permitData.queryOutput.bptOut.amount)
          ),
        };
        const permit2 = await Permit2Helper.signAddLiquidityBoostedApproval({
          ...queryOutput,
          slippage,
          client: client as any,
          owner: walletClient.data?.account,
        });
        const call = addLiquidity.buildCallWithPermit2(
          { ...queryOutput, slippage },
          permit2
        );
        transaction = {
          to: call.to,
          data: call.callData,
          value: BigInt(call.value),
        };
      } else transaction = tx.transaction;
      // All approvals successful, proceed with actual transaction
      updateStatus("confirming");

      const result = {
        to: transaction.to as `0x${string}`,
        data: transaction.data as `0x${string}`,
        value: transaction.value,
      };

      await sendTransaction(result, {
        onSuccess: async (data: any) => {
          const confirmMessage = `## Liquidity Added Successfully 🚀\n\n**Transaction Details:**\n- **Status:** Confirmed ✅\n- **Hash:** [${data.slice(
            0,
            10
          )}...${data.slice(
            -8
          )}](https://sonicscan.org/tx/${data})\n\nView complete transaction on [Sonic Explorer](https://sonicscan.org/tx/${data})`;
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
                chat,
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
    walletClient,
    cancelTransaction,
    updateStatus,
    chat,
  ]);
};
