"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, ArrowDownLeft, ArrowRight, BarChart } from "lucide-react";
import React, { useEffect } from "react";
import { useRemoveLiquidity } from "@/hooks/useRemoveLiquidity";
import { RemoveLiquidity } from "@/types/transaction";
import { Message } from "@/types/messages";
import { ZerePyClient } from "@/lib/ZerePyClient";
import { useTransactionStatus } from '@/hooks/useTransactionStatus';
import { StatusIndicator } from './StatusIndicator';
import { useChat } from "@/providers/ChatProvider";

interface Props {
  tx: RemoveLiquidity;
  account: string;
  sendTransaction: any;
  setMessages: (messages: Message[]) => void;
  messages: Message[];
  client: ZerePyClient;
  closeModal: () => void;
}

const RemoveLiquidityTransaction: React.FC<Props> = ({
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
  
  const handleRemoveLiquidity = useRemoveLiquidity({
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
        <CardTitle className="text-2xl font-semibold tracking-wide font-mono text-white relative z-10">
          Remove Liquidity
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          {tx.poolAddress && (
            <div className="flex items-center gap-3 border-b border-green-900/30 pb-4 group transition-all duration-300 hover:bg-green-900/20 p-2 rounded-md">
              <div className="h-9 w-9 rounded-full bg-green-900/80 flex items-center justify-center">
                <Droplets className="h-5 w-5 text-green-400" />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-white/70 text-sm mb-1">Pool</span>
                <span className="font-semibold text-white truncate">{tx.poolAddress}</span>
              </div>
            </div>
          )}

          {tx.bptIn && (
            <div className="flex items-center gap-3 border-b border-green-900/30 pb-4 group transition-all duration-300 hover:bg-green-900/20 p-2 rounded-md">
              <div className="h-9 w-9 rounded-full bg-green-900/80 flex items-center justify-center">
                <ArrowDownLeft className="h-5 w-5 text-green-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-white/70 text-sm mb-1">BPT In</span>
                <span className="font-semibold text-white">{tx.bptIn}</span>
              </div>
            </div>
          )}

          {tx.maxBptIn && (
            <div className="flex items-center gap-3 border-b border-green-900/30 pb-4 group transition-all duration-300 hover:bg-green-900/20 p-2 rounded-md">
              <div className="h-9 w-9 rounded-full bg-green-900/80 flex items-center justify-center">
                <ArrowDownLeft className="h-5 w-5 text-green-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-white/70 text-sm mb-1">Max BPT In</span>
                <span className="font-semibold text-white">{tx.maxBptIn}</span>
              </div>
            </div>
          )}

          {tx.expectedAmountsOut && tx.expectedAmountsOut.length > 0 && (
            <div className="border-b border-green-900/30 pb-4 group transition-all duration-300 hover:bg-green-900/20 p-2 rounded-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-full bg-green-900/80 flex items-center justify-center">
                  <ArrowRight className="h-5 w-5 text-green-400" />
                </div>
                <span className="text-white/70 text-sm">Expected Tokens Out</span>
              </div>
              
              <div className="ml-12 space-y-3">
                {tx.expectedAmountsOut.map((token, index) => (
                  <div key={index} className="bg-green-900/40 rounded-lg p-3 border border-green-800/30">
                    <div className="flex flex-col">
                      <span className="text-sm text-white/70 mb-1">Token:</span>
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
          )}

          {tx.tokenOut && (
            <div className="flex items-center gap-3 border-b border-green-900/30 pb-4 group transition-all duration-300 hover:bg-green-900/20 p-2 rounded-md">
              <div className="h-9 w-9 rounded-full bg-green-900/80 flex items-center justify-center">
                <ArrowRight className="h-5 w-5 text-green-400" />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-white/70 text-sm mb-1">Token Out</span>
                <span className="font-semibold text-white truncate">{tx.tokenOut}</span>
                {tx.expectedAmountOut && (
                  <span className="text-sm text-green-300 mt-1">
                    Expected: {tx.expectedAmountOut}
                  </span>
                )}
              </div>
            </div>
          )}

          {tx.priceImpact && (
            <div className="flex items-center gap-3 group transition-all duration-300 hover:bg-green-900/20 p-2 rounded-md">
              <div className="h-9 w-9 rounded-full bg-green-900/80 flex items-center justify-center">
                <BarChart className="h-5 w-5 text-green-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-white/70 text-sm mb-1">Price Impact</span>
                <span className={`font-semibold ${parseFloat(typeof tx.priceImpact === 'string' ? tx.priceImpact : tx.priceImpact.toString()) > 5 ? 'text-amber-400' : 'text-white'}`}>
                  {typeof tx.priceImpact === 'string' 
                    ? parseFloat(tx.priceImpact).toFixed(2) 
                    : tx.priceImpact.toFixed(2)}%
                </span>
              </div>
            </div>
          )}
        </div>

        <Button
          className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-semibold py-3 h-auto rounded-lg shadow-[0_4px_16px_rgba(0,255,0,0.1)]"
          variant="default"
          onClick={async () => {
            await handleRemoveLiquidity();
          }}
          disabled={status.state !== 'idle' && status.state !== 'failed'}
        >
          <StatusIndicator status={status} />
        </Button>
      </CardContent>
    </Card>
  );
};

export default RemoveLiquidityTransaction;
