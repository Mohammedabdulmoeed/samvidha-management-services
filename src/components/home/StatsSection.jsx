import { motion } from 'framer-motion';
import AnimatedCounter from '../ui/AnimatedCounter';
import { images } from '../../data/images';
import { staggerContainer, fadeInUp } from '../../animations/variants';

const stats = [
  { value: 100, suffix: '+', label: 'Projects Completed' },
  { value: 100, suffix: '+', label: 'Happy Clients' },
  { value: 100, suffix: '+', label: 'Team Members' },
  { value: 2, suffix: '+', label: 'Years Experience' },
];

export default function StatsSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${images.building})` }}
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />
      <div className="absolute inset-0 bg-brand-900/92" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="container-custom relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -4 }}
              className="text-center p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-brand-400/40 transition-colors duration-300 cursor-default"
            >
              <AnimatedCounter {...stat} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
