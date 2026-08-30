import PageHero from '@/components/PageHero';
import AccommodationCard from '@/components/AccommodationCard';
import { getAccommodations } from '@/data/accommodations';
import { useTranslation } from '@/i18n/useTranslation';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import Reveal from '@/components/motion/Reveal';
import cottagesHero from '@/atrof-muhit/image.webp';

export default function Cottages() {
  const { t, language } = useTranslation();
  useDocumentMeta({ title: t('cottages.heroTitle'), description: t('cottages.heroSubtitle') });
  const cottages = getAccommodations(language).filter((a) => a.type === 'cottage');

  return (
    <div>
      <PageHero
        title={t('cottages.heroTitle')}
        subtitle={t('cottages.heroSubtitle')}
        image={cottagesHero}
        imagePosition="center 78%"
        breadcrumb={[{ label: t('common.home'), to: '/' }, { label: t('cottages.heroTitle') }]}
      />

      <section className="py-24 bg-stone-50">
        <div className="container-lux">
          <Reveal variant="fade-up" className="mb-12 text-center">
            <p className="section-subtitle">{t('cottages.subtitle')}</p>
            <h2 className="section-title">{t('cottages.title')}</h2>
            <p className="text-stone-600 mt-3 max-w-2xl mx-auto">
              {t('cottages.desc')}
            </p>
          </Reveal>

          <Reveal variant="fade-up" stagger={0.12} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cottages.map((c) => (
              <AccommodationCard key={c.id} accommodation={c} />
            ))}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
