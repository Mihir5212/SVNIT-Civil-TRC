import { Link } from 'react-router-dom';

const NEWS_ITEMS = [
  {
    date: 'NOVEMBER 2026',
    tag: 'WORKSHOP',
    title: 'Five-Day Executive Workshop on IRC:SP:88 Road Safety Audits & Blackspot Engineering',
    summary: 'TEP Research & Consultancy Cell hosted engineers from NHAI, R&B Gujarat, and municipal corporations for hands-on field safety inspection training.',
    image: '/images/Road Safety Audit.jpg',
  },
  {
    date: 'OCTOBER 2026',
    tag: 'PROJECT MILESTONE',
    title: 'Completion of 66-km Surat Outer Ring Road Structural & Geometric Safety Verification',
    summary: 'Submitted final independent verification and Falling Weight Deflectometer (FWD) overlay recommendations to Surat Urban Development Authority (SUDA).',
    image: '/images/Transportation.jpg',
  },
  {
    date: 'AUGUST 2026',
    tag: 'RESEARCH',
    title: 'AI Edge-Vision Traffic Conflict Telemetry Deployed across Major Surat Corridors',
    summary: 'Real-time trajectory extraction and Post-Encroachment Time (PET) conflict indicators integrated for proactive urban intersection safety.',
    image: '/images/Smart Mobility.jpg',
  },
];

const News = () => {
  return (
    <main id="main" className="min-h-screen bg-surface text-on-surface">
      <section className="relative bg-brand-green text-on-brand-green py-16 px-gutter-lg border-b border-outline">
        <div className="max-w-[1280px] mx-auto">
          <div className="font-label text-label-sm uppercase tracking-widest text-on-brand-green/75 mb-2">
            <Link to="/" className="hover:underline">Home</Link> <span className="mx-1">&rsaquo;</span> News
          </div>
          <h1 className="font-display text-display-md-mobile lg:text-display-lg uppercase">Latest News &amp; Updates</h1>
          <p className="font-body text-body-sm text-on-brand-green/85 max-w-2xl mt-3">
            Announcements, technical workshops, consultancy milestones, and research highlights from SVNIT Surat.
          </p>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-gutter-lg py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-lg">
          {NEWS_ITEMS.map((item, idx) => (
            <article key={idx} className="bg-surface border border-outline flex flex-col overflow-hidden group hover:border-brand-green transition-colors">
              <div className="h-52 overflow-hidden bg-surface-dark">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-gutter-lg flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center justify-between font-label text-[10px] uppercase tracking-wider text-brand-green mb-2">
                    <span>{item.tag}</span>
                    <span className="text-on-surface-variant">{item.date}</span>
                  </div>
                  <h2 className="font-headline text-headline-sm uppercase leading-snug mb-2">{item.title}</h2>
                  <p className="font-body text-body-sm text-on-surface-variant">{item.summary}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default News;
