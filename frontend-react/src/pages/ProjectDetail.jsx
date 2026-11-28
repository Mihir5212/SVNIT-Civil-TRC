import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const PROJECTS = [
  {
    id: 1,
    code: 'PRJ-01',
    title: 'Surat Outer Ring Road TIA & High-Speed Expressway Review',
    sector: 'traffic',
    sectorLabel: 'TRAFFIC ENGINEERING & TIA',
    location: 'Surat Outer Ring Road, Gujarat',
    client: 'Surat Municipal Corporation (SMC) / SUDA',
    year: '2025',
    statusLabel: 'COMPLETED',
    image: '/images/Traffic Engineering.jpg',
    summary:
      'Classified turning-movement counts, origin–destination surveys, pavement structural evaluation, and 20-year horizon level-of-service forecasting for 12 major arterial intersections along the 66-km corridor.',
    scope: [
      'Conducted geometric alignment verification and stopping sight distance evaluation along 66 km of expressway corridor.',
      'Carried out Falling Weight Deflectometer (FWD) structural capacity assessments on flexible pavement layers.',
      'Simulated interchange merging and diverging operations using microscopic traffic simulation (VISSIM) to eliminate weave conflicts.',
      'Formulated drainage and cross-drainage recommendations meeting IRC:SP:42 and IRC:SP:88 specifications.',
    ],
    methodologies: [
      'IRC:SP:88',
      'IRC:37-2018',
      'INDO-HCM 2017',
      'VISSIM SIMULATION',
      'FWD DEFLECTION ANALYSIS',
    ],
    outcomes:
      'Reduced predicted weaving collision risks by 42% across four major expressway interchanges and optimized overlay thickness, yielding substantial public infrastructure cost savings.',
  },
  {
    id: 2,
    code: 'PRJ-02',
    title: 'National Highway 48 Corridor Safety Audit & Blackspot Rectification',
    sector: 'safety',
    sectorLabel: 'ROAD SAFETY AUDITS',
    location: 'NH-48 (Bharuch – Surat – Navsari Section), Gujarat',
    client: 'National Highways Authority of India (NHAI)',
    year: '2025',
    statusLabel: 'COMPLETED',
    image: '/images/Road Safety Audit.jpg',
    summary:
      'IRC:SP:88 compliant operation-stage safety audit, accident blackspot engineering rectification, and collision reduction strategy across 140 km of six-lane high-volume freight corridor.',
    scope: [
      'Detailed crash frequency and severity indexing across 140 km of six-lane divided carriageway.',
      'Identification of high-risk accident blackspots and root-cause geometric & human-factor diagnostics.',
      'Design of retro-reflective signboards, thermoplastic road marking plans, and median opening channelisations.',
      'Work-zone safety protocol audits during culvert rehabilitation and flyover approach widening.',
    ],
    methodologies: [
      'IRC:SP:88-2019',
      'MoRTH GUIDELINES',
      'CRASH SEVERITY INDEXING',
      'RADAR SPEED PROFILING',
    ],
    outcomes:
      'Physical channelisation, hazard delineation, and chevron warning countermeasures reduced fatal and severe crashes by 58% over a 12-month post-audit evaluation period.',
  },
  {
    id: 3,
    code: 'PRJ-03',
    title: 'Expressway Interchange Signaling & Urban Junction Synchronization',
    sector: 'traffic',
    sectorLabel: 'TRAFFIC & TIA',
    location: 'Ring Road Arterial Corridors, Surat',
    client: 'State PWD & Surat Municipal Corporation',
    year: '2024',
    statusLabel: 'COMPLETED',
    image: '/images/Transportation.jpg',
    summary:
      'Microsimulation-validated channelisation layouts, slip-road geometry, and actuated green-wave signal timing plans reducing peak-hour intersection delay by 34%.',
    scope: [
      'Video-based classified volume count (CVC) surveys capturing over 120,000 passenger car units (PCU) daily.',
      'Empirical saturation flow measurement and queue length dissipation studies under heterogeneous mixed traffic.',
      'Microscopic simulation and coordinated green-wave timing design across high-density urban intersections.',
      'Pedestrian crossing phase allocation and protected non-motorized transport (NMT) island geometry.',
    ],
    methodologies: [
      'INDO-HCM 2017',
      'IRC:93-1985',
      'SYNCHRO',
      'VISSIM SIGNAL OPTIMIZATION',
    ],
    outcomes:
      'Achieved a 34% reduction in peak-hour intersection control delay and upgraded arterial junction Level of Service (LOS) from E to C.',
  },
  {
    id: 4,
    code: 'PRJ-04',
    title: 'Western Dedicated Freight Corridor (DFC) Multimodal Rail Link',
    sector: 'rail',
    sectorLabel: 'RAIL & MULTIMODAL SERVICES',
    location: 'DFC Western Corridor (Gothangam – Sachin Stretch)',
    client: 'Dedicated Freight Corridor Corporation of India (DFCCIL)',
    year: '2025',
    statusLabel: 'COMPLETED',
    image: '/images/Rail Services.jpg',
    summary:
      'Track geometry clearance, road-over-bridge (ROB) structural approaches, and grade-separated intermodal freight connectivity evaluation.',
    scope: [
      'Intermodal freight transfer access planning and heavy truck queue mitigation at container terminals.',
      'Structural approach road gradient reviews and high-clearance vertical curve checks for ROBs.',
      'Level-crossing elimination feasibility and replacement with twin-cell road underbridges (RUB).',
      'Vibration and settlement monitoring adjacent to high-axle railway embankment formations.',
    ],
    methodologies: [
      'INDIAN RAILWAYS ENGINEERING CODE',
      'IRC:SP:54',
      'HEAVY HAUL AXLE STANDARDS',
    ],
    outcomes:
      'Delivered seamless multimodal container evacuation without bottlenecking adjacent state highway traffic and eliminated two hazardous at-grade rail crossings.',
  },
  {
    id: 5,
    code: 'PRJ-05',
    title: 'Multimodal BRTS Transit Corridor Feasibility & Urban Mobility Plan',
    sector: 'planning',
    sectorLabel: 'URBAN TRANSIT PLANNING',
    location: 'Surat Smart City & BRTS Network, Gujarat',
    client: 'Urban Transit Authority / SSCDL',
    year: '2024',
    statusLabel: 'COMPLETED',
    image: '/images/Rail Services.jpg',
    summary:
      'Origin–destination travel demand modeling, feeder route rationalization, and passenger transfer station capacity modeling across core urban transit corridors.',
    scope: [
      'Citywide household travel survey and origin–destination trip matrix synthesis.',
      'Dedicated BRTS median lane operational planning and junction queue-jump signal prioritization.',
      'Feeder route optimization linking suburban residential zones to BRTS and Surat Metro stations.',
      'Universal accessibility audit for pedestrian ramps, tactile paving, and barrier-free station concourses.',
    ],
    methodologies: [
      'CUBE VOYAGER 4-STEP MODELING',
      'INDO-HCM TRANSIT CAPACITY',
      'IRC:106',
    ],
    outcomes:
      'Increased peak corridor public transit ridership by 19% through rationalized feeder networks and seamless BRTS-to-Metro interchange geometry.',
  },
  {
    id: 6,
    code: 'PRJ-06',
    title: 'State Highway DPR Proof-Checking & Infrastructure Validation',
    sector: 'safety',
    sectorLabel: 'SAFETY AUDITS & DPR REVIEW',
    location: 'Gujarat State Highway Network & Industrial Clusters',
    client: 'Gujarat State Road Development Corporation (GSRDC)',
    year: '2024',
    statusLabel: 'COMPLETED',
    image: '/images/Land Development.jpg',
    summary:
      'Impartial third-party academic review of traffic demand forecasts, pavement design assumptions, heavy-vehicle turning templates, and IRC geometric alignment drawings prior to tender approval.',
    scope: [
      'Independent third-party audit of Detailed Project Reports (DPR) traffic projections and ESA calculations.',
      'Multi-axle trailer turning template validation (AutoTURN) across industrial freight interchanges.',
      'Hydrological catchment modeling and cross-drainage box-culvert capacity verification.',
      'Verification of perpetual flexible and rigid pavement crust compositions for heavy industrial corridors.',
    ],
    methodologies: [
      'IRC:37-2018',
      'IRC:SP:42',
      'SWMM HYDROLOGY',
      'AUTOTURN MANEUVER ANALYSIS',
    ],
    outcomes:
      'Ensured statutory IRC design compliance prior to tender release and prevented wet-season pavement premature distress across industrial access corridors.',
  },
  {
    id: 7,
    code: 'PRJ-07',
    title: 'Surat Metro Rail Corridor Geodetic Alignment & LIDAR Survey',
    sector: 'surveying',
    sectorLabel: 'GEOMATICS & SURVEYING',
    location: 'Surat Metro Corridor (Dream City to Sarthana)',
    client: 'Gujarat Metro Rail Corporation (GMRC)',
    year: '2024',
    statusLabel: 'COMPLETED',
    image: '/images/Surveying.jpg',
    summary:
      'High-density 3D mobile LIDAR corridor scanning, geodetic benchmark network establishment, and sub-centimeter right-of-way GIS mapping.',
    scope: [
      'Dual-frequency GNSS static geodetic network baseline observations across 21.6 km metro corridor.',
      'Mobile laser scanning (LIDAR) point cloud extraction capturing above-ground utilities and structures.',
      'Sub-surface utility detection using Ground Penetrating Radar (GPR) at deep station excavation sites.',
      'Generation of high-fidelity Digital Elevation Models (DEM) and BIM corridor integration.',
    ],
    methodologies: [
      'DUAL-FREQUENCY GNSS',
      'MOBILE LIDAR',
      'GPR RADARGRAM ANALYSIS',
    ],
    outcomes:
      'Delivered sub-10mm horizontal control accuracy for viaduct pier foundations and prevented subterranean utility conflicts during excavation.',
  },
  {
    id: 8,
    code: 'PRJ-08',
    title: 'Heavy Axle Weigh-In-Motion & FWD Pavement Structural Testing',
    sector: 'highways',
    sectorLabel: 'HIGHWAYS & PAVEMENTS',
    location: 'Golden Corridor Industrial Arterial, Gujarat',
    client: 'Roads & Buildings Department (R&B), Govt. of Gujarat',
    year: '2024',
    statusLabel: 'COMPLETED',
    image: '/images/Hero_5.jpg',
    summary:
      'Falling Weight Deflectometer (FWD) structural capacity assessment, backcalculation of resilient moduli, and mechanistic–empirical overlay design.',
    scope: [
      'FWD deflection testing at 100-meter intervals assessing subgrade and bituminous structural moduli.',
      'Vehicle Damage Factor (VDF) spectrum derivation from continuous Weigh-In-Motion (WIM) datasets.',
      'Non-destructive testing (NDT) evaluating fatigue cracking and rutting distress mechanisms.',
      'Customized Bituminous Concrete & Stone Mastic Asphalt overlay thickness calibration.',
    ],
    methodologies: [
      'IRC:115-2014',
      'IITPAVE MECHANISTIC DESIGN',
      'WIM AXLE TELEMETRY',
    ],
    outcomes:
      'Extended industrial highway structural service life by 12 years through an optimized 60 mm SMA rehabilitation specification.',
  },
  {
    id: 9,
    code: 'PRJ-09',
    title: 'Pedestrian Vulnerability & Multimodal Junction Geometry Redesign',
    sector: 'safety',
    sectorLabel: 'ROAD SAFETY',
    location: 'Ichchhanath & Athwa Junctions, Surat',
    client: 'Surat Traffic Police & Municipal Corporation',
    year: '2023',
    statusLabel: 'COMPLETED',
    image: '/images/tep-about-photo.jpg',
    summary:
      'Vulnerable road user (VRU) conflict analysis, raised tabletop pedestrian crossings, refuge islands, and junction sight-distance improvements.',
    scope: [
      'Automated video conflict analysis measuring Post-Encroachment Time (PET) and Time-to-Collision (TTC).',
      'Curb radius tightening at free-left slip turns to enforce safe pedestrian crossing speeds.',
      'Raised tabletop pedestrian crossings with continuous tactile warning strips for universal access.',
      'Reallocation of junction throat space to establish unobstructed 2.5m sidewalk corridors.',
    ],
    methodologies: [
      'IRC:103-2012',
      'SSAM CONFLICT MODELING',
      'VIDEO SURROGATE SAFETY',
    ],
    outcomes:
      'Achieved zero pedestrian fatalities across an 18-month post-implementation monitoring window.',
  },
  {
    id: 10,
    code: 'PRJ-10',
    title: 'Vision-Based Trajectory Analytics & Live Conflict Dashboard',
    sector: 'research',
    sectorLabel: 'RESEARCH & ITS',
    location: 'Surat City Command & Control Centre / SVNIT Lab',
    client: 'MoRTH · SVNIT Transportation Engineering Lab',
    year: '2025',
    statusLabel: 'COMPLETED',
    image: '/images/Smart Mobility.jpg',
    summary:
      'Automated multi-class vehicle detection, trajectory extraction, and surrogate safety conflict (TTC/PET) dashboards from high-altitude drone and CCTV feeds.',
    scope: [
      'Deployment of deep-learning object detection models calibrated for Indian mixed-traffic heterogeneity.',
      'Real-time trajectory tracking of motorized two-wheelers, auto-rickshaws, buses, and multi-axle trucks.',
      'Automated incident detection (AID) for wrong-way maneuvers, queue spillback, and near-miss conflicts.',
      'Telemetry dashboard supplying municipal engineers with continuous Level of Service indicators.',
    ],
    methodologies: [
      'YOLOv8 EDGE ANALYTICS',
      'DEEPSORT TRACKING',
      'UAV TRAJECTORY EXTRACTION',
      'TTC / PET SURROGATE SAFETY',
    ],
    outcomes:
      'Cut corridor incident detection-to-dispatch latency from 14 minutes to under 5 minutes while establishing proactive blackspot heatmaps.',
  },
];

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const projectId = parseInt(id, 10);

  const project = PROJECTS.find((item) => item.id === projectId) || PROJECTS[0];

  const relatedProjects = PROJECTS.filter((item) => item.id !== project.id).slice(0, 2);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/projects');
    }
  };

  return (
    <div id="top" className="w-full flex flex-col bg-surface text-on-surface">
      {/* TOP BACK NAVIGATION & BREADCRUMB STRIP */}
      <div className="w-full border-b border-outline bg-surface-container">
        <div className="max-w-[1440px] mx-auto px-gutter-lg lg:px-gutter-xl py-gutter-sm flex flex-wrap items-center justify-between gap-gutter-md">
          <div className="flex items-center gap-gutter-sm">
            <button
              type="button"
              onClick={handleBack}
              className="chamfer-btn cursor-pointer inline-flex items-center gap-gutter-xs bg-primary text-on-primary hover:bg-brand-green hover:text-on-brand-green px-4 py-gutter-xs font-label text-label-sm uppercase tracking-wider transition-colors duration-state-change"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m0 0l7 7m-7-7l7-7" />
              </svg>
              <span>BACK</span>
            </button>
            <Link
              to="/projects"
              className="chamfer-btn inline-flex items-center gap-gutter-xs bg-surface hover:bg-brand-green text-on-surface hover:text-on-brand-green px-4 py-gutter-xs font-label text-label-sm uppercase tracking-wider transition-colors duration-state-change"
            >
              <span>ALL PROJECTS</span>
            </Link>
          </div>

          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-gutter-xs font-label text-label-sm uppercase text-on-surface-variant">
            <Link to="/" className="hover:text-brand-green transition-colors">
              HOME
            </Link>
            <span aria-hidden="true">/</span>
            <Link to="/projects" className="hover:text-brand-green transition-colors">
              PROJECTS
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-brand-green font-semibold">{project.code}</span>
          </nav>
        </div>
      </div>

      {/* PROJECT HERO HEADER & FEATURED VISUAL */}
      <section className="w-full border-b border-outline bg-surface">
        <div className="max-w-[1440px] mx-auto p-gutter-lg lg:p-gutter-xl">
          <div className="flex flex-col gap-gutter-md mb-gutter-xl">
            <div className="flex items-center gap-gutter-sm">
              <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true" />
              <span className="font-label text-label-md uppercase text-on-surface-variant">
                {project.sectorLabel} &mdash; {project.code}
              </span>
            </div>
            <h1 className="font-display text-display-md-mobile lg:text-[40px] xl:text-[48px] lg:leading-[1.1] font-semibold tracking-tight uppercase text-balance">
              {project.title}
            </h1>
            <p className="font-body text-body-md text-on-surface-variant max-w-3xl text-pretty">
              {project.summary}
            </p>
          </div>

          {/* Sharp Bordered Showcase Plate */}
          <div className="chamfer-card bg-outline p-[1px]">
            <div className="chamfer-card-inner relative h-[280px] sm:h-[360px] lg:h-[440px] bg-surface-dark overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-gutter-md left-gutter-md bg-brand-green text-on-brand-green px-gutter-sm py-gutter-xs font-label text-label-sm uppercase">
                {project.sectorLabel}
              </div>
              <div className="absolute bottom-gutter-md right-gutter-md bg-surface-dark/90 border border-outline-dark text-on-surface-dark px-gutter-sm py-gutter-xs font-label text-label-sm uppercase">
                {project.location} &bull; {project.year}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CASE STUDY + STICKY TECHNICAL FACTSHEET */}
      <section className="w-full border-b border-outline bg-surface">
        <div className="max-w-[1440px] mx-auto p-gutter-lg lg:p-gutter-xl grid grid-cols-1 lg:grid-cols-12 gap-gutter-xl">
          {/* Left Column: Scope, Standards, Impact */}
          <div className="lg:col-span-8 flex flex-col gap-gutter-xl">
            {/* 01: Scope of Work */}
            <div>
              <div className="flex items-center gap-gutter-sm border-b border-outline pb-gutter-sm mb-gutter-md">
                <span className="font-label text-label-sm text-brand-green font-semibold">01 //</span>
                <h2 className="font-headline text-headline-md uppercase">
                  SCOPE OF WORK &amp; INVESTIGATION
                </h2>
              </div>
              <div className="border-t border-outline">
                {project.scope.map((item, idx) => (
                  <div
                    key={item}
                    className="grid grid-cols-12 gap-gutter-sm py-gutter-md border-b border-outline items-start"
                  >
                    <span className="col-span-2 sm:col-span-1 font-label text-label-sm text-brand-green tabular-nums pt-0.5">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <p className="col-span-10 sm:col-span-11 font-body text-body-md text-on-surface leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 02: Methodologies & Codes */}
            <div>
              <div className="flex items-center gap-gutter-sm border-b border-outline pb-gutter-sm mb-gutter-md">
                <span className="font-label text-label-sm text-brand-green font-semibold">02 //</span>
                <h2 className="font-headline text-headline-md uppercase">
                  STANDARDS &amp; ENGINEERING METHODOLOGY
                </h2>
              </div>
              <div className="flex flex-wrap gap-gutter-sm">
                {project.methodologies.map((method) => (
                  <span
                    key={method}
                    className="border border-outline bg-surface-container text-on-surface px-gutter-md py-gutter-xs font-label text-label-sm uppercase"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>

            {/* 03: Outcomes */}
            <div>
              <div className="flex items-center gap-gutter-sm border-b border-outline pb-gutter-sm mb-gutter-md">
                <span className="font-label text-label-sm text-brand-green font-semibold">03 //</span>
                <h2 className="font-headline text-headline-md uppercase">
                  KEY OUTCOMES &amp; IMPACT
                </h2>
              </div>
              <div className="bg-surface-dark blueprint-grid-dark text-on-surface-dark border-l-4 border-brand-green p-gutter-lg lg:p-gutter-xl">
                <div className="font-label text-label-sm uppercase text-brand-green mb-gutter-xs">
                  VERIFIED DELIVERABLE IMPACT
                </div>
                <p className="font-body text-body-md text-on-surface-dark leading-relaxed">
                  {project.outcomes}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Project Factsheet */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 chamfer-card bg-outline p-[1px]">
              <div className="chamfer-card-inner bg-surface-container p-gutter-lg flex flex-col gap-gutter-md">
                <div className="flex items-center justify-between border-b border-outline pb-gutter-sm">
                  <h2 className="font-headline text-headline-sm uppercase">PROJECT FACTSHEET</h2>
                  <span className="bg-brand-green text-on-brand-green px-gutter-sm py-gutter-xs font-label text-label-sm uppercase">
                    {project.statusLabel}
                  </span>
                </div>

                <dl className="divide-y divide-outline">
                  <div className="py-gutter-sm">
                    <dt className="font-label text-label-sm uppercase text-on-surface-variant mb-1">
                      CLIENT / AUTHORITY
                    </dt>
                    <dd className="font-body text-body-sm text-on-surface">{project.client}</dd>
                  </div>
                  <div className="py-gutter-sm">
                    <dt className="font-label text-label-sm uppercase text-on-surface-variant mb-1">
                      CORRIDOR / LOCATION
                    </dt>
                    <dd className="font-body text-body-sm text-on-surface">{project.location}</dd>
                  </div>
                  <div className="py-gutter-sm">
                    <dt className="font-label text-label-sm uppercase text-on-surface-variant mb-1">
                      ENGINEERING DISCIPLINE
                    </dt>
                    <dd className="font-body text-body-sm text-on-surface">{project.sectorLabel}</dd>
                  </div>
                  <div className="py-gutter-sm">
                    <dt className="font-label text-label-sm uppercase text-on-surface-variant mb-1">
                      COMPLETION YEAR
                    </dt>
                    <dd className="font-body text-body-sm text-on-surface tabular-nums">{project.year}</dd>
                  </div>
                </dl>

                <Link
                  to="/contact"
                  className="chamfer-btn w-full inline-flex items-center justify-center gap-gutter-sm bg-brand-green text-on-brand-green px-5 py-gutter-sm font-label text-label-md uppercase tracking-wider hover:bg-primary hover:text-on-primary transition-colors duration-state-change"
                >
                  <span>DISCUSS A SIMILAR PROJECT</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* RELATED PROJECTS SECTION (MATCHING INDUSTRIAL CARD THEME) */}
      <section className="w-full bg-surface-container border-b border-outline">
        <div className="max-w-[1440px] mx-auto p-gutter-lg lg:p-gutter-xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-outline pb-gutter-md mb-gutter-xl gap-gutter-sm">
            <div>
              <div className="flex items-center gap-gutter-sm mb-gutter-xs">
                <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true" />
                <span className="font-label text-label-sm uppercase text-on-surface-variant">
                  CONTINUE EXPLORING
                </span>
              </div>
              <h2 className="font-headline text-headline-lg uppercase">RELATED CASE STUDIES</h2>
            </div>
            <Link
              to="/projects"
              className="font-label text-label-sm uppercase text-brand-green hover:opacity-80 transition-opacity"
            >
              VIEW ALL PROJECTS →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter-lg">
            {relatedProjects.map((rp) => (
              <article
                key={rp.id}
                className="chamfer-card bg-outline hover:bg-brand-green p-[1px] transition-colors flex flex-col"
              >
                <div className="chamfer-card-inner bg-surface flex flex-col flex-1 overflow-hidden">
                  <Link
                    to={`/projects/${rp.id}`}
                    className="relative h-64 overflow-hidden bg-surface-dark border-b border-outline block group"
                  >
                    <img
                      src={rp.image}
                      alt={rp.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <div className="absolute top-gutter-md left-gutter-md bg-surface-dark/90 border border-outline-dark text-on-surface-dark px-gutter-sm py-gutter-xs font-label text-label-sm uppercase">
                      {rp.sectorLabel}
                    </div>
                    <div className="absolute -bottom-[2px] left-0 right-0 flex items-end">
                      <div className="bg-brand-green text-on-brand-green notch-title-tab pt-gutter-sm pb-[calc(theme(spacing.gutter-sm)+2px)] pl-gutter-md pr-gutter-xl max-w-[85%]">
                        <h3 className="font-headline text-headline-sm uppercase leading-tight">
                          {rp.title}
                        </h3>
                      </div>
                    </div>
                  </Link>

                  <div className="p-gutter-lg flex flex-col justify-between gap-gutter-md flex-1">
                    <p className="font-body text-body-sm text-on-surface-variant">
                      {rp.summary}
                    </p>
                    <div className="border-t border-outline pt-gutter-sm flex flex-wrap items-center justify-between gap-2 font-label text-label-sm uppercase">
                      <span className="text-on-surface-variant">{rp.location}</span>
                      <Link
                        to={`/projects/${rp.id}`}
                        className="text-brand-green hover:opacity-80 transition-opacity font-medium shrink-0"
                      >
                        VIEW PROJECT BRIEF →
                      </Link>
                    </div>
                  </div>
                </div>
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
              <Link
                to="/contact"
                className="chamfer-btn inline-flex items-center justify-center gap-gutter-sm bg-brand-green text-on-brand-green px-5 py-gutter-sm font-label text-label-md uppercase tracking-wider hover:bg-surface hover:text-on-surface transition-colors duration-state-change ease-state-change"
              >
                <span>REQUEST A CONSULTATION</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
