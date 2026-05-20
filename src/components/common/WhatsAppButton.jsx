import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { company } from '../../data/company';

export default function WhatsAppButton() {
  const url = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
    'Hello Samvidha Management Services, I would like to inquire about your facility management services.'
  )}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
      animate={{ y: [0, -4, 0] }}
      transition={{ y: { repeat: Infinity, duration: 2.5 } }}
      className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl shadow-green-500/30 hover:bg-green-600 hover:shadow-green-500/50 md:bottom-8 md:right-8"
    >
      <MessageCircle className="h-7 w-7" />
    </motion.a>
  );
}
