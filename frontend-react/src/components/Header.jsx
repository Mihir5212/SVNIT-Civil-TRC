import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { href: '/', label: 'HOME' },
    { href: '/about', label: 'ABOUT' },
    { href: '/services', label: 'SERVICES' },
    { href: '/projects', label: 'PROJECTS' },
    { href: '/contact', label: 'CONTACT' },
  ];

  const isHomePage = location.pathname === '/';

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isHomePage ? 'absolute' : 'sticky'
    }`}>
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-gutter-lg py-gutter-md bg-white/80 backdrop-blur-[20px] backdrop-saturate-[180%] border-b border-outline">
        {/* Logo */}
        <Link to="/" aria-label="TRC SVNIT Home" className="inline-flex items-center">
          <svg className="w-10 h-10 text-brand-green" viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
            <path d="M16 4H48L60 16V24H44V18H20V46H44V36H32V26H60V48L48 60H16L4 48V16L16 4Z" />
          </svg>
          <span className="ml-2 font-display text-headline-md text-brand-green hidden sm:block">TRC SVNIT</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-gutter-lg" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`font-label text-label-md uppercase tracking-wider transition-colors duration-state-change hover:text-brand-green ${
                location.pathname === item.href || (item.href === '/' && isHomePage)
                  ? 'text-brand-green'
                  : 'text-on-surface'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-gutter-sm bg-brand-green text-on-brand-green px-gutter-md py-gutter-xs font-label text-label-md uppercase tracking-wider hover:bg-brand-green-dark transition-colors duration-state-change"
          >
            <span>GET IN TOUCH</span>
            <span className="material-symbols-outlined text-body-md" aria-hidden="true">arrow_forward</span>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          id="open-menu-btn"
          type="button"
          className="lg:hidden inline-flex items-center justify-center gap-gutter-sm bg-brand-green text-on-brand-green px-gutter-md py-gutter-xs font-label text-label-md uppercase tracking-wider"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
        >
          <span>MENU</span>
          <span className="material-symbols-outlined text-body-md" aria-hidden="true">menu</span>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        id="menu-drawer"
        className={`fixed inset-0 z-50 flex-col justify-between p-gutter-xl bg-surface-dark text-on-surface-dark transition-all duration-300 ${
          isMenuOpen ? 'flex' : 'hidden'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex items-center justify-between border-b border-outline-dark pb-gutter-lg">
          <Link to="/" aria-label="TRC SVNIT Home" className="inline-flex items-center" onClick={() => setIsMenuOpen(false)}>
            <svg className="w-10 h-10 text-brand-green" viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
              <path d="M16 4H48L60 16V24H44V18H20V46H44V36H32V26H60V48L48 60H16L4 48V16L16 4Z" />
            </svg>
          </Link>
          <button
            id="close-menu-btn"
            type="button"
            className="inline-flex items-center gap-gutter-sm bg-brand-green text-on-brand-green px-gutter-md py-gutter-xs font-label text-label-md uppercase tracking-wider"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <span>CLOSE</span>
            <span className="material-symbols-outlined text-body-md" aria-hidden="true">close</span>
          </button>
        </div>
        <nav aria-label="Primary drawer navigation" className="flex flex-col divide-y divide-outline-dark my-auto max-w-2xl">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="drawer-link py-gutter-md font-display text-display-md-mobile uppercase hover:text-brand-green transition-colors duration-state-change"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-between border-t border-outline-dark pt-gutter-md font-label text-label-sm text-on-surface-dark-muted uppercase">
          <span>SURAT, IN — EST. 2010</span>
          <span>TRC SVNIT</span>
        </div>
      </div>
    </header>
  );
};

export default Header;