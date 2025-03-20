import React from 'react';
import { Loader2, Check, AlertTriangle } from 'lucide-react';
import { TransactionStatus } from '@/types/transaction';
import { PendleTransactionStatus } from '@/hooks/usePendleTransaction';

interface StatusIndicatorProps {
  status: TransactionStatus | PendleTransactionStatus | string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  // Handle case when status is just a string (state name)
  if (typeof status === 'string') {
    return renderStateContent(status);
  }
  
  // Handle both TransactionStatus and PendleTransactionStatus
  const state = (status as TransactionStatus | PendleTransactionStatus).state;
  const message = (status as TransactionStatus | PendleTransactionStatus).message;
  
  return renderStateContent(state, message);
};

// Helper function to render content based on state
function renderStateContent(state: string, message?: string) {
  switch (state) {
    case 'idle':
      return <span className="flex items-center justify-center">Submit Transaction</span>;
      
    case 'preparing':
      return (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-white" />
          <span className="font-medium">Preparing Transaction...</span>
        </div>
      );
    
    case 'approving':
      return (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-white" />
          <span className="font-medium">Approving...</span>
        </div>
      );
      
    case 'approved':
      return (
        <div className="flex items-center justify-center gap-2">
          <Check className="h-4 w-4 text-green-300" />
          <Loader2 className="h-4 w-4 animate-spin text-white" />
          <span className="font-medium">Processing...</span>
        </div>
      );
      
    case 'simulating':
      return (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-white" />
          <span className="font-medium">Simulating...</span>
        </div>
      );
      
    case 'signing':
      return (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-white" />
          <span className="font-medium">Signing Transaction...</span>
        </div>
      );
      
    case 'confirming':
    case 'executing':
      return (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-white" />
          <span className="font-medium">Confirming on Blockchain...</span>
        </div>
      );
      
    case 'confirmed':
      return (
        <div className="flex items-center justify-center gap-2">
          <Check className="h-4 w-4 text-green-300" />
          <span className="font-medium">Transaction Confirmed</span>
        </div>
      );
      
    case 'failed':
      return (
        <div className="flex items-center justify-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <span className="font-medium">Try Again{message ? ` (${message})` : ''}</span>
        </div>
      );
      
    default:
      return <span className="flex items-center justify-center">Submit Transaction</span>;
  }
}
