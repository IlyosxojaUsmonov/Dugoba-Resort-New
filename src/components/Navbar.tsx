import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { resortInfo } from '@/data/accommodations';
import { useTranslation } from '@/i18n/useTranslation';
import logo from '@/atrof-muhit/dugobba.png';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();

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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-stone-900/95 backdrop-blur-md shadow-2xl py-3'
          : 'bg-gradient-to-b from-stone-900/70 to-transparent py-5'
      }`}
    >
      <nav className="container-lux flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setIsOpen(false)}>
          <div className="w-10 h-10 rounded-sm border-2 border-forest-300 flex items-center justify-center overflow-hidden transition-all group-hover:border-forest-400">
            <img src={logo} alt="Dugoba Resort" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-white text-xl font-semibold tracking-wide leading-none">
              Dugoba
            </span>
            <span className="text-[10px] text-forest-300 tracking-[0.3em] uppercase">Resort</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${
                  isActive ? 'text-forest-300' : 'text-white/80 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher variant="dark" />
          <a
            href={`tel:${resortInfo.phone.replace(/\s/g, '')}`}
            className="flex items-center gap-2 px-4 py-2 border border-forest-400/40 rounded-sm text-forest-300 hover:bg-forest-700 hover:text-white hover:border-forest-700 transition-all duration-300"
          >
            <Phone size={16} />
            <span className="text-sm font-medium">{t('navbar.book')}</span>
          </a>
        </div>

        <button
          className="lg:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-stone-900/98 backdrop-blur-lg shadow-2xl animate-slide-down max-h-[80vh] overflow-y-auto">
          <div className="container-lux py-6 flex flex-col gap-1">
            <div className="mb-2">
              <LanguageSwitcher variant="dark" />
            </div>
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 text-base font-medium rounded-sm transition-colors ${
                    isActive
                      ? 'bg-forest-800 text-forest-300'
                      : 'text-white/80 hover:bg-stone-800 hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <a
              href={`tel:${resortInfo.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 px-4 py-3 mt-2 bg-forest-700 text-white rounded-sm"
            >
              <Phone size={18} />
              <span className="font-medium">{resortInfo.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
