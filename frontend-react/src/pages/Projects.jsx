import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const Projects = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState(searchParams.get('sector') || 'all');

  const sectors = [
    { key: 'all', label: 'ALL' },
    { key: 'land-development', label: 'LAND DEVELOPMENT' },
    { key: 'highways', label: 'HIGHWAYS & PAVEMENTS' },
    { key: 'safety', label: 'ROAD SAFETY' },
    { key: 'traffic', label: 'TRAFFIC ENGINEERING' },
    { key: 'rail', label: 'RAIL SERVICES' },
    { key: 'smart-mobility', label: 'SMART MOBILITY' },
    { key: 'surveying', label: 'SURVEYING' },
  ];

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
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop',
      summary: 'Comprehensive alignment safety audit, pavement structural evaluation, and grade-separated interchange feasibility for the 66-km multi-lane ring expressway.',
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
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
      summary: 'IRC:SP:88 compliant operation-stage safety audit, accident blackspot engineering rectification, and collision reduction strategy for high-risk highway sections.',
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
      image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=600&h=400&fit=crop',
      summary: 'Comprehensive classified volume counts, radar speed surveys, Indo-HCM saturation flow analysis, and adaptive signal synchronisation across 8 high-density junctions.',
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
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=400&fit=crop',
      summary: 'Track geometry clearance, road-over-bridge (ROB) structural approaches, and grade-separated intermodal freight connectivity evaluation.',
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
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop',
      summary: 'Origin-destination travel demand modeling, bus rapid transit corridor optimization, and multi-modal integration with Surat Metro Phase-1.',
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
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop',
      summary: 'Traffic impact assessment (TIA), internal heavy-vehicle circulation design, stormwater master drainage network, and pavement life-cycle planning.',
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
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
      summary: 'High-density 3D mobile LIDAR corridor scanning, geodetic benchmark network establishment, and sub-centimeter right-of-way GIS mapping.',
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
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop',
      summary: 'Falling Weight Deflectometer (FWD) structural capacity assessment, backcalculation of resilient moduli, and mechanistic-empirical overlay design.',
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
      image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=600&h=400&fit=crop',
      summary: 'Vulnerable road user (VRU) conflict analysis, raised pedestrian crossings, pedestrian refuge islands, and sight-distance improvements.',
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
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
      summary: 'Computer-vision edge computing pipelines extracting real-time vehicle trajectories, near-miss conflict indicators, and automated congestion alerts.',
    },
  ];

  // Filter projects based on active filter
  const visibleProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.sector === activeFilter);

  // Handle filter change
  const handleFilterChange = (sector) => {
    setActiveFilter(sector);
    if (sector === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ sector });
    }
  };

  return (
    <main id="main" className="projects-archive-page">
      <div className="projects-archive-container max-w-7xl mx-auto px-gutter-lg py-gutter-xl lg:py-gutter-2xl">

        {/* Breadcrumb Bar */}
        <nav className="projects-breadcrumb-bar mb-gutter-xl" aria-label="Breadcrumb" data-reveal="fade-in-up">
          <ul className="projects-breadcrumb-list flex items-center gap-gutter-sm font-body text-body-sm text-on-surface/60">
            <li className="projects-breadcrumb-item">
              <Link to="/" className="hover:underline">Home</Link>
            </li>
            <li className="projects-breadcrumb-sep" aria-hidden="true">/</li>
            <li className="projects-breadcrumb-item projects-breadcrumb-cur font-semibold text-on-surface" aria-current="page">
              Projects
            </li>
          </ul>
        </nav>

        {/* Hero Header */}
        <header className="projects-hero-header flex flex-col lg:flex-row lg:items-end lg:justify-between gap-gutter-lg mb-gutter-xl" data-reveal="fade-in-up">
          <div className="projects-hero-left">
            <h1 className="projects-hero-title font-display text-display-lg lg:text-display-xl text-on-surface">Our Projects</h1>
          </div>
          <div className="projects-hero-right max-w-2xl">
            <p className="projects-hero-intro font-body text-body-lg text-on-surface/70 leading-relaxed">
              We believe in full ownership across all the work that we do. Here are some notable completed projects that our growth-driven research & consultancy team has delivered.
            </p>
          </div>
        </header>

        {/* Category Filter Navigation */}
        <div className="projects-filter-wrapper mb-gutter-xl" data-reveal="fade-in-up" style={{ transitionDelay: '100ms' }}>
          <nav className="projects-filter-nav flex flex-wrap gap-gutter-sm" aria-label="Filter Projects by Sector" role="tablist">
            {sectors.map((sector) => (
              <button
                key={sector.key}
                type="button"
                role="tab"
                aria-selected={activeFilter === sector.key}
                aria-controls={`filterpanel-${sector.key}`}
                id={`filtertab-${sector.key}`}
                className={`projects-filter-tab px-gutter-md py-gutter-sm font-label text-label-md uppercase rounded-lg transition-all duration-state-change ${
                  activeFilter === sector.key
                    ? 'bg-brand-green text-on-brand-green shadow-lg'
                    : 'bg-surface border border-outline text-on-surface hover:border-brand-green/50'
                }`}
                onClick={() => handleFilterChange(sector.key)}
              >
                {sector.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Projects Archive Grid */}
        <div
          className="projects-archive-grid grid grid-cols-1 md:grid-cols-2 gap-gutter-lg"
          id="projectsArchiveGrid"
          role="tabpanel"
          aria-labelledby={`filtertab-${activeFilter}`}
        >
          {visibleProjects.map((project, i) => (
            <article
              key={project.id}
              className={`project-card-item rv group bg-surface border border-outline rounded-2xl overflow-hidden transition-all duration-state-change hover:border-brand-green/50 hover:shadow-lg`}
              data-sector={project.sector}
              data-reveal="fade-in-up"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {/* Top: Photo Frame with Center Rotating Action Button */}
              <Link
                to={`/projects/${project.id}`}
                className="project-card-media block relative aspect-[16/9] overflow-hidden"
                aria-label={`Explore ${project.title}`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-card-img w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="project-card-overlay absolute inset-0 bg-gradient-to-t from-brand-green/80 via-brand-green/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-state-change" aria-hidden="true" />

                {/* Rotating Center Circular Button */}
                <div className="project-center-btn absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                  <span className="project-center-icon w-14 h-14 rounded-full bg-on-brand-green/90 text-brand-green flex items-center justify-center transform transition-transform duration-500 group-hover:rotate-90 group-hover:scale-110">
                    <svg viewBox="0 0 32 32" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="16" y1="6" x2="16" y2="26" />
                      <line x1="6" y1="16" x2="26" y2="16" />
                    </svg>
                  </span>
                </div>
              </Link>

              {/* Bottom: Card Information in 2 Columns */}
              <div className="project-card-info p-gutter-lg">
                {/* Left Column: Title & Category */}
                <div className="project-card-left mb-gutter-md">
                  <h2 className="project-card-title font-headline text-headline-sm text-on-surface mb-gutter-xs">
                    <Link to={`/projects/${project.id}`} className="hover:text-brand-green transition-colors duration-state-change">
                      {project.title}
                    </Link>
                  </h2>
                  <span className="project-card-category font-label text-label-sm uppercase text-brand-green">{project.sectorLabel}</span>
                </div>

                {/* Right Column: Scope Summary & Explore Link */}
                <div className="project-card-right">
                  <p className="project-card-summary font-body text-body-sm text-on-surface/70 mb-gutter-md">{project.summary}</p>
                  <Link
                    to={`/projects/${project.id}`}
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

          {/* Empty State */}
          {visibleProjects.length === 0 && (
            <div className="projects-empty-state col-span-full text-center py-gutter-2xl" data-reveal="fade-in-up">
              <h3 className="font-display text-headline-md text-on-surface mb-gutter-sm">No projects found in this category</h3>
              <p className="font-body text-body-md text-on-surface/60">Please select another category or view all completed projects.</p>
            </div>
          )}
        </div>

      </div>
    </main>
  );
};

export default Projects;