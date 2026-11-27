import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CERTIFICATES = [
  {
    id: '01',
    title: 'IRC Road Safety Audit Empanelment',
    issuer: 'Indian Roads Congress (IRC:SP:88)',
    image: '/fake-certi-1.jpg',
  },
  {
    id: '02',
    title: 'MoRTH & NHAI Technical Standing',
    issuer: 'Ministry of Road Transport & Highways',
    image: '/fake-certi-2.jpg',
  },
  {
    id: '03',
    title: 'Govt. of Gujarat Registration',
    issuer: 'Roads & Buildings Department (R&B)',
    image: '/fake-certi-3.jpg',
  },
];

const CAPABILITIES = [
  {
    index: '01 / 08',
    shortNum: '01',
    icon: 'analytics',
    image: '/images/Traffic Engineering.jpg',
    title: 'TRAFFIC SURVEYS AND STUDIES',
    desc: 'We plan and run field surveys on urban roads, intersections and highways, then turn the data into clear findings. Surveys use manual counts, video recording and automated counters, and the analysis follows IRC guidelines and Indo-HCM.',
    outputs: [
      'Classified traffic volume and turning-movement counts',
      'Spot speed, travel time and delay studies',
      'Origin–destination and parking surveys',
      'Capacity and level-of-service analysis',
    ],
    cta: 'DISCUSS TRAFFIC SURVEYS AND STUDIES',
  },
  {
    index: '02 / 08',
    shortNum: '02',
    icon: 'shield',
    image: '/images/Road Safety Audit.jpg',
    title: 'ROAD SAFETY AUDITS AND CRASH ANALYSIS',
    desc: 'We audit road projects at design, construction and operation stages, and analyse crash records to find where and why crashes happen. Recommendations are ranked so agencies can act on the most effective measures first.',
    outputs: [
      'Road safety audit reports with ranked recommendations',
      'Blackspot identification and site investigation',
      'Crash data analysis and crash prediction models',
      'Before-and-after evaluation of safety measures',
    ],
    cta: 'DISCUSS ROAD SAFETY AUDITS AND CRASH ANALYSIS',
  },
  {
    index: '03 / 08',
    shortNum: '03',
    icon: 'directions_car',
    image: '/images/Land Development.jpg',
    title: 'TRAFFIC IMPACT ASSESSMENT',
    desc: 'For commercial, residential and institutional developments, we estimate the traffic a project will generate, test its effect on nearby roads and junctions, and propose access, parking and mitigation measures for approval authorities.',
    outputs: [
      'Trip generation and distribution estimates',
      'Junction and corridor performance for future years',
      'Site access, circulation and parking review',
      'Mitigation plan suitable for submission',
    ],
    cta: 'DISCUSS TRAFFIC IMPACT ASSESSMENT',
  },
  {
    index: '04 / 08',
    shortNum: '04',
    icon: 'traffic',
    image: '/images/Transportation.jpg',
    title: 'JUNCTION IMPROVEMENT AND SIGNAL DESIGN',
    desc: 'We redesign congested and unsafe intersections, from geometric changes and channelisation to signal phasing and timing. Proposals can be tested in traffic simulation before they are built.',
    outputs: [
      'Existing-condition assessment of the junction',
      'Improvement drawings and channelisation layouts',
      'Signal phasing and timing plans',
      'Simulation of proposed options',
    ],
    cta: 'DISCUSS JUNCTION IMPROVEMENT AND SIGNAL DESIGN',
  },
  {
    index: '05 / 08',
    shortNum: '05',
    icon: 'route',
    image: '/images/Rail Services.jpg',
    title: 'TRANSPORT PLANNING',
    desc: 'We support cities and agencies with corridor and area-level planning, public transport studies and travel demand models, giving decision makers evidence for long-term investments.',
    outputs: [
      'Corridor and area traffic management plans',
      'Public transport route and stop studies',
      'Travel demand modelling and forecasting',
      'Policy notes and technical reports',
    ],
    cta: 'DISCUSS TRANSPORT PLANNING',
  },
  {
    index: '06 / 08',
    shortNum: '06',
    icon: 'fact_check',
    image: '/images/Hero_1.jpg',
    title: 'INDEPENDENT REVIEW AND PROOF-CHECKING',
    desc: 'As an academic institution, we provide impartial third-party review of traffic studies, detailed project reports and designs prepared by others, checking methods, data and conclusions against standards.',
    outputs: [
      'Review of traffic studies and project reports',
      'Proof-checking of designs against IRC standards',
      'Third-party assessment reports',
      'Clarification meetings with project teams',
    ],
    cta: 'DISCUSS INDEPENDENT REVIEW AND PROOF-CHECKING',
  },
  {
    index: '07 / 08',
    shortNum: '07',
    icon: 'videocam',
    image: '/images/Smart Mobility.jpg',
    title: 'TRAFFIC DATA ANALYTICS AND ITS',
    desc: 'We extract detailed vehicle movements from video using computer vision, and build analysis tools and dashboards that help agencies monitor traffic and safety over time.',
    outputs: [
      'Vehicle detection, tracking and trajectory data',
      'Speed, gap and conflict analysis from video',
      'Interactive traffic and safety dashboards',
      'Data processing workflows handed over to partner agencies',
    ],
    cta: 'DISCUSS TRAFFIC DATA ANALYTICS AND ITS',
  },
  {
    index: '08 / 08',
    shortNum: '08',
    icon: 'school',
    image: '/images/tep-about-photo.jpg',
    title: 'TRAINING AND CAPACITY BUILDING',
    desc: 'We run short courses and workshops on traffic engineering, road safety and data analysis for engineers, traffic police and staff of government agencies, tailored to the needs of each group.',
    outputs: [
      'Short courses and hands-on workshops',
      'Training material and case studies',
      'Internship and field training programmes',
    ],
    cta: 'DISCUSS TRAINING AND CAPACITY BUILDING',
  },
];

const About = () => {
  const [activeCapIndex, setActiveCapIndex] = useState(0);
  const [selectedCertIdx, setSelectedCertIdx] = useState(null);
  const activeCap = CAPABILITIES[activeCapIndex];
  const selectedCert = selectedCertIdx !== null ? CERTIFICATES[selectedCertIdx] : null;

  useEffect(() => {
    if (selectedCertIdx === null) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setSelectedCertIdx(null);
      if (e.key === 'ArrowRight') setSelectedCertIdx((i) => (i + 1) % CERTIFICATES.length);
      if (e.key === 'ArrowLeft') setSelectedCertIdx((i) => (i - 1 + CERTIFICATES.length) % CERTIFICATES.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedCertIdx]);

  return (
    <div id="top" className="w-full flex flex-col bg-surface text-on-surface">
      {/* ========================================================= */}
      {/* PAGE HERO SPLIT WITH ARCHITECTURAL HIGHWAY PHOTO          */}
      {/* ========================================================= */}
      <section className="relative w-full bg-surface border-b border-outline">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 p-gutter-lg lg:p-gutter-xl flex flex-col justify-between gap-gutter-xl border-b lg:border-b-0 lg:border-r border-outline">
            <div className="flex flex-col gap-gutter-lg">
              <div className="flex items-center gap-gutter-sm">
                <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true" />
                <span className="font-label text-label-md uppercase text-on-surface-variant" data-design-text-token="label-md">
                  ABOUT US &mdash; TEP &middot; SVNIT, SURAT
                </span>
              </div>
              <h1 className="font-display text-display-lg-mobile lg:text-display-lg uppercase text-balance" data-design-text-token="display-lg">
                TRANSPORTATION RESEARCH &amp; ENGINEERING CONSULTANCY.
              </h1>
              <p className="font-body text-body-md text-on-surface-variant max-w-2xl text-pretty" data-design-text-token="body-md">
                An academic and technical consultancy cell at SVNIT Surat delivering IRC-compliant traffic studies, road safety audits, and independent DPR validation for public agencies and infrastructure developers.
              </p>
            </div>

            {/* Key Standing Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-gutter-md pt-gutter-lg border-t border-outline">
              <div className="flex items-center gap-gutter-sm">
                <span className="material-symbols-outlined text-body-md text-brand-green" aria-hidden="true">verified</span>
                <span className="font-label text-label-sm uppercase text-on-surface" data-design-text-token="label-sm">IRC:SP:88 &amp; IRC:106</span>
              </div>
              <div className="flex items-center gap-gutter-sm">
                <span className="material-symbols-outlined text-body-md text-brand-green" aria-hidden="true">account_balance</span>
                <span className="font-label text-label-sm uppercase text-on-surface" data-design-text-token="label-sm">MoRTH &amp; NHAI ACCEPTED</span>
              </div>
              <div className="flex items-center gap-gutter-sm">
                <span className="material-symbols-outlined text-body-md text-brand-green" aria-hidden="true">school</span>
                <span className="font-label text-label-sm uppercase text-on-surface" data-design-text-token="label-sm">MINISTRY OF EDUCATION</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[380px] bg-surface-dark text-on-surface-dark overflow-hidden flex flex-col justify-between p-gutter-lg">
            <img
              src="/SVNIT Building.jpg"
              alt="Department of Civil Engineering Building, SVNIT Surat"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-85"
            />
            <div className="absolute inset-0 dot-matrix-overlay pointer-events-none" />

            {/* Top Wireframe Tag */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="bg-surface-dark text-on-surface-dark px-gutter-sm py-gutter-xs font-label text-label-sm uppercase border border-outline-dark" data-design-text-token="label-sm">
                INSTITUTE OF NATIONAL IMPORTANCE
              </span>
            </div>

            {/* Center Target Reticle SVG */}
            <div className="relative z-10 flex items-center justify-center py-gutter-md">
              <svg className="w-40 h-40 text-on-surface-dark" viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                <circle cx="80" cy="80" r="62" />
                <circle cx="80" cy="80" r="24" />
                <line x1="80" y1="8" x2="80" y2="152" />
                <line x1="8" y1="80" x2="152" y2="80" />
              </svg>
            </div>

            {/* Bottom Chamfered Green Badge */}
            <div className="relative z-10 chamfer-card bg-brand-green text-on-brand-green p-gutter-md flex items-center justify-between gap-gutter-md">
              <div>
                <div className="font-headline text-headline-sm uppercase" data-design-text-token="headline-sm">SVNIT, SURAT</div>
                <div className="font-label text-label-sm uppercase text-on-brand-green/85" data-design-text-token="label-sm">TRANSPORTATION ENGINEERING DIVISION</div>
              </div>
              <span className="material-symbols-outlined text-headline-md" aria-hidden="true">hub</span>
            </div>
          </div>
        </div>
      </section>

      <main id="main" className="flex-1">
        {/* ========================================================= */}
        {/* SECTION 1: VISION & MISSION (WITH ICON BLOCKS)            */}
        {/* ========================================================= */}
        <section id="vision-mission" className="border-b border-outline">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12">
            {/* Vision */}
            <div className="lg:col-span-6 p-gutter-lg lg:p-gutter-xl border-b lg:border-b-0 lg:border-r border-outline flex flex-col justify-between gap-gutter-lg bg-surface text-on-surface">
              <div className="flex items-center justify-between border-b border-outline pb-gutter-md">
                <div className="flex items-center gap-gutter-md">
                  <div className="w-10 h-10 bg-brand-green text-on-brand-green flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-headline-sm" aria-hidden="true">visibility</span>
                  </div>
                  <span className="font-label text-label-md uppercase text-on-surface-variant" data-design-text-token="label-md">01 &mdash; OUR VISION</span>
                </div>
                <span className="font-label text-label-sm uppercase text-on-surface-variant" data-design-text-token="label-sm">LONG-TERM HORIZON</span>
              </div>
              <h2 className="font-headline text-headline-lg-mobile lg:text-headline-lg uppercase text-balance" data-design-text-token="headline-lg">
                SAFE, EFFICIENT &amp; DATA-DRIVEN MOBILITY INFRASTRUCTURE.
              </h2>
              <p className="font-body text-body-md text-on-surface-variant text-pretty" data-design-text-token="body-md">
                To serve as a premier national centre for transportation engineering research and independent technical consultancy&mdash;bridging academic rigor with real-world highway safety, urban transit, and sustainable corridor planning.
              </p>
            </div>

            {/* Mission */}
            <div className="lg:col-span-6 p-gutter-lg lg:p-gutter-xl flex flex-col justify-between gap-gutter-lg bg-surface-dark text-on-surface-dark blueprint-grid-dark">
              <div className="flex items-center justify-between border-b border-outline-dark pb-gutter-md">
                <div className="flex items-center gap-gutter-md">
                  <div className="w-10 h-10 bg-brand-green text-on-brand-green flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-headline-sm" aria-hidden="true">track_changes</span>
                  </div>
                  <span className="font-label text-label-md uppercase text-on-surface-dark-muted" data-design-text-token="label-md">02 &mdash; OUR MISSION</span>
                </div>
                <span className="font-label text-label-sm uppercase text-on-surface-dark-muted" data-design-text-token="label-sm">OPERATIONAL MANDATE</span>
              </div>
              <h2 className="font-headline text-headline-lg-mobile lg:text-headline-lg uppercase text-on-surface-dark text-balance" data-design-text-token="headline-lg">
                EVIDENCE-BASED AUDITS, SIMULATION &amp; CAPACITY BUILDING.
              </h2>
              <p className="font-body text-body-md text-on-surface-dark-muted text-pretty" data-design-text-token="body-md">
                To equip government agencies, urban authorities, and infrastructure developers with IRC-compliant traffic studies, impartial third-party DPR proof-checking, video analytics, and specialized engineering training.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: CORE SPECIALIZATIONS (VISUAL SPOTLIGHT + GRID) */}
        {/* ========================================================= */}
        <section id="capabilities" className="bg-surface text-on-surface border-b border-outline p-gutter-lg lg:p-gutter-xl">
          <div className="max-w-[1440px] mx-auto">
            {/* Section Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-gutter-md pb-gutter-lg mb-gutter-xl border-b border-outline">
              <div className="flex flex-col gap-gutter-xs">
                <div className="flex items-center gap-gutter-sm">
                  <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true" />
                  <span className="font-label text-label-md uppercase text-on-surface-variant" data-design-text-token="label-md">
                    CORE SPECIALIZATIONS
                  </span>
                </div>
                <h2 className="font-headline text-headline-lg-mobile lg:text-headline-lg uppercase" data-design-text-token="headline-lg">
                  OUR CAPABILITIES &amp; ENGINEERING SCOPE
                </h2>
              </div>
              <p className="font-body text-body-sm text-on-surface-variant max-w-md text-pretty" data-design-text-token="body-sm">
                Click on any capability to view detailed methodology, expected outputs, and consultation options.
              </p>
            </div>

            {/* Active Capability Visual Spotlight Panel */}
            <div className="chamfer-card bg-surface-dark text-on-surface-dark border border-outline-dark grid grid-cols-1 lg:grid-cols-12 mb-gutter-xl overflow-hidden">
              {/* Left Photo + Icon Stage */}
              <div className="lg:col-span-5 relative min-h-[340px] bg-surface-dark-elevated overflow-hidden">
                <img
                  src={activeCap.image}
                  alt={activeCap.title}
                  className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-65 transition-all duration-300"
                />
                <div className="absolute inset-0 dot-matrix-overlay pointer-events-none" />

                <div className="relative z-10 h-full p-gutter-lg flex flex-col justify-start">
                  <div className="flex items-center justify-between">
                    <span className="bg-brand-green text-on-brand-green px-gutter-sm py-gutter-xs font-label text-label-sm uppercase tabular-nums" data-design-text-token="label-sm">
                      {activeCap.index}
                    </span>
                    <div className="w-10 h-10 bg-surface-dark text-on-surface-dark border border-outline-dark flex items-center justify-center">
                      <span className="material-symbols-outlined text-headline-sm" aria-hidden="true">{activeCap.icon}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Detail Content */}
              <div className="lg:col-span-7 p-gutter-lg lg:p-gutter-xl flex flex-col justify-between gap-gutter-lg">
                <div className="flex flex-col gap-gutter-md">
                  <h3 className="font-headline text-headline-lg-mobile lg:text-headline-lg uppercase text-on-surface-dark" data-design-text-token="headline-lg">
                    {activeCap.title}
                  </h3>
                  <p className="font-body text-body-md text-on-surface-dark-muted text-pretty" data-design-text-token="body-md">
                    {activeCap.desc}
                  </p>
                </div>

                <div className="border-t border-outline-dark pt-gutter-md flex flex-col gap-gutter-sm">
                  <span className="font-label text-label-sm uppercase text-on-surface-dark-muted" data-design-text-token="label-sm">
                    TYPICAL OUTPUTS &amp; SCOPE
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-gutter-sm pt-gutter-xs">
                    {activeCap.outputs.map((out, i) => (
                      <li key={i} className="flex items-center gap-gutter-sm">
                        <span className="w-2 h-2 bg-brand-green rotate-45 shrink-0" aria-hidden="true" />
                        <span className="font-body text-body-sm text-on-surface-dark" data-design-text-token="body-sm">{out}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <Link
                    to="/contact"
                    data-component-id="button-primary"
                    data-component-type="button"
                    data-component-variant="primary"
                    className="inline-flex items-center justify-center gap-gutter-sm bg-brand-green text-on-brand-green px-gutter-md py-gutter-sm font-label text-label-md uppercase tracking-wider hover:bg-surface hover:text-on-surface transition-colors duration-state-change ease-state-change"
                  >
                    <span data-design-text-token="label-md">{activeCap.cta}</span>
                    <span className="material-symbols-outlined text-body-md" aria-hidden="true">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* 4x2 Interactive Capability Selector Grid (all 8 visible with continuous chamfered border) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-md items-stretch">
              {CAPABILITIES.map((cap, idx) => {
                const isActive = idx === activeCapIndex;
                return (
                  <button
                    key={cap.shortNum}
                    type="button"
                    onClick={() => setActiveCapIndex(idx)}
                    className={`text-left h-full chamfer-card p-[1px] transition-colors duration-state-change cursor-pointer ${
                      isActive
                        ? 'bg-brand-green'
                        : 'bg-outline hover:bg-surface-dark'
                    }`}
                  >
                    <div
                      className={`w-full h-full chamfer-card-inner p-gutter-lg flex flex-col justify-between gap-gutter-md transition-colors duration-state-change ${
                        isActive
                          ? 'bg-brand-green text-on-brand-green'
                          : 'bg-surface-container text-on-surface hover:bg-surface-dark hover:text-on-surface-dark'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="material-symbols-outlined text-headline-md" aria-hidden="true">{cap.icon}</span>
                        <span className="font-label text-label-sm uppercase tabular-nums" data-design-text-token="label-sm">{cap.shortNum}</span>
                      </div>
                      <span className="font-headline text-headline-sm uppercase" data-design-text-token="headline-sm">{cap.title}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: ACCREDITATIONS & STANDARDS (WITH IMAGERY)      */}
        {/* ========================================================= */}
        <section id="standards" className="bg-surface-dark text-on-surface-dark blueprint-grid-dark border-b border-outline-dark p-gutter-lg lg:p-gutter-xl">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-gutter-md pb-gutter-lg mb-gutter-xl border-b border-outline-dark">
              <div className="flex flex-col gap-gutter-xs">
                <div className="flex items-center gap-gutter-sm">
                  <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true" />
                  <span className="font-label text-label-md uppercase text-on-surface-dark-muted" data-design-text-token="label-md">
                    ACCREDITATIONS &amp; STANDARDS
                  </span>
                </div>
                <h2 className="font-headline text-headline-lg-mobile lg:text-headline-lg uppercase text-on-surface-dark" data-design-text-token="headline-lg">
                  ENGINEERED TO NATIONAL STANDARDS
                </h2>
              </div>
              <span className="font-label text-label-sm uppercase bg-brand-green text-on-brand-green px-gutter-sm py-gutter-xs" data-design-text-token="label-sm">
                STATUTORY COMPLIANCE
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter-lg items-stretch">
              <article className="chamfer-card bg-surface-dark-elevated border border-outline-dark overflow-hidden flex flex-col">
                <div className="relative h-48 bg-surface-dark overflow-hidden border-b border-outline-dark">
                  <img
                    src="/images/Road Safety Audit.jpg"
                    alt="Highway engineers inspecting road safety markings"
                    className="w-full h-full object-cover grayscale contrast-125 opacity-65"
                  />
                  <div className="absolute inset-0 dot-matrix-overlay pointer-events-none" />
                  <div className="absolute top-gutter-md left-gutter-md w-10 h-10 bg-brand-green text-on-brand-green flex items-center justify-center">
                    <span className="material-symbols-outlined text-headline-sm" aria-hidden="true">verified</span>
                  </div>
                </div>
                <div className="p-gutter-xl flex flex-col gap-gutter-sm flex-1">
                  <span className="font-label text-label-sm uppercase text-on-surface-dark-muted" data-design-text-token="label-sm">01 &mdash; TECHNICAL CODES</span>
                  <h3 className="font-headline text-headline-md uppercase text-on-surface-dark" data-design-text-token="headline-md">
                    IRC ACCREDITATIONS &amp; CODES
                  </h3>
                  <p className="font-body text-body-md text-on-surface-dark-muted text-pretty" data-design-text-token="body-md">
                    Our Road Safety Audits and Highway capacity studies strictly adhere to IRC:SP:88 (Road Safety Audit Manual), IRC:106, and relevant IRC special publications, ensuring statutory compliance for government submissions.
                  </p>
                </div>
              </article>

              <article className="chamfer-card bg-surface-dark-elevated border border-outline-dark overflow-hidden flex flex-col">
                <div className="relative h-48 bg-surface-dark overflow-hidden border-b border-outline-dark">
                  <img
                    src="/images/Surveying.jpg"
                    alt="National highway corridor and urban transit infrastructure"
                    className="w-full h-full object-cover grayscale contrast-125 opacity-65"
                  />
                  <div className="absolute inset-0 dot-matrix-overlay pointer-events-none" />
                  <div className="absolute top-gutter-md left-gutter-md w-10 h-10 bg-brand-green text-on-brand-green flex items-center justify-center">
                    <span className="material-symbols-outlined text-headline-sm" aria-hidden="true">account_balance</span>
                  </div>
                </div>
                <div className="p-gutter-xl flex flex-col gap-gutter-sm flex-1">
                  <span className="font-label text-label-sm uppercase text-on-surface-dark-muted" data-design-text-token="label-sm">02 &mdash; NATIONAL MANDATE</span>
                  <h3 className="font-headline text-headline-md uppercase text-on-surface-dark" data-design-text-token="headline-md">
                    MoRTH &amp; INSTITUTE STANDING
                  </h3>
                  <p className="font-body text-body-md text-on-surface-dark-muted text-pretty" data-design-text-token="body-md">
                    As part of SVNIT, an Institute of National Importance under the Ministry of Education, TRC is empowered to issue vetted engineering opinions and DPR third-party validation reports accepted by MoRTH and NHAI.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 4: OUR CERTIFICATES (CLICK TO ENLARGE)            */}
        {/* ========================================================= */}
        <section id="certificates" className="bg-surface text-on-surface border-b border-outline p-gutter-lg lg:p-gutter-xl">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-col items-center text-center pb-gutter-lg mb-gutter-xl border-b border-outline">
              <div className="flex items-center gap-gutter-sm mb-2">
                <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true" />
                <span className="font-label text-label-md uppercase text-on-surface-variant" data-design-text-token="label-md">
                  ACCREDITATIONS &amp; RECOGNITIONS
                </span>
              </div>
              <h2 className="font-display text-headline-lg-mobile lg:text-display-md uppercase tracking-tight text-on-surface" data-design-text-token="display-md">
                OUR CERTIFICATES
              </h2>
              <div className="w-14 h-[3px] bg-brand-green mt-3" aria-hidden="true" />
              <p className="font-body text-body-sm text-on-surface-variant mt-3">
                Click any certificate document below to open the full high-resolution preview.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 max-w-[1020px] mx-auto gap-gutter-lg items-stretch">
              {CERTIFICATES.map((cert, idx) => (
                <div key={cert.id} className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => setSelectedCertIdx(idx)}
                    aria-label={`View full certificate: ${cert.title}`}
                    className="w-full chamfer-card bg-outline hover:bg-brand-green p-[1px] transition-colors duration-state-change group cursor-pointer shadow-sm"
                  >
                    <div className="relative w-full aspect-[3/4] chamfer-card-inner bg-white overflow-hidden">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-contain p-2 group-hover:scale-[1.03] transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 bg-surface-dark/90 text-on-surface-dark px-2 py-1 font-label text-[10px] uppercase tracking-wider tabular-nums group-hover:bg-brand-green group-hover:text-on-brand-green transition-colors">
                        {cert.id}
                      </div>
                      <div className="absolute inset-x-0 bottom-0 bg-brand-green/95 text-on-brand-green py-2 px-3 flex items-center justify-center gap-1.5 font-label text-[11px] uppercase tracking-wider translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                        <span className="material-symbols-outlined text-sm" aria-hidden="true">zoom_in</span>
                        <span>VIEW CERTIFICATE</span>
                      </div>
                    </div>
                  </button>
                  <h3 className="font-headline text-sm sm:text-base font-semibold uppercase text-on-surface text-center mt-3 leading-snug">
                    {cert.title}
                  </h3>
                  <span className="font-label text-[10px] uppercase text-on-surface-variant text-center mt-1">
                    {cert.issuer}
                  </span>
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

      {/* ========================================================= */}
      {/* FULL-SIZE CERTIFICATE LIGHTBOX MODAL                      */}
      {/* ========================================================= */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedCertIdx(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedCert.title}
        >
          <div
            className="relative max-w-4xl w-full bg-surface-dark border border-outline-dark flex flex-col max-h-[94vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-outline-dark bg-surface-dark-elevated">
              <div className="flex items-center gap-3 min-w-0">
                <span className="px-2.5 py-1 bg-brand-green text-on-brand-green font-label text-label-sm uppercase tabular-nums shrink-0">
                  {selectedCert.id} / {String(CERTIFICATES.length).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h3 className="font-headline text-sm sm:text-base uppercase text-on-surface-dark truncate">
                    {selectedCert.title}
                  </h3>
                  <p className="font-label text-[10px] uppercase text-on-surface-dark-muted truncate">
                    {selectedCert.issuer}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCertIdx(null)}
                aria-label="Close certificate preview"
                className="inline-flex items-center gap-1.5 bg-brand-green text-on-brand-green px-3 py-1.5 font-label text-label-sm uppercase tracking-wider hover:bg-brand-green-dark transition-colors shrink-0 cursor-pointer"
              >
                <span>CLOSE</span>
                <span className="material-symbols-outlined text-base" aria-hidden="true">close</span>
              </button>
            </div>

            {/* Big Document Stage */}
            <div className="relative flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-[#141413]">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="max-h-[75vh] w-auto max-w-full object-contain bg-white border-2 border-brand-green shadow-2xl"
              />
            </div>

            {/* Bottom Prev / Next Controls */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-outline-dark bg-surface-dark-elevated">
              <button
                type="button"
                onClick={() => setSelectedCertIdx((i) => (i - 1 + CERTIFICATES.length) % CERTIFICATES.length)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-outline-dark text-on-surface-dark hover:border-brand-green hover:text-brand-green font-label text-label-sm uppercase transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_back</span>
                <span>PREVIOUS</span>
              </button>
              <span className="font-label text-[10px] uppercase text-on-surface-dark-muted hidden sm:inline">
                USE ARROW KEYS OR ESC TO CLOSE
              </span>
              <button
                type="button"
                onClick={() => setSelectedCertIdx((i) => (i + 1) % CERTIFICATES.length)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-outline-dark text-on-surface-dark hover:border-brand-green hover:text-brand-green font-label text-label-sm uppercase transition-colors cursor-pointer"
              >
                <span>NEXT</span>
                <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
