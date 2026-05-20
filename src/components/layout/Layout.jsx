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
      <Header onQuoteClick={() => setQuoteOpen(true)} />
      <main>
        <Outlet context={{ openQuote: () => setQuoteOpen(true) }} />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <InquiryModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}
