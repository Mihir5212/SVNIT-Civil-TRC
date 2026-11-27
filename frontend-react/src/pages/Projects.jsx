import { useState } from 'react';
import { Link } from 'react-router-dom';

const PROJECTS_DATA = [
  {
    id: 2,
    category: 'safety',
    badge: 'SAFETY AUDITS',
    title: 'NH-48 CORRIDOR SAFETY AUDIT',
    image: '/images/Road Safety Audit.jpg',
    alt: 'NH-48 Road Safety Audit and blackspot engineering inspection',
    client: 'CLIENT: NHAI · IRC:SP:88',
    stage: 'STAGE: OPERATION & BLACKSPOT',
    summary:
      'Comprehensive crash record analysis, high-risk blackspot site investigations, and ranked engineering countermeasures across 140 km of six-lane highway.',
  },
  {
    id: 1,
    category: 'traffic',
    badge: 'TRAFFIC & TIA',
    title: 'SURAT OUTER RING ROAD TIA',
    image: '/images/Traffic Engineering.jpg',
    alt: 'Surat Ring Road classified traffic volume and junction study',
    client: 'CLIENT: SMC · INDO-HCM',
    stage: 'SCOPE: CORRIDOR & JUNCTION LOS',
    summary:
      'Classified turning-movement counts, origin–destination surveys, and 20-year horizon level-of-service forecasting for 12 major arterial intersections.',
  },
  {
    id: 5,
    category: 'planning',
    badge: 'PLANNING',
    title: 'MULTIMODAL BRTS & TRANSIT PLAN',
    image: '/images/Rail Services.jpg',
    alt: 'BRTS and multimodal transit interchange optimization',
    client: 'CLIENT: URBAN TRANSIT AUTHORITY',
    stage: 'SCOPE: ROUTE & DEMAND MODEL',
    summary:
      'Area-level traffic management, feeder route rationalization, and passenger transfer station capacity modeling across urban transit corridors.',
  },
  {
    id: 10,
    category: 'research',
    badge: 'RESEARCH & ITS',
    title: 'VISION-BASED TRAJECTORY ANALYTICS',
    image: '/images/Smart Mobility.jpg',
    alt: 'Computer vision traffic data analytics and ITS dashboard',
    client: 'FUNDING: MoRTH · SVNIT LAB',
    stage: 'SCOPE: COMPUTER VISION & TTC',
    summary:
      'Automated multi-class vehicle detection, trajectory extraction, and surrogate safety conflict (TTC/PET) dashboards from drone and CCTV feeds.',
  },
  {
    id: 3,
    category: 'traffic',
    badge: 'TRAFFIC & TIA',
    title: 'EXPRESSWAY INTERCHANGE SIGNALING',
    image: '/images/Transportation.jpg',
    alt: 'Signalized junction channelisation and flyover interchange design',
    client: 'CLIENT: STATE PWD · VISSIM',
    stage: 'SCOPE: GEOMETRY & PHASING',
    summary:
      'Microsimulation-validated channelisation layouts, slip-road geometry, and actuated signal timing plans reducing peak-hour intersection delay by 34%.',
  },
  {
    id: 6,
    category: 'safety',
    badge: 'SAFETY AUDITS',
    title: 'STATE HIGHWAY DPR PROOF-CHECKING',
    image: '/images/Land Development.jpg',
    alt: 'Independent third-party DPR proof-checking and IRC validation',
    client: 'CLIENT: GSRDC · IRC CODES',
    stage: 'SCOPE: THIRD-PARTY VALIDATION',
    summary:
      'Impartial academic review of traffic demand forecasts, pavement design assumptions, and geometric alignment drawings prior to statutory tender approval.',
  },
];

const FILTERS = [
  { key: 'all', label: 'ALL' },
  { key: 'safety', label: 'SAFETY AUDITS' },
  { key: 'traffic', label: 'TRAFFIC & TIA' },
  { key: 'planning', label: 'PLANNING' },
  { key: 'research', label: 'RESEARCH & ITS' },
];

const RESEARCH_PROGRAMS = [
  {
    num: '01',
    title: 'HETEROGENEOUS TRAFFIC MICROSIMULATION',
    desc: 'Calibrating mixed-traffic car-following and lateral-gap behavior for Indian urban arterials and expressway weaving sections.',
    tag: 'INDO-HCM',
  },
  {
    num: '02',
    title: 'SURROGATE SAFETY & CONFLICT MODELING',
    desc: 'Proactive crash-risk estimation using post-encroachment time (PET) and time-to-collision (TTC) extracted from video analytics.',
    tag: 'ROAD SAFETY',
  },
  {
    num: '03',
    title: 'URBAN FREIGHT & LOGISTICS CORRIDORS',
    desc: 'Freight trip generation, port-hinterland connectivity, and heavy-vehicle time-of-day management around industrial clusters.',
    tag: 'LOGISTICS',
  },
  {
    num: '04',
    title: 'PUBLIC TRANSIT ACCESSIBILITY & NMT',
    desc: 'First- and last-mile pedestrian audit frameworks, BRTS station catchment modeling, and non-motorized transport integration.',
    tag: 'MOBILITY',
  },
];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedIds, setExpandedIds] = useState({});

  const visibleProjects =
    activeFilter === 'all'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === activeFilter);

  const toggleDetails = (id) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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
              RESEARCH &amp; PROJECTS &mdash; TEP &middot; SVNIT, SURAT
            </span>
          </div>
          <h1 className="font-display text-display-lg-mobile lg:text-[40px] xl:text-[48px] lg:leading-[1.1] font-semibold tracking-tight uppercase text-balance" data-design-text-token="display-lg">
            FIELD STUDIES, SAFETY AUDITS &amp; APPLIED RESEARCH.
          </h1>
          <p className="font-body text-body-md text-on-surface-variant max-w-3xl text-pretty pt-gutter-xs" data-design-text-token="body-md">
            Selected transportation consultancy assignments, road safety audits, urban mobility plans, and computer-vision traffic research delivered across national highways and city corridors.
          </p>
        </div>
      </section>

      <main id="main" className="flex-1">
        {/* ========================================================= */}
        {/* SECTION 1: PORTFOLIO / PROJECTS GRID                      */}
        {/* ========================================================= */}
        <section id="portfolio-grid" className="bg-surface text-on-surface border-b border-outline p-gutter-lg lg:p-gutter-xl">
          <div className="max-w-[1440px] mx-auto">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-gutter-md mb-gutter-xl">
              <div className="inline-flex items-center gap-gutter-sm bg-primary text-on-primary px-gutter-md py-gutter-xs self-start">
                <span className="font-label text-label-sm uppercase tracking-wider" data-design-text-token="label-sm">
                  SORT BY :
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-gutter-xs" role="group" aria-label="Filter projects by category">
                {FILTERS.map((f) => {
                  const isActive = activeFilter === f.key;
                  return (
                    <button
                      key={f.key}
                      type="button"
                      onClick={() => setActiveFilter(f.key)}
                      className={`px-gutter-md py-gutter-xs font-label text-label-sm uppercase tracking-wider transition-colors duration-state-change cursor-pointer ${
                        isActive
                          ? 'bg-brand-green text-on-brand-green'
                          : 'bg-primary text-on-primary hover:bg-brand-green hover:text-on-brand-green'
                      }`}
                    >
                      <span data-design-text-token="label-sm">{f.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2-Column Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter-lg items-start">
              {visibleProjects.map((project) => {
                const isOpen = !!expandedIds[project.id];
                return (
                  <article key={project.id} className="portfolio-item flex flex-col border border-outline bg-surface group hover:border-brand-green transition-colors">
                    <div className="relative h-72 bg-surface-dark overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.alt}
                        className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-300"
                      />
                      <span className="absolute top-gutter-md left-gutter-md bg-surface text-on-surface px-gutter-sm py-gutter-xs font-label text-label-sm uppercase border border-outline" data-design-text-token="label-sm">
                        {project.badge}
                      </span>
                      <div className="absolute -bottom-[2px] left-0 right-0 flex items-end justify-between">
                        <button
                          type="button"
                          onClick={() => toggleDetails(project.id)}
                          aria-expanded={isOpen}
                          className="cursor-pointer text-left notch-title-tab bg-surface text-on-surface hover:text-brand-green transition-colors pl-gutter-md pr-12 pt-gutter-sm pb-[calc(theme(spacing.gutter-sm)+2px)] min-w-[65%]"
                        >
                          <h2 className="font-headline text-headline-md uppercase" data-design-text-token="headline-md">
                            {project.title}
                          </h2>
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleDetails(project.id)}
                          aria-expanded={isOpen}
                          aria-label={`Toggle details for ${project.title}`}
                          className="mb-[calc(theme(spacing.gutter-sm)+2px)] mr-gutter-sm w-7 h-7 bg-brand-green text-on-brand-green flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors cursor-pointer shrink-0"
                        >
                          <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                            {isOpen ? 'remove' : 'add'}
                          </span>
                        </button>
                      </div>
                    </div>

                    {isOpen && (
                      <div className="project-detail p-gutter-lg bg-surface-container border-t border-outline flex flex-col gap-gutter-sm animate-fade-in">
                        <div className="flex flex-wrap items-center justify-between gap-2 font-label text-label-sm uppercase text-on-surface-variant">
                          <span data-design-text-token="label-sm">{project.client}</span>
                          <span data-design-text-token="label-sm">{project.stage}</span>
                        </div>
                        <p className="font-body text-body-sm text-on-surface text-pretty" data-design-text-token="body-sm">
                          {project.summary}
                        </p>
                        <div className="pt-1">
                          <Link
                            to={`/projects/${project.id}`}
                            className="inline-flex items-center gap-1.5 font-label text-label-sm uppercase text-brand-green hover:opacity-80 transition-opacity"
                          >
                            <span>VIEW PROJECT BRIEF</span>
                            <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
                          </Link>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: APPLIED RESEARCH TRACKS (DARK INDEX)           */}
        {/* ========================================================= */}
        <section id="research-tracks" className="bg-surface-dark text-on-surface-dark blueprint-grid-dark border-b border-outline-dark p-gutter-lg lg:p-gutter-xl">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-gutter-md pb-gutter-lg mb-gutter-xl border-b border-outline-dark">
              <div className="flex flex-col gap-gutter-xs">
                <div className="flex items-center gap-gutter-sm">
                  <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true" />
                  <span className="font-label text-label-md uppercase text-on-surface-dark-muted" data-design-text-token="label-md">
                    RESEARCH ARCHIVE
                  </span>
                </div>
                <h2 className="font-headline text-headline-lg-mobile lg:text-headline-lg uppercase text-on-surface-dark" data-design-text-token="headline-lg">
                  ACTIVE RESEARCH PROGRAMS
                </h2>
              </div>
              <span className="font-label text-label-sm uppercase bg-brand-green text-on-brand-green px-gutter-sm py-gutter-xs" data-design-text-token="label-sm">
                SVNIT TRANSPORTATION LAB
              </span>
            </div>

            <div className="divide-y divide-outline-dark border-y border-outline-dark">
              {RESEARCH_PROGRAMS.map((prog) => (
                <div key={prog.num} className="py-gutter-lg grid grid-cols-1 lg:grid-cols-12 gap-gutter-md items-center">
                  <span className="lg:col-span-1 font-label text-label-md text-brand-green tabular-nums" data-design-text-token="label-md">
                    {prog.num}
                  </span>
                  <h3 className="lg:col-span-4 font-headline text-headline-md uppercase text-on-surface-dark" data-design-text-token="headline-md">
                    {prog.title}
                  </h3>
                  <p className="lg:col-span-5 font-body text-body-sm text-on-surface-dark-muted text-pretty" data-design-text-token="body-sm">
                    {prog.desc}
                  </p>
                  <div className="lg:col-span-2 flex lg:justify-end">
                    <span className="font-label text-label-sm uppercase border border-outline-dark px-gutter-sm py-gutter-xs text-on-surface-dark" data-design-text-token="label-sm">
                      {prog.tag}
                    </span>
                  </div>
                </div>
              ))}
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

export default Projects;
