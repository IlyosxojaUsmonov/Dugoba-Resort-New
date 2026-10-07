import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, MapPin, Clock, Flag, Phone, Send, Star, Heart,
  AlertTriangle, CheckCircle2, X, Calendar, Package,
} from 'lucide-react';
import { useApp } from '../context';
import {
  CATEGORY_LABELS, CONDITION_LABELS,
} from '../types';
import { StatusBadge } from '../components/StatusBadge';
import { CategoryIcon } from '../components/CategoryIcon';
import { CATEGORIES } from '../types';
import { formatRelativeTime, formatDate } from '../utils';

export function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getListingById, reserveListing, cancelReservation, markAsTaken, currentUser } = useApp();
  const listing = id ? getListingById(id) : undefined;

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  if (!listing) {
    return (
      <div className="container-page py-20 text-center">
        <Package className="mx-auto h-12 w-12 text-neutral-300" />
        <h1 className="mt-4 text-xl font-semibold text-neutral-800">
          E\'lon topilmadi
        </h1>
        <p className="mt-2 text-neutral-500">
          Bu e\'lon o\'chirilgan yoki hech qachon mavjud bo\'lmagan bo\'lishi mumkin.
        </p>
        <Link to="/browse" className="mt-6 inline-flex btn-primary">
          E\'lonlarga qaytish
        </Link>
      </div>
    );
  }

  const cat = CATEGORIES.find((c) => c.value === listing.category);
  const isReservedByMe = listing.reservedBy === currentUser.id;
  const isMyListing = listing.giverId === currentUser.id;

  const handleConfirmBooking = () => {
    if (listing) {
      reserveListing(listing.id);
      setBookingConfirmed(true);
    }
  };

  const handleCloseModal = () => {
    setShowBookingModal(false);
    setBookingConfirmed(false);
  };

  return (
    <div className="container-page py-8 lg:py-12">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-primary-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Orqaga
      </button>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="aspect-square overflow-hidden rounded-xl bg-neutral-100">
            <img
              src={listing.images[activeImage]}
              alt={listing.title}
              className="h-full w-full object-cover"
            />
          </div>
          {listing.images.length > 1 && (
            <div className="mt-3 flex gap-3">
              {listing.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`h-20 w-20 overflow-hidden rounded-lg border-2 transition-colors ${
                    activeImage === i ? 'border-primary-500' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
                  <CategoryIcon name={cat?.icon ?? 'package'} className="h-3.5 w-3.5" />
                  {CATEGORY_LABELS[listing.category]}
                </span>
                <StatusBadge status={listing.status} />
              </div>
              <h1 className="mt-3 font-display text-2xl font-semibold text-neutral-800 lg:text-3xl">
                {listing.title}
              </h1>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary-700">0 so'm</div>
              <div className="text-xs text-neutral-400">tekina</div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-neutral-500">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-primary-500" />
              {listing.district} — {listing.landmark}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-primary-500" />
              {formatRelativeTime(listing.createdAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Package className="h-4 w-4 text-primary-500" />
              {CONDITION_LABELS[listing.condition]}
            </span>
          </div>

          <div className="mt-6">
            <h2 className="text-sm font-semibold text-neutral-700">Tavsif</h2>
            <p className="mt-2 leading-relaxed text-neutral-600">
              {listing.description}
            </p>
          </div>

          {/* Food details */}
          {listing.foodDetails && (
            <div className="mt-6 rounded-xl border border-accent-200 bg-accent-50 p-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-accent-800">
                <Calendar className="h-4 w-4" />
                Oziq-ovqat ma'lumotlari
              </h3>
              <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
                <div>
                  <div className="text-xs text-accent-700">Tayyorlangan/Qadoqlangan</div>
                  <div className="mt-1 font-semibold text-neutral-800">
                    {formatDate(listing.foodDetails.packagedDate)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-accent-700">Yaroqlilik muddati</div>
                  <div className="mt-1 font-semibold text-neutral-800">
                    {formatDate(listing.foodDetails.expiryDate)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-accent-700">Turi</div>
                  <div className="mt-1 font-semibold text-neutral-800">
                    {listing.foodDetails.isCooked ? 'Pishirilgan' : 'Qadoqlangan'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Giver info */}
          <div className="mt-6 flex items-center gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-semibold">
              {listing.giverName.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-neutral-800">{listing.giverName}</div>
              <div className="mt-0.5 flex items-center gap-3 text-xs text-neutral-500">
                <span className="inline-flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-accent-500" fill="currentColor" />
                  {listing.giverRating}.0
                </span>
                <span>{listing.giverHelpCount} marta yordam bergan</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            {isMyListing ? (
              <div className="w-full rounded-xl bg-neutral-100 p-4 text-center text-sm text-neutral-500">
                Bu sizning e'loningiz. Holatini profilingizdan boshqarishingiz mumkin.
              </div>
            ) : listing.status === 'available' ? (
              <button
                onClick={() => setShowBookingModal(true)}
                className="btn-primary flex-1 text-base"
              >
                <Heart className="h-5 w-5" />
                Bron qilish
              </button>
            ) : isReservedByMe ? (
              <>
                <div className="flex-1 rounded-xl border border-accent-200 bg-accent-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-accent-800">
                    <CheckCircle2 className="h-5 w-5" />
                    Siz bu e'lonni bron qildingiz
                  </div>
                  <p className="mt-2 text-xs text-accent-700">
                    24 soat ichida olib ketilmasa, bron avtomatik bekor bo'ladi.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => markAsTaken(listing.id)}
                      className="btn-primary text-sm"
                    >
                      Olib ketdim
                    </button>
                    <button
                      onClick={() => cancelReservation(listing.id)}
                      className="btn-outline text-sm"
                    >
                      Bekor qilish
                    </button>
                  </div>
                </div>
              </>
            ) : listing.status === 'reserved' ? (
              <div className="w-full rounded-xl bg-neutral-100 p-4 text-center text-sm text-neutral-500">
                Bu e'lon boshqa kishi tomonidan bron qilingan
              </div>
            ) : (
              <div className="w-full rounded-xl bg-neutral-100 p-4 text-center text-sm text-neutral-500">
                Bu e'lon olib ketilgan
              </div>
            )}

            {!isMyListing && (
              <Link
                to={`/complaint/${listing.id}`}
                className="btn-ghost text-sm"
              >
                <Flag className="h-4 w-4" />
                Shikoyat qilish
              </Link>
            )}
          </div>

          {/* Contact (visible when reserved by me) */}
          {isReservedByMe && (
            <div className="mt-4 rounded-xl border border-primary-200 bg-primary-50 p-5">
              <h3 className="text-sm font-semibold text-primary-800">
                Beruvchi bilan bog'laning
              </h3>
              <div className="mt-3 flex flex-wrap gap-3">
                <a
                  href={`tel:${listing.giverPhone}`}
                  className="btn-outline text-sm"
                >
                  <Phone className="h-4 w-4" />
                  {listing.giverPhone}
                </a>
                <a
                  href={`https://t.me/${listing.giverTelegram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-sm"
                >
                  <Send className="h-4 w-4" />
                  {listing.giverTelegram}
                </a>
              </div>
            </div>
          )}

          {/* Safety disclaimer */}
          <div className="mt-6 flex gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 text-accent-600" />
            <p className="text-xs leading-relaxed text-neutral-500">
              <strong className="text-neutral-700">Eslatma:</strong> Platforma
              faqat muloqot vositasidir. Buyum holatini uchrashganda tekshirib
              oling. Oziq-ovqatda yaroqlilik muddatiga e'tibor bering. Pul
              so\'ralsa, darhol shikoyat qiling.
            </p>
          </div>
        </div>
      </div>

      {/* Booking modal */}
      {showBookingModal && (
        <BookingModal
          listingTitle={listing.title}
          confirmed={bookingConfirmed}
          onConfirm={handleConfirmBooking}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

function BookingModal({
  listingTitle,
  confirmed,
  onConfirm,
  onClose,
}: {
  listingTitle: string;
  confirmed: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');

  const handleConfirm = () => {
    if (!agreed) {
      setError('Davom etish uchun tasdiqlang kerak');
      return;
    }
    setError('');
    onConfirm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {confirmed ? (
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
              <CheckCircle2 className="h-8 w-8 text-primary-600" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-neutral-800">
              Bron qilindi!
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              «{listingTitle}» e'loni siz uchun bron qilindi. Beruvchining
              kontakt ma'lumotlari e'lon sahifasida ko'rinadi.
            </p>
            <p className="mt-3 rounded-lg bg-accent-50 p-3 text-xs text-accent-700">
              24 soat ichida olib ketilmasa, bron avtomatik bekor bo'ladi.
            </p>
            <button onClick={onClose} className="mt-6 btn-primary w-full">
              Tushunarli
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between">
              <h2 className="text-xl font-semibold text-neutral-800">
                Bron qilishni tasdiqlang
              </h2>
              <button onClick={onClose} className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-3 text-sm text-neutral-500">
              «{listingTitle}» e'lonini bron qilmoqchisiz. Bron qilingandan
              keyin beruvchining telefon va Telegram kontakti sizga ochiladi.
            </p>
            <div className="mt-4 rounded-lg bg-accent-50 p-3 text-xs text-accent-700">
              24 soat ichida olib ketilmasa, bron avtomatik bekor bo'ladi.
            </div>
            <label className="mt-4 flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked);
                  setError('');
                }}
                className="mt-1 h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-neutral-600">
                Men haqiqatan bu buyumni olib ketish niyatidaman va 24 soat
                ichida uchrashishga tayyorman.
              </span>
            </label>
            {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
            <div className="mt-5 flex gap-3">
              <button onClick={onClose} className="btn-outline flex-1">
                Bekor qilish
              </button>
              <button onClick={handleConfirm} className="btn-primary flex-1">
                Bron qilish
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
