import Accordion from '../ui/Accordion';
import SectionHeading from '../ui/SectionHeading';
import { faqs } from '../../data/faqs';

export default function FAQSection() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeading
          label="FAQ"
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about our services, pricing, and support."
        />
        <div className="max-w-3xl mx-auto">
          <Accordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
