"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface DashboardItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavDashboardsProps {
  dashboards: DashboardItem[];
  collapsed?: boolean;
}

export function NavDashboards({ dashboards, collapsed = false }: NavDashboardsProps) {
  const pathname = usePathname();
  
  return (
    <div className="space-y-1">
      {dashboards.map((dashboard) => {
        const isActive = pathname === dashboard.url;
        
        return collapsed ? (
          <Tooltip key={dashboard.name}>
            <TooltipTrigger asChild>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                size="sm"
                className={cn(
                  "w-full flex justify-center h-8 px-2 rounded-lg",
                  isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
                )}
                asChild
              >
                <Link href={dashboard.url}>
                  <dashboard.icon className="h-4 w-4" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">{dashboard.name}</TooltipContent>
          </Tooltip>
        ) : (
          <Button
            key={dashboard.name}
            variant={isActive ? "secondary" : "ghost"}
            size="sm"
            className={cn(
              "w-full flex justify-start h-8 px-3 rounded-lg transition-colors duration-200 font-medium",
              isActive 
                ? "bg-primary/10 text-primary" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
            )}
            asChild
          >
            <Link href={dashboard.url}>
              <dashboard.icon className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="text-sm truncate">{dashboard.name}</span>
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
