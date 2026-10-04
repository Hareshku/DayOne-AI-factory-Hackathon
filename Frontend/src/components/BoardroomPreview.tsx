import { useState, useEffect, useCallback } from 'react';
import Reveal from './Reveal';
import Stamp from './Stamp';

/* ─── Agent definitions ──────────────────────────────── */

const agents = [
  { id: 'ceo', name: 'Alice Chen', role: 'CEO', color: 'bg-accent', icon: '👑' },
  { id: 'research', name: 'Marcus Webb', role: 'Research', color: 'bg-emerald-400', icon: '🔬' },
  { id: 'product', name: 'Lena Okonkwo', role: 'Product & Engineering', color: 'bg-blue-400', icon: '⚙️' },
  { id: 'finance', name: 'David Park', role: 'Finance', color: 'bg-amber-400', icon: '📊' },
  { id: 'design', name: 'Priya Sharma', role: 'Design & Marketing', color: 'bg-violet-400', icon: '🎨' },
  { id: 'investor', name: 'James Wright', role: 'Investor', color: 'bg-rose-400', icon: '💼' },
];

/* ─── Simulated boardroom messages ───────────────────── */

interface BoardMessage {
  agentId: string;
  text: string;
  type: 'post' | 'challenge' | 'resolution';
  delay: number;
}

const script: BoardMessage[] = [
  { agentId: 'ceo', text: 'Alright team — we have a new idea on the table: "A marketplace for freelance AI trainers." Let\'s pressure-test it.', type: 'post', delay: 800 },
  { agentId: 'research', text: 'Market looks promising. The AI training data market is projected at $3.5B by 2027. Three major competitors — but none focus on domain-expert trainers specifically.', type: 'post', delay: 2200 },
  { agentId: 'product', text: 'MVP scope: trainer profiles with verified credentials, project matching by domain, and a quality-scoring system. We can launch in 6 weeks.', type: 'post', delay: 3800 },
  { agentId: 'finance', text: 'Hold on — I\'m going to challenge the unit economics. At a 20% take rate, you\'d need 500+ active projects/month to break even on the dev team alone. What does customer acquisition cost look like?', type: 'challenge', delay: 5400 },
  { agentId: 'ceo', text: 'Good pushback. David, let\'s model it: assume $150 CAC via paid + organic. Marcus — can we validate willingness-to-pay before build?', type: 'resolution', delay: 7200 },
  { agentId: 'design', text: 'Brand direction: "Expertise you can trust." Target positioning is professionals who\'ve left academia or big tech — we build credibility badges and a portfolio-first UX.', type: 'post', delay: 9000 },
  { agentId: 'investor', text: 'I like the domain-expert angle. If you can prove 2x LTV/CAC in a niche vertical first, this becomes fundable. 15-page dossier incoming.', type: 'post', delay: 10600 },
];

/* ─── Agent avatar component ─────────────────────────── */

function AgentAvatar({ agent, size = 'sm' }: { agent: typeof agents[0]; size?: 'sm' | 'lg' }) {
  const dims = size === 'lg' ? 'w-12 h-12 text-lg' : 'w-8 h-8 text-sm';
  return (
    <div
      className={`${dims} ${agent.color} rounded-full flex items-center justify-center text-white font-bold shrink-0`}
      title={`${agent.name} — ${agent.role}`}
      aria-label={`${agent.name}, ${agent.role}`}
    >
      {agent.icon}
    </div>
  );
}

/* ─── Main component ─────────────────────────────────── */

export default function BoardroomPreview() {
  const [visible, setVisible] = useState<BoardMessage[]>([]);
  const [finished, setFinished] = useState(false);

  const advance = useCallback(() => {
    setVisible((prev) => {
      if (prev.length >= script.length) {
        setFinished(true);
        return prev;
      }
      return [...prev, script[prev.length]];
    });
  }, []);

  useEffect(() => {
    if (finished) return;
    const next = script[visible.length];
    if (!next) return;
    const timer = setTimeout(advance, next.delay);
    return () => clearTimeout(timer);
  }, [visible, finished, advance]);

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-semibold mb-4">
            Watch the{' '}
            <span className="text-gradient">Boardroom</span>
            {' '}in Action
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
            Six specialist AI agents debate your startup idea in real time.
            Disagreement isn't a bug — it's the feature.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="relative rounded-2xl border border-border/50 bg-card overflow-hidden shadow-2xl max-w-3xl mx-auto">
            {/* Mockup browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-background/50">
              <div className="w-3 h-3 rounded-full bg-red-400/60" />
              <div className="w-3 h-3 rounded-full bg-amber-400/60" />
              <div className="w-3 h-3 rounded-full bg-emerald-400/60" />
              <div className="ml-4 flex-1 max-w-md mx-auto px-4 py-1.5 rounded-lg bg-background/80 border border-border/30 text-xs text-foreground/40 text-center truncate">
                app.dayone.ai/company/acme-corp
              </div>
            </div>

            {/* Agent roster bar */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border/30 bg-background/30 overflow-x-auto">
              <span className="text-xs text-foreground/40 font-medium uppercase tracking-wider shrink-0">
                Boardroom —
              </span>
              {agents.map((a) => (
                <div key={a.id} className="flex items-center gap-1.5 shrink-0" title={`${a.name} — ${a.role}`}>
                  <AgentAvatar agent={a} size="sm" />
                  <span className="text-xs text-foreground/60 hidden sm:inline">{a.role}</span>
                </div>
              ))}
            </div>

            {/* Boardroom feed */}
            <div className="p-4 sm:p-6 space-y-4 min-h-[420px]">
              {visible.length === 0 && (
                <div className="flex items-center justify-center h-40 text-foreground/30 text-sm">
                  Opening the office...
                </div>
              )}

              {visible.map((msg, i) => {
                const agent = agents.find((a) => a.id === msg.agentId)!;
                const isChallenge = msg.type === 'challenge';
                const isResolution = msg.type === 'resolution';

                return (
                  <div
                    key={i}
                    className={`flex items-start gap-3 p-3 rounded-xl transition-all animate-[fadeIn_0.4s_ease-out] ${
                      isChallenge
                        ? 'bg-destructive/5 border border-destructive/10'
                        : isResolution
                          ? 'bg-accent/5 border border-accent/10'
                          : 'bg-background/50'
                    }`}
                  >
                    <AgentAvatar agent={agent} size="sm" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-semibold text-foreground">{agent.name}</span>
                        <span className="text-[10px] text-foreground/40 font-medium px-1.5 py-0.5 rounded bg-background/80 border border-border/30">
                          {agent.role}
                        </span>
                        {isChallenge && (
                          <span className="text-[10px] text-destructive font-medium px-1.5 py-0.5 rounded bg-destructive/10">
                            ⚠ Challenge
                          </span>
                        )}
                        {isResolution && (
                          <span className="text-[10px] text-accent font-medium px-1.5 py-0.5 rounded bg-accent/10">
                            Resolution
                          </span>
                        )}
                      </div>
                      <p className={`text-sm leading-relaxed ${
                        isChallenge ? 'text-foreground/80' : 'text-foreground/70'
                      }`}>
                        {msg.text}
                      </p>
                    </div>
                  </div>
                );
              })}

              {finished && (
                <div className="flex flex-col items-center justify-center pt-6 pb-2 animate-[fadeIn_0.5s_ease-out]">
                  <Stamp text="Dossier Ready" variant="success" />
                  <p className="text-sm text-foreground/50 mt-3">
                    15-page startup dossier compiled from the boardroom transcript.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
