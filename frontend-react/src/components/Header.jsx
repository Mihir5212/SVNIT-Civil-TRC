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
      <div className="flex items-center justify-between gap-2 px-3 sm:px-gutter-md lg:px-gutter-lg py-2 sm:py-2.5 bg-white/95 backdrop-blur-[20px] backdrop-saturate-[180%] border-b border-outline">
        {/* Dual Logos (SVNIT + TEP) & Official Cell Title */}
        <Link to="/" aria-label="TEP Research & Consultancy Cell, Department of Civil Engineering, SVNIT Surat" className="inline-flex items-center min-w-0 flex-1 pr-2">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 shrink-0">
            <img
              src="/svnit-logo.png"
              alt="SVNIT Surat"
              className="w-7 h-7 sm:w-9 sm:h-9 object-contain shrink-0"
            />
            <img
              src="/TEP Logo.jpeg"
              alt="TEP Research & Consultancy Cell"
              className="w-7 h-7 sm:w-9 sm:h-9 object-contain mix-blend-multiply shrink-0"
            />
          </div>
          <div className="ml-2 sm:ml-2.5 flex flex-col leading-tight min-w-0">
            <span className="font-display text-xs sm:text-[15px] font-bold text-brand-green tracking-tight leading-[1.15]">
              TEP Research &amp; Consultancy Cell
            </span>
            <span className="font-label text-[9.5px] sm:text-[11px] text-on-surface font-medium tracking-normal leading-[1.2] mt-0.5">
              <span className="sm:hidden">Department of Civil Engg. &bull; SVNIT Surat</span>
              <span className="hidden sm:inline">Department of Civil Engineering &bull; SVNIT Surat</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation (8 Items) */}
        <nav className="hidden xl:flex items-center gap-4 2xl:gap-6" aria-label="Primary navigation">
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? isHomePage
                : location.pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                to={item.href}
                className={`whitespace-nowrap font-label text-[13px] 2xl:text-[14px] uppercase tracking-wider transition-all duration-state-change ${
                  item.href === '/contact'
                    ? `chamfer-btn inline-flex items-center justify-center gap-1.5 px-5 py-2 font-semibold text-on-brand-green hover:text-on-brand-green ${
                        isActive ? 'bg-brand-green-dark' : 'bg-brand-green hover:bg-brand-green-dark'
                      }`
                    : isActive
                    ? 'text-brand-green font-semibold hover:text-brand-green'
                    : 'text-on-surface font-medium hover:text-brand-green'
                }`}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile / Tablet 3-Line Hamburger Button */}
        <button
          id="open-menu-btn"
          type="button"
          className="xl:hidden chamfer-btn inline-flex items-center justify-center w-10 h-10 bg-brand-green text-on-brand-green hover:bg-brand-green-dark transition-colors duration-state-change shrink-0 cursor-pointer"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={isMenuOpen}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" aria-hidden="true">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {/* Mobile / Tablet Menu Drawer (Slides smoothly down from top) */}
      <div
        id="menu-drawer"
        data-lenis-prevent
        className={`fixed inset-0 z-50 flex flex-col justify-between p-gutter-lg sm:p-gutter-xl bg-surface-dark text-on-surface-dark transition-all duration-300 ease-out overflow-y-auto ${
          isMenuOpen
            ? 'translate-y-0 opacity-100 visible pointer-events-auto'
            : '-translate-y-full opacity-95 invisible pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isMenuOpen}
        aria-label="Navigation menu"
      >
        <div className="flex items-center justify-between gap-2 border-b border-outline-dark pb-gutter-md sm:pb-gutter-lg">
          <Link to="/" aria-label="TEP Research & Consultancy Cell Home" className="inline-flex items-center min-w-0 flex-1" onClick={() => setIsMenuOpen(false)}>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white px-2 py-1 rounded-sm shrink-0">
              <img src="/svnit-logo.png" alt="SVNIT Surat" className="w-7 h-7 sm:w-8 sm:h-8 object-contain" />
              <img src="/TEP Logo.jpeg" alt="TEP Cell" className="w-7 h-7 sm:w-8 sm:h-8 object-contain" />
            </div>
            <div className="ml-2.5 sm:ml-3 flex flex-col leading-tight min-w-0">
              <span className="font-display text-sm sm:text-base font-bold text-on-surface-dark truncate">TEP Research &amp; Consultancy Cell</span>
              <span className="font-label text-[10px] sm:text-[11px] text-on-surface-dark/90 truncate">
                <span className="sm:hidden">Department of Civil Engg. &bull; SVNIT Surat</span>
                <span className="hidden sm:inline">Department of Civil Engineering &bull; SVNIT Surat</span>
              </span>
            </div>
          </Link>
          <button
            id="close-menu-btn"
            type="button"
            className="chamfer-btn inline-flex items-center gap-gutter-xs sm:gap-gutter-sm bg-brand-green text-on-brand-green hover:bg-brand-green-dark px-3.5 sm:px-gutter-md py-1.5 sm:py-gutter-xs font-label text-[11px] sm:text-label-md uppercase tracking-wider shrink-0 cursor-pointer transition-colors duration-state-change"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <span>CLOSE</span>
            <span className="material-symbols-outlined text-body-md" aria-hidden="true">close</span>
          </button>
        </div>
        <nav aria-label="Primary drawer navigation" className="flex flex-col divide-y divide-outline-dark my-auto max-w-2xl py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="drawer-link py-3 font-display text-xl sm:text-2xl uppercase hover:text-brand-green transition-colors duration-state-change"
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
