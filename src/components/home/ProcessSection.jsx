import { motion } from 'framer-motion';
import { Phone, Search, FileText, Wrench, HeartHandshake } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { staggerContainer, fadeInUp } from '../../animations/variants';

const steps = [
  { icon: Phone, title: 'Contact', desc: 'Reach us via phone, WhatsApp, or our online inquiry form.' },
  { icon: Search, title: 'Inspection', desc: 'Our team visits your site for a thorough assessment.' },
  { icon: FileText, title: 'Quotation', desc: 'Receive a detailed, transparent quote with no hidden costs.' },
  { icon: Wrench, title: 'Service Execution', desc: 'Certified technicians execute work with quality standards.' },
  { icon: HeartHandshake, title: 'Support', desc: 'Post-service follow-up and AMC support for lasting results.' },
];

export default function ProcessSection() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-50 via-white to-white" />
      <div className="container-custom relative">
        <SectionHeading
          label="Our Process"
          title="How We Work"
          subtitle="A streamlined five-step process designed for efficiency, transparency, and your complete satisfaction."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          animate="visible"
          className="relative"
        >
          <motion.div
            className="hidden lg:block absolute top-16 left-[10%] right-[10%] h-1 rounded-full bg-gradient-to-r from-brand-200 via-brand-500 to-brand-200 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="relative text-center group cursor-default"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary text-white shadow-lg shadow-brand-600/30 relative z-10 group-hover:shadow-xl group-hover:shadow-brand-600/40"
                >
                  <step.icon className="h-7 w-7" />
                </motion.div>
                <motion.span
                  className="inline-block mt-4 text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300"
                >
                  Step {i + 1}
                </motion.span>
                <h3 className="mt-3 font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
