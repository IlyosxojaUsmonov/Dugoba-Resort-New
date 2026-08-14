import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { resortInfo } from '@/data/accommodations';

const navLinks = [
  { to: '/', label: 'Bosh sahifa' },
  { to: '/resort', label: 'Resort' },
  { to: '/kottejlar', label: 'Kottejlar' },
  { to: '/xonalar', label: 'Xonalar' },
  { to: '/tur-paketlari', label: 'Tur paketlari' },
  { to: '/qulayliklar', label: 'Qulayliklar' },
  { to: '/galereya', label: 'Galereya' },
  { to: '/videolar', label: 'Videolar' },
  { to: '/tog-manzarasi', label: 'Tog\' manzarasi' },
  { to: '/aloqa', label: 'Aloqa' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
          <div className="w-10 h-10 rounded-sm border-2 border-forest-300 flex items-center justify-center transition-all group-hover:border-forest-400">
            <span className="font-serif text-forest-300 text-xl font-bold">D</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-white text-xl font-semibold tracking-wide leading-none">
              Dugoba
            </span>
            <span className="text-[10px] text-forest-300 tracking-[0.3em] uppercase">Resort</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.to === '/tur-paketlari' ? (
              <span
                key={link.to}
                aria-disabled="true"
                className="px-3 py-2 text-sm font-medium tracking-wide text-white/80 cursor-not-allowed"
              >
                {link.label}
              </span>
            ) : (
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
            )
          )}
        </div>

        <div className="hidden lg:flex items-center">
          <a
            href={`tel:${resortInfo.phone.replace(/\s/g, '')}`}
            className="flex items-center gap-2 px-4 py-2 border border-forest-400/40 rounded-sm text-forest-300 hover:bg-forest-700 hover:text-white hover:border-forest-700 transition-all duration-300"
          >
            <Phone size={16} />
            <span className="text-sm font-medium">Bron qilish</span>
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
            {navLinks.map((link) =>
              link.to === '/tur-paketlari' ? (
                <span
                  key={link.to}
                  aria-disabled="true"
                  className="px-4 py-3 text-base font-medium rounded-sm text-white/80 cursor-not-allowed"
                >
                  {link.label}
                </span>
              ) : (
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
              )
            )}
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
