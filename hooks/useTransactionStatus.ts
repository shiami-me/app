import { useState } from 'react';
import { TransactionStatus } from '@/types/transaction';

export function useTransactionStatus() {
  const [status, setStatus] = useState<TransactionStatus>({
    state: 'idle'
  });

  const updateStatus = (state: TransactionStatus['state'], message?: string) => {
    setStatus({
      state,
      message
    });
  };

  return {
    status,
    updateStatus
  };
}
