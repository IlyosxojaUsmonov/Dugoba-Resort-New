import { useState, useMemo } from 'react';
import { Play, Video } from 'lucide-react';
import PageHero from '@/components/PageHero';
import { videoItems, videoCategories, IMAGES } from '@/data/accommodations';
import { VideoModal } from '@/components/VideoPlayer';

export default function Videos() {
  const [activeCategory, setActiveCategory] = useState<string>('Barchasi');
  const [selectedVideo, setSelectedVideo] = useState<{ thumbnail: string; title: string } | null>(null);

  const filteredVideos = useMemo(() => {
    if (activeCategory === 'Barchasi') return videoItems;
    return videoItems.filter((v) => v.category === activeCategory);
  }, [activeCategory]);

  return (
    <div>
      <PageHero
        title="Videolar"
        subtitle="Resort hududi, kottejlar, xonalar, kuxna va tog' manzaralari videolari"
        image={IMAGES.resortPool}
        breadcrumb={[{ label: 'Bosh sahifa', to: '/' }, { label: 'Videolar' }]}
      />

      <section className="py-20 bg-white">
        <div className="container-lux">
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
            {videoCategories.map((cat) => (
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <div key={video.id} className="group cursor-pointer" onClick={() => setSelectedVideo({ thumbnail: video.thumbnail, title: video.title })}>
                <div className="relative aspect-video rounded-sm overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-forest-600/80">
                      <Play size={28} className="text-white ml-1" fill="white" />
                    </div>
                  </div>
                  <span className="absolute top-3 left-3 px-2 py-1 bg-stone-900/70 backdrop-blur-sm text-white text-[10px] uppercase tracking-wider rounded-sm">
                    {video.category}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-stone-900 mt-4 group-hover:text-forest-700 transition-colors">
                  {video.title}
                </h3>
                <p className="text-sm text-stone-500 mt-1">{video.description}</p>
              </div>
            ))}
          </div>

          {/* Note about videos */}
          <div className="mt-16 text-center bg-stone-50 p-8 rounded-sm">
            <Video size={32} className="mx-auto text-forest-600 mb-4" />
            <p className="text-stone-600 max-w-2xl mx-auto">
              Har bir xona va kottej uchun alohida videolar mavjud. Videolar keyinchalik
              qo'shilishi mumkin. Hozirgi vaqtda placeholder rasmlar ko'rsatilmoqda.
              Obyekt sahifasiga kirib har bir xona va kottejning videosini ko'rishingiz mumkin.
            </p>
          </div>
        </div>
      </section>

      {selectedVideo && (
        <VideoModal
          thumbnail={selectedVideo.thumbnail}
          title={selectedVideo.title}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
}
