import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSiloDeposit, useSiloBorrow, useSiloRepay, useSiloWithdraw } from '@/hooks/silo';

interface SiloInteractionModalProps {
  isOpen: boolean;
  onClose: () => void;
  market: string;
  token0: string;
  token1: string;
}

const SiloInteractionModal: React.FC<SiloInteractionModalProps> = ({ isOpen, onClose, market, token0, token1 }) => {
  const [action, setAction] = useState<'deposit' | 'withdraw' | 'borrow' | 'repay'>('deposit');
  const [amount, setAmount] = useState('');

  const { deposit, loading: depositLoading } = useSiloDeposit();
  const { withdraw, loading: withdrawLoading } = useSiloWithdraw();
  const { borrow, loading: borrowLoading } = useSiloBorrow();
  const { repay, loading: repayLoading } = useSiloRepay();

  const handleAction = async () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) return;

    try {
      switch (action) {
        case 'deposit':
          await deposit(token0, token1, numAmount);
          break;
        case 'withdraw':
          await withdraw(token0, token1, numAmount);
          break;
        case 'borrow':
          await borrow(token0, token1, numAmount);
          break;
        case 'repay':
          await repay(token0, token1, numAmount);
          break;
      }
      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Interact with {market}</DialogTitle>
          <DialogDescription>Choose an action and enter the amount.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-between">
            <Button onClick={() => setAction('deposit')} variant={action === 'deposit' ? 'default' : 'outline'}>Deposit</Button>
            <Button onClick={() => setAction('withdraw')} variant={action === 'withdraw' ? 'default' : 'outline'}>Withdraw</Button>
            <Button onClick={() => setAction('borrow')} variant={action === 'borrow' ? 'default' : 'outline'}>Borrow</Button>
            <Button onClick={() => setAction('repay')} variant={action === 'repay' ? 'default' : 'outline'}>Repay</Button>
          </div>
          <Input
            id="amount"
            placeholder="Enter amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button onClick={handleAction} disabled={depositLoading || withdrawLoading || borrowLoading || repayLoading}>
            {action.charAt(0).toUpperCase() + action.slice(1)}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SiloInteractionModal;
