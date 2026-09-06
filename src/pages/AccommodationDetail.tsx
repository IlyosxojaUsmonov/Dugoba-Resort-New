import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import {
  Users, Wifi, Tv, ShowerHead, Check, ArrowRight,
  ChevronRight, Utensils, Camera, ImageOff,
} from 'lucide-react';
import { getAccommodationById, getRelatedAccommodations } from '@/data/accommodations';
import { useBookingModal } from '@/lib/store';
import { useTranslation } from '@/i18n/useTranslation';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import AccommodationCard from '@/components/AccommodationCard';
import Lightbox from '@/components/Lightbox';
import VideoPlayer from '@/components/VideoPlayer';
import Reveal from '@/components/motion/Reveal';

export default function AccommodationDetail() {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useTranslation();
  const openBooking = useBookingModal((s) => s.open);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const accommodation = id ? getAccommodationById(id, language) : undefined;

  useDocumentMeta({
    title: accommodation ? accommodation.name : t('accommodationDetail.notFoundTitle'),
    description: accommodation
      ? accommodation.shortDescription
      : t('accommodationDetail.notFoundDesc'),
  });

  if (!accommodation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 pt-20">
        <div className="text-center">
          <h2 className="font-serif text-2xl text-stone-900 mb-4">{t('accommodationDetail.notFoundTitle')}</h2>
          <p className="text-stone-600 mb-6">{t('accommodationDetail.notFoundDesc')}</p>
          <Link to="/xonalar" className="btn-primary">{t('accommodationDetail.backToRooms')}</Link>
        </div>
      </div>
    );
  }

  const { available } = accommodation;
  const related = getRelatedAccommodations(accommodation.id, language, 3);
  const allImages = [accommodation.mainImage, ...accommodation.gallery, ...accommodation.tapchanImages];
  if (accommodation.hasKitchen) {
    allImages.push(...accommodation.kitchenImages);
  }
  const uniqueImages = [...new Set(allImages)];

  return (
    <div className="pt-16">
      {/* HERO */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        {available ? (
          <img src={accommodation.mainImage} alt={accommodation.name} className="w-full h-full object-cover" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-stone-800 text-stone-400">
            <ImageOff size={36} strokeWidth={1.5} />
            <span className="text-xs font-semibold tracking-[0.25em] uppercase">{t('accommodationCard.unavailable')}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/30 to-forest-950/40" />

        <div className="absolute bottom-0 left-0 right-0 pb-12">
          <div className="container-lux">
            <nav className="flex items-center gap-2 text-xs text-white/60 mb-4">
              <Link to="/" className="hover:text-sand-300">{t('common.home')}</Link>
              <ChevronRight size={12} />
              <Link to={accommodation.type === 'cottage' ? '/kottejlar' : '/xonalar'} className="hover:text-sand-300">
                {accommodation.type === 'cottage' ? t('accommodationDetail.cottages') : t('accommodationDetail.rooms')}
              </Link>
              <ChevronRight size={12} />
              <span className="text-sand-300">{accommodation.name}</span>
            </nav>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-sm text-sand-300 tracking-[0.2em] uppercase font-medium">
                  {accommodation.category}
                </span>
                <h1 className="font-serif italic text-3xl sm:text-5xl font-semibold text-white text-shadow-lux mt-2">
                  {accommodation.name}
                </h1>
                <div className="flex items-center gap-4 mt-4 text-white/80 text-sm">
                  <span className="flex items-center gap-1.5"><Users size={16} /> {accommodation.capacity} {t('accommodationDetail.personSuffix')}</span>
                  <span className="w-px h-4 bg-white/30" />
                  <span>{accommodation.location}</span>
                  {accommodation.isLuxury && (
                    <>
                      <span className="w-px h-4 bg-white/30" />
                      <span className="text-sand-300 font-medium">{t('accommodationDetail.premium')}</span>
                    </>
                  )}
                  {!available && (
                    <>
                      <span className="w-px h-4 bg-white/30" />
                      <span className="text-clay-300 font-medium">{t('accommodationCard.unavailable')}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-white/60 block">{t('accommodationDetail.dailyPrice')}</span>
                <span className="font-serif text-2xl sm:text-3xl font-semibold text-white">
                  {accommodation.priceDisplay}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK INFO BAR */}
      <section className="bg-white border-b border-stone-100 py-6">
        <div className="container-lux flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-stone-600">
              <Users size={20} className="text-forest-600" />
              <span>{accommodation.capacity} {t('accommodationDetail.seatedSuffix')}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-stone-600">
              <Wifi size={20} className="text-forest-600" />
              <span>{t('accommodationDetail.wifi')}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-stone-600">
              <Tv size={20} className="text-forest-600" />
              <span>{t('accommodationDetail.tv')}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-stone-600">
              <ShowerHead size={20} className="text-forest-600" />
              <span>{t('accommodationDetail.shower')}</span>
            </div>
            {accommodation.hasKitchen && (
              <div className="flex items-center gap-2 text-sm text-stone-600">
                <Utensils size={20} className="text-forest-600" />
                <span>{t('accommodationDetail.kitchen')}</span>
              </div>
            )}
          </div>
          {available ? (
            <button
              onClick={() => openBooking(accommodation.id, accommodation.name, accommodation.priceDisplay)}
              className="btn-primary"
            >
              {t('accommodationDetail.bookNow')}
            </button>
          ) : (
            <span className="text-sm font-semibold uppercase tracking-wide text-stone-400" title={t('accommodationCard.unavailableNote')}>
              {t('accommodationCard.unavailable')}
            </span>
          )}
        </div>
      </section>

      {/* SHORT DESCRIPTION */}
      <section className="py-16 bg-stone-50">
        <div className="container-lux">
          <div className="max-w-3xl">
            <p className="section-subtitle">{t('accommodationDetail.shortDescSubtitle')}</p>
            <h2 className="section-title mb-6">{accommodation.name}</h2>
            <p className="text-lg text-stone-700 leading-relaxed">{accommodation.shortDescription}</p>
          </div>
        </div>
      </section>

      {/* MAIN IMAGE + GALLERY */}
      <section className="py-16 bg-white">
        <div className="container-lux">
          <p className="section-subtitle mb-3">{t('accommodationDetail.gallerySubtitle')}</p>
          <h2 className="section-title mb-8">{t('accommodationDetail.galleryTitle')}</h2>

          {available ? (
            <>
              <Reveal variant="fade-up" stagger={0.05} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {uniqueImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxIndex(i)}
                    className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                      i === 0 ? 'col-span-2 row-span-2 aspect-square md:aspect-auto' : 'aspect-[4/3]'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${accommodation.name} - ${i + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera size={14} className="text-stone-700" />
                    </div>
                  </button>
                ))}
              </Reveal>

              {lightboxIndex !== null && (
                <Lightbox
                  images={uniqueImages}
                  startIndex={lightboxIndex}
                  onClose={() => setLightboxIndex(null)}
                />
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 bg-stone-100 text-stone-400 py-20 rounded-xl">
              <ImageOff size={32} strokeWidth={1.5} />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase">{t('accommodationCard.unavailable')}</span>
            </div>
          )}
        </div>
      </section>

      {/* VIDEO SECTION */}
      {accommodation.video && (
        <section className="py-16 bg-stone-50">
          <div className="container-lux max-w-4xl">
            <p className="section-subtitle mb-3">{t('accommodationDetail.videoSubtitle')}</p>
            <h2 className="section-title mb-8">{t('accommodationDetail.videoTitle')}</h2>
            {available ? (
              <>
                <VideoPlayer
                  thumbnail={accommodation.videoPoster ?? accommodation.mainImage}
                  title={`${accommodation.name} — ${t('accommodationDetail.videoPlayerSuffix')}`}
                  videoSrc={accommodation.video}
                  orientation="portrait"
                />
                <p className="text-sm text-stone-500 mt-4 text-center">
                  {accommodation.type === 'cottage' ? t('accommodationDetail.videoNoteCottage') : t('accommodationDetail.videoNoteRoom')}
                </p>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 bg-stone-200 text-stone-400 py-20 rounded-xl max-w-md mx-auto">
                <ImageOff size={32} strokeWidth={1.5} />
                <span className="text-xs font-semibold tracking-[0.2em] uppercase">{t('accommodationCard.unavailable')}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* DETAILED DESCRIPTION */}
      <section className="py-16 bg-white">
        <div className="container-lux max-w-4xl">
          <p className="section-subtitle mb-3">{t('accommodationDetail.detailedSubtitle')}</p>
          <h2 className="section-title mb-6">{t('accommodationDetail.detailedTitle')}</h2>
          <p className="text-stone-700 leading-relaxed text-lg">{accommodation.description}</p>
        </div>
      </section>

      {/* AMENITIES */}
      <section className="py-16 bg-stone-50">
        <div className="container-lux max-w-4xl">
          <p className="section-subtitle mb-3">{t('accommodationDetail.amenitiesSubtitle')}</p>
          <h2 className="section-title mb-8">{t('accommodationDetail.amenitiesTitle')}</h2>
          <Reveal variant="fade-up" stagger={0.06} className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {accommodation.amenities.map((amenity) => (
              <div key={amenity} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-stone-100">
                <div className="w-8 h-8 rounded-full bg-forest-50 flex items-center justify-center shrink-0">
                  <Check size={16} className="text-forest-600" />
                </div>
                <span className="text-sm text-stone-700 font-medium">{amenity}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* TAPCHAN */}
      <section className="py-16 bg-white">
        <div className="container-lux">
          <p className="section-subtitle mb-3">{t('accommodationDetail.tapchanSubtitle')}</p>
          <h2 className="section-title mb-4">{t('accommodationDetail.tapchanTitle')}</h2>
          <p className="text-stone-600 mb-8 max-w-2xl">
            {accommodation.type === 'cottage'
              ? t('accommodationDetail.tapchanDescCottage')
              : t('accommodationDetail.tapchanDescRoom')}
          </p>
          <Reveal variant="fade-up" stagger={0.08} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {accommodation.tapchanImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(uniqueImages.indexOf(img) >= 0 ? uniqueImages.indexOf(img) : 0)}
                className="relative overflow-hidden rounded-xl group aspect-[4/3]"
              >
                <img src={img} alt={`${t('accommodationDetail.tapchanAlt')} ${i + 1}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
              </button>
            ))}
          </Reveal>
        </div>
      </section>

      {/* KITCHEN (if applicable) */}
      {accommodation.hasKitchen && accommodation.kitchenImages.length > 0 && (
        <section className="py-16 bg-stone-50">
          <div className="container-lux">
            <p className="section-subtitle mb-3">{t('accommodationDetail.kitchenSubtitle')}</p>
            <h2 className="section-title mb-4">{t('accommodationDetail.kitchenTitle')}</h2>
            <p className="text-stone-600 mb-8 max-w-2xl">
              {accommodation.id === 'cottage-5'
                ? t('accommodationDetail.kitchenDescLux')
                : t('accommodationDetail.kitchenDescDefault')}
            </p>
            <Reveal variant="fade-up" stagger={0.08} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {accommodation.kitchenImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(uniqueImages.indexOf(img) >= 0 ? uniqueImages.indexOf(img) : 0)}
                  className="relative overflow-hidden rounded-xl group aspect-[4/3]"
                >
                  <img src={img} alt={`${t('accommodationDetail.kitchenAlt')} ${i + 1}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
                </button>
              ))}
            </Reveal>
            {accommodation.kitchenVideo && (
              <div className="max-w-2xl">
                <VideoPlayer
                  thumbnail={accommodation.kitchenImages[0] || accommodation.mainImage}
                  title={t('accommodationDetail.kitchenVideoTitle')}
                  videoSrc={accommodation.kitchenVideo}
                  orientation="portrait"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* BOOKING CTA */}
      <section className="py-16 bg-forest-950 text-white">
        <div className="container-lux text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-4">
            {accommodation.name}{t('accommodationDetail.bookCtaSuffix')}
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            {t('accommodationDetail.bookCtaDesc')}
          </p>
          {available ? (
            <button
              onClick={() => openBooking(accommodation.id, accommodation.name, accommodation.priceDisplay)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-forest-600 text-white font-medium rounded-xl hover:bg-forest-500 transition-colors"
            >
              {t('accommodationDetail.bookNow')}
              <ArrowRight size={18} />
            </button>
          ) : (
            <span className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white/50 font-medium rounded-xl" title={t('accommodationCard.unavailableNote')}>
              {t('accommodationCard.unavailable')}
            </span>
          )}
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="py-20 bg-stone-50">
          <div className="container-lux">
            <p className="section-subtitle mb-3">{t('accommodationDetail.relatedSubtitle')}</p>
            <h2 className="section-title mb-8">{t('accommodationDetail.relatedTitle')}</h2>
            <Reveal variant="fade-up" stagger={0.12} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r, i) => (
                <AccommodationCard key={r.id} accommodation={r} index={i} />
              ))}
            </Reveal>
          </div>
        </section>
      )}
    </div>
  );
}
