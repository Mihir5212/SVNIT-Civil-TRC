import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ConstructionScrollCAD from '../components/ConstructionScrollCAD';

// Animated Count-Up component for numerical stats
const StatCounter = ({ target, suffix = '', duration = 1600 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime = null;

          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeOut = 1 - (1 - progress) * (1 - progress);
            setCount(Math.floor(easeOut * target));

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
};

const Home = () => {
  const projectsTrackRef = useRef(null);


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

    // Exclusive Accordion icon toggler for principles group
  useEffect(() => {
    const detailsList = document.querySelectorAll('details[name="principles-group"]');
    const handleToggle = () => {
      detailsList.forEach((item) => {
        const icon = item.querySelector('.accordion-icon');
        if (icon) {
          icon.textContent = item.open ? 'remove' : 'add';
        }
      });
    };
    detailsList.forEach((det) => det.addEventListener('toggle', handleToggle));
    return () => {
      detailsList.forEach((det) => det.removeEventListener('toggle', handleToggle));
    };
  }, []);

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

            <div className="relative -mt-20 lg:-mt-28 flex-1 bg-brand-green text-on-brand-green chamfer-hero-green p-gutter-lg lg:p-gutter-xl flex flex-col justify-between min-h-[280px]">
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
        <section className="relative bg-surface-dark text-on-surface-dark p-gutter-lg lg:p-gutter-xl border-b border-outline" data-reveal>
          <div className="w-full max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-stretch">
            {/* Left: 2x2 Chamfered KPI Cards (Brand Orange with Counter Effect) */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-gutter-md">
              <article className="chamfer-octagon bg-brand-green text-white p-6 sm:p-7 flex flex-col justify-between min-h-[160px] sm:min-h-[175px]">
                <header>
                  <h2 className="font-display text-4xl sm:text-5xl lg:text-[46px] font-semibold text-white tracking-tight" data-design-text-token="display-md">
                    <StatCounter target={250} suffix="+" />
                  </h2>
                </header>
                <div>
                  <p className="font-body text-xs sm:text-sm text-white/90" data-design-text-token="body-sm">Projects Delivered</p>
                </div>
              </article>

              <article className="chamfer-octagon bg-brand-green text-white p-6 sm:p-7 flex flex-col justify-between min-h-[160px] sm:min-h-[175px]">
                <header>
                  <h2 className="font-display text-4xl sm:text-5xl lg:text-[46px] font-semibold text-white tracking-tight" data-design-text-token="display-md">
                    <StatCounter target={15} suffix="+" />
                  </h2>
                </header>
                <div>
                  <p className="font-body text-xs sm:text-sm text-white/90" data-design-text-token="body-sm">Years Experience</p>
                </div>
              </article>

              <article className="chamfer-octagon bg-brand-green text-white p-6 sm:p-7 flex flex-col justify-between min-h-[160px] sm:min-h-[175px]">
                <header>
                  <h2 className="font-display text-4xl sm:text-5xl lg:text-[46px] font-semibold text-white tracking-tight" data-design-text-token="display-md">
                    <StatCounter target={98} suffix="%" />
                  </h2>
                </header>
                <div>
                  <p className="font-body text-xs sm:text-sm text-white/90" data-design-text-token="body-sm">Client Satisfaction</p>
                </div>
              </article>

              <article className="chamfer-octagon bg-brand-green text-white p-6 sm:p-7 flex flex-col justify-between min-h-[160px] sm:min-h-[175px]">
                <header>
                  <h2 className="font-display text-4xl sm:text-5xl lg:text-[46px] font-semibold text-white tracking-tight" data-design-text-token="display-md">
                    <StatCounter target={500} suffix="+" />
                  </h2>
                </header>
                <div>
                  <p className="font-body text-xs sm:text-sm text-white/90" data-design-text-token="body-sm">Skilled Professionals</p>
                </div>
              </article>
            </div>

            {/* Right: Concrete Expertise Block */}
            <div className="lg:col-span-6 chamfer-br bg-surface-muted text-on-surface-muted p-gutter-lg lg:p-gutter-xl flex flex-col justify-between min-h-[340px]">
              <h2 className="font-headline text-headline-lg-mobile lg:text-headline-lg uppercase text-balance" data-design-text-token="headline-lg">
                CONSTRUCTION EXPERTISE BACKED BY EXPERIENCE.
              </h2>
              <p className="font-body text-body-sm text-on-surface-muted max-w-md text-pretty" data-design-text-token="body-sm">
                GravixPoint partners with developers, businesses, and public organizations to deliver projects that meet the highest standards of quality, safety, and performance.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SERVICES / CAPABILITIES (LIGHT) */}
        <section id="services" className="w-full bg-surface text-on-surface border-b border-outline" data-reveal>
          <div className="w-full max-w-[1280px] mx-auto border-x border-outline">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* === ROW 1 (Desktop) / Items 1, 3, 4 (Mobile) === */}

              {/* 1. Left Headline Block */}
              <div className="order-1 lg:order-1 lg:col-span-4 border-b border-outline lg:border-r p-6 sm:p-8 lg:p-10 flex flex-col justify-start relative">
                <h2 className="font-display text-display-md-mobile lg:text-[40px] lg:leading-[44px] uppercase text-on-surface font-semibold tracking-tight" data-design-text-token="display-lg">
                  BUILT TO SUPPORT<br />EVERY STAGE OF<br />DEVELOPMENT.
                </h2>
                {/* Precision Crosshair Marker at the intersection of grid hairlines */}
                <div className="hidden lg:flex absolute -bottom-[9px] -right-[9px] w-[18px] h-[18px] items-center justify-center pointer-events-none z-10 text-on-surface">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-on-surface">
                    <path d="M9 2V16M2 9H16" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" />
                    <circle cx="9" cy="9" r="1.5" fill="currentColor" />
                  </svg>
                </div>
              </div>

              {/* 2. Top-Left Card: Commercial Construction (SVNIT Brand Green) */}
              <div className="order-3 lg:order-2 lg:col-span-4 border-b border-outline lg:border-r p-3 sm:p-4 lg:p-5 flex items-center justify-center">
                <article data-component-id="card-commercial-blueprint" data-component-type="card" data-component-variant="filled" className="w-full max-w-[360px] flex flex-col gap-1.5">
                  {/* Upper Main Chamfered Blueprint Card */}
                  <div className="relative chamfer-octagon bg-brand-green text-on-primary flex flex-col">
                    {/* Vertical Margin Hairlines */}
                    <div className="pointer-events-none absolute inset-y-0 left-gutter-md border-l border-on-primary/25"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-gutter-md border-r border-on-primary/25"></div>

                    {/* Header Row */}
                    <header className="relative z-10 flex items-start justify-between px-gutter-md pt-gutter-md pb-gutter-sm border-b border-on-primary/25">
                      <h3 className="font-headline text-headline-sm uppercase leading-tight text-on-primary" data-design-text-token="headline-sm">
                        COMMERCIAL<br />CONSTRUCTION
                      </h3>
                      <span className="font-label text-label-md text-on-primary/75 tabular-nums" data-design-text-token="label-md">
                        001
                      </span>
                    </header>

                    {/* Center Dot-Matrix Wireframe Stage */}
                    <div className="relative mx-gutter-md h-64 sm:h-72 dot-matrix-light flex items-center justify-center">
                      <svg className="w-36 h-36 text-on-primary" viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <circle cx="80" cy="80" r="42"></circle>
                        <circle cx="48" cy="48" r="20"></circle>
                        <circle cx="112" cy="48" r="20"></circle>
                        <circle cx="48" cy="112" r="20"></circle>
                        <circle cx="112" cy="112" r="20"></circle>
                        <line x1="51" y1="51" x2="109" y2="109"></line>
                        <line x1="109" y1="51" x2="51" y2="109"></line>
                      </svg>
                    </div>

                    {/* Bottom Hairline Margin */}
                    <div className="h-gutter-md border-t border-on-primary/25"></div>
                  </div>

                  {/* Lower Chamfered Caption Block */}
                  <footer className="chamfer-octagon bg-brand-green text-on-primary px-gutter-md py-3.5">
                    <p className="font-body text-body-sm text-on-primary text-pretty" data-design-text-token="body-sm">
                      Office buildings, mixed-use developments, retail spaces, and corporate facilities.
                    </p>
                  </footer>
                </article>
              </div>

              {/* 3. Top-Right Card: Industrial Projects (Dark) */}
              <div className="order-4 lg:order-3 lg:col-span-4 border-b border-outline p-3 sm:p-4 lg:p-5 flex items-center justify-center">
                <article data-component-id="card-industrial-blueprint" data-component-type="card" data-component-variant="filled" className="w-full max-w-[360px] flex flex-col gap-1.5">
                  {/* Upper Main Chamfered Blueprint Card */}
                  <div className="relative chamfer-octagon bg-surface-dark text-on-surface-dark flex flex-col">
                    {/* Vertical Margin Hairlines */}
                    <div className="pointer-events-none absolute inset-y-0 left-gutter-md border-l border-outline-dark"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-gutter-md border-r border-outline-dark"></div>

                    {/* Header Row */}
                    <header className="relative z-10 flex items-start justify-between px-gutter-md pt-gutter-md pb-gutter-sm border-b border-outline-dark">
                      <h3 className="font-headline text-headline-sm uppercase leading-tight text-on-surface-dark" data-design-text-token="headline-sm">
                        INDUSTRIAL<br />PROJECTS
                      </h3>
                      <span className="font-label text-label-md text-on-surface-dark-muted tabular-nums" data-design-text-token="label-md">
                        001
                      </span>
                    </header>

                    {/* Center Dot-Matrix Wireframe Stage */}
                    <div className="relative mx-gutter-md h-64 sm:h-72 dot-matrix-dark flex items-center justify-center">
                      <svg className="w-36 h-36 text-on-surface-dark" viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square" aria-hidden="true">
                        <path d="M52 40V24H24V136H52V120"></path>
                        <path d="M108 40V24H136V136H108V120"></path>
                        <path d="M64 54V40H38V120H64V106"></path>
                        <path d="M96 54V40H122V120H96V106"></path>
                        <path d="M76 66V54H52V106H76V94"></path>
                        <path d="M84 66V54H108V106H84V94"></path>
                        <rect x="66" y="66" width="28" height="28"></rect>
                      </svg>
                    </div>

                    {/* Bottom Hairline Margin */}
                    <div className="h-gutter-md border-t border-outline-dark"></div>
                  </div>

                  {/* Lower Chamfered Caption Block */}
                  <footer className="chamfer-octagon bg-surface-dark text-on-surface-dark px-gutter-md py-3.5">
                    <p className="font-body text-body-sm text-on-surface-dark text-pretty" data-design-text-token="body-sm">
                      Warehouses, manufacturing facilities, logistics hubs, and operational infrastructure
                    </p>
                  </footer>
                </article>
              </div>

              {/* === ROW 2 (Desktop) / Items 2, 5, 6 (Mobile) === */}

              {/* 4. Left Caption Block */}
              <div className="order-2 lg:order-4 lg:col-span-4 border-b lg:border-b-0 lg:border-r border-outline p-6 sm:p-8 lg:p-10 flex flex-col justify-start">
                <p className="font-body text-body-sm text-on-surface-variant max-w-xs text-pretty" data-design-text-token="body-sm">
                  End-to-end construction solutions from ground-breaking to long-term support.
                </p>
              </div>

              {/* 5. Bottom-Left Card: Infrastructure Development (Dark) */}
              <div className="order-5 lg:order-5 lg:col-span-4 border-b lg:border-b-0 lg:border-r border-outline p-3 sm:p-4 lg:p-5 flex items-center justify-center">
                <article data-component-id="card-infrastructure-blueprint" data-component-type="card" data-component-variant="filled" className="w-full max-w-[360px] flex flex-col gap-1.5">
                  {/* Upper Main Chamfered Blueprint Card */}
                  <div className="relative chamfer-octagon bg-surface-dark text-on-surface-dark flex flex-col">
                    {/* Vertical Margin Hairlines */}
                    <div className="pointer-events-none absolute inset-y-0 left-gutter-md border-l border-outline-dark"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-gutter-md border-r border-outline-dark"></div>

                    {/* Header Row */}
                    <header className="relative z-10 flex items-start justify-between px-gutter-md pt-gutter-md pb-gutter-sm border-b border-outline-dark">
                      <h3 className="font-headline text-headline-sm uppercase leading-tight text-on-surface-dark" data-design-text-token="headline-sm">
                        INFRASTRUCTURE<br />DEVELOPMENT
                      </h3>
                      <span className="font-label text-label-md text-on-surface-dark-muted tabular-nums" data-design-text-token="label-md">
                        001
                      </span>
                    </header>

                    {/* Center Dot-Matrix Wireframe Stage */}
                    <div className="relative mx-gutter-md h-64 sm:h-72 dot-matrix-dark flex items-center justify-center">
                      <svg className="w-36 h-36 text-on-surface-dark" viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square" aria-hidden="true">
                        <line x1="20" y1="130" x2="140" y2="130"></line>
                        <rect x="58" y="28" width="44" height="102" fill="#1C1C1B"></rect>
                        <line x1="80" y1="28" x2="80" y2="130"></line>
                        <rect x="38" y="64" width="32" height="66" fill="#1C1C1B"></rect>
                        <line x1="50" y1="64" x2="50" y2="130"></line>
                        <line x1="56" y1="64" x2="56" y2="130"></line>
                        <line x1="62" y1="64" x2="62" y2="130"></line>
                        <rect x="90" y="64" width="32" height="66" fill="#1C1C1B"></rect>
                        <line x1="98" y1="64" x2="98" y2="130"></line>
                        <line x1="104" y1="64" x2="104" y2="130"></line>
                        <line x1="110" y1="64" x2="110" y2="130"></line>
                        <rect x="26" y="84" width="20" height="46" fill="#1C1C1B"></rect>
                        <rect x="114" y="84" width="20" height="46" fill="#1C1C1B"></rect>
                      </svg>
                    </div>

                    {/* Bottom Hairline Margin */}
                    <div className="h-gutter-md border-t border-outline-dark"></div>
                  </div>

                  {/* Lower Chamfered Caption Block */}
                  <footer className="chamfer-octagon bg-surface-dark text-on-surface-dark px-gutter-md py-3.5">
                    <p className="font-body text-body-sm text-on-surface-dark text-pretty" data-design-text-token="body-sm">
                      Public works, transportation, utilities, and large-scale civil projects
                    </p>
                  </footer>
                </article>
              </div>

              {/* 6. Bottom-Right Card: Project Management (Dark) */}
              <div className="order-6 lg:order-6 lg:col-span-4 p-3 sm:p-4 lg:p-5 flex items-center justify-center">
                <article data-component-id="card-project-management-blueprint" data-component-type="card" data-component-variant="filled" className="w-full max-w-[360px] flex flex-col gap-1.5">
                  {/* Upper Main Chamfered Blueprint Card */}
                  <div className="relative chamfer-octagon bg-surface-dark text-on-surface-dark flex flex-col">
                    {/* Vertical Margin Hairlines */}
                    <div className="pointer-events-none absolute inset-y-0 left-gutter-md border-l border-outline-dark"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-gutter-md border-r border-outline-dark"></div>

                    {/* Header Row */}
                    <header className="relative z-10 flex items-start justify-between px-gutter-md pt-gutter-md pb-gutter-sm border-b border-outline-dark">
                      <h3 className="font-headline text-headline-sm uppercase leading-tight text-on-surface-dark" data-design-text-token="headline-sm">
                        PROJECT<br />MANAGEMENT
                      </h3>
                      <span className="font-label text-label-md text-on-surface-dark-muted tabular-nums" data-design-text-token="label-md">
                        001
                      </span>
                    </header>

                    {/* Center Dot-Matrix Wireframe Stage */}
                    <div className="relative mx-gutter-md h-64 sm:h-72 dot-matrix-dark flex items-center justify-center">
                      <svg className="w-36 h-36 text-on-surface-dark" viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square" aria-hidden="true">
                        <line x1="80" y1="28" x2="80" y2="132"></line>
                        <line x1="74" y1="28" x2="86" y2="28"></line>
                        <line x1="74" y1="132" x2="86" y2="132"></line>
                        <line x1="76" y1="39" x2="84" y2="39"></line>
                        <line x1="76" y1="49" x2="84" y2="49"></line>
                        <line x1="76" y1="59" x2="84" y2="59"></line>
                        <line x1="76" y1="69" x2="84" y2="69"></line>
                        <line x1="76" y1="91" x2="84" y2="91"></line>
                        <line x1="76" y1="101" x2="84" y2="101"></line>
                        <line x1="76" y1="111" x2="84" y2="111"></line>
                        <line x1="76" y1="121" x2="84" y2="121"></line>
                        <line x1="28" y1="80" x2="132" y2="80"></line>
                        <line x1="28" y1="74" x2="28" y2="86"></line>
                        <line x1="132" y1="74" x2="132" y2="86"></line>
                        <line x1="39" y1="76" x2="39" y2="84"></line>
                        <line x1="49" y1="76" x2="49" y2="84"></line>
                        <line x1="59" y1="76" x2="59" y2="84"></line>
                        <line x1="69" y1="76" x2="69" y2="84"></line>
                        <line x1="91" y1="76" x2="91" y2="84"></line>
                        <line x1="101" y1="76" x2="101" y2="84"></line>
                        <line x1="111" y1="76" x2="111" y2="84"></line>
                        <line x1="121" y1="76" x2="121" y2="84"></line>
                        <circle cx="42" cy="44" r="6"></circle>
                        <circle cx="106" cy="54" r="6"></circle>
                        <circle cx="54" cy="106" r="6"></circle>
                        <circle cx="128" cy="116" r="6"></circle>
                      </svg>
                    </div>

                    {/* Bottom Hairline Margin */}
                    <div className="h-gutter-md border-t border-outline-dark"></div>
                  </div>

                  {/* Lower Chamfered Caption Block */}
                  <footer className="chamfer-octagon bg-surface-dark text-on-surface-dark px-gutter-md py-3.5">
                    <p className="font-body text-body-sm text-on-surface-dark text-pretty" data-design-text-token="body-sm">
                      Planning, coordination, budgeting, scheduling, and delivery oversight.
                    </p>
                  </footer>
                </article>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 3B: SERVICES SHOWCASE (4 SPLIT PANELS) */}
        <section className="w-full bg-surface text-on-surface border-b border-outline" data-reveal>
          <div className="w-full max-w-[1280px] mx-auto border-x border-outline">

            {/* PANEL 1: COMMERCIAL CONSTRUCTION (Photo Left / Content Right) */}
            <div id="commercial-construction" className="grid grid-cols-1 lg:grid-cols-12 border-b border-outline">
              <div className="lg:col-span-6 relative min-h-[540px] bg-surface-dark">
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src="/images/Hero_1.jpg"
                    alt="Cylindrical commercial corporate headquarters"
                    className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-65"
                  />
                  <div className="absolute inset-0 dot-matrix-overlay pointer-events-none"></div>

                  {/* White Radial Target SVG Overlay */}
                  <div className="relative z-10 h-full flex items-center justify-center p-gutter-xl">
                    <svg className="w-56 h-56 text-on-surface-dark" viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <circle cx="80" cy="80" r="64"></circle>
                      <circle cx="80" cy="80" r="24"></circle>
                      <line x1="80" y1="16" x2="80" y2="144"></line>
                      <line x1="16" y1="80" x2="144" y2="80"></line>
                      <line x1="34.7" y1="34.7" x2="63" y2="63"></line>
                      <line x1="125.3" y1="34.7" x2="97" y2="63"></line>
                      <line x1="34.7" y1="125.3" x2="63" y2="97"></line>
                      <line x1="125.3" y1="125.3" x2="97" y2="97"></line>
                    </svg>
                  </div>
                </div>

                {/* Chamfered Right Edge Tab (overlaps boundary by 2px to eliminate gap) */}
                <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -right-1 w-9 h-64 bg-surface chamfer-split-left z-20"></div>
              </div>

              <div className="lg:col-span-6 p-gutter-xl flex flex-col justify-between gap-gutter-xl">
                <div className="flex flex-col gap-gutter-md">
                  <h2 className="font-display text-display-md-mobile lg:text-display-lg uppercase text-balance" data-design-text-token="display-lg">
                    COMMERCIAL CONSTRUCTION
                  </h2>
                  <p className="font-body text-body-sm text-on-surface-variant max-w-md text-pretty" data-design-text-token="body-sm">
                    Spaces designed for business growth. We deliver commercial environments that combine functionality, efficiency, and long-term value.
                  </p>
                </div>

                <ul className="divide-y divide-outline border-y border-outline">
                  <li className="py-gutter-md flex items-center gap-gutter-md">
                    <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true"></span>
                    <span className="font-label text-label-md uppercase" data-design-text-token="label-md">QUALITY EXECUTION</span>
                  </li>
                  <li className="py-gutter-md flex items-center gap-gutter-md">
                    <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true"></span>
                    <span className="font-label text-label-md uppercase" data-design-text-token="label-md">OFFICE BUILDINGS</span>
                  </li>
                  <li className="py-gutter-md flex items-center gap-gutter-md">
                    <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true"></span>
                    <span className="font-label text-label-md uppercase" data-design-text-token="label-md">MIXED-USE DEVELOPMENTS</span>
                  </li>
                  <li className="py-gutter-md flex items-center gap-gutter-md">
                    <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true"></span>
                    <span className="font-label text-label-md uppercase" data-design-text-token="label-md">RETAIL CENTERS</span>
                  </li>
                  <li className="py-gutter-md flex items-center gap-gutter-md">
                    <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true"></span>
                    <span className="font-label text-label-md uppercase" data-design-text-token="label-md">HOSPITALITY PROJECTS</span>
                  </li>
                </ul>

                <div>
                  <a href="#industrial-development" data-component-id="button-primary" data-component-type="button" data-component-variant="primary" className="inline-flex items-center justify-center gap-gutter-sm bg-brand-green text-on-brand-green px-gutter-md py-gutter-sm font-label text-label-md uppercase tracking-wider hover:bg-primary hover:text-on-primary transition-colors duration-state-change ease-state-change">
                    <span data-design-text-token="label-md">EXPLORE SERVICES</span>
                    <span className="material-symbols-outlined text-body-md" aria-hidden="true">arrow_forward</span>
                  </a>
                </div>
              </div>
            </div>

            {/* PANEL 2: INDUSTRIAL DEVELOPMENT (Content Left / Photo Right) */}
            <div id="industrial-development" className="grid grid-cols-1 lg:grid-cols-12 border-b border-outline">
              <div className="lg:col-span-6 p-gutter-xl flex flex-col justify-between gap-gutter-xl order-2 lg:order-1">
                <div className="flex flex-col gap-gutter-md">
                  <h2 className="font-display text-display-md-mobile lg:text-display-lg uppercase text-balance" data-design-text-token="display-lg">
                    INDUSTRIAL DEVELOPMENT
                  </h2>
                  <p className="font-body text-body-sm text-on-surface-variant max-w-md text-pretty" data-design-text-token="body-sm">
                    Infrastructure that powers operations. From logistics facilities to manufacturing plants, built for performance and scalability.
                  </p>
                </div>

                <ul className="divide-y divide-outline border-y border-outline">
                  <li className="py-gutter-md flex items-center gap-gutter-md">
                    <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true"></span>
                    <span className="font-label text-label-md uppercase" data-design-text-token="label-md">WAREHOUSES</span>
                  </li>
                  <li className="py-gutter-md flex items-center gap-gutter-md">
                    <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true"></span>
                    <span className="font-label text-label-md uppercase" data-design-text-token="label-md">DISTRIBUTION CENTERS</span>
                  </li>
                  <li className="py-gutter-md flex items-center gap-gutter-md">
                    <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true"></span>
                    <span className="font-label text-label-md uppercase" data-design-text-token="label-md">MANUFACTURING FACILITIES</span>
                  </li>
                  <li className="py-gutter-md flex items-center gap-gutter-md">
                    <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true"></span>
                    <span className="font-label text-label-md uppercase" data-design-text-token="label-md">LOGISTICS HUBS</span>
                  </li>
                  <li className="py-gutter-md flex items-center gap-gutter-md">
                    <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true"></span>
                    <span className="font-label text-label-md uppercase" data-design-text-token="label-md">PROCESSING PLANTS</span>
                  </li>
                </ul>

                <div>
                  <a href="#infrastructure-development" data-component-id="button-primary" data-component-type="button" data-component-variant="primary" className="inline-flex items-center justify-center gap-gutter-sm bg-brand-green text-on-brand-green px-gutter-md py-gutter-sm font-label text-label-md uppercase tracking-wider hover:bg-primary hover:text-on-primary transition-colors duration-state-change ease-state-change">
                    <span data-design-text-token="label-md">EXPLORE SERVICES</span>
                    <span className="material-symbols-outlined text-body-md" aria-hidden="true">arrow_forward</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6 relative min-h-[540px] bg-surface-dark order-1 lg:order-2">
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src="/images/Land Development.jpg"
                    alt="Industrial automated manufacturing facility"
                    className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-60"
                  />
                  <div className="absolute inset-0 dot-matrix-overlay pointer-events-none"></div>

                  {/* White Stepped Brackets SVG Overlay */}
                  <div className="relative z-10 h-full flex items-center justify-center p-gutter-xl">
                    <svg className="w-56 h-56 text-on-surface-dark" viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square" aria-hidden="true">
                      <path d="M52 40V24H24V136H52V120"></path>
                      <path d="M108 40V24H136V136H108V120"></path>
                      <path d="M64 54V40H38V120H64V106"></path>
                      <path d="M96 54V40H122V120H96V106"></path>
                      <path d="M76 66V54H52V106H76V94"></path>
                      <path d="M84 66V54H108V106H84V94"></path>
                      <rect x="66" y="66" width="28" height="28"></rect>
                    </svg>
                  </div>
                </div>

                {/* Chamfered Left Edge Tab (overlaps boundary by 2px to eliminate gap) */}
                <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -left-1 w-9 h-64 bg-surface chamfer-split-right z-20"></div>
              </div>
            </div>

            {/* PANEL 3: INFRASTRUCTURE DEVELOPMENT (Photo Left / Content Right) */}
            <div id="infrastructure-development" className="grid grid-cols-1 lg:grid-cols-12 border-b border-outline">
              <div className="lg:col-span-6 relative min-h-[540px] bg-surface-dark">
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src="/images/Transportation.jpg"
                    alt="Public transit and civil infrastructure project"
                    className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-60"
                  />
                  <div className="absolute inset-0 dot-matrix-overlay pointer-events-none"></div>

                  {/* White Stepped Architectural Tower SVG Overlay */}
                  <div className="relative z-10 h-full flex items-center justify-center p-gutter-xl">
                    <svg className="w-56 h-56 text-on-surface-dark" viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square" aria-hidden="true">
                      <line x1="20" y1="130" x2="140" y2="130"></line>
                      <rect x="58" y="28" width="44" height="102" fill="#1C1C1B" fillOpacity="0.75"></rect>
                      <line x1="80" y1="28" x2="80" y2="130"></line>
                      <rect x="38" y="64" width="32" height="66" fill="#1C1C1B" fillOpacity="0.75"></rect>
                      <line x1="50" y1="64" x2="50" y2="130"></line>
                      <line x1="56" y1="64" x2="56" y2="130"></line>
                      <line x1="62" y1="64" x2="62" y2="130"></line>
                      <rect x="90" y="64" width="32" height="66" fill="#1C1C1B" fillOpacity="0.75"></rect>
                      <line x1="98" y1="64" x2="98" y2="130"></line>
                      <line x1="104" y1="64" x2="104" y2="130"></line>
                      <line x1="110" y1="64" x2="110" y2="130"></line>
                      <rect x="26" y="84" width="20" height="46" fill="#1C1C1B" fillOpacity="0.75"></rect>
                      <rect x="114" y="84" width="20" height="46" fill="#1C1C1B" fillOpacity="0.75"></rect>
                    </svg>
                  </div>
                </div>

                {/* Chamfered Right Edge Tab (overlaps boundary by 2px to eliminate gap) */}
                <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -right-1 w-9 h-64 bg-surface chamfer-split-left z-20"></div>
              </div>

              <div className="lg:col-span-6 p-gutter-xl flex flex-col justify-between gap-gutter-xl">
                <div className="flex flex-col gap-gutter-md">
                  <h2 className="font-display text-display-md-mobile lg:text-display-lg uppercase text-balance" data-design-text-token="display-lg">
                    INFRASTRUCTURE DEVELOPMENT
                  </h2>
                  <p className="font-body text-body-sm text-on-surface-variant max-w-md text-pretty" data-design-text-token="body-sm">
                    Public works, transportation, utilities, and large-scale civil projects delivered with structural precision.
                  </p>
                </div>

                <ul className="divide-y divide-outline border-y border-outline">
                  <li className="py-gutter-md flex items-center gap-gutter-md">
                    <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true"></span>
                    <span className="font-label text-label-md uppercase" data-design-text-token="label-md">PUBLIC WORKS</span>
                  </li>
                  <li className="py-gutter-md flex items-center gap-gutter-md">
                    <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true"></span>
                    <span className="font-label text-label-md uppercase" data-design-text-token="label-md">TRANSPORTATION SYSTEMS</span>
                  </li>
                  <li className="py-gutter-md flex items-center gap-gutter-md">
                    <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true"></span>
                    <span className="font-label text-label-md uppercase" data-design-text-token="label-md">UTILITY NETWORKS</span>
                  </li>
                  <li className="py-gutter-md flex items-center gap-gutter-md">
                    <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true"></span>
                    <span className="font-label text-label-md uppercase" data-design-text-token="label-md">CIVIL EARTHWORKS</span>
                  </li>
                  <li className="py-gutter-md flex items-center gap-gutter-md">
                    <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true"></span>
                    <span className="font-label text-label-md uppercase" data-design-text-token="label-md">BRIDGE &amp; TRANSIT HUBS</span>
                  </li>
                </ul>

                <div>
                  <a href="#project-management" data-component-id="button-primary" data-component-type="button" data-component-variant="primary" className="inline-flex items-center justify-center gap-gutter-sm bg-brand-green text-on-brand-green px-gutter-md py-gutter-sm font-label text-label-md uppercase tracking-wider hover:bg-primary hover:text-on-primary transition-colors duration-state-change ease-state-change">
                    <span data-design-text-token="label-md">EXPLORE SERVICES</span>
                    <span className="material-symbols-outlined text-body-md" aria-hidden="true">arrow_forward</span>
                  </a>
                </div>
              </div>
            </div>

            {/* PANEL 4: PROJECT MANAGEMENT (Content Left / Photo Right) */}
            <div id="project-management" className="grid grid-cols-1 lg:grid-cols-12 border-b border-outline">
              <div className="lg:col-span-6 p-gutter-xl flex flex-col justify-between gap-gutter-xl order-2 lg:order-1">
                <div className="flex flex-col gap-gutter-md">
                  <h2 className="font-display text-display-md-mobile lg:text-display-lg uppercase text-balance" data-design-text-token="display-lg">
                    PROJECT MANAGEMENT
                  </h2>
                  <p className="font-body text-body-sm text-on-surface-variant max-w-md text-pretty" data-design-text-token="body-sm">
                    Planning, coordination, budgeting, scheduling, and delivery oversight across every phase.
                  </p>
                </div>

                <ul className="divide-y divide-outline border-y border-outline">
                  <li className="py-gutter-md flex items-center gap-gutter-md">
                    <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true"></span>
                    <span className="font-label text-label-md uppercase" data-design-text-token="label-md">MASTER SCHEDULING</span>
                  </li>
                  <li className="py-gutter-md flex items-center gap-gutter-md">
                    <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true"></span>
                    <span className="font-label text-label-md uppercase" data-design-text-token="label-md">COST &amp; BUDGET CONTROL</span>
                  </li>
                  <li className="py-gutter-md flex items-center gap-gutter-md">
                    <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true"></span>
                    <span className="font-label text-label-md uppercase" data-design-text-token="label-md">TRADE COORDINATION</span>
                  </li>
                  <li className="py-gutter-md flex items-center gap-gutter-md">
                    <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true"></span>
                    <span className="font-label text-label-md uppercase" data-design-text-token="label-md">QA &amp; SAFETY AUDITS</span>
                  </li>
                  <li className="py-gutter-md flex items-center gap-gutter-md">
                    <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true"></span>
                    <span className="font-label text-label-md uppercase" data-design-text-token="label-md">COMMISSIONING &amp; HANDOVER</span>
                  </li>
                </ul>

                <div>
                  <a href="#consultation-cta" data-component-id="button-primary" data-component-type="button" data-component-variant="primary" className="inline-flex items-center justify-center gap-gutter-sm bg-brand-green text-on-brand-green px-gutter-md py-gutter-sm font-label text-label-md uppercase tracking-wider hover:bg-primary hover:text-on-primary transition-colors duration-state-change ease-state-change">
                    <span data-design-text-token="label-md">EXPLORE SERVICES</span>
                    <span className="material-symbols-outlined text-body-md" aria-hidden="true">arrow_forward</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6 relative min-h-[540px] bg-surface-dark order-1 lg:order-2">
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src="/images/Rail Services.jpg"
                    alt="Large-scale port and engineering construction project"
                    className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-60"
                  />
                  <div className="absolute inset-0 dot-matrix-overlay pointer-events-none"></div>

                  {/* White Graduated Crosshair & Quadrant Nodes SVG Overlay */}
                  <div className="relative z-10 h-full flex items-center justify-center p-gutter-xl">
                    <svg className="w-56 h-56 text-on-surface-dark" viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square" aria-hidden="true">
                      <line x1="80" y1="28" x2="80" y2="132"></line>
                      <line x1="74" y1="28" x2="86" y2="28"></line>
                      <line x1="74" y1="132" x2="86" y2="132"></line>
                      <line x1="76" y1="39" x2="84" y2="39"></line>
                      <line x1="76" y1="49" x2="84" y2="49"></line>
                      <line x1="76" y1="59" x2="84" y2="59"></line>
                      <line x1="76" y1="69" x2="84" y2="69"></line>
                      <line x1="76" y1="91" x2="84" y2="91"></line>
                      <line x1="76" y1="101" x2="84" y2="101"></line>
                      <line x1="76" y1="111" x2="84" y2="111"></line>
                      <line x1="76" y1="121" x2="84" y2="121"></line>
                      <line x1="28" y1="80" x2="132" y2="80"></line>
                      <line x1="28" y1="74" x2="28" y2="86"></line>
                      <line x1="132" y1="74" x2="132" y2="86"></line>
                      <line x1="39" y1="76" x2="39" y2="84"></line>
                      <line x1="49" y1="76" x2="49" y2="84"></line>
                      <line x1="59" y1="76" x2="59" y2="84"></line>
                      <line x1="69" y1="76" x2="69" y2="84"></line>
                      <line x1="91" y1="76" x2="91" y2="84"></line>
                      <line x1="101" y1="76" x2="101" y2="84"></line>
                      <line x1="111" y1="76" x2="111" y2="84"></line>
                      <line x1="121" y1="76" x2="121" y2="84"></line>
                      <circle cx="42" cy="44" r="6"></circle>
                      <circle cx="106" cy="54" r="6"></circle>
                      <circle cx="54" cy="106" r="6"></circle>
                      <circle cx="128" cy="116" r="6"></circle>
                    </svg>
                  </div>
                </div>

                {/* Chamfered Left Edge Tab (overlaps boundary by 2px to eliminate gap) */}
                <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -left-1 w-9 h-64 bg-surface chamfer-split-right z-20"></div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 3C: SCROLL-TO-CONSTRUCT ISOMETRIC 3D CAD BLUEPRINT */}
        <section id="process-blueprint" className="relative w-full border-b border-outline-dark">
          <ConstructionScrollCAD />
        </section>

        {/* SECTION 4: PRINCIPLES ACCORDION (LIGHT) */}
        <section id="principles" className="w-full bg-surface text-on-surface border-b border-outline" data-reveal>
          <div className="w-full max-w-[1280px] mx-auto border-x border-outline">
            <div className="grid grid-cols-1 lg:grid-cols-12">

              {/* Left 6 Columns: Headline */}
              <div className="lg:col-span-6 border-b lg:border-b-0 lg:border-r border-outline p-gutter-xl flex flex-col justify-between min-h-[540px]">
                <h2 className="font-display text-display-md-mobile lg:text-display-lg uppercase text-on-surface text-balance max-w-lg" data-design-text-token="display-lg">
                  EVERY PROJECT GUIDED BY PROVEN PRINCIPLES.
                </h2>
              </div>

              {/* Right 6 Columns: Exclusive Accordion Group */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                {/* COMPONENT: accordion-group */}
                <div data-component-id="accordion-group" data-component-type="accordion" data-component-variant="group" className="divide-y divide-outline h-full flex flex-col justify-between">
                  <details name="principles-group" open className="group p-gutter-xl flex-1">
                    <summary className="flex items-center justify-between cursor-pointer list-none font-headline text-headline-md uppercase">
                      <span data-design-text-token="headline-md">SAFETY FIRST</span>
                      <span className="material-symbols-outlined text-headline-md text-on-surface-variant accordion-icon" aria-hidden="true">remove</span>
                    </summary>
                    <div className="pt-gutter-md grid grid-cols-1 sm:grid-cols-12 gap-gutter-lg items-start">
                      <p className="sm:col-span-6 font-body text-body-sm text-on-surface-variant text-pretty" data-design-text-token="body-sm">
                        Unwavering commitment to workplace safety and regulatory compliance on every site, every day.
                      </p>
                      <div className="sm:col-span-6">
                        <img
                          src="/images/tep-about-photo.jpg"
                          alt="Construction engineer wearing hard hat and safety vest on site"
                          className="w-full h-56 object-cover grayscale contrast-125 chamfer-photo-bl"
                        />
                      </div>
                    </div>
                  </details>

                  <details name="principles-group" className="group px-gutter-xl py-gutter-lg">
                    <summary className="flex items-center justify-between cursor-pointer list-none font-headline text-headline-md uppercase">
                      <span data-design-text-token="headline-md">QUALITY EXECUTION</span>
                      <span className="material-symbols-outlined text-headline-md text-on-surface-variant accordion-icon" aria-hidden="true">add</span>
                    </summary>
                    <div className="pt-gutter-md">
                      <p className="font-body text-body-sm text-on-surface-variant max-w-lg text-pretty" data-design-text-token="body-sm">
                        Rigorous structural verification, material traceability, and tolerance audits at every construction milestone.
                      </p>
                    </div>
                  </details>

                  <details name="principles-group" className="group px-gutter-xl py-gutter-lg">
                    <summary className="flex items-center justify-between cursor-pointer list-none font-headline text-headline-md uppercase">
                      <span data-design-text-token="headline-md">RELIABLE DELIVERY</span>
                      <span className="material-symbols-outlined text-headline-md text-on-surface-variant accordion-icon" aria-hidden="true">add</span>
                    </summary>
                    <div className="pt-gutter-md">
                      <p className="font-body text-body-sm text-on-surface-variant max-w-lg text-pretty" data-design-text-token="body-sm">
                        Integrated scheduling and transparent milestone reporting ensure handover on time and within budget.
                      </p>
                    </div>
                  </details>

                  <details name="principles-group" className="group px-gutter-xl py-gutter-lg">
                    <summary className="flex items-center justify-between cursor-pointer list-none font-headline text-headline-md uppercase">
                      <span data-design-text-token="headline-md">LONG-TERM PARTNERSHIPS</span>
                      <span className="material-symbols-outlined text-headline-md text-on-surface-variant accordion-icon" aria-hidden="true">add</span>
                    </summary>
                    <div className="pt-gutter-md">
                      <p className="font-body text-body-sm text-on-surface-variant max-w-lg text-pretty" data-design-text-token="body-sm">
                        Dedicated lifecycle support, facility commissioning, and multi-phase collaboration with institutional clients.
                      </p>
                    </div>
                  </details>
                </div>
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

        {/* DARK CTA BANNER */}
        <section id="consultation-cta" className="relative bg-surface-dark text-on-surface-dark overflow-hidden border-t border-outline-dark" data-reveal>
          <img
            src="/images/Hero_3.jpg"
            alt="Architectural skyscraper facade grid"
            className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 brightness-50 opacity-45 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-dark/85 via-surface-dark/55 to-surface-dark/85 pointer-events-none"></div>

          <div className="relative z-10 w-full max-w-[1280px] mx-auto border-x border-outline-dark">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Top Row */}
              <div className="lg:col-span-4 p-gutter-xl border-b lg:border-r border-outline-dark">
                <p className="font-body text-body-sm uppercase leading-relaxed text-on-surface-dark max-w-xs text-pretty" data-design-text-token="body-sm">
                  PARTNER WITH A TEAM COMMITTED TO DELIVERING QUALITY, SAFETY, AND LONG-TERM VALUE — FROM GROUNDBREAKING TO COMPLETION.
                </p>
              </div>
              <div className="hidden lg:block lg:col-span-8 border-b border-outline-dark"></div>

              {/* Bottom Row */}
              <div className="hidden lg:block lg:col-span-4 lg:border-r border-outline-dark min-h-[280px]"></div>
              <div className="lg:col-span-8 p-gutter-xl pb-20 flex flex-col justify-center items-start gap-gutter-lg min-h-[280px]">
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

export default Home;