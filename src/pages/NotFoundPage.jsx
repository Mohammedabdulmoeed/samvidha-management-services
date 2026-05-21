import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import SEO from '../components/common/SEO';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <>
      <SEO
        title="Page Not Found | Samvidha Management Services"
        description="The page you are looking for does not exist on Samvidha Management Services."
        path="/404"
        noindex
      />
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-lg"
        >
          <p className="text-8xl md:text-9xl font-bold text-gradient font-display">404</p>
          <h1 className="mt-4 text-3xl md:text-4xl font-bold text-white">Page Not Found</h1>
          <p className="mt-4 text-slate-400">
            Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button to="/" size="lg">
              <Home className="h-5 w-5" /> Back to Home
            </Button>
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); window.history.back(); }}
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/80 text-white px-8 py-3.5 text-base font-semibold hover:bg-white/10 transition-all"
            >
              <ArrowLeft className="h-5 w-5" /> Go Back
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
}
