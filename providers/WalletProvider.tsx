"use client"
import "@rainbow-me/rainbowkit/styles.css";
import { darkTheme, getDefaultConfig, lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useTheme } from "next-themes";

const config = getDefaultConfig({
  appName: "shiami.me",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
  chains: [{
    id: 57_054,
    name: "Sonic Blaze Testnet",
    nativeCurrency: {
        decimals: 18,
        name: "Sonic",
        symbol: "S"
    },
    rpcUrls: {
        default: {
            http: [
                "https://rpc.blaze.soniclabs.com"
            ]
        }
    },
    blockExplorers: {
      default: {
        name: 'Sonic Blaze Testnet Explorer',
        url: 'https://testnet.soniclabs.com/',
      },
    },
    testnet: true,
}],
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
        >{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
