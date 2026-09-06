import { useState } from 'react';
import { Mountain, Camera } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Lightbox from '@/components/Lightbox';
import VideoPlayer from '@/components/VideoPlayer';
import { IMAGES } from '@/data/accommodations';
import { useTranslation } from '@/i18n/useTranslation';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { useParallax } from '@/hooks/useParallax';
import Reveal from '@/components/motion/Reveal';

const mountainImages = [
  IMAGES.mountain1, IMAGES.mountain2, IMAGES.mountain3, IMAGES.mountain4,
  IMAGES.mountain5, IMAGES.mountain6, IMAGES.mountain7, IMAGES.mountain9,
];

export default function MountainViews() {
  const { t } = useTranslation();
  useDocumentMeta({ title: t('mountainViews.heroTitle'), description: t('mountainViews.heroSubtitle') });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const parallax1Ref = useParallax<HTMLImageElement>(0.28);
  const parallax2Ref = useParallax<HTMLImageElement>(0.22);

  return (
    <div>
      <PageHero
        title={t('mountainViews.heroTitle')}
        subtitle={t('mountainViews.heroSubtitle')}
        image={IMAGES.mountain2}
        breadcrumb={[{ label: t('common.home'), to: '/' }, { label: t('mountainViews.heroTitle') }]}
      />

      {/* INTRO */}
      <section className="py-24 bg-white">
        <Reveal variant="fade-up" className="container-lux max-w-4xl text-center">
          <Mountain size={48} className="mx-auto text-forest-600 mb-6" />
          <p className="section-subtitle">{t('mountainViews.introSubtitle')}</p>
          <h2 className="section-title mb-6">{t('mountainViews.introTitle')}</h2>
          <p className="text-lg text-stone-600 leading-relaxed">
            {t('mountainViews.introDesc')}
          </p>
        </Reveal>
      </section>

      {/* PARALLAX 1 */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img
          ref={parallax1Ref}
          src={IMAGES.mountain3}
          alt=""
          className="absolute inset-[-12%] w-[124%] h-[124%] object-cover"
        />
        <div className="absolute inset-0 bg-stone-950/40" />
        <Reveal variant="fade-up" className="relative text-center text-white px-4">
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-shadow-lux">
            {t('mountainViews.parallax1Title')}
          </h2>
          <p className="text-white/80 mt-4 max-w-xl mx-auto">
            {t('mountainViews.parallax1Desc')}
          </p>
        </Reveal>
      </section>

      {/* GALLERY */}
      <section className="py-20 bg-white">
        <div className="container-lux">
          <Reveal variant="fade-up" className="flex items-center justify-between mb-8">
            <div>
              <p className="section-subtitle">{t('mountainViews.gallerySubtitle')}</p>
              <h2 className="section-title">{t('mountainViews.galleryTitle')}</h2>
            </div>
            <span className="text-sm text-stone-400 flex items-center gap-2">
              <Camera size={16} /> {mountainImages.length} {t('mountainViews.photoCountSuffix')}
            </span>
          </Reveal>

          <Reveal variant="fade-up" stagger={0.06} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {mountainImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                className={`relative overflow-hidden rounded-xl group ${
                  i === 0 || i === 5 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-[4/3]'
                }`}
              >
                <img
                  src={img}
                  alt={`${t('mountainViews.heroTitle')} ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </button>
            ))}
          </Reveal>

          {lightboxIndex !== null && (
            <Lightbox
              images={mountainImages}
              startIndex={lightboxIndex}
              onClose={() => setLightboxIndex(null)}
            />
          )}
        </div>
      </section>

      {/* PARALLAX 2 */}
      <section className="relative h-[50vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <img
          ref={parallax2Ref}
          src={IMAGES.mountain5}
          alt=""
          className="absolute inset-[-12%] w-[124%] h-[124%] object-cover"
        />
        <div className="absolute inset-0 bg-stone-950/40" />
        <Reveal variant="fade-up" className="relative text-center text-white px-4">
          <p className="text-white/70 text-sm tracking-[0.3em] uppercase mb-4">{t('mountainViews.parallax2Subtitle')}</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-shadow-lux">
            {t('mountainViews.parallax2Title')}
          </h2>
        </Reveal>
      </section>

      {/* VIDEO */}
      <section className="py-20 bg-white">
        <Reveal variant="fade-up" className="container-lux max-w-4xl">
          <p className="section-subtitle mb-3">{t('mountainViews.videoSubtitle')}</p>
          <h2 className="section-title mb-8">{t('mountainViews.videoTitle')}</h2>
          <VideoPlayer
            thumbnail={IMAGES.mountain1}
            title={t('mountainViews.videoCaption')}
          />
        </Reveal>
      </section>
    </div>
  );
}
