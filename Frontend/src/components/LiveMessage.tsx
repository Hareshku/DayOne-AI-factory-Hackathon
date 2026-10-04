import { motion } from 'framer-motion';
import type { LiveMessage as LiveMessageType } from '../lib/types';

interface LiveMessageProps {
  message: LiveMessageType;
}

const AGENT_LABELS: Record<LiveMessageType['agent'], string> = {
  research: 'Research',
  product: 'Product',
  finance: 'Finance',
  legal: 'Legal',
  marketing: 'Marketing',
  ceo: 'CEO',
  system: 'System',
};

// Google-themed colors for each agent
const AGENT_COLORS: Record<LiveMessageType['agent'], string> = {
  research: '#4285F4',   // Google Blue
  product: '#EA4335',    // Google Red
  finance: '#FBBC04',    // Google Yellow
  legal: '#34A853',      // Google Green
  marketing: '#FF6D01',  // Google Orange
  ceo: '#A142F4',        // Google Purple
  system: '#9AA0A6',     // neutral gray
};

// Accent per message type — mirrors the reference's stamp-red / stamp-green scheme
const TYPE_ACCENT: Record<LiveMessageType['type'], string> = {
  info: '#9AA0A6',
  challenge: '#EA4335',   // red — objection
  resolution: '#34A853',  // green — ruling
  error: '#EA4335',       // red
  ping: 'transparent',
};

function initials(label: string) {
  return label.slice(0, 2).toUpperCase();
}

export default function LiveMessage({ message }: LiveMessageProps) {
  if (message.type === 'ping') return null;

  const agentColor = AGENT_COLORS[message.agent] ?? AGENT_COLORS.system;
  const accent = TYPE_ACCENT[message.type] ?? TYPE_ACCENT.info;
  const label = AGENT_LABELS[message.agent] ?? message.agent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex items-start gap-3 py-2"
    >
      <div
        className="shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-[0.58rem] font-semibold uppercase tracking-wide"
        style={{ background: 'transparent', color: agentColor, border: `1.5px solid ${agentColor}` }}
        aria-hidden
      >
        {initials(label)}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="text-[0.62rem] font-semibold uppercase tracking-wide"
            style={{ color: agentColor }}
          >
            {label}
          </span>
          {message.type === 'challenge' && (
            <span
              className="text-[0.56rem] px-1.5 py-0.5 rounded uppercase tracking-wide"
              style={{ color: accent, border: `1px solid ${accent}` }}
            >
              Objection
            </span>
          )}
          {message.type === 'resolution' && (
            <span
              className="text-[0.56rem] px-1.5 py-0.5 rounded uppercase tracking-wide"
              style={{ color: accent, border: `1px solid ${accent}` }}
            >
              Ruling
            </span>
          )}
        </div>

        <div
          className="rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm leading-relaxed"
          style={{
            background: 'var(--color-card, rgba(255,255,255,0.03))',
            borderLeft: message.type !== 'info' ? `3px solid ${accent}` : undefined,
            color: message.type === 'error' ? accent : undefined,
          }}
        >
          {message.message}
        </div>
      </div>
    </motion.div>
  );
}