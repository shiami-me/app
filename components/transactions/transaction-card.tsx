import React from "react";
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { ArrowUpRight, ArrowDownLeft, CheckCircle2, XCircle, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { truncateAddress, formatEther } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useChat } from "@/providers/ChatProvider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface Transaction {
  hash: string;
  timeStamp: string;
  from: string;
  to: string;
  value: string;
  gasPrice: string;
  gasUsed: string;
  isError: string;
  functionName?: string;
  tokenSymbol?: string;
  tokenDecimal?: string;
  confirmations: string;
  blockNumber: string;
}

interface TransactionCardProps {
  transaction: Transaction;
  userAddress: string;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({ transaction, userAddress }) => {
  const { addToContext } = useChat();
  
  // Format timestamp
  const date = new Date(parseInt(transaction.timeStamp) * 1000);
  const timeAgo = formatDistanceToNow(date, { addSuffix: true });

  // Determine if this is an incoming or outgoing transaction
  const isIncoming = transaction.to.toLowerCase() === userAddress.toLowerCase();
  
  // Format amount
  const amount = formatEther(transaction.value);
  
  // Determine transaction status
  const isSuccess = transaction.isError === "0";

  // Calculate gas fee
  const gasFee = (
    parseInt(transaction.gasUsed) *
    parseInt(transaction.gasPrice) /
    1e18
  ).toFixed(8);

  const handleAddToContext = () => {
    addToContext({
      id: `tx-${transaction.hash.substring(0, 8)}`,
      type: "transaction",
      title: `${isIncoming ? 'Received' : 'Sent'} ${transaction.tokenSymbol || 'S'}`,
      data: {
        hash: transaction.hash,
        timestamp: date.toISOString(),
        timeAgo: timeAgo,
        from: transaction.from,
        to: transaction.to,
        value: amount,
        tokenSymbol: transaction.tokenSymbol || "S",
        gasUsed: transaction.gasUsed,
        gasPrice: transaction.gasPrice,
        gasFee: gasFee,
        isSuccess: isSuccess,
        isIncoming: isIncoming,
        functionName: transaction.functionName || null
      }
    });
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow border-gray-200 dark:border-gray-800">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className={`mt-1 rounded-full p-2 
            ${isIncoming 
              ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400" 
              : "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"}`}
          >
            {isIncoming ? (
              <ArrowDownLeft className="h-5 w-5" />
            ) : (
              <ArrowUpRight className="h-5 w-5" />
            )}
          </div>
          
          <div>
            <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
              {isSuccess ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
              {isIncoming ? "Received" : "Sent"} 
              {transaction.tokenSymbol ? ` ${transaction.tokenSymbol}` : ""}
            </h3>
            
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <p>From: {truncateAddress(transaction.from)}</p>
              <p>To: {truncateAddress(transaction.to)}</p>
              
              {transaction.functionName && (
                <p className="text-xs text-purple-600 dark:text-purple-400 font-mono mt-1">
                  {transaction.functionName.split("(")[0]}
                </p>
              )}
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="font-semibold text-gray-900 dark:text-gray-100">
            {amount} {transaction.tokenSymbol || "S"}
          </div>
          
          <div className="mt-1 flex flex-col items-end gap-1">
            <Badge variant="outline" className="text-xs">
              Gas Fee: {gasFee} S
            </Badge>
            
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {timeAgo}
            </span>
            
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={handleAddToContext}
                    >
                      <PlusCircle className="h-3 w-3 text-gray-500 dark:text-gray-400" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p className="text-xs">Add to context</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <a 
                href={`https://sonicscan.org/tx/${transaction.hash}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                View
              </a>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
