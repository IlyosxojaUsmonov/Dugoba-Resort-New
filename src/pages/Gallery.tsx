import { useState, useMemo } from 'react';
import PageHero from '@/components/PageHero';
import Lightbox from '@/components/Lightbox';
import { galleryImages, galleryCategories, IMAGES } from '@/data/accommodations';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<string>('Barchasi');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = useMemo(() => {
    if (activeCategory === 'Barchasi') return galleryImages;
    return galleryImages.filter((img) => img.category === activeCategory);
  }, [activeCategory]);

  return (
    <div>
      <PageHero
        title="Galereya"
        subtitle="Resort hududi, tog' manzaralari, kottejlar, xonalar va boshqa go'zalliklar"
        image={IMAGES.resortGarden}
        breadcrumb={[{ label: 'Bosh sahifa', to: '/' }, { label: 'Galereya' }]}
      />

      <section className="py-20 bg-white">
        <div className="container-lux">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            <button
              onClick={() => setActiveCategory('Barchasi')}
              className={`px-4 py-2 text-sm rounded-sm border transition-all ${
                activeCategory === 'Barchasi'
                  ? 'bg-forest-700 text-white border-forest-700'
                  : 'bg-white text-stone-600 border-stone-300 hover:border-forest-400'
              }`}
            >
              Barchasi
            </button>
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm rounded-sm border transition-all ${
                  activeCategory === cat
                    ? 'bg-forest-700 text-white border-forest-700'
                    : 'bg-white text-stone-600 border-stone-300 hover:border-forest-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {filteredImages.map((img, i) => (
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
              images={filteredImages.map((img) => img.url)}
              startIndex={lightboxIndex}
              onClose={() => setLightboxIndex(null)}
            />
          )}
        </div>
      </section>
    </div>
  );
}
