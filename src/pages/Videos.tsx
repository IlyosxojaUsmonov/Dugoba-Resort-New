import { useState } from 'react';
import { Play, Video } from 'lucide-react';
import PageHero from '@/components/PageHero';
import { getVideoItems, IMAGES, type VideoItem } from '@/data/accommodations';
import { VideoModal } from '@/components/VideoPlayer';
import { useTranslation } from '@/i18n/useTranslation';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import Reveal from '@/components/motion/Reveal';

type SelectedVideo = {
  thumbnail: string | null;
  title: string;
  videoSrc?: string | null;
  orientation?: 'portrait' | 'landscape';
};

function VideoCard({ video, onOpen }: { video: VideoItem; onOpen: (v: VideoItem) => void }) {
  const isPortrait = video.orientation === 'portrait';

  return (
    <div className="group cursor-pointer" onClick={() => onOpen(video)}>
      <div className={`relative ${isPortrait ? 'aspect-[9/16]' : 'aspect-video'} rounded-sm overflow-hidden bg-stone-900`}>
        {video.thumbnail && (
          <img
            src={video.thumbnail}
            alt={video.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-forest-600/80">
            <Play size={24} className="text-white ml-1" fill="white" />
          </div>
        </div>
        <span className="absolute top-3 left-3 px-2 py-1 bg-stone-900/70 backdrop-blur-sm text-white text-[10px] uppercase tracking-wider rounded-sm">
          {video.category}
        </span>
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
          <p className="text-white font-medium text-sm">{video.title}</p>
        </div>
      </div>
    </div>
  );
}

export default function Videos() {
  const { t, language } = useTranslation();
  useDocumentMeta({ title: t('videos.heroTitle'), description: t('videos.heroSubtitle') });
  const [selectedVideo, setSelectedVideo] = useState<SelectedVideo | null>(null);
  const videoItems = getVideoItems(language);
  const natureVideos = videoItems.filter((v) => v.id.startsWith('vid-tabiat'));
  const resortVideos = videoItems.filter((v) => !v.id.startsWith('vid-tabiat'));

  function openVideo(video: VideoItem) {
    setSelectedVideo({
      thumbnail: video.thumbnail,
      title: video.title,
      videoSrc: video.videoSrc,
      orientation: video.orientation,
    });
  }

  return (
    <div>
      <PageHero
        title={t('videos.heroTitle')}
        subtitle={t('videos.heroSubtitle')}
        image={IMAGES.resortPool}
        breadcrumb={[{ label: t('common.home'), to: '/' }, { label: t('videos.heroTitle') }]}
      />

      {resortVideos.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container-lux">
            <h2 className="font-serif text-3xl font-semibold text-stone-900">{t('videos.resortTitle')}</h2>
            <p className="text-stone-500 mt-2 max-w-2xl">{t('videos.resortSubtitle')}</p>

            <Reveal variant="fade-up" stagger={0.08} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8">
              {resortVideos.map((video) => (
                <VideoCard key={video.id} video={video} onOpen={openVideo} />
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {/* Tabiat videolari — bo'yiga (vertikal) olingan */}
      {natureVideos.length > 0 && (
        <section className="py-20 bg-stone-50">
          <div className="container-lux">
            <h2 className="font-serif text-3xl font-semibold text-stone-900">{t('videos.natureTitle')}</h2>
            <p className="text-stone-500 mt-2 max-w-2xl">{t('videos.natureSubtitle')}</p>

            <Reveal variant="fade-up" stagger={0.08} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8">
              {natureVideos.map((video) => (
                <VideoCard key={video.id} video={video} onOpen={openVideo} />
              ))}
            </Reveal>

            {/* Note about videos */}
            <div className="mt-16 text-center bg-white p-8 rounded-sm">
              <Video size={32} className="mx-auto text-forest-600 mb-4" />
              <p className="text-stone-600 max-w-2xl mx-auto">
                {t('videos.note')}
              </p>
            </div>
          </div>
        </section>
      )}

      {selectedVideo && (
        <VideoModal
          thumbnail={selectedVideo.thumbnail}
          title={selectedVideo.title}
          videoSrc={selectedVideo.videoSrc}
          orientation={selectedVideo.orientation}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
}
