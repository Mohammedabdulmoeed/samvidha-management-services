import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { servicesOverview } from '../../data/services';
import SectionHeading from '../ui/SectionHeading';
import HoverCard from '../ui/HoverCard';
import { staggerContainer, fadeInUp, iconPop } from '../../animations/variants';

export default function ServicesOverview() {
  return (
    <section id="services" className="section-padding bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-100/40 rounded-full blur-3xl -translate-y-1/2" />
      <div className="container-custom relative">
        <SectionHeading
          label="Our Services"
          title="Complete Facility Management Solutions"
          subtitle="From electrical systems to sewage treatment — we deliver end-to-end maintenance with certified professionals."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          animate="visible"
          className="grid-desktop-4"
        >
          {servicesOverview.map((service, i) => (
            <HoverCard
              key={service.id}
              variant={fadeInUp}
              delay={i * 0.05}
              className="bg-white p-6 border border-slate-100 hover:border-brand-200"
            >
              <motion.div
                variants={iconPop}
                initial="rest"
                whileHover="hover"
                className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} text-white mb-5 shadow-lg`}
              >
                <service.icon className="h-7 w-7" />
              </motion.div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-700 transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">{service.shortDesc}</p>
              <Link
                to="/services"
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:gap-3 transition-all duration-300"
              >
                Learn More <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <motion.div
                className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-brand-100/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                whileHover={{ scale: 1.2 }}
              />
            </HoverCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
