import { useState } from 'react';
import { TransactionStatus } from '@/types/transaction';

export const useTransactionStatus = () => {
  const [status, setStatus] = useState<TransactionStatus>({ 
    state: 'idle'
  });

  const updateStatus = (state: TransactionStatus['state'], message?: string) => {
    setStatus({ state, message });
  };

  return { status, updateStatus };
};
