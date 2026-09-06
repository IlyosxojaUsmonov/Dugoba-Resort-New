import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { resortInfo, getResortLocation } from '@/data/accommodations';
import { useTranslation } from '@/i18n/useTranslation';

export default function Footer() {
  const { t, language } = useTranslation();

  const columns = [
    {
      title: t('footer.navigation'),
      links: [
        { to: '/', label: t('navbar.home') },
        { to: '/resort', label: t('navbar.resort') },
        { to: '/kottejlar', label: t('navbar.cottages') },
        { to: '/xonalar', label: t('navbar.rooms') },
        { to: '/tur-paketlari', label: t('navbar.tourPackages') },
      ],
    },
    {
      title: t('footer.more'),
      links: [
        { to: '/qulayliklar', label: t('navbar.amenities') },
        { to: '/galereya', label: t('navbar.gallery') },
        { to: '/videolar', label: t('navbar.videos') },
        { to: '/tog-manzarasi', label: t('navbar.mountainViews') },
        { to: '/qoidalar', label: t('navbar.rules') },
      ],
    },
  ];

  return (
    <footer className="bg-stone-950 text-stone-400">
      <div className="container-lux pt-20 pb-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-6 pb-16 border-b border-white/10">
          <div className="lg:col-span-5">
            <span className="index-tag text-clay-500">{t('footer.colophonLabel')}</span>
            <p className="mt-5 font-serif text-2xl sm:text-3xl italic text-white leading-snug max-w-md">
              {t('footer.description')}
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h2 className="text-[11px] font-bold tracking-[0.25em] uppercase text-stone-500 mb-5">{col.title}</h2>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm text-stone-300 hover:text-sand-300 transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-3">
            <h2 className="text-[11px] font-bold tracking-[0.25em] uppercase text-stone-500 mb-5">{t('footer.contact')}</h2>
            <ul className="space-y-3">
              <li>
                <a href={resortInfo.mapUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-stone-300 hover:text-sand-300 transition-colors">
                  {getResortLocation(language)}
                </a>
              </li>
              <li>
                <a href={`tel:${resortInfo.phone.replace(/\s/g, '')}`} className="text-sm text-stone-300 hover:text-sand-300 transition-colors">
                  {resortInfo.phone}
                </a>
              </li>
              <li>
                <a href={resortInfo.telegram} target="_blank" rel="noopener noreferrer" className="text-sm text-stone-300 hover:text-sand-300 transition-colors">
                  {t('footer.telegramPrefix')}: {resortInfo.telegramUsername}
                </a>
              </li>
              <li>
                <a href={resortInfo.telegramChannel} target="_blank" rel="noopener noreferrer" className="text-sm text-stone-300 hover:text-sand-300 transition-colors">
                  {resortInfo.telegramChannelUsername}
                </a>
              </li>
              <li>
                <a href={resortInfo.instagram} target="_blank" rel="noopener noreferrer" className="text-sm text-stone-300 hover:text-sand-300 transition-colors">
                  {resortInfo.instagramUsername}
                </a>
              </li>
            </ul>
            <Link
              to="/xonalar"
              className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-sand-300 hover:gap-3 transition-all"
            >
              {t('home.ctaRooms')} <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-start sm:items-end justify-between gap-8 pt-10">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-stone-500">
            <span>© {new Date().getFullYear()} {t('footer.copyright')}</span>
            <Link to="/maxfiylik-siyosati" className="hover:text-sand-300 transition-colors">
              {t('cookieConsent.privacyLink')}
            </Link>
            <span>{t('footer.locationLine')}</span>
            <span>29 {t('footer.object')} · 5 {t('footer.cottage')} · 24 {t('footer.room')}</span>
          </div>
          <span className="font-serif italic text-[16vw] sm:text-7xl lg:text-8xl leading-[0.8] text-white/95 select-none whitespace-nowrap">
            Dugoba
          </span>
        </div>
      </div>
    </footer>
  );
}
