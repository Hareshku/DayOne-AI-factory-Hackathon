interface HistoryEntry {
  sessionId: string;
  companyName: string;
  timestamp: string;
}

const STORAGE_KEY = 'dayone_history';

export function getHistory(): HistoryEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addToHistory(sessionId: string, companyName: string): void {
  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      sessionId,
      companyName,
      timestamp: new Date().toISOString(),
    };

    // Remove duplicate if exists, add to front
    const filtered = history.filter((h) => h.sessionId !== sessionId);
    filtered.unshift(entry);

    // Keep last 20 entries
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered.slice(0, 20)));
  } catch {
    // localStorage unavailable
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // localStorage unavailable
  }
}