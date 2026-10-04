import { useState, useCallback, useRef } from 'react';
import { api } from '../lib/api';
import { addToHistory } from '../lib/history';
import type { CompanyRun, LiveMessage, Dossier, ApiError } from '../lib/types';

interface UseCompanyRunReturn {
  run: CompanyRun | null;
  messages: LiveMessage[];
  dossier: Dossier | null;
  isLoading: boolean;
  error: string | null;
  startRun: (companyName: string) => Promise<string | null>;
  abortRun: () => void;
}

export function useCompanyRun(): UseCompanyRunReturn {
  const [run, setRun] = useState<CompanyRun | null>(null);
  const [messages, setMessages] = useState<LiveMessage[]>([]);
  const [dossier, setDossier] = useState<Dossier | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<{ abort: () => void } | null>(null);
  const dossierFetchedRef = useRef(false);

  const startRun = useCallback(async (companyName: string): Promise<string | null> => {
    setIsLoading(true);
    setError(null);
    setMessages([]);
    setDossier(null);
    setRun(null);
    dossierFetchedRef.current = false;

    try {
      const newRun = await api.createRun(companyName);
      setRun(newRun);
      addToHistory(newRun.session_id, companyName);

      const fetchDossier = () => {
        if (dossierFetchedRef.current) return;
        dossierFetchedRef.current = true;
        api.getDossier(newRun.session_id)
          .then(setDossier)
          .catch((err: ApiError | Error) => {
            setError('message' in err ? err.message : 'Failed to load dossier');
          });
      };

      const controller = await api.streamRun(
        newRun.session_id,
        (data) => {
          let msg: LiveMessage;
          try {
            msg = JSON.parse(data);
          } catch {
            return; // non-JSON payload — ignore
          }

          if (msg.type === 'ping') return;

          setMessages((prev) => [...prev, msg]);

          if (msg.type === 'error') {
            setError(msg.message);
            setIsLoading(false);
            return;
          }

          if (msg.agent === 'system' && msg.message.toLowerCase().includes('complete')) {
            setIsLoading(false);
            fetchDossier();
          }
        },
        (err) => {
          setError(err.message);
          setIsLoading(false);
        },
        () => {
          setIsLoading(false);
          fetchDossier();
        }
      );

      abortRef.current = controller;
      return newRun.session_id;
    } catch (err) {
      const msg = err instanceof Error ? err.message : (err as ApiError)?.message || 'Failed to start analysis';
      setError(msg);
      setIsLoading(false);
      return null;
    }
  }, []);

  const abortRun = useCallback(() => {
    abortRef.current?.abort();
    setIsLoading(false);
  }, []);

  return { run, messages, dossier, isLoading, error, startRun, abortRun };
}