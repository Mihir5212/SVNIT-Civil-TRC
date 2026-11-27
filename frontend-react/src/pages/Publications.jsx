import { useState } from 'react';
import { Link } from 'react-router-dom';

const PUBLICATIONS = [
  { authors: 'Arkatkar, S. S., Joshi, G. J., Dhamaniya, A.', title: 'Crash Frequency & Surrogate Safety Modelling on Divided High-Speed Expressways in India', venue: 'Transportation Research Record, Vol. 2678', type: 'journal', year: 2026 },
  { authors: 'Joshi, G. J., Chaudhari, K.', title: 'Blackspot Identification & Multi-Stage IRC:SP:88 Road Safety Audit Methodology for NH-48', venue: 'IRC Highway Research Journal, New Delhi', type: 'conference', year: 2026 },
  { authors: 'Dhamaniya, A., Bhadresa, M.', title: 'Heterogeneous Mixed-Traffic Trajectory Extraction & Gap Acceptance Models via Computer Vision', venue: 'Journal of Transportation Engineering, ASCE', type: 'journal', year: 2025 },
  { authors: 'TRC SVNIT Consultancy Cell', title: 'Surat Outer Ring Road 66-km Corridor Traffic Capacity & FWD Structural Review Report', venue: 'Technical Evaluation Report for SUDA & SMC', type: 'report', year: 2025 },
  { authors: 'Arkatkar, S. S., Umrigar, S.', title: 'Vulnerable Road User (VRU) Conflict Evaluation Using Post-Encroachment Time at Urban Intersections', venue: 'Proceedings of TPMDC / CTRG Conference', type: 'conference', year: 2024 },
];

const TYPES = [
  { key: 'all', label: 'All Types' },
  { key: 'journal', label: 'Journal Articles' },
  { key: 'conference', label: 'Conference Papers' },
  { key: 'report', label: 'Technical Reports' },
];

const Publications = () => {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? PUBLICATIONS : PUBLICATIONS.filter((p) => p.type === filter);

  return (
    <main id="main" className="min-h-screen bg-surface text-on-surface">
      <section className="relative bg-brand-green text-on-brand-green py-16 px-gutter-lg border-b border-outline">
        <div className="max-w-[1280px] mx-auto">
          <div className="font-label text-label-sm uppercase tracking-widest text-on-brand-green/75 mb-2">
            <Link to="/" className="hover:underline">Home</Link> <span className="mx-1">&rsaquo;</span> Publications
          </div>
          <h1 className="font-display text-display-md-mobile lg:text-display-lg uppercase">Publications &amp; Research Papers</h1>
          <p className="font-body text-body-sm text-on-brand-green/85 max-w-2xl mt-3">
            Peer-reviewed journal articles, IRC conference proceedings, and technical consultancy reports authored by TEP Research &amp; Consultancy Cell, SVNIT Surat.
          </p>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-gutter-lg py-12">
        <div className="flex flex-wrap gap-2 mb-10">
          {TYPES.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setFilter(t.key)}
              className={`px-4 py-2 font-label text-label-sm uppercase tracking-wider border transition-colors ${
                filter === t.key
                  ? 'bg-brand-green text-on-brand-green border-brand-green'
                  : 'bg-surface text-on-surface border-outline hover:border-brand-green'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="divide-y divide-outline border-y border-outline">
          {filtered.map((pub, idx) => (
            <article key={idx} className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="px-2 py-0.5 bg-brand-green/10 text-brand-green font-label text-[10px] uppercase tracking-wider">
                    {pub.type}
                  </span>
                  <span className="font-label text-label-sm text-on-surface-variant tabular-nums">{pub.year}</span>
                </div>
                <h2 className="font-headline text-headline-sm text-on-surface">{pub.title}</h2>
                <p className="font-body text-body-sm text-on-surface-variant mt-1">{pub.authors}</p>
                <p className="font-label text-label-sm text-brand-green mt-1">{pub.venue}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Publications;
