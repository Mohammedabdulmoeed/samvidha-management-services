
import { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Loader2,
} from 'lucide-react';

import SEO from '../components/common/SEO';
import { pageSeo } from '../data/seo';
import PageHero from '../components/ui/PageHero';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import HoverCard from '../components/ui/HoverCard';

import { fadeInUp } from '../animations/variants';
import { company } from '../data/company';
import { images } from '../data/images';

const CONTACT_EMAIL = company.email;

const inputClass =
  'w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20';

async function sendContactForm(data) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    throw new Error(
      'Missing Web3Forms key. Add VITE_WEB3FORMS_ACCESS_KEY in .env file.'
    );
  }

  const formData = new FormData();

  formData.append('access_key', accessKey);
  formData.append(
    'subject',
    `New Contact Inquiry - ${data.service}`
  );

  formData.append('from_name', data.name);
  formData.append('email', data.email);
  formData.append('phone', data.phone);
  formData.append('service', data.service);

  formData.append(
    'message',
    `
Name: ${data.name}

Phone: ${data.phone}

Email: ${data.email}

Service: ${data.service}

Message:
${data.message}
    `
  );

  const response = await fetch(
    'https://api.web3forms.com/submit',
    {
      method: 'POST',
      body: formData,
    }
  );

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || 'Failed to send message');
  }

  return result;
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    const e = {};

    if (!form.name.trim()) {
      e.name = 'Name is required';
    }

    if (!form.phone.trim()) {
      e.phone = 'Phone is required';
    } else if (
      !/^[+]?[\d\s-]{10,}$/.test(form.phone)
    ) {
      e.phone = 'Invalid phone number';
    }

    if (
      form.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      e.email = 'Invalid email';
    }

    if (!form.service) {
      e.service = 'Please select a service';
    }

    if (!form.message.trim()) {
      e.message = 'Message is required';
    }

    setErrors(e);

    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage('');

    if (!validate()) return;

    try {
      setLoading(true);

      await sendContactForm(form);

      setSubmitted(true);

      setForm({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 4000);
    } catch (err) {
      console.error(err);

      setErrorMessage(
        err.message ||
          'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const whatsappUrl = `https://wa.me/${
    company.whatsapp
  }?text=${encodeURIComponent(
    'Hello Samvidha, I would like to inquire about your services.'
  )}`;

  const contactCards = [
    {
      icon: Phone,
      title: 'Phone',
      value: company.phoneDisplay,
      href: `tel:${company.phone.replace(/\s/g, '')}`,
    },
    {
      icon: Mail,
      title: 'Email',
      value: company.email,
      href: `mailto:${company.email}`,
    },
    {
      icon: MapPin,
      title: 'Address',
      value: company.address,
    },
    {
      icon: Clock,
      title: 'Business Hours',
      value: company.hours,
    },
  ];

  return (
    <>
      <SEO {...pageSeo.contact} />

      <PageHero
        title="Get In Touch"
        subtitle="We're here to help with all your facility management needs."
        image={images.contact}
        breadcrumb="Home / Contact"
      />

      <section className="section-padding">
        <div className="container-custom">

          {/* CONTACT CARDS */}

          <div className="grid-desktop-4 gap-6 mb-16">
            {contactCards.map((card, index) => (
              <HoverCard
                key={card.title}
                variant={fadeInUp}
                delay={index * 0.05}
                className="h-full border border-slate-200 bg-white p-6"
              >
                <card.icon className="h-8 w-8 text-brand-600 mb-4" />

                <h4 className="font-bold text-slate-900">
                  {card.title}
                </h4>

                {card.href ? (
                  <a
                    href={card.href}
                    className="mt-2 block text-sm text-slate-600 hover:text-brand-600"
                  >
                    {card.value}
                  </a>
                ) : (
                  <p className="mt-2 text-sm text-slate-600">
                    {card.value}
                  </p>
                )}
              </HoverCard>
            ))}
          </div>

          {/* CONTACT FORM + MAP */}

          <div className="row-split gap-12">

            {/* FORM */}

            <Reveal>
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">

                <h2 className="text-3xl font-bold text-slate-900">
                  Send Us an Inquiry
                </h2>

                <p className="mt-2 text-slate-600">
                  Fill out the form and our team will respond within 24 hours.
                </p>

                {submitted ? (
                  <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
                    <Send className="mx-auto mb-3 h-10 w-10 text-green-600" />

                    <p className="font-semibold text-green-800">
                      Message sent successfully!
                    </p>

                    <p className="mt-1 text-sm text-green-600">
                      We&apos;ll contact you shortly.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                  >
                    {errorMessage && (
                      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {errorMessage}
                      </div>
                    )}

                    {/* NAME */}

                    <div>
                      <input
                        type="text"
                        placeholder="Your Name *"
                        value={form.name}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            name: e.target.value,
                          })
                        }
                        className={`${inputClass} ${
                          errors.name
                            ? 'border-red-400'
                            : ''
                        }`}
                      />

                      {errors.name && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* EMAIL */}

                    <div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            email: e.target.value,
                          })
                        }
                        className={`${inputClass} ${
                          errors.email
                            ? 'border-red-400'
                            : ''
                        }`}
                      />

                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* PHONE */}

                    <div>
                      <input
                        type="tel"
                        placeholder="Phone Number *"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            phone: e.target.value,
                          })
                        }
                        className={`${inputClass} ${
                          errors.phone
                            ? 'border-red-400'
                            : ''
                        }`}
                      />

                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* SERVICE */}

                    <div>
                      <select
                        value={form.service}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            service: e.target.value,
                          })
                        }
                        className={`${inputClass} ${
                          errors.service
                            ? 'border-red-400'
                            : ''
                        }`}
                      >
                        <option value="">
                          Select Service *
                        </option>

                        <option value="Electrician Services">
                          Electrician Services
                        </option>

                        <option value="Plumbing Services">
                          Plumbing Services
                        </option>

                        <option value="Housekeeping Services">
                          Housekeeping Services
                        </option>

                        <option value="STP Plant Services">
                          STP Plant Services
                        </option>

                        <option value="Other">
                          Other
                        </option>
                      </select>

                      {errors.service && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.service}
                        </p>
                      )}
                    </div>

                    {/* MESSAGE */}

                    <div>
                      <textarea
                        rows={5}
                        placeholder="Your Message *"
                        value={form.message}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            message: e.target.value,
                          })
                        }
                        className={`${inputClass} resize-none ${
                          errors.message
                            ? 'border-red-400'
                            : ''
                        }`}
                      />

                      {errors.message && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* BUTTONS */}

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>

                    <Button
                      href={whatsappUrl}
                      variant="whatsapp"
                      className="w-full"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Chat on WhatsApp
                    </Button>
                  </form>
                )}
              </div>
            </Reveal>

            {/* MAP */}

            {/* MAP */}

<Reveal delay={0.1}>
  <div className="h-full min-h-[750px] overflow-hidden rounded-3xl border border-slate-200 shadow-lg">
    
    <iframe
      title="Samvidha Office Location"
      src={company.mapEmbed}
      className="h-full w-full"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />

  </div>
</Reveal>
          </div>
        </div>
      </section>
    </>
  );
}