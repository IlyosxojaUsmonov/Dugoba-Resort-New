import { Link } from 'react-router-dom';
import { Users, ArrowUpRight } from 'lucide-react';
import type { Accommodation } from '@/data/accommodations';
import { useBookingModal } from '@/lib/store';
import { useTranslation } from '@/i18n/useTranslation';

interface Props {
  accommodation: Accommodation;
  index?: number;
}

export default function AccommodationCard({ accommodation, index }: Props) {
  const openBooking = useBookingModal((s) => s.open);
  const { t } = useTranslation();

  return (
    <div className="group flex flex-col">
      <Link to={`/obyekt/${accommodation.id}`} className="relative overflow-hidden block aspect-[4/5] bg-stone-100">
        <img
          src={accommodation.mainImage}
          alt={accommodation.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="absolute top-4 left-4 index-tag text-white/90 mix-blend-difference">
          {typeof index === 'number' ? String(index + 1).padStart(2, '0') : ''}
        </span>
        {accommodation.isLuxury && (
          <span className="absolute top-4 right-4 px-2.5 py-1 bg-sand-400 text-stone-950 text-[10px] font-bold tracking-wider uppercase">
            {t('accommodationCard.premium')}
          </span>
        )}
        <ArrowUpRight
          size={28}
          className="absolute bottom-4 right-4 text-white opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"
        />
      </Link>

      <div className="pt-4 flex flex-col flex-1">
        <span className="text-[11px] text-clay-600 tracking-[0.2em] uppercase font-semibold">
          {accommodation.category}
        </span>
        <h3 className="font-serif italic text-2xl text-stone-950 mt-1 leading-tight">
          {accommodation.name}
        </h3>

        <div className="flex items-center gap-3 text-xs text-stone-500 mt-2 mb-3">
          <span className="flex items-center gap-1.5">
            <Users size={13} />
            {accommodation.capacity} {t('accommodationCard.person')}
          </span>
          <span className="w-px h-3 bg-stone-300" />
          <span>{accommodation.location}</span>
        </div>

        <p className="text-sm text-stone-600 leading-relaxed line-clamp-2 flex-1">
          {accommodation.shortDescription}
        </p>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-200">
          <span className="font-serif italic text-lg text-stone-950">
            {accommodation.priceDisplay}
          </span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => openBooking(accommodation.id, accommodation.name, accommodation.priceDisplay)}
              className="text-[11px] font-bold tracking-[0.2em] uppercase text-stone-950 border-b border-stone-950 pb-0.5 hover:text-clay-700 hover:border-clay-700 transition-colors"
            >
              {t('accommodationCard.book')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
