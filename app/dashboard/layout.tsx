import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/theme-toggle";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
  );
}
