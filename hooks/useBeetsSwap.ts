import { useCallback } from "react";
import { encodeFunctionData } from "viem";
import { waitForTransactionReceipt } from "@wagmi/core";
import { usePublicClient, useWalletClient } from "wagmi";
import { Message } from "@/types/messages";
import { ZerePyClient } from "@/lib/ZerePyClient";
import { ERC20_ABI } from "@/utils/abis";
import { BeetsSwap, TransactionStatus } from "@/types/transaction";
import { config } from "@/providers/WalletProvider";
import { useCancelTransaction } from "@/hooks/useCancelTransaction";
import { ExactInQueryOutput, Permit2Helper, Slippage, Swap, SwapKind, TokenAmount } from "@balancer/sdk";

interface UseBeetsSwapProps {
  tx: BeetsSwap;
  account: string;
  sendTransaction: any;
  setMessages: (messages: Message[]) => void;
  messages: Message[];
  client: ZerePyClient;
  updateStatus: (state: TransactionStatus["state"], message?: string) => void;
  chat: string;
}

export const useBeetsSwap = ({
  tx,
  account,
  sendTransaction,
  setMessages,
  messages,
  client,
  updateStatus,
  chat,
}: UseBeetsSwapProps) => {
  const publicClient = usePublicClient();
  const walletClient = useWalletClient();
  const cancelTransaction = useCancelTransaction({
    txType: "swap",
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
        if (approval.token === "0x0000000000000000000000000000000000000000" || approval.token === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") continue;
        const allowance = (await publicClient?.readContract({
          address: approval.token as `0x${string}`,
          abi: ERC20_ABI,
          functionName: "allowance",
          args: [account, approval.spender],
        })) as unknown as bigint;

        // Convert approval amount to BigInt for comparison
        const approvalAmount = BigInt(approval.amount.toString());

        if (BigInt(allowance) < approvalAmount) {
          const approveTx = await sendTransaction({
            to: approval.token as `0x${string}`,
            data: encodeFunctionData({
              abi: ERC20_ABI,
              functionName: "approve",
              args: [approval.spender, approvalAmount],
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
        const swap = new Swap({
          chainId: 146,
          paths: tx.paths,
          swapKind: SwapKind.GivenIn,
        });
        const slippage = Slippage.fromPercentage(
          tx.permitData.slippage.percentage.toString() as `${number}`
        );
        const queryOutput: ExactInQueryOutput = {
          ...tx.permitData.queryOutput,
          amountIn: TokenAmount.fromRawAmount(
            tx.permitData.queryOutput.amountIn.token,
            BigInt(tx.permitData.queryOutput.amountIn.amount)
          ),
          pathAmounts: tx.permitData.queryOutput.pathAmounts?.map((amount) =>
            BigInt(amount)
          ),
          expectedAmountOut: TokenAmount.fromRawAmount(
            tx.permitData.queryOutput.expectedAmountOut.token,
            BigInt(tx.permitData.queryOutput.expectedAmountOut.amount)
          ),
        };
        const permit2 = await Permit2Helper.signSwapApproval({
          queryOutput,
          slippage,
          client: client as any,
          wethIsEth: true,
          owner: walletClient.data?.account,
        });
        const call = swap.buildCallWithPermit2(
          { queryOutput, slippage },
          permit2
        );
        transaction = {
          to: call.to,
          data: call.callData,
          value: call.value ? BigInt(call.value) : BigInt(0),
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
          // Create transaction confirmation message
          const tokenIn = tx.paths[0].tokens[0].address;
          const tokenOut =
            tx.paths[0].tokens[tx.paths[0].tokens.length - 1].address;
          const inputAmount = tx.paths[0].inputAmountRaw;
          const outputAmount = tx.paths[0].outputAmountRaw;

          const confirmMessage = `## Swap Executed Successfully 🔄\n\n**Transaction Details:**\n- **Status:** Confirmed ✅\n- **Hash:** [${data.slice(
            0,
            10
          )}...${data.slice(
            -8
          )}](https://sonicscan.org/tx/${data})\n- **Swapped:** ${inputAmount} of token ${tokenIn}\n- **For:** ${outputAmount} of token ${tokenOut}\n\nView complete transaction on [Sonic Explorer](https://sonicscan.org/tx/${data})`;

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
    publicClient,
    cancelTransaction,
    updateStatus,
    chat,
  ]);
};
