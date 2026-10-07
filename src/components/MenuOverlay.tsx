import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { X, ArrowUpRight, Phone, Send, Instagram } from 'lucide-react';
import { resortInfo, IMAGES } from '@/data/accommodations';
import { useTranslation } from '@/i18n/useTranslation';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface MenuLink {
  to: string;
  label: string;
  image: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MenuOverlay({ open, onClose }: Props) {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  const links: MenuLink[] = [
    { to: '/', label: t('navbar.home'), image: IMAGES.heroResort },
    { to: '/resort', label: t('navbar.resort'), image: IMAGES.resortElegant },
    { to: '/kottejlar', label: t('navbar.cottages'), image: IMAGES.cottage2 },
    { to: '/xonalar', label: t('navbar.rooms'), image: IMAGES.room1 },
    { to: '/tur-paketlari', label: t('navbar.tourPackages'), image: IMAGES.resortTerrace },
    { to: '/qulayliklar', label: t('navbar.amenities'), image: IMAGES.mountain1 },
    { to: '/galereya', label: t('navbar.gallery'), image: IMAGES.resortGarden },
    { to: '/videolar', label: t('navbar.videos'), image: IMAGES.resortRiverside },
    { to: '/tog-manzarasi', label: t('navbar.mountainViews'), image: IMAGES.mountain2 },
    { to: '/aloqa', label: t('navbar.contact'), image: IMAGES.resortAerial },
    { to: '/qoidalar', label: t('navbar.rules'), image: IMAGES.resortForest },
  ];

  return (
    <div
      className={`fixed inset-0 z-[100] bg-stone-950 text-stone-100 transition-opacity duration-500 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!open}
    >
      <div
        className={`h-full flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? 'translate-y-0' : '-translate-y-4'
        }`}
      >
        <div className="shrink-0">
          <div className="container-lux flex items-center justify-between pt-6 pb-4">
            <span className="font-serif italic text-lg text-white">Dugoba Resort</span>
            <button
              type="button"
              onClick={onClose}
              aria-label={t('common.close')}
              className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-stone-400 hover:text-white transition-colors"
            >
              {t('common.close')}
              <X size={22} />
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto" data-lenis-prevent>
          <div className="container-lux grid lg:grid-cols-[1.3fr_1fr] gap-10 pb-10">
            <nav className="pt-4">
              {links.map((link, i) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={onClose}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={({ isActive }) =>
                    `group flex items-baseline gap-4 sm:gap-6 py-3 sm:py-4 border-b border-white/10 transition-colors ${
                      isActive ? 'text-sand-300' : 'text-white/85 hover:text-white'
                    }`
                  }
                >
                  <span className="index-tag text-clay-500 w-8 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-serif italic text-[9vw] sm:text-4xl lg:text-5xl leading-none tracking-tight transition-transform duration-300 group-hover:translate-x-2">
                    {link.label}
                  </span>
                  <ArrowUpRight
                    size={22}
                    className="ml-auto shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hidden sm:block"
                  />
                </NavLink>
              ))}
            </nav>

            <div className="hidden lg:block pt-4">
              <div className="sticky top-4 aspect-[4/5] overflow-hidden border border-white/10">
                {links.map((link, i) => (
                  <img
                    key={link.to}
                    src={link.image}
                    alt=""
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                      activeIndex === i ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 index-tag text-sand-300">{links[activeIndex]?.label}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="shrink-0 border-t border-white/10">
          <div className="container-lux py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-5">
              <a href={`tel:${resortInfo.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-sm text-white/80 hover:text-sand-300 transition-colors">
                <Phone size={15} /> {resortInfo.phone}
              </a>
              <a href={resortInfo.telegram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/80 hover:text-sand-300 transition-colors">
                <Send size={15} /> Telegram
              </a>
              <a href={resortInfo.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/80 hover:text-sand-300 transition-colors">
                <Instagram size={15} /> Instagram
              </a>
            </div>
            <LanguageSwitcher variant="dark" />
          </div>
        </div>
      </div>
    </div>
  );
}
