import { Link } from 'react-router-dom';
import {
  Mountain, Users, Wifi, ShowerHead, TreePine, Store, Flame,
  Baby, ArrowRight, ChevronRight, Building2,
} from 'lucide-react';
import { getAccommodations, IMAGES } from '@/data/accommodations';
import { useTranslation } from '@/i18n/useTranslation';
import AccommodationCard from '@/components/AccommodationCard';
import heroImage from '@/atrof-muhit/xona-kotej.webp';
import tabiat1 from '@/atrof-muhit/tabiat1.webp';
import tabiat2 from '@/atrof-muhit/tabiat2.webp';
import tabiat3 from '@/atrof-muhit/tabiat3.webp';
import tabiat8 from '@/atrof-muhit/tabiat8.webp';

export default function Home() {
  const { t, language } = useTranslation();
  const accommodations = getAccommodations(language);
  const featuredCottages = accommodations.filter((a) => a.type === 'cottage').slice(0, 3);
  const featuredRooms = accommodations.filter((a) => a.type === 'room').slice(0, 6);
  const stats = [
    { icon: Building2, value: '29', label: t('home.statObjects') },
    { icon: Mountain, value: '5', label: t('home.statCottages') },
    { icon: Users, value: '24', label: t('home.statRooms') },
    { icon: TreePine, value: '100%', label: t('home.statMountain') },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Dugoba Resort"
            width={1280}
            height={960}
            fetchPriority="high"
            className="w-full h-full object-cover animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-stone-950/30 to-stone-950/80" />
        </div>

        <div className="relative flex-1 flex items-center justify-center container-lux text-center text-white pt-28 pb-10">
          <div className="animate-fade-up">
            <p className="text-sm sm:text-base text-forest-300 tracking-[0.3em] uppercase font-medium mb-4">
              {t('home.heroLocation')}
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-shadow-lux mb-6">
              {t('home.heroTitle')}
            </h1>
            <p className="text-lg sm:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed mb-10 font-light">
              {t('home.heroDescription')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/xonalar" className="btn-primary">
                {t('home.viewRooms')}
              </Link>
              <Link to="/tur-paketlari" className="btn-secondary">
                {t('home.viewTours')}
              </Link>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="container-lux pb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 backdrop-blur-md rounded-sm overflow-hidden">
              {stats.map((s) => (
                <div key={s.label} className="bg-stone-950/40 backdrop-blur-md p-4 sm:p-6 text-center">
                  <s.icon size={24} className="text-forest-300 mx-auto mb-2" />
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-white">{s.value}</div>
                  <div className="text-[10px] sm:text-xs text-white/60 uppercase tracking-wider mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-24 bg-stone-50">
        <div className="container-lux">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-subtitle">{t('home.introSubtitle')}</p>
              <h2 className="section-title mb-6">
                {t('home.introTitleLine1')}<br />{t('home.introTitleLine2')}
              </h2>
              <p className="text-stone-600 leading-relaxed mb-6">
                {t('home.introP1')}
              </p>
              <p className="text-stone-600 leading-relaxed mb-8">
                {t('home.introP2')}
              </p>
              <Link to="/resort" className="inline-flex items-center gap-2 text-forest-700 font-medium hover:gap-3 transition-all">
                {t('home.moreInfo')}
                <ArrowRight size={18} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img src={tabiat1} alt="Tabiat manzarasi" width={1920} height={2560} className="w-full h-64 object-cover rounded-sm shadow-md" loading="lazy" />
                <img src={tabiat2} alt="Tabiat manzarasi" width={1920} height={2560} className="w-full h-48 object-cover rounded-sm shadow-md" loading="lazy" />
              </div>
              <div className="space-y-4 pt-8">
                <img src={tabiat3} alt="Tabiat manzarasi" width={1920} height={2560} className="w-full h-48 object-cover rounded-sm shadow-md" loading="lazy" />
                <img src={tabiat8} alt="Tabiat manzarasi" width={1920} height={2560} className="w-full h-64 object-cover rounded-sm shadow-md" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED COTTAGES */}
      <section className="py-24 bg-white">
        <div className="container-lux">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <p className="section-subtitle">{t('home.cottagesSubtitle')}</p>
              <h2 className="section-title">{t('home.cottagesTitle')}</h2>
              <p className="text-stone-600 mt-3 max-w-xl">
                {t('home.cottagesDesc')}
              </p>
            </div>
            <Link to="/kottejlar" className="btn-ghost">
              {t('home.allCottages')}
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCottages.map((c) => (
              <AccommodationCard key={c.id} accommodation={c} />
            ))}
          </div>
        </div>
      </section>

      {/* PARALLAX MOUNTAIN VIEW */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center parallax-bg" style={{ backgroundImage: `url(${IMAGES.mountain2})` }}>
        <div className="absolute inset-0 bg-stone-950/50" />
        <div className="relative container-lux text-center text-white">
          <Mountain size={48} className="mx-auto mb-6 text-forest-300" />
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold mb-4 text-shadow-lux">
            {t('home.mountainTitle')}
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            {t('home.mountainDesc')}
          </p>
          <Link to="/tog-manzarasi" className="btn-secondary">
            {t('home.viewMountain')}
          </Link>
        </div>
      </section>

      {/* FEATURED ROOMS */}
      <section className="py-24 bg-stone-50">
        <div className="container-lux">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <p className="section-subtitle">{t('home.roomsSubtitle')}</p>
              <h2 className="section-title">{t('home.roomsTitle')}</h2>
              <p className="text-stone-600 mt-3 max-w-xl">
                {t('home.roomsDesc')}
              </p>
            </div>
            <Link to="/xonalar" className="btn-ghost">
              {t('home.allRooms')}
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRooms.map((r) => (
              <AccommodationCard key={r.id} accommodation={r} />
            ))}
          </div>
        </div>
      </section>

      {/* AMENITIES PREVIEW */}
      <section className="py-24 bg-white">
        <div className="container-lux">
          <div className="text-center mb-12">
            <p className="section-subtitle">{t('home.amenitiesSubtitle')}</p>
            <h2 className="section-title">{t('home.amenitiesTitle')}</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: Mountain, label: t('home.amMountain') },
              { icon: Store, label: t('home.amShop') },
              { icon: Flame, label: t('home.amStove') },
              { icon: Baby, label: t('home.amPlayground') },
              { icon: Wifi, label: t('home.amWifi') },
              { icon: ShowerHead, label: t('home.amBathroom') },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center text-center p-6 border border-stone-100 rounded-sm hover:border-forest-200 hover:shadow-md transition-all group">
                <div className="w-14 h-14 rounded-full bg-forest-50 flex items-center justify-center mb-3 group-hover:bg-forest-100 transition-colors">
                  <item.icon size={24} className="text-forest-600" />
                </div>
                <span className="text-sm font-medium text-stone-700">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/qulayliklar" className="btn-ghost">
              {t('home.allAmenities')}
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.resortPool} alt="" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-stone-950/80" />
        </div>
        <div className="relative container-lux text-center text-white">
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold mb-4">
            {t('home.ctaTitle')}
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            {t('home.ctaDesc')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/xonalar" className="btn-primary">
              {t('home.ctaRooms')}
            </Link>
            <Link to="/aloqa" className="btn-secondary">
              {t('home.ctaContact')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
