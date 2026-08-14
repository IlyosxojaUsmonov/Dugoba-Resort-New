import { useState } from 'react';
import { Mountain, Camera } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Lightbox from '@/components/Lightbox';
import VideoPlayer from '@/components/VideoPlayer';
import { IMAGES } from '@/data/accommodations';

const mountainImages = [
  IMAGES.mountain1, IMAGES.mountain2, IMAGES.mountain3, IMAGES.mountain4,
  IMAGES.mountain5, IMAGES.mountain6, IMAGES.mountain7, IMAGES.mountain8,
  IMAGES.mountain9, IMAGES.mountain10, IMAGES.mountain11, IMAGES.mountain12,
];

export default function MountainViews() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div>
      <PageHero
        title="Tog' manzarasi"
        subtitle="Resortning eng yuqori nuqtasidan tog'larning go'zal va hayratlanarli manzarasi"
        image={IMAGES.mountain2}
        breadcrumb={[{ label: 'Bosh sahifa', to: '/' }, { label: 'Tog\' manzarasi' }]}
      />

      {/* INTRO */}
      <section className="py-24 bg-white">
        <div className="container-lux max-w-4xl text-center">
          <Mountain size={48} className="mx-auto text-forest-600 mb-6" />
          <p className="section-subtitle">Eng yuqori nuqta</p>
          <h2 className="section-title mb-6">Tog' manzarasidan bahramand bo'ling</h2>
          <p className="text-lg text-stone-600 leading-relaxed">
            Dugoba Resort Farg'ona viloyati, Shohimardon qishlog'ining eng yuqori nuqtasida
            joylashgan. Resort tog'ning eng yuqori qismida joylashgani sababli bu yerdan
            tog'lar va go'zal tog' manzarasi juda yaxshi ko'rinadi. Bu resortning asosiy
            vizual afzalliklaridan biridir.
          </p>
        </div>
      </section>

      {/* PARALLAX 1 */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center parallax-bg" style={{ backgroundImage: `url(${IMAGES.mountain3})` }}>
        <div className="absolute inset-0 bg-stone-950/40" />
        <div className="relative text-center text-white px-4">
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-shadow-lux">
            Cheksiz tog' manzarasi
          </h2>
          <p className="text-white/80 mt-4 max-w-xl mx-auto">
            Har kuni kun botishi va kun chiqishi boshqacha go'zallikni namoyish etadi
          </p>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-20 bg-white">
        <div className="container-lux">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="section-subtitle">Foto galereya</p>
              <h2 className="section-title">Tog' manzaralari</h2>
            </div>
            <span className="text-sm text-stone-400 flex items-center gap-2">
              <Camera size={16} /> {mountainImages.length} ta rasm
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {mountainImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                className={`relative overflow-hidden rounded-sm group ${
                  i === 0 || i === 5 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-[4/3]'
                }`}
              >
                <img
                  src={img}
                  alt={`Tog' manzarasi ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </button>
            ))}
          </div>

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
      <section className="relative h-[50vh] min-h-[300px] flex items-center justify-center parallax-bg" style={{ backgroundImage: `url(${IMAGES.mountain5})` }}>
        <div className="absolute inset-0 bg-stone-950/40" />
        <div className="relative text-center text-white px-4">
          <p className="text-white/70 text-sm tracking-[0.3em] uppercase mb-4">Shohimardon</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-shadow-lux">
            Farg'ona viloyati
          </h2>
        </div>
      </section>

      {/* VIDEO */}
      <section className="py-20 bg-white">
        <div className="container-lux max-w-4xl">
          <p className="section-subtitle mb-3">Video</p>
          <h2 className="section-title mb-8">Tog' manzarasi videosi</h2>
          <VideoPlayer
            thumbnail={IMAGES.mountain1}
            title="Dugoba Resort — tog' manzarasi videosi"
          />
        </div>
      </section>
    </div>
  );
}
