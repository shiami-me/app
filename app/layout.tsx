import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { WalletProvider } from "@/providers/WalletProvider";
import { ChatProvider } from "@/providers/ChatProvider";
import { AppSidebar } from "@/components/app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ModeToggle } from "@/components/theme-toggle";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-roboto",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "shiami.me | DeFAI for everyone",
  description: "Building DeFAI for everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.variable} ${robotoMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <WalletProvider>
            <ChatProvider>
              <TooltipProvider>
                <div className="flex h-screen">
                  <AppSidebar />
                  <main className="flex-1 overflow-auto w-full">
                  <SidebarProvider className="font-[family-name:var(--font-roboto-sans)]">
                    <SidebarInset>
                      <header className="flex h-16 shrink-0 bg-transparent items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <div className="ml-auto px-4 flex items-center gap-2">
                          <ConnectButton />
                          <ModeToggle />
                        </div>
                      </header>

                    {children}
                    </SidebarInset>
                  </SidebarProvider>
                  </main>
                </div>
              </TooltipProvider>
            </ChatProvider>
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
