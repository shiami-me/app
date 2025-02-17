"use client";

import * as React from "react";
import {
  Frame,
  Map,
  PieChart,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { ModeSwitcher } from "@/components/mode-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { useChat } from "@/providers/ChatProvider";

const data: any = {
  modes: [
    {
      logo: (
        <Image
          src="/shiami.jpeg"
          alt="Chatbot Avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
      ),
      plan: "Finance",
    },
    {
      logo: (
        <Image
          src="/shiami.jpeg"
          alt="Chatbot Avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
      ),
      plan: "Productivity",
    },
    {
      logo: (
        <Image
          src="/shiami.jpeg"
          alt="Chatbot Avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
      ),
      plan: "Developer",
    },
  ],
  navMain: [
    {
      title: "Chat History",
      url: "/chat",
      isActive: true,
      items: [],
    }
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { chatHistory, chatId: chat, setChatId } = useChat();
  React.useEffect(() => {
    data["navMain"][0].items = Object.keys(chatHistory).map((chatId) => ({
      title: chatHistory[chatId].title,
      url: `/chat/${chatId}`,
      id: chatId,
      active: chatId === chat,
      onClick: () => setChatId(chatId),
    }));
  }, [chatHistory, chat, setChatId])
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ModeSwitcher modes={data.modes} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
