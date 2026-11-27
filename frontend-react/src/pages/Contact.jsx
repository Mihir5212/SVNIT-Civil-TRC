import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    organisation: '',
    email: '',
    phone: '',
    work: '',
    message: '',
    _gotcha: '',
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const workOptions = [
    { value: '', label: 'Choose the area of study…' },
    { value: 'transportation', label: 'Highway & Transportation Engineering' },
    { value: 'road-safety-audit', label: 'Road Safety Audit (IRC:SP:88)' },
    { value: 'traffic-engineering', label: 'Traffic Engineering & Signal Design' },
    { value: 'rail-services', label: 'Rail & Transit Services' },
    { value: 'smart-mobility', label: 'Smart Mobility & ITS' },
    { value: 'land-development', label: 'Land Development & Pavements' },
    { value: 'surveying', label: 'Surveying & Drone Analytics' },
    { value: 'research', label: 'Academic Research Collaboration' },
    { value: 'other', label: 'Other Consultancy Services' },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.work) newErrors.work = 'Please select an area of technical work';
    if (!formData.message.trim()) newErrors.message = 'Project description is required';
    else if (formData.message.trim().length < 20) newErrors.message = 'Please provide at least 20 characters describing your project';
    if (formData._gotcha) newErrors._gotcha = 'Spam detected';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In production, this would be a real API call:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      setSubmitStatus('success');
      setFormData({ name: '', organisation: '', email: '', phone: '', work: '', message: '', _gotcha: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main id="main">
      {/* Page Hero Banner */}
      <section className="page-hero relative">
        <div className="absolute inset-0 bg-brand-green blueprint-grid-dark opacity-20" />
        <div className="relative z-10 page-hero-content max-w-7xl mx-auto px-gutter-lg py-gutter-xl lg:py-gutter-2xl text-center" data-reveal="fade-in-up">
          <h1 className="page-hero-title font-display text-display-lg lg:text-display-xl text-on-brand-green mb-gutter-sm">
            Contact Us
          </h1>
          <p className="page-hero-breadcrumb font-body text-body-md text-on-brand-green/80">
            <a href="/" className="hover:underline">Home</a> <span className="mx-gutter-xs" aria-hidden="true">›</span> Contact
          </p>
        </div>
      </section>

      <section className="section py-gutter-xl lg:py-gutter-2xl">
        <div className="wrap max-w-7xl mx-auto px-gutter-lg">

          {/* Interactive Google Map */}
          <div className="contact-map-wrap mb-gutter-xl lg:mb-gutter-2xl" data-reveal="fade-in-up">
            <div id="contact-map" className="rounded-2xl overflow-hidden bg-brand-green/10">
              <iframe
                title="Map showing SVNIT Surat"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[420px] lg:h-[500px] border-0 block"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.196901844297!2d72.78441117596827!3d21.16484398311545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04dec8b56fdf3%3A0x423b99f85d267087!2sSardar%20Vallabhbhai%20National%20Institute%20of%20Technology%2C%20Surat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                style={{ width: '100%', height: '100%', border: 0 }}
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Split Contact Cards Row */}
          <div className="contact-cards-row grid lg:grid-cols-2 gap-gutter-xl">

            {/* Left: Direct Meet Us */}
            <div className="contact-info-card bg-surface border border-outline rounded-2xl p-gutter-xl lg:p-gutter-2xl h-full" data-reveal="fade-in-left">
              <h2 className="font-display text-headline-md text-on-surface mb-gutter-xl">Direct Meet Us</h2>

              <div className="space-y-gutter-lg">
                <div className="contact-info-item flex items-start gap-gutter-md">
                  <div className="contact-info-icon w-10 h-10 bg-brand-green/10 rounded-xl flex items-center justify-center text-brand-green flex-shrink-0" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
                    </svg>
                  </div>
                  <div>
                    <strong className="font-label text-label-md text-on-surface block mb-1">Address</strong>
                    <address className="font-body text-body-md text-on-surface/70 not-italic leading-relaxed">
                      Department of Civil Engineering,<br />
                      Sardar Vallabhbhai National Institute of Technology (SVNIT),<br />
                      Ichchhanath, Surat &ndash; 395007, Gujarat, India
                    </address>
                  </div>
                </div>

                <div className="contact-info-item flex items-start gap-gutter-md">
                  <div className="contact-info-icon w-10 h-10 bg-brand-green/10 rounded-xl flex items-center justify-center text-brand-green flex-shrink-0" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div>
                    <strong className="font-label text-label-md text-on-surface block mb-1">Email</strong>
                    <a href="mailto:trc@svnit.ac.in" className="contact-link font-body text-body-md text-brand-green hover:underline">trc@svnit.ac.in</a>
                  </div>
                </div>

                <div className="contact-info-item flex items-start gap-gutter-md">
                  <div className="contact-info-icon w-10 h-10 bg-brand-green/10 rounded-xl flex items-center justify-center text-brand-green flex-shrink-0" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                      <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <div>
                    <strong className="font-label text-label-md text-on-surface block mb-1">Phone / Extension</strong>
                    <a href="tel:+912612259571" className="contact-link font-body text-body-md text-on-surface/70 hover:text-brand-green transition-colors">+91 261 2259571 &bull; Ext: 1500</a>
                  </div>
                </div>

                <div className="contact-info-item flex items-start gap-gutter-md">
                  <div className="contact-info-icon w-10 h-10 bg-brand-green/10 rounded-xl flex items-center justify-center text-brand-green flex-shrink-0" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                    </svg>
                  </div>
                  <div>
                    <strong className="font-label text-label-md text-on-surface block mb-1">Consultation Hours</strong>
                    <span className="font-body text-body-md text-on-surface/70">Monday &ndash; Friday: 9:30 AM &ndash; 5:30 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Quick Query Form */}
            <div className="contact-query-card bg-surface border border-outline rounded-2xl p-gutter-xl lg:p-gutter-2xl h-full" data-reveal="fade-in-right">
              <h2 className="font-display text-headline-md text-on-surface mb-gutter-xl">Send an Enquiry</h2>

              {submitStatus === 'success' && (
                <div
                  id="query-feedback"
                  className="query-feedback bg-green-50 border border-green-200 text-green-800 p-gutter-md rounded-lg mb-gutter-lg font-body text-body-md"
                  role="alert"
                >
                  Thank you for your enquiry! Our team will review your request and respond within 2 business days.
                </div>
              )}

              {submitStatus === 'error' && (
                <div
                  id="query-feedback"
                  className="query-feedback bg-red-50 border border-red-200 text-red-800 p-gutter-md rounded-lg mb-gutter-lg font-body text-body-md"
                  role="alert"
                >
                  Something went wrong. Please try again later or email us directly at trc@svnit.ac.in
                </div>
              )}

              <form id="enquiry-form" className="contact-form space-y-gutter-lg" onSubmit={handleSubmit} noValidate>
                {/* Honeypot anti-spam field */}
                <input type="text" name="_gotcha" className="hp-field" tabIndex={-1} autoComplete="off" aria-hidden="true" value={formData._gotcha} onChange={handleChange} />

                <div className="field">
                  <label htmlFor="cf-name" className="block font-label text-label-md text-on-surface mb-gutter-xs">
                    Your Full Name <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    id="cf-name"
                    name="name"
                    placeholder="Dr. / Er. / Mr. / Ms. Your Name"
                    required
                    autoComplete="name"
                    className={`w-full px-gutter-md py-gutter-sm bg-surface-dark border rounded-lg font-body text-body-md text-on-surface placeholder-on-surface/40 transition-all duration-state-change focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent ${errors.name ? 'border-red-500' : 'border-outline hover:border-brand-green/50'}`}
                    value={formData.name}
                    onChange={handleChange}
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-gutter-xs font-body text-body-sm text-red-500" role="alert">{errors.name}</p>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="cf-org" className="block font-label text-label-md text-on-surface mb-gutter-xs">
                    Agency / Organisation
                  </label>
                  <input
                    type="text"
                    id="cf-org"
                    name="organisation"
                    placeholder="e.g. NHAI / GSRDC / Municipal Corporation / Consultancy"
                    autoComplete="organization"
                    className="w-full px-gutter-md py-gutter-sm bg-surface-dark border border-outline rounded-lg font-body text-body-md text-on-surface placeholder-on-surface/40 transition-all duration-state-change focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent hover:border-brand-green/50"
                    value={formData.organisation}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-gutter-lg">
                  <div className="field">
                    <label htmlFor="cf-email" className="block font-label text-label-md text-on-surface mb-gutter-xs">
                      Email Address <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="email"
                      id="cf-email"
                      name="email"
                      placeholder="you@domain.com"
                      required
                      autoComplete="email"
                      className={`w-full px-gutter-md py-gutter-sm bg-surface-dark border rounded-lg font-body text-body-md text-on-surface placeholder-on-surface/40 transition-all duration-state-change focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent ${errors.email ? 'border-red-500' : 'border-outline hover:border-brand-green/50'}`}
                      value={formData.email}
                      onChange={handleChange}
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-gutter-xs font-body text-body-sm text-red-500" role="alert">{errors.email}</p>
                    )}
                  </div>

                  <div className="field">
                    <label htmlFor="cf-phone" className="block font-label text-label-md text-on-surface mb-gutter-xs">
                      Mobile / Phone
                    </label>
                    <input
                      type="tel"
                      id="cf-phone"
                      name="phone"
                      placeholder="+91 98765 43210"
                      autoComplete="tel"
                      className="w-full px-gutter-md py-gutter-sm bg-surface-dark border border-outline rounded-lg font-body text-body-md text-on-surface placeholder-on-surface/40 transition-all duration-state-change focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent hover:border-brand-green/50"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="cf-work" className="block font-label text-label-md text-on-surface mb-gutter-xs">
                    Area of Technical Work <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="cf-work"
                    name="work"
                    required
                    className={`w-full px-gutter-md py-gutter-sm bg-surface-dark border rounded-lg font-body text-body-md text-on-surface transition-all duration-state-change focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent ${errors.work ? 'border-red-500' : 'border-outline hover:border-brand-green/50'}`}
                    value={formData.work}
                    onChange={handleChange}
                    aria-invalid={errors.work ? 'true' : 'false'}
                    aria-describedby={errors.work ? 'work-error' : undefined}
                  >
                    {workOptions.map((opt, i) => (
                      <option key={i} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  {errors.work && (
                    <p id="work-error" className="mt-gutter-xs font-body text-body-sm text-red-500" role="alert">{errors.work}</p>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="cf-message" className="block font-label text-label-md text-on-surface mb-gutter-xs">
                    Project Description & Requirements <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="cf-message"
                    name="message"
                    placeholder="Describe the corridor location, engineering scope, and requested deliverables (at least 20 characters)."
                    rows="4"
                    required
                    className={`w-full px-gutter-md py-gutter-sm bg-surface-dark border rounded-lg font-body text-body-md text-on-surface placeholder-on-surface/40 transition-all duration-state-change focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent resize-none ${errors.message ? 'border-red-500' : 'border-outline hover:border-brand-green/50'}`}
                    value={formData.message}
                    onChange={handleChange}
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-gutter-xs font-body text-body-sm text-red-500" role="alert">{errors.message}</p>
                  )}
                </div>

                <p id="form-note" className="form-note font-body text-body-sm text-on-surface/50">
                  All fields marked <span className="text-red-500" aria-hidden="true">*</span> are required. We respect your privacy and never share your data with third parties.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-block btn-lg w-full inline-flex items-center justify-center gap-gutter-sm bg-brand-green text-on-brand-green px-gutter-xl py-gutter-md font-label text-label-lg uppercase tracking-wider hover:bg-brand-green-dark transition-colors duration-state-change disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting…
                    </>
                  ) : (
                    <>
                      Submit Enquiry
                      <span className="material-symbols-outlined text-headline-sm" aria-hidden="true">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;