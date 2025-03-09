"use client";
import { WagmiProvider, createConfig } from "@privy-io/wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { PrivyProvider } from "@privy-io/react-auth";
import { useTheme } from "next-themes";
import { http } from "viem";
import { sonic } from "viem/chains";

export const config = createConfig({
  chains: [sonic],
  transports: {
    [sonic.id]: http(""),
  },
  ssr: true,
});

const queryClient = new QueryClient();
export const WalletProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { theme } = useTheme();
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
      config={{
        appearance: {
          theme: theme === "dark" ? "dark" : "light",
          accentColor: "#16a34a",
        },
        supportedChains: [sonic],
        defaultChain: sonic,
        embeddedWallets: {
          showWalletUIs: true,
          ethereum: {
            createOnLogin: "all-users",
          },
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>{children}</WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
};
