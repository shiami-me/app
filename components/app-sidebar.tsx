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
};

export function AppSidebar() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { chatHistory, chatId: chat, setChatId } = useChat();
  const pathname = usePathname();
  const sidebarRef = React.useRef<HTMLDivElement>(null);

  // Update chat history when it changes
  React.useEffect(() => {
    data["navMain"][0].items = Object.keys(chatHistory).map((chatId) => ({
      title: chatHistory[chatId].title,
      url: `/chat/${chatId}`,
      id: chatId,
      active: chatId === chat,
      onClick: () => setChatId(chatId),
    }));
  }, [chatHistory, chat, setChatId]);

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
      {/* Header */}
      <div className={"flex items-center justify-between p-4 border-b"}>
        <div className="flex items-center gap-2 overflow-hidden cursor-pointer" 
            onClick={() => setCollapsed(!collapsed)}
        >
          <Image
            src="/shiami.jpeg"
            alt="Shiami Logo"
            width={32}
            height={32}
            className="rounded-full shrink-0"
          />
          {!collapsed && (
            <h2 className="text-xl font-bold bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-300 dark:via-gray-100 dark:to-gray-400 bg-clip-text text-transparent tracking-wider font-[family-name:var(--font-roboto-mono)]">
              shiami
            </h2>
          )}
        </div>

        {/* Mobile close button */}
        {mobileOpen && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Sidebar content with scroll area */}
      <ScrollArea className="flex-1">
        <div className="flex flex-col p-2">
          {/* New Chat Button */}
          <div className="px-3 mb-4 pt-2">
            <Link href="/chat">
              <Button
                variant="default"
                className={cn(
                  "w-full justify-start bg-green-600 hover:bg-green-700",
                  collapsed && !mobileOpen ? "px-0 justify-center" : ""
                )}
              >
                <MessageCircle className="h-4 w-4" />
                {(!collapsed || mobileOpen) && (
                  <span className="ml-2 font-bold">New Chat</span>
                )}
              </Button>
            </Link>
          </div>

          {/* Chat History Section */}
          <div className="mb-6">
            <div
              className={cn(
                "px-3 mb-2 flex items-center text-sm font-medium text-muted-foreground",
                collapsed && !mobileOpen ? "justify-center" : ""
              )}
            >
              {collapsed && !mobileOpen ? (
                <History className="h-4 w-4" />
              ) : (
                "Chat History"
              )}
            </div>
            <NavMain
              items={data.navMain}
              collapsed={collapsed && !mobileOpen}
            />
          </div>

          {/* Dashboards Section */}
          <div className="mb-6">
            <div
              className={cn(
                "px-3 mb-2 flex items-center text-sm font-medium text-muted-foreground",
                collapsed && !mobileOpen ? "justify-center" : ""
              )}
            >
              {collapsed && !mobileOpen ? (
                <LayoutDashboard className="h-4 w-4" />
              ) : (
                "Dashboards"
              )}
            </div>
            <NavDashboards
              dashboards={data.dashboards}
              collapsed={collapsed && !mobileOpen}
            />
          </div>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t p-3 flex items-center justify-between mt-auto">
        <ModeToggle />
        {(!collapsed || mobileOpen) && (
          <Button variant="ghost" size="icon" className="h-8 w-8">
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
          "hidden md:flex h-screen bg-card border-r border-border relative transition-all duration-300 ease-in-out flex-col",
          collapsed ? "w-[60px]" : "w-[280px]"
        )}
      >
        <SidebarContent />
      </div>

      {/* Mobile trigger button (fixed to top) */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-3 left-3 z-40 bg-background/80 backdrop-blur-sm border shadow-sm h-10 w-10"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile Sidebar with backdrop overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Sidebar */}
          <div
            ref={sidebarRef}
            className="w-[280px] h-full bg-card flex flex-col relative z-10 animate-in slide-in-from-left duration-300"
          >
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}
