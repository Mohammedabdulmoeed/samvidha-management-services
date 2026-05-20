import { motion } from 'framer-motion';
import { fadeInUp } from '../../animations/variants';

export default function HoverCard({
  children,
  className = '',
  delay = 0,
  variant = fadeInUp,
  shine = true,
}) {
  return (
    <motion.div
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      animate="visible"
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-2xl transition-shadow duration-300 hover:shadow-2xl hover:shadow-brand-500/10 ${className}`}
    >
      {shine && <span className="card-shine pointer-events-none" aria-hidden="true" />}
      {children}
    </motion.div>
  );
}
