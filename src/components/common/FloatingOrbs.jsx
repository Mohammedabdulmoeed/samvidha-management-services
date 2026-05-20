import { motion } from 'framer-motion';

export default function FloatingOrbs({ variant = 'hero' }) {
  const isDark = variant === 'dark';

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        className={`absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl ${
          isDark ? 'bg-brand-500/20' : 'bg-brand-400/30'
        }`}
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={`absolute top-1/3 -right-16 h-96 w-96 rounded-full blur-3xl ${
          isDark ? 'bg-cyan-500/10' : 'bg-brand-300/25'
        }`}
        animate={{ x: [0, -25, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={`absolute -bottom-32 left-1/3 h-80 w-80 rounded-full blur-3xl ${
          isDark ? 'bg-indigo-500/15' : 'bg-brand-600/20'
        }`}
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
