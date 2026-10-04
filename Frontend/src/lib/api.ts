import { config } from './config';
import type { CompanyRun, Dossier, SessionResult } from './types';

// A real Error subclass, so `err instanceof Error` works everywhere
// (a plain object literal thrown as `throw {...}` is never `instanceof Error`,
// which is what caused real API error messages to get swallowed).
export class ApiRequestError extends Error {
  error: string;
  status: number;

  constructor(message: string, error: string, status: number) {
    super(message);
    this.name = 'ApiRequestError';
    this.error = error;
    this.status = status;
  }
}

class ApiClient {
  private async request<T>(url: string, options?: RequestInit): Promise<T> {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      throw new ApiRequestError(
        body?.detail || body?.message || `Request failed with status ${res.status}`,
        body?.error || 'request_failed',
        res.status
      );
    }

    return res.json();
  }

  async createRun(companyName: string): Promise<CompanyRun> {
    return this.request<CompanyRun>(config.api.endpoints.createRun(), {
      method: 'POST',
      body: JSON.stringify({ idea: companyName }),
    });
  }

  async getDossier(sessionId: string): Promise<Dossier> {
    const result = await this.request<SessionResult>(config.api.endpoints.getDossier(sessionId));
    if (!result.dossier) {
      throw new ApiRequestError(
        `Session is ${result.status} — dossier not available yet`,
        'not_ready',
        202
      );
    }
    return result.dossier;
  }

  /**
   * Same as getDossier, but retries on the "not_ready" race (backend hasn't
   * finished persisting the dossier a beat after the WS "complete" message,
   * or a 503 while Render's free-tier instance wakes up).
   */
  async getDossierWithRetry(
    sessionId: string,
    { retries = 4, delayMs = 1500 }: { retries?: number; delayMs?: number } = {}
  ): Promise<Dossier> {
    let lastErr: unknown;
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await this.getDossier(sessionId);
      } catch (err) {
        lastErr = err;
        const retryable =
          err instanceof ApiRequestError && (err.status === 202 || err.status === 503);
        if (!retryable || attempt === retries) break;
        await new Promise((r) => setTimeout(r, delayMs));
      }
    }
    throw lastErr;
  }

  getRunStreamUrl(sessionId: string): string {
    return config.api.endpoints.getRunStream(sessionId);
  }

  async streamRun(
    sessionId: string,
    onMessage: (data: string) => void,
    onError?: (err: Error) => void,
    onComplete?: () => void
  ): Promise<{ abort: () => void }> {
    const ws = new WebSocket(config.api.endpoints.getRunStream(sessionId));

    ws.onmessage = (event) => {
      onMessage(event.data);
    };

    ws.onerror = () => {
      onError?.(new Error('WebSocket connection error'));
    };

    ws.onclose = () => {
      onComplete?.();
    };

    return {
      abort: () => ws.close(),
    };
  }
}

export const api = new ApiClient();