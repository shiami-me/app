"use client";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useSetActiveWallet } from "@privy-io/wagmi";
import { useAccount, useDisconnect, useSwitchChain } from "wagmi";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, ChevronDown, Wallet } from "lucide-react";
import { useState, useEffect } from "react";

const TARGET_CHAIN_ID = 146;

const ConnectButton = () => {
  const { ready, user, authenticated, login, logout } = usePrivy();
  const { wallets, ready: walletsReady } = useWallets();
  const { address, chainId } = useAccount();
  const { disconnect } = useDisconnect();
  const { setActiveWallet } = useSetActiveWallet();
  const { switchChain } = useSwitchChain();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (authenticated && chainId !== TARGET_CHAIN_ID) {
      switchChain?.({
        chainId: TARGET_CHAIN_ID
      });
    }
  }, [authenticated, chainId]);

  if (!ready) {
    return null;
  }

  const formatAddress = (addr: string) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (!authenticated) {
    return (
      <Button onClick={() => login()} className="rounded-full">
        Connect Wallet
      </Button>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full border border-gray-300 flex items-center gap-2"
        >
          <Wallet className="h-4 w-4" />
          {formatAddress(address || user?.wallet?.address || "")}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Wallets</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {walletsReady &&
          wallets.map((wallet) => (
            <DropdownMenuItem
              key={wallet.address}
              onClick={() => {
                setActiveWallet(wallet);
                switchChain?.({
                  chainId: TARGET_CHAIN_ID
                });
                setIsOpen(false);
              }}
              className="flex items-center justify-between cursor-pointer"
            >
              <span>{wallet.walletClientType}</span>
              <span className="text-xs text-gray-500">
                {formatAddress(wallet.address)}
              </span>
            </DropdownMenuItem>
          ))}

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            logout();
            disconnect();
            setIsOpen(false);
          }}
          className="text-red-500 flex items-center gap-2 cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ConnectButton;
