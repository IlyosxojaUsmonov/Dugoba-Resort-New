import { useState } from 'react';
import { Play, X } from 'lucide-react';

type Orientation = 'portrait' | 'landscape';

interface VideoPlayerProps {
  thumbnail: string | null;
  title: string;
  youtubeId?: string | null;
  videoSrc?: string | null;
  orientation?: Orientation;
  /** Modalda kartochka bosilganda video darhol ishga tushadi. */
  startPlaying?: boolean;
  /** Portret videoning maksimal kengligi — kattaroq ko'rsatish uchun. */
  portraitMaxWidth?: string;
}

/** Poster rasmi bo'lmaganda videoning birinchi kadri ko'rsatiladi. */
function posterFrameSrc(src: string) {
  return `${src}#t=0.1`;
}

export default function VideoPlayer({
  thumbnail,
  title,
  youtubeId = null,
  videoSrc = null,
  orientation = 'landscape',
  startPlaying = false,
  portraitMaxWidth = 'max-w-[380px]',
}: VideoPlayerProps) {
  const [playing, setPlaying] = useState(startPlaying);
  const isPortrait = orientation === 'portrait';
  const frameClass = isPortrait ? `w-full ${portraitMaxWidth} aspect-[9/16] mx-auto` : 'aspect-video';

  if (playing && videoSrc) {
    return (
      <div className={`relative ${frameClass} rounded-sm overflow-hidden bg-black animate-scale-in`}>
        <video
          className="w-full h-full"
          src={videoSrc}
          poster={thumbnail ?? undefined}
          title={title}
          controls
          autoPlay
          playsInline
        />
      </div>
    );
  }

  if (playing && youtubeId) {
    return (
      <div className={`relative ${frameClass} rounded-sm overflow-hidden bg-black animate-scale-in`}>
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div
      className={`relative ${frameClass} rounded-sm overflow-hidden bg-stone-900 group cursor-pointer`}
      onClick={() => setPlaying(true)}
    >
      {thumbnail ? (
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : videoSrc ? (
        <video
          src={posterFrameSrc(videoSrc)}
          preload="metadata"
          muted
          playsInline
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : null}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-forest-600/80">
          <Play size={32} className="text-white ml-1" fill="white" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <p className="text-white font-medium text-sm">{title}</p>
      </div>
    </div>
  );
}

export function VideoModal({
  thumbnail,
  title,
  onClose,
  youtubeId,
  videoSrc,
  orientation = 'landscape',
  portraitMaxWidth,
}: {
  thumbnail: string | null;
  title: string;
  onClose: () => void;
  youtubeId?: string | null;
  videoSrc?: string | null;
  orientation?: Orientation;
  portraitMaxWidth?: string;
}) {
  const isPortrait = orientation === 'portrait';

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center animate-fade-in p-4" onClick={onClose}>
      <button className="absolute top-6 right-6 text-white/80 hover:text-white p-2" onClick={onClose}>
        <X size={32} />
      </button>
      <div className={`w-full ${isPortrait ? 'max-w-sm' : 'max-w-5xl'}`} onClick={(e) => e.stopPropagation()}>
        <VideoPlayer
          thumbnail={thumbnail}
          title={title}
          youtubeId={youtubeId}
          videoSrc={videoSrc}
          orientation={orientation}
          portraitMaxWidth={portraitMaxWidth}
          startPlaying
        />
      </div>
    </div>
  );
}
