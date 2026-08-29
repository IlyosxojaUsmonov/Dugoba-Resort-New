import { useState, useEffect, useMemo, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { getAccommodations, resortInfo } from '@/data/accommodations';
import { groupCottagesByCategory, groupRoomsByCapacity } from '@/lib/accommodationGroups';
import { useTranslation } from '@/i18n/useTranslation';
import { useMagnetic } from '@/hooks/useMagnetic';
import logo from '@/atrof-muhit/dugobba.webp';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import NavMegaMenu from '@/components/NavMegaMenu';
import MobileNavAccordion from '@/components/MobileNavAccordion';

type DesktopMenuKey = 'cottages' | 'rooms' | null;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<DesktopMenuKey>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.3, 10);
  const { t, language } = useTranslation();

  const accommodations = useMemo(() => getAccommodations(language), [language]);
  const roomGroups = useMemo(
    () => groupRoomsByCapacity(accommodations.filter((a) => a.type === 'room')),
    [accommodations],
  );
  const cottageGroups = useMemo(
    () => groupCottagesByCategory(accommodations.filter((a) => a.type === 'cottage')),
    [accommodations],
  );

  const openDesktopMenu = (menu: DesktopMenuKey) => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDesktopMenu(menu);
  };

  const scheduleCloseDesktopMenu = () => {
    closeTimeoutRef.current = window.setTimeout(() => setActiveDesktopMenu(null), 150);
  };

  const closeDesktopMenu = () => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDesktopMenu(null);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current !== null) window.clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-2 2xl:px-3 py-2 text-[13px] 2xl:text-sm font-medium tracking-wide whitespace-nowrap transition-colors duration-300 ${
      isActive ? 'text-forest-300' : 'text-white/80 hover:text-white'
    }`;

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-3 text-base font-medium rounded-sm border transition-colors ${
      isActive
        ? 'bg-forest-50 border-forest-200 text-forest-700'
        : 'bg-white/60 border-stone-200 text-stone-700 hover:bg-stone-100 hover:text-stone-900'
    }`;

  const navLinks = [
    { to: '/', label: t('navbar.home') },
    { to: '/resort', label: t('navbar.resort') },
    { to: '/kottejlar', label: t('navbar.cottages') },
    { to: '/xonalar', label: t('navbar.rooms') },
    { to: '/tur-paketlari', label: t('navbar.tourPackages') },
    { to: '/qulayliklar', label: t('navbar.amenities') },
    { to: '/galereya', label: t('navbar.gallery') },
    { to: '/videolar', label: t('navbar.videos') },
    { to: '/tog-manzarasi', label: t('navbar.mountainViews') },
    { to: '/aloqa', label: t('navbar.contact') },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-stone-900/95 backdrop-blur-md shadow-2xl py-3'
          : 'bg-gradient-to-b from-stone-900/70 to-transparent py-5'
      }`}
    >
      <nav className="container-lux flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group shrink-0" onClick={() => setIsOpen(false)}>
          <div className="w-10 h-10 rounded-sm border-2 border-forest-300 flex items-center justify-center overflow-hidden transition-all group-hover:border-forest-400">
            <img src={logo} alt="Dugoba Resort" width={200} height={200} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-white text-xl font-semibold tracking-wide leading-none">
              Dugoba
            </span>
            <span className="text-[10px] text-forest-300 tracking-[0.3em] uppercase">Resort</span>
          </div>
        </Link>

        <div className="hidden xl:flex items-center gap-0.5">
          {navLinks.map((link) => {
            if (link.to === '/kottejlar') {
              return (
                <div
                  key={link.to}
                  className="relative"
                  onMouseEnter={() => openDesktopMenu('cottages')}
                  onMouseLeave={scheduleCloseDesktopMenu}
                >
                  <NavLink to={link.to} className={desktopLinkClass}>
                    {link.label}
                  </NavLink>
                  <NavMegaMenu
                    open={activeDesktopMenu === 'cottages'}
                    groups={cottageGroups}
                    viewAllTo="/kottejlar"
                    viewAllLabel={t('navbar.viewAllCottages')}
                    onNavigate={closeDesktopMenu}
                  />
                </div>
              );
            }
            if (link.to === '/xonalar') {
              return (
                <div
                  key={link.to}
                  className="relative"
                  onMouseEnter={() => openDesktopMenu('rooms')}
                  onMouseLeave={scheduleCloseDesktopMenu}
                >
                  <NavLink to={link.to} className={desktopLinkClass}>
                    {link.label}
                  </NavLink>
                  <NavMegaMenu
                    open={activeDesktopMenu === 'rooms'}
                    groups={roomGroups}
                    viewAllTo="/xonalar"
                    viewAllLabel={t('navbar.viewAllRooms')}
                    onNavigate={closeDesktopMenu}
                  />
                </div>
              );
            }
            return (
              <NavLink key={link.to} to={link.to} end={link.to === '/'} className={desktopLinkClass}>
                {link.label}
              </NavLink>
            );
          })}
        </div>

        <div className="hidden xl:flex items-center gap-3 shrink-0">
          <LanguageSwitcher variant="dark" />
          <a
            ref={ctaRef}
            href={`tel:${resortInfo.phone.replace(/\s/g, '')}`}
            className="flex items-center gap-2 px-3 2xl:px-4 py-2 border border-forest-400/40 rounded-sm text-forest-300 hover:bg-forest-700 hover:text-white hover:border-forest-700 hover:shadow-[0_0_20px_rgba(90,159,130,0.5)] transition-all duration-300"
          >
            <Phone size={16} className="shrink-0" />
            <span className="text-sm font-medium whitespace-nowrap">{t('navbar.book')}</span>
          </a>
        </div>

        <button
          className="xl:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
    </header>

      {/* Mobil yon panel (drawer) fon parda */}
      <div
        className={`xl:hidden fixed inset-0 z-[55] bg-stone-950/60 backdrop-blur-sm transition-opacity duration-[450ms] ease-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Mobil yon panel (drawer) */}
      <div
        data-testid="mobile-nav-drawer"
        data-lenis-prevent
        className={`xl:hidden fixed top-0 right-0 z-[60] h-full w-[82%] max-w-xs sm:max-w-sm bg-white/85 backdrop-blur-2xl shadow-2xl overflow-y-auto ${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-90'
        }`}
        style={{ transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease-out' }}
      >
          <div className="flex items-center justify-between p-5 border-b border-stone-200">
            <span className="font-serif text-stone-900 text-lg font-semibold">Dugoba Resort</span>
            <button
              className="text-stone-500 hover:text-stone-900 p-1 transition-colors"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-5 flex flex-col gap-2">
            <div
              className={`mb-2 transition-all duration-300 ease-out ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`}
              style={{ transitionDelay: isOpen ? '60ms' : '0ms' }}
            >
              <LanguageSwitcher variant="light" />
            </div>
            {navLinks.map((link, i) => {
              const itemClass = `transition-all duration-300 ease-out ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`;
              const itemStyle = { transitionDelay: isOpen ? `${100 + i * 45}ms` : '0ms' };

              if (link.to === '/kottejlar') {
                return (
                  <div key={link.to} className={itemClass} style={itemStyle}>
                    <MobileNavAccordion
                      label={link.label}
                      to={link.to}
                      viewAllLabel={t('navbar.viewAllCottages')}
                      groups={cottageGroups}
                      onNavigate={() => setIsOpen(false)}
                    />
                  </div>
                );
              }
              if (link.to === '/xonalar') {
                return (
                  <div key={link.to} className={itemClass} style={itemStyle}>
                    <MobileNavAccordion
                      label={link.label}
                      to={link.to}
                      viewAllLabel={t('navbar.viewAllRooms')}
                      groups={roomGroups}
                      onNavigate={() => setIsOpen(false)}
                    />
                  </div>
                );
              }
              return (
                <div key={link.to} className={itemClass} style={itemStyle}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setIsOpen(false)}
                    className={mobileLinkClass}
                  >
                    {link.label}
                  </NavLink>
                </div>
              );
            })}
            <div
              className={`transition-all duration-300 ease-out ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`}
              style={{ transitionDelay: isOpen ? `${100 + navLinks.length * 45}ms` : '0ms' }}
            >
              <a
                href={`tel:${resortInfo.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2 px-4 py-3 mt-2 bg-forest-700 text-white rounded-sm"
              >
                <Phone size={18} />
                <span className="font-medium">{resortInfo.phone}</span>
              </a>
            </div>
          </div>
      </div>
    </>
  );
}
