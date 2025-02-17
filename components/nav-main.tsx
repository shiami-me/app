"use client"

import { ChevronRight, NotebookPen, Trash, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { useChat } from "@/providers/ChatProvider"
import { Button } from "./ui/button"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
      id: string
      active: boolean
    }[]
  }[]
}) {
  const { deleteChatHistory } = useChat()
  return (
    <SidebarGroup>
      <Button variant={"ghost"} className="py-2 px-3">
        <Link href={"/chat"} className="w-full text-left flex flex-row justify-between items-center">
          <span className="font-bold">New Chat</span>
          <NotebookPen className="w-4 h-4"/>
        </Link>

      </Button>
      <SidebarGroupLabel>Manage</SidebarGroupLabel>
      <SidebarMenu>
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
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.id} className={`${subItem.active ? "bg-secondary": ""} px-2 py-1 rounded-lg flex justify-between items-center`}>
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
  )
}
