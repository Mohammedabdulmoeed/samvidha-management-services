import { motion } from 'framer-motion';
import { Shield, Target, Eye, Award, CheckCircle2, BadgeCheck } from 'lucide-react';
import SEO from '../components/common/SEO';
import { pageSeo } from '../data/seo';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import { team, coreValues, timeline } from '../data/team';
import { images } from '../data/images';
import HoverCard from '../components/ui/HoverCard';
import { fadeInUp, staggerContainer, iconPop } from '../animations/variants';

const certifications = [
  'Licensed Electrical Contractors',
  'PCB Compliant STP Operations',
  'OHSAS Workplace Safety Standards',
  'MSME Registered Enterprise',
];

const safetyQuality = [
  {
    // label: 'Safety',
    title: 'Safety Standards',
    icon: Shield,
    iconBg: 'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white',
    borderHover: 'hover:border-emerald-200 hover:shadow-emerald-500/10',
    description:
      'Every Samvidha technician follows strict safety protocols to protect people, property, and the environment on every job site.',
    highlights: [
      'PPE compliance on all assignments',
      'Site hazard assessment before work begins',
      'Lockout-tagout for electrical systems',
      'Confined space protocols for STP operations',
    ],
  },
  {
    // label: 'Quality',
    title: 'Quality Commitment',
    icon: BadgeCheck,
    iconBg: 'bg-brand-100 text-brand-600 group-hover:bg-brand-600 group-hover:text-white',
    borderHover: 'hover:border-brand-200 hover:shadow-brand-500/15',
    description:
      'We implement structured quality checks at every stage so clients receive consistent, accountable service delivery.',
    highlights: [
      'Pre-service inspection and planning',
      'In-progress monitoring by supervisors',
      'Post-service client sign-off',
      'Random audits by our quality team',
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <SEO {...pageSeo.about} />
      <PageHero
        title="About Samvidha Management Services"
        subtitle="Building trust through excellence in facility management since 2023."
        image={images.office}
        breadcrumb="Home / About"
      />

      <section className="section-padding">
        <div className="container-custom max-w-4xl mx-auto text-center">
          <SectionHeading
            label="Company Overview"
            title="Leading Facility Management in India"
            subtitle="Samvidha Management Services was founded with a vision to redefine facility maintenance through professionalism, technology, and customer-centric service delivery."
          />
          <p className="text-slate-600 leading-relaxed text-lg">
            Today, we serve 300+ clients across Pan Hyderabad and beyond, managing everything from
            electrical systems and plumbing networks to housekeeping operations and sewage treatment
            plants. Our integrated approach ensures seamless facility operations for residential
            societies, corporate campuses, hospitals, and industrial facilities in Pan Hyderabad.
          </p>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-custom grid md:grid-cols-2 gap-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            animate="visible"
            whileHover={{ y: -8, scale: 1.02 }}
            className="rounded-2xl bg-white p-8 shadow-md border border-slate-100 hover:shadow-xl hover:border-brand-200 transition-colors"
          >
            <Target className="h-10 w-10 text-brand-600 mb-4" />
            <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
            <p className="mt-4 text-slate-600 leading-relaxed">
              To deliver reliable, affordable, and professional facility management solutions that
              exceed client expectations while maintaining the highest standards of safety and quality.
            </p>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            animate="visible"
            whileHover={{ y: -8, scale: 1.02 }}
            className="rounded-2xl bg-white p-8 shadow-md border border-slate-100 hover:shadow-xl hover:border-brand-200 transition-colors"
          >
            <Eye className="h-10 w-10 text-brand-600 mb-4" />
            <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
            <p className="mt-4 text-slate-600 leading-relaxed">
              To become India&apos;s most trusted facility management brand, known for innovation,
              sustainability, and unwavering commitment to client success.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading label="Core Values" title="What Drives Us" />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid-desktop-3"
          >
            {coreValues.map((v, i) => (
              <HoverCard key={v.title} variant={fadeInUp} delay={i * 0.05} className="border border-slate-200 p-6 bg-white">
                <h4 className="font-bold text-slate-900 text-lg group-hover:text-brand-700 transition-colors">{v.title}</h4>
                <p className="mt-2 text-slate-600 text-sm">{v.desc}</p>
              </HoverCard>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-slate-900">
        <div className="container-custom">
          <SectionHeading label="Our Team" title="Meet the Leadership" light />
          <div className="grid sm:grid-cols-2 min-[980px]:grid-cols-4 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 hover:border-brand-500/50 hover:shadow-xl hover:shadow-brand-500/20"
              >
                <div className="aspect-[4/5] overflow-hidden bg-slate-700">
                  <img
                    src={member.image}
                    alt={`${member.name}, ${member.role} at Samvidha Management`}
                    className="h-full w-full object-cover object-top"
                    loading="lazy"
                    decoding="async"
                    width={320}
                    height={400}
                  />
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-white">{member.name}</h4>
                  <p className="text-brand-400 text-sm font-medium">{member.role}</p>
                  <p className="mt-2 text-slate-400 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading label="Our Journey" title="Company Timeline" />
          <motion.div className="max-w-2xl mx-auto relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-brand-200 md:-translate-x-px" />
            {timeline.map((item, i) => (
              <motion.div
                key={`${item.year}-${item.title}`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`relative flex gap-6 mb-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="hidden md:block md:w-1/2" />
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-brand-600 -translate-x-1.5 md:-translate-x-1.5 mt-2 ring-4 ring-brand-100" />
                <div className="ml-10 md:ml-0 md:w-1/2 md:px-8">
                  <span className="text-brand-600 font-bold">{item.year}</span>
                  <h4 className="font-bold text-slate-900 mt-1">{item.title}</h4>
                  <p className="text-slate-600 text-sm mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <SectionHeading
            label="Standards"
            title="Safety & Quality at the Core"
            subtitle="How we protect your facility and deliver work you can trust, every time."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="row-split gap-8"
          >
            {safetyQuality.map((item, i) => {
              const Icon = item.icon;
              return (
                <HoverCard
                  key={item.title}
                  delay={i * 0.1}
                  className={`group border border-slate-200 bg-white p-8 lg:p-10 shadow-md ${item.borderHover}`}
                >
                  <motion.div
                    variants={iconPop}
                    initial="rest"
                    whileHover="hover"
                    className={`mb-6 inline-flex rounded-2xl p-4 transition-colors duration-300 ${item.iconBg}`}
                  >
                    <Icon className="h-10 w-10" aria-hidden="true" />
                  </motion.div>
                  <span className="text-sm font-semibold uppercase tracking-widest text-brand-600">
                    {item.label}
                  </span>
                  <h3 className="mt-2 text-2xl font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-slate-600 leading-relaxed">{item.description}</p>
                  <ul className="mt-6 space-y-3">
                    {item.highlights.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-slate-700">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                        <span className="text-sm leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </HoverCard>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading label="Certifications" title="Professional Credentials" />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto"
          >
            {certifications.map((cert, i) => (
              <HoverCard
                key={cert}
                delay={i * 0.06}
                className="flex items-center gap-3 border border-brand-100 bg-brand-50 px-5 py-4 hover:border-brand-200 hover:bg-white"
              >
                <Award className="h-5 w-5 shrink-0 text-brand-600" />
                <span className="text-sm font-medium text-slate-800">{cert}</span>
              </HoverCard>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
