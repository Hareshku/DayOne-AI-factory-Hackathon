import Reveal from './Reveal';

const steps = [
  {
    number: '01',
    title: 'Submit Your Idea',
    description: 'Type any startup idea — one sentence is enough. Our AI parses the concept and briefs the boardroom.',
  },
  {
    number: '02',
    title: 'Boardroom Deliberation',
    description: 'Six specialist agents debate your idea: Research, Product, Finance, Design, Marketing, and Investor — guided by a CEO.',
  },
  {
    number: '03',
    title: 'Get Your Startup Dossier',
    description: 'Receive a complete 18-section startup dossier with market analysis, MVP definition, brand strategy, and investor summary.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl font-heading font-semibold mb-4">
            How It{' '}
            <span className="text-gradient">Works</span>
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
            From a single sentence to a comprehensive startup plan — in under two minutes.
          </p>
        </Reveal>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent -translate-y-1/2" />

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.2}>
                <div className="relative text-center md:text-left">
                  <div className="md:text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 mb-6 font-heading text-2xl font-semibold text-accent">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">{step.title}</h3>
                    <p className="text-foreground/60 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
