"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Wallet, ArrowRight, PlusCircle, BarChart } from "lucide-react";
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
    <Card className="w-full sm:w-[420px] md:w-[540px] lg:w-[640px] shadow-xl rounded-2xl overflow-hidden border-0 bg-gradient-to-b from-green-950 to-slate-950">
      <CardHeader className="py-5 px-6 border-b border-green-900/30 text-center bg-green-950/80 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-400 via-transparent to-transparent"></div>
        <CardTitle className="text-2xl font-semibold tracking-wide font-mono text-white relative z-10 flex items-center justify-center gap-2">
          <PlusCircle className="h-6 w-6 text-green-400" />
          <span>Add Liquidity</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3 border-b border-green-900/30 pb-4 group transition-all duration-300 hover:bg-green-900/20 p-3 rounded-md">
            <div className="h-9 w-9 rounded-full bg-green-900/80 flex items-center justify-center">
              <Droplets className="h-5 w-5 text-green-400" />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-white/70 text-sm mb-1">Pool</span>
              <span className="font-semibold text-white truncate">{tx.poolAddress}</span>
            </div>
          </div>

          <div className="bg-green-900/20 rounded-xl p-4 border border-green-800/30 mb-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 rounded-full bg-green-900/80 flex items-center justify-center">
                <Wallet className="h-5 w-5 text-green-400" />
              </div>
              <span className="text-white/70 text-sm">Tokens to Add</span>
            </div>

            <div className="space-y-3 mt-2">
              {tx.tokens.map((token, index) => (
                <div key={index} className="bg-green-900/40 rounded-lg p-3 transition-all hover:bg-green-800/40">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-green-800/80 text-white/90 text-xs px-2 py-0.5 rounded-full">Token {index + 1}</span>
                    </div>
                    <span className="font-medium text-white truncate">{token.address}</span>
                    <div className="mt-2 flex items-center">
                      <span className="text-sm text-white/70 mr-2">Amount:</span>
                      <span className="font-semibold text-green-300">{token.amount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {tx.priceImpact && (
              <div className="flex items-center gap-3 bg-green-900/20 p-3 rounded-lg border border-green-800/30">
                <div className="h-8 w-8 rounded-full bg-green-900/80 flex items-center justify-center">
                  <BarChart className="h-4 w-4 text-green-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white/70 text-xs mb-1">Price Impact</span>
                  <span className={`font-semibold ${parseFloat(tx.priceImpact) > 5 ? 'text-amber-400' : 'text-white/90'}`}>
                    {parseFloat(tx.priceImpact).toFixed(2)}%
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 bg-green-900/20 p-3 rounded-lg border border-green-800/30">
              <div className="h-8 w-8 rounded-full bg-green-900/80 flex items-center justify-center">
                <ArrowRight className="h-4 w-4 text-green-400" />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-white/70 text-xs mb-1">BPT Out</span>
                <span className="font-semibold text-white/90 truncate">{tx.expectedBptOut || tx.minBptOut}</span>
              </div>
            </div>
          </div>
        </div>

        <Button
          className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-semibold py-3 h-auto rounded-lg shadow-[0_4px_16px_rgba(0,255,0,0.1)]"
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
