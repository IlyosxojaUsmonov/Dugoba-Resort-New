import { useState } from 'react';
import { Check, MapPin, Calendar, CalendarClock, Bus, Play, Send } from 'lucide-react';
import PageHero from '@/components/PageHero';
import {
  getTourPackages,
  getTourMainVideo,
  getTourExtraVideos,
  IMAGES,
  resortInfo,
  type TourVideo,
} from '@/data/accommodations';
import VideoPlayer, { VideoModal } from '@/components/VideoPlayer';
import { useTranslation } from '@/i18n/useTranslation';

export default function TourPackages() {
  const { t, language } = useTranslation();
  const [activeVideo, setActiveVideo] = useState<TourVideo | null>(null);
  const tourPackages = getTourPackages(language);
  const mainVideo = getTourMainVideo(language);
  const extraVideos = getTourExtraVideos(language);

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

      {/* SEASON NOTE */}
      <section className="py-10 bg-forest-50 border-y border-forest-100">
        <div className="container-lux max-w-3xl mx-auto text-center">
          <CalendarClock size={32} className="mx-auto text-forest-600 mb-3" />
          <h3 className="font-serif text-xl font-semibold text-stone-900 mb-2">
            {t('tourPackages.seasonNoteTitle')}
          </h3>
          <p className="text-sm text-stone-600 leading-relaxed">{t('tourPackages.seasonNoteDesc')}</p>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="py-20 bg-stone-50">
        <div className="container-lux">
          <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {tourPackages.map((pkg) => (
              <div key={pkg.id} className="lux-card flex flex-col">
                <div className="p-8 flex flex-col flex-1">
                  <span className="inline-flex items-center gap-1.5 self-start px-3 py-1.5 bg-forest-100 text-forest-700 text-sm font-medium rounded-sm mb-3">
                    <Calendar size={14} /> {pkg.date}
                  </span>
                  {pkg.dateNote && (
                    <span className="inline-flex self-start px-3 py-1 bg-sand-500 text-white text-xs font-semibold tracking-wide uppercase rounded-sm mb-3">
                      {pkg.dateNote}
                    </span>
                  )}

                  <h3 className="font-serif text-2xl font-semibold text-stone-900 mb-3">{pkg.name}</h3>

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

                  <div className="pt-4 border-t border-stone-100 space-y-2 mb-5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-400">{t('tourPackages.priceBasicLabel')}</span>
                      <span className="font-serif text-base font-semibold text-forest-700">{pkg.priceBasic}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-400">{t('tourPackages.priceWithMealLabel')}</span>
                      <span className="font-serif text-base font-semibold text-forest-700">{pkg.priceWithMeal}</span>
                    </div>
                  </div>

                  <a
                    href={resortInfo.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-forest-700 text-white text-sm font-medium rounded-sm hover:bg-forest-800 transition-colors"
                  >
                    <Send size={16} />
                    {t('tourPackages.contactTelegramFull')}
                  </a>
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

      {/* BATAFSIL VIDEODA */}
      <section className="py-20 bg-white">
        <div className="container-lux">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="section-subtitle mb-3">{t('tourPackages.detailVideoSubtitle')}</p>
              <h2 className="section-title mb-6">{t('tourPackages.detailVideoTitle')}</h2>
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                {t('tourPackages.detailVideoDesc')}
              </p>
              <p className="flex items-center gap-3 text-sm text-stone-500">
                <span className="w-8 h-8 rounded-full bg-forest-50 flex items-center justify-center shrink-0">
                  <Play size={14} className="text-forest-600 ml-0.5" fill="currentColor" />
                </span>
                {t('tourPackages.detailVideoHint')}
              </p>
            </div>

            <div className="w-full">
              <VideoPlayer
                thumbnail={null}
                title={mainVideo.title}
                videoSrc={mainVideo.videoSrc}
                orientation={mainVideo.orientation}
                portraitMaxWidth="max-w-[420px] lg:max-w-[480px]"
              />
              <p className="text-sm text-stone-500 text-center mt-4 max-w-md mx-auto">
                {mainVideo.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* QOSHIMCHA VIDEOLAR */}
      {extraVideos.length > 0 && (
        <section className="py-20 bg-stone-50">
          <div className="container-lux">
            <p className="section-subtitle mb-3">{t('tourPackages.moreVideosSubtitle')}</p>
            <h2 className="section-title mb-3">{t('tourPackages.moreVideosTitle')}</h2>
            <p className="text-stone-600 max-w-2xl mb-8">{t('tourPackages.moreVideosDesc')}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {extraVideos.map((video) => (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => setActiveVideo(video)}
                  className="group text-left bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div
                    className={`relative ${video.orientation === 'portrait' ? 'aspect-[9/16]' : 'aspect-video'} bg-stone-900 overflow-hidden`}
                  >
                    <video
                      src={`${video.videoSrc}#t=0.1`}
                      preload="metadata"
                      muted
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-forest-600/80">
                        <Play size={26} className="text-white ml-1" fill="white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg font-semibold text-stone-900 mb-1.5">{video.title}</h3>
                    <p className="text-sm text-stone-600 leading-relaxed">{video.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeVideo && (
        <VideoModal
          thumbnail={null}
          title={activeVideo.title}
          videoSrc={activeVideo.videoSrc}
          orientation={activeVideo.orientation}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </div>
  );
}
