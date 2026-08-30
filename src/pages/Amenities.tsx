import { Check } from 'lucide-react';
import PageHero from '@/components/PageHero';
import { getAmenities, IMAGES } from '@/data/accommodations';
import { useTranslation } from '@/i18n/useTranslation';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import Reveal from '@/components/motion/Reveal';

export default function Amenities() {
  const { t, tList, language } = useTranslation();
  useDocumentMeta({ title: t('amenities.heroTitle'), description: t('amenities.heroSubtitle') });
  const amenities = getAmenities(language);
  const fullList = tList('amenities.list');

  return (
    <div>
      <PageHero
        title={t('amenities.heroTitle')}
        subtitle={t('amenities.heroSubtitle')}
        image={IMAGES.resortElegant}
        breadcrumb={[{ label: t('common.home'), to: '/' }, { label: t('amenities.heroTitle') }]}
      />

      {/* AMENITIES GRID */}
      <section className="py-20 bg-white">
        <div className="container-lux">
          <Reveal variant="fade-up" className="text-center mb-12">
            <p className="section-subtitle">{t('amenities.gridSubtitle')}</p>
            <h2 className="section-title">{t('amenities.gridTitle')}</h2>
            <p className="text-stone-600 mt-3 max-w-2xl mx-auto">
              {t('amenities.gridDesc')}
            </p>
          </Reveal>

          <Reveal variant="pop-in" stagger={0.1} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenities.map((amenity) => (
              <div key={amenity.id} className="lux-card overflow-hidden group">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={amenity.image}
                    alt={amenity.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 right-4 font-serif text-xl font-semibold text-white">
                    {amenity.name}
                  </h3>
                </div>
                <div className="p-5">
                  <p className="text-sm text-stone-600 leading-relaxed">{amenity.description}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* FULL LIST */}
      <section className="py-20 bg-stone-50">
        <div className="container-lux max-w-4xl">
          <p className="section-subtitle mb-3">{t('amenities.listSubtitle')}</p>
          <h2 className="section-title mb-8">{t('amenities.listTitle')}</h2>
          <Reveal variant="fade-up" stagger={0.05} className="grid sm:grid-cols-2 gap-3">
            {fullList.map((item) => (
              <div key={item} className="flex items-center gap-3 p-4 bg-white rounded-sm border border-stone-100">
                <div className="w-6 h-6 rounded-full bg-forest-50 flex items-center justify-center shrink-0">
                  <Check size={14} className="text-forest-600" />
                </div>
                <span className="text-sm text-stone-700">{item}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
