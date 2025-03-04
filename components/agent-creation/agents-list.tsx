import React from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableAgentCard } from "./sortable-agent-card";
import { Agent } from "./types";

interface AgentsListProps {
  agents: Agent[];
  onDelete: (index: number) => void;
  onReorder: (agents: Agent[]) => void;
}

const AgentsList: React.FC<AgentsListProps> = ({ agents, onDelete, onReorder }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = agents.findIndex(agent => agent.title === active.id);
      const newIndex = agents.findIndex(agent => agent.title === over.id);
      
      const reorderedAgents = arrayMove(agents, oldIndex, newIndex);
      onReorder(reorderedAgents);
    }
  };

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext 
        items={agents.map(agent => agent.title)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {agents.length === 0 ? (
            <div className="text-center p-6 border border-dashed rounded-lg">
              <p className="text-muted-foreground">No agents added yet</p>
            </div>
          ) : (
            agents.map((agent, index) => (
              <SortableAgentCard
                key={agent.title}
                agent={agent}
                index={index}
                onDelete={onDelete}
                isLast={index === agents.length - 1}
              />
            ))
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default AgentsList;
