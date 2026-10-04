import { lazy, Suspense, useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { useCompanyRun } from './hooks/useCompanyRun';
import { api } from './lib/api';
import type { Dossier } from './lib/types';

// Lazy-load the heavier sections
const Hero = lazy(() => import('./components/Hero'));
const ProblemSection = lazy(() => import('./components/ProblemSection'));
const HowItWorks = lazy(() => import('./components/HowItWorks'));
const BoardroomPreview = lazy(() => import('./components/BoardroomPreview'));
const PipelineBlueprint = lazy(() => import('./components/PipelineBlueprint'));
const CTA = lazy(() => import('./components/CTA'));
const LiveMessage = lazy(() => import('./components/LiveMessage'));
const DossierGrid = lazy(() => import('./components/DossierGrid'));

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex items-center gap-1.5" aria-label="Loading">
        <span className="w-2 h-2 rounded-full bg-accent/60 animate-bounce" style={{ animationDelay: '0s' }} />
        <span className="w-2 h-2 rounded-full bg-accent/60 animate-bounce" style={{ animationDelay: '0.15s' }} />
        <span className="w-2 h-2 rounded-full bg-accent/60 animate-bounce" style={{ animationDelay: '0.3s' }} />
      </div>
    </div>
  );
}

function ProgressBar() {
  return (
    <div className="w-full h-1 bg-background overflow-hidden rounded-full">
      <div className="h-full w-full bg-accent origin-left animate-[progress_2s_ease-in-out_infinite]" />
    </div>
  );
}

/* ─── Landing Page ─────────────────────────────────────── */

function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = useCallback((idea: string) => {
    if (idea.trim()) {
      navigate(`/company/${encodeURIComponent(idea.trim())}`);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [navigate]);

  return (
    <main>
      <Suspense fallback={<LoadingFallback />}>
        <Hero onGetStarted={handleGetStarted} />
        <ProblemSection />
        <HowItWorks />
        <BoardroomPreview />
        <PipelineBlueprint />
        <CTA onGetStarted={handleGetStarted} />
      </Suspense>
    </main>
  );
}

/* ─── Company Analysis Page ───────────────────────────── */

function CompanyPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const { run, messages, dossier, isLoading, error, startRun } = useCompanyRun();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized && sessionId) {
      setInitialized(true);
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(sessionId);
      if (!isUUID) {
        startRun(sessionId);
      }
    }
  }, [sessionId, initialized, startRun]);

  // Navigate to dossier on completion — hand off the dossier we already
  // fetched via the WebSocket flow so DossierPage doesn't have to
  // re-fetch it from scratch (that redundant re-fetch was the source of
  // the "Failed to load dossier" error appearing after a successful run).
  useEffect(() => {
    if (dossier && run?.session_id) {
      navigate(`/company/${run.session_id}/dossier`, { replace: true, state: { dossier } });
    }
  }, [dossier, run, navigate]);

  const ideaDisplay = run?.idea_text || run?.company_name || sessionId;

  return (
    <main className="min-h-screen pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-heading font-semibold text-foreground mb-2">
            {isLoading
              ? 'Opening the office...'
              : run?.status === 'completed'
                ? 'Boardroom complete'
                : error
                  ? 'Boardroom adjourned'
                  : `Analyzing: ${ideaDisplay}`}
          </h1>
          <p className="text-foreground/50 text-sm">
            {isLoading
              ? 'The agents are taking their seats. Research is analyzing the market, Finance is preparing to challenge...'
              : error
                ? 'Something went wrong in the boardroom'
                : messages.length > 0
                  ? `${messages.length} messages exchanged — dossier being compiled`
                  : 'Enter your startup idea to open the boardroom'}
          </p>
        </div>

        {/* Error state */}
        {error && (
          <div className="p-6 rounded-2xl bg-destructive/5 border border-destructive/10 mb-6">
            <div className="flex items-start gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-destructive shrink-0 mt-0.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M15 9l-6 6M9 9l6 6" />
              </svg>
              <div>
                <p className="text-sm font-medium text-destructive mb-1">Analysis Failed</p>
                <p className="text-sm text-foreground/60">{error}</p>
                <button
                  onClick={() => sessionId && startRun(sessionId)}
                  className="mt-3 px-4 py-2 text-sm bg-accent text-white rounded-lg hover:brightness-110 transition-all active:scale-[0.97] cursor-pointer"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Progress bar */}
        {isLoading && <ProgressBar />}

        {/* Live messages */}
        <div className="space-y-3 mb-8 mt-6">
          {messages.length === 0 && !isLoading && !error && (
            <div className="p-12 rounded-2xl bg-card border border-border/50 text-center">
              <p className="text-foreground/50 mb-2">The boardroom is empty</p>
              <p className="text-xs text-foreground/40">Submit your startup idea and six AI agents will debate it live.</p>
            </div>
          )}
          {messages.map((msg, i) => (
            <LiveMessage key={i} message={msg} />
          ))}
          {isLoading && messages.length > 0 && (
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="flex items-center gap-1.5" aria-label="Loading">
                <span className="w-2 h-2 rounded-full bg-accent/60 animate-bounce" style={{ animationDelay: '0s' }} />
                <span className="w-2 h-2 rounded-full bg-accent/60 animate-bounce" style={{ animationDelay: '0.15s' }} />
                <span className="w-2 h-2 rounded-full bg-accent/60 animate-bounce" style={{ animationDelay: '0.3s' }} />
              </div>
              <span className="text-xs text-foreground/40">Agents are deliberating...</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

/* ─── Dossier Page ────────────────────────────────────── */

function DossierPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const preloadedDossier = (location.state as { dossier?: Dossier } | null)?.dossier ?? null;

  const [dossier, setDossier] = useState<Dossier | null>(preloadedDossier);
  const [pageLoading, setPageLoading] = useState(!preloadedDossier);
  const [pageError, setPageError] = useState<string | null>(null);

  useEffect(() => {
    // Already have it (handed off from CompanyPage) — no need to hit the
    // API again at all.
    if (preloadedDossier) {
      setDossier(preloadedDossier);
      setPageLoading(false);
      setPageError(null);
      return;
    }

    // Direct link / page refresh case — nothing was handed off, so fetch
    // it, with retries for the "not_ready"/503 race the backend can hit
    // right after a run finishes.
    if (!sessionId) return;

    setPageLoading(true);
    setPageError(null);

    api.getDossierWithRetry(sessionId)
      .then((d) => {
        setDossier(d);
        setPageLoading(false);
      })
      .catch((err) => {
        setPageError('message' in err ? err.message : 'Failed to load dossier');
        setPageLoading(false);
      });
  }, [sessionId, preloadedDossier]);

  if (pageLoading) {
    return (
      <main className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5 mb-4" aria-label="Loading">
            <span className="w-2 h-2 rounded-full bg-accent/60 animate-bounce" style={{ animationDelay: '0s' }} />
            <span className="w-2 h-2 rounded-full bg-accent/60 animate-bounce" style={{ animationDelay: '0.15s' }} />
            <span className="w-2 h-2 rounded-full bg-accent/60 animate-bounce" style={{ animationDelay: '0.3s' }} />
          </div>
          <p className="text-sm text-foreground/50">Compiling your startup dossier...</p>
        </div>
      </main>
    );
  }

  if (pageError) {
    return (
      <main className="min-h-screen pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-2xl bg-destructive/5 border border-destructive/10 text-center">
            <p className="text-destructive font-medium mb-2">Could not load dossier</p>
            <p className="text-sm text-foreground/60 mb-6">{pageError}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-accent text-white rounded-xl font-semibold hover:brightness-110 transition-all active:scale-[0.97] cursor-pointer"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {dossier ? (
          <Suspense fallback={<LoadingFallback />}>
            <DossierGrid dossier={dossier} />
          </Suspense>
        ) : (
          <div className="p-12 rounded-2xl bg-card border border-border/50 text-center">
            <p className="text-foreground/50 mb-2">No dossier found for this session.</p>
            <p className="text-xs text-foreground/40 mb-6 font-mono">{sessionId}</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-accent text-white rounded-xl font-semibold hover:brightness-110 transition-all active:scale-[0.97] cursor-pointer"
            >
              Start a New Analysis
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

/* ─── Not Found ────────────────────────────────────────── */

function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pt-20 pb-16 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-heading font-semibold text-gradient mb-4">404</h1>
        <p className="text-foreground/60 mb-8 text-lg">This page doesn't exist.</p>
        <button
          onClick={() => navigate('/')}
          className="px-8 py-4 bg-accent text-white rounded-xl font-semibold hover:brightness-110 transition-all active:scale-[0.98] cursor-pointer"
        >
          Go Home
        </button>
      </div>
    </main>
  );
}

/* ─── App Root ───────────────────────────────────────────── */

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/company/:sessionId" element={<CompanyPage />} />
          <Route path="/company/:sessionId/dossier" element={<DossierPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}