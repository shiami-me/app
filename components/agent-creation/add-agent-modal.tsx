import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Agent, AGENT_TYPES, DEFAULT_PROMPTS } from "./types";

interface AddAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAgent: (agent: Agent) => void;
  disabled: string[];
}

const AddAgentModal: React.FC<AddAgentModalProps> = ({
  isOpen,
  onClose,
  onAddAgent,
  disabled
}) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isValid, setIsValid] = useState(false);

  // Update validation status
  useEffect(() => {
    setIsValid(!!title && !!type && !!prompt);
  }, [title, type, prompt]);

  // Update prompt when type changes
  useEffect(() => {
    if (type && DEFAULT_PROMPTS[type]) {
      setPrompt(DEFAULT_PROMPTS[type]);
    }
  }, [type]);

  const handleSubmit = () => {
    if (isValid) {
      onAddAgent({
        title,
        type,
        prompt,
        next: "FINISH", // Default, will be updated by parent component
      });
      resetForm();
      onClose();
    }
  };

  const resetForm = () => {
    setTitle("");
    setType("");
    setPrompt("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add Agent</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Note - Scheduler is not available on one-time agents
          </p>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Agent Title
            </Label>
            <Input
              id="title"
              placeholder="e.g., scheduler, price"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Agent Type
            </Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select agent type" />
              </SelectTrigger>
              <SelectContent>
                {AGENT_TYPES.map((agentType) => (
                  <SelectItem key={agentType} value={agentType} disabled={disabled.includes(agentType)}>
                    {agentType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="prompt" className="text-right self-start pt-2">
              Agent Prompt
            </Label>
            <Textarea
              id="prompt"
              placeholder="Enter agent prompt..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="col-span-3 min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!isValid}>
            Add Agent
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAgentModal;
