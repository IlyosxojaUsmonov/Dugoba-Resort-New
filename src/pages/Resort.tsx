import { Link } from 'react-router-dom';
import { Mountain, Store, Flame, Baby, MapPin } from 'lucide-react';
import PageHero from '@/components/PageHero';
import { IMAGES, resortInfo, getResortLocation } from '@/data/accommodations';
import { useTranslation } from '@/i18n/useTranslation';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { useParallax } from '@/hooks/useParallax';
import { useCountUp } from '@/hooks/useCountUp';
import Reveal from '@/components/motion/Reveal';

export default function Resort() {
  const { t, language } = useTranslation();
  useDocumentMeta({ title: t('resort.heroTitle'), description: t('resort.heroSubtitle') });
  const mountainParallaxRef = useParallax<HTMLImageElement>(0.2);
  const countObjectRef = useCountUp<HTMLDivElement>('29');
  const countCottageRef = useCountUp<HTMLDivElement>('5');
  const countRoomRef = useCountUp<HTMLDivElement>('24');

  return (
    <div>
      <PageHero
        title={t('resort.heroTitle')}
        subtitle={t('resort.heroSubtitle')}
        image={IMAGES.atrofMuhitResort}
        breadcrumb={[{ label: t('common.home'), to: '/' }, { label: t('resort.heroTitle') }]}
      />

      {/* RESORT DESCRIPTION */}
      <section className="py-24 bg-white">
        <div className="container-lux">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal variant="slide-left" className="order-2 lg:order-1">
              <p className="section-subtitle">{t('resort.subtitle')}</p>
              <h2 className="section-title mb-6">{t('resort.title')}</h2>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>{t('resort.p1')}</p>
                <p>{t('resort.p2')}</p>
                <p>{t('resort.p3')}</p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-forest-50 rounded-xl">
                  <div ref={countObjectRef} className="font-serif text-3xl font-bold text-forest-700">29</div>
                  <div className="text-xs text-stone-500 uppercase tracking-wider mt-1">{t('resort.statObject')}</div>
                </div>
                <div className="text-center p-4 bg-forest-50 rounded-xl">
                  <div ref={countCottageRef} className="font-serif text-3xl font-bold text-forest-700">5</div>
                  <div className="text-xs text-stone-500 uppercase tracking-wider mt-1">{t('resort.statCottage')}</div>
                </div>
                <div className="text-center p-4 bg-forest-50 rounded-xl">
                  <div ref={countRoomRef} className="font-serif text-3xl font-bold text-forest-700">24</div>
                  <div className="text-xs text-stone-500 uppercase tracking-wider mt-1">{t('resort.statRoom')}</div>
                </div>
              </div>
            </Reveal>
            <Reveal variant="mask-reveal" className="order-1 lg:order-2 space-y-4">
              <div className="relative h-80 overflow-hidden rounded-xl shadow-lg">
                <img
                  ref={mountainParallaxRef}
                  src={IMAGES.atrofMuhitTog}
                  alt="Tog' manzarasi"
                  className="absolute inset-[-15%] w-[130%] h-[130%] object-cover"
                  loading="lazy"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img src={IMAGES.atrofMuhitXonaKotej} alt="Resort va kottejlar" width={1280} height={960} className="w-full h-48 object-cover rounded-xl shadow-md" loading="lazy" />
                <img src={IMAGES.atrofMuhitTabiat6} alt="Tog' manzarasi" width={640} height={640} className="w-full h-48 object-cover rounded-xl shadow-md" loading="lazy" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* RESORT AREAS */}
      <section className="py-24 bg-stone-50">
        <div className="container-lux">
          <Reveal variant="fade-up" className="text-center mb-16">
            <p className="section-subtitle">{t('resort.areasSubtitle')}</p>
            <h2 className="section-title">{t('resort.areasTitle')}</h2>
          </Reveal>

          <Reveal variant="fade-up" stagger={0.12} className="grid md:grid-cols-2 gap-8">
            <div className="lux-card flex flex-col sm:flex-row overflow-hidden">
              <img src={IMAGES.shop1} alt="Magazin" className="w-full sm:w-2/5 h-48 sm:h-auto object-cover" loading="lazy" />
              <div className="p-6 flex-1">
                <Store size={28} className="text-forest-600 mb-3" />
                <h3 className="font-serif text-xl font-semibold text-stone-900 mb-2">{t('resort.shopTitle')}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {t('resort.shopDesc')}
                </p>
              </div>
            </div>

            <div className="lux-card flex flex-col sm:flex-row overflow-hidden">
              <img src={IMAGES.stove} alt="O'choqxona" className="w-full sm:w-2/5 h-48 sm:h-auto object-cover" loading="lazy" />
              <div className="p-6 flex-1">
                <Flame size={28} className="text-forest-600 mb-3" />
                <h3 className="font-serif text-xl font-semibold text-stone-900 mb-2">{t('resort.stoveTitle')}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {t('resort.stoveDesc')}
                </p>
              </div>
            </div>

            <div className="lux-card flex flex-col sm:flex-row overflow-hidden">
              <img src={IMAGES.playground1} alt="Bolalar maydonchasi" className="w-full sm:w-2/5 h-48 sm:h-auto object-cover" loading="lazy" />
              <div className="p-6 flex-1">
                <Baby size={28} className="text-forest-600 mb-3" />
                <h3 className="font-serif text-xl font-semibold text-stone-900 mb-2">{t('resort.playgroundTitle')}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {t('resort.playgroundDesc')}
                </p>
              </div>
            </div>

            <div className="lux-card flex flex-col sm:flex-row overflow-hidden">
              <img src={IMAGES.mountain1} alt="Tog' manzarasi" width={1800} height={1200} className="w-full sm:w-2/5 h-48 sm:h-auto object-cover" loading="lazy" />
              <div className="p-6 flex-1">
                <Mountain size={28} className="text-forest-600 mb-3" />
                <h3 className="font-serif text-xl font-semibold text-stone-900 mb-2">{t('resort.mountainTitle')}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {t('resort.mountainDesc')}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* LOCATION */}
      <section className="py-24 bg-forest-950 text-white">
        <Reveal variant="fade-up" className="container-lux text-center">
          <MapPin size={40} className="mx-auto text-forest-400 mb-6" />
          <p className="section-subtitle text-forest-400">{t('resort.locationSubtitle')}</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-4">
            {getResortLocation(language)}
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            {t('resort.locationDesc')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={resortInfo.mapUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              {t('resort.viewMap')}
            </a>
            <Link to="/tur-paketlari" className="btn-secondary">
              {t('resort.tourPackages')}
            </Link>
            <Link to="/aloqa" className="btn-secondary">
              {t('resort.contact')}
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
