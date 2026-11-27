import { useState } from 'react';
import { Link } from 'react-router-dom';

const CONSULTANTS = [
  {
    num: '001',
    name: 'DR. GAURANG J. JOSHI',
    designation: 'Professor, SVNIT, Surat',
    photo: '/team/gaurang-joshi.jpg',
    profile: 'https://gjjoshisvnit.com/',
  },
  {
    num: '002',
    name: 'DR. SHRINIWAS S. ARKATKAR',
    designation: 'Professor, SVNIT, Surat',
    photo: '/team/shriniwas-arkatkar.jpg',
    profile: 'https://shriniwasprofile.wordpress.com/',
  },
  {
    num: '003',
    name: 'DR. ASHISH DHAMANIYA',
    designation: 'Professor, SVNIT, Surat',
    photo: '/team/ashish-dhamaniya.jpg',
    profile: 'https://sites.google.com/view/drashishdhamaniya',
  },
];

const STAFF_MEMBERS = [
  {
    num: '001',
    name: 'MAITRIK BHADRESA',
    designation: 'Senior Project Engineer',
    role: 'senior',
    photo: '/team/maitrik-bhadresa.jpg',
  },
  {
    num: '002',
    name: 'KRUSHNARAJ CHAUDHARI',
    designation: 'Senior Project Engineer',
    role: 'senior',
    photo: '/team/krushnaraj-chaudhari.jpg',
  },
  {
    num: '003',
    name: 'SIDDHARTH UMRIGAR',
    designation: 'Project Engineer',
    role: 'engineer',
    photo: '/team/siddharth-umrigar.jpg',
  },
  {
    num: '004',
    name: 'AYUSH PATEL',
    designation: 'Project Planner',
    role: 'planning',
    photo: '/team/ayush-patel.jpg',
  },
  {
    num: '005',
    name: 'MESHVI PATEL',
    designation: 'Project Engineer',
    role: 'engineer',
    photo: '/team/meshvi-patel.jpg',
  },
  {
    num: '006',
    name: 'DARSHIT LAD',
    designation: 'Project Engineer',
    role: 'engineer',
    photo: '/team/darshit-lad.jpg',
  },
  {
    num: '007',
    name: 'SUNIL KUMAR',
    designation: 'Draftsman',
    role: 'planning',
    photo: '/team/sunil-kumar.jpg',
  },
  {
    num: '008',
    name: 'MIHIR KOLADIYA',
    designation: 'Research Project Engineer',
    role: 'research',
    photo: '/team/Mihir Koladiya.png',
  },
  {
    num: '009',
    name: 'HARSH KAKKAD',
    designation: 'Research Project Engineer',
    role: 'research',
    photo: '/team/Harsh Kakkad.png',
  },
];

const ROLE_FILTERS = [
  { key: 'all', label: 'ALL' },
  { key: 'senior', label: 'SENIOR ENGINEERS' },
  { key: 'engineer', label: 'PROJECT ENGINEERS' },
  { key: 'research', label: 'RESEARCH ENGINEERS' },
  { key: 'planning', label: 'PLANNING & DRAFTING' },
];

const Team = () => {
  const [activeRole, setActiveRole] = useState('all');

  const visibleStaff =
    activeRole === 'all'
      ? STAFF_MEMBERS
      : STAFF_MEMBERS.filter((m) => m.role === activeRole);

  return (
    <div id="top" className="w-full flex flex-col bg-surface text-on-surface">
      {/* ========================================================= */}
      {/* PAGE HERO HEADER                                          */}
      {/* ========================================================= */}
      <section className="relative w-full bg-surface border-b border-outline">
        <div className="max-w-[1440px] mx-auto p-gutter-lg lg:p-gutter-xl flex flex-col gap-gutter-md">
          <div className="flex items-center gap-gutter-sm">
            <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true" />
            <span className="font-label text-label-md uppercase text-on-surface-variant" data-design-text-token="label-md">
              OUR PEOPLE &mdash; TEP &middot; SVNIT, SURAT
            </span>
          </div>

          <h1 className="font-display text-display-lg-mobile lg:text-[38px] xl:text-[48px] lg:leading-[1.1] font-semibold tracking-tight uppercase" data-design-text-token="display-lg">
            PROFESSORS, CONSULTANTS &amp; PROJECT STAFF.
          </h1>

          <p className="font-body text-body-md text-on-surface-variant max-w-2xl text-pretty pt-gutter-xs" data-design-text-token="body-md">
            Transportation engineering faculty and dedicated project engineers delivering research-backed consultancy, planning, and field execution.
          </p>
        </div>
      </section>

      <main id="main" className="flex-1">
        {/* ========================================================= */}
        {/* SECTION 1: PROFESSORS & PROJECT CONSULTANTS (CENTERED)    */}
        {/* ========================================================= */}
        <section id="consultants" className="bg-surface text-on-surface border-b border-outline p-gutter-lg lg:p-gutter-xl">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-gutter-md pb-gutter-lg mb-gutter-xl border-b border-outline">
              <div className="flex flex-col gap-gutter-xs">
                <div className="flex items-center gap-gutter-sm">
                  <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true" />
                  <span className="font-label text-label-md uppercase text-on-surface-variant" data-design-text-token="label-md">
                    OUR PEOPLE
                  </span>
                </div>
                <h2 className="font-headline text-headline-lg-mobile lg:text-headline-lg uppercase" data-design-text-token="headline-lg">
                  PROFESSORS &amp; PROJECT CONSULTANTS
                </h2>
              </div>
              <span className="font-label text-label-md uppercase text-on-surface-variant" data-design-text-token="label-md">
                FACULTY LEADERSHIP
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-[980px] mx-auto gap-gutter-lg items-stretch">
              {CONSULTANTS.map((person) => (
                <article
                  key={person.num}
                  data-component-id="card-team-consultant"
                  data-component-type="card"
                  data-component-variant="filled"
                  className="h-full flex flex-col gap-gutter-xs"
                >
                  <div className="relative chamfer-octagon bg-surface-dark text-on-surface-dark flex flex-col flex-1">
                    <header className="relative z-10 flex items-center justify-between px-gutter-lg pt-gutter-lg pb-gutter-sm border-b border-outline-dark">
                      <span className="font-label text-label-sm uppercase text-on-surface-dark-muted" data-design-text-token="label-sm">
                        CONSULTANT
                      </span>
                      <span className="font-label text-label-md text-on-surface-dark-muted tabular-nums" data-design-text-token="label-md">
                        {person.num}
                      </span>
                    </header>

                    {/* Portrait Photo Stage (1:1 Aspect Ratio, natural color) */}
                    <div className="relative w-full aspect-square bg-surface-container overflow-hidden group">
                      <img
                        src={person.photo}
                        alt={`${person.name}, ${person.designation}`}
                        className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
                      />
                    </div>

                    <div className="relative z-10 px-gutter-lg py-gutter-lg border-t border-outline-dark flex flex-col gap-gutter-xs flex-1 justify-between">
                      <div>
                        <h3 className="font-headline text-headline-md uppercase text-on-surface-dark" data-design-text-token="headline-md">
                          {person.name}
                        </h3>
                        <p className="font-body text-body-sm text-on-surface-dark-muted mt-gutter-xs" data-design-text-token="body-sm">
                          {person.designation}
                        </p>
                      </div>
                    </div>
                  </div>

                  <a
                    href={person.profile}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-component-id="card-action-link"
                    data-component-type="button"
                    data-component-variant="primary"
                    className="chamfer-card flex items-center justify-between bg-brand-green text-on-brand-green px-gutter-lg py-gutter-md font-label text-label-md uppercase tracking-wider hover:bg-primary hover:text-on-primary transition-colors duration-state-change ease-state-change"
                  >
                    <span data-design-text-token="label-md">PROFILE WEBSITE</span>
                    <span className="material-symbols-outlined text-body-md" aria-hidden="true">arrow_forward</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: PROJECT STAFF                                  */}
        {/* ========================================================= */}
        <section id="project-staff" className="bg-surface text-on-surface border-b border-outline p-gutter-lg lg:p-gutter-xl">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-gutter-md pb-gutter-lg mb-gutter-xl border-b border-outline">
              <div className="flex flex-col gap-gutter-xs">
                <div className="flex items-center gap-gutter-sm">
                  <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true" />
                  <span className="font-label text-label-md uppercase text-on-surface-variant" data-design-text-token="label-md">
                    OUR PEOPLE
                  </span>
                </div>
                <h2 className="font-headline text-headline-lg-mobile lg:text-headline-lg uppercase" data-design-text-token="headline-lg">
                  PROJECT STAFF
                </h2>
              </div>

              {/* Role Filter Bar */}
              <div className="flex flex-wrap items-center gap-gutter-xs" role="group" aria-label="Filter project staff by role">
                {ROLE_FILTERS.map((f) => {
                  const isActive = activeRole === f.key;
                  return (
                    <button
                      key={f.key}
                      type="button"
                      onClick={() => setActiveRole(f.key)}
                      className={`px-gutter-md py-gutter-xs font-label text-label-sm uppercase tracking-wider transition-colors duration-state-change cursor-pointer ${
                        isActive
                          ? 'bg-brand-green text-on-brand-green'
                          : 'bg-surface-container text-on-surface border border-outline hover:bg-primary hover:text-on-primary'
                      }`}
                    >
                      <span data-design-text-token="label-sm">{f.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-gutter-lg items-stretch">
              {visibleStaff.map((staff) => (
                <article
                  key={staff.num}
                  className="staff-card h-full chamfer-card bg-outline hover:bg-brand-green p-[1px] transition-colors duration-state-change group"
                >
                  <div className="h-full w-full chamfer-card-inner bg-surface-container flex flex-col justify-between">
                    <div className="relative w-full aspect-square bg-surface-container overflow-hidden border-b border-outline">
                      <img
                        src={staff.photo}
                        alt={`${staff.name}, ${staff.designation}`}
                        className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
                      />
                      <span className="absolute top-2 right-2 sm:top-gutter-sm sm:right-gutter-sm bg-surface-dark text-on-surface-dark px-1.5 py-0.5 sm:px-gutter-sm sm:py-gutter-xs font-label text-[9px] sm:text-label-sm uppercase tabular-nums" data-design-text-token="label-sm">
                        {staff.num}
                      </span>
                    </div>
                    <div className="p-3 sm:p-gutter-lg flex flex-col justify-between gap-1.5 sm:gap-gutter-sm flex-1">
                      <h3 className="font-headline text-sm sm:text-headline-md uppercase text-on-surface leading-snug" data-design-text-token="headline-md">
                        {staff.name}
                      </h3>
                      <div className="flex items-start sm:items-center gap-1.5 sm:gap-gutter-sm">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 mt-1 sm:mt-0 bg-brand-green rotate-45 shrink-0" aria-hidden="true" />
                        <span className="font-label text-[10px] sm:text-label-md uppercase text-on-surface-variant leading-tight" data-design-text-token="label-md">
                          {staff.designation}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              {/* Collaborative Unit Callout (fills 8th slot cleanly in 4-col grid when ALL active) */}
              {activeRole === 'all' && (
                <div id="staff-callout" className="h-full chamfer-card bg-surface-dark text-on-surface-dark blueprint-grid-dark p-3.5 sm:p-gutter-lg flex flex-col justify-between gap-3 sm:gap-gutter-lg">
                  <div className="flex flex-col gap-1.5 sm:gap-gutter-sm">
                    <div className="flex items-center gap-1.5 sm:gap-gutter-sm">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-brand-green rotate-45 shrink-0" aria-hidden="true" />
                      <span className="font-label text-[9px] sm:text-label-sm uppercase text-on-surface-dark-muted" data-design-text-token="label-sm">
                        TEP &mdash; SVNIT, SURAT
                      </span>
                    </div>
                    <h3 className="font-headline text-sm sm:text-headline-md uppercase text-on-surface-dark leading-snug" data-design-text-token="headline-md">
                      RESEARCH &amp; CONSULTANCY UNIT
                    </h3>
                    <p className="font-body text-[10px] sm:text-body-sm text-on-surface-dark-muted text-pretty leading-relaxed" data-design-text-token="body-sm">
                      Combining academic rigor with field-tested civil engineering, traffic modeling, and structural drafting.
                    </p>
                  </div>
                  <Link
                    to="/contact"
                    data-component-id="button-primary"
                    data-component-type="button"
                    data-component-variant="primary"
                    className="inline-flex items-center justify-center gap-1.5 sm:gap-gutter-sm bg-brand-green text-on-brand-green px-2.5 py-2 sm:px-gutter-md sm:py-gutter-sm font-label text-[10px] sm:text-label-md uppercase tracking-wider hover:bg-surface hover:text-on-surface transition-colors duration-state-change ease-state-change self-start"
                  >
                    <span data-design-text-token="label-md">CONNECT WITH US</span>
                    <span className="material-symbols-outlined text-xs sm:text-body-md" aria-hidden="true">arrow_forward</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* DARK CTA BANNER                                           */}
        {/* ========================================================= */}
        <section id="consultation-cta" className="relative bg-surface-dark text-on-surface-dark overflow-hidden border-t border-outline-dark">
          <img
            src="/images/Hero_3.jpg"
            alt="Architectural skyscraper facade grid"
            className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 brightness-50 opacity-45 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-dark/80 via-surface-dark/50 to-surface-dark/80 pointer-events-none" />
          <div className="relative z-10 max-w-[1440px] mx-auto border-x border-outline-dark">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-4 p-gutter-xl border-b lg:border-r border-outline-dark">
                <p className="font-body text-body-sm uppercase leading-relaxed text-on-surface-dark max-w-xs text-pretty" data-design-text-token="body-sm">
                  PARTNER WITH A TEAM COMMITTED TO DELIVERING QUALITY, SAFETY, AND LONG-TERM VALUE &mdash; FROM GROUNDBREAKING TO COMPLETION.
                </p>
              </div>
              <div className="hidden lg:block lg:col-span-8 border-b border-outline-dark" />

              <div className="hidden lg:block lg:col-span-4 lg:border-r border-outline-dark min-h-[260px]" />
              <div className="lg:col-span-8 p-gutter-xl pb-20 flex flex-col justify-center items-start gap-gutter-lg min-h-[260px]">
                <h2 className="font-display text-display-md-mobile lg:text-display-lg uppercase leading-tight text-on-surface-dark max-w-2xl text-balance" data-design-text-token="display-lg">
                  BUILD WITH AN INDUSTRIALIZED AND DIGITAL SYSTEM
                </h2>
                <Link
                  to="/contact"
                  data-component-id="button-primary"
                  data-component-type="button"
                  data-component-variant="primary"
                  className="inline-flex items-center justify-center gap-gutter-sm bg-brand-green text-on-brand-green px-gutter-md py-gutter-sm font-label text-label-md uppercase tracking-wider hover:bg-surface hover:text-on-surface transition-colors duration-state-change ease-state-change"
                >
                  <span data-design-text-token="label-md">REQUEST A CONSULTATION</span>
                  <span className="material-symbols-outlined text-body-md" aria-hidden="true">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Team;
