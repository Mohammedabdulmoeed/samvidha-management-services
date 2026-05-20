import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import Button from '../ui/Button';
import { company } from '../../data/company';

const QUOTE_EMAIL = company.email;

function buildQuoteSummary(form) {
  return [
    `Service: ${form.service}`,
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    form.email ? `Email: ${form.email}` : null,
    form.message ? `\nMessage:\n${form.message}` : null,
  ]
    .filter(Boolean)
    .join('\n');
}

async function sendQuoteRequest(form) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    const err = new Error(
      'Email sending is not configured. Add VITE_WEB3FORMS_ACCESS_KEY to .env and restart the dev server.'
    );
    err.code = 'MISSING_KEY';
    throw err;
  }

  const formData = new FormData();
  formData.append('access_key', accessKey);
  formData.append('subject', `Quote Request: ${form.service}`);
  formData.append('from_name', form.name);
  if (form.email) formData.append('email', form.email);
  formData.append('phone', form.phone);
  formData.append('service', form.service);
  formData.append('message', buildQuoteSummary(form));

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: formData,
  });

  const text = await response.text();
  let result;
  try {
    result = JSON.parse(text);
  } catch {
    throw new Error('Unexpected response from email service. Please try again.');
  }

  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Failed to send quote request');
  }

  return result;
}

function openQuoteMailto(form) {
  const subject = encodeURIComponent(`Quote Request: ${form.service}`);
  const body = encodeURIComponent(`${buildQuoteSummary(form)}\n\n(Sent from website quote form)`);
  window.location.href = `mailto:${QUOTE_EMAIL}?subject=${subject}&body=${body}`;
}

export default function InquiryModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    try {
      await sendQuoteRequest(form);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
        setForm({ name: '', phone: '', email: '', service: '', message: '' });
      }, 2000);
    } catch (err) {
      if (err?.code === 'MISSING_KEY') {
        setError(err.message);
        return;
      }
      openQuoteMailto(form);
      setError(
        err?.message
          ? `Online send failed: ${err.message}. Your email app will open — please send to finish.`
          : 'Your email app will open — please send to finish.'
      );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-[70] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 md:p-8 shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-2xl font-bold text-slate-900 pr-8">Get a Free Quote</h3>
            <p className="mt-2 text-slate-600 text-sm">
              Fill in your details and our team will contact you within 24 hours.
            </p>

            {submitted ? (
              <div className="mt-8 py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Send className="h-8 w-8 text-green-600" />
                </div>
                <p className="font-semibold text-slate-900">Thank you!</p>
                <p className="text-slate-600 text-sm mt-1">We&apos;ll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {error && (
                  <p className="text-amber-800 text-sm bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                    {error}
                  </p>
                )}
                <input
                  required
                  placeholder="Your Name *"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
                <input
                  required
                  type="tel"
                  placeholder="Phone Number *"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
                <select
                  required
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                >
                  <option value="">Select Service *</option>
                  <option value="electrician">Electrician Services</option>
                  <option value="plumbing">Plumbing Services</option>
                  <option value="housekeeping">Housekeeping Services</option>
                  <option value="stp">STP Plant Services</option>
                  <option value="other">Other / Multiple Services</option>
                </select>
                <textarea
                  rows={3}
                  placeholder="Tell us about your requirements"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 resize-none"
                />
                <Button type="submit" className="w-full">
                  Submit Inquiry
                </Button>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
