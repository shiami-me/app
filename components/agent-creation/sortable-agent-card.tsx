import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, GripVertical, ArrowDown } from "lucide-react";
import { Agent } from "./types";

interface SortableAgentCardProps {
  agent: Agent;
  index: number;
  onDelete: (index: number) => void;
  isLast: boolean;
}

export const SortableAgentCard: React.FC<SortableAgentCardProps> = ({
  agent,
  index,
  onDelete,
  isLast,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: agent.title });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <Card className="p-4 border-l-4 hover:shadow-md transition-shadow border-l-primary">
        <div className="flex items-center gap-3">
          <div {...attributes} {...listeners} className="cursor-grab touch-none">
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-medium text-lg">{agent.title}</h3>
              <Badge variant="outline">{agent.type}</Badge>
            </div>
            <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
              {agent.prompt}
            </p>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(index)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </Card>
      
      {!isLast && (
        <div className="flex justify-center my-2">
          <div className="bg-muted rounded-full w-8 h-8 flex items-center justify-center">
            <ArrowDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};
