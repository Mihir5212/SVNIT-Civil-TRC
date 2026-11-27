import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [activeStage, setActiveStage] = useState('3');
  const [activeFilter, setActiveFilter] = useState('all');
  const projectsTrackRef = useRef(null);

  // Stage data for the isometric process blueprint
  const stages = {
    '1': {
      counter: '01 / 04',
      title: 'Survey',
      desc: 'GEOTECHNICAL CORING, LASER SCANNING, AND BOUNDARY VERIFICATION ESTABLISH THE EXACT DATUM BEFORE EXCAVATION BEGINS.',
    },
    '2': {
      counter: '02 / 04',
      title: 'Plan',
      desc: 'STRUCTURAL MODELS, MEP CLASH DETECTION, AND LOGISTICS SEQUENCING ALIGN EVERY TRADE ON ONE UNIFIED SCHEDULE.',
    },
    '3': {
      counter: '03 / 04',
      title: 'Raise',
      desc: 'COLUMNS CLIMB AND SLABS ARE CAST FLOOR BY FLOOR WHILE THE CRANE KEEPS PACE, THEN THE GLAZED FACADE IS HUNG BEHIND THEM.',
    },
    '4': {
      counter: '04 / 04',
      title: 'Handover',
      desc: 'SYSTEMS COMMISSIONING, DIGITAL TWIN DOCUMENTATION, AND FINAL TOLERANCE SIGN-OFF DELIVER A BUILDING READY FOR DECADES.',
    },
  };

  const stageData = stages[activeStage];

  // Portfolio projects data
  const portfolioProjects = [
    {
      id: 1,
      title: 'HARBOR DISTRICT',
      category: 'industrial',
      image: '/images/Land Development.jpg',
    },
    {
      id: 2,
      title: 'EASTLINE TRANSIT',
      category: 'infrastructure',
      image: '/images/Transportation.jpg',
    },
    {
      id: 3,
      title: 'APEX MANUFACTURING',
      category: 'commercial',
      image: '/images/Rail Services.jpg',
    },
    {
      id: 4,
      title: 'NORTH CORRIDOR',
      category: 'infrastructure',
      image: '/images/Hero_1.jpg',
    },
    {
      id: 5,
      title: 'NEXUS LOGISTICS',
      category: 'industrial',
      image: '/images/Smart Mobility.jpg',
    },
    {
      id: 6,
      title: 'MERIDIAN TOWER',
      category: 'commercial',
      image: '/images/Surveying.jpg',
    },
  ];

  const featuredProjects = [
    {
      id: 1,
      title: 'CORPORATE HEADQUARTERS',
      category: 'COMMERCIAL',
      image: '/images/Traffic Engineering.jpg',
    },
    {
      id: 2,
      title: 'LOGISTICS PORT TERMINAL',
      category: 'INDUSTRIAL',
      image: '/images/Land Development.jpg',
    },
    {
      id: 3,
      title: 'MANUFACTURING FACILITY',
      category: 'INDUSTRIAL',
      image: '/images/Hero_1.jpg',
    },
  ];

  const handleNextProject = () => {
    if (projectsTrackRef.current) {
      const first = projectsTrackRef.current.firstElementChild;
      if (first) projectsTrackRef.current.appendChild(first);
    }
  };

  const handlePrevProject = () => {
    if (projectsTrackRef.current) {
      const last = projectsTrackRef.current.lastElementChild;
      if (last) projectsTrackRef.current.prepend(last);
    }
  };

  const filteredProjects = activeFilter === 'all'
    ? portfolioProjects
    : portfolioProjects.filter(p => p.category === activeFilter);

  return (
    <div id="top" className="relative w-full">
      {/* ========================================================= */}
      {/* HERO SECTION                                              */}
      {/* ========================================================= */}
      <header className="relative w-full bg-surface border-b border-outline overflow-hidden">
        {/* Top Floating Header Bar - Additional branding for home */}
        <div className="relative z-20 flex items-center justify-between px-gutter-lg py-gutter-md">
          <div className="flex items-center gap-gutter-sm">
            <span className="font-label text-label-sm text-on-surface-variant uppercase tracking-wider">
              TRC SVNIT — TRANSPORTATION ENGINEERING & PLANNING
            </span>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-gutter-sm bg-brand-green text-on-brand-green px-gutter-md py-gutter-xs font-label text-label-md uppercase tracking-wider hover:bg-brand-green-dark transition-colors duration-state-change"
          >
            <span>CONTACT</span>
            <span className="material-symbols-outlined text-body-md" aria-hidden="true">arrow_forward</span>
          </Link>
        </div>

        {/* Hero Visual Grid */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12">
          {/* Left / Architectural Photography & Headline */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-surface border-r border-outline">
            <div className="relative h-64 sm:h-80 lg:h-96 w-full overflow-hidden border-b border-outline">
              <img
                src="/images/Transportation.jpg"
                alt="Transportation infrastructure and civil engineering complex"
                className="w-full h-full object-cover grayscale contrast-125"
              />
              <div className="absolute inset-0 blueprint-grid-dark pointer-events-none" />
            </div>

            <div className="p-gutter-lg lg:p-gutter-xl flex flex-col justify-between gap-gutter-xl">
              <h1 className="font-display text-display-lg-mobile lg:text-display-lg uppercase text-on-surface text-balance" data-design-text-token="display-lg">
                ENGINEERING TOMORROW'S INFRASTRUCTURE TODAY
              </h1>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-gutter-md pt-gutter-lg border-t border-outline">
                <p className="font-body text-body-sm text-on-surface-variant max-w-md text-pretty" data-design-text-token="body-sm">
                  Transportation Research Cell at SVNIT Surat delivers precision-driven civil and transportation engineering consultancy — from traffic planning to road safety audits.
                </p>
                <div className="flex items-center gap-gutter-md font-label text-label-sm text-on-surface-variant uppercase tabular-nums">
                  <span data-design-text-token="label-sm">VOL</span>
                  <span data-design-text-token="label-sm">01-8</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Chamfered Signal Green Block */}
          <div className="lg:col-span-5 relative flex flex-col justify-between bg-surface">
            <div className="relative h-48 lg:h-56 w-full overflow-hidden">
              <img
                src="/images/Traffic Engineering.jpg"
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover object-right grayscale contrast-125"
              />
            </div>

            <div className="relative -mt-20 lg:-mt-28 flex-1 bg-brand-green text-on-brand-green chamfer-hero-orange p-gutter-lg lg:p-gutter-xl flex flex-col justify-between min-h-[280px]">
              <div className="flex items-center justify-between pt-gutter-sm pl-24 font-label text-label-sm uppercase tabular-nums">
                <span data-design-text-token="label-sm">SURAT, IN</span>
                <span data-design-text-token="label-sm">EST. 2010</span>
              </div>

              <div className="my-auto py-gutter-lg">
                <p className="font-body text-body-sm text-on-brand-green max-w-sm text-pretty" data-design-text-token="body-sm">
                  Every project runs on one operating system — shared schedules, shared accountability, shared standards — so transportation, infrastructure, and civil work all ship at the same level of precision.
                </p>
              </div>
            </div>

            {/* Bottom Dark Transition Strip */}
            <div className="h-8 bg-surface-dark w-full chamfer-tl-dark" />
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* MAIN CONTENT                                              */}
      {/* ========================================================= */}
      <main className="flex-1">

        {/* SECTION 2: STATS & EXPERTISE (DARK) */}
        <section className="bg-surface-dark text-on-surface-dark p-gutter-lg lg:p-gutter-xl" data-reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-stretch">
            {/* Left: 2x2 Chamfered KPI Cards */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-gutter-md">
              <article className="chamfer-card bg-brand-green text-on-brand-green p-gutter-lg flex flex-col justify-between min-h-[168px]">
                <header>
                  <h2 className="font-display text-display-md-mobile lg:text-display-md tabular-nums text-on-surface-dark" data-design-text-token="display-md">250+</h2>
                </header>
                <div>
                  <p className="font-body text-body-sm text-on-brand-green" data-design-text-token="body-sm">Projects Delivered</p>
                </div>
              </article>

              <article className="chamfer-card bg-brand-green text-on-brand-green p-gutter-lg flex flex-col justify-between min-h-[168px]">
                <header>
                  <h2 className="font-display text-display-md-mobile lg:text-display-md tabular-nums text-on-surface-dark" data-design-text-token="display-md">15+</h2>
                </header>
                <div>
                  <p className="font-body text-body-sm text-on-brand-green" data-design-text-token="body-sm">Years Experience</p>
                </div>
              </article>

              <article className="chamfer-card bg-brand-green text-on-brand-green p-gutter-lg flex flex-col justify-between min-h-[168px]">
                <header>
                  <h2 className="font-display text-display-md-mobile lg:text-display-md tabular-nums text-on-surface-dark" data-design-text-token="display-md">98%</h2>
                </header>
                <div>
                  <p className="font-body text-body-sm text-on-brand-green" data-design-text-token="body-sm">Client Satisfaction</p>
                </div>
              </article>

              <article className="chamfer-card bg-brand-green text-on-brand-green p-gutter-lg flex flex-col justify-between min-h-[168px]">
                <header>
                  <h2 className="font-display text-display-md-mobile lg:text-display-md tabular-nums text-on-surface-dark" data-design-text-token="display-md">500+</h2>
                </header>
                <div>
                  <p className="font-body text-body-sm text-on-brand-green" data-design-text-token="body-sm">Skilled Professionals</p>
                </div>
              </article>
            </div>

            {/* Right: Concrete Expertise Block */}
            <div className="lg:col-span-6 chamfer-br bg-surface-muted text-on-surface-muted p-gutter-lg lg:p-gutter-xl flex flex-col justify-between min-h-[340px]">
              <h2 className="font-headline text-headline-lg-mobile lg:text-headline-lg uppercase text-balance" data-design-text-token="headline-lg">
                CONSULTANCY EXPERTISE BACKED BY RESEARCH.
              </h2>
              <p className="font-body text-body-sm text-on-surface-muted max-w-md text-pretty" data-design-text-token="body-sm">
                TRC SVNIT partners with government agencies, private developers, and public organizations to deliver transportation and civil engineering projects that meet the highest standards of quality, safety, and performance.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SERVICES / CAPABILITIES (LIGHT) */}
        <section id="services" className="bg-surface text-on-surface border-b border-outline" data-reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column */}
            <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-outline p-gutter-lg lg:p-gutter-xl flex flex-col justify-between gap-gutter-xl">
              <h2 className="font-headline text-headline-lg-mobile lg:text-headline-lg uppercase text-balance" data-design-text-token="headline-lg">
                BUILT TO SUPPORT EVERY STAGE OF INFRASTRUCTURE DEVELOPMENT.
              </h2>
              <p className="font-body text-body-sm text-on-surface-variant max-w-xs text-pretty" data-design-text-token="body-sm">
                End-to-end transportation and civil engineering solutions from planning to long-term asset management.
              </p>
            </div>

            {/* Right 2x2 Service Cards */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:gap-px bg-outline">
              {/* Card 01: Project Management */}
              <div className="bg-surface p-gutter-lg flex justify-center">
                <article data-component-id="card-project-management-blueprint" data-component-type="card" data-component-variant="filled" className="w-full max-w-[400px] flex flex-col gap-gutter-xs">
                  {/* Upper Main Chamfered Blueprint Card */}
                  <div className="relative chamfer-octagon bg-surface-dark text-on-surface-dark flex flex-col">
                    {/* Vertical Margin Hairlines */}
                    <div className="pointer-events-none absolute inset-y-0 left-gutter-lg border-l border-outline-dark"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-gutter-lg border-r border-outline-dark"></div>

                    {/* Header Row */}
                    <header className="relative z-10 flex items-start justify-between px-gutter-lg pt-gutter-lg pb-gutter-md border-b border-outline-dark">
                      <h3 className="font-headline text-headline-md uppercase leading-tight text-on-surface-dark" data-design-text-token="headline-md">
                        PROJECT<br />MANAGEMENT
                      </h3>
                      <span className="font-label text-label-md text-on-surface-dark-muted tabular-nums" data-design-text-token="label-md">
                        001
                      </span>
                    </header>

                    {/* Center Dot-Matrix Wireframe Stage */}
                    <div className="relative mx-gutter-lg h-80 dot-matrix-dark flex items-center justify-center">
                      <svg className="w-44 h-44 text-on-surface-dark" viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square" aria-hidden="true">
                        {/* Vertical axis & end caps */}
                        <line x1="80" y1="28" x2="80" y2="132"></line>
                        <line x1="74" y1="28" x2="86" y2="28"></line>
                        <line x1="74" y1="132" x2="86" y2="132"></line>
                        {/* Vertical ticks */}
                        <line x1="76" y1="39" x2="84" y2="39"></line>
                        <line x1="76" y1="49" x2="84" y2="49"></line>
                        <line x1="76" y1="59" x2="84" y2="59"></line>
                        <line x1="76" y1="69" x2="84" y2="69"></line>
                        <line x1="76" y1="91" x2="84" y2="91"></line>
                        <line x1="76" y1="101" x2="84" y2="101"></line>
                        <line x1="76" y1="111" x2="84" y2="111"></line>
                        <line x1="76" y1="121" x2="84" y2="121"></line>
                        {/* Horizontal axis & end caps */}
                        <line x1="28" y1="80" x2="132" y2="80"></line>
                        <line x1="28" y1="74" x2="28" y2="86"></line>
                        <line x1="132" y1="74" x2="132" y2="86"></line>
                        {/* Horizontal ticks */}
                        <line x1="39" y1="76" x2="39" y2="84"></line>
                        <line x1="49" y1="76" x2="49" y2="84"></line>
                        <line x1="59" y1="76" x2="59" y2="84"></line>
                        <line x1="69" y1="76" x2="69" y2="84"></line>
                        <line x1="91" y1="76" x2="91" y2="84"></line>
                        <line x1="101" y1="76" x2="101" y2="84"></line>
                        <line x1="111" y1="76" x2="111" y2="84"></line>
                        <line x1="121" y1="76" x2="121" y2="84"></line>
                        {/* Quadrant plotted nodes */}
                        <circle cx="42" cy="44" r="6"></circle>
                        <circle cx="106" cy="54" r="6"></circle>
                        <circle cx="54" cy="106" r="6"></circle>
                        <circle cx="128" cy="116" r="6"></circle>
                      </svg>
                    </div>

                    {/* Bottom Hairline Margin */}
                    <div className="h-gutter-lg border-t border-outline-dark"></div>
                  </div>

                  {/* Lower Chamfered Caption Block */}
                  <footer className="chamfer-octagon bg-surface-dark text-on-surface-dark px-gutter-lg py-gutter-lg">
                    <p className="font-body text-body-sm text-on-surface-dark text-pretty" data-design-text-token="body-sm">
                      Planning, coordination, budgeting, scheduling, and delivery oversight.
                    </p>
                  </footer>
                </article>
              </div>

              {/* Card 02: Commercial Construction (Green Featured - Replaced Orange) */}
              <div className="bg-surface p-gutter-lg flex justify-center">
                <article data-component-id="card-commercial-blueprint" data-component-type="card" data-component-variant="filled" className="w-full max-w-[400px] flex flex-col gap-gutter-xs">
                  {/* Upper Main Chamfered Blueprint Card */}
                  <div className="relative chamfer-octagon bg-brand-green text-on-primary flex flex-col">
                    {/* Vertical Margin Hairlines */}
                    <div className="pointer-events-none absolute inset-y-0 left-gutter-lg border-l border-on-primary/25"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-gutter-lg border-r border-on-primary/25"></div>

                    {/* Header Row */}
                    <header className="relative z-10 flex items-start justify-between px-gutter-lg pt-gutter-lg pb-gutter-md border-b border-on-primary/25">
                      <h3 className="font-headline text-headline-md uppercase leading-tight text-on-primary" data-design-text-token="headline-md">
                        COMMERCIAL<br />CONSTRUCTION
                      </h3>
                      <span className="font-label text-label-md text-on-primary/75 tabular-nums" data-design-text-token="label-md">
                        001
                      </span>
                    </header>

                    {/* Center Dot-Matrix Wireframe Stage */}
                    <div className="relative mx-gutter-lg h-80 dot-matrix-light flex items-center justify-center">
                      <svg className="w-44 h-44 text-on-primary" viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        {/* Central circle */}
                        <circle cx="80" cy="80" r="42"></circle>
                        {/* Four corner circles */}
                        <circle cx="48" cy="48" r="20"></circle>
                        <circle cx="112" cy="48" r="20"></circle>
                        <circle cx="48" cy="112" r="20"></circle>
                        <circle cx="112" cy="112" r="20"></circle>
                        {/* Diagonal cross lines (bounded inside central circle) */}
                        <line x1="51" y1="51" x2="109" y2="109"></line>
                        <line x1="109" y1="51" x2="51" y2="109"></line>
                      </svg>
                    </div>

                    {/* Bottom Hairline Margin */}
                    <div className="h-gutter-lg border-t border-on-primary/25"></div>
                  </div>

                  {/* Lower Chamfered Caption Block */}
                  <footer className="chamfer-octagon bg-brand-green text-on-primary px-gutter-lg py-gutter-lg">
                    <p className="font-body text-body-sm text-on-primary text-pretty" data-design-text-token="body-sm">
                      Office buildings, mixed-use developments, retail spaces, and corporate facilities.
                    </p>
                  </footer>
                </article>
              </div>

              {/* Card 03: Industrial Projects */}
              <div className="bg-surface p-gutter-lg flex justify-center">
                <article data-component-id="card-industrial-blueprint" data-component-type="card" data-component-variant="filled" className="w-full max-w-[400px] flex flex-col gap-gutter-xs">
                  {/* Upper Main Chamfered Blueprint Card */}
                  <div className="relative chamfer-octagon bg-surface-dark text-on-surface-dark flex flex-col">
                    {/* Vertical Margin Hairlines */}
                    <div className="pointer-events-none absolute inset-y-0 left-gutter-lg border-l border-outline-dark"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-gutter-lg border-r border-outline-dark"></div>

                    {/* Header Row */}
                    <header className="relative z-10 flex items-start justify-between px-gutter-lg pt-gutter-lg pb-gutter-md border-b border-outline-dark">
                      <h3 className="font-headline text-headline-md uppercase leading-tight text-on-surface-dark" data-design-text-token="headline-md">
                        INDUSTRIAL<br />PROJECTS
                      </h3>
                      <span className="font-label text-label-md text-on-surface-dark-muted tabular-nums" data-design-text-token="label-md">
                        001
                      </span>
                    </header>

                    {/* Center Dot-Matrix Wireframe Stage */}
                    <div className="relative mx-gutter-lg h-80 dot-matrix-dark flex items-center justify-center">
                      <svg className="w-40 h-40 text-on-surface-dark" viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square" aria-hidden="true">
                        {/* Outer stepped brackets (left & right) */}
                        <path d="M52 40V24H24V136H52V120"></path>
                        <path d="M108 40V24H136V136H108V120"></path>
                        {/* Second stepped brackets (left & right) */}
                        <path d="M64 54V40H38V120H64V106"></path>
                        <path d="M96 54V40H122V120H96V106"></path>
                        {/* Third stepped brackets (left & right) */}
                        <path d="M76 66V54H52V106H76V94"></path>
                        <path d="M84 66V54H108V106H84V94"></path>
                        {/* Inner core frame */}
                        <rect x="66" y="66" width="28" height="28"></rect>
                      </svg>
                    </div>

                    {/* Bottom Hairline Margin */}
                    <div className="h-gutter-lg border-t border-outline-dark"></div>
                  </div>

                  {/* Lower Chamfered Caption Block */}
                  <footer className="chamfer-octagon bg-surface-dark text-on-surface-dark px-gutter-lg py-gutter-lg">
                    <p className="font-body text-body-sm text-on-surface-dark text-pretty" data-design-text-token="body-sm">
                      Warehouses, manufacturing facilities, logistics hubs, and operational infrastructure
                    </p>
                  </footer>
                </article>
              </div>

              {/* Card 04: Infrastructure Development */}
              <div className="bg-surface p-gutter-lg flex justify-center">
                <article data-component-id="card-infrastructure-blueprint" data-component-type="card" data-component-variant="filled" className="w-full max-w-[400px] flex flex-col gap-gutter-xs">
                  {/* Upper Main Chamfered Blueprint Card */}
                  <div className="relative chamfer-octagon bg-surface-dark text-on-surface-dark flex flex-col">
                    {/* Vertical Margin Hairlines */}
                    <div className="pointer-events-none absolute inset-y-0 left-gutter-lg border-l border-outline-dark"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-gutter-lg border-r border-outline-dark"></div>

                    {/* Header Row */}
                    <header className="relative z-10 flex items-start justify-between px-gutter-lg pt-gutter-lg pb-gutter-md border-b border-outline-dark">
                      <h3 className="font-headline text-headline-md uppercase leading-tight text-on-surface-dark" data-design-text-token="headline-md">
                        INFRASTRUCTURE<br />DEVELOPMENT
                      </h3>
                      <span className="font-label text-label-md text-on-surface-dark-muted tabular-nums" data-design-text-token="label-md">
                        001
                      </span>
                    </header>

                    {/* Center Dot-Matrix Wireframe Stage */}
                    <div className="relative mx-gutter-lg h-80 dot-matrix-dark flex items-center justify-center">
                      <svg className="w-44 h-44 text-on-surface-dark" viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square" aria-hidden="true">
                        {/* Ground baseline */}
                        <line x1="20" y1="130" x2="140" y2="130"></line>
                        {/* Center twin-column tower */}
                        <rect x="58" y="28" width="44" height="102" fill="#1C1C1B"></rect>
                        <line x1="80" y1="28" x2="80" y2="130"></line>
                        {/* Left mid-height wing */}
                        <rect x="38" y="64" width="32" height="66" fill="#1C1C1B"></rect>
                        <line x1="50" y1="64" x2="50" y2="130"></line>
                        <line x1="56" y1="64" x2="56" y2="130"></line>
                        <line x1="62" y1="64" x2="62" y2="130"></line>
                        {/* Right mid-height wing */}
                        <rect x="90" y="64" width="32" height="66" fill="#1C1C1B"></rect>
                        <line x1="98" y1="64" x2="98" y2="130"></line>
                        <line x1="104" y1="64" x2="104" y2="130"></line>
                        <line x1="110" y1="64" x2="110" y2="130"></line>
                        {/* Left outer low wing */}
                        <rect x="26" y="84" width="20" height="46" fill="#1C1C1B"></rect>
                        {/* Right outer low wing */}
                        <rect x="114" y="84" width="20" height="46" fill="#1C1C1B"></rect>
                      </svg>
                    </div>

                    {/* Bottom Hairline Margin */}
                    <div className="h-gutter-lg border-t border-outline-dark"></div>
                  </div>

                  {/* Lower Chamfered Caption Block */}
                  <footer className="chamfer-octagon bg-surface-dark text-on-surface-dark px-gutter-lg py-gutter-lg">
                    <p className="font-body text-body-sm text-on-surface-dark text-pretty" data-design-text-token="body-sm">
                      Public works, transportation, utilities, and large-scale civil projects
                    </p>
                  </footer>
                </article>
              </div>            </div>
          </div>
        </section>

        {/* SECTION 3B: SPLIT SERVICE SHOWCASE PANELS */}
        <section className="bg-surface text-on-surface border-b border-outline" data-reveal>
          {/* Panel 1: Traffic Engineering (Photo Left / Content Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-outline">
            <div className="lg:col-span-6 relative min-h-[420px] bg-surface-dark overflow-hidden">
              <img
                src="/images/Road Safety Audit.jpg"
                alt="Urban traffic intersection with optimized signal timing"
                className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-60"
              />
              <div className="absolute inset-0 blueprint-grid-dark pointer-events-none" />
              {/* Green Radial Target SVG Overlay */}
              <div className="relative z-10 h-full flex items-center justify-center p-gutter-xl">
                <svg className="w-48 h-48 text-on-surface-dark" viewBox="0 0 160 160" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <circle cx="80" cy="80" r="64" stroke="#0b5d45" stroke-width="3" />
                  <circle cx="80" cy="80" r="24" stroke="#0b5d45" stroke-width="2" />
                  <line x1="80" y1="16" x2="80" y2="144" stroke="#0b5d45" stroke-width="2" />
                  <line x1="16" y1="80" x2="144" y2="80" stroke="#0b5d45" stroke-width="2" />
                  <line x1="34.7" y1="34.7" x2="63" y2="63" stroke="#0b5d45" stroke-width="1.5" />
                  <line x1="125.3" y1="34.7" x2="97" y2="63" stroke="#0b5d45" stroke-width="1.5" />
                  <line x1="34.7" y1="125.3" x2="63" y2="97" stroke="#0b5d45" stroke-width="1.5" />
                  <line x1="125.3" y1="125.3" x2="97" y2="97" stroke="#0b5d45" stroke-width="1.5" />
                </svg>
              </div>
              {/* Chamfered Right Edge Tab */}
              <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-0 w-6 h-44 bg-surface chamfer-split-left" />
            </div>

            <div className="lg:col-span-6 p-gutter-lg lg:p-gutter-xl flex flex-col justify-between gap-gutter-xl">
              <div className="flex flex-col gap-gutter-md">
                <h2 className="font-display text-display-md-mobile lg:text-display-md uppercase text-balance" data-design-text-token="display-md">
                  TRAFFIC ENGINEERING & OPERATIONS
                </h2>
                <p className="font-body text-body-sm text-on-surface-variant max-w-md text-pretty" data-design-text-token="body-sm">
                  Optimizing urban mobility through data-driven signal coordination, corridor management, and intelligent transportation systems.
                </p>
              </div>

              <ul className="divide-y divide-outline border-y border-outline">
                <li className="py-gutter-sm flex items-center gap-gutter-md">
                  <span className="w-2 h-2 bg-brand-green rotate-45 shrink-0" aria-hidden="true" />
                  <span className="font-label text-label-md uppercase" data-design-text-token="label-md">SIGNAL OPTIMIZATION</span>
                </li>
                <li className="py-gutter-sm flex items-center gap-gutter-md">
                  <span className="w-2 h-2 bg-brand-green rotate-45 shrink-0" aria-hidden="true" />
                  <span className="font-label text-label-md uppercase" data-design-text-token="label-md">CORRIDOR MANAGEMENT</span>
                </li>
                <li className="py-gutter-sm flex items-center gap-gutter-md">
                  <span className="w-2 h-2 bg-brand-green rotate-45 shrink-0" aria-hidden="true" />
                  <span className="font-label text-label-md uppercase" data-design-text-token="label-md">ITS INTEGRATION</span>
                </li>
                <li className="py-gutter-sm flex items-center gap-gutter-md">
                  <span className="w-2 h-2 bg-brand-green rotate-45 shrink-0" aria-hidden="true" />
                  <span className="font-label text-label-md uppercase" data-design-text-token="label-md">CAPACITY ANALYSIS</span>
                </li>
                <li className="py-gutter-sm flex items-center gap-gutter-md">
                  <span className="w-2 h-2 bg-brand-green rotate-45 shrink-0" aria-hidden="true" />
                  <span className="font-label text-label-md uppercase" data-design-text-token="label-md">MICROSIMULATION</span>
                </li>
              </ul>

              <div>
                <Link to="/services" className="inline-flex items-center justify-center gap-gutter-sm bg-brand-green text-on-brand-green px-gutter-md py-gutter-sm font-label text-label-md uppercase tracking-wider hover:bg-brand-green-dark transition-colors duration-state-change">
                  <span data-design-text-token="label-md">EXPLORE SERVICES</span>
                  <span className="material-symbols-outlined text-body-md" aria-hidden="true">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Panel 2: Road Safety (Content Left / Photo Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-6 p-gutter-lg lg:p-gutter-xl flex flex-col justify-between gap-gutter-xl order-2 lg:order-1">
              <div className="flex flex-col gap-gutter-md">
                <h2 className="font-display text-display-md-mobile lg:text-display-md uppercase text-balance" data-design-text-token="display-md">
                  ROAD SAFETY & AUDIT SERVICES
                </h2>
                <p className="font-body text-body-sm text-on-surface-variant max-w-md text-pretty" data-design-text-token="body-sm">
                  Independent, evidence-based safety assessments reducing crash risk across highway networks and urban streets.
                </p>
              </div>

              <ul className="divide-y divide-outline border-y border-outline">
                <li className="py-gutter-sm flex items-center gap-gutter-md">
                  <span className="w-2 h-2 bg-brand-green rotate-45 shrink-0" aria-hidden="true" />
                  <span className="font-label text-label-md uppercase" data-design-text-token="label-md">STAGE 1-4 AUDITS</span>
                </li>
                <li className="py-gutter-sm flex items-center gap-gutter-md">
                  <span className="w-2 h-2 bg-brand-green rotate-45 shrink-0" aria-hidden="true" />
                  <span className="font-label text-label-md uppercase" data-design-text-token="label-md">BLACK SPOT ANALYSIS</span>
                </li>
                <li className="py-gutter-sm flex items-center gap-gutter-md">
                  <span className="w-2 h-2 bg-brand-green rotate-45 shrink-0" aria-hidden="true" />
                  <span className="font-label text-label-md uppercase" data-design-text-token="label-md">RSA FOR VRUs</span>
                </li>
                <li className="py-gutter-sm flex items-center gap-gutter-md">
                  <span className="w-2 h-2 bg-brand-green rotate-45 shrink-0" aria-hidden="true" />
                  <span className="font-label text-label-md uppercase" data-design-text-token="label-md">SAFE SYSTEM APPROACH</span>
                </li>
                <li className="py-gutter-sm flex items-center gap-gutter-md">
                  <span className="w-2 h-2 bg-brand-green rotate-45 shrink-0" aria-hidden="true" />
                  <span className="font-label text-label-md uppercase" data-design-text-token="label-md">COMPLIANCE REVIEW</span>
                </li>
              </ul>

              <div>
                <Link to="/services" className="inline-flex items-center justify-center gap-gutter-sm bg-brand-green text-on-brand-green px-gutter-md py-gutter-sm font-label text-label-md uppercase tracking-wider hover:bg-brand-green-dark transition-colors duration-state-change">
                  <span data-design-text-token="label-md">EXPLORE SERVICES</span>
                  <span className="material-symbols-outlined text-body-md" aria-hidden="true">arrow_forward</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative min-h-[420px] bg-surface-dark overflow-hidden order-1 lg:order-2">
              <img
                src="/images/tep-about-photo.jpg"
                alt="Road safety audit inspection on highway"
                className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-55"
              />
              <div className="absolute inset-0 blueprint-grid-dark pointer-events-none" />
              {/* Green Concentric Brackets SVG Overlay */}
              <div className="relative z-10 h-full flex items-center justify-center p-gutter-xl">
                <svg className="w-48 h-48 text-on-surface-dark" viewBox="0 0 160 160" fill="none" stroke="#0b5d45" stroke-width="2" aria-hidden="true">
                  <path d="M52 24H24V136H52" />
                  <path d="M108 24H136V136H108" />
                  <path d="M64 42H40V118H64" />
                  <path d="M96 42H120V118H96" />
                  <path d="M74 58H56V102H74" />
                  <path d="M86 58H104V102H86" />
                  <rect x="68" y="68" width="24" height="24" stroke="#0b5d45" stroke-width="2" />
                </svg>
              </div>
              {/* Chamfered Left Edge Tab */}
              <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-0 w-6 h-44 bg-surface chamfer-split-right" />
            </div>
          </div>
        </section>

        {/* SECTION 3C: INTERACTIVE 4-STAGE ISOMETRIC PROCESS BLUEPRINT */}
        <section id="process-blueprint" className="relative bg-surface-dark text-on-surface-dark p-gutter-lg lg:p-gutter-xl overflow-hidden border-b border-outline-dark" data-reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-end min-h-[460px]">
            {/* Left Info */}
            <div className="lg:col-span-4 flex flex-col gap-gutter-md z-10">
              <span id="process-counter" className="font-label text-label-sm text-on-surface-dark-muted tabular-nums" data-design-text-token="label-sm">
                {stageData.counter}
              </span>
              <h2 id="process-title" className="font-display text-display-lg-mobile lg:text-display-lg text-on-surface-dark" data-design-text-token="display-lg">
                {stageData.title}
              </h2>
              <p id="process-desc" className="font-body text-body-sm uppercase text-on-surface-dark-muted max-w-xs text-pretty" data-design-text-token="body-sm">
                {stageData.desc}
              </p>
            </div>

            {/* Center Isometric Blueprint SVG */}
            <div className="lg:col-span-6 flex items-center justify-center">
              {/* Stage 01: Survey */}
              <svg id="iso-stage-1" className={`iso-diagram ${activeStage !== '1' ? 'hidden' : ''} w-full max-w-xl h-80`} viewBox="0 0 560 320" fill="none" aria-hidden="true">
                <g stroke="#363633" strokeWidth="1">
                  <path d="M80 180L280 80L480 180L280 280Z"></path>
                  <path d="M130 155L330 255"></path>
                  <path d="M180 130L380 230"></path>
                  <path d="M230 105L430 205"></path>
                  <path d="M130 205L330 105"></path>
                  <path d="M180 230L380 130"></path>
                  <path d="M230 255L430 155"></path>
                </g>
                <path d="M160 180L280 120L400 180L280 240Z" stroke="#0b5d45" strokeWidth="1.5" strokeDasharray="4 4"></path>
                <circle cx="280" cy="180" r="6" stroke="#0b5d45" strokeWidth="1.5"></circle>
                <line x1="280" y1="120" x2="280" y2="240" stroke="#F3F3F1" strokeWidth="1"></line>
                <line x1="160" y1="180" x2="400" y2="180" stroke="#F3F3F1" strokeWidth="1"></line>
                <rect x="156" y="176" width="8" height="8" fill="#0b5d45"></rect>
                <rect x="396" y="176" width="8" height="8" fill="#0b5d45"></rect>
              </svg>

              {/* Stage 02: Plan */}
              <svg id="iso-stage-2" className={`iso-diagram ${activeStage !== '2' ? 'hidden' : ''} w-full max-w-xl h-80`} viewBox="0 0 560 320" fill="none" aria-hidden="true">
                <g stroke="#363633" strokeWidth="1">
                  <path d="M80 180L280 80L480 180L280 280Z"></path>
                  <path d="M130 155L330 255"></path>
                  <path d="M180 130L380 230"></path>
                  <path d="M130 205L330 105"></path>
                  <path d="M180 230L380 130"></path>
                </g>
                <path d="M180 185L280 135L380 185L280 235Z" stroke="#F3F3F1" strokeWidth="1.5"></path>
                <path d="M210 170L280 135L350 170L280 205Z" stroke="#0b5d45" strokeWidth="1.5"></path>
                <path d="M240 165V125L280 105L320 125V165" stroke="#F3F3F1" strokeWidth="1.25"></path>
                <line x1="280" y1="105" x2="280" y2="145" stroke="#0b5d45" strokeWidth="1.25"></line>
              </svg>

              {/* Stage 03: Raise (Default Active) */}
              <svg id="iso-stage-3" className={`iso-diagram ${activeStage !== '3' ? 'hidden' : ''} w-full max-w-xl h-80`} viewBox="0 0 560 320" fill="none" aria-hidden="true">
                <g stroke="#363633" strokeWidth="1">
                  <path d="M80 200L280 100L480 200L280 300Z"></path>
                  <path d="M130 175L330 275"></path>
                  <path d="M180 150L380 250"></path>
                  <path d="M130 225L330 125"></path>
                  <path d="M180 250L380 150"></path>
                </g>
                {/* Podium Base */}
                <path d="M180 215L280 165L380 215L280 265Z" fill="#262624" stroke="#F3F3F1" strokeWidth="1.25"></path>
                <path d="M180 215V245L280 295V265" stroke="#F3F3F1" strokeWidth="1.25"></path>
                <path d="M380 215V245L280 295" stroke="#F3F3F1" strokeWidth="1.25"></path>
                {/* Rising Columns & Upper Slab */}
                <path d="M215 190L280 157L345 190L280 223Z" stroke="#F3F3F1" strokeWidth="1.25"></path>
                <line x1="215" y1="190" x2="215" y2="215" stroke="#F3F3F1" strokeWidth="1.25"></line>
                <line x1="280" y1="157" x2="280" y2="182" stroke="#F3F3F1" strokeWidth="1.25"></line>
                <line x1="345" y1="190" x2="345" y2="215" stroke="#F3F3F1" strokeWidth="1.25"></line>
                <line x1="280" y1="223" x2="280" y2="248" stroke="#F3F3F1" strokeWidth="1.25"></line>
                {/* Tower Crane in Signal Green */}
                <line x1="370" y1="210" x2="370" y2="42" stroke="#0b5d45" strokeWidth="2"></line>
                <line x1="378" y1="210" x2="378" y2="42" stroke="#0b5d45" strokeWidth="1.25"></line>
                <line x1="230" y1="78" x2="410" y2="36" stroke="#0b5d45" strokeWidth="2"></line>
                <line x1="230" y1="88" x2="370" y2="54" stroke="#0b5d45" strokeWidth="1.25"></line>
                <line x1="290" y1="64" x2="290" y2="148" stroke="#0b5d45" strokeWidth="1.25"></line>
                <rect x="280" y="148" width="20" height="8" stroke="#0b5d45" strokeWidth="1.25"></rect>
                <rect x="392" y="34" width="16" height="12" fill="#0b5d45"></rect>
              </svg>

              {/* Stage 04: Handover */}
              <svg id="iso-stage-4" className={`iso-diagram ${activeStage !== '4' ? 'hidden' : ''} w-full max-w-xl h-80`} viewBox="0 0 560 320" fill="none" aria-hidden="true">
                <g stroke="#363633" strokeWidth="1">
                  <path d="M80 210L280 110L480 210L280 310Z"></path>
                  <path d="M130 185L330 285"></path>
                  <path d="M180 160L380 260"></path>
                  <path d="M130 235L330 135"></path>
                </g>
                {/* Completed Tower */}
                <path d="M180 215L280 165L380 215L280 265Z" fill="#262624" stroke="#F3F3F1" strokeWidth="1.25"></path>
                <path d="M210 185V85L280 50L350 85V185L280 220Z" fill="#262624" stroke="#F3F3F1" strokeWidth="1.5"></path>
                <line x1="280" y1="50" x2="280" y2="220" stroke="#F3F3F1" strokeWidth="1"></line>
                <path d="M210 110L280 145L350 110" stroke="#F3F3F1" strokeWidth="1"></path>
                <path d="M210 135L280 170L350 135" stroke="#F3F3F1" strokeWidth="1"></path>
                <path d="M210 160L280 195L350 160" stroke="#F3F3F1" strokeWidth="1"></path>
                <path d="M210 92L280 127L350 92" stroke="#0b5d45" strokeWidth="1.5"></path>
                {/* Elevation Scale */}
                <line x1="420" y1="80" x2="420" y2="240" stroke="#A8A8A4" strokeWidth="1"></line>
                <line x1="414" y1="80" x2="426" y2="80" stroke="#0b5d45" strokeWidth="1.5"></line>
                <line x1="414" y1="160" x2="426" y2="160" stroke="#A8A8A4" strokeWidth="1"></line>
                <line x1="414" y1="240" x2="426" y2="240" stroke="#A8A8A4" strokeWidth="1"></line>
              </svg>
            </div>

            {/* Right Stage Selector */}
            <div className="lg:col-span-2 flex flex-col items-end gap-gutter-xs z-10">
              {Object.entries(stages).map(([key, stage]) => (
                <button
                  key={key}
                  type="button"
                  data-stage={key}
                  className={`process-stage-btn px-gutter-sm py-gutter-xs font-label text-label-sm uppercase tabular-nums transition-colors duration-state-change ${
                    activeStage === key
                      ? 'bg-brand-green text-on-brand-green'
                      : 'text-on-surface-dark-muted hover:text-on-surface-dark'
                  }`}
                  onClick={() => setActiveStage(key)}
                >
                  <span data-design-text-token="label-sm">{key.padStart(2, '0')} {stage.title.toUpperCase()}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: PRINCIPLES ACCORDION (LIGHT) */}
        <section id="principles" className="bg-surface text-on-surface border-b border-outline" data-reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column */}
            <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-outline p-gutter-lg lg:p-gutter-xl">
              <h2 className="font-headline text-headline-lg-mobile lg:text-headline-lg uppercase text-balance max-w-sm" data-design-text-token="headline-lg">
                EVERY PROJECT GUIDED BY PROVEN PRINCIPLES.
              </h2>
            </div>

            {/* Right Column: Exclusive Accordion Group */}
            <div className="lg:col-span-7">
              <div className="divide-y divide-outline">
                <details name="principles-group" open className="group p-gutter-lg">
                  <summary className="flex items-center justify-between cursor-pointer list-none font-headline text-headline-md uppercase">
                    <span data-design-text-token="headline-md">SAFETY FIRST</span>
                    <span className="material-symbols-outlined text-body-md text-on-surface-variant accordion-icon" aria-hidden="true">remove</span>
                  </summary>
                  <div className="pt-gutter-md grid grid-cols-1 sm:grid-cols-12 gap-gutter-md items-start">
                    <p className="sm:col-span-7 font-body text-body-sm text-on-surface-variant text-pretty" data-design-text-token="body-sm">
                      Unwavering commitment to workplace safety, road user protection, and regulatory compliance on every project, every day.
                    </p>
                    <div className="sm:col-span-5">
                      <img
                        src="/images/Hero_2.jpg"
                        alt="Construction engineer wearing hard hat and safety vest on site"
                        className="w-full h-36 object-cover grayscale contrast-125"
                      />
                    </div>
                  </div>
                </details>

                <details name="principles-group" className="group p-gutter-lg">
                  <summary className="flex items-center justify-between cursor-pointer list-none font-headline text-headline-md uppercase">
                    <span data-design-text-token="headline-md">QUALITY EXECUTION</span>
                    <span className="material-symbols-outlined text-body-md text-on-surface-variant accordion-icon" aria-hidden="true">add</span>
                  </summary>
                  <div className="pt-gutter-md">
                    <p className="font-body text-body-sm text-on-surface-variant max-w-lg text-pretty" data-design-text-token="body-sm">
                      Rigorous structural verification, material traceability, and tolerance audits at every construction milestone per IRC and MoRTH standards.
                    </p>
                  </div>
                </details>

                <details name="principles-group" className="group p-gutter-lg">
                  <summary className="flex items-center justify-between cursor-pointer list-none font-headline text-headline-md uppercase">
                    <span data-design-text-token="headline-md">RELIABLE DELIVERY</span>
                    <span className="material-symbols-outlined text-body-md text-on-surface-variant accordion-icon" aria-hidden="true">add</span>
                  </summary>
                  <div className="pt-gutter-md">
                    <p className="font-body text-body-sm text-on-surface-variant max-w-lg text-pretty" data-design-text-token="body-sm">
                      Integrated scheduling and transparent milestone reporting ensure handover on time and within budget for public infrastructure.
                    </p>
                  </div>
                </details>

                <details name="principles-group" className="group p-gutter-lg">
                  <summary className="flex items-center justify-between cursor-pointer list-none font-headline text-headline-md uppercase">
                    <span data-design-text-token="headline-md">LONG-TERM PARTNERSHIPS</span>
                    <span className="material-symbols-outlined text-body-md text-on-surface-variant accordion-icon" aria-hidden="true">add</span>
                  </summary>
                  <div className="pt-gutter-md">
                    <p className="font-body text-body-sm text-on-surface-variant max-w-lg text-pretty" data-design-text-token="body-sm">
                      Dedicated lifecycle support, asset management planning, and multi-phase collaboration with government and institutional clients.
                    </p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: FEATURED PROJECTS CAROUSEL (LIGHT) */}
        <section id="projects" className="bg-surface text-on-surface p-gutter-lg lg:p-gutter-xl border-b border-outline" data-reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-gutter-md mb-gutter-xl">
            <h2 className="font-headline text-headline-lg-mobile lg:text-headline-lg uppercase text-balance max-w-md" data-design-text-token="headline-lg">
              PROJECTS BUILT TO PERFORM FOR DECADES.
            </h2>
            <Link to="/projects" className="inline-flex items-center justify-center gap-gutter-sm bg-brand-green text-on-brand-green px-gutter-md py-gutter-sm font-label text-label-md uppercase tracking-wider hover:bg-brand-green-dark transition-colors duration-state-change ease-state-change self-start sm:self-auto">
              <span data-design-text-token="label-md">ALL PROJECTS</span>
              <span className="material-symbols-outlined text-body-md" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>

          {/* 3-Column Project Grid with Diagonal-Notched Title Tabs */}
          <div id="projects-track" ref={projectsTrackRef} className="grid grid-cols-1 md:grid-cols-3 gap-gutter-md items-stretch">
            {featuredProjects.map((project) => (
              <Link
                key={project.id}
                to="/projects"
                className="project-card group relative block h-72 bg-surface-container overflow-hidden border border-outline hover:border-brand-green transition-colors duration-state-change ease-state-change"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-surface-enter"
                />
                <span className="absolute top-gutter-sm left-gutter-sm bg-surface text-on-surface px-gutter-sm py-gutter-xs font-label text-label-sm uppercase tracking-wider border border-outline">
                  {project.category}
                </span>
                <div className="absolute bottom-0 left-0 right-12 bg-surface notch-title-tab px-gutter-md py-gutter-sm">
                  <h3 className="font-headline text-headline-sm uppercase text-on-surface" data-design-text-token="headline-sm">{project.title}</h3>
                </div>
                <span className="absolute bottom-gutter-sm right-gutter-sm inline-flex items-center justify-center w-6 h-6 bg-brand-green text-on-brand-green group-hover:bg-surface group-hover:text-on-surface transition-colors duration-state-change">
                  <span className="material-symbols-outlined text-body-sm" aria-hidden="true">add</span>
                </span>
              </Link>
            ))}
          </div>

          {/* Carousel Arrow Controls */}
          <div className="flex items-center gap-gutter-xs mt-gutter-lg">
            <button
              id="prev-project-btn"
              type="button"
              aria-label="Previous project"
              className="inline-flex items-center justify-center w-8 h-8 bg-surface-dark text-on-surface-dark hover:bg-brand-green hover:text-on-brand-green transition-colors duration-state-change ease-state-change"
              onClick={handlePrevProject}
            >
              <span className="material-symbols-outlined text-body-md" aria-hidden="true">arrow_back</span>
            </button>
            <button
              id="next-project-btn"
              type="button"
              aria-label="Next project"
              className="inline-flex items-center justify-center w-8 h-8 bg-surface-dark text-on-surface-dark hover:bg-brand-green hover:text-on-brand-green transition-colors duration-state-change ease-state-change"
              onClick={handleNextProject}
            >
              <span className="material-symbols-outlined text-body-md" aria-hidden="true">arrow_forward</span>
            </button>
          </div>
        </section>

        {/* SECTION 5B: FILTERABLE 2-COLUMN PORTFOLIO GRID */}
        <section id="portfolio-grid" className="bg-surface text-on-surface p-gutter-lg lg:p-gutter-xl" data-reveal>
          {/* Filter Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-gutter-md mb-gutter-lg">
            <div className="bg-surface-dark text-on-surface-dark px-gutter-md py-gutter-xs font-label text-label-sm uppercase tracking-wider self-start">
              <span data-design-text-token="label-sm">FILTER BY SECTOR :</span>
            </div>
            <div className="flex flex-wrap items-center gap-gutter-xs" role="group" aria-label="Filter projects by sector">
              <button
                type="button"
                data-filter="all"
                className={`portfolio-filter-btn px-gutter-md py-gutter-xs font-label text-label-sm uppercase tracking-wider transition-colors duration-state-change ${
                  activeFilter === 'all' ? 'bg-brand-green text-on-brand-green' : 'bg-surface-dark text-on-surface-dark hover:bg-brand-green hover:text-on-brand-green'
                }`}
                onClick={() => setActiveFilter('all')}
              >
                <span data-design-text-token="label-sm">ALL</span>
              </button>
              <button
                type="button"
                data-filter="infrastructure"
                className={`portfolio-filter-btn px-gutter-md py-gutter-xs font-label text-label-sm uppercase tracking-wider transition-colors duration-state-change ${
                  activeFilter === 'infrastructure' ? 'bg-brand-green text-on-brand-green' : 'bg-surface-dark text-on-surface-dark hover:bg-brand-green hover:text-on-brand-green'
                }`}
                onClick={() => setActiveFilter('infrastructure')}
              >
                <span data-design-text-token="label-sm">INFRASTRUCTURE</span>
              </button>
              <button
                type="button"
                data-filter="industrial"
                className={`portfolio-filter-btn px-gutter-md py-gutter-xs font-label text-label-sm uppercase tracking-wider transition-colors duration-state-change ${
                  activeFilter === 'industrial' ? 'bg-brand-green text-on-brand-green' : 'bg-surface-dark text-on-surface-dark hover:bg-brand-green hover:text-on-brand-green'
                }`}
                onClick={() => setActiveFilter('industrial')}
              >
                <span data-design-text-token="label-sm">INDUSTRIAL</span>
              </button>
              <button
                type="button"
                data-filter="commercial"
                className={`portfolio-filter-btn px-gutter-md py-gutter-xs font-label text-label-sm uppercase tracking-wider transition-colors duration-state-change ${
                  activeFilter === 'commercial' ? 'bg-brand-green text-on-brand-green' : 'bg-surface-dark text-on-surface-dark hover:bg-brand-green hover:text-on-brand-green'
                }`}
                onClick={() => setActiveFilter('commercial')}
              >
                <span data-design-text-token="label-sm">COMMERCIAL</span>
              </button>
            </div>
          </div>

          {/* 2-Column 6-Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter-md">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                data-category={project.category}
                className="portfolio-item group relative h-72 bg-surface-container overflow-hidden border border-outline"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-surface-enter"
                />
                <span className="absolute top-gutter-sm left-gutter-sm bg-surface text-on-surface px-gutter-sm py-gutter-xs font-label text-label-sm uppercase border border-outline" data-design-text-token="label-sm">
                  {project.category.toUpperCase()}
                </span>
                <div className="absolute bottom-0 left-0 right-16 bg-surface notch-title-tab px-gutter-md py-gutter-sm">
                  <h3 className="font-headline text-headline-sm uppercase text-on-surface" data-design-text-token="headline-sm">{project.title}</h3>
                </div>
                <span className="absolute bottom-gutter-sm right-gutter-sm inline-flex items-center justify-center w-6 h-6 bg-brand-green text-on-brand-green">
                  <span className="material-symbols-outlined text-body-sm" aria-hidden="true">add</span>
                </span>
              </article>
            ))}
          </div>

          <div className="flex justify-center mt-gutter-xl">
            <Link to="/projects" className="inline-flex items-center justify-center gap-gutter-sm bg-brand-green text-on-brand-green px-gutter-md py-gutter-sm font-label text-label-md uppercase tracking-wider hover:bg-brand-green-dark transition-colors duration-state-change ease-state-change">
              <span data-design-text-token="label-md">ALL PROJECTS</span>
              <span className="material-symbols-outlined text-body-md" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>
        </section>

        {/* SECTION 6: DARK FULL-WIDTH CTA BANNER */}
        <section className="relative bg-surface-dark text-on-surface-dark overflow-hidden min-h-[420px] grid grid-cols-1 lg:grid-cols-12" data-reveal>
          <img
            src="/images/Hero_3.jpg"
            alt="High-rise commercial facade architectural grid"
            className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale contrast-125 pointer-events-none"
          />
          <div className="absolute inset-0 blueprint-grid-dark pointer-events-none" />

          {/* Left Cell */}
          <div className="relative z-10 lg:col-span-5 lg:border-r border-outline-dark p-gutter-lg lg:p-gutter-xl flex flex-col justify-between">
            <p className="font-body text-body-sm uppercase text-on-surface-dark max-w-xs text-pretty" data-design-text-token="body-sm">
              PARTNER WITH A TEAM COMMITTED TO DELIVERING QUALITY, SAFETY, AND LONG-TERM VALUE — FROM GROUNDBREAKING TO COMPLETION.
            </p>
          </div>

          {/* Right Cell */}
          <div className="relative z-10 lg:col-span-7 flex flex-col justify-end">
            <div className="border-t border-outline-dark p-gutter-lg lg:p-gutter-xl flex flex-col items-start gap-gutter-lg">
              <h2 className="font-display text-display-md-mobile lg:text-display-md uppercase text-on-surface-dark text-balance" data-design-text-token="display-md">
                BUILD WITH A RESEARCH-DRIVEN AND DIGITAL SYSTEM
              </h2>
              <Link to="/contact" className="inline-flex items-center justify-center gap-gutter-sm bg-brand-green text-on-brand-green px-gutter-md py-gutter-sm font-label text-label-md uppercase tracking-wider hover:bg-surface hover:text-on-surface transition-colors duration-state-change ease-state-change">
                <span data-design-text-token="label-md">REQUEST A CONSULTATION</span>
                <span className="material-symbols-outlined text-body-md" aria-hidden="true">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Home;