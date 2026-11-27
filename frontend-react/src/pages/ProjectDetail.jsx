import { useParams, Link } from 'react-router-dom';

const ProjectDetail = () => {
  const { id } = useParams();
  const projectId = parseInt(id, 10);

  const projects = [
    {
      id: 1,
      title: 'Surat Outer Ring Road Corridor & High-Speed Expressway Review',
      sector: 'highways',
      sectorLabel: 'HIGHWAYS & PAVEMENTS',
      location: 'Surat Outer Ring Road, Gujarat',
      client: 'Surat Urban Development Authority (SUDA)',
      year: '2025',
      status: 'completed',
      statusLabel: 'Completed',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=600&fit=crop',
      summary: 'Comprehensive alignment safety audit, pavement structural evaluation, and grade-separated interchange feasibility for the 66-km multi-lane ring expressway.',
      scope: [
        'Conducted geometric alignment verification and sight distance evaluation along 66 km of expressway corridor.',
        'Carried out Falling Weight Deflectometer (FWD) structural capacity assessments on flexible pavement layers.',
        'Simulated interchange merging and diverging operations using microscopic traffic simulation to eliminate weave conflicts.',
        'Formulated drainage and cross-drainage recommendations meeting IRC:SP:42 and IRC:SP:88 specifications.'
      ],
      methodologies: 'IRC:SP:88, IRC:37-2018, Indo-HCM, Vissim Simulation, FWD Deflection Analysis',
      outcomes: 'Reduced predicted weaving collision risks by 42% at 4 major expressway interchanges and optimized overlay design thickness, saving significant public material costs.'
    },
    {
      id: 2,
      title: 'National Highway 48 Blackspot Rectification & Road Safety Audit',
      sector: 'safety',
      sectorLabel: 'ROAD SAFETY',
      location: 'NH-48 (Surat – Navsari Section), Gujarat',
      client: 'National Highways Authority of India (NHAI)',
      year: '2025',
      status: 'completed',
      statusLabel: 'Completed',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop',
      summary: 'IRC:SP:88 compliant operation-stage safety audit, accident blackspot engineering rectification, and collision reduction strategy for high-risk highway sections.',
      scope: [
        'Detailed crash frequency and severity indexing across 28 km of six-lane divided carriageway.',
        'Identification of 7 critical accident blackspots and root-cause engineering diagnostics.',
        'Design of retro-reflective signboards, road marking plans, and median opening channelisations.',
        'Work-zone safety protocol reviews during ongoing culvert rehabilitation work.'
      ],
      methodologies: 'IRC:SP:88-2019, MoRTH Road Safety Guidelines, Crash Severity Indexing, Radar Speed Profiling',
      outcomes: 'Implemented cost-effective physical channelisation and chevron warnings that reduced severe fatal crashes by 58% over a 12-month post-audit evaluation period.'
    },
    {
      id: 3,
      title: 'Urban Arterial Junction Signal Phasing & Intelligent Telemetry',
      sector: 'traffic',
      sectorLabel: 'TRAFFIC ENGINEERING',
      location: 'Ring Road Arterial Corridors, Surat',
      client: 'Surat Municipal Corporation (SMC)',
      year: '2024',
      status: 'completed',
      statusLabel: 'Completed',
      image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&h=600&fit=crop',
      summary: 'Comprehensive classified volume counts, radar speed surveys, Indo-HCM saturation flow analysis, and adaptive signal synchronisation across 8 high-density junctions.',
      scope: [
        'Video-based classified volume count (CVC) surveys capturing over 120,000 passenger car units (PCU) daily.',
        'Empirical saturation flow measurement and queue length dissipation studies under mixed-traffic conditions.',
        'Microscopic simulation and green-wave signal coordination design across 4.2 km corridor.',
        'Pedestrian crossing phase allocation and exclusive non-motorised transit (NMT) protection.'
      ],
      methodologies: 'Indo-HCM 2017, IRC:93-1985, Synchro, Vissim Signal Controller Optimization',
      outcomes: 'Achieved an average corridor delay reduction of 27% and increased junction level-of-service (LOS) from E to C during peak evening traffic.'
    },
    {
      id: 4,
      title: 'Western Dedicated Freight Corridor (DFC) Multimodal Rail Link',
      sector: 'rail',
      sectorLabel: 'RAIL SERVICES',
      location: 'DFC Western Corridor (Gothangam – Sachin Stretch)',
      client: 'Dedicated Freight Corridor Corporation of India (DFCCIL)',
      year: '2025',
      status: 'completed',
      statusLabel: 'Completed',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&h=600&fit=crop',
      summary: 'Track geometry clearance, road-over-bridge (ROB) structural approaches, and grade-separated intermodal freight connectivity evaluation.',
      scope: [
        'Intermodal freight transfer access planning and heavy truck queue mitigation at freight terminals.',
        'Structural approach road gradient reviews and high-clearance vertical curve checks for ROBs.',
        'Level-crossing elimination feasibility and replacement with twin-cell road underbridges (RUB).',
        'Vibration and settlement monitoring near railway embankment formations.'
      ],
      methodologies: 'Indian Railways Engineering Code, IRC:SP:54, Heavy Haul Axle Load Standards',
      outcomes: 'Ensured seamless multimodal container evacuation without bottlenecking adjacent state highway traffic and eliminated two hazardous level crossings.'
    },
    {
      id: 5,
      title: 'Smart City BRTS Transit Corridor Feasibility & Urban Mobility Plan',
      sector: 'smart-mobility',
      sectorLabel: 'SMART MOBILITY',
      location: 'Surat Smart City Infrastructure, Gujarat',
      client: 'Surat Smart City Development Ltd. (SSCDL)',
      year: '2024',
      status: 'completed',
      statusLabel: 'Completed',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop',
      summary: 'Origin-destination travel demand modeling, bus rapid transit corridor optimization, and multi-modal integration with Surat Metro Phase-1.',
      scope: [
        'Citywide household travel survey and origin-destination trip matrix synthesis.',
        'Dedicated BRTS median lane operational planning and junction queue-jump prioritization.',
        'Feeder route optimization connecting residential neighborhoods to core BRTS and Metro stations.',
        'Accessibility audit for differently-abled and elderly transit commuters.'
      ],
      methodologies: 'CUBE Voyager 4-Step Travel Modeling, Indo-HCM Transit Capacity, IRC:106',
      outcomes: 'Boosted daily public transit ridership by 19% through optimized feeder routing and improved transfer convenience between BRTS and upcoming metro lines.'
    },
    {
      id: 6,
      title: 'Hazira Industrial Mega Logistics Park Access & Drainage Infrastructure',
      sector: 'land-development',
      sectorLabel: 'LAND DEVELOPMENT',
      location: 'Hazira Industrial Zone, Surat',
      client: 'Gujarat Industrial Development Corporation (GIDC)',
      year: '2024',
      status: 'completed',
      statusLabel: 'Completed',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=600&fit=crop',
      summary: 'Traffic impact assessment (TIA), internal heavy-vehicle circulation design, stormwater master drainage network, and pavement life-cycle planning.',
      scope: [
        'Comprehensive Traffic Impact Assessment (TIA) for 150-acre multimodal warehousing park.',
        'Multi-axle trailer turning template design (AutoTURN) to avoid off-tracking hazards.',
        'Hydrological catchment modeling and concrete box-drain design for 50-year return storm events.',
        'Perpetual flexible pavement structural design for 100-million standard axles (MSA).'
      ],
      methodologies: 'IRC:37-2018, IRC:SP:42, SWMM Hydrology, AutoTURN Maneuver Analysis',
      outcomes: 'Prevented wet-season industrial waterlogging and ensured zero congestion spillover onto the Hazira-Surat port highway.'
    },
    {
      id: 7,
      title: 'Surat Metro Rail Corridor Geodetic Alignment & High-Precision LIDAR Survey',
      sector: 'surveying',
      sectorLabel: 'SURVEYING',
      location: 'Surat Metro Corridor (Dream City to Sarthana)',
      client: 'Gujarat Metro Rail Corporation (GMRC)',
      year: '2024',
      status: 'completed',
      statusLabel: 'Completed',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop',
      summary: 'High-density 3D mobile LIDAR corridor scanning, geodetic benchmark network establishment, and sub-centimeter right-of-way GIS mapping.',
      scope: [
        'Dual-frequency GNSS static geodetic network baseline observations across 21.6 km metro corridor.',
        'Mobile laser scanning (LIDAR) point cloud extraction capturing above-ground utilities and tree canopies.',
        'Sub-surface utility detection using Ground Penetrating Radar (GPR) at deep station excavation locations.',
        'Generation of high-fidelity digital elevation models (DEM) and Building Information Models (BIM).'
      ],
      methodologies: 'Leica Dual-Frequency GNSS, Terrestrial & Mobile LIDAR, GPR Radargram Analysis',
      outcomes: 'Delivered sub-10mm horizontal accuracy for viaduct pier placement and averted critical subterranean gas/telecom pipeline collisions.'
    },
    {
      id: 8,
      title: 'Heavy Axle Commercial Vehicle Weigh-In-Motion & FWD Pavement Testing',
      sector: 'highways',
      sectorLabel: 'HIGHWAYS & PAVEMENTS',
      location: 'Golden Corridor Industrial Arterial, Gujarat',
      client: 'Roads & Buildings Department (R&B), Govt. of Gujarat',
      year: '2024',
      status: 'completed',
      statusLabel: 'Completed',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=600&fit=crop',
      summary: 'Falling Weight Deflectometer (FWD) structural capacity assessment, backcalculation of resilient moduli, and mechanistic-empirical overlay design.',
      scope: [
        'FWD testing at 100-meter intervals assessing subgrade, sub-base, and bituminous layer deflections.',
        'Vehicle Damage Factor (VDF) spectrum derivation from high-speed Weigh-In-Motion (WIM) sensors.',
        'Non-destructive testing (NDT) of core samples to check fatigue cracking and rutting depths.',
        'Customized Bituminous Concrete (BC) overlay design accounting for extreme summer pavement temperatures.'
      ],
      methodologies: 'IRC:115-2014, IITPAVE Mechanistic Analysis, Weigh-In-Motion Telemetry',
      outcomes: 'Extended highway pavement service life by 12 years with an optimized 60mm stone mastic asphalt (SMA) overlay recommendation.'
    },
    {
      id: 9,
      title: 'Pedestrian Vulnerability & Multimodal Junction Geometry Redesign',
      sector: 'safety',
      sectorLabel: 'ROAD SAFETY',
      location: 'Ichchhanath & Athwa Junctions, Surat',
      client: 'Surat Traffic Police & Municipal Corporation',
      year: '2023',
      status: 'completed',
      statusLabel: 'Completed',
      image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&h=600&fit=crop',
      summary: 'Vulnerable road user (VRU) conflict analysis, raised pedestrian crossings, pedestrian refuge islands, and sight-distance improvements.',
      scope: [
        'Automated video conflict analysis measuring Post-Encroachment Time (PET) and Time-to-Collision (TTC).',
        'Curb radius tightening at free-left turns to enforce safe turning speeds for passenger vehicles.',
        'Raised tabletop pedestrian crossings with tactile paving for visually impaired students and pedestrians.',
        'Reallocation of road space to create continuous 2.5m wide unobstructed sidewalk pathways.'
      ],
      methodologies: 'IRC:103-2012 (Pedestrian Facilities), Surrogate Safety Assessment Model (SSAM), Video Conflict Analytics',
      outcomes: 'Zero pedestrian fatalities recorded in the 18 months following physical junction remodelling.'
    },
    {
      id: 10,
      title: 'AI-Driven Sensor Video Telemetry & Live Traffic Conflict Dashboard',
      sector: 'smart-mobility',
      sectorLabel: 'SMART MOBILITY',
      location: 'Surat City Command & Control Centre (ICCC)',
      client: 'Smart City Mission, Govt. of India',
      year: '2025',
      status: 'completed',
      statusLabel: 'Completed',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop',
      summary: 'Computer-vision edge computing pipelines extracting real-time vehicle trajectories, near-miss conflict indicators, and automated congestion alerts.',
      scope: [
        'Deployment of deep-learning object detection models calibrated for Indian mixed traffic heterogeneity.',
        'Real-time trajectory tracking of two-wheelers, auto-rickshaws, buses, and heavy goods vehicles.',
        'Automatic incident detection (AID) for wrong-way driving, stationary vehicle breakdowns, and jaywalking.',
        'Cloud-synced telemetry dashboard providing municipal traffic engineers with live level-of-service indicators.'
      ],
      methodologies: 'YOLOv8 Edge Analytics, DeepSORT Tracking, PyTorch, Real-Time CCTV Stream Telemetry',
      outcomes: 'Shortened emergency dispatch response times from 14 minutes to under 5 minutes for traffic incident clearing.'
    },
  ];

  const p = projects.find(proj => proj.id === projectId) || projects[0];

  // Find related projects (2 others)
  const relatedProjects = projects
    .filter(proj => proj.id !== projectId)
    .slice(0, 2);

  const methodTags = p.methodologies.split(',').map(m => m.trim());

  return (
    <main id="main" className="project-detail-page">
      <div className="project-detail-container max-w-7xl mx-auto px-gutter-lg py-gutter-xl lg:py-gutter-2xl">

        {/* Breadcrumb Bar */}
        <nav className="projects-breadcrumb-bar mb-gutter-xl" aria-label="Breadcrumb" data-reveal="fade-in-up">
          <ul className="projects-breadcrumb-list flex items-center gap-gutter-sm font-body text-body-sm text-on-surface/60">
            <li className="projects-breadcrumb-item">
              <Link to="/" className="hover:underline">Home</Link>
            </li>
            <li className="projects-breadcrumb-sep" aria-hidden="true">/</li>
            <li className="projects-breadcrumb-item">
              <Link to="/projects" className="hover:underline">Projects</Link>
            </li>
            <li className="projects-breadcrumb-sep" aria-hidden="true">/</li>
            <li className="projects-breadcrumb-item projects-breadcrumb-cur font-semibold text-on-surface" aria-current="page">
              {p.title}
            </li>
          </ul>
        </nav>

        {/* Project Hero Header */}
        <header className="project-detail-hero mb-gutter-xl" data-reveal="fade-in-up" style={{ transitionDelay: '100ms' }}>
          <span className="project-detail-badge inline-block bg-brand-green text-on-brand-green px-gutter-sm py-gutter-xs font-label text-label-sm uppercase tracking-wider rounded-full mb-gutter-md">
            {p.sectorLabel}
          </span>
          <h1 className="project-detail-title font-display text-headline-lg lg:text-headline-xl lg:text-display-md text-on-surface leading-tight">
            {p.title}
          </h1>
        </header>

        {/* Project Featured Hero Banner */}
        <div className="project-detail-banner relative aspect-[2/1] lg:aspect-[16/5] rounded-2xl overflow-hidden mb-gutter-xl" data-reveal="fade-in-up" style={{ transitionDelay: '150ms' }}>
          <img
            src={p.image}
            alt={p.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Project Content Grid: Main Case Study + Sticky Sidebar */}
        <div className="project-detail-layout grid lg:grid-cols-12 gap-gutter-xl">
          {/* Left Column: Comprehensive Technical Case Study */}
          <div className="project-detail-main lg:col-span-8 space-y-gutter-xl">
            {/* Lead Summary */}
            <p className="project-detail-lead font-body text-body-lg text-on-surface/70 leading-relaxed" data-reveal="fade-in-up">
              {p.summary}
            </p>

            {/* Scope of Work */}
            <section className="project-detail-section" data-reveal="fade-in-up" style={{ transitionDelay: '200ms' }}>
              <h2 className="project-detail-h2 font-display text-headline-md text-on-surface mb-gutter-lg">Scope of Work & Investigation</h2>
              <ul className="project-scope-list space-y-gutter-sm">
                {p.scope.map((item, i) => (
                  <li key={i} className="flex items-start gap-gutter-sm font-body text-body-md text-on-surface/80">
                    <span className="project-scope-icon flex-shrink-0 w-5 h-5 text-brand-green mt-0.5" aria-hidden="true">
                      <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="4 10 8 14 16 6" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Methodologies & Standards Applied */}
            <section className="project-detail-section" data-reveal="fade-in-up" style={{ transitionDelay: '250ms' }}>
              <h2 className="project-detail-h2 font-display text-headline-md text-on-surface mb-gutter-lg">Standards & Engineering Methodology</h2>
              <div className="flex flex-wrap gap-gutter-sm">
                {methodTags.map((method, i) => (
                  <span
                    key={i}
                    className="inline-block bg-surface border border-outline text-brand-green px-gutter-md py-gutter-xs font-label text-label-sm rounded-full"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </section>

            {/* Measurable Outcomes */}
            <section className="project-detail-section" data-reveal="fade-in-up" style={{ transitionDelay: '300ms' }}>
              <h2 className="project-detail-h2 font-display text-headline-md text-on-surface mb-gutter-lg">Key Outcomes & Impact</h2>
              <div className="project-outcome-box bg-surface border border-outline rounded-2xl p-gutter-xl">
                <p className="font-body text-body-md text-on-surface/80 leading-relaxed">{p.outcomes}</p>
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Project Facts & Call-to-Action */}
          <aside className="project-detail-aside lg:col-span-4" data-reveal="fade-in-up" style={{ transitionDelay: '200ms' }}>
            <div className="project-sidebar-card sticky top-gutter-xl bg-surface border border-outline rounded-2xl p-gutter-xl space-y-gutter-lg">
              <h2 className="project-sidebar-title font-display text-headline-sm text-on-surface mb-gutter-md">Project Factsheet</h2>
              <dl className="project-fact-group space-y-gutter-lg">
                <div className="project-fact-item">
                  <dt className="font-label text-label-sm uppercase text-on-surface/50 mb-1">Client / Authority</dt>
                  <dd className="font-body text-body-md text-on-surface">{p.client}</dd>
                </div>
                <div className="project-fact-item">
                  <dt className="font-label text-label-sm uppercase text-on-surface/50 mb-1">Location</dt>
                  <dd className="font-body text-body-md text-on-surface">{p.location}</dd>
                </div>
                <div className="project-fact-item">
                  <dt className="font-label text-label-sm uppercase text-on-surface/50 mb-1">Discipline</dt>
                  <dd className="font-body text-body-md text-on-surface">{p.sectorLabel}</dd>
                </div>
                <div className="project-fact-item">
                  <dt className="font-label text-label-sm uppercase text-on-surface/50 mb-1">Completion Year</dt>
                  <dd className="font-body text-body-md text-on-surface">{p.year}</dd>
                </div>
                <div className="project-fact-item">
                  <dt className="font-label text-label-sm uppercase text-on-surface/50 mb-1">Status</dt>
                  <dd>
                    <span className="inline-block bg-brand-green/10 text-brand-green px-gutter-sm py-gutter-xs rounded-full font-label text-label-sm font-semibold">
                      {p.statusLabel}
                    </span>
                  </dd>
                </div>
              </dl>

              <Link
                to="/contact"
                className="project-sidebar-cta block mt-gutter-lg inline-flex items-center justify-center gap-gutter-sm bg-brand-green text-on-brand-green px-gutter-md py-gutter-sm font-label text-label-md uppercase tracking-wider hover:bg-brand-green-dark transition-colors duration-state-change"
              >
                <span>Discuss a Similar Project</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </aside>
        </div>

        {/* Related Work Section */}
        {relatedProjects.length > 0 && (
          <section className="mt-gutter-2xl pt-gutter-xl border-t border-outline" data-reveal="fade-in-up">
            <h2 className="font-display text-headline-lg lg:text-headline-xl text-on-surface mb-gutter-xl">Related Projects</h2>
            <div className="projects-archive-grid grid md:grid-cols-2 gap-gutter-lg">
              {relatedProjects.map((rp) => (
                <article
                  key={rp.id}
                  className="project-card-item rv group bg-surface border border-outline rounded-2xl overflow-hidden transition-all duration-state-change hover:border-brand-green/50 hover:shadow-lg"
                >
                  <Link
                    to={`/projects/${rp.id}`}
                    className="project-card-media block relative aspect-[16/9] overflow-hidden"
                    aria-label={`Explore ${rp.title}`}
                  >
                    <img
                      src={rp.image}
                      alt={rp.title}
                      className="project-card-img w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="project-card-overlay absolute inset-0 bg-gradient-to-t from-brand-green/80 via-brand-green/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-state-change" aria-hidden="true" />

                    <div className="project-center-btn absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                      <span className="project-center-icon w-14 h-14 rounded-full bg-on-brand-green/90 text-brand-green flex items-center justify-center transform transition-transform duration-500 group-hover:rotate-90 group-hover:scale-110">
                        <svg viewBox="0 0 32 32" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="16" y1="6" x2="16" y2="26" />
                          <line x1="6" y1="16" x2="26" y2="16" />
                        </svg>
                      </span>
                    </div>
                  </Link>

                  <div className="project-card-info p-gutter-lg">
                    <div className="project-card-left mb-gutter-md">
                      <h3 className="project-card-title font-headline text-headline-sm text-on-surface mb-gutter-xs">
                        <Link to={`/projects/${rp.id}`} className="hover:text-brand-green transition-colors duration-state-change">
                          {rp.title}
                        </Link>
                      </h3>
                      <span className="project-card-category font-label text-label-sm uppercase text-brand-green">{rp.sectorLabel}</span>
                    </div>

                    <div className="project-card-right">
                      <p className="project-card-summary font-body text-body-sm text-on-surface/70 mb-gutter-md">{rp.summary}</p>
                      <Link
                        to={`/projects/${rp.id}`}
                        className="project-explore-link inline-flex items-center gap-gutter-sm font-label text-label-sm uppercase text-brand-green hover:gap-2 transition-all duration-state-change"
                      >
                        <span>EXPLORE PROJECT</span>
                        <span className="project-explore-arrow" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default ProjectDetail;