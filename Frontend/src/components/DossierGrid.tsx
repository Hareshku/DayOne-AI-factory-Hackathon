import { useState } from 'react';
import type { Dossier } from '../lib/types';

interface DossierGridProps {
  dossier: Dossier;
}

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'product', label: 'Product' },
  { id: 'business', label: 'Business' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'challenges', label: 'Challenges' },
];

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-foreground/70 leading-relaxed">
          <span className="mt-1.5 w-1 h-1 rounded-full bg-accent shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <span key={i} className="px-2.5 py-1 rounded-md bg-background/50 border border-border/30 text-xs text-foreground/60">
          {item}
        </span>
      ))}
    </div>
  );
}

export default function DossierGrid({ dossier }: DossierGridProps) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-8">
      <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border/50">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-400/10 border border-emerald-400/20 w-fit mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-xs font-medium text-emerald-400">Complete</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-foreground mb-3">
          {dossier.idea}
        </h2>

        <div className="p-4 rounded-xl bg-background/50 border border-border/30">
          <p className="text-xs text-foreground/40 font-medium mb-1 uppercase tracking-wider">Elevator Pitch</p>
          <p className="text-sm text-foreground/70 leading-relaxed">{dossier.elevator_pitch}</p>
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-none">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
              tab.id === activeTab ? 'bg-accent text-white' : 'text-foreground/60 hover:text-foreground hover:bg-background/80'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border/50 space-y-6">
        {activeTab === 'overview' && (
          <>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Problem</h3>
              <p className="text-sm text-foreground/70 leading-relaxed">{dossier.problem_statement}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Target Audience</h3>
              <p className="text-sm text-foreground/70 leading-relaxed">{dossier.target_audience}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Unique Value Proposition</h3>
              <p className="text-sm text-foreground/70 leading-relaxed">{dossier.unique_value_prop}</p>
            </div>
            {dossier.competitors.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Competitors</h3>
                <Tags items={dossier.competitors} />
              </div>
            )}
          </>
        )}

        {activeTab === 'product' && (
          <>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">MVP Scope</h3>
              <List items={dossier.mvp_scope} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Tech Stack</h3>
              <Tags items={dossier.tech_stack} />
            </div>
          </>
        )}

        {activeTab === 'business' && (
          <>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Revenue Model</h3>
              <p className="text-sm text-foreground/70 leading-relaxed">{dossier.revenue_model}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Legal Structure</h3>
              <p className="text-sm text-foreground/70 leading-relaxed">{dossier.legal_structure}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Compliance Requirements</h3>
              <List items={dossier.compliance_requirements} />
            </div>
          </>
        )}

        {activeTab === 'marketing' && (
          <>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Marketing Strategy</h3>
              <p className="text-sm text-foreground/70 leading-relaxed">{dossier.marketing_strategy}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Target Channels</h3>
              <Tags items={dossier.target_channels} />
            </div>
          </>
        )}

        {activeTab === 'challenges' && (
          dossier.challenges.length > 0 ? (
            <div className="space-y-4">
              {dossier.challenges.map((c, i) => (
                <div key={i} className="p-4 rounded-xl bg-background/50 border border-border/30">
                  <p className="text-xs font-medium text-amber-400 uppercase tracking-wide mb-2">
                    Challenge from {c.raised_by}
                  </p>
                  <p className="text-sm text-foreground/70 mb-3">
                    <span className="text-foreground/40">Re: {c.target} — </span>
                    {c.reason}
                  </p>
                  <p className="text-sm text-emerald-400/90 leading-relaxed">
                    <span className="text-foreground/40 text-xs uppercase tracking-wide block mb-1">CEO Resolution</span>
                    {c.resolution}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-foreground/50">No challenges were raised during this analysis.</p>
          )
        )}
      </div>
    </div>
  );
}