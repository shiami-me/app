import React from 'react';
import { Loader2 } from 'lucide-react';
import { TransactionStatus } from '@/types/transaction';

interface StatusIndicatorProps {
  status: TransactionStatus;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  switch (status.state) {
    case 'idle':
      return <>Submit Transaction</>;
      
    case 'approving':
      return (
        <div className="flex items-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Approving...</span>
        </div>
      );
      
    case 'approved':
      return (
        <div className="flex items-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Approved! Processing...</span>
        </div>
      );
    case 'signing':
      return (
        <div className="flex items-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Signing...</span>
        </div>
      );
    case 'confirming':
      return (
        <div className="flex items-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Confirming...</span>
        </div>
      );
      
    case 'confirmed':
      return <>Transaction Confirmed</>;
      
    case 'failed':
      return <>Try Again{status.message ? ` (${status.message})` : ''}</>;
      
    default:
      return <>Submit Transaction</>;
  }
};
