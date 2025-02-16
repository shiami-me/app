import { TransactionStatus } from '@/types/transaction';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

interface StatusIndicatorProps {
  status: TransactionStatus;
}

export const StatusIndicator = ({ status }: StatusIndicatorProps) => {
  const getStatusDisplay = () => {
    switch (status.state) {
      case 'approving':
      case 'confirming':
        return (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-green-800 dark:text-white" />
            <span>{status.state === 'approving' ? 'Approving...' : 'Confirming...'}</span>
          </div>
        );
      case 'approved':
      case 'confirmed':
        return (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-800 dark:text-white" />
            <span>{status.state === 'approved' ? 'Approved' : 'Confirmed'}</span>
          </div>
        );
      case 'failed':
        return (
          <div className="flex items-center gap-2 text-red-600">
            <XCircle className="h-4 w-4" />
            <span>{status.message || 'Transaction Failed'}</span>
          </div>
        );
      default:
        return <span>Confirm Transaction</span>;
    }
  };

  return getStatusDisplay();
};
