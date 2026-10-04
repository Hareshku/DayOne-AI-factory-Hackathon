import { motion } from 'framer-motion';

interface BouncingDotsProps {
  className?: string;
}

export default function BouncingDots({ className = '' }: BouncingDotsProps) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`} aria-label="Loading">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-accent/60"
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}