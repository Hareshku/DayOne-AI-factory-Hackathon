/* ─── Company run (response from POST /api/analyze) ─── */

export interface CompanyRun {
  session_id: string;
  status: string; // always "started" from this endpoint; not re-fetched afterward
  message: string;
  // Not actually returned by the backend - kept optional so App.tsx's
  // existing optional-chaining reads (run?.idea_text etc.) stay type-safe
  idea_text?: string;
  company_name?: string;
}

/* ─── Live agent message (WebSocket) ─────────────────── */

export interface LiveMessage {
  agent: 'research' | 'product' | 'finance' | 'legal' | 'marketing' | 'ceo' | 'system';
  message: string;
  timestamp: string;
  type: 'info' | 'challenge' | 'resolution' | 'error' | 'ping';
}

/* ─── Dossier ────────────────────────────────────────── */

export interface Challenge {
  raised_by: 'finance' | 'legal';
  target: string;
  reason: string;
  resolution: string;
}

export interface Dossier {
  idea: string;
  problem_statement: string;
  target_audience: string;
  competitors: string[];
  unique_value_prop: string;
  mvp_scope: string[];
  tech_stack: string[];
  revenue_model: string;
  legal_structure: string;
  compliance_requirements: string[];
  marketing_strategy: string;
  target_channels: string[];
  challenges: Challenge[];
  elevator_pitch: string;
}

/* ─── Full session result (response from GET /api/result/:id) ─ */

export interface SessionResult {
  session_id: string;
  status: 'running' | 'completed' | 'error';
  dossier: Dossier | null;
  messages: LiveMessage[];
  created_at: string;
}

/* ─── Error ──────────────────────────────────────────── */

export interface ApiError {
  error: string;
  message: string;
  status: number;
}