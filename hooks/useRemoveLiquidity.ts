import { useCallback } from "react";
import { encodeFunctionData } from "viem";
import { waitForTransactionReceipt } from "@wagmi/core";
import { usePublicClient, useWalletClient } from "wagmi";
import { Message } from "@/types/messages";
import { ZerePyClient } from "@/lib/ZerePyClient";
import { RemoveLiquidity, TransactionStatus } from "@/types/transaction";
import { config } from "@/providers/WalletProvider";
import { useCancelTransaction } from "@/hooks/useCancelTransaction";
import { ERC20_ABI } from "@/utils/abis";
import {
  RemoveLiquidityBoostedV3,
  Slippage,
  TokenAmount,
  PermitHelper,
} from "@balancer/sdk";

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
  const walletClient = useWalletClient();
  const publicClient = usePublicClient();
  const cancelTransaction = useCancelTransaction({
    txType: "withdraw",
    client,
    setMessages,
    messages,
    isUser: false,
  });

  return useCallback(async () => {
    try {
      updateStatus("approving");

      let transaction: any;
      if (tx.permitData && walletClient.data?.account) {
        updateStatus("signing");
        const client = {
          ...publicClient, // Use publicClient for reads
          signTypedData: walletClient.data.signTypedData.bind(walletClient), // Use walletClient for signing
        };
        
        const removeLiquidity = new RemoveLiquidityBoostedV3();
        const slippage = Slippage.fromPercentage(
          tx.permitData.slippage.percentage.toString() as `${number}`
        );
        const queryOutput = {
          ...tx.permitData.queryOutput,
          amountsOut: tx.permitData.queryOutput.amountsOut.map((amount) =>
            TokenAmount.fromRawAmount(amount.token, BigInt(amount.amount))
          ),
          bptIn: TokenAmount.fromRawAmount(
            tx.permitData.queryOutput.bptIn.token,
            BigInt(tx.permitData.queryOutput.bptIn.amount)
          ),
        };
        
        const permit2 = await PermitHelper.signRemoveLiquidityBoostedApproval({
          ...queryOutput,
          slippage,
          client: client as any,
          owner: walletClient.data?.account,
        });
        
        const call = removeLiquidity.buildCallWithPermit(
          { ...queryOutput, slippage },
          permit2
        );
        
        transaction = {
          to: call.to,
          data: call.callData,
          value: BigInt(call.value),
        };
      } else {
        transaction = tx.transaction;
      }
      
      updateStatus("confirming");
      
      const result = {
        to: transaction.to as `0x${string}`,
        data: transaction.data as `0x${string}`,
        value: transaction.value,
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
    walletClient,
    publicClient,
    cancelTransaction,
    updateStatus,
    chat
  ]);
};
