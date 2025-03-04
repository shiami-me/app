"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
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
  Users 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

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
  const router = useRouter();
  const { address } = useAccount();
  const client = new ZerePyClient();

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

  const countAgentTypes = (agent: Agent) => {
    const types = new Set(Object.values(agent.data || {}).map(item => item.name));
    return Array.from(types);
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
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="ml-2 h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewLogs(agent.id)}>
                                <FileText className="mr-2 h-4 w-4" />
                                View Logs
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
    </motion.div>
  );
};

export default AgentsPage;
