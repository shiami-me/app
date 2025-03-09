"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAccount, useSignMessage } from "wagmi";
import { ZerePyClient } from "@/lib/ZerePyClient";
import { toast } from "sonner";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  MoreVertical, 
  Plus, 
  Loader2, 
  RefreshCw, 
  FileText, 
  Calendar, 
  Users,
  Trash2,
  AlertTriangle,
  MessageCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { useWallets } from "@privy-io/react-auth";
import { useSetActiveWallet } from "@privy-io/wagmi";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Agent {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  agents_list: string[];
  prompts: Record<string, string>;
  data: Record<string, any>;
}

const AgentsPage = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [agentToDelete, setAgentToDelete] = useState<Agent | null>(null);
  const [isSettingWallet, setIsSettingWallet] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  // New state variables for chat functionality
  const [chatDialogOpen, setChatDialogOpen] = useState(false);
  const [agentToChat, setAgentToChat] = useState<Agent | null>(null);
  const [chatTask, setChatTask] = useState("");
  const [isInteracting, setIsInteracting] = useState(false);
  
  const router = useRouter();
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const client = new ZerePyClient("https://api.shiami.me");
  const { wallets, ready: walletsReady } = useWallets();
  const { setActiveWallet } = useSetActiveWallet();

  const fetchAgents = async () => {
    if (!address) return;
    setLoading(true);
    setError(null);
    try {
      const data = await client.listAgents(address);
      console.log(data)
      setAgents(data);
    } catch (err) {
      setError((err as Error).message);
      toast.error("Failed to load agents", {
        description: (err as Error).message
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (address) {
        console.log(address)
        fetchAgents();
    }
  }, [address]);

  const handleCreateNew = () => {
    router.push("/dashboard/create-agent");
  };

  const handleViewLogs = (agentId: string) => {
    router.push(`/dashboard/agents/${agentId}/logs`);
  };

  const handleDeleteClick = (agent: Agent) => {
    setAgentToDelete(agent);
    setDeleteDialogOpen(true);
  };

  const handleDeleteAgent = async () => {
    if (!agentToDelete || !address) return;
    
    setIsDeleting(true);
    
    try {
      // Find and set the embedded wallet as active
      if (walletsReady) {
        const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy');
        
        if (embeddedWallet) {
          setIsSettingWallet(true);
          
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
      
      // Sign the delete authorization message
      const messageToSign = `I authorize deleting agent with ID: ${agentToDelete.id}`;
      let signature;
      
      try {
        signature = await signMessageAsync({ message: messageToSign });
        
        // Call the delete API
        await client.deleteAgent(agentToDelete.id, address, signature);
        
        // Remove the deleted agent from the state - create a new array, don't mutate
        const updatedAgents = agents.filter(agent => agent.id !== agentToDelete.id);
        setAgents(updatedAgents);
        
        toast.success("Agent deleted successfully");
        
        // Force close the dialog and reset states
        setDeleteDialogOpen(false);
        setAgentToDelete(null);
      } catch (error) {
        toast.error("Failed to delete agent", {
          description: (error as Error).message || "Signature rejected or API error"
        });
      }
    } catch (error) {
      toast.error("Failed to delete agent", {
        description: (error as Error).message
      });
    } finally {
      // Always ensure we clean up state even if there was an error
      setIsDeleting(false);
      
      // Add a small delay before resetting dialog state to ensure UI updates properly
      setTimeout(() => {
        if (deleteDialogOpen) {
          setDeleteDialogOpen(false);
          setAgentToDelete(null);
        }
      }, 100);
    }
  };

  // Add useEffect to monitor frozen state and auto-reset if needed
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    
    if (isDeleting) {
      // Set a safety timeout to reset frozen state after 10 seconds
      timeoutId = setTimeout(() => {
        if (isDeleting) {
          setIsDeleting(false);
          setIsSettingWallet(false);
          setDeleteDialogOpen(false);
          setAgentToDelete(null);
          toast.info("Operation timed out, resetting state");
        }
      }, 10000);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isDeleting]);

  const countAgentTypes = (agent: Agent) => {
    const types = new Set(Object.values(agent.data || {}).map(item => item.name));
    return Array.from(types);
  };

  const handleChatClick = (agent: Agent) => {
    setAgentToChat(agent);
    setChatTask("");
    setChatDialogOpen(true);
  };

  const handleInteractAgent = async () => {
    if (!agentToChat || !address || !chatTask.trim()) return;
    
    setIsInteracting(true);
    
    try {
      // Find and set the embedded wallet as active
      if (walletsReady) {
        const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy');
        
        if (embeddedWallet) {
          try {
            await setActiveWallet(embeddedWallet);
          } catch (error) {
            console.error("Failed to set active wallet:", error);
            toast.error("Failed to set embedded wallet as active", {
              description: "Continuing with currently active wallet"
            });
          }
        }
      }
      
      // Send the interaction request
      await client.interactAgent(agentToChat.id, chatTask, address);
      
      toast.success("Task submitted successfully", {
        description: "Check the logs for updates on the task progress"
      });
      
      // Close the dialog and reset states
      setChatDialogOpen(false);
      setAgentToChat(null);
      setChatTask("");
      
      // Refresh the agent logs
      setTimeout(() => {
        router.push(`/dashboard/agents/${agentToChat.id}/logs`);
      }, 500);
      
    } catch (error) {
      toast.error("Failed to interact with agent", {
        description: (error as Error).message
      });
    } finally {
      setIsInteracting(false);
    }
  };

  return (
    <motion.div
      className="p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header with background gradient */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 rounded-xl opacity-70"></div>
        <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-700/20 [mask-image:linear-gradient(0deg,transparent,white)] rounded-xl"></div>
        
        <Card className="border-0 shadow-lg rounded-xl overflow-hidden bg-transparent">
          <div className="p-4 sm:p-6 relative z-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent font-[family-name:var(--font-roboto-mono)]">
                  Agent Workflows
                </h1>
                <p className="text-muted-foreground mt-2">
                  Manage your intelligent agent workflows
                </p>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={fetchAgents} 
                  disabled={loading}
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                </Button>
                <Button 
                  onClick={handleCreateNew} 
                  className="gap-1"
                >
                  <Plus size={16} /> Create Workflow
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {loading && agents.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading agent workflows...</p>
          </div>
        </div>
      ) : error ? (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
            <CardDescription>Failed to load agent workflows</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={fetchAgents}>
              <RefreshCw className="h-4 w-4 mr-2" /> Try Again
            </Button>
          </CardFooter>
        </Card>
      ) : agents.length === 0 ? (
        <Card className="border-dashed border-2 p-8">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium">No Agent Workflows Found</h3>
              <p className="text-muted-foreground mt-1">
                Get started by creating your first agent workflow
              </p>
            </div>
            <Button onClick={handleCreateNew} className="mt-2">
              <Plus size={16} className="mr-1" /> Create Workflow
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Your Agent Workflows</CardTitle>
              <CardDescription>
                Manage and monitor your intelligent agent workflows
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Agents</TableHead>
                    <TableHead className="hidden md:table-cell">Created</TableHead>
                    <TableHead className="hidden lg:table-cell">Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agents.map((agent) => (
                    <TableRow key={agent.id}>
                      <TableCell className="font-medium">{agent.name || "-"}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {countAgentTypes(agent).map((type, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {type}
                            </Badge>
                          ))}
                          <Badge variant="secondary" className="text-xs">
                            {agent.agents_list.length} agents
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-3.5 w-3.5" />
                          <span>{format(new Date(agent.created_at), "MMM d, yyyy")}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground">
                        {format(new Date(agent.updated_at), "MMM d, yyyy HH:mm")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleViewLogs(agent.id)}
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            <span className="hidden sm:inline">Logs</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleChatClick(agent)}
                            className="ml-1"
                          >
                            <MessageCircle className="h-4 w-4 mr-1" />
                            <span className="hidden sm:inline">Chat</span>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="ml-1 h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewLogs(agent.id)}>
                                <FileText className="mr-2 h-4 w-4" />
                                View Logs
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleChatClick(agent)}>
                                <MessageCircle className="mr-2 h-4 w-4" />
                                Send Task
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => handleDeleteClick(agent)}
                                className="text-red-500 focus:text-red-500"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Agent
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog 
        open={deleteDialogOpen} 
        onOpenChange={(open) => {
          // Only allow closing if we're not in the middle of deleting
          if (!isDeleting) {
            setDeleteDialogOpen(open);
            if (!open) setAgentToDelete(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Confirm Deletion
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this agent workflow?
              {agentToDelete && (
                <div className="mt-2 font-medium">
                  {agentToDelete.name || "Unnamed workflow"}
                </div>
              )}
              <div className="mt-2 text-amber-600 dark:text-amber-500">
                This action requires signature verification and cannot be undone.
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e: any) => {
                e.preventDefault();
                handleDeleteAgent();
              }}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isSettingWallet ? "Setting wallet..." : "Deleting..."}
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Chat Interaction Dialog */}
      <Dialog open={chatDialogOpen} onOpenChange={(open) => {
        if (!isInteracting) {
          setChatDialogOpen(open);
          if (!open) setAgentToChat(null);
        }
      }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              Send Task to Agent
            </DialogTitle>
            {agentToChat && (
              <p className="text-sm text-muted-foreground mt-1">
                {agentToChat.name || "Unnamed agent"} will process your task asynchronously
              </p>
            )}
          </DialogHeader>
          
          <div className="py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="task" className="text-sm font-medium">
                  Task Description
                </label>
                <Textarea
                  id="task"
                  placeholder="Describe what you want the agent to do..."
                  rows={4}
                  className="resize-none"
                  value={chatTask}
                  onChange={(e) => setChatTask(e.target.value)}
                />
              </div>
              {agentToChat && (
                <div className="bg-muted p-3 rounded-lg space-y-2">
                  <h4 className="text-sm font-medium">Agent Details</h4>
                  <div className="flex flex-wrap gap-1">
                    {countAgentTypes(agentToChat).map((type, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setChatDialogOpen(false)}
              disabled={isInteracting}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleInteractAgent}
              disabled={isInteracting || !chatTask.trim()}
              className="gap-2"
            >
              {isInteracting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <MessageCircle className="h-4 w-4" /> Send Task
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default AgentsPage;
