import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X, PackageSearch } from 'lucide-react';
import { useApp } from '../context';
import { ListingCard } from '../components/ListingCard';
import { EmptyState } from '../components/EmptyState';
import {
  CATEGORIES, CONDITIONS, DISTRICTS,
  type Category, type Condition, type ListingStatus,
} from '../types';
import { cn } from '../utils';

export function Browse() {
  const { listings } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category | 'all'>('all');
  const [district, setDistrict] = useState<string>('all');
  const [condition, setCondition] = useState<Condition | 'all'>('all');
  const [status, setStatus] = useState<ListingStatus | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return listings
      .filter((l) => l.adminStatus === 'approved')
      .filter((l) => {
        if (search) {
          const q = search.toLowerCase();
          if (
            !l.title.toLowerCase().includes(q) &&
            !l.description.toLowerCase().includes(q) &&
            !l.district.toLowerCase().includes(q)
          )
            return false;
        }
        if (category !== 'all' && l.category !== category) return false;
        if (district !== 'all' && l.district !== district) return false;
        if (condition !== 'all' && l.condition !== condition) return false;
        if (status !== 'all' && l.status !== status) return false;
        return true;
      });
  }, [listings, search, category, district, condition, status]);

  const hasActiveFilters =
    search !== '' ||
    category !== 'all' ||
    district !== 'all' ||
    condition !== 'all' ||
    status !== 'all';

  const resetFilters = () => {
    setSearch('');
    setCategory('all');
    setDistrict('all');
    setCondition('all');
    setStatus('all');
  };

  const FilterContent = () => (
    <div className="space-y-5">
      <div>
        <label className="label-text">Kategoriya</label>
        <div className="flex flex-wrap gap-2">
          <FilterChip active={category === 'all'} onClick={() => setCategory('all')}>
            Hammasi
          </FilterChip>
          {CATEGORIES.map((cat) => (
            <FilterChip
              key={cat.value}
              active={category === cat.value}
              onClick={() => setCategory(cat.value)}
            >
              {cat.label}
            </FilterChip>
          ))}
        </div>
      </div>

      <div>
        <label className="label-text">Hudud (tuman/shahar)</label>
        <select
          className="input-field"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        >
          <option value="all">Barcha hududlar</option>
          {DISTRICTS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="label-text">Holat</label>
        <div className="flex flex-wrap gap-2">
          <FilterChip active={condition === 'all'} onClick={() => setCondition('all')}>
            Hammasi
          </FilterChip>
          {CONDITIONS.map((c) => (
            <FilterChip
              key={c.value}
              active={condition === c.value}
              onClick={() => setCondition(c.value)}
            >
              {c.label}
            </FilterChip>
          ))}
        </div>
      </div>

      <div>
        <label className="label-text">Status</label>
        <div className="flex flex-wrap gap-2">
          <FilterChip active={status === 'all'} onClick={() => setStatus('all')}>
            Hammasi
          </FilterChip>
          <FilterChip active={status === 'available'} onClick={() => setStatus('available')}>
            Mavjud
          </FilterChip>
          <FilterChip active={status === 'reserved'} onClick={() => setStatus('reserved')}>
            Bron qilingan
          </FilterChip>
          <FilterChip active={status === 'taken'} onClick={() => setStatus('taken')}>
            Olib ketilgan
          </FilterChip>
        </div>
      </div>

      {hasActiveFilters && (
        <button onClick={resetFilters} className="btn-ghost text-sm">
          <X className="h-4 w-4" />
          Filtrlarni tozalash
        </button>
      )}
    </div>
  );

  return (
    <div className="container-page py-8 lg:py-12">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-3xl font-semibold text-neutral-800">
          E\'lonlar katalogi
        </h1>
        <p className="text-neutral-500">
          {filtered.length} ta e\'lon topildi — hammasi 0 so\'m
        </p>
      </div>

      {/* Search bar */}
      <div className="mt-6 flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Nima izlayapsiz? Masalan: non, kurtka, kitob..."
            className="input-field pl-11"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          className="btn-outline lg:hidden"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filtr
        </button>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Desktop sidebar filters */}
        <aside className="hidden lg:block">
          <div className="card sticky top-20 p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-neutral-700">
              <SlidersHorizontal className="h-4 w-4" />
              Filtrlash
            </h2>
            <div className="mt-4">
              <FilterContent />
            </div>
          </div>
        </aside>

        {/* Mobile filters */}
        {showFilters && (
          <div className="lg:hidden card p-5">
            <FilterContent />
          </div>
        )}

        {/* Results */}
        <div>
          {filtered.length === 0 ? (
            <EmptyState
              icon={PackageSearch}
              title="Bu filtrda hech narsa topilmadi"
              description="Filtrlarni o'zgartirib qaytib ko'ring, yoki boshqa so'z bilan qidiring."
              action={
                <button onClick={resetFilters} className="btn-outline">
                  Filtrlarni tozalash
                </button>
              }
            />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors',
        active
          ? 'bg-primary-600 text-white'
          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
      )}
    >
      {children}
    </button>
  );
}
