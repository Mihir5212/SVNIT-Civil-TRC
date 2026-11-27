import React, { useState } from 'react';

const SCOPE_OPTIONS = [
  'TRAFFIC SURVEY',
  'ROAD SAFETY AUDIT',
  'DPR PROOF CHECK',
  'MATERIAL TESTING',
  'RESEARCH COLLAB',
];

export default function Contact() {
  const [selectedScope, setSelectedScope] = useState(SCOPE_OPTIONS[0]);
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    corridor: '',
    brief: '',
  });
  const [errors, setErrors] = useState({});
  const [submittedRef, setSubmittedRef] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = 'Full name is required.';
    if (!formData.organization.trim()) nextErrors.organization = 'Organization or agency is required.';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Enter a valid official email address.';
    }
    if (!formData.brief.trim() || formData.brief.trim().length < 15) {
      nextErrors.brief = 'Please describe your scope and deliverables (at least 15 characters).';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSubmittedRef('');
      return;
    }

    const randomCode = Math.floor(100 + Math.random() * 900);
    setSubmittedRef(`TEP-INQ-2026-${randomCode}`);
    setErrors({});
    setFormData({
      name: '',
      organization: '',
      email: '',
      phone: '',
      corridor: '',
      brief: '',
    });
  };

  return (
    <>
      {/* PAGE HERO WITH LIVE SVNIT MAP IN RIGHT CORNER */}
      <section id="svnit-map" className="relative w-full bg-surface border-b border-outline">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12">
          {/* Left Hero Header */}
          <div className="lg:col-span-7 p-gutter-lg lg:p-gutter-xl flex flex-col justify-between gap-gutter-md lg:border-r border-outline">
            <div className="flex flex-col gap-gutter-md">
              <div className="flex items-center gap-gutter-sm">
                <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true" />
                <span className="font-label text-label-md uppercase text-on-surface-variant">
                  CONTACT US — TEP · SVNIT, SURAT
                </span>
              </div>

              <h1 className="font-display text-display-lg-mobile lg:text-[40px] xl:text-[46px] lg:leading-[1.1] font-semibold tracking-tight uppercase text-balance text-on-surface">
                INITIATE A CONSULTATION OR LABORATORY INQUIRY.
              </h1>

              <p className="font-body text-body-md text-on-surface-variant max-w-2xl text-pretty">
                Reach our Transportation Engineering &amp; Planning faculty and project engineers for traffic studies, IRC:SP:88 road safety audits, DPR proof checking, and laboratory material testing at SVNIT Surat.
              </p>
            </div>

            <div className="pt-gutter-md border-t border-outline flex flex-wrap items-center justify-between gap-gutter-sm">
              <span className="font-label text-label-sm uppercase text-brand-green tabular-nums">
                HOURS: MON – FRI · 09:30 – 17:30 IST
              </span>
              <a
                href="#inquiry-form"
                className="inline-flex items-center gap-gutter-sm border border-outline bg-surface-container hover:border-brand-green hover:text-brand-green px-gutter-md py-gutter-xs font-label text-label-sm uppercase tracking-wider transition-colors"
              >
                <span>INQUIRY FORM</span>
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          {/* Right Corner: Live SVNIT Surat Google Map */}
          <div className="lg:col-span-5 p-gutter-md lg:p-gutter-lg bg-surface-container border-t lg:border-t-0 border-outline flex flex-col gap-gutter-sm">
            <div className="flex items-center justify-between font-label text-label-sm uppercase text-on-surface-variant">
              <span className="flex items-center gap-gutter-xs">
                <span className="w-2 h-2 bg-brand-green inline-block" aria-hidden="true" />
                <span>SVNIT SURAT · LIVE LOCATION</span>
              </span>
              <a
                href="https://maps.google.com/?q=Sardar+Vallabhbhai+National+Institute+of+Technology+Surat"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-green hover:opacity-80 transition-opacity"
              >
                OPEN IN MAPS ↗
              </a>
            </div>

            <div className="w-full h-[220px] sm:h-[250px] lg:flex-1 min-h-[220px] border border-outline bg-surface overflow-hidden">
              <iframe
                title="Map showing SVNIT Surat"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="w-full h-full border-0 block"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14882.454124282574!2d72.788812!3d21.167773!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04dec8b56fdf3%3A0x423b99085d26d1f9!2sSardar%20Vallabhbhai%20National%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1795792525775!5m2!1sen!2sin"
                allowFullScreen
              />
            </div>

            <div className="flex items-center justify-between font-label text-label-sm uppercase text-on-surface-variant tabular-nums">
              <span>21.1663° N, 72.7833° E</span>
              <span>ICHCHHANATH · SURAT 395007</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: CONSULTATION FORM & LAB DIRECTORY */}
      <section id="inquiry-form" className="bg-surface text-on-surface border-b border-outline">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12">
          {/* Left: Interactive Inquiry Form */}
          <div className="lg:col-span-7 p-gutter-lg lg:p-gutter-xl pb-gutter-xl lg:pb-16 border-b lg:border-b-0 lg:border-r border-outline flex flex-col gap-gutter-lg">
            <div className="flex flex-col gap-gutter-xs border-b border-outline pb-gutter-md">
              <div className="flex items-center gap-gutter-sm">
                <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true" />
                <span className="font-label text-label-md uppercase text-on-surface-variant">
                  TECHNICAL BRIEFING
                </span>
              </div>
              <h2 className="font-headline text-headline-lg-mobile lg:text-headline-lg uppercase">
                REQUEST A PROPOSAL OR LAB TEST
              </h2>
            </div>

            {/* Scope Selector Pills */}
            <div className="flex flex-col gap-gutter-sm">
              <span className="font-label text-label-sm uppercase text-on-surface-variant">
                SELECT CONSULTANCY SCOPE
              </span>
              <div className="flex flex-wrap gap-gutter-xs" role="group" aria-label="Select consultancy scope">
                {SCOPE_OPTIONS.map((scope) => {
                  const isActive = selectedScope === scope;
                  return (
                    <button
                      key={scope}
                      type="button"
                      onClick={() => setSelectedScope(scope)}
                      className={`cursor-pointer px-gutter-md py-gutter-xs font-label text-label-sm uppercase tracking-wider transition-colors ${
                        isActive
                          ? 'bg-brand-green text-on-brand-green'
                          : 'bg-surface-container text-on-surface border border-outline hover:bg-primary hover:text-on-primary'
                      }`}
                    >
                      {scope}
                    </button>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-gutter-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter-md">
                <div className="flex flex-col gap-gutter-xs">
                  <label htmlFor="contact-name" className="font-label text-label-sm uppercase text-on-surface">
                    FULL NAME *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Rajesh Patel"
                    className={`bg-surface-container border px-gutter-md py-gutter-sm font-body text-body-md text-on-surface placeholder:text-on-surface-variant focus:border-brand-green focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green ${
                      errors.name ? 'border-red-600' : 'border-outline'
                    }`}
                  />
                  {errors.name && (
                    <span className="font-body text-body-sm text-red-700">{errors.name}</span>
                  )}
                </div>
                <div className="flex flex-col gap-gutter-xs">
                  <label htmlFor="contact-org" className="font-label text-label-sm uppercase text-on-surface">
                    ORGANIZATION / AGENCY *
                  </label>
                  <input
                    id="contact-org"
                    name="organization"
                    type="text"
                    required
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="Gujarat R&B / NHAI / EPC"
                    className={`bg-surface-container border px-gutter-md py-gutter-sm font-body text-body-md text-on-surface placeholder:text-on-surface-variant focus:border-brand-green focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green ${
                      errors.organization ? 'border-red-600' : 'border-outline'
                    }`}
                  />
                  {errors.organization && (
                    <span className="font-body text-body-sm text-red-700">{errors.organization}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter-md">
                <div className="flex flex-col gap-gutter-xs">
                  <label htmlFor="contact-email" className="font-label text-label-sm uppercase text-on-surface">
                    OFFICIAL EMAIL *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="engineer@agency.gov.in"
                    className={`bg-surface-container border px-gutter-md py-gutter-sm font-body text-body-md text-on-surface placeholder:text-on-surface-variant focus:border-brand-green focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green ${
                      errors.email ? 'border-red-600' : 'border-outline'
                    }`}
                  />
                  {errors.email && (
                    <span className="font-body text-body-sm text-red-700">{errors.email}</span>
                  )}
                </div>
                <div className="flex flex-col gap-gutter-xs">
                  <label htmlFor="contact-phone" className="font-label text-label-sm uppercase text-on-surface">
                    PHONE NUMBER
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 261 225 9571"
                    className="bg-surface-container border border-outline px-gutter-md py-gutter-sm font-body text-body-md text-on-surface placeholder:text-on-surface-variant focus:border-brand-green focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green tabular-nums"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-gutter-xs">
                <label htmlFor="contact-corridor" className="font-label text-label-sm uppercase text-on-surface">
                  CORRIDOR / PROJECT LOCATION
                </label>
                <input
                  id="contact-corridor"
                  name="corridor"
                  type="text"
                  value={formData.corridor}
                  onChange={handleChange}
                  placeholder="e.g., NH-48 Bharuch–Surat Section (KM 198 to KM 264)"
                  className="bg-surface-container border border-outline px-gutter-md py-gutter-sm font-body text-body-md text-on-surface placeholder:text-on-surface-variant focus:border-brand-green focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                />
              </div>

              <div className="flex flex-col gap-gutter-xs">
                <label htmlFor="contact-brief" className="font-label text-label-sm uppercase text-on-surface">
                  SCOPE &amp; DELIVERABLE REQUIREMENTS ({selectedScope}) *
                </label>
                <textarea
                  id="contact-brief"
                  name="brief"
                  rows={4}
                  required
                  value={formData.brief}
                  onChange={handleChange}
                  placeholder="Describe survey duration, IRC standard (IRC:SP:88 / Indo-HCM), or laboratory testing batch volume..."
                  className={`bg-surface-container border px-gutter-md py-gutter-sm font-body text-body-md text-on-surface placeholder:text-on-surface-variant focus:border-brand-green focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green resize-none ${
                    errors.brief ? 'border-red-600' : 'border-outline'
                  }`}
                />
                {errors.brief && (
                  <span className="font-body text-body-sm text-red-700">{errors.brief}</span>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-gutter-md pt-gutter-sm">
                <button
                  type="submit"
                  className="cursor-pointer inline-flex items-center justify-center gap-gutter-sm bg-brand-green text-on-brand-green px-gutter-md py-gutter-sm font-label text-label-md uppercase tracking-wider hover:bg-primary hover:text-on-primary transition-colors duration-state-change ease-state-change"
                >
                  <span>SUBMIT TECHNICAL INQUIRY</span>
                  <span aria-hidden="true">→</span>
                </button>
                <span className="font-label text-label-sm uppercase text-on-surface-variant">
                  RESPONSE WITHIN 24 BUSINESS HOURS
                </span>
              </div>

              {submittedRef && (
                <div
                  role="alert"
                  className="bg-surface-dark text-on-surface-dark border border-brand-green p-gutter-md flex items-center justify-between gap-gutter-md"
                >
                  <div className="flex items-center gap-gutter-sm">
                    <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true" />
                    <span className="font-label text-label-sm uppercase">
                      INQUIRY LOGGED — REF: {submittedRef} ({selectedScope}). OUR ENGINEERING DESK WILL RESPOND SHORTLY.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSubmittedRef('')}
                    aria-label="Dismiss notification"
                    className="cursor-pointer font-label text-label-sm uppercase text-on-surface-dark-muted hover:text-on-surface-dark"
                  >
                    ✕
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Right: Direct Contact Channels */}
          <div className="lg:col-span-5 bg-surface-container p-gutter-lg lg:p-gutter-xl pb-gutter-xl lg:pb-16 flex flex-col justify-between gap-gutter-lg">
            <div className="flex flex-col gap-gutter-lg">
              <div className="flex items-center justify-between border-b border-outline pb-gutter-md">
                <span className="font-label text-label-md uppercase text-on-surface-variant">
                  DIRECT CHANNELS
                </span>
                <span className="font-label text-label-sm uppercase text-on-surface-variant">
                  SURAT · GUJARAT
                </span>
              </div>

              {/* Channel 01 */}
              <div className="chamfer-card bg-outline p-[1px]">
                <div className="chamfer-card-inner bg-surface p-gutter-lg flex flex-col gap-gutter-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-label text-label-sm uppercase text-brand-green font-semibold">
                      01 · LABORATORY HQ
                    </span>
                    <svg className="w-4 h-4 text-brand-green" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
                    </svg>
                  </div>
                  <h3 className="font-headline text-headline-sm uppercase text-on-surface">
                    TRANSPORTATION ENGINEERING LAB (DOCE)
                  </h3>
                  <p className="font-body text-body-sm text-on-surface-variant text-pretty">
                    Department of Civil Engineering, SVNIT Campus, Ichchhanath, Dumas Road, Surat — 395007, Gujarat, India.
                  </p>
                </div>
              </div>

              {/* Channel 02 */}
              <div className="chamfer-card bg-outline-dark p-[1px]">
                <div className="chamfer-card-inner bg-surface-dark text-on-surface-dark p-gutter-lg flex flex-col gap-gutter-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-label text-label-sm uppercase text-brand-green font-semibold">
                      02 · CONSULTANCY DESK
                    </span>
                    <svg className="w-4 h-4 text-brand-green" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <a
                      href="mailto:trc@svnit.ac.in"
                      className="font-headline text-headline-sm tracking-wide text-on-surface-dark hover:text-brand-green transition-colors"
                    >
                      trc@svnit.ac.in
                    </a>
                    <a
                      href="mailto:tep-consultancy@ced.svnit.ac.in"
                      className="font-body text-body-sm text-on-surface-dark-muted hover:text-on-surface-dark transition-colors"
                    >
                      tep-consultancy@ced.svnit.ac.in
                    </a>
                  </div>
                  <p className="font-body text-body-sm text-on-surface-dark-muted tabular-nums">
                    Direct Phone:{' '}
                    <a href="tel:+912612259571" className="text-on-surface-dark hover:text-brand-green transition-colors">
                      +91 261 225 9571
                    </a>{' '}
                    · Ext. 1500
                  </p>
                </div>
              </div>

              {/* Channel 03 */}
              <div className="chamfer-card bg-outline p-[1px]">
                <div className="chamfer-card-inner bg-surface p-gutter-lg flex flex-col gap-gutter-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-label text-label-sm uppercase text-brand-green font-semibold">
                      03 · MATERIAL QA/QC LAB
                    </span>
                    <svg className="w-4 h-4 text-brand-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6m-4 0v5l-5.5 9.2A2 2 0 0 0 7.2 20h9.6a2 2 0 0 0 1.7-2.8L13 8V3" />
                    </svg>
                  </div>
                  <h3 className="font-headline text-headline-sm uppercase text-on-surface">
                    HIGHWAY MATERIALS &amp; BITUMEN LAB
                  </h3>
                  <p className="font-body text-body-sm text-on-surface-variant text-pretty">
                    Sample drop-off &amp; third-party cube, core &amp; bitumen testing: Mon–Fri, 10:00–16:30 IST.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-outline pt-gutter-md flex items-center justify-between">
              <span className="font-label text-label-sm uppercase text-on-surface-variant tabular-nums">
                MON – FRI · 09:30 – 17:30 IST
              </span>
              <a
                href="#svnit-map"
                className="font-label text-label-sm uppercase text-brand-green hover:opacity-80 transition-opacity"
              >
                VIEW SVNIT MAP ↑
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DARK CTA BANNER ABOVE FOOTER */}
      <section
        id="consultation-cta"
        className="relative bg-surface-dark text-on-surface-dark overflow-hidden border-t border-outline-dark"
      >
        <img
          src="/images/Hero_3.jpg"
          alt="Infrastructure field crew and corridor construction reference"
          className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 brightness-50 opacity-45 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-dark/80 via-surface-dark/50 to-surface-dark/80 pointer-events-none" />
        <div className="relative z-10 max-w-[1440px] mx-auto border-x border-outline-dark">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-4 p-gutter-xl border-b lg:border-r border-outline-dark">
              <p className="font-body text-body-sm uppercase leading-relaxed text-on-surface-dark max-w-xs text-pretty">
                PARTNER WITH A TEAM COMMITTED TO DELIVERING QUALITY, SAFETY, AND LONG-TERM VALUE &mdash; FROM GROUNDBREAKING TO COMPLETION.
              </p>
            </div>
            <div className="hidden lg:block lg:col-span-8 border-b border-outline-dark" />

            <div className="hidden lg:block lg:col-span-4 lg:border-r border-outline-dark min-h-[260px]" />
            <div className="lg:col-span-8 p-gutter-xl pb-20 flex flex-col justify-center items-start gap-gutter-lg min-h-[260px]">
              <h2 className="font-display text-display-md-mobile lg:text-display-lg uppercase leading-tight text-on-surface-dark max-w-2xl text-balance">
                BUILD WITH AN INDUSTRIALIZED AND DIGITAL SYSTEM
              </h2>
              <a
                href="#inquiry-form"
                className="inline-flex items-center justify-center gap-gutter-sm bg-brand-green text-on-brand-green px-gutter-md py-gutter-sm font-label text-label-md uppercase tracking-wider hover:bg-surface hover:text-on-surface transition-colors duration-state-change ease-state-change"
              >
                <span>REQUEST A CONSULTATION</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
