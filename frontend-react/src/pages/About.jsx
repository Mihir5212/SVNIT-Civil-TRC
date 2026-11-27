import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { value: '40+', label: 'Projects Delivered' },
    { value: '120+', label: 'Research Papers' },
    { value: '5+', label: 'Senior Faculty' },
  ];

  const vmPanels = [
    {
      id: 'vision',
      icon: (
        <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor" aria-hidden="true">
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
        </svg>
      ),
      title: 'Our Vision',
      body: 'To emerge as India\'s leading academic centre of excellence in transportation engineering and road safety, empowering public authorities with unbiased, data-driven engineering insights for safe, resilient and sustainable transport corridors.',
    },
    {
      id: 'mission',
      icon: (
        <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor" aria-hidden="true">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
        </svg>
      ),
      title: 'Our Mission',
      body: 'To conduct rigorous field audits, high-impact research, and advanced computer modeling that eliminate hazardous road blackspots, modernize traffic flow management, and guide national roadway policy standards.',
    },
  ];

  const accreditations = [
    {
      bg: 'bg-brand-green',
      text: 'text-on-brand-green',
      iconColor: 'text-amber-400',
      icon: (
        <svg viewBox="0 0 24 24" width="44" height="44" fill="currentColor" aria-hidden="true">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
        </svg>
      ),
      title: 'IRC Accreditations & Codes',
      body: 'Our Road Safety Audits and Highway capacity studies strictly adhere to IRC:SP:88 (Road Safety Audit Manual), IRC:106, and relevant IRC special publications, ensuring statutory compliance for government submissions.',
    },
    {
      bg: 'bg-amber-500',
      text: 'text-slate-900',
      iconColor: 'text-slate-900',
      icon: (
        <svg viewBox="0 0 24 24" width="44" height="44" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      ),
      title: 'MoRTH & Institute Standing',
      body: 'As part of SVNIT, an Institute of National Importance under the Ministry of Education, TRC is empowered to issue vetted engineering opinions and DPR third-party validation reports accepted by MoRTH and NHAI.',
    },
  ];

  return (
    <main id="main">
      {/* Page Hero Banner */}
      <section className="page-hero relative">
        <div className="absolute inset-0 bg-brand-green blueprint-grid-dark opacity-20" />
        <div className="relative z-10 page-hero-content max-w-7xl mx-auto px-gutter-lg py-gutter-xl lg:py-gutter-2xl text-center">
          <h1 className="page-hero-title font-display text-display-lg lg:text-display-xl text-on-brand-green mb-gutter-sm" data-reveal="fade-in-up">
            About TRC
          </h1>
          <p className="page-hero-breadcrumb font-body text-body-md text-on-brand-green/80" data-reveal="fade-in-up" style={{ transitionDelay: '100ms' }}>
            <Link to="/" className="hover:underline">Home</Link> <span className="mx-gutter-xs" aria-hidden="true">›</span> About TRC
          </p>
        </div>
      </section>

      {/* Intro & Key Numbers */}
      <section className="section py-gutter-xl lg:py-gutter-2xl">
        <div className="wrap max-w-7xl mx-auto px-gutter-lg">
          <div className="about-strip grid lg:grid-cols-2 gap-gutter-xl lg:gap-gutter-2xl items-start" data-reveal="fade-in-up">
            {/* Left: Image */}
            <div className="about-image-wrap relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-brand-green/10 chamfer-card">
                <img
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop"
                  alt="TRC Laboratory & Field Studies"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="%230b5d45"%3E%3Cpath d="M16 4H48L60 16V24H44V18H20V46H44V36H32V26H60V48L48 60H16L4 48V16L16 4Z"/%3E%3C/svg%3E';
                    e.target.style.padding = '3rem';
                    e.target.style.background = '#f3f3f1';
                  }}
                />
              </div>
              <span className="about-caption absolute bottom-gutter-md left-gutter-md right-gutter-md font-body text-body-sm text-on-surface-dark/70 bg-surface/90 backdrop-blur-sm px-gutter-sm py-gutter-xs rounded-lg">
                Civil Engineering Dept • SVNIT Surat
              </span>
            </div>

            {/* Right: Text & Stats */}
            <div className="about-text flex flex-col justify-center">
              <p className="about-heading-label font-label text-label-md uppercase text-brand-green tracking-wider mb-gutter-xs">Who We Are</p>
              <h2 className="about-heading font-display text-headline-lg lg:text-headline-xl text-on-surface mb-gutter-md">An Independent Research & Consultancy Unit in Transportation Engineering</h2>
              <p className="lead-text font-body text-body-lg text-on-surface/80 mb-gutter-md">
                TRC (Transportation Engineering & Planning Cell) is a specialized research and consultancy division within the Department of Civil Engineering at Sardar Vallabhbhai National Institute of Technology (SVNIT), Surat.
              </p>
              <p className="font-body text-body-md text-on-surface/70 mb-gutter-lg">
                Established to bridge academic research and real-world civil engineering infrastructure, TRC provides independent evaluations, safety audits, and intelligent transport planning to municipal corporations, state highway development corporations, and national infrastructure agencies.
              </p>
              <div className="flex flex-wrap gap-gutter-xl" style={{ marginTop: '2rem' }}>
                {stats.map((stat, i) => (
                  <div key={i} className="flex flex-col items-start">
                    <span className="stat-number font-display text-headline-lg lg:text-headline-xl text-brand-green font-extrabold leading-none">{stat.value}</span>
                    <span className="font-label text-label-sm text-on-surface/50 font-semibold mt-1">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Panels */}
      <section className="section vm-section bg-surface-dark py-gutter-xl lg:py-gutter-2xl">
        <div className="wrap max-w-7xl mx-auto px-gutter-lg">
          <div className="section-heading text-center mb-gutter-xl" data-reveal="fade-in-up">
            <span className="section-label font-label text-label-md uppercase text-brand-green tracking-wider">Our Philosophy</span>
            <h2 className="font-display text-headline-lg lg:text-headline-xl text-on-surface-dark mt-gutter-sm mb-gutter-sm">Vision & Mission</h2>
            <div className="section-accent-line w-16 h-px bg-brand-green mx-auto" />
          </div>
          <div className="vm-panels grid md:grid-cols-2 gap-gutter-lg">
            {vmPanels.map((panel, i) => (
              <div
                key={panel.id}
                className={`vm-card relative overflow-hidden rounded-2xl p-gutter-xl lg:p-gutter-2xl flex flex-col items-center text-center ${i === 0 ? 'bg-blue-900/20' : 'bg-brand-green/10'}`}
                data-reveal="fade-in-up"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={`vm-card-overlay absolute inset-0 ${i === 0 ? 'bg-blue-900/30' : 'bg-brand-green/20'}`} aria-hidden="true" />
                <div className="vm-card-content relative z-10 flex flex-col items-center">
                  <div className={`vm-card-icon ${panel.iconColor} mb-gutter-md`}>
                    {panel.icon}
                  </div>
                  <h3 className="vm-card-title font-display text-headline-md lg:text-headline-lg text-on-surface-dark mb-gutter-sm">{panel.title}</h3>
                  <p className="vm-card-body font-body text-body-md text-on-surface-dark/80 max-w-xl">{panel.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Capabilities List */}
      <section className="section py-gutter-xl lg:py-gutter-2xl" id="capabilities">
        <div className="wrap max-w-7xl mx-auto px-gutter-lg">
          <div className="section-heading text-center mb-gutter-xl" data-reveal="fade-in-up">
            <span className="section-label font-label text-label-md uppercase text-brand-green tracking-wider">Core Specializations</span>
            <h2 className="font-display text-headline-lg lg:text-headline-xl text-on-surface mt-gutter-sm mb-gutter-sm">Our Capabilities & Engineering Scope</h2>
            <div className="section-accent-line w-16 h-px bg-brand-green mx-auto mb-gutter-md" />
            <p className="section-subtext font-body text-body-md text-on-surface/60 max-w-2xl mx-auto">Click on any capability to view detailed methodology, expected outputs, and consultation options.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-gutter-lg" id="capability-list">
            {[
              { icon: 'directions_car', title: 'Highway & Transportation', desc: 'Pavement design, corridor safety, traffic impact studies, and DPR review for national and state highways.', link: '/services?service=transportation' },
              { icon: 'security', title: 'Road Safety Audit', desc: 'IRC:SP:88 multi-stage audits, blackspot rectification, VRU protection, and work-zone safety management.', link: '/services?service=road-safety-audit' },
              { icon: 'traffic', title: 'Traffic Engineering', desc: 'Classified volume counts, signal optimization, junction design, parking studies, and micro-simulation.', link: '/services?service=traffic-engineering' },
              { icon: 'train', title: 'Rail & Transit Services', desc: 'Multi-modal integration, ROB/RUB studies, freight terminal access, and station evacuation modeling.', link: '/services?service=rail-services' },
              { icon: 'smart_toy', title: 'Smart Mobility & ITS', desc: 'AI computer vision, surrogate safety, adaptive signals, drone analytics, and ICCC dashboards.', link: '/services?service=smart-mobility' },
              { icon: 'landscape', title: 'Land Development & Pavements', desc: 'Traffic impact assessment, FWD/BBD testing, axle load surveys, site access, and internal logistics.', link: '/services?service=land-development' },
              { icon: 'satellite', title: 'Surveying & Drone Analytics', desc: 'UAV photogrammetry, RTK GNSS, total station surveys, DEM generation, and Web-GIS asset management.', link: '/services?service=surveying' },
            ].map((cap, i) => (
              <Link
                key={i}
                to={cap.link}
                className="capability-card group relative bg-surface border border-outline rounded-2xl p-gutter-lg lg:p-gutter-xl transition-all duration-state-change hover:border-brand-green/50 hover:shadow-lg hover:-translate-y-1"
                data-reveal="fade-in-up"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="capability-icon w-14 h-14 bg-brand-green/10 rounded-xl flex items-center justify-center text-brand-green mb-gutter-md group-hover:bg-brand-green group-hover:text-on-brand-green transition-colors duration-state-change">
                  <span className="material-symbols-outlined text-display-sm" aria-hidden="true">{cap.icon}</span>
                </div>
                <h3 className="font-headline text-headline-sm text-on-surface mb-gutter-xs">{cap.title}</h3>
                <p className="font-body text-body-sm text-on-surface/60 mb-gutter-md">{cap.desc}</p>
                <span className="font-label text-label-sm uppercase text-brand-green inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-state-change">
                  View Details
                  <span className="material-symbols-outlined text-body-sm" aria-hidden="true">arrow_forward</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditation & Standards Recognition */}
      <section className="section bg-surface-dark py-gutter-xl lg:py-gutter-2xl">
        <div className="wrap max-w-7xl mx-auto px-gutter-lg">
          <div className="section-heading text-center mb-gutter-xl" data-reveal="fade-in-up">
            <span className="section-label font-label text-label-md uppercase text-brand-green tracking-wider">Accreditations & Standards</span>
            <h2 className="font-display text-headline-lg lg:text-headline-xl text-on-surface-dark mt-gutter-sm mb-gutter-sm">Engineered to National Standards</h2>
            <div className="section-accent-line w-16 h-px bg-brand-green mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 gap-gutter-lg">
            {accreditations.map((acc, i) => (
              <div
                key={i}
                className={`${acc.bg} ${acc.text} rounded-2xl p-gutter-xl lg:p-gutter-2xl shadow-lg`}
                data-reveal="fade-in-up"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={`${acc.iconColor} mb-gutter-md`}>
                  {acc.icon}
                </div>
                <h3 className="font-display text-headline-sm mb-gutter-sm">{acc.title}</h3>
                <p className="font-body text-body-md leading-relaxed opacity-90">{acc.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="cta-band relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-green blueprint-grid-dark opacity-20" />
        <div className="relative z-10 wrap max-w-7xl mx-auto px-gutter-lg py-gutter-xl lg:py-gutter-2xl">
          <div className="cta-band-inner grid lg:grid-cols-2 gap-gutter-xl items-center" data-reveal="fade-in-up">
            <div className="cta-band-text">
              <h2 className="cta-band-title font-display text-headline-lg lg:text-headline-xl text-on-brand-green mb-gutter-md">Consult with TRC Faculty on Your Upcoming Project</h2>
              <p className="cta-band-desc font-body text-body-lg text-on-brand-green/80">Discuss terms of reference, project scope, or request an initial assessment for roadway and traffic planning.</p>
            </div>
            <div className="cta-band-actions justify-center lg:justify-end">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-gutter-sm bg-amber-500 text-slate-900 px-gutter-xl py-gutter-md font-label text-label-lg uppercase tracking-wider hover:bg-amber-400 transition-colors duration-state-change"
              >
                <span>Contact TRC Cell</span>
                <span className="material-symbols-outlined text-headline-sm" aria-hidden="true">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;