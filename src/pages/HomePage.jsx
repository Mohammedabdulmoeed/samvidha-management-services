import SEO from '../components/common/SEO';
import Hero from '../components/home/Hero';
import ServicesOverview from '../components/home/ServicesOverview';
import AboutSection from '../components/home/AboutSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import StatsSection from '../components/home/StatsSection';
import ProcessSection from '../components/home/ProcessSection';
import Testimonials from '../components/home/Testimonials';
import FAQSection from '../components/home/FAQSection';
import ContactCTA from '../components/home/ContactCTA';

export default function HomePage() {
  return (
    <>
      <SEO
        title="Home"
        description="Samvidha Management Services - Reliable facility management, electrician, plumbing, housekeeping, and STP plant maintenance across India."
      />
      <Hero />
      <ServicesOverview />
      <AboutSection />
      <WhyChooseUs />
      <StatsSection />
      <ProcessSection />
      <Testimonials />
      <FAQSection />
      <ContactCTA />
    </>
  );
}
