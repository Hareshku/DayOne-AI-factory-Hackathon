import Stamp from './Stamp';
import { useState, useCallback } from 'react';

interface HeroProps {
  onGetStarted?: (idea: string) => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  const [idea, setIdea] = useState('');

  const handleSubmit = useCallback(() => {
    if (!idea.trim()) return;
    if (onGetStarted) {
      onGetStarted(idea.trim());
    } else {
      // Fallback: navigate directly from the input value
      window.location.href = `/company/${encodeURIComponent(idea.trim())}`;
    }
  }, [idea, onGetStarted]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-dotgrid-glow">
      {/* Gradient overlay */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-40">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Stamp text="AI Startup Simulator" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-semibold leading-tight mb-6">
            Every Company Starts{' '}
            <span className="text-gradient">With an Idea</span>
          </h1>

          <p className="text-lg sm:text-xl text-foreground/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Day One turns a single sentence into an autonomous AI company.
            Six specialist agents debate your idea in a live boardroom —
            challenging assumptions, refining strategy, and producing a
            complete startup dossier in minutes.
          </p>

          {/* Idea input */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
            <input
              type="text"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSubmit();
              }}
              placeholder="What's your startup idea?"
              aria-label="Enter your startup idea"
              className="px-5 py-4 rounded-xl border border-border bg-white text-foreground placeholder:text-foreground/30 text-base focus:outline-none focus:border-accent focus:ring-3 focus:ring-accent/20 transition-all duration-200 min-w-[280px] sm:min-w-[360px]"
            />
            <button
              onClick={handleSubmit}
              className="px-8 py-4 bg-accent text-white rounded-xl font-semibold text-base hover:brightness-110 transition-all duration-200 active:scale-[0.97] cursor-pointer"
            >
              Run the Boardroom
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-col items-center gap-4">
            <p className="text-xs text-foreground/40 uppercase tracking-widest font-medium">
              Six AI agents. One boardroom. Your idea.
            </p>
            <div className="flex items-center gap-6 text-foreground/20">
              <span className="text-lg font-semibold font-mono">6</span>
              <span className="w-px h-4 bg-border" />
              <span className="text-lg font-semibold font-mono">&lt;2 min</span>
              <span className="w-px h-4 bg-border" />
              <span className="text-lg font-semibold font-mono">18</span>
            </div>
            <div className="flex items-center gap-6 text-xs text-foreground/30">
              <span>Specialist Agents</span>
              <span>Per Analysis</span>
              <span>Deliverables</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
