import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Wallet, DollarSign, Flame, Gauge, Store } from "lucide-react";
import React from "react";
import { useApproveTransaction } from "@/hooks/useApproveTransaction";
import { ApproveTransaction } from "@/types/transaction";
import { Message } from "@/types/messages";
import { formatEther } from "viem";
import { ZerePyClient } from "@/lib/ZerePyClient";

interface Props {
  tx: ApproveTransaction;
  account: string;
  sendTransaction: any;
  setMessages: (messages: Message[]) => void;
  messages: Message[];
  client: ZerePyClient;
  closeModal: () => void;
}

const ApproveSendTransaction: React.FC<Props> = ({
  tx,
  account,
  sendTransaction,
  setMessages,
  messages,
  client,
  closeModal,
}: Props) => {
  const handleApproveTransaction = useApproveTransaction({
    tx,
    account,
    sendTransaction,
    setMessages,
    messages,
    client,
  });

  return (
    <Card className="w-full sm:w-[420px] md:w-[540px] lg:w-[640px] shadow-xl bg-gradient-to-br from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 text-white rounded-2xl overflow-hidden border-0">
      <CardHeader className="py-5 px-6 border-b border-white/10 text-center">
        <CardTitle className="text-2xl font-semibold tracking-wide font-[family-name:var(--font-roboto-mono)]">
          approve swap
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <Wallet className="h-5 w-5 text-white/80" />
            <div className="flex flex-col">
              <span className="text-white/80 text-sm">Amount In</span>
              <span className="font-semibold">
                {formatEther(BigInt(tx.approve.amountIn))} ETH
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <Send className="h-5 w-5 text-white/80" />
            <div className="flex flex-col">
              <span className="text-white/80 text-sm">Amount Out</span>
              <span className="font-semibold">
                {formatEther(BigInt(tx.approve.amountOut))} ETH
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <DollarSign className="h-5 w-5 text-white/80" />
            <div className="flex flex-col">
              <span className="text-white/80 text-sm">USD Value In</span>
              <span className="font-semibold">${tx.approve.amountInUsd}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <DollarSign className="h-5 w-5 text-white/80" />
            <div className="flex flex-col">
              <span className="text-white/80 text-sm">USD Value Out</span>
              <span className="font-semibold">${tx.approve.amountOutUsd}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <Flame className="h-5 w-5 text-white/80" />
            <div className="flex flex-col">
              <span className="text-white/80 text-sm">Gas (Est.)</span>
              <span className="font-semibold">{tx.approve.gas} units</span>
            </div>
          </div>

          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <Gauge className="h-5 w-5 text-white/80" />
            <div className="flex flex-col">
              <span className="text-white/80 text-sm">Gas Price</span>
              <span className="font-semibold">
                {Number(tx.approve.gasPrice) / 1e9} Gwei
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DollarSign className="h-5 w-5 text-white/80" />
            <div className="flex flex-col">
              <span className="text-white/80 text-sm">Gas USD</span>
              <span className="font-semibold">${tx.approve.gasUsd}</span>
            </div>
          </div>

          {tx.approve.route &&
            tx.approve.route[0] &&
            tx.approve.route[0][0] && (
              <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                <Store className="h-5 w-5 text-white/80" />
                <div className="flex flex-col">
                  <span className="text-white/80 text-sm">Exchange</span>
                  <span className="font-semibold">
                    {tx.approve.route[0][0].exchange}
                  </span>
                </div>
              </div>
            )}
        </div>

        <Button
          className="w-full mt-2 bg-white dark:bg-black text-green-800 dark:text-white hover:bg-green-100 dark:hover:bg-green-900 transition-all duration-300 font-semibold py-2 rounded-lg shadow-md"
          variant="default"
          onClick={async () => {
            await handleApproveTransaction();
            closeModal();
          }}
        >
          Approve Swap
        </Button>
      </CardContent>
    </Card>
  );
};

export default ApproveSendTransaction;
