import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from '../common/WhatsAppButton';
import ScrollToTop from '../common/ScrollToTop';
import InquiryModal from '../common/InquiryModal';

export default function Layout() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <Header onQuoteClick={() => setQuoteOpen(true)} />
      <main id="main-content" tabIndex={-1} className="min-w-0 overflow-x-clip">
        <Outlet context={{ openQuote: () => setQuoteOpen(true) }} />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <InquiryModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}
