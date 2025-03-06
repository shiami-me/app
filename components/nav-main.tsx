"use client";

import { ChevronRight, Trash, type LucideIcon } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "./ui/button";
import Link from "next/link";
import { useChat } from "@/providers/ChatProvider";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useState } from "react";

interface NavMainProps {
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
  collapsed?: boolean;
}

export function NavMain({ items, collapsed = false }: NavMainProps) {
  const { deleteChatHistory } = useChat();
  const [openSection, setOpenSection] = useState<string | null>(items[0]?.title || null);
  
  return (
    <div className="space-y-1">
      {items.map((item) => (
        <div key={item.title}>
          {collapsed ? (
            // Collapsed mode - just show the icon with tooltip
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full flex justify-center h-8 px-2 rounded-lg"
                >
                  {item.icon && <item.icon className="h-4 w-4 text-muted-foreground" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">{item.title}</TooltipContent>
            </Tooltip>
          ) : (
            // Expanded mode with collapsible chat history
            <Collapsible
              open={openSection === item.title}
              onOpenChange={(open) => setOpenSection(open ? item.title : null)}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full flex justify-between items-center h-8 px-3 rounded-lg font-medium text-muted-foreground hover:text-foreground hover:bg-muted/80"
                >
                  <div className="flex items-center">
                    {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                    <span className="text-sm">{item.title}</span>
                  </div>
                  <ChevronRight 
                    className={cn(
                      "h-4 w-4 text-muted-foreground transition-transform duration-200", 
                      openSection === item.title ? "rotate-90" : ""
                    )} 
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="pl-1 ml-4 border-l border-muted/70 space-y-1 pt-1 pb-2 max-h-[200px] overflow-y-auto custom-scrollbar">
                  {item.items?.length ? item.items.map((subItem) => (
                    <div
                      key={subItem.id}
                      className={cn(
                        "flex items-center group rounded-md transition-colors duration-200",
                        subItem.active 
                          ? "bg-muted/70 text-primary" 
                          : "hover:bg-muted/50 text-foreground/80 hover:text-foreground"
                      )}
                    >
                      <Link 
                        href={subItem.url}
                        className={cn(
                          "flex items-center py-1.5 px-2 text-sm flex-1 truncate",
                          subItem.active ? "font-medium" : ""
                        )}
                      >
                        <span className="truncate">{subItem.title}</span>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteChatHistory(subItem.id)}
                        className="opacity-0 group-hover:opacity-100 h-7 w-7 p-0 mr-1 text-muted-foreground hover:text-red-500 hover:bg-transparent transition-opacity duration-200"
                      >
                        <Trash className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  )) : (
                    <div className="text-xs text-muted-foreground px-2 py-3 italic">
                      No chat history yet
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>
      ))}
    </div>
  );
}
