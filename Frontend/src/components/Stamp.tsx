interface StampProps {
  text?: string;
  variant?: 'info' | 'warning' | 'success';
  className?: string;
}

const variantStyles = {
  info: 'border-accent/30 text-accent bg-accent/5',
  warning: 'border-amber-400/30 text-amber-400 bg-amber-400/5',
  success: 'border-emerald-400/30 text-emerald-400 bg-emerald-400/5',
};

export default function Stamp({ text = 'NEW', variant = 'info', className = '' }: StampProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-widest border ${variantStyles[variant]} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {text}
    </span>
  );
}