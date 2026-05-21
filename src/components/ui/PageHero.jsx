import { motion } from 'framer-motion';
import FloatingOrbs from '../common/FloatingOrbs';
import { fadeInUp, staggerContainer } from '../../animations/variants';

export default function PageHero({ title, subtitle, image, breadcrumb }) {
  return (
    <section
      className="relative min-h-[45vh] md:min-h-[50vh] flex items-center overflow-hidden"
      aria-labelledby="page-hero-title"
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
        role="presentation"
        aria-hidden="true"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <FloatingOrbs variant="dark" />

      <div className="container-custom relative z-10 py-28 md:py-32">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {breadcrumb && (
            <motion.p
              variants={fadeInUp}
              className="text-brand-300 text-sm font-medium mb-4 tracking-wide"
            >
              {breadcrumb}
            </motion.p>
          )}
          <motion.h1
            id="page-hero-title"
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              variants={fadeInUp}
              className="mt-4 text-lg md:text-xl text-slate-300 max-w-2xl"
            >
              {subtitle}
            </motion.p>
          )}
          <motion.div
            variants={fadeInUp}
            className="mt-8 h-1 w-24 rounded-full bg-gradient-to-r from-brand-400 to-brand-600"
          />
        </motion.div>
      </div>
    </section>
  );
}
