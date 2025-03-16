import { Message } from "@/types/messages";

type JsonResponse = Record<string, any>;

export class ZerePyClient {
  private baseUrl: string;
  private wsBaseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    this.wsBaseUrl = this.baseUrl.replace(/^http/, 'ws');
  }

  private async _makeRequest(
    method: string,
    endpoint: string,
    options: { body?: any; headers?: Record<string, string> } = {}
  ): Promise<JsonResponse> {
    const url = `${this.baseUrl}/${endpoint.replace(/^\//, "")}`;
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
        ...(options.body && { body: JSON.stringify(options.body) }),
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Request failed: ${(error as Error).message}`);
    }
  }

  private async _makeGenerateRequest(
    body: any,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ): Promise<void> {
    this._makeWebSocketGenerateRequest(body, setMessages, setIsLoading);

  }

  private _makeWebSocketGenerateRequest(
    body: any,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ): void {
    // Create WebSocket connection
    const ws = new WebSocket(`${this.wsBaseUrl}/ws/agent/chat`);
    let fullResponse = "";
    let messageId: number;

    ws.onopen = () => {
      ws.send(JSON.stringify(body));
      
      setMessages((prev) => {
        messageId = prev.length + 1;
        return [
          ...prev,
          { id: prev.length + 1, sender: "bot", text: "" },
        ];
      });
    };

    // Process incoming messages
    ws.onmessage = (event) => {
      const chunk = event.data;
      
      try {
        const parsed = JSON.parse(chunk);
        
        if (parsed.status === "complete") {
          ws.close();
          setIsLoading(false);
          return;
        } else if (parsed.status === "error") {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === messageId ? { ...msg, text: `Error: ${parsed.error}` } : msg
            )
          );
          ws.close();
          setIsLoading(false);
          return;
        }
        if (parsed.tool) {
          fullResponse = "";
        }
        if (
          parsed.type ||
          parsed.tool ||
          (parsed.approve && parsed.swap) || 
          (parsed.permitData) ||
          (parsed.transaction) ||
          (parsed.strategies) ||
          Array.isArray(parsed)
        ) {
          try {
            const fullParsed = JSON.parse(fullResponse);
            if (fullParsed.tool) {
              fullResponse = "";
            }
          } catch {
            console.log("Not tool");
          }
          fullResponse += chunk;
        }
      } catch {
        if (!fullResponse.includes("type") && !fullResponse.includes("transaction") && !fullResponse.includes("permitData") && !fullResponse.includes("strategies_count")) {
          try {
            const fullParsed = JSON.parse(fullResponse);
            if (fullParsed.tool) {
              fullResponse = "";
            }
          } catch {
            console.log("Not tool");
          }
          fullResponse += chunk;
        }
      }

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, text: fullResponse } : msg
        )
      );
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, text: "Error: Connection failed" } : msg
        )
      );
      setIsLoading(false);
    };

    ws.onclose = () => {
      setIsLoading(false);
    };
  }

  async getStatus(): Promise<JsonResponse> {
    return this._makeRequest("GET", "/");
  }

  async listAgents(userAddress?: string): Promise<any[]> {
    const endpoint = userAddress ? `/agents?user_address=${userAddress}` : "/agents";
    const response = await this._makeRequest("GET", endpoint);
    return response.agents || [];
  }

  async loadAgent(agentName: string): Promise<JsonResponse> {
    return this._makeRequest("POST", `/agents/${agentName}/load`);
  }

  async listConnections(): Promise<JsonResponse> {
    return this._makeRequest("GET", "/connections");
  }

  async performAction(
    connection: string,
    action: string,
    params: any[] = []
  ): Promise<JsonResponse> {
    return this._makeRequest("POST", "/agent/action", {
      body: {
        connection,
        action,
        params,
      },
    });
  }

  async agentChat(
    connection: string,
    action: string,
    params: string[] = [],
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ): Promise<void> {
    this._makeGenerateRequest(
      {
        connection,
        action,
        params,
      },
      setMessages,
      setIsLoading
    );
  }

  async startAgent(): Promise<JsonResponse> {
    return this._makeRequest("POST", "/agent/start");
  }

  async stopAgent(): Promise<JsonResponse> {
    return this._makeRequest("POST", "/agent/stop");
  }

  async createAgent(
    agents: string[],
    prompts: Record<string, string>,
    data: Record<string, Record<string, any>>,
    task: string,
    user_address?: string,
    name?: string,
    is_one_time: boolean = true,
    signature?: string
  ): Promise<JsonResponse> {
    return this._makeRequest("POST", "/agent/create", {
      body: {
        agents,
        prompts,
        data,
        task,
        user_address,
        name,
        is_one_time,
        signature, // Add the signature field
      },
    });
  }

  async deleteAgent(
    agentId: string,
    user_address: string,
    signature: string
  ): Promise<JsonResponse> {
    return this._makeRequest("DELETE", `/agent/${agentId}`, {
      body: {
        user_address,
        signature,
      },
    });
  }

  async getAgentLogs(agentId: string): Promise<any> {
    return this._makeRequest("GET", `/agent/${agentId}/logs`);
  }

  async interactAgent(
    agentId: string,
    task: string,
    user_address: string
  ): Promise<JsonResponse> {
    return this._makeRequest("POST", `/agent/${agentId}/interact`, {
      body: {
        task,
        user_address,
      },
    });
  }
}
