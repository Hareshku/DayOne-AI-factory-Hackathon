import Reveal from './Reveal';

const agentStages = [
  {
    agent: 'CEO',
    icon: '👑',
    title: 'CEO Briefing',
    description: 'Parses your idea and frames the strategic questions each specialist needs to answer.',
    color: 'border-accent/20 bg-accent/5',
  },
  {
    agent: 'Research',
    icon: '🔬',
    title: 'Market Research',
    description: 'Analyzes competitors, market size, and trends. Maps the landscape your startup enters.',
    color: 'border-emerald-400/20 bg-emerald-400/5',
  },
  {
    agent: 'Product',
    icon: '⚙️',
    title: 'Product & Engineering',
    description: 'Defines MVP scope, tech stack, and roadmap. Flags technical risks and feasibility concerns.',
    color: 'border-blue-400/20 bg-blue-400/5',
  },
  {
    agent: 'Finance',
    icon: '📊',
    title: 'Finance Challenge',
    description: 'Stress-tests unit economics, pricing, and runway. Challenges assumptions with hard numbers.',
    color: 'border-amber-400/20 bg-amber-400/5',
  },
  {
    agent: 'Design',
    icon: '🎨',
    title: 'Design & Marketing',
    description: 'Crafts brand positioning, audience personas, and go-to-market strategy.',
    color: 'border-violet-400/20 bg-violet-400/5',
  },
  {
    agent: 'Investor',
    icon: '💼',
    title: 'Investor Review',
    description: 'Evaluates fundability, prepares the investor summary, and scores the opportunity.',
    color: 'border-rose-400/20 bg-rose-400/5',
  },
];

export default function PipelineBlueprint() {
  return (
    <section id="pipeline" className="relative py-24 sm:py-32 overflow-hidden bg-dotgrid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl font-heading font-semibold mb-4">
            The{' '}
            <span className="text-gradient">Boardroom</span>
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
            Six specialist agents orchestrated by a CEO. Every idea gets challenged, refined, and scored before the dossier is compiled.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {agentStages.map((stage, i) => (
            <Reveal key={stage.agent} delay={i * 0.1}>
              <div className={`p-6 rounded-2xl border ${stage.color} transition-all duration-300 h-full hover:shadow-md`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{stage.icon}</span>
                  <span className="text-xs font-mono text-accent font-medium uppercase tracking-widest">
                    {stage.agent}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {stage.title}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {stage.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Stats bar */}
        <Reveal delay={0.4} className="mt-20">
          <div className="p-8 rounded-2xl bg-card border border-border/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '6', label: 'Specialist Agents' },
                { value: '<2 min', label: 'Per Analysis' },
                { value: '18', label: 'Dossier Sections' },
                { value: 'CEO-Led', label: 'Resolution Process' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl sm:text-3xl font-heading font-semibold text-gradient mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-foreground/50 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
