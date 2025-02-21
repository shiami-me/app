import { Message } from "@/types/messages";

type JsonResponse = Record<string, any>;

export class ZerePyClient {
  private baseUrl: string;

  constructor(baseUrl: string = "http://localhost:8000") {
    this.baseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
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
    endpoint: string,
    body: any,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ): Promise<void> {
    const url = `${this.baseUrl}/${endpoint.replace(/^\//, "")}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.statusText}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("Readable stream not supported");

      const decoder = new TextDecoder();
      let fullResponse = "";
      let messageId: number;
      setMessages((prev) => {
        messageId = prev.length + 1;
        return [
          ...prev,
          { id: prev.length + 1, sender: "bot", text: "" }, // Initialize message
        ];
      });

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        try {
          const parsed = JSON.parse(fullResponse);
          if (parsed.tool) {
            fullResponse = "";
          }
        } catch {
          console.log("Not tool");
        }
        try {
          const parsed = JSON.parse(chunk);
          if (parsed.type || parsed.tool || (parsed.approve && parsed.swap) || Array.isArray(parsed)) {
            fullResponse += chunk;
          }
        } catch {
          fullResponse += chunk;
        }

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId ? { ...msg, text: fullResponse } : msg
          )
        );
      }
      setIsLoading(false);
    } catch (error) {
      throw new Error(`Streaming request failed: ${(error as Error).message}`);
    }
  }

  async getStatus(): Promise<JsonResponse> {
    return this._makeRequest("GET", "/");
  }

  async listAgents(): Promise<string[]> {
    const response = await this._makeRequest("GET", "/agents");
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
    params: string[] = []
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
      "/agent/chat",
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
}
