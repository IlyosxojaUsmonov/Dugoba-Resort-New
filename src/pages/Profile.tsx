import { Link } from 'react-router-dom';
import { Heart, Star, MapPin, Calendar, Package, Bookmark, Plus, Award } from 'lucide-react';
import { useApp } from '../context';
import { ListingCard } from '../components/ListingCard';
import { EmptyState } from '../components/EmptyState';
import { StatusBadge } from '../components/StatusBadge';
import { CATEGORY_LABELS } from '../types';
import { formatDate } from '../utils';
import { useState } from 'react';
import { cn } from '../utils';

export function Profile() {
  const { listings, currentUser, cancelReservation, markAsTaken } = useApp();
  const [tab, setTab] = useState<'given' | 'reserved'>('given');

  const myListings = listings.filter((l) => l.giverId === currentUser.id);
  const myReservations = listings.filter(
    (l) => l.status === 'reserved' && l.reservedBy === currentUser.id
  );

  return (
    <div className="container-page py-8 lg:py-12">
      {/* Profile header */}
      <div className="card overflow-hidden">
        <div className="h-24 bg-primary-600" />
        <div className="px-6 pb-6">
          <div className="-mt-10 flex items-end gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-accent-400 font-display text-2xl font-bold text-neutral-900">
              S
            </div>
            <div className="pb-1">
              <h1 className="font-display text-xl font-semibold text-neutral-800">
                {currentUser.name}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-500">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {currentUser.district}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(currentUser.joinedAt)} dan beri
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-accent-50 px-4 py-2">
              <Award className="h-5 w-5 text-accent-600" />
              <div>
                <div className="text-xs text-neutral-500">Yordam soni</div>
                <div className="font-bold text-neutral-800">{currentUser.helpCount} marta</div>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-primary-50 px-4 py-2">
              <Star className="h-5 w-5 text-primary-600" fill="currentColor" />
              <div>
                <div className="text-xs text-neutral-500">Reyting</div>
                <div className="font-bold text-neutral-800">{currentUser.rating}.0 / 5.0</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 flex gap-2 border-b border-neutral-200">
        <TabButton active={tab === 'given'} onClick={() => setTab('given')}>
          <Package className="h-4 w-4" />
          Mening e'lonlarim ({myListings.length})
        </TabButton>
        <TabButton active={tab === 'reserved'} onClick={() => setTab('reserved')}>
          <Bookmark className="h-4 w-4" />
          Mening bronlarim ({myReservations.length})
        </TabButton>
      </div>

      {/* Tab content */}
      <div className="mt-6">
        {tab === 'given' && (
          <div>
            {myListings.length === 0 ? (
              <EmptyState
                icon={Heart}
                title="Hali hech narsa yo'q"
                description="Birinchi e'lonni siz joylashtiring — ortig'ingiz kimgadir kerak bo'lishi mumkin."
                action={
                  <Link to="/create" className="btn-primary">
                    <Plus className="h-4 w-4" />
                    E'lon joylashtirish
                  </Link>
                }
              />
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {myListings.map((listing) => (
                  <div key={listing.id}>
                    <ListingCard listing={listing} />
                    <div className="mt-2 flex items-center justify-between px-1">
                      <StatusBadge status={listing.status} />
                      <span className="text-xs text-neutral-400">
                        {CATEGORY_LABELS[listing.category]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'reserved' && (
          <div>
            {myReservations.length === 0 ? (
              <EmptyState
                icon={Bookmark}
                title="Hali bron qilgan narsa yo'q"
                description="Katalogdan kerakli buyumni toping va bron qiling. Beruvchining kontakti sizga ochiladi."
                action={
                  <Link to="/browse" className="btn-primary">
                    E'lonlarni ko'rish
                  </Link>
                }
              />
            ) : (
              <div className="space-y-4">
                {myReservations.map((listing) => (
                  <div key={listing.id} className="card flex gap-4 p-4">
                    <Link
                      to={`/listing/${listing.id}`}
                      className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-100"
                    >
                      <img src={listing.images[0]} alt="" className="h-full w-full object-cover" />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <Link
                        to={`/listing/${listing.id}`}
                        className="font-semibold text-neutral-800 hover:text-primary-700"
                      >
                        {listing.title}
                      </Link>
                      <div className="mt-1 text-sm text-neutral-500">
                        {listing.district} — {listing.landmark}
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <StatusBadge status={listing.status} />
                        <span className="text-xs text-accent-600">
                          24 soat ichida olib ketilmasa bekor bo'ladi
                        </span>
                      </div>
                      <div className="mt-auto flex gap-2 pt-3">
                        <Link
                          to={`/listing/${listing.id}`}
                          className="btn-outline text-sm"
                        >
                          Kontaktlarni ko'rish
                        </Link>
                        <button
                          onClick={() => markAsTaken(listing.id)}
                          className="btn-primary text-sm"
                        >
                          Olib ketdim
                        </button>
                        <button
                          onClick={() => cancelReservation(listing.id)}
                          className="btn-ghost text-sm"
                        >
                          Bekor qilish
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({
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
        'flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors',
        active
          ? 'border-primary-600 text-primary-700'
          : 'border-transparent text-neutral-500 hover:text-neutral-700'
      )}
    >
      {children}
    </button>
  );
}
