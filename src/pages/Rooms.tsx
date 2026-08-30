import { useState, useMemo, useId } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import PageHero from '@/components/PageHero';
import AccommodationCard from '@/components/AccommodationCard';
import { getAccommodations, IMAGES } from '@/data/accommodations';
import { useTranslation } from '@/i18n/useTranslation';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import Reveal from '@/components/motion/Reveal';

export default function Rooms() {
  const { t, language } = useTranslation();
  useDocumentMeta({ title: t('rooms.heroTitle'), description: t('rooms.heroSubtitle') });
  const [capacity, setCapacity] = useState(0);
  const [hasKitchen, setHasKitchen] = useState(false);
  const [hasTapchan, setHasTapchan] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);

  const capacityOptions = [
    { value: 0, label: t('rooms.capacityAll') },
    { value: 3, label: `3 ${t('common.seatedPerson')}` },
    { value: 4, label: `4 ${t('common.seatedPerson')}` },
    { value: 6, label: `6 ${t('common.seatedPerson')}` },
    { value: 8, label: `8 ${t('common.seatedPerson')}` },
    { value: 10, label: `10 ${t('common.seatedPerson')}` },
  ];

  const sortOptions = [
    { value: 'default', label: t('rooms.sortDefault') },
    { value: 'price-asc', label: t('rooms.sortPriceAsc') },
    { value: 'price-desc', label: t('rooms.sortPriceDesc') },
    { value: 'capacity-desc', label: t('rooms.sortCapacityDesc') },
  ];

  const rooms = useMemo(() => {
    let result = getAccommodations(language).filter((a) => a.type === 'room');

    if (capacity > 0) {
      result = result.filter((a) => a.capacity === capacity);
    }
    if (hasKitchen) {
      result = result.filter((a) => a.hasKitchen);
    }
    if (hasTapchan) {
      result = result.filter((a) => a.hasPrivateTapchan);
    }

    switch (sortBy) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'capacity-desc':
        result = [...result].sort((a, b) => b.capacity - a.capacity);
        break;
    }

    return result;
  }, [language, capacity, hasKitchen, hasTapchan, sortBy]);

  const activeFilterCount = (capacity > 0 ? 1 : 0) + (hasKitchen ? 1 : 0) + (hasTapchan ? 1 : 0);

  const resetFilters = () => {
    setCapacity(0);
    setHasKitchen(false);
    setHasTapchan(false);
    setSortBy('default');
  };

  const FilterContent = () => {
    const sortLabelId = useId();
    return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-stone-900 mb-3">{t('rooms.capacityLabel')}</h3>
        <div className="flex flex-wrap gap-2">
          {capacityOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setCapacity(opt.value)}
              className={`px-3 py-1.5 text-sm rounded-sm border transition-all ${
                capacity === opt.value
                  ? 'bg-forest-700 text-white border-forest-700'
                  : 'bg-white text-stone-600 border-stone-300 hover:border-forest-400'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-stone-900 mb-3">{t('rooms.additionalLabel')}</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={hasKitchen}
              onChange={(e) => setHasKitchen(e.target.checked)}
              className="w-4 h-4 accent-forest-600"
            />
            <span className="text-sm text-stone-600 group-hover:text-stone-900">{t('rooms.hasKitchen')}</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={hasTapchan}
              onChange={(e) => setHasTapchan(e.target.checked)}
              className="w-4 h-4 accent-forest-600"
            />
            <span className="text-sm text-stone-600 group-hover:text-stone-900">{t('rooms.hasTapchan')}</span>
          </label>
        </div>
      </div>

      <div>
        <h3 id={sortLabelId} className="text-sm font-semibold text-stone-900 mb-3">{t('rooms.sortLabel')}</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          aria-labelledby={sortLabelId}
          className="w-full px-3 py-2 border border-stone-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {activeFilterCount > 0 && (
        <button
          onClick={resetFilters}
          className="w-full px-4 py-2 text-sm text-stone-500 hover:text-forest-600 border border-stone-200 rounded-sm transition-colors"
        >
          {t('rooms.clearFilters')} ({activeFilterCount})
        </button>
      )}
    </div>
    );
  };

  return (
    <div>
      <PageHero
        title={t('rooms.heroTitle')}
        subtitle={t('rooms.heroSubtitle')}
        image={IMAGES.room17}
        breadcrumb={[{ label: t('common.home'), to: '/' }, { label: t('rooms.heroTitle') }]}
      />

      <section className="py-16 bg-stone-50">
        <div className="container-lux">
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-stone-500">
              {rooms.length} {t('rooms.foundRooms')}
            </p>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-stone-300 rounded-sm text-sm font-medium text-stone-700"
            >
              <SlidersHorizontal size={16} />
              {t('rooms.filtersButton')}
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 bg-forest-600 text-white rounded-full text-xs flex items-center justify-center">{activeFilterCount}</span>
              )}
            </button>
          </div>

          <div className="grid lg:grid-cols-[260px_1fr] gap-8">
            {/* Desktop sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 bg-white p-6 rounded-sm shadow-sm">
                <h2 className="font-serif text-lg font-semibold text-stone-900 mb-5 pb-4 border-b border-stone-100">
                  {t('rooms.filterHeading')}
                </h2>
                <FilterContent />
              </div>
            </aside>

            {/* Mobile filter drawer */}
            {showFilters && (
              <div className="lg:hidden fixed inset-0 z-50 bg-stone-950/50" onClick={() => setShowFilters(false)}>
                <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white p-6 overflow-y-auto animate-slide-down" onClick={(e) => e.stopPropagation()} data-lenis-prevent>
                  <div className="flex items-center justify-between mb-5 pb-4 border-b border-stone-100">
                    <h2 className="font-serif text-lg font-semibold">{t('rooms.filterHeading')}</h2>
                    <button onClick={() => setShowFilters(false)} aria-label={t('common.close')}><X size={22} className="text-stone-400" /></button>
                  </div>
                  <FilterContent />
                </div>
              </div>
            )}

            <div>
              {rooms.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-sm">
                  <p className="text-stone-500 mb-4">{t('rooms.noRoomsFound')}</p>
                  <button onClick={resetFilters} className="text-forest-600 font-medium hover:underline">
                    {t('rooms.clearFilters')}
                  </button>
                </div>
              ) : (
                <Reveal variant="fade-up" stagger={0.1} className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {rooms.map((room) => (
                    <AccommodationCard key={room.id} accommodation={room} />
                  ))}
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
