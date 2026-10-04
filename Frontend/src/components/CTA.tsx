import { useNavigate } from 'react-router-dom';
import Reveal from './Reveal';

interface CTAProps {
  onGetStarted?: (idea: string) => void;
}

export default function CTA({ onGetStarted }: CTAProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Read the idea from the Hero input (shared across the landing page)
    const ideaInput = document.querySelector<HTMLInputElement>('input[aria-label="Enter your startup idea"]');
    const idea = ideaInput?.value?.trim() || '';

    if (onGetStarted && idea) {
      onGetStarted(idea);
    } else if (idea) {
      navigate(`/company/${encodeURIComponent(idea)}`);
    } else {
      // No idea typed — scroll to the Hero input
      window.scrollTo({ top: 0, behavior: 'smooth' });
      ideaInput?.focus();
    }
  };

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/8 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-card border border-border/50 relative overflow-hidden">
            {/* Inner glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-accent/5 rounded-full blur-[80px]" />

            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-heading font-semibold mb-4">
                Ready to Face the{' '}
                <span className="text-gradient">Boardroom</span>?
              </h2>
              <p className="text-foreground/60 max-w-xl mx-auto mb-8 text-lg leading-relaxed">
                Stop talking to AI that agrees with everything. Put your idea in front of six specialists who will challenge, refine, and build it into something real.
              </p>
              <button
                onClick={handleClick}
                className="px-8 py-4 bg-accent text-white rounded-xl font-semibold text-base hover:brightness-110 transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                Run the Boardroom
              </button>
              <p className="mt-4 text-xs text-foreground/40">
                No credit card required. Your first startup analysis is free.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
