import { Link } from 'react-router-dom';
import {
  Mountain, Wifi, ShowerHead, Store, Flame,
  Baby, ArrowRight, ArrowUpRight, ImageOff,
} from 'lucide-react';
import { getAccommodations, IMAGES } from '@/data/accommodations';
import { useTranslation } from '@/i18n/useTranslation';
import { useParallax } from '@/hooks/useParallax';
import { useCountUp } from '@/hooks/useCountUp';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import AccommodationCard from '@/components/AccommodationCard';
import Reveal from '@/components/motion/Reveal';
import SplitChars from '@/components/motion/SplitChars';
import heroImage from '@/atrof-muhit/xona-kotej.webp';
import tabiat1 from '@/atrof-muhit/tabiat1.webp';
import tabiat2 from '@/atrof-muhit/tabiat2.webp';
import tabiat3 from '@/atrof-muhit/tabiat3.webp';
import tabiat8 from '@/atrof-muhit/tabiat8.webp';

function StatTicker({ value, label }: { value: string; label: string }) {
  const countRef = useCountUp<HTMLSpanElement>(value);
  return (
    <div className="flex items-baseline gap-3 shrink-0">
      <span ref={countRef} className="font-serif italic text-3xl sm:text-4xl text-white">{value}</span>
      <span className="text-[10px] sm:text-xs text-white/60 uppercase tracking-[0.2em]">{label}</span>
    </div>
  );
}

export default function Home() {
  const { t, language } = useTranslation();
  useDocumentMeta({
    title: "Dugoba Resort — Premium Resort | Shohimardon, Farg'ona",
    description: t('home.heroDescription'),
    rawTitle: true,
  });
  const accommodations = getAccommodations(language);
  const featuredCottages = accommodations.filter((a) => a.type === 'cottage').slice(0, 3);
  const featuredRooms = accommodations.filter((a) => a.type === 'room').slice(0, 6);
  const stats = [
    { value: '29', label: t('home.statObjects') },
    { value: '5', label: t('home.statCottages') },
    { value: '24', label: t('home.statRooms') },
    { value: '100%', label: t('home.statMountain') },
  ];
  const amenities = [
    { icon: Mountain, label: t('home.amMountain') },
    { icon: Store, label: t('home.amShop') },
    { icon: Flame, label: t('home.amStove') },
    { icon: Baby, label: t('home.amPlayground') },
    { icon: Wifi, label: t('home.amWifi') },
    { icon: ShowerHead, label: t('home.amBathroom') },
  ];

  const mountainParallaxRef = useParallax<HTMLImageElement>(0.18);

  return (
    <div>
      {/* HERO — split composition: text column + offset framed image, no centered full-bleed banner */}
      <section className="relative min-h-screen flex flex-col justify-center pt-28 pb-10 overflow-hidden bg-stone-50">
        <div className="container-lux w-full grid lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="index-tag">01</span>
              <span className="w-10 h-px bg-clay-400" />
              <span className="text-xs text-stone-500 tracking-[0.25em] uppercase">{t('home.heroLocation')}</span>
            </div>
            <h1 className="font-serif text-[15vw] sm:text-7xl lg:text-8xl xl:text-9xl font-normal text-stone-950 tracking-[-0.02em] leading-[0.88] mb-8">
              <SplitChars text={t('home.heroTitle')} />
            </h1>
            <p className="text-base sm:text-lg text-stone-600 max-w-md leading-relaxed mb-10">
              {t('home.heroDescription')}
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
              <Link to="/xonalar" className="btn-primary">
                {t('home.viewRooms')} <ArrowRight size={18} />
              </Link>
              <Link to="/tur-paketlari" className="text-sm font-medium text-stone-500 hover:text-stone-950 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-950 transition-colors">
                {t('home.viewTours')}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] sm:ml-8 lg:ml-0">
              <img
                src={heroImage}
                alt="Dugoba Resort"
                width={1280}
                height={960}
                {...{ fetchpriority: 'high' }}
                className="w-full h-full object-cover"
              />
              <div className="absolute -bottom-5 -left-5 sm:-bottom-8 sm:-left-8 w-24 sm:w-32 aspect-square border-8 border-stone-50 bg-clay-600 flex flex-col items-center justify-center text-center p-2">
                <Mountain size={22} className="text-white mb-1" />
                <span className="text-[9px] text-white uppercase tracking-[0.15em] leading-tight">{t('home.statMountain')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 sm:mt-20 border-t border-stone-200">
          <div className="container-lux flex flex-wrap items-center gap-x-10 gap-y-4 py-6">
            {stats.map((s) => (
              <StatTicker key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* STORY — pull-quote + offset image collage, replaces the old symmetric "intro" section */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="container-lux grid lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="section-subtitle">{t('home.introSubtitle')}</p>
            <h2 className="font-serif italic text-4xl sm:text-5xl text-stone-950 leading-[1.05] mb-8">
              {t('home.introTitleLine1')} {t('home.introTitleLine2')}
            </h2>
            <p className="text-stone-600 leading-relaxed mb-5">{t('home.introP1')}</p>
            <p className="text-stone-600 leading-relaxed mb-8">{t('home.introP2')}</p>
            <Link to="/resort" className="btn-primary">
              {t('home.moreInfo')} <ArrowRight size={18} />
            </Link>
          </div>

          <Reveal variant="fade-up" className="lg:col-span-7 relative grid grid-cols-2 gap-4 sm:gap-6">
            <img src={tabiat1} alt="Tabiat manzarasi" width={1920} height={2560} className="w-full h-72 sm:h-96 object-cover" loading="lazy" />
            <div className="flex flex-col gap-4 sm:gap-6 pt-12 sm:pt-20">
              <img src={tabiat2} alt="Tabiat manzarasi" width={1920} height={2560} className="w-full h-40 sm:h-52 object-cover" loading="lazy" />
              <img src={tabiat3} alt="Tabiat manzarasi" width={1920} height={2560} className="w-full h-40 sm:h-52 object-cover" loading="lazy" />
            </div>
            <img src={tabiat8} alt="Tabiat manzarasi" width={1920} height={2560} className="hidden sm:block absolute -bottom-10 left-1/3 w-1/2 h-40 object-cover border-8 border-white shadow-xl" loading="lazy" />
          </Reveal>
        </div>
      </section>

      {/* FEATURED COTTAGES — alternating index-list rows instead of a uniform card grid */}
      <section className="py-24 sm:py-32 bg-stone-50">
        <div className="container-lux">
          <Reveal variant="fade-up" className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-16 gap-4">
            <div>
              <p className="section-subtitle">{t('home.cottagesSubtitle')}</p>
              <h2 className="section-title">{t('home.cottagesTitle')}</h2>
            </div>
            <div className="max-w-sm">
              <p className="text-stone-600 mb-3">{t('home.cottagesDesc')}</p>
              <Link to="/kottejlar" className="btn-ghost">
                {t('home.allCottages')} <ArrowUpRight size={14} />
              </Link>
            </div>
          </Reveal>

          <div className="divide-y divide-stone-200 border-t border-b border-stone-200">
            {featuredCottages.map((c, i) => (
              <Reveal key={c.id} variant={i % 2 === 0 ? 'slide-left' : 'slide-right'}>
                <Link
                  to={`/obyekt/${c.id}`}
                  className={`group flex flex-col md:flex-row items-stretch gap-6 md:gap-10 py-10 ${
                    i % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="md:w-1/2 overflow-hidden bg-stone-200">
                    {c.available ? (
                      <img
                        src={c.mainImage}
                        alt={c.name}
                        loading="lazy"
                        className="w-full h-64 sm:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-64 sm:h-80 w-full flex-col items-center justify-center gap-2 text-stone-400">
                        <ImageOff size={26} strokeWidth={1.5} />
                        <span className="text-[11px] font-semibold tracking-[0.2em] uppercase">{t('common.unavailable')}</span>
                      </div>
                    )}
                  </div>
                  <div className="md:w-1/2 flex flex-col justify-center">
                    <span className="index-tag mb-3">{String(i + 1).padStart(2, '0')} — {c.category}</span>
                    <h3 className="font-serif italic text-3xl sm:text-4xl text-stone-950 mb-4 group-hover:text-clay-700 transition-colors">
                      {c.name}
                    </h3>
                    <p className="text-stone-600 leading-relaxed mb-6 max-w-md">{c.shortDescription}</p>
                    <div className="flex items-center gap-6">
                      <span className="font-serif italic text-xl text-stone-950">{c.priceDisplay}</span>
                      {c.available ? (
                        <span className="flex items-center gap-2 text-sm font-semibold text-stone-950 group-hover:gap-3 transition-all">
                          {t('accommodationCard.details')} <ArrowUpRight size={16} />
                        </span>
                      ) : (
                        <span className="text-sm font-semibold uppercase tracking-wide text-stone-400">
                          {t('common.unavailable')}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MOUNTAIN BREAK — full-bleed, text pinned bottom-left instead of centered */}
      <section className="relative h-[70vh] min-h-[440px] flex items-end overflow-hidden">
        <img
          ref={mountainParallaxRef}
          src={IMAGES.mountain2}
          alt=""
          className="absolute inset-[-10%] w-[120%] h-[120%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/10 to-transparent" />
        <Reveal variant="fade-up" className="relative container-lux pb-16 max-w-xl">
          <span className="index-tag text-sand-300 block mb-4">04 — {t('home.mountainTitle')}</span>
          <h2 className="font-serif italic text-4xl sm:text-6xl text-white leading-[0.95] mb-6">
            {t('home.mountainTitle')}
          </h2>
          <p className="text-white/75 leading-relaxed mb-8">{t('home.mountainDesc')}</p>
          <Link to="/tog-manzarasi" className="btn-secondary">
            {t('home.viewMountain')} <ArrowRight size={18} />
          </Link>
        </Reveal>
      </section>

      {/* FEATURED ROOMS — one large feature tile + smaller grid, not a uniform grid */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="container-lux">
          <Reveal variant="fade-up" className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-16 gap-4">
            <div>
              <p className="section-subtitle">{t('home.roomsSubtitle')}</p>
              <h2 className="section-title">{t('home.roomsTitle')}</h2>
            </div>
            <div className="max-w-sm">
              <p className="text-stone-600 mb-3">{t('home.roomsDesc')}</p>
              <Link to="/xonalar" className="btn-ghost">
                {t('home.allRooms')} <ArrowUpRight size={14} />
              </Link>
            </div>
          </Reveal>

          <Reveal variant="fade-up" stagger={0.1} className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {featuredRooms.map((r, i) => (
              <div key={r.id} className={i < 2 ? 'col-span-2' : 'col-span-1'}>
                <AccommodationCard accommodation={r} index={i} />
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* AMENITIES — numbered index list instead of an icon-grid */}
      <section className="py-24 sm:py-32 bg-stone-50">
        <div className="container-lux">
          <Reveal variant="fade-in" className="mb-16">
            <p className="section-subtitle">{t('home.amenitiesSubtitle')}</p>
            <h2 className="section-title">{t('home.amenitiesTitle')}</h2>
          </Reveal>

          <Reveal
            variant="fade-up"
            stagger={0.06}
            className="grid md:grid-cols-2 border-t border-stone-200 md:divide-x divide-stone-200"
          >
            {amenities.map((item, i) => (
              <div
                key={item.label}
                className="flex items-center gap-5 py-6 px-1 md:px-8 border-b border-stone-200 group"
              >
                <span className="index-tag w-8 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <item.icon size={22} className="text-clay-600 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="font-serif italic text-xl text-stone-950">{item.label}</span>
              </div>
            ))}
          </Reveal>

          <div className="mt-10">
            <Link to="/qulayliklar" className="btn-ghost">
              {t('home.allAmenities')} <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA — full-bleed image with oversized overlapping type */}
      <section className="relative py-32 sm:py-40 overflow-hidden bg-stone-950">
        <div className="absolute inset-0">
          <img src={IMAGES.resortPool} alt="" className="w-full h-full object-cover opacity-50" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/40" />
        </div>
        <Reveal variant="fade-up" className="relative container-lux">
          <span className="index-tag text-sand-400 block mb-6">06</span>
          <h2 className="font-serif italic text-[13vw] sm:text-6xl lg:text-7xl text-white leading-[0.9] mb-8 max-w-3xl">
            {t('home.ctaTitle')}
          </h2>
          <p className="text-lg text-white/70 max-w-xl mb-10">{t('home.ctaDesc')}</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
            <Link to="/xonalar" className="btn-secondary">
              {t('home.ctaRooms')} <ArrowRight size={18} />
            </Link>
            <Link to="/aloqa" className="text-sm font-medium text-white/70 hover:text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors">
              {t('home.ctaContact')}
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
