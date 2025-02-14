"use client";

import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { ToolCard } from "@/components/ui/tool-card";
import { ZerePyClient } from "@/lib/ZerePyClient";

interface Tool {
  id: string;
  name: string;
  type: "social" | "content" | "blockchain" | "research";
  description: string;
  config_options: Array<{
    name: string;
    type: string;
    description: string;
    required: boolean;
    default?: string;
  }>;
  config?: Record<string, any>;
}

export default function AgentBuilder() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [selectedTools, setSelectedTools] = useState<Tool[]>([]);
  const [agentName, setAgentName] = useState("");
  const [toast, setToast] = useState<{ title: string; description?: string; variant: "success" | "error" } | null>(null);

  // Load tools from API
  useEffect(() => {
    const client = new ZerePyClient();
    client.listTools().then((response) => {
      setTools(response.tools);
    });
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <SidebarProvider>
        {toast && (
          <Toast
            {...toast}
            onClose={() => setToast(null)}
          />
        )}
        <AppSidebar />
        <SidebarInset>
          <div className="flex h-screen">
            {/* Tool Library */}
            <div className="w-1/4 border-r p-4">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Create an agent that..."
                  className="w-full p-2 border rounded mb-2"
                  onKeyDown={async (e) => {
                    if (e.key === 'Enter' && e.currentTarget.value) {
                      try {
                        const client = new ZerePyClient();
                        const result = await client.createAgentFromPrompt(e.currentTarget.value);
                        setToast({
                          title: "Success",
                          description: "Agent created successfully!",
                          variant: "success"
                        });
                        setTimeout(() => {
                          window.location.href = "/dashboard";
                        }, 2000);
                      } catch (error) {
                        setToast({
                          title: "Error",
                          description: "Failed to create agent from description",
                          variant: "error"
                        });
                      }
                    }
                  }}
                />
                <p className="text-sm text-gray-500">Press Enter to create from description, or drag tools below</p>
              </div>
              <h2 className="text-xl font-bold mb-4">Available Tools</h2>
              <div className="space-y-2">
                {tools.map((tool) => (
                  <div
                    key={tool.id}
                    className="p-3 border rounded cursor-move hover:bg-gray-50"
                    draggable="true"
                    onDragStart={(e) => {
                      e.dataTransfer.setData("tool", JSON.stringify(tool));
                    }}
                  >
                    <h3 className="font-medium">{tool.name}</h3>
                    <p className="text-sm text-gray-600">{tool.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Build Area */}
            <div 
              className="w-1/2 p-4"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const tool = JSON.parse(e.dataTransfer.getData("tool"));
                setSelectedTools([...selectedTools, tool]);
              }}
            >
              <h2 className="text-xl font-bold mb-4">Agent Builder</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Agent Name"
                  className="w-full p-2 border rounded"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                />
                <div className="min-h-[400px] border-2 border-dashed rounded-lg p-4">
                  {selectedTools.length === 0 ? (
                    <div className="text-center text-gray-500 mt-8">
                      Drag tools here to build your agent
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {selectedTools.map((tool, index) => (
                        <ToolCard
                          key={index}
                          tool={tool}
                          onConfigChange={(config) => {
                            const updatedTools = [...selectedTools];
                            updatedTools[index] = {...tool, config};
                            setSelectedTools(updatedTools);
                          }}
                          onRemove={() => {
                            const updatedTools = selectedTools.filter((_, i) => i !== index);
                            setSelectedTools(updatedTools);
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Preview/Deploy */}
            <div className="w-1/4 border-l p-4">
              <h2 className="text-xl font-bold mb-4">Preview</h2>
              <div className="space-y-4">
                <div className="p-3 border rounded">
                  <h3 className="font-medium">Agent Configuration</h3>
                  <pre className="text-sm mt-2">
                    {JSON.stringify(
                      {
                        name: agentName,
                        tools: selectedTools.map(t => ({
                          id: t.id,
                          name: t.name,
                          config: t.config
                        }))
                      },
                      null,
                      2
                    )}
                  </pre>
                </div>
                <button
                  className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={async () => {
                    if (!agentName) {
                      setToast({
                        title: "Error",
                        description: "Please enter an agent name",
                        variant: "error"
                      });
                      return;
                    }

                    if (selectedTools.length === 0) {
                      setToast({
                        title: "Error",
                        description: "Please select at least one tool",
                        variant: "error"
                      });
                      return;
                    }

                    try {
                      const client = new ZerePyClient();
                      await client.createAgent(agentName, selectedTools);
                      setToast({
                        title: "Success",
                        description: "Agent created successfully!",
                        variant: "success"
                      });
                      
                      // Reset form
                      setAgentName("");
                      setSelectedTools([]);

                      // Redirect to dashboard after 2 seconds
                      setTimeout(() => {
                        window.location.href = "/dashboard";
                      }, 2000);
                    } catch (error) {
                      setToast({
                        title: "Error",
                        description: error instanceof Error ? error.message : "Failed to create agent",
                        variant: "error"
                      });
                    }
                  }}
                >
                  Create Agent
                </button>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </DndProvider>
  );
}