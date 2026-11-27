import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LEAD_STORY = {
  id: 'uav-observatory',
  badge: 'RESEARCH GRANT · 24 NOV 2026',
  catLabel: 'RESEARCH GRANT',
  date: '24 NOV 2026',
  sponsor: 'NHAI & DST SPONSORED',
  readTime: '4 MIN READ',
  title: 'SVNIT LAUNCHES GUJARAT’S FIRST UAV SURROGATE SAFETY & TRAFFIC CONFLICT OBSERVATORY',
  summary:
    'Led by Dr. Gaurang J. Joshi and Dr. Shriniwas S. Arkatkar, the new observatory integrates high-altitude drone trajectory extraction with real-time blackspot diagnostics across 180 km of NH-48.',
  body:
    'The Transportation Engineering & Planning division at SVNIT Surat has commissioned a dedicated UAV trajectory and surrogate safety observatory. By pairing high-altitude 4K drone feeds with automated computer-vision tracking, researchers can quantify post-encroachment time (PET) and time-to-collision (TTC) without waiting for multi-year crash histories.',
  bullets: [
    'Covers 180 km of high-volume NH-48 freight and commuter corridors',
    'Calibrates mixed-traffic conflict thresholds for 2-wheelers, LCVs, and multi-axle trucks',
    'Direct data pipeline for NHAI and Gujarat R&B blackspot remediation',
  ],
  image: '/images/Smart Mobility.jpg',
  imageAlt: 'SVNIT Transportation Engineering AI traffic trajectory command lab',
};

const NEWS_ITEMS = [
  {
    id: 'safety-audit-320',
    category: 'field',
    catLabel: 'FIELD MILESTONE',
    date: '12 NOV 2026',
    readTime: '3 MIN READ',
    title: '320 KM STAGE-III SAFETY AUDIT COMPLETED ON GUJARAT STATE HIGHWAYS',
    summary:
      'Prioritized 42 high-risk blackspots with ranked low-cost geometric and signage countermeasures.',
    body:
      'Our field audit engineers completed comprehensive daytime and night-time inspections across 320 km of state highway corridors, identifying 42 priority blackspots and recommending ranked, cost-effective geometric and signage interventions.',
    bullets: [
      'IRC:SP:88 compliance verification across 64 at-grade junctions',
      'Retro-reflectivity and edge-drop diagnostics along paved shoulders',
      'Immediate low-cost chevron, rumble strip, and guard-rail terminal upgrades',
    ],
    image: '/images/Road Safety Audit.jpg',
    imageAlt: 'Road safety audit inspection on state highway',
    badgePrimary: true,
  },
  {
    id: 'irc-pcu-adoption',
    category: 'events',
    catLabel: 'EVENTS & IRC',
    date: '28 OCT 2026',
    readTime: '5 MIN READ',
    title: 'IRC:SP-106 EXPRESSWAY PCU CALIBRATION ADOPTED IN DRAFT REVISION',
    summary:
      'SVNIT’s empirical multi-lane dynamic PCU tables accepted by the IRC Highway Specifications committee.',
    body:
      'Empirical dynamic Passenger Car Unit (PCU) curves developed by Dr. S. S. Arkatkar, Dr. G. J. Joshi, and Dr. A. Dhamaniya have been accepted into the draft revision of the Indian Roads Congress multi-lane expressway capacity guidelines.',
    bullets: [
      'Derived from multi-day ATCC and radar speed-flow datasets',
      'Accounts for heavy-vehicle share and grade resistance on 6-lane corridors',
      'Improves level-of-service (LOS) accuracy for DPR proof checking',
    ],
    image: '/images/Transportation.jpg',
    imageAlt: 'Indian Roads Congress technical committee review',
    badgePrimary: false,
  },
  {
    id: 'brts-pedestrian',
    category: 'research',
    catLabel: 'RESEARCH & GRANTS',
    date: '15 OCT 2026',
    readTime: '4 MIN READ',
    title: 'FIRST-MILE BRTS PEDESTRIAN AUDIT ROLLS OUT ACROSS 18 STATIONS',
    summary:
      'Joint study with Surat Sitilink evaluates curb ramps, tactile paving, and signalized crossing compliance.',
    body:
      'Working alongside Surat Sitilink, the TEP research group is evaluating 500-meter pedestrian catchments around 18 high-ridership BRTS stations to benchmark sidewalk continuity, curb ramps, and signalized crossing times.',
    bullets: [
      'Audits 1:12 accessible ramp slopes and tactile warning strips',
      'Measures pedestrian delay at median-station signalized crosswalks',
      'Produces station-by-station accessibility scorecards',
    ],
    image: '/images/Rail Services.jpg',
    imageAlt: 'Surat BRTS multimodal transit corridor',
    badgePrimary: true,
  },
  {
    id: 'hazira-axle-load',
    category: 'field',
    catLabel: 'FIELD MILESTONE',
    date: '02 OCT 2026',
    readTime: '3 MIN READ',
    title: 'HAZIRA PORT FREIGHT AXLE-LOAD SURVEY DELIVERS PAVEMENT BRIEF',
    summary:
      '7-day continuous ATCC and weigh-in-motion dataset calibrated rigid overlay thickness for heavy trailers.',
    body:
      'A 7-day continuous classified volume and axle-load spectrum study along the Hazira industrial corridor quantified overloaded container-trailer shares to calibrate rigid pavement overlay thickness.',
    bullets: [
      'Over 42,000 commercial axle passes logged via ATCC sensors',
      'Updated Vehicle Damage Factor (VDF) inputs for IRC:37 / IRC:58',
      'Recommendations for dedicated heavy-freight turning lanes',
    ],
    image: '/images/Traffic Engineering.jpg',
    imageAlt: 'Automated traffic counter survey on industrial corridor',
    badgePrimary: true,
  },
  {
    id: 'rsa-certification',
    category: 'events',
    catLabel: 'EVENTS & IRC',
    date: '19 SEP 2026',
    readTime: '2 MIN READ',
    title: '5-DAY IRC:SP:88 ROAD SAFETY AUDITOR CERTIFICATION AT SVNIT',
    summary:
      '45 highway engineers from R&B Gujarat and NHAI completed practical blackspot audit field training.',
    body:
      'Forty-five practicing highway engineers from Gujarat R&B, NHAI, and municipal corporations completed intensive classroom and field blackspot audit training at the SVNIT Surat campus.',
    bullets: [
      'Live field audit exercises on urban arterial junctions in Surat',
      'Crash collision diagramming and speed-study workshops',
      'Stage-wise DPR, construction, and O&M audit checklists',
    ],
    image: '/images/tep-about-photo.jpg',
    imageAlt: 'Work-zone traffic safety workshop',
    badgePrimary: false,
  },
  {
    id: 'vissim-benchmark',
    category: 'research',
    catLabel: 'RESEARCH & GRANTS',
    date: '04 SEP 2026',
    readTime: '4 MIN READ',
    title: 'MICROSIMULATION BENCHMARK FOR ACTUATED ARTERIAL SIGNAL CORRIDORS',
    summary:
      'VISSIM calibration reduced peak-hour queue spillback by 28% across five Surat Ring Road junctions.',
    body:
      'Using calibrated VISSIM models for heterogeneous Indian traffic, the team demonstrated a 28% reduction in peak-hour queue spillback across five consecutive signalized intersections along Surat Ring Road.',
    bullets: [
      'Coordinated green-wave offsets tuned for mixed 2-wheeler & bus platoons',
      'Eliminates upstream intersection gridlock during evening peak',
      'Ready for deployment on adaptive traffic control systems (ATCS)',
    ],
    image: '/images/Hero_1.jpg',
    imageAlt: 'Grade-separated highway interchange',
    badgePrimary: true,
  },
];

const ALL_STORIES_MAP = [LEAD_STORY, ...NEWS_ITEMS].reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {});

const FILTERS = [
  { key: 'all', label: 'ALL NEWS' },
  { key: 'research', label: 'RESEARCH & GRANTS' },
  { key: 'field', label: 'FIELD MILESTONES' },
  { key: 'events', label: 'EVENTS & IRC' },
];

const UPCOMING_EVENTS = [
  {
    date: '18 DEC 2026',
    venue: 'SVNIT AUDITORIUM',
    title: 'NATIONAL WORKSHOP ON INDO-HCM & URBAN JUNCTION DESIGN',
    description:
      'Hands-on calibration clinic covering saturation flow, roundabout capacity, and signal phasing.',
    highlight: true,
  },
  {
    date: '14 JAN 2027',
    venue: 'GANDHINAGAR',
    title: 'GUJARAT HIGHWAY SAFETY AUDIT & BLACKSPOT REVIEW SUMMIT',
    description:
      'Joint technical review with R&B Department engineers on crash prediction and work-zone safety.',
    highlight: false,
  },
  {
    date: '06 FEB 2027',
    venue: 'TEP LAB · SVNIT',
    title: 'BITUMINOUS MIX & AGGREGATE QA/QC TESTING CLINIC',
    description:
      'Live laboratory demonstration of Marshall stability, TSR, and VG-40 binder characterization.',
    highlight: false,
  },
];

export default function News() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeStoryId, setActiveStoryId] = useState(null);

  const visibleNews =
    activeFilter === 'all'
      ? NEWS_ITEMS
      : NEWS_ITEMS.filter((item) => item.category === activeFilter);

  const activeStory = activeStoryId ? ALL_STORIES_MAP[activeStoryId] : null;

  useEffect(() => {
    if (!activeStoryId) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveStoryId(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeStoryId]);

  return (
    <>
      {/* PAGE HERO HEADER */}
      <section className="relative w-full bg-surface border-b border-outline">
        <div className="max-w-[1440px] mx-auto p-gutter-lg lg:p-gutter-xl flex flex-col gap-gutter-md">
          <div className="flex items-center gap-gutter-sm">
            <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true" />
            <span className="font-label text-label-md uppercase text-on-surface-variant">
              NEWS — TEP · SVNIT, SURAT
            </span>
          </div>
          <h1 className="font-display text-display-lg-mobile lg:text-[40px] xl:text-[48px] lg:leading-[1.1] font-semibold tracking-tight uppercase text-balance text-on-surface">
            FIELD UPDATES, SYMPOSIUMS &amp; POLICY MILESTONES.
          </h1>
          <p className="font-body text-body-md text-on-surface-variant max-w-3xl text-pretty pt-gutter-xs">
            Updates from ongoing highway safety audits, MoRTH &amp; IRC code revisions, research grants, and technical workshops led by the Transportation Engineering &amp; Planning team.
          </p>
        </div>
      </section>

      {/* SECTION 1: LEAD STORY SPOTLIGHT */}
      <section id="lead-news" className="bg-surface text-on-surface border-b border-outline">
        <div className="max-w-[1440px] mx-auto p-gutter-lg lg:p-gutter-xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-gutter-md pb-gutter-lg mb-gutter-xl border-b border-outline">
            <div className="flex flex-col gap-gutter-xs">
              <div className="flex items-center gap-gutter-sm">
                <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true" />
                <span className="font-label text-label-md uppercase text-on-surface-variant">
                  TOP STORY
                </span>
              </div>
              <h2 className="font-headline text-headline-lg-mobile lg:text-headline-lg uppercase">
                FEATURED NEWS
              </h2>
            </div>
            <span className="font-label text-label-md uppercase text-on-surface-variant">
              NOVEMBER 2026 · ISSUE 14
            </span>
          </div>

          <article className="chamfer-card bg-outline-dark p-[1px]">
            <div className="chamfer-card-inner bg-surface-dark text-on-surface-dark overflow-hidden grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[380px] bg-surface-dark-elevated overflow-hidden border-b lg:border-b-0 lg:border-r border-outline-dark">
                <img
                  src={LEAD_STORY.image}
                  alt={LEAD_STORY.imageAlt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-gutter-md left-gutter-md bg-brand-green text-on-brand-green px-gutter-sm py-gutter-xs font-label text-label-sm uppercase">
                  {LEAD_STORY.badge}
                </div>
              </div>

              <div className="lg:col-span-5 p-gutter-xl flex flex-col justify-between gap-gutter-lg">
                <div className="flex flex-col gap-gutter-md">
                  <div className="flex items-center justify-between">
                    <span className="font-label text-label-sm uppercase text-on-surface-dark-muted">
                      {LEAD_STORY.sponsor}
                    </span>
                    <span className="font-label text-label-sm uppercase text-on-surface-dark-muted tabular-nums">
                      {LEAD_STORY.readTime}
                    </span>
                  </div>
                  <h3 className="font-headline text-headline-lg-mobile lg:text-headline-md uppercase text-on-surface-dark">
                    {LEAD_STORY.title}
                  </h3>
                  <p className="font-body text-body-md text-on-surface-dark-muted text-pretty">
                    {LEAD_STORY.summary}
                  </p>
                </div>

                <div className="border-t border-outline-dark pt-gutter-md flex items-center justify-between gap-gutter-md">
                  <button
                    type="button"
                    onClick={() => setActiveStoryId(LEAD_STORY.id)}
                    className="cursor-pointer inline-flex items-center gap-gutter-sm bg-brand-green text-on-brand-green px-gutter-md py-gutter-sm font-label text-label-md uppercase tracking-wider hover:bg-surface hover:text-on-surface transition-colors duration-state-change"
                  >
                    <span>READ FULL STORY</span>
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* SECTION 2: FILTERABLE NEWSROOM FEED */}
      <section id="newsroom-feed" className="bg-surface-container text-on-surface border-b border-outline">
        <div className="max-w-[1440px] mx-auto p-gutter-lg lg:p-gutter-xl">
          {/* Filter Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-gutter-md pb-gutter-lg mb-gutter-xl border-b border-outline">
            <div className="flex flex-col gap-gutter-xs">
              <div className="flex items-center gap-gutter-sm">
                <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true" />
                <span className="font-label text-label-md uppercase text-on-surface-variant">
                  RECENT BRIEFINGS
                </span>
              </div>
              <h2 className="font-headline text-headline-lg-mobile lg:text-headline-lg uppercase">
                NEWSROOM &amp; FIELD REPORTS
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-gutter-xs" role="group" aria-label="Filter news by category">
              {FILTERS.map((filter) => {
                const isActive = activeFilter === filter.key;
                return (
                  <button
                    key={filter.key}
                    type="button"
                    onClick={() => setActiveFilter(filter.key)}
                    className={`cursor-pointer px-gutter-md py-gutter-xs font-label text-label-sm uppercase tracking-wider transition-colors duration-state-change ${
                      isActive
                        ? 'bg-brand-green text-on-brand-green'
                        : 'bg-primary text-on-primary hover:bg-brand-green hover:text-on-brand-green'
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3-Column News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-lg items-stretch">
            {visibleNews.map((item) => (
              <article
                key={item.id}
                className="chamfer-card bg-outline hover:bg-brand-green p-[1px] transition-colors flex flex-col"
              >
                <div className="chamfer-card-inner bg-surface overflow-hidden flex flex-col flex-1">
                  <div className="relative h-48 bg-surface-dark overflow-hidden border-b border-outline">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className={`absolute top-gutter-sm left-gutter-sm px-gutter-sm py-gutter-xs font-label text-label-sm uppercase ${
                        item.badgePrimary
                          ? 'bg-brand-green text-on-brand-green'
                          : 'bg-primary text-on-primary'
                      }`}
                    >
                      {item.catLabel}
                    </div>
                  </div>
                  <div className="p-gutter-lg flex flex-col justify-between gap-gutter-md flex-1">
                    <div className="flex flex-col gap-gutter-xs">
                      <div className="flex items-center justify-between font-label text-label-sm uppercase text-on-surface-variant">
                        <span>{item.date}</span>
                        <span>{item.readTime}</span>
                      </div>
                      <h3 className="font-headline text-headline-sm uppercase text-on-surface">
                        {item.title}
                      </h3>
                      <p className="font-body text-body-sm text-on-surface-variant text-pretty">
                        {item.summary}
                      </p>
                    </div>
                    <div className="border-t border-outline pt-gutter-sm flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setActiveStoryId(item.id)}
                        className="cursor-pointer font-label text-label-sm uppercase text-on-surface hover:text-brand-green transition-colors"
                      >
                        READ BRIEFING →
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: UPCOMING SYMPOSIUMS & WORKSHOPS */}
      <section id="upcoming-events" className="bg-surface text-on-surface border-b border-outline">
        <div className="max-w-[1440px] mx-auto p-gutter-lg lg:p-gutter-xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-gutter-md pb-gutter-lg mb-gutter-xl border-b border-outline">
            <div className="flex flex-col gap-gutter-xs">
              <div className="flex items-center gap-gutter-sm">
                <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true" />
                <span className="font-label text-label-md uppercase text-on-surface-variant">
                  CALENDAR
                </span>
              </div>
              <h2 className="font-headline text-headline-lg-mobile lg:text-headline-lg uppercase">
                UPCOMING WORKSHOPS &amp; SYMPOSIUMS
              </h2>
            </div>
            <span className="font-label text-label-md uppercase text-on-surface-variant">
              DEC 2026 — FEB 2027
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter-lg items-stretch">
            {UPCOMING_EVENTS.map((ev) => (
              <div
                key={ev.title}
                className="bg-surface-container border border-outline p-gutter-lg flex flex-col justify-between gap-gutter-md"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`px-gutter-sm py-gutter-xs font-label text-label-sm uppercase tabular-nums ${
                      ev.highlight
                        ? 'bg-brand-green text-on-brand-green'
                        : 'bg-primary text-on-primary'
                    }`}
                  >
                    {ev.date}
                  </span>
                  <span className="font-label text-label-sm uppercase text-on-surface-variant">
                    {ev.venue}
                  </span>
                </div>
                <h3 className="font-headline text-headline-sm uppercase text-on-surface">
                  {ev.title}
                </h3>
                <p className="font-body text-body-sm text-on-surface-variant text-pretty">
                  {ev.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DARK CTA BANNER */}
      <section
        id="consultation-cta"
        className="relative bg-surface-dark text-on-surface-dark overflow-hidden border-t border-outline-dark"
      >
        <img
          src="/images/daniel-mccullough-HtBlQdxfG9k-unsplash.jpg"
          alt="Structural infrastructure corridor backdrop"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-dark/80 via-surface-dark/55 to-surface-dark/80 pointer-events-none" />
        <div className="relative z-10 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-4 p-gutter-xl border-b lg:border-r border-outline-dark">
            <p className="font-body text-body-sm uppercase leading-relaxed text-on-surface-dark max-w-xs text-pretty">
              PARTNER WITH A TEAM COMMITTED TO DELIVERING QUALITY, SAFETY, AND LONG-TERM VALUE — FROM GROUNDBREAKING TO COMPLETION.
            </p>
          </div>
          <div className="hidden lg:block lg:col-span-8 border-b border-outline-dark" />

          <div className="hidden lg:block lg:col-span-4 lg:border-r border-outline-dark min-h-[260px]" />
          <div className="lg:col-span-8 p-gutter-xl pb-20 flex flex-col justify-center items-start gap-gutter-lg min-h-[260px]">
            <h2 className="font-display text-display-md-mobile lg:text-display-lg uppercase leading-tight text-on-surface-dark max-w-2xl text-balance">
              BUILD WITH AN INDUSTRIALIZED AND DIGITAL SYSTEM
            </h2>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-gutter-sm bg-brand-green text-on-brand-green px-gutter-md py-gutter-sm font-label text-label-md uppercase tracking-wider hover:bg-surface hover:text-on-surface transition-colors duration-state-change ease-state-change"
            >
              <span>REQUEST A CONSULTATION</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ARTICLE READER MODAL */}
      {activeStory && (
        <div
          className="fixed inset-0 z-50 bg-surface-dark/95 text-on-surface-dark flex flex-col p-gutter-md lg:p-gutter-xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reader-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveStoryId(null);
          }}
        >
          <div className="max-w-3xl w-full mx-auto bg-surface text-on-surface border border-outline my-auto flex flex-col">
            <div className="flex items-center justify-between px-gutter-lg py-gutter-md bg-surface-dark text-on-surface-dark border-b border-outline-dark">
              <div className="flex items-center gap-gutter-sm">
                <span className="bg-brand-green text-on-brand-green px-gutter-sm py-gutter-xs font-label text-label-sm uppercase">
                  {activeStory.catLabel}
                </span>
                <span className="font-label text-label-sm uppercase text-on-surface-dark-muted">
                  {activeStory.date}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveStoryId(null)}
                className="cursor-pointer inline-flex items-center gap-gutter-xs bg-brand-green text-on-brand-green px-gutter-md py-gutter-xs font-label text-label-sm uppercase hover:opacity-90 transition-opacity"
              >
                <span>CLOSE</span>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-gutter-xl flex flex-col gap-gutter-md">
              <h3 id="reader-title" className="font-headline text-headline-lg-mobile lg:text-headline-md uppercase text-on-surface">
                {activeStory.title}
              </h3>
              <p className="font-body text-body-md text-on-surface-variant text-pretty">
                {activeStory.body}
              </p>
              <div className="bg-surface-container border border-outline p-gutter-md flex flex-col gap-gutter-xs">
                <span className="font-label text-label-sm uppercase text-on-surface">
                  KEY FIELD TAKEAWAYS
                </span>
                <ul className="list-disc pl-gutter-lg font-body text-body-sm text-on-surface-variant space-y-gutter-xs">
                  {activeStory.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
