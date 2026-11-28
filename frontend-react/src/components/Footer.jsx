import { Link } from 'react-router-dom';

const CURRENT_YEAR = new Date().getFullYear();

const PAGE_LINKS = [
  { to: '/', label: 'HOME' },
  { to: '/about', label: 'ABOUT US' },
  { to: '/projects', label: 'RESEARCH & PROJECTS' },
  { to: '/publications', label: 'PUBLICATIONS' },
  { to: '/news', label: 'NEWS' },
  { to: '/team', label: 'TEAM' },
  { to: '/gallery', label: 'GALLERY' },
  { to: '/contact', label: 'CONTACT US' },
];

const QUICK_LINKS = [
  { to: '/contact#inquiry-form', label: 'CONSULTANCY INQUIRY' },
  { to: '/team#consultants', label: 'FACULTY CONSULTANTS' },
  { to: '/about#certificates', label: 'ACCREDITATIONS & CERTIFICATES' },
  { href: 'https://www.svnit.ac.in', label: 'SVNIT OFFICIAL PORTAL ↗', external: true },
  { href: 'mailto:trc@svnit.ac.in', label: 'EMAIL: trc@svnit.ac.in', external: true },
  { href: 'tel:+912612259571', label: 'TEL: +91 261 225 9571', external: true },
];

const Footer = () => {
  return (
    <footer id="site-footer" className="relative bg-brand-green text-on-brand-green">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column with Top-Right Chamfered Step */}
        <div className="lg:col-span-4 relative bg-brand-green p-gutter-lg sm:p-gutter-xl flex flex-col justify-between gap-10 lg:gap-12 lg:border-r border-on-brand-green/25">
          {/* Chamfered Step Overlapping Dark CTA Banner */}
          <div
            className="hidden lg:block absolute -top-10 left-0 right-0 h-10 bg-brand-green"
            style={{ clipPath: 'polygon(0 0, calc(100% - 40px) 0, 100% 100%, 0 100%)' }}
            aria-hidden="true"
          />

          <div className="flex flex-col items-start gap-gutter-lg">
            <p className="font-body text-body-sm uppercase leading-relaxed text-on-brand-green max-w-xs text-pretty">
              BUILDING STRONGER FOUNDATIONS FOR BUSINESSES, COMMUNITIES, AND FUTURE GROWTH.
            </p>
            <Link
              to="/contact"
              className="chamfer-btn inline-flex items-center justify-center gap-gutter-sm bg-primary text-on-primary px-5 py-gutter-sm font-label text-label-md uppercase tracking-wider hover:bg-surface hover:text-on-surface transition-colors duration-state-change ease-state-change"
            >
              <span>GET IN TOUCH</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Dual Institutional Brand Logos Side by Side (SVNIT Surat + TEP Cell) */}
          <div className="pt-gutter-md sm:pt-gutter-lg flex flex-col items-start gap-4">
            <div className="inline-flex items-center gap-3 sm:gap-4 bg-white px-3 sm:px-4 py-2.5 sm:py-3 border border-outline chamfer-card shadow-sm">
              <img
                src="/svnit-logo.png"
                alt="SVNIT Surat Crest"
                className="w-12 h-12 sm:w-20 sm:h-20 object-contain"
              />
              <div className="w-px h-10 sm:h-14 bg-outline/60" aria-hidden="true" />
              <img
                src="/TEP Logo.jpeg"
                alt="TEP Research & Consultancy Cell Logo"
                className="w-12 h-12 sm:w-20 sm:h-20 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-base font-bold uppercase tracking-wide text-on-brand-green">
                TEP Research &amp; Consultancy Cell
              </span>
              <span className="font-label text-label-sm text-on-brand-green/85 mt-0.5">
                Department of Civil Engineering &bull; SVNIT Surat
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Two-Column Directory (Navigation + Quick Links) & Legal/Credit Row */}
        <div className="lg:col-span-8 p-gutter-lg sm:p-gutter-xl lg:pl-20 lg:pr-gutter-xl lg:pt-12 flex flex-col justify-between gap-10 lg:gap-12 border-t lg:border-t-0 border-on-brand-green/25">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter-xl">
            {/* Column 1: Pages */}
            <div>
              <div className="font-label text-label-sm uppercase tracking-widest text-on-brand-green/70 pb-gutter-sm border-b border-on-brand-green/35">
                PAGES
              </div>
              <nav aria-label="Footer navigation">
                <ul className="divide-y divide-on-brand-green/25 border-b border-on-brand-green/25">
                  {PAGE_LINKS.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className="block py-gutter-sm font-label text-label-md uppercase tracking-wider text-on-brand-green hover:opacity-75 transition-opacity"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Column 2: Quick Links & Contacts */}
            <div>
              <div className="font-label text-label-sm uppercase tracking-widest text-on-brand-green/70 pb-gutter-sm border-b border-on-brand-green/35">
                QUICK LINKS
              </div>
              <nav aria-label="Footer quick links">
                <ul className="divide-y divide-on-brand-green/25 border-b border-on-brand-green/25">
                  {QUICK_LINKS.map((item) => (
                    <li key={item.label}>
                      {item.external ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="block py-gutter-sm font-label text-label-md uppercase tracking-wider text-on-brand-green hover:opacity-75 transition-opacity"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          to={item.to}
                          className="block py-gutter-sm font-label text-label-md uppercase tracking-wider text-on-brand-green hover:opacity-75 transition-opacity"
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Social Links */}
              <div className="flex items-center gap-gutter-sm pt-gutter-lg">
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-7 h-7 bg-primary text-on-primary flex items-center justify-center font-label text-label-sm font-semibold hover:bg-surface hover:text-on-surface transition-colors"
                >
                  in
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                  className="w-7 h-7 bg-primary text-on-primary flex items-center justify-center font-label text-label-sm font-semibold hover:bg-surface hover:text-on-surface transition-colors"
                >
                  X
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Legal & Developer Credit Row */}
          <div className="border-t border-on-brand-green/30 pt-gutter-lg flex flex-col gap-gutter-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-gutter-md">
              <span className="font-label text-label-sm uppercase text-on-brand-green">
                © {CURRENT_YEAR} TEP RESEARCH &amp; CONSULTANCY CELL &bull; SVNIT SURAT. ALL RIGHTS RESERVED.
              </span>
              <div className="flex items-center gap-gutter-lg">
                <Link
                  to="/privacy-policy"
                  className="font-label text-label-sm uppercase text-on-brand-green hover:opacity-75 transition-opacity"
                >
                  PRIVACY POLICY
                </Link>
                <Link
                  to="/terms-and-conditions"
                  className="font-label text-label-sm uppercase text-on-brand-green hover:opacity-75 transition-opacity"
                >
                  TERMS &amp; CONDITIONS
                </Link>
              </div>
            </div>

            <div className="font-label text-label-sm uppercase text-on-brand-green/85">
              DESIGNED AND DEVELOPED BY{' '}
              <a
                href="https://www.linkedin.com/in/aryan-buha-874a5434b"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white hover:opacity-80 transition-opacity"
              >
                ARYAN BUHA
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
