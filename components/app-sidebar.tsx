"use client";

import * as React from "react";
import {
  LayoutDashboard,
  MessageCircle,
  PieChart,
  Settings,
  Menu,
  History,
  X,
  Wallet,
  BarChart3,
  Bot,
  Plus,
  ChevronRight,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavDashboards } from "@/components/nav-dashboards";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { useChat } from "@/providers/ChatProvider";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ModeToggle } from "./theme-toggle";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";
import { Separator } from "@/components/ui/separator";

const data: any = {
  navMain: [
    {
      title: "Chat History",
      url: "/chat",
      isActive: true,
      items: [],
      icon: MessageCircle,
    },
  ],
  dashboards: [
    {
      name: "Silo Finance",
      url: "/dashboard/silo",
      icon: LayoutDashboard,
    },
    {
      name: "Beets on Sonic",
      url: "/dashboard/beets",
      icon: PieChart,
    },
  ],
  // Add agents section
  agents: [
    {
      name: "Agent Workflows",
      url: "/dashboard/agents",
      icon: Bot,
    },
    {
      name: "Create Agent",
      url: "/dashboard/create-agent",
      icon: Plus,
    },
  ],
  account: [
    {
      name: "Portfolio",
      url: "/portfolio",
      icon: BarChart3,
    },
    {
      name: "Transactions",
      url: "/transactions",
      icon: History,
    },
  ],
};

export function AppSidebar() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { chatHistory = {}, chatId: chat, setChatId } = useChat();
  const pathname = usePathname();
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  const { isConnected } = useAccount();
  const [navItems, setNavItems] = React.useState<any>([]);

  React.useEffect(() => {
    setNavItems(
      Object.keys(chatHistory).map((chatId) => ({
        title: chatHistory[chatId].title,
        url: `/chat/${chatId}`,
        id: chatId,
        active: chatId === chat,
        onClick: () => setChatId(chatId),
      }))
    );
  }, [chatHistory, chat, setChatId]);

  data["navMain"][0].items = navItems;

  // Handle outside click for mobile
  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        mobileOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [mobileOpen]);

  // Close mobile sidebar on route change
  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Handle ESC key to close mobile sidebar
  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Toggle body scroll when mobile sidebar is open
  React.useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [mobileOpen]);

  // Sidebar content component to avoid duplication
  const SidebarContent = () => (
    <>
      {/* Header with gradient background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-100/70 to-blue-50/70 dark:from-indigo-950/40 dark:to-blue-900/30 opacity-80"></div>
        <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/20 [mask-image:linear-gradient(0deg,transparent,white)]"></div>
        
        <div className="flex items-center justify-between p-4 relative">
          <div 
            className="flex items-center gap-3 overflow-hidden cursor-pointer transition-all duration-300 ease-in-out" 
            onClick={() => setCollapsed(!collapsed)}
          >
            <div className="relative h-9 w-9 rounded-xl overflow-hidden shadow-md ring-2 ring-white/80 dark:ring-gray-800/80">
              <Image
                src="/shiami.jpeg"
                alt="Shiami Logo"
                fill
                className="object-cover"
              />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <h2 className="text-xl font-extrabold bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent tracking-wider font-[family-name:var(--font-roboto-mono)]">
                  shiami
                </h2>
                <p className="text-xs text-muted-foreground -mt-0.5">
                  your DeFi assistant
                </p>
              </div>
            )}
          </div>

          {!collapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full opacity-80 hover:opacity-100"
              onClick={() => setCollapsed(true)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}

          {/* Mobile close button */}
          {mobileOpen && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-full hover:bg-background/80 md:hidden"
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        {/* New Chat Button - gradient style */}
        <div className="px-3 pb-4 relative">
          <Link href="/chat">
            <Button
              variant="default"
              className={cn(
                "w-full justify-start rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-green-600/20 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 dark:from-green-600 dark:to-emerald-700",
                collapsed && !mobileOpen ? "px-0 justify-center" : ""
              )}
            >
              <MessageCircle className="h-4 w-4 flex-shrink-0" />
              {(!collapsed || mobileOpen) && (
                <span className="ml-2 font-semibold">New Chat</span>
              )}
            </Button>
          </Link>
        </div>
      </div>

      {/* Sidebar content with scroll area */}
      <ScrollArea className="flex-1 px-1 py-2 custom-scrollbar">
        <div className="flex flex-col space-y-6">
          {/* Chat History Section */}
          <div>
            <div className={cn(
              "px-3 mb-2 flex items-center",
              collapsed && !mobileOpen ? "justify-center" : "justify-between"
            )}>
              {collapsed && !mobileOpen ? (
                <History className="h-4 w-4 text-muted-foreground opacity-80" />
              ) : (
                <>
                  <span className="text-sm font-medium text-muted-foreground">Chat History</span>
                  <span className="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded-md">
                    {navItems.length}
                  </span>
                </>
              )}
            </div>
            <div className="mt-2">
              <NavMain
                items={data.navMain}
                collapsed={collapsed && !mobileOpen}
              />
            </div>
          </div>

          <Separator className="my-1 bg-muted/50" />

          {/* Dashboards Section */}
          <div>
            <div className={cn(
              "px-3 mb-2 flex items-center",
              collapsed && !mobileOpen ? "justify-center" : ""
            )}>
              {collapsed && !mobileOpen ? (
                <LayoutDashboard className="h-4 w-4 text-muted-foreground opacity-80" />
              ) : (
                <span className="text-sm font-medium text-muted-foreground">Dashboards</span>
              )}
            </div>
            <div className="mt-2">
              <NavDashboards
                dashboards={data.dashboards}
                collapsed={collapsed && !mobileOpen}
              />
            </div>
          </div>
          
          {/* Agents Section - new section */}
          <div>
            <div className={cn(
              "px-3 mb-2 flex items-center",
              collapsed && !mobileOpen ? "justify-center" : ""
            )}>
              {collapsed && !mobileOpen ? (
                <Bot className="h-4 w-4 text-muted-foreground opacity-80" />
              ) : (
                <span className="text-sm font-medium text-muted-foreground">Agents</span>
              )}
            </div>
            <div className="mt-2">
              <NavDashboards
                dashboards={data.agents}
                collapsed={collapsed && !mobileOpen}
              />
            </div>
          </div>
          
          {/* Account Section - only show when wallet is connected */}
          {isConnected && (
            <div>
              <div className={cn(
                "px-3 mb-2 flex items-center",
                collapsed && !mobileOpen ? "justify-center" : ""
              )}>
                {collapsed && !mobileOpen ? (
                  <Wallet className="h-4 w-4 text-muted-foreground opacity-80" />
                ) : (
                  <span className="text-sm font-medium text-muted-foreground">Account</span>
                )}
              </div>
              <div className="mt-2">
                <NavDashboards
                  dashboards={data.account}
                  collapsed={collapsed && !mobileOpen}
                />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t p-3 flex items-center justify-between mt-auto bg-muted/10">
        <ModeToggle />
        {(!collapsed || mobileOpen) && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full hover:bg-muted/60"
          >
            <Settings className="h-4 w-4" />
          </Button>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        ref={sidebarRef}
        className={cn(
          "hidden md:flex h-screen bg-card border-r border-border relative transition-all duration-300 ease-in-out flex-col shadow-sm",
          collapsed ? "w-[60px]" : "w-[280px]"
        )}
      >
        <SidebarContent />
      </div>

      {/* Mobile trigger button (fixed to top) */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-3 left-3 z-40 bg-background/90 backdrop-blur-sm border shadow-sm h-10 w-10 rounded-full"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile Sidebar with backdrop overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Sidebar */}
          <div
            ref={sidebarRef}
            className="w-[280px] h-full bg-card flex flex-col relative z-10 animate-in slide-in-from-left duration-300 shadow-xl border-r border-border"
          >
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}
