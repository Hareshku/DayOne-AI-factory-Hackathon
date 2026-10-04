import Reveal from './Reveal';

const problems = [
  {
    title: 'AI Tools Always Say Yes',
    description: 'ChatGPT and most AI tools are designed to agree with you. They validate your idea instead of stress-testing it — that\'s dangerous for founders.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'No Team to Pressure-Test',
    description: 'Solo founders and early-stage teams lack the structured debate that happens inside a real boardroom. Critical blind spots go unchallenged.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: 'No Structured Disagreement',
    description: 'Real founding teams fight — productively. Without a process for challenge, refinement, and resolution, ideas stay untested and fragile.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
        <path d="M12 20V10M18 20V4M6 20v-4" />
      </svg>
    ),
  },
];

export default function ProblemSection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-semibold mb-4">
            AI Tools Say Yes.{' '}
            <span className="text-gradient">Ours Argues.</span>
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
            Most AI agrees with everything you say. Day One simulates the friction of a real founding team — because the best ideas survive the hardest questions.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, i) => (
            <Reveal key={problem.title} delay={i * 0.15}>
              <div className="p-8 rounded-2xl bg-card border border-border/50 hover:border-accent/20 transition-all duration-300 h-full group">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                  {problem.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{problem.title}</h3>
                <p className="text-foreground/60 leading-relaxed">{problem.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
