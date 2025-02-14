import { Button } from "@/components/ui/button";
import React from "react";
import { useApproveTransaction } from "@/hooks/useApproveTransaction";
import { ApproveTransaction } from "@/types/transaction";
import { Message } from "@/types/messages";
import { formatEther } from "viem";

interface Props {
  tx: ApproveTransaction;
  account: string;
  sendTransaction: any;
  setMessages: (messages: Message[]) => void;
  messages: Message[];
}

const ApproveSendTransaction: React.FC<Props> = ({
  tx,
  account,
  sendTransaction,
  setMessages,
  messages,
}: Props) => {
  const handleApproveTransaction = useApproveTransaction({
    tx,
    account,
    sendTransaction,
    setMessages,
    messages,
  });

  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-muted/50 p-4">
        <h3 className="font-medium mb-2">Swap Details</h3>
        <div className="space-y-2 text-sm">
          <div className="grid grid-cols-[120px,1fr] gap-2">
            <span className="font-medium">Type:</span>
            <span className="truncate">Approve Token Transfer</span>
          </div>
          <div className="grid grid-cols-[120px,1fr] gap-2">
            <span className="font-medium">Amount In:</span>
            <span>{formatEther(BigInt(tx.approve.amountIn))}</span>
          </div>
          <div className="grid grid-cols-[120px,1fr] gap-2">
            <span className="font-medium">Amount Out:</span>
            <span>{formatEther(BigInt(tx.approve.amountOut))}</span>
          </div>
          <div className="grid grid-cols-[120px,1fr] gap-2">
            <span className="font-medium">USD Value In:</span>
            <span>${tx.approve.amountInUsd}</span>
          </div>
          <div className="grid grid-cols-[120px,1fr] gap-2">
            <span className="font-medium">USD Value Out:</span>
            <span>${tx.approve.amountOutUsd}</span>
          </div>
          <div className="grid grid-cols-[120px,1fr] gap-2">
            <span className="font-medium">Gas (Est.):</span>
            <span>{tx.approve.gas} units</span>
          </div>
          <div className="grid grid-cols-[120px,1fr] gap-2">
            <span className="font-medium">Gas Price:</span>
            <span>{Number(tx.approve.gasPrice) / 1e9} Gwei</span>
          </div>
          <div className="grid grid-cols-[120px,1fr] gap-2">
            <span className="font-medium">Gas USD:</span>
            <span>${tx.approve.gasUsd}</span>
          </div>
          {tx.approve.route && tx.approve.route[0] && tx.approve.route[0][0] && (
            <div className="grid grid-cols-[120px,1fr] gap-2">
              <span className="font-medium">Exchange:</span>
              <span>{tx.approve.route[0][0].exchange}</span>
            </div>
          )}
        </div>
        <Button
          className="mt-4"
          onClick={handleApproveTransaction}
        >
          Approve Swap
        </Button>
      </div>
    </div>
  );
};

export default ApproveSendTransaction;
