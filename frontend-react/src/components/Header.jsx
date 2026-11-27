import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/projects', label: 'Research & Projects' },
    { href: '/publications', label: 'Publications' },
    { href: '/news', label: 'News' },
    { href: '/team', label: 'Team' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact Us' },
  ];

  const isHomePage = location.pathname === '/';

  return (
    <header className="sticky top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-gutter-md lg:px-gutter-lg py-2.5 bg-white/95 backdrop-blur-[20px] backdrop-saturate-[180%] border-b border-outline">
        {/* Dual Logos (SVNIT + TEP) & Official Cell Title */}
        <Link to="/" aria-label="TEP Research & Consultancy Cell, Department of Civil Engineering, SVNIT Surat" className="inline-flex items-center shrink-0">
          <div className="inline-flex items-center gap-2 shrink-0">
            <img
              src="/svnit-logo.png"
              alt="SVNIT Surat"
              className="w-9 h-9 object-contain shrink-0"
            />
            <img
              src="/TEP Logo.jpeg"
              alt="TEP Research & Consultancy Cell"
              className="w-9 h-9 object-contain mix-blend-multiply shrink-0"
            />
          </div>
          <div className="ml-2.5 flex flex-col leading-tight">
            <span className="font-display text-sm sm:text-[15px] font-bold text-brand-green tracking-tight">
              TEP Research &amp; Consultancy Cell
            </span>
            <span className="font-label text-[10px] sm:text-[11px] text-on-surface font-medium tracking-normal">
              Department of Civil Engineering &bull; SVNIT Surat
            </span>
          </div>
        </Link>

        {/* Desktop Navigation (8 Items) */}
        <nav className="hidden xl:flex items-center gap-5" aria-label="Primary navigation">
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? isHomePage
                : location.pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                to={item.href}
                className={`whitespace-nowrap font-label text-[11px] uppercase tracking-wider transition-colors duration-state-change hover:text-brand-green ${
                  item.href === '/contact'
                    ? 'inline-flex items-center justify-center gap-1.5 bg-brand-green text-on-brand-green px-3.5 py-2 hover:bg-brand-green-dark hover:text-on-brand-green'
                    : isActive
                    ? 'text-brand-green font-semibold'
                    : 'text-on-surface'
                }`}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile / Tablet Menu Button */}
        <button
          id="open-menu-btn"
          type="button"
          className="xl:hidden inline-flex items-center justify-center gap-gutter-sm bg-brand-green text-on-brand-green px-gutter-md py-gutter-xs font-label text-label-md uppercase tracking-wider shrink-0 cursor-pointer"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
        >
          <span>MENU</span>
          <span className="material-symbols-outlined text-body-md" aria-hidden="true">menu</span>
        </button>
      </div>

      {/* Mobile / Tablet Menu Drawer */}
      <div
        id="menu-drawer"
        className={`fixed inset-0 z-50 flex-col justify-between p-gutter-xl bg-surface-dark text-on-surface-dark transition-all duration-300 overflow-y-auto ${
          isMenuOpen ? 'flex' : 'hidden'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex items-center justify-between border-b border-outline-dark pb-gutter-lg">
          <Link to="/" aria-label="TEP Research & Consultancy Cell Home" className="inline-flex items-center" onClick={() => setIsMenuOpen(false)}>
            <div className="inline-flex items-center gap-2 bg-white px-2 py-1 rounded-sm shrink-0">
              <img src="/svnit-logo.png" alt="SVNIT Surat" className="w-8 h-8 object-contain" />
              <img src="/TEP Logo.jpeg" alt="TEP Cell" className="w-8 h-8 object-contain" />
            </div>
            <div className="ml-3 flex flex-col leading-tight">
              <span className="font-display text-base font-bold text-on-surface-dark">TEP Research &amp; Consultancy Cell</span>
              <span className="font-label text-[11px] text-on-surface-dark/90">Department of Civil Engineering &bull; SVNIT Surat</span>
            </div>
          </Link>
          <button
            id="close-menu-btn"
            type="button"
            className="inline-flex items-center gap-gutter-sm bg-brand-green text-on-brand-green px-gutter-md py-gutter-xs font-label text-label-md uppercase tracking-wider shrink-0 cursor-pointer"
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
              className="drawer-link py-3.5 font-display text-2xl uppercase hover:text-brand-green transition-colors duration-state-change"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-between border-t border-outline-dark pt-gutter-md font-label text-label-sm text-on-surface-dark-muted uppercase">
          <span>SURAT, IN — EST. 2010</span>
          <span>TEP CELL &bull; SVNIT SURAT</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
