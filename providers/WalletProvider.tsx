"use client";
import { WagmiProvider, createConfig } from "@privy-io/wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { PrivyProvider } from "@privy-io/react-auth";
import { useTheme } from "next-themes";
import { anvilSonic } from "@/lib/chain";
import { http } from "viem";

export const config = createConfig({
  chains: [anvilSonic],
  transports: {
    [anvilSonic.id]: http(""),
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
        supportedChains: [anvilSonic],
        defaultChain: anvilSonic,
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
