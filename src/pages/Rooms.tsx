import { useState, useMemo } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import PageHero from '@/components/PageHero';
import AccommodationCard from '@/components/AccommodationCard';
import { accommodations, IMAGES } from '@/data/accommodations';

const capacityOptions = [
  { value: 0, label: 'Barchasi' },
  { value: 3, label: '3 kishilik' },
  { value: 4, label: '4 kishilik' },
  { value: 6, label: '6 kishilik' },
  { value: 8, label: '8 kishilik' },
  { value: 10, label: '10 kishilik' },
];

const sortOptions = [
  { value: 'default', label: 'Standart tartib' },
  { value: 'price-asc', label: 'Narx: arzondan qimmatga' },
  { value: 'price-desc', label: 'Narx: qimmatdan arzonga' },
  { value: 'capacity-desc', label: 'Sig\'im: kattadan kichik' },
];

export default function Rooms() {
  const [capacity, setCapacity] = useState(0);
  const [hasKitchen, setHasKitchen] = useState(false);
  const [hasTapchan, setHasTapchan] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);

  const rooms = useMemo(() => {
    let result = accommodations.filter((a) => a.type === 'room');

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
  }, [capacity, hasKitchen, hasTapchan, sortBy]);

  const activeFilterCount = (capacity > 0 ? 1 : 0) + (hasKitchen ? 1 : 0) + (hasTapchan ? 1 : 0);

  const resetFilters = () => {
    setCapacity(0);
    setHasKitchen(false);
    setHasTapchan(false);
    setSortBy('default');
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold text-stone-900 mb-3">Sig'im</h4>
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
        <h4 className="text-sm font-semibold text-stone-900 mb-3">Qo'shimcha</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={hasKitchen}
              onChange={(e) => setHasKitchen(e.target.checked)}
              className="w-4 h-4 accent-forest-600"
            />
            <span className="text-sm text-stone-600 group-hover:text-stone-900">Kuxnya mavjud</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={hasTapchan}
              onChange={(e) => setHasTapchan(e.target.checked)}
              className="w-4 h-4 accent-forest-600"
            />
            <span className="text-sm text-stone-600 group-hover:text-stone-900">Shaxsiy tapchan</span>
          </label>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-stone-900 mb-3">Saralash</h4>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
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
          Filtrlarni tozalash ({activeFilterCount})
        </button>
      )}
    </div>
  );

  return (
    <div>
      <PageHero
        title="Xonalar"
        subtitle="24 ta alohida xona — 3, 4, 6, 8 va 10 kishilik variantlar, barchasi zamonaviy qulayliklar bilan"
        image={IMAGES.room17}
        breadcrumb={[{ label: 'Bosh sahifa', to: '/' }, { label: 'Xonalar' }]}
      />

      <section className="py-16 bg-stone-50">
        <div className="container-lux">
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-stone-500">
              {rooms.length} ta xona topildi
            </p>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-stone-300 rounded-sm text-sm font-medium text-stone-700"
            >
              <SlidersHorizontal size={16} />
              Filtrlar
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 bg-forest-600 text-white rounded-full text-xs flex items-center justify-center">{activeFilterCount}</span>
              )}
            </button>
          </div>

          <div className="grid lg:grid-cols-[260px_1fr] gap-8">
            {/* Desktop sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 bg-white p-6 rounded-sm shadow-sm">
                <h3 className="font-serif text-lg font-semibold text-stone-900 mb-5 pb-4 border-b border-stone-100">
                  Filtrlash
                </h3>
                <FilterContent />
              </div>
            </aside>

            {/* Mobile filter drawer */}
            {showFilters && (
              <div className="lg:hidden fixed inset-0 z-50 bg-stone-950/50" onClick={() => setShowFilters(false)}>
                <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white p-6 overflow-y-auto animate-slide-down" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-between mb-5 pb-4 border-b border-stone-100">
                    <h3 className="font-serif text-lg font-semibold">Filtrlash</h3>
                    <button onClick={() => setShowFilters(false)}><X size={22} className="text-stone-400" /></button>
                  </div>
                  <FilterContent />
                </div>
              </div>
            )}

            <div>
              {rooms.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-sm">
                  <p className="text-stone-500 mb-4">Tanlangan filtrlarga mos xona topilmadi.</p>
                  <button onClick={resetFilters} className="text-forest-600 font-medium hover:underline">
                    Filtrlarni tozalash
                  </button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {rooms.map((room) => (
                    <AccommodationCard key={room.id} accommodation={room} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
