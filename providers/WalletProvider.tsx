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
import { anvil } from "viem/chains";

export const config = getDefaultConfig({
  appName: "shiami.me",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
  chains: [
    // {
    //   id: 57_054,
    //   name: "Sonic Blaze Testnet",
    //   nativeCurrency: {
    //     decimals: 18,
    //     name: "Sonic",
    //     symbol: "S",
    //   },
    //   rpcUrls: {
    //     default: {
    //       http: ["https://rpc.blaze.soniclabs.com"],
    //     },
    //   },
    //   blockExplorers: {
    //     default: {
    //       name: "Sonic Blaze Testnet Explorer",
    //       url: "https://testnet.soniclabs.com/",
    //     },
    //   },
    //   testnet: true,
    // },
    // {
    //   id: 146,
    //   name: "Sonic",
    //   nativeCurrency: {
    //     decimals: 18,
    //     name: "Sonic",
    //     symbol: "S",
    //   },
    //   rpcUrls: {
    //     default: {
    //       http: [
    //         "https://virtual.sonic.rpc.tenderly.co/4524cca9-5fd4-4050-8e54-76098f0196ca",
    //       ],
    //     },
    //   },
    //   blockExplorers: {
    //     default: {
    //       name: "Sonic Explorer",
    //       url: "https://dashboard.tenderly.co/explorer/vnet/4524cca9-5fd4-4050-8e54-76098f0196ca",
    //     },
    //   },
    // },
    {
      ...anvil,
      rpcUrls: {
        default: {
          http: ["https://anvil.shiami.me"],
        },
      },
      id: 146,
      nativeCurrency: { decimals: 18, name: "Sonic", symbol: "S" },
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
  const walletTheme = theme === "dark" ? darkTheme() : lightTheme();
  walletTheme.colors.accentColor = "rgb(22 163 74)";
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={walletTheme}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
