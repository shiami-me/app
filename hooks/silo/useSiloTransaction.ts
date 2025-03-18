import { useCallback, useState } from 'react';
import { Config, useAccount, usePublicClient } from 'wagmi';
import { getSiloConfigAddress } from '@/lib/silo';
import { encodeFunctionData } from 'viem';
import { ERC20_ABI } from '@/utils/abis';
import { SendTransactionMutateAsync } from 'wagmi/query';

export const useSiloTransaction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();
  const publicClient = usePublicClient();

  const checkAndApproveToken = async (
    tokenAddress: string,
    spenderAddress: string,
    amount: bigint,
    sendTransaction: SendTransactionMutateAsync<Config, unknown>,
  ) => {
    try {
      const allowance = await publicClient?.readContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'allowance',
        args: [address, spenderAddress],
      }) as bigint;
      if (allowance < amount) {
        const approveTx = await sendTransaction({
          to: tokenAddress as `0x${string}`,
          data: encodeFunctionData({
            abi: ERC20_ABI,
            functionName: 'approve',
            args: [spenderAddress, amount],
          }),
        });
        return approveTx;
      }
      return null;
    } catch (err) {
      console.log(err);
      throw new Error('Failed to approve token');
    }
  };

  return {
    loading,
    error,
    setLoading,
    setError,
    checkAndApproveToken,
  };
};
