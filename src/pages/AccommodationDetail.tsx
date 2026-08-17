import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import {
  Users, Wifi, Tv, ShowerHead, Check, ArrowRight,
  ChevronRight, Utensils, Camera,
} from 'lucide-react';
import { getAccommodationById, getRelatedAccommodations } from '@/data/accommodations';
import { useBookingModal } from '@/lib/store';
import AccommodationCard from '@/components/AccommodationCard';
import Lightbox from '@/components/Lightbox';
import VideoPlayer from '@/components/VideoPlayer';

export default function AccommodationDetail() {
  const { id } = useParams<{ id: string }>();
  const openBooking = useBookingModal((s) => s.open);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const accommodation = id ? getAccommodationById(id) : undefined;

  if (!accommodation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 pt-20">
        <div className="text-center">
          <h2 className="font-serif text-2xl text-stone-900 mb-4">Obyekt topilmadi</h2>
          <p className="text-stone-600 mb-6">So'ralgan obyekt mavjud emas yoki o'chirilgan.</p>
          <Link to="/xonalar" className="btn-primary">Xonalarga qaytish</Link>
        </div>
      </div>
    );
  }

  const related = getRelatedAccommodations(accommodation.id, 3);
  const allImages = [accommodation.mainImage, ...accommodation.gallery, ...accommodation.tapchanImages];
  if (accommodation.hasKitchen) {
    allImages.push(...accommodation.kitchenImages);
  }
  const uniqueImages = [...new Set(allImages)];

  return (
    <div className="pt-16">
      {/* HERO */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img src={accommodation.mainImage} alt={accommodation.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-stone-950/40" />

        <div className="absolute bottom-0 left-0 right-0 pb-12">
          <div className="container-lux">
            <nav className="flex items-center gap-2 text-xs text-white/60 mb-4">
              <Link to="/" className="hover:text-forest-300">Bosh sahifa</Link>
              <ChevronRight size={12} />
              <Link to={accommodation.type === 'cottage' ? '/kottejlar' : '/xonalar'} className="hover:text-forest-300">
                {accommodation.type === 'cottage' ? 'Kottejlar' : 'Xonalar'}
              </Link>
              <ChevronRight size={12} />
              <span className="text-forest-300">{accommodation.name}</span>
            </nav>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-sm text-forest-300 tracking-[0.2em] uppercase font-medium">
                  {accommodation.category}
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-white text-shadow-lux mt-2">
                  {accommodation.name}
                </h1>
                <div className="flex items-center gap-4 mt-4 text-white/80 text-sm">
                  <span className="flex items-center gap-1.5"><Users size={16} /> {accommodation.capacity} kishi</span>
                  <span className="w-px h-4 bg-white/30" />
                  <span>{accommodation.location}</span>
                  {accommodation.isLuxury && (
                    <>
                      <span className="w-px h-4 bg-white/30" />
                      <span className="text-sand-300 font-medium">Premium</span>
                    </>
                  )}
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-white/60 block">Kunlik narx</span>
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
              <span>{accommodation.capacity} kishilik</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-stone-600">
              <Wifi size={20} className="text-forest-600" />
              <span>Wi-Fi</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-stone-600">
              <Tv size={20} className="text-forest-600" />
              <span>Televizor</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-stone-600">
              <ShowerHead size={20} className="text-forest-600" />
              <span>Dush va sanuzel</span>
            </div>
            {accommodation.hasKitchen && (
              <div className="flex items-center gap-2 text-sm text-stone-600">
                <Utensils size={20} className="text-forest-600" />
                <span>Kuxnya</span>
              </div>
            )}
          </div>
          <button
            onClick={() => openBooking(accommodation.id, accommodation.name, accommodation.priceDisplay)}
            className="btn-primary"
          >
            Bron qilish
          </button>
        </div>
      </section>

      {/* SHORT DESCRIPTION */}
      <section className="py-16 bg-stone-50">
        <div className="container-lux">
          <div className="max-w-3xl">
            <p className="section-subtitle">Qisqa tavsif</p>
            <h2 className="section-title mb-6">{accommodation.name}</h2>
            <p className="text-lg text-stone-700 leading-relaxed">{accommodation.shortDescription}</p>
          </div>
        </div>
      </section>

      {/* MAIN IMAGE + GALLERY */}
      <section className="py-16 bg-white">
        <div className="container-lux">
          <p className="section-subtitle mb-3">Foto galereya</p>
          <h2 className="section-title mb-8">Rasmlar</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {uniqueImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                className={`relative overflow-hidden rounded-sm group cursor-pointer ${
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
          </div>

          {lightboxIndex !== null && (
            <Lightbox
              images={uniqueImages}
              startIndex={lightboxIndex}
              onClose={() => setLightboxIndex(null)}
            />
          )}
        </div>
      </section>

      {/* VIDEO SECTION */}
      {accommodation.video && (
        <section className="py-16 bg-stone-50">
          <div className="container-lux max-w-4xl">
            <p className="section-subtitle mb-3">Video</p>
            <h2 className="section-title mb-8">Obyekt videosi</h2>
            <VideoPlayer
              thumbnail={accommodation.mainImage}
              title={`${accommodation.name} — video ko'rinish`}
              videoSrc={accommodation.video}
            />
            <p className="text-sm text-stone-500 mt-4 text-center">
              Ushbu {accommodation.type === 'cottage' ? 'kottej' : 'xona'} haqida to'liq ma'lumot olish uchun videoni tomosha qiling.
            </p>
          </div>
        </section>
      )}

      {/* DETAILED DESCRIPTION */}
      <section className="py-16 bg-white">
        <div className="container-lux max-w-4xl">
          <p className="section-subtitle mb-3">Batafsil tavsif</p>
          <h2 className="section-title mb-6">To'liq ma'lumot</h2>
          <p className="text-stone-700 leading-relaxed text-lg">{accommodation.description}</p>
        </div>
      </section>

      {/* AMENITIES */}
      <section className="py-16 bg-stone-50">
        <div className="container-lux max-w-4xl">
          <p className="section-subtitle mb-3">Qulayliklar</p>
          <h2 className="section-title mb-8">Barcha qulayliklar</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {accommodation.amenities.map((amenity) => (
              <div key={amenity} className="flex items-center gap-3 p-4 bg-white rounded-sm border border-stone-100">
                <div className="w-8 h-8 rounded-full bg-forest-50 flex items-center justify-center shrink-0">
                  <Check size={16} className="text-forest-600" />
                </div>
                <span className="text-sm text-stone-700 font-medium">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TAPCHAN */}
      <section className="py-16 bg-white">
        <div className="container-lux">
          <p className="section-subtitle mb-3">Dam olish zonasi</p>
          <h2 className="section-title mb-4">Shaxsiy so'ri/tapchan</h2>
          <p className="text-stone-600 mb-8 max-w-2xl">
            {accommodation.type === 'cottage'
              ? 'Kottejning orqa qismida mehmonlar dam olishlari uchun shaxsiy so\'ri/tapchan mavjud.'
              : 'Xonaga biriktirilgan shaxsiy so\'ri/tapchan mehmonlar uchun dam olishni qulay qiladi.'}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {accommodation.tapchanImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(uniqueImages.indexOf(img) >= 0 ? uniqueImages.indexOf(img) : 0)}
                className="relative overflow-hidden rounded-sm group aspect-[4/3]"
              >
                <img src={img} alt={`Tapchan ${i + 1}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* KITCHEN (if applicable) */}
      {accommodation.hasKitchen && accommodation.kitchenImages.length > 0 && (
        <section className="py-16 bg-stone-50">
          <div className="container-lux">
            <p className="section-subtitle mb-3">Kuxnya</p>
            <h2 className="section-title mb-4">Shaxsiy kuxnya</h2>
            <p className="text-stone-600 mb-8 max-w-2xl">
              {accommodation.id === 'cottage-5'
                ? 'Lux kottejning ichida faqat ushbu kottej mehmonlari uchun mo\'ljallangan alohida kuxnya mavjud. Kuxnyada stol va stullar mavjud. Mehmonlar o\'zlari ovqat tayyorlashlari mumkin.'
                : 'Ovqat pishirish uchun alohida kuxnya mavjud. Mehmonlar o\'zlari ovqat tayyorlashlari mumkin.'}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {accommodation.kitchenImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(uniqueImages.indexOf(img) >= 0 ? uniqueImages.indexOf(img) : 0)}
                  className="relative overflow-hidden rounded-sm group aspect-[4/3]"
                >
                  <img src={img} alt={`Kuxnya ${i + 1}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
                </button>
              ))}
            </div>
            {accommodation.kitchenVideo && (
              <div className="max-w-2xl">
                <VideoPlayer
                  thumbnail={accommodation.kitchenImages[0] || accommodation.mainImage}
                  title="Kuxnya videosi"
                  videoSrc={accommodation.kitchenVideo}
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
            {accommodation.name}ni bron qiling
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            Administrator bo'sh kunlarni tekshiradi va sizga xabar beradi.
            Kelish va ketish sanasini kiritish shart emas.
          </p>
          <button
            onClick={() => openBooking(accommodation.id, accommodation.name, accommodation.priceDisplay)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-forest-600 text-white font-medium rounded-sm hover:bg-forest-500 transition-colors"
          >
            Bron qilish
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="py-20 bg-stone-50">
          <div className="container-lux">
            <p className="section-subtitle mb-3">O'xshash obyektlar</p>
            <h2 className="section-title mb-8">Shu kabi sig'imli obyektlar</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <AccommodationCard key={r.id} accommodation={r} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
