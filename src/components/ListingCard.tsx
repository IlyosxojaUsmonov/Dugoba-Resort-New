import { Link } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';
import type { Listing } from '../types';
import { CATEGORY_LABELS, CONDITION_LABELS } from '../types';
import { StatusBadge } from './StatusBadge';
import { CategoryIcon } from './CategoryIcon';
import { CATEGORIES } from '../types';
import { formatRelativeTime } from '../utils';

export function ListingCard({ listing }: { listing: Listing }) {
  const cat = CATEGORIES.find((c) => c.value === listing.category);

  return (
    <Link
      to={`/listing/${listing.id}`}
      className="group card overflow-hidden transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-3 top-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-neutral-700 shadow-sm backdrop-blur">
            <CategoryIcon name={cat?.icon ?? 'package'} className="h-3.5 w-3.5 text-primary-600" />
            {CATEGORY_LABELS[listing.category]}
          </span>
        </div>
        <div className="absolute right-3 top-3">
          <div className="rounded-full bg-white/95 px-3 py-1 shadow-sm backdrop-blur">
            <StatusBadge status={listing.status} />
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-neutral-800 leading-snug line-clamp-2 group-hover:text-primary-700 transition-colors">
          {listing.title}
        </h3>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {listing.district}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {formatRelativeTime(listing.createdAt)}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-3">
          <span className="text-xs font-medium text-neutral-600">
            {CONDITION_LABELS[listing.condition]}
          </span>
          <span className="text-lg font-bold text-primary-700">0 so'm</span>
        </div>
      </div>
    </Link>
  );
}
