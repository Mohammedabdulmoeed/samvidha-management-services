import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Briefcase, Clock, Send, X, Upload, Loader2 } from 'lucide-react';
import SEO from '../components/common/SEO';
import { pageSeo } from '../data/seo';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import HoverCard from '../components/ui/HoverCard';
import { fadeInUp } from '../animations/variants';
import { jobOpenings, benefits } from '../data/careers';
import { images } from '../data/images';
import { company } from '../data/company';

const CAREERS_EMAIL = company.careersEmail;

const applyInputClass =
  'w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20';

const emptyApplyForm = {
  name: '',
  email: '',
  phone: '',
  position: '',
  experience: '',
  location: '',
  qualification: '',
  noticePeriod: '',
  message: '',
};

function buildApplySummary(data) {
  return [
    `Position: ${data.position || 'General Application'}`,
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Years of Experience: ${data.experience}`,
    data.location ? `Current Location: ${data.location}` : null,
    data.qualification ? `Qualification: ${data.qualification}` : null,
    data.noticePeriod ? `Notice Period: ${data.noticePeriod}` : null,
    data.message ? `\nAdditional Information:\n${data.message}` : null,
  ]
    .filter(Boolean)
    .join('\n');
}

async function sendJobApplication(data, resumeFile) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    const err = new Error(
      `Add VITE_WEB3FORMS_ACCESS_KEY to a .env file. Get a free key at https://web3forms.com using ${CAREERS_EMAIL}.`
    );
    err.code = 'MISSING_KEY';
    throw err;
  }

  const formData = new FormData();

  formData.append('access_key', accessKey);
  formData.append('subject', `Job Application: ${data.position || 'General'}`);
  formData.append('from_name', data.name);
  formData.append('email', data.email);
  formData.append('phone', data.phone);
  formData.append('position', data.position || 'General Application');
  formData.append('experience', data.experience);

  if (data.location) formData.append('location', data.location);
  if (data.qualification) formData.append('qualification', data.qualification);
  if (data.noticePeriod) formData.append('notice_period', data.noticePeriod);

  const summary = buildApplySummary(data);

  const resumeNote =
    resumeFile?.name != null
      ? `\n\nResume file selected: ${resumeFile.name}`
      : '';

  formData.append(
    'message',
    (data.message?.trim() || summary) + resumeNote
  );

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: formData,
  });

  const text = await response.text();

  let result;

  try {
    result = JSON.parse(text);
  } catch {
    throw new Error(
      'Unexpected response from email service. Try again or use email option.'
    );
  }

  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Failed to send application');
  }

  return result;
}

function openApplyMailto(data) {
  const subject = encodeURIComponent(
    `Job Application: ${data.position || 'General'}`
  );

  const body = encodeURIComponent(
    `${buildApplySummary(
      data
    )}\n\n(Please attach your resume to this email before sending.)`
  );

  window.location.href = `mailto:${CAREERS_EMAIL}?subject=${subject}&body=${body}`;
}

function ApplyModal({ isOpen, onClose, job }) {
  const [form, setForm] = useState(emptyApplyForm);
  const [resume, setResume] = useState(null);
  const [resumeName, setResumeName] = useState('');
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    setForm({
      ...emptyApplyForm,
      position: job?.title || '',
    });

    setResume(null);
    setResumeName('');
    setErrors({});
    setStatus('idle');
    setErrorMessage('');
  }, [isOpen, job]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  const validate = () => {
    const e = {};

    if (!form.name.trim()) e.name = 'Name is required';

    if (!form.phone.trim()) {
      e.phone = 'Phone is required';
    } else if (
      !/^[+]?[\d\s-]{10,}$/.test(form.phone.replace(/\s/g, ''))
    ) {
      e.phone = 'Enter a valid phone number';
    }

    if (!form.email.trim()) {
      e.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Enter a valid email';
    }

    if (!form.experience.trim()) {
      e.experience = 'Experience is required';
    }

    setErrors(e);

    return Object.keys(e).length === 0;
  };

  const resetAndClose = () => {
    setForm(emptyApplyForm);
    setResume(null);
    setResumeName('');
    setErrors({});
    setStatus('idle');
    setErrorMessage('');
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage('');

    if (!validate()) {
      setErrorMessage(
        'Please fix the highlighted fields, then submit again.'
      );
      return;
    }

    setStatus('submitting');

    try {
      await sendJobApplication(form, resume);

      setStatus('success');

      setTimeout(resetAndClose, 2500);
    } catch (err) {
      if (err?.code === 'MISSING_KEY') {
        setStatus('idle');
        setErrorMessage(err.message);
        return;
      }

      console.error('Job application submit:', err);

      openApplyMailto(form);

      setStatus('mailto');

      setErrorMessage(
        err?.message
          ? `Online send failed: ${err.message}. Your email app should open — attach your resume and send to finish.`
          : 'Your email app should open — attach your resume and send to finish your application.'
      );
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const ext = file.name.split('.').pop()?.toLowerCase();

    if (!['pdf', 'doc', 'docx'].includes(ext)) {
      setErrors((prev) => ({
        ...prev,
        resume: 'Use PDF, DOC, or DOCX only',
      }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        resume: 'File must be under 5 MB',
      }));
      return;
    }

    setResume(file);
    setResumeName(file.name);

    setErrors((prev) => {
      const next = { ...prev };
      delete next.resume;
      return next;
    });
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
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-[70] flex max-h-[92vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl bg-white shadow-2xl"
          >
            <div className="relative border-b border-slate-100 px-6 py-5 md:px-8">
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="pr-8">
                <h3 className="text-xl font-bold text-slate-900">
                  Apply for this role
                </h3>

                {job?.title && (
                  <p className="mt-1 text-sm font-medium text-brand-600">
                    {job.title}
                  </p>
                )}

                <p className="mt-1 text-sm text-slate-500">
                  Applications go to {CAREERS_EMAIL}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 md:px-8">
              {status === 'success' ? (
                <div className="py-10 text-center">
                  <p className="font-semibold text-slate-900">
                    Application submitted!
                  </p>

                  <p className="mt-1 text-sm text-slate-600">
                    We&apos;ll contact you soon.
                  </p>
                </div>
              ) : status === 'mailto' ? (
                <div className="py-8 text-center">
                  <p className="font-semibold text-slate-900">
                    Almost done
                  </p>

                  <p className="mt-2 text-sm text-slate-600">
                    {errorMessage}
                  </p>

                  <Button
                    type="button"
                    variant="secondary"
                    className="mt-6"
                    onClick={resetAndClose}
                  >
                    Close
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                      {errorMessage}
                    </p>
                  )}

                  <input
                    required
                    placeholder="Full Name *"
                    value={form.name}
                    onChange={(ev) =>
                      setForm({ ...form, name: ev.target.value })
                    }
                    className={applyInputClass}
                  />

                  {errors.name && (
                    <p className="text-xs text-red-500">
                      {errors.name}
                    </p>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <input
                        required
                        type="tel"
                        placeholder="Phone *"
                        value={form.phone}
                        onChange={(ev) =>
                          setForm({ ...form, phone: ev.target.value })
                        }
                        className={applyInputClass}
                      />

                      {errors.phone && (
                        <p className="text-xs text-red-500">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        required
                        type="email"
                        placeholder="Email *"
                        value={form.email}
                        onChange={(ev) =>
                          setForm({ ...form, email: ev.target.value })
                        }
                        className={applyInputClass}
                      />

                      {errors.email && (
                        <p className="text-xs text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <input
                    placeholder="Position Applied For"
                    value={form.position}
                    onChange={(ev) =>
                      setForm({ ...form, position: ev.target.value })
                    }
                    className={`${applyInputClass} ${
                      job?.title ? 'bg-slate-50' : ''
                    }`}
                    readOnly={Boolean(job?.title)}
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <input
                        required
                        placeholder="Years of Experience *"
                        value={form.experience}
                        onChange={(ev) =>
                          setForm({
                            ...form,
                            experience: ev.target.value,
                          })
                        }
                        className={applyInputClass}
                      />

                      {errors.experience && (
                        <p className="text-xs text-red-500">
                          {errors.experience}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        placeholder="Current City"
                        value={form.location}
                        onChange={(ev) =>
                          setForm({ ...form, location: ev.target.value })
                        }
                        className={applyInputClass}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <input
                        placeholder="Highest Qualification"
                        value={form.qualification}
                        onChange={(ev) =>
                          setForm({
                            ...form,
                            qualification: ev.target.value,
                          })
                        }
                        className={applyInputClass}
                      />
                    </div>

                    <div>
                      <select
                        value={form.noticePeriod}
                        onChange={(ev) =>
                          setForm({
                            ...form,
                            noticePeriod: ev.target.value,
                          })
                        }
                        className={applyInputClass}
                      >
                        <option value="">
                          Select notice period
                        </option>
                        <option value="Immediate">
                          Immediate
                        </option>
                        <option value="15 days">
                          15 days
                        </option>
                        <option value="30 days">
                          30 days
                        </option>
                        <option value="60 days">
                          60 days
                        </option>
                        <option value="90 days">
                          90 days
                        </option>
                      </select>
                    </div>
                  </div>

                  <label className="flex w-full cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-slate-200 px-4 py-5 text-sm hover:border-brand-400 hover:bg-brand-50/50">
                    <Upload className="h-5 w-5" />

                    <span>
                      {resumeName ||
                        'Optional: choose a resume file'}
                    </span>

                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={handleResumeChange}
                    />
                  </label>

                  {errors.resume && (
                    <p className="text-xs text-red-500">
                      {errors.resume}
                    </p>
                  )}

                  <textarea
                    rows={3}
                    placeholder="Cover letter / resume link"
                    value={form.message}
                    onChange={(ev) =>
                      setForm({ ...form, message: ev.target.value })
                    }
                    className={`${applyInputClass} resize-none`}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Submit Application
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function CareersPage() {
  const [applicationOpen, setApplicationOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const openApplication = (job = null) => {
    setSelectedJob(job);
    setApplicationOpen(true);
  };

  return (
    <>
      <SEO {...pageSeo.careers} />

      <PageHero
        title="Build Your Career With Us"
        subtitle="Join a growing team of facility management professionals."
        image={images.team}
        breadcrumb="Home / Careers"
      />

      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading
            label="Open Positions"
            title="Current Job Openings"
          />

          <div className="grid gap-6 md:grid-cols-2">
            {jobOpenings.map((job, index) => (
              <HoverCard
                key={job.id}
                variant={fadeInUp}
                delay={index * 0.05}
                className="h-full border border-slate-200 bg-white p-6"
              >
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                    {job.department}
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {job.type}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  {job.title}
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  {job.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </span>

                  <span className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    {job.experience}
                  </span>
                </div>

                <Button
                  size="sm"
                  className="mt-4"
                  onClick={() => openApplication(job)}
                >
                  Apply Now
                </Button>
              </HoverCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-custom row-split gap-12">
       
        </div>
      </section>
      <section className="section-padding">
  <div className="container-custom mx-auto max-w-5xl text-center">
    <SectionHeading
      label="Benefits"
      title="Employee Benefits"
    />

    <ul className="mt-10 grid gap-5 md:grid-cols-2">
      {benefits.map((b) => (
        <li
          key={b}
          className="flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50">
            <Clock className="h-5 w-5 text-brand-600 shrink-0" />
          </div>

          <span className="text-base font-medium leading-relaxed text-slate-700">
            {b}
          </span>
        </li>
      ))}
    </ul>
  </div>
</section>
      <section className="section-padding">
        <div className="container-custom mx-auto max-w-3xl text-center">
          <SectionHeading
            label="Technicians"
            title="Skilled Technicians Wanted"
            subtitle="Electricians, plumbers, housekeeping staff, and STP operators — join India's fastest-growing facility management team."
          />
        </div>
      </section>

      <ApplyModal
        isOpen={applicationOpen}
        onClose={() => setApplicationOpen(false)}
        job={selectedJob}
      />
    </>
  );
}