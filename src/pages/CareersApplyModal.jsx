import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Upload, Loader2, Briefcase } from 'lucide-react';
import Button from '../components/ui/Button';
import { company } from '../data/company';

const CAREERS_EMAIL = company.careersEmail;

const emptyForm = {
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

const noticeOptions = [
  { value: '', label: 'Select notice period' },
  { value: 'Immediate', label: 'Immediate' },
  { value: '15 days', label: '15 days' },
  { value: '30 days', label: '30 days' },
  { value: '60 days', label: '60 days' },
  { value: '90 days', label: '90 days' },
];

const inputClass =
  'w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20';

function buildSummary(data) {
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

function openMailtoFallback(data) {
  const subject = encodeURIComponent(
    `Job Application: ${data.position || 'General'}`
  );

  const body = encodeURIComponent(
    `${buildSummary(
      data
    )}\n\n(Please attach your resume to this email before sending.)`
  );

  window.location.href = `mailto:${CAREERS_EMAIL}?subject=${subject}&body=${body}`;
}

async function sendApplication(data, resumeFile) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    const err = new Error(
      `Add VITE_WEB3FORMS_ACCESS_KEY to a .env file in the project root. Get a free key at https://web3forms.com using ${CAREERS_EMAIL}.`
    );

    err.code = 'MISSING_KEY';
    throw err;
  }

  const formData = new FormData();

  formData.append('access_key', accessKey);
  formData.append(
    'subject',
    `Job Application: ${data.position || 'General'}`
  );

  formData.append('from_name', data.name);
  formData.append('email', data.email);
  formData.append('phone', data.phone);
  formData.append('position', data.position || 'General Application');
  formData.append('experience', data.experience);

  if (data.location) {
    formData.append('location', data.location);
  }

  if (data.qualification) {
    formData.append('qualification', data.qualification);
  }

  if (data.noticePeriod) {
    formData.append('notice_period', data.noticePeriod);
  }

  formData.append(
    'message',
    data.message?.trim() || buildSummary(data)
  );

  if (resumeFile) {
    formData.append(
      'attachment',
      resumeFile,
      resumeFile.name
    );
  }

  const response = await fetch(
    'https://api.web3forms.com/submit',
    {
      method: 'POST',
      body: formData,
    }
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || 'Failed to send application'
    );
  }

  return result;
}

export default function CareersApplyModal({
  isOpen,
  onClose,
  job,
}) {
  const [form, setForm] = useState(emptyForm);

  const [resume, setResume] = useState(null);

  const [resumeName, setResumeName] = useState('');

  const [errors, setErrors] = useState({});

  const [status, setStatus] = useState('idle');

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    setForm({
      ...emptyForm,
      position: job?.title || '',
    });

    setResume(null);
    setResumeName('');
    setErrors({});
    setStatus('idle');
    setErrorMessage('');
  }, [isOpen, job?.title]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
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

    if (!form.name.trim()) {
      e.name = 'Name is required';
    }

    if (!form.phone.trim()) {
      e.phone = 'Phone is required';
    } else if (
      !/^[+]?[\d\s-]{10,}$/.test(
        form.phone.replace(/\s/g, '')
      )
    ) {
      e.phone = 'Enter a valid phone number';
    }

    if (!form.email.trim()) {
      e.email = 'Email is required';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      e.email = 'Enter a valid email';
    }

    if (!form.experience.trim()) {
      e.experience = 'Experience is required';
    }

    if (!resume) {
      e.resume = 'Please upload your resume';
    }

    setErrors(e);

    return Object.keys(e).length === 0;
  };

  const resetAndClose = () => {
    setForm(emptyForm);
    setResume(null);
    setResumeName('');
    setErrors({});
    setStatus('idle');
    setErrorMessage('');
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      await sendApplication(form, resume);

      setStatus('success');

      setTimeout(resetAndClose, 2500);
    } catch (err) {
      if (err?.code === 'MISSING_KEY') {
        setStatus('idle');
        setErrorMessage(err.message);
        return;
      }

      openMailtoFallback(form);

      setStatus('mailto');

      setErrorMessage(
        'We could not send online. Your email app will open — attach your resume and tap Send to finish applying.'
      );
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const ext = file.name
      .split('.')
      .pop()
      ?.toLowerCase();

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
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="job-apply-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-[70] flex max-h-[min(92vh,720px)] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl bg-white shadow-2xl"
          >
            <div className="relative shrink-0 border-b border-slate-100 px-6 py-5 md:px-8">
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-start gap-3 pr-8">
                <div className="rounded-xl bg-brand-50 p-2.5">
                  <Briefcase className="h-6 w-6 text-brand-600" />
                </div>

                <div>
                  <h3
                    id="job-apply-title"
                    className="text-xl font-bold text-slate-900"
                  >
                    Apply for this role
                  </h3>

                  {job?.title && (
                    <p className="mt-1 text-sm font-medium text-brand-600">
                      {job.title}
                    </p>
                  )}

                  <p className="mt-1 text-slate-500 text-sm">
                    Applications go to {company.careersEmail}
                  </p>
                </div>
              </div>
            </div>

            <motion.div className="flex-1 overflow-y-auto px-6 py-5 md:px-8">
              {status === 'success' ? (
                <motion.div className="py-10 text-center">
                  <motion.div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <Send className="h-8 w-8 text-green-600" />
                  </motion.div>

                  <p className="font-semibold text-slate-900">
                    Application submitted!
                  </p>

                  <p className="text-slate-600 text-sm mt-1">
                    We&apos;ll review your details and contact you soon.
                  </p>
                </motion.div>
              ) : status === 'mailto' ? (
                <motion.div className="py-8 text-center">
                  <p className="font-semibold text-slate-900">
                    Almost done
                  </p>

                  <p className="text-slate-600 text-sm mt-2">
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
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {errorMessage && (
                    <p className="text-amber-800 text-sm bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                      {errorMessage}
                    </p>
                  )}

                  <motion.div>
                    <input
                      required
                      placeholder="Full Name *"
                      value={form.name}
                      onChange={(ev) =>
                        setForm({
                          ...form,
                          name: ev.target.value,
                        })
                      }
                      className={inputClass}
                    />

                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.name}
                      </p>
                    )}
                  </motion.div>

                  <motion.div className="grid sm:grid-cols-2 gap-4">
                    <motion.div>
                      <input
                        required
                        type="tel"
                        placeholder="Phone *"
                        value={form.phone}
                        onChange={(ev) =>
                          setForm({
                            ...form,
                            phone: ev.target.value,
                          })
                        }
                        className={inputClass}
                      />

                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </motion.div>

                    <motion.div>
                      <input
                        required
                        type="email"
                        placeholder="Email *"
                        value={form.email}
                        onChange={(ev) =>
                          setForm({
                            ...form,
                            email: ev.target.value,
                          })
                        }
                        className={inputClass}
                      />

                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email}
                        </p>
                      )}
                    </motion.div>
                  </motion.div>

                  <motion.div>
                    <input
                      placeholder="Position Applied For"
                      value={form.position}
                      onChange={(ev) =>
                        setForm({
                          ...form,
                          position: ev.target.value,
                        })
                      }
                      className={`${inputClass} ${
                        job?.title ? 'bg-slate-50' : ''
                      }`}
                      readOnly={Boolean(job?.title)}
                    />
                  </motion.div>

                  <motion.div className="grid sm:grid-cols-2 gap-4">
                    <motion.div>
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
                        className={inputClass}
                      />

                      {errors.experience && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.experience}
                        </p>
                      )}
                    </motion.div>

                    <motion.div>
                      <input
                        placeholder="Current City"
                        value={form.location}
                        onChange={(ev) =>
                          setForm({
                            ...form,
                            location: ev.target.value,
                          })
                        }
                        className={inputClass}
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div className="grid sm:grid-cols-2 gap-4">
                    <motion.div>
                      <input
                        placeholder="Highest Qualification"
                        value={form.qualification}
                        onChange={(ev) =>
                          setForm({
                            ...form,
                            qualification: ev.target.value,
                          })
                        }
                        className={inputClass}
                      />
                    </motion.div>

                    <motion.div>
                      <select
                        value={form.noticePeriod}
                        onChange={(ev) =>
                          setForm({
                            ...form,
                            noticePeriod: ev.target.value,
                          })
                        }
                        className={inputClass}
                      >
                        {noticeOptions.map((opt) => (
                          <option
                            key={opt.value || 'empty'}
                            value={opt.value}
                          >
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </motion.div>
                  </motion.div>

                  <motion.div>
                    <label
                      className={`flex flex-col items-center justify-center gap-2 w-full rounded-xl border-2 border-dashed px-4 py-5 text-sm cursor-pointer transition-colors ${
                        errors.resume
                          ? 'border-red-300 bg-red-50/50 text-red-600'
                          : 'border-slate-200 text-slate-500 hover:border-brand-400 hover:bg-brand-50/50'
                      }`}
                    >
                      <Upload className="h-5 w-5" />

                      {resumeName ? (
                        <span className="font-medium text-slate-700 text-center break-all">
                          {resumeName}
                        </span>
                      ) : (
                        <span>
                          Upload Resume (PDF, DOC) *
                        </span>
                      )}

                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={handleResumeChange}
                      />
                    </label>

                    {errors.resume && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.resume}
                      </p>
                    )}
                  </motion.div>

                  <motion.div>
                    <textarea
                      rows={3}
                      placeholder="Cover letter / additional information"
                      value={form.message}
                      onChange={(ev) =>
                        setForm({
                          ...form,
                          message: ev.target.value,
                        })
                      }
                      className={`${inputClass} resize-none`}
                    />
                  </motion.div>

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
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}