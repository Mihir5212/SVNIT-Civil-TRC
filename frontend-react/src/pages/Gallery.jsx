import { useState } from 'react';
import { Link } from 'react-router-dom';

const GALLERY_ITEMS = [
  { image: '/images/Road Safety Audit.jpg', title: 'NH-48 Operation Stage Road Safety Inspection', category: 'site', place: 'Gujarat' },
  { image: '/images/Traffic Engineering.jpg', title: 'Arterial Corridor Classified Traffic Volume Survey', category: 'field', place: 'Surat, Gujarat' },
  { image: '/images/Surveying.jpg', title: 'Geodetic & Drone Photogrammetry Corridor Mapping', category: 'field', place: 'SVNIT Surat' },
  { image: '/images/Smart Mobility.jpg', title: 'ITS Computer Vision Telemetry Testing', category: 'workshop', place: 'SVNIT Surat' },
  { image: '/images/Transportation.jpg', title: 'Expressway Alignment Geometric Audit', category: 'site', place: 'Surat Ring Road' },
  { image: '/images/tep-about-photo.jpg', title: 'On-Site Safety Engineering Inspection Team', category: 'events', place: 'SVNIT Surat' },
];

const CATEGORIES = [
  { key: 'all', label: 'All Photos' },
  { key: 'field', label: 'Field Surveys' },
  { key: 'site', label: 'Site Inspections' },
  { key: 'workshop', label: 'Workshops' },
  { key: 'events', label: 'Events' },
];

const Gallery = () => {
  const [cat, setCat] = useState('all');
  const [selected, setSelected] = useState(null);

  const items = cat === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((g) => g.category === cat);

  return (
    <main id="main" className="min-h-screen bg-surface text-on-surface">
      <section className="relative bg-brand-green text-on-brand-green py-16 px-gutter-lg border-b border-outline">
        <div className="max-w-[1280px] mx-auto">
          <div className="font-label text-label-sm uppercase tracking-widest text-on-brand-green/75 mb-2">
            <Link to="/" className="hover:underline">Home</Link> <span className="mx-1">&rsaquo;</span> Gallery
          </div>
          <h1 className="font-display text-display-md-mobile lg:text-display-lg uppercase">Photo Gallery</h1>
          <p className="font-body text-body-sm text-on-brand-green/85 max-w-2xl mt-3">
            Field surveys, road safety audit site inspections, traffic laboratory studies, and academic workshops at SVNIT Surat.
          </p>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-gutter-lg py-12">
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => setCat(c.key)}
              className={`px-4 py-2 font-label text-label-sm uppercase tracking-wider border transition-colors ${
                cat === c.key
                  ? 'bg-brand-green text-on-brand-green border-brand-green'
                  : 'bg-surface text-on-surface border-outline hover:border-brand-green'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter-md">
          {items.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelected(item)}
              className="text-left group bg-surface border border-outline overflow-hidden hover:border-brand-green transition-colors"
            >
              <div className="h-60 overflow-hidden bg-surface-dark">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                />
              </div>
              <div className="p-gutter-md">
                <div className="font-label text-[10px] uppercase text-brand-green tracking-wider">{item.place}</div>
                <div className="font-headline text-sm uppercase mt-1">{item.title}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="max-w-4xl w-full bg-surface-dark border border-outline-dark p-4" onClick={(e) => e.stopPropagation()}>
            <img src={selected.image} alt={selected.title} className="w-full max-h-[75vh] object-contain" />
            <div className="flex items-center justify-between pt-3 text-on-surface-dark">
              <div>
                <div className="font-headline text-base uppercase">{selected.title}</div>
                <div className="font-label text-label-sm text-on-surface-dark-muted">{selected.place}</div>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="px-4 py-1.5 bg-brand-green text-on-brand-green font-label text-label-sm uppercase"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Gallery;
