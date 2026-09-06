import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { resortInfo } from '@/data/accommodations';
import { useTranslation } from '@/i18n/useTranslation';
import { useMagnetic } from '@/hooks/useMagnetic';
import logo from '@/atrof-muhit/dugobba.webp';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import MenuOverlay from '@/components/MenuOverlay';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuBtnRef = useMagnetic<HTMLButtonElement>(0.25, 8);
  const { t } = useTranslation();

  // Every page in this design opens on a light (cream) panel — the Home split-hero
  // included — so the masthead is dark-on-light from the first frame everywhere;
  // scrolling only adds a backdrop blur + hairline border, never a color flip.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-stone-50/90 backdrop-blur-md border-b border-stone-200 py-3'
            : 'bg-stone-50/0 py-6'
        } ${isOpen ? 'opacity-0 pointer-events-none' : ''}`}
      >
        <nav className="container-lux flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group shrink-0" onClick={() => setIsOpen(false)}>
            <div className="w-9 h-9 rounded-full border border-stone-950 flex items-center justify-center overflow-hidden opacity-90 group-hover:opacity-100 transition-opacity">
              <img src={logo} alt="Dugoba Resort" width={200} height={200} className="w-full h-full object-cover" />
            </div>
            <span className="font-sans text-sm font-extrabold tracking-[0.3em] uppercase text-stone-950">
              Dugoba
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <a
              href={`tel:${resortInfo.phone.replace(/\s/g, '')}`}
              className="text-sm font-medium tracking-wide text-stone-700 hover:text-stone-950 transition-colors"
            >
              {resortInfo.phone}
            </a>
            <LanguageSwitcher variant="light" />
          </div>

          <button
            ref={menuBtnRef}
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 text-xs font-bold tracking-[0.3em] uppercase text-stone-950"
            aria-label={t('navbar.menu')}
          >
            {t('navbar.menu')}
            <Menu size={20} />
          </button>
        </nav>
      </header>

      <MenuOverlay open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
