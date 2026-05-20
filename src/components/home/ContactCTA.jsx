import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { company } from '../../data/company';
import Button from '../ui/Button';
import FloatingOrbs from '../common/FloatingOrbs';
import { fadeInUp, staggerContainer } from '../../animations/variants';

export default function ContactCTA() {
  const openQuote = useOutletContext()?.openQuote;
  const whatsappUrl = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent('Hello, I need facility management services.')}`;

  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          animate="visible"
          variants={staggerContainer}
          className="relative overflow-hidden rounded-3xl gradient-primary px-8 py-16 md:px-16 md:py-20 text-center"
        >
          <FloatingOrbs variant="dark" />
          <div
            className="absolute inset-0 grid-pattern opacity-20 pointer-events-none"
            aria-hidden="true"
          />
          <motion.div
            variants={fadeInUp}
            className="relative z-10 max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Transform Your Facility Management?
            </h2>
            <p className="mt-4 text-brand-100 text-lg">
              Get a free consultation and customized quote for your property today.
            </p>
            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-wrap justify-center gap-4"
            >
              <Button
                href={`tel:${company.phone.replace(/\s/g, '')}`}
                variant="secondary"
                size="lg"
              >
                <Phone className="h-5 w-5" />
                Call {company.phoneDisplay}
              </Button>
              <Button href={whatsappUrl} variant="whatsapp" size="lg">
                <MessageCircle className="h-5 w-5" />
                WhatsApp Us
              </Button>
              <Button onClick={openQuote} variant="outline" size="lg">
                Get Free Quote
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
