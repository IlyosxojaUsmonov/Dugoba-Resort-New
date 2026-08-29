import { Link } from 'react-router-dom';
import { Users, ArrowRight, Check } from 'lucide-react';
import type { Accommodation } from '@/data/accommodations';
import { useBookingModal } from '@/lib/store';
import { useTranslation } from '@/i18n/useTranslation';
import { useTilt } from '@/hooks/useTilt';

interface Props {
  accommodation: Accommodation;
}

export default function AccommodationCard({ accommodation }: Props) {
  const openBooking = useBookingModal((s) => s.open);
  const { t } = useTranslation();
  const tiltRef = useTilt<HTMLDivElement>(7);

  return (
    <div ref={tiltRef} className="lux-card group flex flex-col will-change-transform">
      <Link to={`/obyekt/${accommodation.id}`} className="relative overflow-hidden block aspect-[4/3]">
        <img
          src={accommodation.mainImage}
          alt={accommodation.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-125 group-hover:brightness-105"
        />
        <div
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-20deg] pointer-events-none"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {accommodation.isLuxury && (
          <span className="absolute top-4 left-4 px-3 py-1 bg-sand-500 text-white text-xs font-semibold tracking-wider uppercase rounded-sm">
            {t('accommodationCard.premium')}
          </span>
        )}
        {accommodation.hasKitchen && (
          <span className="absolute top-4 right-4 px-3 py-1 bg-forest-600 text-white text-xs font-medium tracking-wider rounded-sm">
            {t('accommodationCard.kitchenAvailable')}
          </span>
        )}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            <span className="text-xs text-forest-300 tracking-[0.15em] uppercase font-medium">
              {accommodation.category}
            </span>
            <h3 className="font-serif text-xl text-white font-semibold mt-1 leading-tight">
              {accommodation.name}
            </h3>
          </div>
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-4 text-sm text-stone-600 mb-4">
          <span className="flex items-center gap-1.5">
            <Users size={16} className="text-forest-600" />
            {accommodation.capacity} {t('accommodationCard.person')}
          </span>
          <span className="w-px h-4 bg-stone-300" />
          <span className="text-xs text-stone-500">{accommodation.location}</span>
        </div>

        <p className="text-sm text-stone-600 leading-relaxed line-clamp-2 mb-4 flex-1">
          {accommodation.shortDescription}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {accommodation.amenities.slice(0, 4).map((a) => (
            <span key={a} className="flex items-center gap-1 text-[11px] text-stone-500 bg-stone-100 px-2 py-1 rounded-sm">
              <Check size={11} className="text-forest-500" />
              {a}
            </span>
          ))}
          {accommodation.amenities.length > 4 && (
            <span className="text-[11px] text-stone-400 px-2 py-1">
              +{accommodation.amenities.length - 4}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-stone-100">
          <div>
            <span className="text-xs text-stone-400 block">{t('accommodationCard.dailyPrice')}</span>
            <span className="font-serif text-lg font-semibold text-stone-900">
              {accommodation.priceDisplay}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => openBooking(accommodation.id, accommodation.name, accommodation.priceDisplay)}
              className="px-4 py-2.5 bg-forest-700 text-white text-sm font-medium rounded-sm hover:bg-forest-800 transition-colors"
            >
              {t('accommodationCard.book')}
            </button>
            <Link
              to={`/obyekt/${accommodation.id}`}
              className="w-10 h-10 flex items-center justify-center border border-stone-300 rounded-sm text-stone-600 hover:border-forest-600 hover:text-forest-600 transition-all"
              aria-label={t('accommodationCard.details')}
            >
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
