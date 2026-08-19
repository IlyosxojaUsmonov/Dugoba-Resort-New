import { useState } from 'react';
import { Check, Clock, MapPin, ArrowRight, Calendar, Bus } from 'lucide-react';
import PageHero from '@/components/PageHero';
import { getTourPackages, IMAGES } from '@/data/accommodations';
import VideoPlayer from '@/components/VideoPlayer';
import Lightbox from '@/components/Lightbox';
import { useTranslation } from '@/i18n/useTranslation';

export default function TourPackages() {
  const { t, language } = useTranslation();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const tourPackages = getTourPackages(language);

  const allGalleryImages = tourPackages.flatMap((pkg) => pkg.gallery);

  return (
    <div>
      <PageHero
        title={t('tourPackages.heroTitle')}
        subtitle={t('tourPackages.heroSubtitle')}
        image={IMAGES.mountain1}
        breadcrumb={[{ label: t('common.home'), to: '/' }, { label: t('tourPackages.heroTitle') }]}
      />

      {/* INTRO */}
      <section className="py-20 bg-white">
        <div className="container-lux max-w-4xl text-center">
          <Bus size={40} className="mx-auto text-forest-600 mb-6" />
          <h2 className="section-title mb-6">{t('tourPackages.introTitle')}</h2>
          <p className="text-lg text-stone-600 leading-relaxed">
            {t('tourPackages.introDesc')}
          </p>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="py-20 bg-stone-50">
        <div className="container-lux">
          <div className="grid lg:grid-cols-3 gap-8">
            {tourPackages.map((pkg, idx) => (
              <div
                key={pkg.id}
                className={`lux-card flex flex-col ${idx === 1 ? 'lg:scale-105 lg:shadow-xl' : ''}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-serif text-2xl font-semibold mb-2">{pkg.name}</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1.5"><Clock size={14} /> {pkg.duration}</span>
                    </div>
                  </div>
                  {idx === 1 && (
                    <span className="absolute top-4 right-4 px-3 py-1 bg-sand-500 text-white text-xs font-semibold tracking-wider uppercase rounded-sm">
                      {t('tourPackages.recommended')}
                    </span>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <p className="text-sm text-stone-600 leading-relaxed mb-5">{pkg.description}</p>

                  <h4 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-3">
                    {t('tourPackages.packageContents')}
                  </h4>
                  <ul className="space-y-2 mb-6 flex-1">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-stone-700">
                        <Check size={16} className="text-forest-600 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-stone-100">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs text-stone-400">{t('tourPackages.price')}</span>
                      <span className="font-serif text-lg font-semibold text-forest-700">{pkg.price}</span>
                    </div>
                    <a
                      href="https://t.me/sherzod015"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-forest-700 text-white text-sm font-medium rounded-sm hover:bg-forest-800 transition-colors"
                    >
                      {t('tourPackages.contactTelegram')}
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSPORT INFO */}
      <section className="py-20 bg-white">
        <div className="container-lux">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-subtitle">{t('tourPackages.transportSubtitle')}</p>
              <h2 className="section-title mb-6">{t('tourPackages.transportTitle')}</h2>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-forest-50 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-forest-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-900 mb-1">{t('tourPackages.transport1Title')}</h4>
                    <p className="text-sm">{t('tourPackages.transport1Desc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-forest-50 flex items-center justify-center shrink-0">
                    <Calendar size={18} className="text-forest-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-900 mb-1">{t('tourPackages.transport2Title')}</h4>
                    <p className="text-sm">{t('tourPackages.transport2Desc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-forest-50 flex items-center justify-center shrink-0">
                    <Bus size={18} className="text-forest-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-900 mb-1">{t('tourPackages.transport3Title')}</h4>
                    <p className="text-sm">{t('tourPackages.transport3Desc')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <img src={IMAGES.mountain4} alt="Tog' yo'li" className="w-full h-80 object-cover rounded-sm shadow-lg" loading="lazy" />
              <div className="grid grid-cols-2 gap-4">
                <img src={IMAGES.mountain7} alt="Tog' manzarasi" className="w-full h-40 object-cover rounded-sm shadow-md" loading="lazy" />
                <img src={IMAGES.mountain9} alt="Vodiy" className="w-full h-40 object-cover rounded-sm shadow-md" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-20 bg-stone-50">
        <div className="container-lux">
          <p className="section-subtitle mb-3">{t('tourPackages.gallerySubtitle')}</p>
          <h2 className="section-title mb-8">{t('tourPackages.galleryTitle')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {allGalleryImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                className="relative overflow-hidden rounded-sm group aspect-[4/3]"
              >
                <img src={img} alt={`Tur ${i + 1}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
              </button>
            ))}
          </div>

          {lightboxIndex !== null && (
            <Lightbox
              images={allGalleryImages}
              startIndex={lightboxIndex}
              onClose={() => setLightboxIndex(null)}
            />
          )}
        </div>
      </section>

      {/* VIDEO */}
      <section className="py-20 bg-white">
        <div className="container-lux max-w-4xl">
          <p className="section-subtitle mb-3">{t('tourPackages.videoSubtitle')}</p>
          <h2 className="section-title mb-8">{t('tourPackages.videoTitle')}</h2>
          <VideoPlayer
            thumbnail={IMAGES.mountain1}
            title={t('tourPackages.videoCaption')}
          />
        </div>
      </section>
    </div>
  );
}
