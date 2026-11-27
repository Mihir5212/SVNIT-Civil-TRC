import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const GALLERY_PLATES = [
  {
    id: 'plate-01',
    category: 'structures',
    catLabel: 'STRUCTURES & LAB',
    badgeLabel: 'STRUCTURES',
    aspect: 'aspect-[3/4]',
    darkCard: false,
    title: 'CIVIL ENGINEERING & RESEARCH BLOCK',
    meta: 'SVNIT CAMPUS, SURAT · 2026',
    src: '/SVNIT Building.jpg',
    description:
      'Transportation Engineering & Planning (TEP) research facility housing the traffic flow laboratory, pavement instrumentation, and structural testing units at SVNIT Surat.',
  },
  {
    id: 'plate-02',
    category: 'surveys',
    catLabel: 'FIELD SURVEYS',
    badgeLabel: 'FIELD SURVEYS',
    aspect: 'aspect-[4/3]',
    darkCard: true,
    title: 'UAV TRAJECTORY & ITS COMMAND LAB',
    meta: 'SVNIT TRAFFIC LAB · 2026',
    src: '/images/Smart Mobility.jpg',
    description:
      'Multi-camera traffic conflict extraction, adaptive signal detector calibration, and automated vehicle classification using high-altitude drone video telemetry.',
  },
  {
    id: 'plate-03',
    category: 'corridors',
    catLabel: 'HIGHWAY CORRIDORS',
    badgeLabel: 'CORRIDORS',
    aspect: 'aspect-[16/10]',
    darkCard: false,
    title: 'SIX-LANE INTERURBAN EXPRESSWAY',
    meta: 'NH-48 BHARUCH–SURAT · 2025',
    src: '/images/Transportation.jpg',
    description:
      'Paved shoulder continuity, longitudinal drainage evaluation, and high-speed lane-marking retro-reflectivity verification along NH-48.',
  },
  {
    id: 'plate-04',
    category: 'safety',
    catLabel: 'SAFETY AUDITS',
    badgeLabel: 'SAFETY AUDIT',
    aspect: 'aspect-square',
    darkCard: false,
    title: 'IRC:SP:88 STAGE-III ROAD SAFETY AUDIT',
    meta: 'AHMEDABAD–VADODARA · 2025',
    src: '/images/Road Safety Audit.jpg',
    description:
      'On-site crash barrier terminal inspection, stopping sight distance measurement, and blackspot remediation logging.',
  },
  {
    id: 'plate-05',
    category: 'structures',
    catLabel: 'STRUCTURES & LAB',
    badgeLabel: 'STRUCTURES',
    aspect: 'aspect-[4/5]',
    darkCard: true,
    title: 'MODULAR STEEL & VIADUCT FRAME',
    meta: 'GIFT CITY CORRIDOR · 2025',
    src: '/images/daniel-mccullough-HtBlQdxfG9k-unsplash.jpg',
    description:
      'Elevated interchange structural framing, bearing seat inspection, and geometric alignment tolerance checks.',
  },
  {
    id: 'plate-06',
    category: 'surveys',
    catLabel: 'FIELD SURVEYS',
    badgeLabel: 'FIELD SURVEYS',
    aspect: 'aspect-[4/3]',
    darkCard: false,
    title: 'CLASSIFIED TRAFFIC VOLUME & ATCC',
    meta: 'HAZIRA INDUSTRIAL CORRIDOR · 2025',
    src: '/images/Traffic Engineering.jpg',
    description:
      '24-hour classified axle-load and intersection turning-movement count campaign for heavy freight capacity modeling.',
  },
  {
    id: 'plate-07',
    category: 'corridors',
    catLabel: 'HIGHWAY CORRIDORS',
    badgeLabel: 'CORRIDORS',
    aspect: 'aspect-square',
    darkCard: false,
    title: 'GRADE-SEPARATED INTERCHANGE RAMP',
    meta: 'SURAT–NAVSARI · 2024',
    src: '/images/Hero_1.jpg',
    description:
      'Merge/diverge acceleration lane geometry and superelevation runoff verification on arterial flyover approaches.',
  },
  {
    id: 'plate-08',
    category: 'safety',
    catLabel: 'SAFETY AUDITS',
    badgeLabel: 'SAFETY AUDIT',
    aspect: 'aspect-[3/4]',
    darkCard: true,
    title: 'WORK-ZONE TRAFFIC MANAGEMENT',
    meta: 'NH-48 WIDENING · 2025',
    src: '/images/tep-about-photo.jpg',
    description:
      'Field inspection team auditing temporary channelizer tapers, PPE compliance, and night-time reflective signage during active lane closures.',
  },
  {
    id: 'plate-09',
    category: 'corridors',
    catLabel: 'HIGHWAY CORRIDORS',
    badgeLabel: 'CORRIDORS',
    aspect: 'aspect-[16/10]',
    darkCard: false,
    title: 'BRTS & MULTIMODAL TRANSIT CORRIDOR',
    meta: 'SURAT BRTS · 2024',
    src: '/images/Rail Services.jpg',
    description:
      'Dedicated median transit alignment, station catchment pedestrian crossings, and feeder terminal accessibility assessment.',
  },
  {
    id: 'plate-10',
    category: 'structures',
    catLabel: 'STRUCTURES & LAB',
    badgeLabel: 'STRUCTURES',
    aspect: 'aspect-[4/3]',
    darkCard: false,
    title: 'URBAN ARTERIAL PAVEMENT & DRAINAGE',
    meta: 'HAZIRA PORT NODE · 2024',
    src: '/images/Land Development.jpg',
    description:
      'Heavy-duty rigid and interlocking concrete pavement evaluation tailored for multi-axle container gantry traffic.',
  },
  {
    id: 'plate-11',
    category: 'surveys',
    catLabel: 'FIELD SURVEYS',
    badgeLabel: 'FIELD SURVEYS',
    aspect: 'aspect-[4/5]',
    darkCard: false,
    title: 'RTK-GNSS & CORRIDOR TOPOGRAPHY',
    meta: 'DAHEJ PCPIR · 2024',
    src: '/images/Surveying.jpg',
    description:
      'Precision ground control point acquisition and total-station corridor alignment surveying for industrial logistics links.',
  },
  {
    id: 'plate-12',
    category: 'corridors',
    catLabel: 'HIGHWAY CORRIDORS',
    badgeLabel: 'CORRIDORS',
    aspect: 'aspect-[4/3]',
    darkCard: true,
    title: 'COASTAL LOGISTICS LINK ROAD',
    meta: 'SOUTH GUJARAT PORT LINK · 2024',
    src: '/images/Hero_5.jpg',
    description:
      'Bituminous concrete overlay evaluation, skid resistance checks, and freight corridor geometric upgrade inspection.',
  },
];

const FILTERS = [
  { key: 'all', label: 'ALL PLATES' },
  { key: 'corridors', label: 'HIGHWAY CORRIDORS' },
  { key: 'surveys', label: 'FIELD SURVEYS' },
  { key: 'safety', label: 'SAFETY AUDITS' },
  { key: 'structures', label: 'STRUCTURES & LAB' },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const visiblePlates =
    activeFilter === 'all'
      ? GALLERY_PLATES
      : GALLERY_PLATES.filter((plate) => plate.category === activeFilter);

  const activePlate =
    lightboxIndex !== null && visiblePlates[lightboxIndex]
      ? visiblePlates[lightboxIndex]
      : null;

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const showPrev = useCallback(() => {
    if (visiblePlates.length === 0) return;
    setLightboxIndex((prev) =>
      prev === null ? 0 : (prev - 1 + visiblePlates.length) % visiblePlates.length
    );
  }, [visiblePlates.length]);

  const showNext = useCallback(() => {
    if (visiblePlates.length === 0) return;
    setLightboxIndex((prev) =>
      prev === null ? 0 : (prev + 1) % visiblePlates.length
    );
  }, [visiblePlates.length]);

  useEffect(() => {
    if (lightboxIndex === null) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') showPrev();
      else if (e.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  const handleFilterChange = (key) => {
    setActiveFilter(key);
    setLightboxIndex(null);
  };

  return (
    <>
      {/* PAGE HERO HEADER */}
      <section className="relative w-full bg-surface border-b border-outline">
        <div className="max-w-[1440px] mx-auto p-gutter-lg lg:p-gutter-xl flex flex-col gap-gutter-md">
          <div className="flex items-center gap-gutter-sm">
            <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true" />
            <span className="font-label text-label-md uppercase text-on-surface-variant">
              GALLERY — TEP · SVNIT, SURAT
            </span>
          </div>
          <h1 className="font-display text-display-lg-mobile lg:text-[40px] xl:text-[48px] lg:leading-[1.1] font-semibold tracking-tight uppercase text-balance text-on-surface">
            FIELD SURVEYS, LAB TESTING &amp; INFRASTRUCTURE ARCHIVE.
          </h1>
          <p className="font-body text-body-md text-on-surface-variant max-w-3xl text-pretty pt-gutter-xs">
            Visual documentation from highway safety audits, UAV traffic trajectory studies, structural concrete inspections, and laboratory testing across Gujarat. Click any frame to inspect in full view.
          </p>
        </div>
      </section>

      {/* PINTEREST-STYLE MASONRY GALLERY */}
      <section id="gallery-grid" className="bg-surface text-on-surface border-b border-outline">
        <div className="max-w-[1440px] mx-auto p-gutter-lg lg:p-gutter-xl">
          {/* Filter Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-gutter-md pb-gutter-lg mb-gutter-xl border-b border-outline">
            <div className="flex flex-col gap-gutter-xs">
              <div className="flex items-center gap-gutter-sm">
                <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true" />
                <span className="font-label text-label-md uppercase text-on-surface-variant">
                  MASONRY PLATE ARCHIVE
                </span>
              </div>
              <h2 className="font-headline text-headline-lg-mobile lg:text-headline-lg uppercase">
                PROJECT &amp; FIELD PHOTOGRAPHY
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-gutter-xs" role="group" aria-label="Filter gallery by discipline">
              {FILTERS.map((filter) => {
                const isActive = activeFilter === filter.key;
                return (
                  <button
                    key={filter.key}
                    type="button"
                    onClick={() => handleFilterChange(filter.key)}
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

          {/* Multi-Column Pinterest Masonry Layout */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-gutter-lg space-y-gutter-lg">
            {visiblePlates.map((plate, index) => (
              <article
                key={plate.id}
                className={`break-inside-avoid chamfer-card p-[1px] transition-colors ${
                  plate.darkCard
                    ? 'bg-outline-dark hover:bg-brand-green'
                    : 'bg-outline hover:bg-brand-green'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className={`cursor-pointer group w-full text-left flex flex-col chamfer-card-inner overflow-hidden ${
                    plate.darkCard
                      ? 'bg-surface-dark text-on-surface-dark'
                      : 'bg-surface-container text-on-surface'
                  }`}
                >
                  <div
                    className={`relative w-full ${plate.aspect} overflow-hidden border-b ${
                      plate.darkCard
                        ? 'bg-surface-dark-elevated border-outline-dark'
                        : 'bg-surface-dark border-outline'
                    }`}
                  >
                    <img
                      src={plate.src}
                      alt={plate.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <div
                      className={`absolute top-gutter-sm left-gutter-sm px-gutter-sm py-gutter-xs font-label text-label-sm uppercase ${
                        plate.darkCard || index % 2 === 1
                          ? 'bg-brand-green text-on-brand-green'
                          : 'bg-primary text-on-primary'
                      }`}
                    >
                      {plate.badgeLabel}
                    </div>
                    <div className="absolute bottom-gutter-sm right-gutter-sm bg-surface-dark/95 text-on-surface-dark px-gutter-sm py-gutter-xs font-label text-label-sm uppercase inline-flex items-center gap-gutter-xs">
                      <span>EXPAND</span>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-gutter-md flex flex-col gap-gutter-xs">
                    <h3
                      className={`font-headline text-headline-sm uppercase ${
                        plate.darkCard ? 'text-on-surface-dark' : 'text-on-surface'
                      }`}
                    >
                      {plate.title}
                    </h3>
                    <span
                      className={`font-label text-label-sm uppercase ${
                        plate.darkCard ? 'text-on-surface-dark-muted' : 'text-on-surface-variant'
                      }`}
                    >
                      {plate.meta}
                    </span>
                  </div>
                </button>
              </article>
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
          alt="Infrastructure structural engineering backdrop"
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

      {/* BIG-VIEW LIGHTBOX MODAL */}
      {activePlate && (
        <div
          className="fixed inset-0 z-50 bg-surface-dark/95 text-on-surface-dark flex flex-col p-gutter-md lg:p-gutter-xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          <div className="max-w-6xl w-full mx-auto flex flex-col border border-outline-dark bg-surface-dark my-auto">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-gutter-md px-gutter-lg py-gutter-md border-b border-outline-dark bg-surface-dark-elevated">
              <div className="flex items-center gap-gutter-sm">
                <span className="bg-brand-green text-on-brand-green px-gutter-sm py-gutter-xs font-label text-label-sm uppercase">
                  {activePlate.catLabel}
                </span>
                <span className="font-label text-label-sm uppercase text-on-surface-dark-muted tabular-nums">
                  PLATE {String(lightboxIndex + 1).padStart(2, '0')} / {String(visiblePlates.length).padStart(2, '0')}
                </span>
              </div>
              <div className="flex items-center gap-gutter-sm">
                <button
                  type="button"
                  onClick={showPrev}
                  className="cursor-pointer bg-surface-dark border border-outline-dark text-on-surface-dark px-gutter-sm py-gutter-xs font-label text-label-sm uppercase hover:bg-brand-green hover:text-on-brand-green transition-colors"
                >
                  PREV
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="cursor-pointer bg-surface-dark border border-outline-dark text-on-surface-dark px-gutter-sm py-gutter-xs font-label text-label-sm uppercase hover:bg-brand-green hover:text-on-brand-green transition-colors"
                >
                  NEXT
                </button>
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="cursor-pointer inline-flex items-center gap-gutter-xs bg-brand-green text-on-brand-green px-gutter-md py-gutter-xs font-label text-label-sm uppercase ml-gutter-sm hover:opacity-90 transition-opacity"
                >
                  <span>CLOSE</span>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Big Image + Caption */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-8 bg-surface-dark-elevated flex items-center justify-center p-gutter-md border-b lg:border-b-0 lg:border-r border-outline-dark">
                <img
                  src={activePlate.src}
                  alt={activePlate.title}
                  className="w-full max-h-[68vh] object-contain"
                />
              </div>
              <div className="lg:col-span-4 p-gutter-xl flex flex-col justify-between gap-gutter-lg">
                <div className="flex flex-col gap-gutter-sm">
                  <span className="font-label text-label-sm uppercase text-brand-green">
                    {activePlate.meta}
                  </span>
                  <h3 id="lightbox-title" className="font-headline text-headline-md uppercase text-on-surface-dark">
                    {activePlate.title}
                  </h3>
                  <p className="font-body text-body-md text-on-surface-dark-muted text-pretty">
                    {activePlate.description}
                  </p>
                </div>
                <div className="border-t border-outline-dark pt-gutter-md flex items-center justify-between">
                  <span className="font-label text-label-sm uppercase text-on-surface-dark-muted">
                    TEP · SVNIT SURAT ARCHIVE
                  </span>
                  <span className="w-2 h-2 bg-brand-green rotate-45" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
