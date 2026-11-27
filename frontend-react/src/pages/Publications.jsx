import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PUBLICATIONS_DATA = [
  {
    id: 'pub-01',
    category: 'journal',
    categoryLabel: 'JOURNAL ARTICLES',
    badge: 'JOURNAL / 2024',
    title: 'EXPRESSWAY CAPACITY & HETEROGENEOUS FLOW',
    authors: 'Dr. Shriniwas S. Arkatkar, Dr. Gaurang J. Joshi, Siddharth Umrigar',
    venue: 'Journal of Transportation Engineering, Part A: Systems (ASCE) • Vol. 150(4)',
    identifier: 'DOI: 10.1061/JTEPBS.0001842 • SCI Indexed',
    scope: 'INDO-HCM CALIBRATION • PCU MODELING',
    image: '/images/Traffic Engineering.jpg',
    imageAlt: 'Multi-lane expressway traffic flow analysis',
    summary:
      'Empirical speed-flow relationships and dynamic Passenger Car Unit (PCU) estimations calibrated across six-lane intercity corridors under mixed traffic conditions in Western India.',
  },
  {
    id: 'pub-02',
    category: 'journal',
    categoryLabel: 'JOURNAL ARTICLES',
    badge: 'JOURNAL / 2024',
    title: 'PROACTIVE CORRIDOR CRASH RISK MODELING',
    authors: 'Dr. Ashish Dhamaniya, Dr. Shriniwas S. Arkatkar, Maitrik Bhadresa',
    venue: 'Accident Analysis & Prevention (Elsevier) • Vol. 196',
    identifier: 'DOI: 10.1016/j.aap.2024.107428 • Q1 Journal',
    scope: 'SURROGATE SAFETY • BLACKSPOT DIAGNOSTICS',
    image: '/images/Road Safety Audit.jpg',
    imageAlt: 'Highway corridor safety geometry and signage assessment',
    summary:
      'Integrates Unmanned Aerial Vehicle (UAV) trajectory extraction with Time-to-Collision (TTC) conflict thresholds to identify high-risk weaving and merge zones prior to crash occurrence.',
  },
  {
    id: 'pub-03',
    category: 'conference',
    categoryLabel: 'CONFERENCE PAPERS',
    badge: 'CONFERENCE / 2023',
    title: 'CONNECTED CORRIDOR SIGNAL OPTIMIZATION',
    authors: 'Dr. Gaurang J. Joshi, Krushnaraj Chaudhari, Dr. Ashish Dhamaniya',
    venue: 'Transportation Research Board (TRB) Annual Meeting • Washington, D.C.',
    identifier: 'TRB Paper No. 23-03194 • Compendium of Papers',
    scope: 'ATCS TIMING • QUEUE SPILLBACK MITIGATION',
    image: '/images/Smart Mobility.jpg',
    imageAlt: 'Adaptive urban intersection control and detector network',
    summary:
      'Evaluates platoon-responsive adaptive signal plans along high-density BRT and mixed-traffic arterials in Surat, demonstrating measurable reductions in intersection control delay.',
  },
  {
    id: 'pub-04',
    category: 'report',
    categoryLabel: 'TECHNICAL REPORTS',
    badge: 'REPORT / 2023',
    title: 'COMPREHENSIVE MOBILITY PLAN METHODOLOGY',
    authors: 'Dr. Gaurang J. Joshi, TEP Consultancy Cell, SVNIT Surat',
    venue: 'SVNIT–MOUD Statutory Consultancy Monograph • Gujarat Urban Nodes',
    identifier: 'TEP-TR-2023-11 • Statutory Planning Guideline',
    scope: 'FOUR-STAGE MODELING • TRANSIT ORIENTED NODES',
    image: '/images/Transportation.jpg',
    imageAlt: 'Regional multi-modal urban transit interchange corridor',
    summary:
      'Standardized household travel survey sampling, mode-choice utility calibration, and multimodal network assignment protocols prepared for municipal corporations and Smart City SPVs.',
  },
  {
    id: 'pub-05',
    category: 'conference',
    categoryLabel: 'CONFERENCE PAPERS',
    badge: 'CONFERENCE / 2023',
    title: 'MULTIMODAL RAIL TERMINAL ACCESSIBILITY',
    authors: 'Siddharth Umrigar, Dr. Gaurang J. Joshi, Maitrik Bhadresa',
    venue: 'World Conference on Transport Research (WCTR) • Montreal',
    identifier: 'WCTR-2023-814 • Track B2 Passenger Transport',
    scope: 'PEDESTRIAN LOS • STATION CATCHMENT INTEGRATION',
    image: '/images/Rail Services.jpg',
    imageAlt: 'High-capacity urban rail transit platform and concourse',
    summary:
      'Quantifies first- and last-mile feeder transfer penalties around high-speed and suburban railway stations, establishing Station Accessibility Index benchmarks for Indian cities.',
  },
  {
    id: 'pub-06',
    category: 'chapter',
    categoryLabel: 'BOOK CHAPTERS',
    badge: 'CHAPTER / 2022',
    title: 'BIM & UAV SURVEYING IN GEOMETRIC AUDITS',
    authors: 'Dr. Ashish Dhamaniya, Krushnaraj Chaudhari, TEP Geomatics Group',
    venue: 'Springer Lecture Notes in Civil Engineering • Advances in Geomatics',
    identifier: 'ISBN 978-981-19-4210-5 • Ch. 14',
    scope: 'POINT CLOUD ALIGNMENT • IRC GEOMETRIC CHECKS',
    image: '/images/Surveying.jpg',
    imageAlt: 'Precision topographic and corridor alignment surveying',
    summary:
      'Documents workflow automation from RTK-drone orthomosaics to Civil 3D stopping sight distance verification and IRC:SP:84/SP:88 compliance reporting on brownfield highways.',
  },
];

const FILTERS = [
  { key: 'all', label: 'ALL' },
  { key: 'journal', label: 'JOURNAL ARTICLES' },
  { key: 'conference', label: 'CONFERENCE PAPERS' },
  { key: 'report', label: 'TECHNICAL REPORTS' },
  { key: 'chapter', label: 'BOOK CHAPTERS' },
];

const ARCHIVE_REPOSITORIES = [
  {
    index: '01',
    title: 'HIGHWAY CAPACITY & LEVEL OF SERVICE',
    scope: 'Indo-HCM Calibration / Mixed-Traffic PCU',
    description:
      'Peer-reviewed formulations for multilane highways, signalized intersections, and urban mid-block segments across Gujarat and national expressways.',
    tags: 'ASCE • TRR • INDO-HCM',
  },
  {
    index: '02',
    title: 'ROAD SAFETY & SURROGATE CONFLICT ANALYTICS',
    scope: 'Blackspot Remediation / Proactive Risk Models',
    description:
      'Empirical crash-modification models, pedestrian crossing risk indices, and IRC:SP:88 stage-wise audit frameworks validated on NHAI corridors.',
    tags: 'ELSEVIER AAP • IRC:SP:88',
  },
  {
    index: '03',
    title: 'URBAN PUBLIC TRANSIT & ACCESSIBILITY',
    scope: 'BRTS Operations / Multimodal Integration',
    description:
      'Service reliability metrics, headways under mixed bus-bay interference, and feeder catchment demand forecasting for Metro and BRTS networks.',
    tags: 'WCTR • TRANSPORT POLICY',
  },
  {
    index: '04',
    title: 'STATUTORY CODES & CONSULTANCY MONOGRAPHS',
    scope: 'Technical Reports / Policy Briefs',
    description:
      'Peer-reviewed technical reports, corridor DPR methodologies, and municipal mobility guidelines submitted to State PWD, NHAI, and MoRTH.',
    tags: 'MORTH • NHAI • SVNIT TEP',
  },
];

export default function Publications() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedCards, setExpandedCards] = useState({});

  const visiblePublications =
    activeFilter === 'all'
      ? PUBLICATIONS_DATA
      : PUBLICATIONS_DATA.filter((item) => item.category === activeFilter);

  const toggleDetails = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      {/* PAGE HERO HEADER */}
      <section className="w-full border-b border-outline bg-surface">
        <div className="max-w-[1440px] mx-auto p-gutter-lg lg:p-gutter-xl flex flex-col gap-gutter-md">
          <div className="flex items-center gap-gutter-sm">
            <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true" />
            <span className="font-label text-label-md uppercase text-on-surface-variant">
              PUBLICATIONS — TEP · SVNIT, SURAT
            </span>
          </div>
          <h1 className="font-display text-display-md-mobile lg:text-[40px] xl:text-[48px] lg:leading-[1.1] font-semibold tracking-tight uppercase text-on-surface">
            PEER-REVIEWED PAPERS, IRC CODES &amp; MONOGRAPHS.
          </h1>
          <p className="font-body text-body-md text-on-surface-variant max-w-3xl text-pretty pt-gutter-xs">
            Indexed journal articles, international conference proceedings, and statutory technical reports authored by the Transportation Engineering &amp; Planning Research &amp; Consultancy Cell at SVNIT Surat.
          </p>
        </div>
      </section>

      {/* SECTION 1: PUBLICATIONS GRID WITH SORT/FILTER */}
      <section className="w-full py-section bg-surface border-b border-outline" id="publications-grid">
        <div className="max-w-[1440px] mx-auto px-page-margin">
          {/* Header & Category Filter Strip */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-outline pb-gutter-md mb-gutter-xl gap-gutter-md">
            <div>
              <div className="font-label text-label-sm uppercase text-brand-green mb-gutter-xs">
                RESEARCH OUTPUT &amp; CITATIONS
              </div>
              <h2 className="font-headline text-headline-lg uppercase">
                PUBLISHED WORKS
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-gutter-xs" role="group" aria-label="Filter publications by type">
              <span className="font-label text-label-sm uppercase text-on-surface-variant mr-gutter-sm">
                SORT BY :
              </span>
              {FILTERS.map((filter) => {
                const isActive = activeFilter === filter.key;
                return (
                  <button
                    key={filter.key}
                    type="button"
                    onClick={() => setActiveFilter(filter.key)}
                    className={`cursor-pointer border font-label text-label-sm uppercase px-gutter-md py-gutter-sm transition-colors duration-150 ${
                      isActive
                        ? 'bg-brand-green text-on-brand-green border-brand-green'
                        : 'bg-surface border-outline text-on-surface hover:border-brand-green'
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2-Column Publication Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter-lg items-start" id="publications-cards">
            {visiblePublications.map((item) => {
              const isExpanded = !!expandedCards[item.id];
              return (
                <article
                  key={item.id}
                  className="bg-surface-container border border-outline flex flex-col justify-between"
                >
                  <div className="relative h-[240px] sm:h-[320px] overflow-hidden border-b border-outline bg-surface-dark">
                    <img
                      alt={item.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                      src={item.image}
                    />
                    <div className="absolute top-gutter-md left-gutter-md bg-surface-dark/90 border border-outline-dark px-gutter-sm py-gutter-xs">
                      <span className="font-label text-label-sm text-on-surface-dark uppercase">
                        {item.badge}
                      </span>
                    </div>

                    {/* Title Tab + Toggle Control aligned cleanly on bottom edge */}
                    <div className="absolute -bottom-[2px] left-0 right-0 flex items-end justify-between">
                      <button
                        type="button"
                        onClick={() => toggleDetails(item.id)}
                        aria-expanded={isExpanded}
                        className="cursor-pointer text-left bg-brand-green text-on-brand-green hover:opacity-95 transition-opacity notch-title-tab pt-gutter-sm pb-[calc(theme(spacing.gutter-sm)+2px)] pl-gutter-md pr-8 sm:pr-gutter-xl max-w-[calc(100%-48px)]"
                      >
                        <h3 className="font-headline text-sm sm:text-headline-sm uppercase leading-tight">
                          {item.title}
                        </h3>
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleDetails(item.id)}
                        aria-expanded={isExpanded}
                        aria-label={`Toggle publication details for ${item.title}`}
                        className="cursor-pointer bg-surface-dark text-on-surface-dark hover:bg-brand-green hover:text-on-brand-green transition-colors w-10 h-10 mb-[2px] flex items-center justify-center border-t border-l border-outline-dark shrink-0 font-headline text-headline-md"
                      >
                        {isExpanded ? '-' : '+'}
                      </button>
                    </div>
                  </div>

                  {/* Collapsible Abstract & Bibliographic Details Drawer */}
                  {isExpanded && (
                    <div className="p-gutter-md bg-surface border-t border-outline animate-fade-in">
                      <div className="font-label text-label-sm uppercase text-brand-green mb-gutter-xs">
                        {item.scope}
                      </div>
                      <p className="font-body text-body-sm text-on-surface-variant mb-gutter-md">
                        {item.summary}
                      </p>
                      <div className="border-t border-outline pt-gutter-sm space-y-1 font-label text-label-sm">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-on-surface">
                          <span className="text-on-surface-variant">AUTHORS:</span>
                          <span className="sm:text-right">{item.authors}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-on-surface">
                          <span className="text-on-surface-variant">VENUE:</span>
                          <span className="sm:text-right">{item.venue}</span>
                        </div>
                      </div>
                      <div className="mt-gutter-md pt-gutter-sm border-t border-outline flex flex-wrap justify-between items-center gap-2 font-label text-label-sm">
                        <span className="text-on-surface">{item.identifier}</span>
                        <Link
                          to="/contact"
                          className="text-brand-green hover:opacity-80 transition-opacity uppercase font-medium"
                        >
                          REQUEST REPRINT →
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

      {/* SECTION 2: PUBLICATION ARCHIVE & RESEARCH TRACKS (Dark Surface) */}
      <section className="w-full py-section bg-surface-dark blueprint-grid-dark text-on-surface-dark" id="publication-archive">
        <div className="max-w-[1440px] mx-auto px-page-margin">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-outline-dark pb-gutter-md mb-gutter-xl">
            <div>
              <div className="font-label text-label-sm uppercase text-brand-green mb-gutter-xs">
                RESEARCH &amp; CODES REPOSITORY
              </div>
              <h2 className="font-headline text-headline-lg uppercase">
                PUBLICATION TRACKS &amp; ARCHIVES
              </h2>
            </div>
            <div className="mt-gutter-sm md:mt-0 border border-brand-green bg-brand-green px-gutter-sm py-gutter-xs self-start">
              <span className="font-label text-label-sm uppercase text-on-brand-green">
                SVNIT PUBLICATIONS ARCHIVE
              </span>
            </div>
          </div>

          {/* 4-Row Indexed Table */}
          <div className="border-t border-outline-dark">
            {ARCHIVE_REPOSITORIES.map((track) => (
              <div
                key={track.index}
                className="grid grid-cols-1 md:grid-cols-12 border-b border-outline-dark py-gutter-lg gap-gutter-md items-center hover:bg-surface-dark-elevated transition-colors px-gutter-sm"
              >
                <div className="md:col-span-1 font-label text-label-md text-brand-green">
                  {track.index}
                </div>
                <div className="md:col-span-4 font-headline text-headline-sm uppercase">
                  {track.title}
                </div>
                <div className="md:col-span-2 font-label text-label-sm text-on-surface-dark-muted uppercase">
                  {track.scope}
                </div>
                <div className="md:col-span-3 font-body text-body-sm text-on-surface-dark-muted">
                  {track.description}
                </div>
                <div className="md:col-span-2 flex md:justify-end">
                  <span className="font-label text-label-sm uppercase border border-outline-dark px-gutter-sm py-gutter-xs text-on-surface-dark">
                    {track.tags}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: CONSULTATION CTA BANNER */}
      <section className="w-full pt-section pb-12 lg:pb-20 bg-surface-dark border-t border-outline-dark text-on-surface-dark relative overflow-hidden" id="consultation-cta">
        <div className="max-w-[1440px] mx-auto px-page-margin grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">
          <div className="lg:col-span-8">
            <h2 className="font-display text-display-md-mobile lg:text-display-md uppercase mb-gutter-md">
              COLLABORATE WITH SVNIT RESEARCHERS.
            </h2>
            <p className="font-body text-body-md text-on-surface-dark-muted max-w-[54ch] mb-gutter-lg">
              Request full-text reprints, sponsor empirical corridor studies, or engage our faculty team for specialized transportation engineering investigations.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-brand-green text-on-brand-green chamfer-card font-label text-label-md uppercase px-gutter-xl py-gutter-md hover:opacity-90 transition-opacity"
            >
              REQUEST A CONSULTATION →
            </Link>
          </div>
          <div className="lg:col-span-4 border border-outline-dark bg-surface-dark-elevated p-gutter-md">
            <img
              alt="Infrastructure corridor engineering reference"
              className="w-full h-[180px] object-cover"
              src="/images/Hero_3.jpg"
            />
          </div>
        </div>
      </section>
    </>
  );
}
