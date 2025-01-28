type JsonResponse = Record<string, any>;

export class ZerePyClient {
    private baseUrl: string;

    constructor(baseUrl: string = "http://localhost:8000") {
        this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
        this.loadAgent("eternalai-example");
    }

    private async _makeRequest(method: string, endpoint: string, options: { body?: any; headers?: Record<string, string> } = {}): Promise<JsonResponse> {
        const url = `${this.baseUrl}/${endpoint.replace(/^\//, '')}`;
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
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

    async getStatus(): Promise<JsonResponse> {
        return this._makeRequest('GET', '/');
    }

    async listAgents(): Promise<string[]> {
        const response = await this._makeRequest('GET', '/agents');
        return response.agents || [];
    }

    async loadAgent(agentName: string): Promise<JsonResponse> {
        return this._makeRequest('POST', `/agents/${agentName}/load`);
    }

    async listConnections(): Promise<JsonResponse> {
        return this._makeRequest('GET', '/connections');
    }

    async performAction(connection: string, action: string, params: string[] = []): Promise<JsonResponse> {
        return this._makeRequest('POST', '/agent/action', {
            body: {
                connection,
                action,
                params,
            },
        });
    }

    async startAgent(): Promise<JsonResponse> {
        return this._makeRequest('POST', '/agent/start');
    }

    async stopAgent(): Promise<JsonResponse> {
        return this._makeRequest('POST', '/agent/stop');
    }
}