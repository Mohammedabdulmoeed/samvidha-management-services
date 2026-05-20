import { motion } from 'framer-motion';
import {
  Users,
  Clock,
  CircleDollarSign,
  ShieldCheck,
  Headphones,
  Award,
} from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import HoverCard from '../ui/HoverCard';
import FloatingOrbs from '../common/FloatingOrbs';
import { staggerContainer, fadeInUp, iconPop } from '../../animations/variants';

const reasons = [
  { icon: Users, title: 'Skilled Technicians', desc: 'Certified professionals with rigorous training and background verification.' },
  { icon: Clock, title: 'Quick Response', desc: 'Rapid dispatch for emergencies with average response under 2 hours.' },
  { icon: CircleDollarSign, title: 'Affordable Pricing', desc: 'Transparent quotations with no hidden charges and flexible AMC plans.' },
  { icon: ShieldCheck, title: 'Quality Assurance', desc: 'Multi-level quality checks and satisfaction guarantee on every job.' },
  { icon: Headphones, title: '24/7 Support', desc: 'Round-the-clock helpline for critical electrical, plumbing, and STP issues.' },
  { icon: Award, title: 'Trusted Service', desc: 'Trusted by 300+ clients across residential and commercial sectors.' },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      <FloatingOrbs variant="dark" />
      <div className="container-custom relative z-10">
        <SectionHeading
          label="Why Choose Us"
          title="The Samvidha Advantage"
          subtitle="We go beyond maintenance — we deliver peace of mind through professional, reliable facility management."
          light
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reasons.map((item, i) => (
            <HoverCard
              key={item.title}
              variant={fadeInUp}
              delay={i * 0.06}
              shine={false}
              className="glass-dark p-6 border border-white/10 hover:bg-white/10 hover:border-brand-400/30 hover:shadow-brand-500/20"
            >
              <motion.div
                variants={iconPop}
                initial="rest"
                whileHover="hover"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600/20 text-brand-400 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300"
              >
                <item.icon className="h-6 w-6" />
              </motion.div>
              <h3 className="mt-4 text-lg font-bold text-white group-hover:text-brand-200 transition-colors">
                {item.title}
              </h3>
              <p className="mt-2 text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                {item.desc}
              </p>
            </HoverCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
