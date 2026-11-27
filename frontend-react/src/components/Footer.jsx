import { Link } from 'react-router-dom';

const CURRENT_YEAR = new Date().getFullYear();

const Footer = () => {

  return (
    <footer id="contact" className="bg-brand-green text-on-brand-green relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 blueprint-grid-dark opacity-20 pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column */}
        <div className="lg:col-span-5 lg:border-r border-on-brand-green/25 p-gutter-lg lg:p-gutter-xl flex flex-col justify-between gap-gutter-xl">
          <div className="flex flex-col items-start gap-gutter-lg">
            <p className="font-body text-body-md uppercase text-on-brand-green max-w-xs text-pretty" data-design-text-token="body-md">
              BUILDING STRONGER FOUNDATIONS FOR COMMUNITIES, INFRASTRUCTURE, AND FUTURE GROWTH.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-gutter-sm bg-surface-dark text-on-surface-dark px-gutter-md py-gutter-sm font-label text-label-md uppercase tracking-wider hover:bg-surface-dark-elevated transition-colors duration-state-change"
            >
              <span>GET IN TOUCH</span>
              <span className="material-symbols-outlined text-body-md" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>

          <div className="pt-gutter-lg">
            <svg className="w-28 h-28 text-on-brand-green" viewBox="0 0 64 64" fill="currentColor" aria-label="TRC SVNIT Emblem">
              <path d="M16 4H48L60 16V24H44V18H20V46H44V36H32V26H60V48L48 60H16L4 48V16L16 4Z" />
            </svg>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-7 p-gutter-lg lg:p-gutter-xl flex flex-col justify-between gap-gutter-xl">
          <div>
            <nav aria-label="Footer navigation" className="flex flex-col divide-y divide-on-brand-green/25 border-b border-on-brand-green/25">
              <Link to="/services" className="py-gutter-sm font-headline text-headline-sm uppercase hover:pl-gutter-xs transition-all duration-state-change">
                SERVICES
              </Link>
              <Link to="/projects" className="py-gutter-sm font-headline text-headline-sm uppercase hover:pl-gutter-xs transition-all duration-state-change">
                PROJECTS
              </Link>
              <Link to="/about" className="py-gutter-sm font-headline text-headline-sm uppercase hover:pl-gutter-xs transition-all duration-state-change">
                ABOUT
              </Link>
              <Link to="/contact" className="py-gutter-sm font-headline text-headline-sm uppercase hover:pl-gutter-xs transition-all duration-state-change">
                CONTACT
              </Link>
            </nav>

            <div className="flex items-center gap-gutter-sm pt-gutter-lg">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="inline-flex items-center justify-center w-7 h-7 bg-surface-dark text-on-surface-dark font-label text-label-sm hover:bg-surface hover:text-on-surface transition-colors duration-state-change">
                <span className="material-symbols-outlined text-body-md" aria-hidden="true">linkedin</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="inline-flex items-center justify-center w-7 h-7 bg-surface-dark text-on-surface-dark font-label text-label-sm hover:bg-surface hover:text-on-surface transition-colors duration-state-change">
                <span className="material-symbols-outlined text-body-md" aria-hidden="true">alternate_email</span>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="inline-flex items-center justify-center w-7 h-7 bg-surface-dark text-on-surface-dark font-label text-label-sm hover:bg-surface hover:text-on-surface transition-colors duration-state-change">
                <span className="material-symbols-outlined text-body-md" aria-hidden="true">code</span>
              </a>
            </div>
          </div>

          <div className="border-t border-on-brand-green/25 pt-gutter-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-gutter-sm font-label text-label-sm uppercase">
            <span data-design-text-token="label-sm">© {CURRENT_YEAR} TRC SVNIT. ALL RIGHTS RESERVED.</span>
            <div className="flex items-center gap-gutter-lg">
              <a href="#privacy" className="hover:underline" data-design-text-token="label-sm">PRIVACY POLICY</a>
              <a href="#terms" className="hover:underline" data-design-text-token="label-sm">TERMS & CONDITIONS</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;