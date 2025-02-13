"use client";
import "@rainbow-me/rainbowkit/styles.css";
import {
  darkTheme,
  getDefaultConfig,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useTheme } from "next-themes";

export const config = getDefaultConfig({
  appName: "shiami.me",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
  chains: [
    {
      id: 57_054,
      name: "Sonic Blaze Testnet",
      nativeCurrency: {
        decimals: 18,
        name: "Sonic",
        symbol: "S",
      },
      rpcUrls: {
        default: {
          http: ["https://rpc.blaze.soniclabs.com"],
        },
      },
      blockExplorers: {
        default: {
          name: "Sonic Blaze Testnet Explorer",
          url: "https://testnet.soniclabs.com/",
        },
      },
      testnet: true,
    },
    {
      id: 146,
      name: "Sonic",
      nativeCurrency: {
        decimals: 18,
        name: "Sonic",
        symbol: "S",
      },
      rpcUrls: {
        default: {
          http: ["https://virtual.sonic.rpc.tenderly.co/3ce9a6f9-6e60-4f43-b85f-2d87187146d5"],
        },
      },
      blockExplorers: {
        default: {
          name: "Sonic Explorer",
          url: "https://dashboard.tenderly.co/explorer/vnet/3ce9a6f9-6e60-4f43-b85f-2d87187146d5",
        },
      },
    },
  ],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();
export const WalletProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { theme } = useTheme();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={theme === "dark" ? darkTheme() : lightTheme()}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
