import React from "react";
import { ContextItem } from "@/providers/ChatProvider";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ContextDisplayProps {
  contextData: ContextItem[];
  removeFromContext: (id: string) => void;
  clearContext: () => void;
  compact?: boolean;
}

const ContextDisplay: React.FC<ContextDisplayProps> = ({
  contextData,
  removeFromContext,
  clearContext,
  compact = false
}) => {
  if (contextData.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-1.5 ${compact ? 'px-2 py-1' : 'px-3 py-2'}`}>
      {contextData.map((item) => (
        <TooltipProvider key={item.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge
                variant="outline"
                className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 gap-1 pr-1 text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <span className={`${compact ? 'max-w-[60px]' : 'max-w-[120px]'} truncate`}>
                  {item.type === "silo" ? "📊 " : "💼 "}
                  {item.title}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 rounded-full hover:bg-slate-300 dark:hover:bg-slate-600 p-0"
                  onClick={() => removeFromContext(item.id)}
                >
                  <X className="h-2.5 w-2.5" />
                </Button>
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">
                {item.type === "silo" ? "Silo Market: " : "Context: "}
                {item.title}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
      
      {contextData.length > 0 && !compact && (
        <Button
          variant="ghost"
          size="sm"
          className="h-6 px-1.5 text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          onClick={clearContext}
        >
          Clear all
        </Button>
      )}
    </div>
  );
};

export default ContextDisplay;
