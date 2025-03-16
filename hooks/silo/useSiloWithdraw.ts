import { useCallback } from 'react';
import { useAccount, usePublicClient, useSendTransaction } from 'wagmi';
import { useSiloTransaction } from './useSiloTransaction';
import { getSiloConfigAddress, SILO_ABI } from '@/lib/silo';
import { encodeFunctionData } from 'viem';
import { waitForTransactionReceipt } from '@wagmi/core';
import { config } from '@/providers/WalletProvider';
import { SiloConnection } from '@/lib/silo';

export const useSiloWithdraw = () => {
  const { sendTransactionAsync } = useSendTransaction();
  const { loading, error, setLoading, setError } = useSiloTransaction();
  const account = useAccount()
  const publicClient = usePublicClient()

  const withdraw = useCallback(async (
    token0: string,
    token1: string,
    amount: number,
    receiver?: string,
    collateralType: number = 0,
    id?: string
  ) => {
    setLoading(true);
    try {
      const { configAddress, isToken0Silo0, tokenAddress, decimals } = 
        await getSiloConfigAddress(token0, token1, id);

      const siloConn = new SiloConnection(publicClient!);
      const siloAddress = await siloConn.getSiloAddress(configAddress, isToken0Silo0 ? 0 : 1);

      const amountWei = BigInt(Math.floor(amount * (10 ** decimals)));

      const data = encodeFunctionData({
        abi: SILO_ABI,
        functionName: 'withdraw',
        args: [amountWei, receiver || account.address, account.address, BigInt(collateralType)]
      });

      const tx = await sendTransactionAsync({
        to: siloAddress,
        data
      });

      await waitForTransactionReceipt(config, { hash: tx });

      return tx;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [sendTransactionAsync]);

  return { withdraw, loading, error };
};
