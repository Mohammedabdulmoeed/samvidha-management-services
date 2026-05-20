import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="mb-6"
      >
        <Building2 className="h-16 w-16 text-brand-500" />
      </motion.div>
      <h2 className="text-xl font-bold text-white font-display">Samvidha</h2>
      <p className="text-slate-400 text-sm mt-1">Management Services</p>
      <div className="mt-8 h-1 w-48 rounded-full bg-slate-800 overflow-hidden">
        <motion.div
          className="h-full bg-brand-500 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
}
