"use client";

import {
  ChevronRight,
  NotebookPen,
  Trash,
  type LucideIcon,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useChat } from "@/providers/ChatProvider";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
      id: string;
      active: boolean;
    }[];
  }[];
}) {
  const { deleteChatHistory, setMessages, setChatId } = useChat();
  const router = useRouter();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Manage</SidebarGroupLabel>
      <SidebarMenu>
        <Button
          variant={"ghost"}
          onClick={() => {
            setChatId(null)
            setMessages([]);
            router.push("/chat");
          }}
          className="p-2 group/collapsible w-full text-left flex flex-row items-center justify-start hover:bg-secondary"
        >
          <NotebookPen className="w-4 h-4" />
          <span className="font-bold group-data-[collapsible=icon]:hidden text-left">
            New Chat
          </span>
        </Button>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub className="max-h-[200px] overflow-y-auto custom-scrollbar">
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem
                      key={subItem.id}
                      className={`${
                        subItem.active ? "bg-secondary" : ""
                      } px-2 py-1 rounded-lg flex justify-between items-center`}
                    >
                      <SidebarMenuSubButton asChild>
                        <Link href={subItem.url} className="w-full">
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                      <Button
                        variant={"ghost"}
                        onClick={() => deleteChatHistory(subItem.id)}
                        className="opacity-0 hover:opacity-100 ml-2 text-red-600 hover:text-red-800"
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
