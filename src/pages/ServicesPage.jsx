import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import SEO from '../components/common/SEO';
import PageHero from '../components/ui/PageHero';
import Button from '../components/ui/Button';
import SafeImage from '../components/ui/SafeImage';
import Reveal from '../components/ui/Reveal';
import { servicesDetailed, servicesOverview } from '../data/services';
import { images } from '../data/images';
import { staggerContainer, fadeInUp } from '../animations/variants';

const serviceKeys = ['electrician', 'plumbing', 'housekeeping', 'stp'];

export default function ServicesPage() {
  const openQuote = useOutletContext()?.openQuote;

  return (
    <>
      <SEO
        title="Services"
        description="Professional electrician, plumbing, housekeeping, and STP plant maintenance services by Samvidha Management Services."
      />
      <PageHero
        title="Our Services"
        subtitle="Comprehensive facility management solutions tailored to your property needs."
        image={images.construction}
        breadcrumb="Home / Services"
      />

      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            animate="visible"
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {servicesOverview.map((s) => (
              <motion.a
                key={s.id}
                href={`#${s.slug}`}
                variants={fadeInUp}
                whileHover={{ y: -6, scale: 1.02 }}
                className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm border border-slate-100 hover:shadow-lg hover:border-brand-300 hover-glow transition-colors"
              >
                <s.icon className="h-6 w-6 text-brand-600 shrink-0" />
                <span className="font-semibold text-slate-800 text-sm">{s.title}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {serviceKeys.map((key, index) => {
        const service = servicesDetailed[key];
        const overview = servicesOverview.find((s) => s.slug === key);
        const reversed = index % 2 === 1;

        return (
          <section
            key={key}
            id={key}
            className={`section-padding ${index % 2 === 0 ? '' : 'bg-slate-50'}`}
          >
            <div className="container-custom">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <Reveal className={reversed ? 'lg:order-2' : ''} delay={0.05}>
                  <span className="text-sm font-semibold uppercase tracking-widest text-brand-600">
                    {overview?.title}
                  </span>
                  <h2 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">{service.title}</h2>
                  <p className="mt-2 text-brand-600 font-medium">{service.tagline}</p>
                  <p className="mt-4 text-slate-600 leading-relaxed">{service.intro}</p>

                  <h4 className="mt-8 font-bold text-slate-900">What We Offer</h4>
                  <ul className="mt-4 grid sm:grid-cols-2 gap-2">
                    {service.features.map((f) => (
                      <motion.li
                        key={f}
                        whileHover={{ x: 4 }}
                        className="flex items-start gap-2 text-sm text-slate-700"
                      >
                        <CheckCircle2 className="h-4 w-4 text-brand-600 shrink-0 mt-0.5" />
                        {f}
                      </motion.li>
                    ))}
                  </ul>

                  <h4 className="mt-8 font-bold text-slate-900">Benefits</h4>
                  <div className="mt-4 grid sm:grid-cols-2 gap-3">
                    {service.benefits.map((b) => (
                      <motion.div
                        key={b}
                        whileHover={{ scale: 1.03 }}
                        className="rounded-xl bg-brand-50 border border-brand-100 px-4 py-3 text-sm font-medium text-slate-800 hover:bg-brand-100 transition-colors cursor-default"
                      >
                        {b}
                      </motion.div>
                    ))}
                  </div>

                  <Button onClick={openQuote} className="mt-8">
                    Request This Service <ArrowRight className="h-4 w-4" />
                  </Button>
                </Reveal>

                <Reveal className={reversed ? 'lg:order-1' : ''} delay={0.1}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="rounded-2xl overflow-hidden shadow-2xl group"
                  >
                    <SafeImage
                      src={service.image}
                      alt={service.title}
                      className="w-full object-cover aspect-[4/3] bg-slate-200 transition-transform duration-700 group-hover:scale-105"
                    />
                  </motion.div>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
