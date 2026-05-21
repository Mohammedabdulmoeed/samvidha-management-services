import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import Button from '../ui/Button';
import SafeImage from '../ui/SafeImage';
import { images } from '../../data/images';
import { slideInLeft, slideInRight, staggerFast, fadeInUp } from '../../animations/variants';

const highlights = [
  '2+ years of industry experience',
  '100+ projects successfully delivered',
  'Certified & background-verified technicians',
  'Pan-Hyderabad service coverage',
];

export default function AboutSection() {
  return (
    <section className="section-padding overflow-hidden">
      <div className="container-custom">
        <div className="row-split lg:gap-16">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            animate="visible"
            className="relative group row-split-media"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="media-frame shadow-2xl"
            >
              <SafeImage
                src={images.office}
                alt="Samvidha facility management team"
                className="w-full object-cover aspect-[4/3] max-h-[clamp(16rem,42vw,28rem)] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
              whileHover={{ scale: 1.08, rotate: 2 }}
              className="absolute -bottom-6 -right-6 glass rounded-2xl p-6 shadow-xl hidden md:block border border-white/50"
            >
              <p className="text-4xl font-bold text-brand-600">+2</p>
              <p className="text-sm font-medium text-slate-600">Years of Excellence</p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            animate="visible"
            className="row-split-content"
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-brand-600">
              About Samvidha
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              Your Trusted Partner in Facility Management
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Samvidha Management Services is a leading facility management company delivering
              reliable maintenance solutions for corporate offices, residential societies,
              industrial plants, and commercial establishments.
            </p>
            <motion.ul
              variants={staggerFast}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              animate="visible"
              className="mt-6 space-y-3"
            >
              {highlights.map((item) => (
                <motion.li
                  key={item}
                  variants={fadeInUp}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-3 text-slate-700 cursor-default"
                >
                  <CheckCircle2 className="h-5 w-5 text-brand-600 shrink-0" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
            <Button to="/about" className="mt-8">
              Learn More About Us
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
