import { useMemo, useState } from 'react';
import PageHero from '@/components/PageHero';
import AccommodationCard from '@/components/AccommodationCard';
import CategoryAccordion from '@/components/CategoryAccordion';
import { getAccommodations, IMAGES } from '@/data/accommodations';
import { useTranslation } from '@/i18n/useTranslation';

export default function Cottages() {
  const { t, language } = useTranslation();
  const cottages = getAccommodations(language).filter((a) => a.type === 'cottage');
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());

  const toggleGroup = (category: string) => {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const groupedCottages = useMemo(() => {
    const map = new Map<string, typeof cottages>();
    for (const cottage of cottages) {
      const group = map.get(cottage.category);
      if (group) {
        group.push(cottage);
      } else {
        map.set(cottage.category, [cottage]);
      }
    }
    return Array.from(map.entries());
  }, [cottages]);

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

          <div className="space-y-4">
            {groupedCottages.map(([category, group]) => {
              const capacities = Array.from(new Set(group.map((c) => c.capacity))).sort((a, b) => a - b);
              const capacityLabel =
                capacities.length > 1
                  ? `${capacities[0]}-${capacities[capacities.length - 1]} ${t('common.seatedPerson')}`
                  : `${capacities[0]} ${t('common.seatedPerson')}`;

              return (
                <CategoryAccordion
                  key={category}
                  title={category}
                  count={group.length}
                  countLabel={t('cottages.cottageWord')}
                  capacityLabel={capacityLabel}
                  isOpen={openCategories.has(category)}
                  onToggle={() => toggleGroup(category)}
                >
                  {group.map((c) => (
                    <AccommodationCard key={c.id} accommodation={c} />
                  ))}
                </CategoryAccordion>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
