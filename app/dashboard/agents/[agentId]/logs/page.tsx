"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { ZerePyClient } from "@/lib/ZerePyClient";
import { toast } from "sonner";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Loader2, 
  RefreshCw, 
  ChevronLeft, 
  Clock, 
  AlertCircle,
  FileText,
  PlayCircle,
  MessageCircle
} from "lucide-react";
import { format } from "date-fns";

interface BaseLogEntry {
  timestamp: string;
}

interface TaskLogEntry extends BaseLogEntry {
  task: string;
  type?: string;
}

interface ContentLogEntry extends BaseLogEntry {
  content: string;
}

type LogEntry = TaskLogEntry | ContentLogEntry;

interface AgentLogs {
  agent_id: string;
  name: string;
  logs: LogEntry[];
}

// Type guard to distinguish between log entry types
function isTaskLog(log: LogEntry): log is TaskLogEntry {
  return 'task' in log;
}

function isContentLog(log: LogEntry): log is ContentLogEntry {
  return 'content' in log;
}

const AgentLogsPage = () => {
  const [logs, setLogs] = useState<AgentLogs | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();
  const client = new ZerePyClient();
  const agentId = params?.agentId as string;

  const fetchLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await client.getAgentLogs(agentId);
      setLogs(data);
    } catch (err) {
      setError((err as Error).message);
      toast.error("Failed to load agent logs", {
        description: (err as Error).message
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (agentId) {
      fetchLogs();
    }
  }, [agentId]);

  const handleBack = () => {
    router.push("/dashboard/agents");
  };

  // Helper function to get appropriate icon based on log type
  const getLogIcon = (log: LogEntry) => {
    if (isTaskLog(log) && log.type === 'task_start') {
      return <PlayCircle className="h-4 w-4 text-primary" />;
    } else if (isContentLog(log)) {
      return <MessageCircle className="h-4 w-4 text-primary" />;
    } else {
      return <FileText className="h-4 w-4 text-primary" />;
    }
  };

  // Helper function to get log message content
  const getLogContent = (log: LogEntry) => {
    if (isTaskLog(log)) {
      return log.task;
    } else if (isContentLog(log)) {
      return log.content;
    }
    return "Unknown log format";
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
        <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-blue-50 dark:from-slate-900/30 dark:to-blue-900/30 rounded-xl opacity-70"></div>
        <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-700/20 [mask-image:linear-gradient(0deg,transparent,white)] rounded-xl"></div>
        
        <Card className="border-0 shadow-lg rounded-xl overflow-hidden bg-transparent">
          <div className="p-4 sm:p-6 relative z-10">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBack} 
              className="mb-2"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Back to Agents
            </Button>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-slate-700 to-blue-600 dark:from-slate-300 dark:to-blue-400 bg-clip-text text-transparent font-[family-name:var(--font-roboto-mono)]">
                  Agent Logs
                </h1>
                {logs && (
                  <p className="text-muted-foreground mt-1">
                    Viewing execution logs for <span className="font-medium">{logs.name || "Agent"}</span>
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={fetchLogs} 
                  disabled={loading}
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading agent logs...</p>
          </div>
        </div>
      ) : error ? (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
            <CardDescription>Failed to load agent logs</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      ) : logs && logs.logs && logs.logs.length > 0 ? (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Execution Logs</CardTitle>
            <CardDescription>
              View the execution history of this agent workflow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {logs.logs.map((log, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start gap-4">
                    <div className="min-w-[40px] mt-1">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        {getLogIcon(log)}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(log.timestamp), "MMM d, yyyy HH:mm:ss")}
                        </span>
                        {isTaskLog(log) && log.type && (
                          <span className="text-xs px-2 py-0.5 bg-secondary rounded-full">
                            {log.type}
                          </span>
                        )}
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <p className="text-sm whitespace-pre-wrap">{getLogContent(log)}</p>
                      </div>
                    </div>
                  </div>
                  {index < logs.logs.length - 1 && (
                    <div className="absolute left-4 top-8 h-[calc(100%-8px)] w-[1px] bg-border"></div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-dashed border-2 p-8">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <AlertCircle className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium">No Logs Found</h3>
              <p className="text-muted-foreground mt-1">
                This agent doesn&apos;t have any execution logs yet
              </p>
            </div>
          </div>
        </Card>
      )}
    </motion.div>
  );
};

export default AgentLogsPage;
