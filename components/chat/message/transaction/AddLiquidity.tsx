"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Wallet, ArrowRight } from "lucide-react";
import React, { useEffect } from "react";
import { useAddLiquidity } from "@/hooks/useAddLiquidity";
import { AddLiquidity } from "@/types/transaction";
import { Message } from "@/types/messages";
import { ZerePyClient } from "@/lib/ZerePyClient";
import { useTransactionStatus } from '@/hooks/useTransactionStatus';
import { StatusIndicator } from './StatusIndicator';
import { useChat } from "@/providers/ChatProvider";

interface Props {
  tx: AddLiquidity;
  account: string;
  sendTransaction: any;
  setMessages: (messages: Message[]) => void;
  messages: Message[];
  client: ZerePyClient;
  closeModal: () => void;
}

const AddLiquidityTransaction: React.FC<Props> = ({
  tx,
  account,
  sendTransaction,
  setMessages,
  messages,
  client,
  closeModal,
}) => {
  const { status, updateStatus } = useTransactionStatus();
  const { chatId } = useChat();
  
  const handleAddLiquidity = useAddLiquidity({
    tx,
    account,
    sendTransaction,
    setMessages,
    messages,
    client,
    updateStatus,
    chat: chatId!
  });

  useEffect(() => {
    if (status.state === 'confirmed' || status.state === 'failed') {
      closeModal();
    }
  }, [status.state, closeModal]);

  return (
    <Card className="w-full sm:w-[420px] md:w-[540px] lg:w-[640px] shadow-xl rounded-2xl overflow-hidden border-0">
      <CardHeader className="py-5 px-6 border-b border-white/10 text-center">
        <CardTitle className="text-2xl font-semibold tracking-wide font-[family-name:var(--font-roboto-mono)]">
          Add Liquidity
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <Droplets className="h-5 w-5 text-white/80" />
            <div className="flex flex-col">
              <span className="text-white/80 text-md">Pool</span>
              <span className="font-semibold truncate">{tx.poolAddress}</span>
            </div>
          </div>

          {tx.tokens.map((token, index) => (
            <div key={index} className="flex items-center gap-3 border-b border-white/10 pb-3">
              <Wallet className="h-5 w-5 text-white/80" />
              <div className="flex flex-col">
                <span className="text-white/80 text-md">Token {index + 1}</span>
                <span className="font-semibold truncate">{token.address}</span>
                <span className="text-sm text-white/70">Amount: {token.amount}</span>
              </div>
            </div>
          ))}

          {tx.priceImpact && (
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <ArrowRight className="h-5 w-5 text-white/80" />
              <div className="flex flex-col">
                <span className="text-white/80 text-md">Price Impact</span>
                <span className="font-semibold">{parseFloat(tx.priceImpact).toFixed(2)}%</span>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <ArrowRight className="h-5 w-5 text-white/80" />
            <div className="flex flex-col">
              <span className="text-white/80 text-md">Expected BPT Out</span>
              <span className="font-semibold truncate">{tx.expectedBptOut || tx.minBptOut}</span>
            </div>
          </div>
        </div>

        <Button
          className="w-full mt-2 bg-gradient-to-br from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 transition-all duration-300 font-semibold py-2 rounded-lg shadow-md"
          variant="default"
          onClick={async () => {
            await handleAddLiquidity();
          }}
          disabled={status.state !== 'idle' && status.state !== 'failed'}
        >
          <StatusIndicator status={status} />
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddLiquidityTransaction;
