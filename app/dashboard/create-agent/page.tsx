"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Save, Loader2, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { ZerePyClient } from "@/lib/ZerePyClient";
import AgentsList from "@/components/agent-creation/agents-list";
import AddAgentModal from "@/components/agent-creation/add-agent-modal";
import { Agent } from "@/components/agent-creation/types";
import { useAccount, useSignMessage } from "wagmi";
import { useWallets } from "@privy-io/react-auth";
import { useSetActiveWallet } from "@privy-io/wagmi";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TemplatesList from "@/components/agent-creation/templates-list";

const MAX_AGENTS = 5;

const CreateAgentPage = () => {
  const [task, setTask] = useState("");
  const [name, setName] = useState("");
  const [isOneTime, setIsOne] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSettingWallet, setIsSettingWallet] = useState(false);
  const client = new ZerePyClient("http://localhost:8001");
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { wallets, ready: walletsReady } = useWallets();
  const { setActiveWallet } = useSetActiveWallet();
  const [ disabled, setDisabled ] = useState(["transactions", "silo"])
  const [activeTab, setActiveTab] = useState("templates");

  useEffect(() => {
    (async () => {
      // Find the Privy embedded wallet
      if (walletsReady) {
        const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy');
        
        // Set the embedded wallet as active if available
        if (embeddedWallet) {
          setIsSettingWallet(true);
          toast.info("Setting active wallet to embedded wallet...");
          
          try {
            await setActiveWallet(embeddedWallet);
          } catch (error) {
            console.error("Failed to set active wallet:", error);
            toast.error("Failed to set embedded wallet as active", {
              description: "Continuing with currently active wallet"
            });
          } finally {
            setIsSettingWallet(false);
          }
        }
      }

    })();
  }, [walletsReady, wallets]);

  const setIsOneTime = (value: boolean) => {
    setIsOne(value);
    if (value) {
      setDisabled(["transactions", "silo", "scheduler"])
    } else {
      setDisabled(["transactions", "silo"])
    }
  }

  const handleAddAgent = (agent: Agent) => {
    if (agents.length >= MAX_AGENTS) {
      toast.error("Maximum agent limit reached", {
        description: `You can add up to ${MAX_AGENTS} agents to a workflow`
      });
      return;
    }
    
    setAgents((prev) => {
      const newAgents = [...prev, agent];
      // Update the "next" property for the previous agent
      if (prev.length > 0) {
        const lastIndex = prev.length - 1;
        prev[lastIndex] = { ...prev[lastIndex], next: agent.title };
      }
      return newAgents;
    });
  };

  const handleDeleteAgent = (index: number) => {
    setAgents((prev) => {
      const newAgents = [...prev];
      newAgents.splice(index, 1);
      
      // Update the "next" properties
      for (let i = 0; i < newAgents.length; i++) {
        if (i === newAgents.length - 1) {
          // Last agent points to FINISH
          newAgents[i] = { ...newAgents[i], next: "FINISH" };
        } else {
          // Each agent points to the next one
          newAgents[i] = { ...newAgents[i], next: newAgents[i + 1].title };
        }
      }
      
      return newAgents;
    });
  };

  const handleReorderAgents = (reorderedAgents: Agent[]) => {
    // Update the "next" properties based on the new order
    const updatedAgents = reorderedAgents.map((agent, index) => {
      if (index === reorderedAgents.length - 1) {
        return { ...agent, next: "FINISH" };
      } else {
        return { ...agent, next: reorderedAgents[index + 1].title };
      }
    });
    
    setAgents(updatedAgents);
  };

  const handleSubmit = async () => {
    if (!task.trim()) {
      toast.error("Missing task", {
        description: "Please enter a task for the agent workflow"
      });
      return;
    }

    if (agents.length === 0) {
      toast.error("No agents added", {
        description: "Please add at least one agent to create a workflow"
      });
      return;
    }

    if (!name.trim() && !isOneTime) {
      toast.error("Missing name", {
        description: "Please provide a name for the reusable agent workflow"
      });
      return;
    }

    if (!address) {
      toast.error("Wallet not connected", {
        description: "Please connect your wallet to create an agent"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      
      // Format data for the API
      const agentNames = agents.map((agent) => agent.title);
      
      const prompts: Record<string, string> = {};
      agents.forEach((agent) => {
        prompts[agent.title] = agent.prompt;
      });
      
      const data: Record<string, Record<string, any>> = {};
      agents.forEach((agent) => {
        data[agent.title] = {
          name: agent.type,
          next: agent.next,
        };
      });

      // Sign the authorization message
      const messageToSign = `I authorize creating an agent with my address: ${address}`;
      let signature;

      try {
        // Get the current active wallet address after potential switch
        const currentAddress = address;
        signature = await signMessageAsync({ message: messageToSign });
        
        toast.promise(
          client.createAgent(
            agentNames, 
            prompts, 
            data, 
            task,
            currentAddress, // Use the current address which should be the embedded wallet
            name.trim() || undefined, 
            isOneTime,
            signature
          ),
          {
            loading: "Creating agent workflow...",
            success: () => {
              setIsSubmitting(false);
              return "Agent workflow created successfully!";
            },
            error: (err) => {
              setIsSubmitting(false);
              return `Error: ${err.message || "Failed to create agent workflow"}`;
            },
          }
        );
      } catch {
        toast.error("Signature rejected", {
          description: "You need to sign the message to create an agent"
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      setIsSubmitting(false);
      toast.error("Error creating agent", {
        description: (error as Error).message
      });
    }
  };

  return (
    <motion.div
      className="p-4 sm:p-6 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header with background gradient */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl opacity-70"></div>
        <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-700/20 [mask-image:linear-gradient(0deg,transparent,white)] rounded-xl"></div>
        
        <Card className="border-0 shadow-lg rounded-xl overflow-hidden bg-transparent">
          <div className="p-4 sm:p-6 relative z-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent font-[family-name:var(--font-roboto-mono)]">
                Create Agent Workflow
              </h1>
            </div>

            <p className="text-muted-foreground mt-2">
              Define a task and configure a sequence of specialized agents to work together to accomplish it.
            </p>
          </div>
        </Card>
      </div>

      <Tabs 
        defaultValue="templates" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="mb-6"
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="custom">Custom Workflow</TabsTrigger>
        </TabsList>

        <TabsContent value="templates">
          <TemplatesList onSelect={() => {
            // We're not using this onSelect anymore as the templates handle their own creation
          }} />
        </TabsContent>

        <TabsContent value="custom">
          <div className="grid gap-6">
            {/* Task input */}
            <Card className="p-6">
              <h2 className="text-lg font-medium mb-3">Define Task</h2>
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <Input
                    placeholder="Enter the task you want the agents to perform..."
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    className="h-12"
                  />
                </div>
                <div className="flex flex-col items-end">
                  <Button 
                    onClick={() => setIsModalOpen(true)} 
                    className="gap-1"
                    disabled={agents.length >= MAX_AGENTS}
                  >
                    <PlusCircle size={18} /> Add Agent
                  </Button>
                  <span className="text-xs text-muted-foreground mt-1">
                    {agents.length}/{MAX_AGENTS} agents
                  </span>
                </div>
              </div>

              {/* Additional inputs for name and is_one_time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="workflow-name">Workflow Name</Label>
                  <Input
                    id="workflow-name"
                    placeholder={isOneTime ? "Optional for one-time workflows" : "Required for reusable workflows"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isOneTime}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="is-one-time">One-time Workflow</Label>
                    <p className="text-sm text-muted-foreground">
                      One-time workflows are executed once and not saved for future use
                    </p>
                  </div>
                  <Switch 
                    id="is-one-time"
                    checked={isOneTime}
                    onCheckedChange={setIsOneTime}
                  />
                </div>
              </div>
            </Card>

            {/* Agents list */}
            <Card className="p-6">
              <h2 className="text-lg font-medium mb-3">Agent Workflow</h2>
              {agents.length > 0 ? (
                <>
                  <AgentsList 
                    agents={agents} 
                    onDelete={handleDeleteAgent} 
                    onReorder={handleReorderAgents} 
                  />
                  
                  <Alert className="mt-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/50">
                    <KeyRound className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <AlertDescription className="text-sm text-blue-800 dark:text-blue-300">
                      Creating an agent requires your signature using the embedded wallet. You&apos;ll be prompted to sign a message.
                    </AlertDescription>
                  </Alert>
                </>
              ) : (
                <div className="text-center py-12 border border-dashed rounded-lg">
                  <p className="text-muted-foreground">
                    No agents added yet. Add agents to create your workflow.
                  </p>
                </div>
              )}

              {agents.length > 0 && (
                <div className="mt-6 flex justify-end">
                  <Button 
                    onClick={handleSubmit} 
                    disabled={isSubmitting || isSettingWallet || (!isOneTime && !name.trim())} 
                    className="gap-2"
                  >
                    {isSubmitting || isSettingWallet ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> 
                        {isSettingWallet ? "Setting wallet..." : "Creating..."}
                      </>
                    ) : (
                      <>
                        <Save size={18} /> Create Workflow
                      </>
                    )}
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <AddAgentModal 
        isOpen={isModalOpen} 
        disabled={disabled}
        onClose={() => setIsModalOpen(false)} 
        onAddAgent={handleAddAgent} 
      />
    </motion.div>
  );
};

export default CreateAgentPage;
