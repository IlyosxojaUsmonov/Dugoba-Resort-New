import { useState } from 'react';
import PageHero from '@/components/PageHero';
import Lightbox from '@/components/Lightbox';
import { getGalleryImages, IMAGES } from '@/data/accommodations';
import { useTranslation } from '@/i18n/useTranslation';

export default function Gallery() {
  const { t, language } = useTranslation();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const galleryImages = getGalleryImages(language);

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
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {galleryImages.map((img, i) => (
              <button
                key={`${img.url}-${i}`}
                onClick={() => setLightboxIndex(i)}
                className="block w-full break-inside-avoid relative overflow-hidden rounded-sm group"
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end p-4">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-xs text-forest-300 uppercase tracking-wider mb-1">{img.category}</p>
                    <p className="text-white text-sm font-medium">{img.caption}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {lightboxIndex !== null && (
            <Lightbox
              images={galleryImages.map((img) => img.url)}
              startIndex={lightboxIndex}
              onClose={() => setLightboxIndex(null)}
            />
          )}
        </div>
      </section>
    </div>
  );
}
