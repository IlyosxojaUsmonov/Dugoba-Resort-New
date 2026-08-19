import PageHero from '@/components/PageHero';
import AccommodationCard from '@/components/AccommodationCard';
import { getAccommodations, IMAGES } from '@/data/accommodations';
import { useTranslation } from '@/i18n/useTranslation';

export default function Cottages() {
  const { t, language } = useTranslation();
  const cottages = getAccommodations(language).filter((a) => a.type === 'cottage');

  return (
    <div>
      <PageHero
        title={t('cottages.heroTitle')}
        subtitle={t('cottages.heroSubtitle')}
        image={IMAGES.cottage1}
        breadcrumb={[{ label: t('common.home'), to: '/' }, { label: t('cottages.heroTitle') }]}
      />

      <section className="py-24 bg-stone-50">
        <div className="container-lux">
          <div className="mb-12 text-center">
            <p className="section-subtitle">{t('cottages.subtitle')}</p>
            <h2 className="section-title">{t('cottages.title')}</h2>
            <p className="text-stone-600 mt-3 max-w-2xl mx-auto">
              {t('cottages.desc')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cottages.map((c) => (
              <AccommodationCard key={c.id} accommodation={c} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
