import { Link } from 'react-router-dom';

const CURRENT_YEAR = new Date().getFullYear();

const Footer = () => {
  return (
    <footer id="site-footer" className="relative bg-brand-green text-on-brand-green">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column with Top-Right Chamfered Step */}
        <div className="lg:col-span-4 relative bg-brand-green p-gutter-xl pt-gutter-xl pb-gutter-xl flex flex-col justify-between gap-12 lg:border-r border-on-brand-green/25">
          {/* Chamfered Step Overlapping Dark CTA Banner */}
          <div
            className="hidden lg:block absolute -top-10 left-0 right-0 h-10 bg-brand-green"
            style={{ clipPath: 'polygon(0 0, calc(100% - 40px) 0, 100% 100%, 0 100%)' }}
            aria-hidden="true"
          />

          <div className="flex flex-col items-start gap-gutter-lg">
            <p className="font-body text-body-sm uppercase leading-relaxed text-on-brand-green max-w-xs text-pretty" data-design-text-token="body-sm">
              BUILDING STRONGER FOUNDATIONS FOR BUSINESSES, COMMUNITIES, AND FUTURE GROWTH.
            </p>
            <Link
              to="/contact"
              data-component-id="button-secondary"
              data-component-type="button"
              data-component-variant="secondary"
              className="inline-flex items-center justify-center gap-gutter-sm bg-primary text-on-primary px-gutter-md py-gutter-sm font-label text-label-md uppercase tracking-wider hover:bg-surface hover:text-on-surface transition-colors duration-state-change ease-state-change"
            >
              <span data-design-text-token="label-md">GET IN TOUCH</span>
              <span className="material-symbols-outlined text-body-md" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>

          {/* Dual Institutional Brand Logos Side by Side (SVNIT Surat + TEP Cell) */}
          <div className="pt-gutter-lg flex flex-col items-start gap-4">
            <div className="inline-flex items-center gap-4 bg-white px-4 py-3 border border-outline chamfer-card shadow-sm">
              <img
                src="/svnit-logo.png"
                alt="SVNIT Surat Crest"
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
              />
              <div className="w-px h-14 bg-outline/60" aria-hidden="true" />
              <img
                src="/TEP Logo.jpeg"
                alt="TEP Research & Consultancy Cell Logo"
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
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

        {/* Right Column: Indented Navigation, Socials & Legal */}
        <div className="lg:col-span-8 p-gutter-xl lg:pl-32 lg:pr-gutter-xl lg:pt-12 flex flex-col justify-between gap-16">
          <div>
            <nav aria-label="Footer navigation">
              <ul className="divide-y divide-on-brand-green/25 border-b border-on-brand-green/25">
                <li>
                  <Link to="/services" className="block py-gutter-md font-label text-label-md uppercase tracking-wider text-on-brand-green hover:opacity-75 transition-opacity" data-design-text-token="label-md">
                    SERVICES
                  </Link>
                </li>
                <li>
                  <Link to="/projects" className="block py-gutter-md font-label text-label-md uppercase tracking-wider text-on-brand-green hover:opacity-75 transition-opacity" data-design-text-token="label-md">
                    RESEARCH &amp; PROJECTS
                  </Link>
                </li>
                <li>
                  <Link to="/publications" className="block py-gutter-md font-label text-label-md uppercase tracking-wider text-on-brand-green hover:opacity-75 transition-opacity" data-design-text-token="label-md">
                    PUBLICATIONS
                  </Link>
                </li>
                <li>
                  <Link to="/news" className="block py-gutter-md font-label text-label-md uppercase tracking-wider text-on-brand-green hover:opacity-75 transition-opacity" data-design-text-token="label-md">
                    NEWS
                  </Link>
                </li>
                <li>
                  <Link to="/team" className="block py-gutter-md font-label text-label-md uppercase tracking-wider text-on-brand-green hover:opacity-75 transition-opacity" data-design-text-token="label-md">
                    TEAM
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="block py-gutter-md font-label text-label-md uppercase tracking-wider text-on-brand-green hover:opacity-75 transition-opacity" data-design-text-token="label-md">
                    GALLERY
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="block py-gutter-md font-label text-label-md uppercase tracking-wider text-on-brand-green hover:opacity-75 transition-opacity" data-design-text-token="label-md">
                    CONTACT US
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Social Links */}
            <div className="flex items-center gap-gutter-sm pt-gutter-lg">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-6 h-6 bg-primary text-on-primary flex items-center justify-center font-label text-label-sm font-semibold hover:bg-surface hover:text-on-surface transition-colors">
                in
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="w-6 h-6 bg-primary text-on-primary flex items-center justify-center font-label text-label-sm font-semibold hover:bg-surface hover:text-on-surface transition-colors">
                X
              </a>
            </div>
          </div>

          {/* Bottom Legal Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-gutter-md pt-gutter-xl">
            <span className="font-label text-label-sm uppercase text-on-brand-green" data-design-text-token="label-sm">
              © {CURRENT_YEAR} TEP RESEARCH &amp; CONSULTANCY CELL &bull; SVNIT SURAT. ALL RIGHTS RESERVED.
            </span>
            <div className="flex items-center gap-gutter-lg">
              <a href="#site-footer" className="font-label text-label-sm uppercase text-on-brand-green hover:underline" data-design-text-token="label-sm">PRIVACY POLICY</a>
              <a href="#site-footer" className="font-label text-label-sm uppercase text-on-brand-green hover:underline" data-design-text-token="label-sm">TERMS &amp; CONDITIONS</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
