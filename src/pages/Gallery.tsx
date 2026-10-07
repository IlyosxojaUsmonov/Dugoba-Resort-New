import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Lightbox from '@/components/Lightbox';
import { getGalleryImages, IMAGES } from '@/data/accommodations';
import { useTranslation } from '@/i18n/useTranslation';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import Reveal from '@/components/motion/Reveal';

export default function Gallery() {
  const { t, language } = useTranslation();
  useDocumentMeta({ title: t('gallery.heroTitle'), description: t('gallery.heroSubtitle') });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const galleryImages = getGalleryImages(language);
  const availableImages = galleryImages.filter((img) => img.available);

  return (
    <div>
      <PageHero
        title={t('gallery.heroTitle')}
        subtitle={t('gallery.heroSubtitle')}
        image={IMAGES.atrofMuhitTog}
        breadcrumb={[{ label: t('common.home'), to: '/' }, { label: t('gallery.heroTitle') }]}
      />

      <section className="py-20 bg-white">
        <div className="container-lux">
          {/* Masonry grid */}
          <Reveal variant="fade-up" stagger={0.04} className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {galleryImages.map((img, i) =>
              img.available ? (
                <button
                  key={`${img.url}-${i}`}
                  onClick={() => setLightboxIndex(availableImages.indexOf(img))}
                  className="block w-full break-inside-avoid relative overflow-hidden rounded-xl group"
                >
                  <img
                    src={img.url}
                    alt={img.caption}
                    loading="lazy"
                    width={img.width}
                    height={img.height}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end p-4">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-xs text-forest-300 uppercase tracking-wider mb-1">{img.category}</p>
                      <p className="text-white text-sm font-medium">{img.caption}</p>
                    </div>
                  </div>
                </button>
              ) : (
                <div
                  key={`${img.url}-${i}`}
                  style={{ aspectRatio: `${img.width} / ${img.height}` }}
                  className="flex w-full break-inside-avoid flex-col items-center justify-center gap-2 rounded-xl bg-stone-100 text-stone-400"
                >
                  <ImageOff size={24} strokeWidth={1.5} />
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">{t('common.unavailable')}</span>
                </div>
              ),
            )}
          </Reveal>

          {lightboxIndex !== null && (
            <Lightbox
              images={availableImages.map((img) => img.url)}
              startIndex={lightboxIndex}
              onClose={() => setLightboxIndex(null)}
            />
          )}
        </div>
      </section>
    </div>
  );
}
