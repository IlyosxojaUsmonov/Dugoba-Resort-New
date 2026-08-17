import { useState } from 'react';
import { Play, X } from 'lucide-react';

interface VideoPlayerProps {
  thumbnail: string;
  title: string;
  youtubeId?: string | null;
  videoSrc?: string | null;
}

export default function VideoPlayer({ thumbnail, title, youtubeId = null, videoSrc = null }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);

  if (playing && videoSrc) {
    return (
      <div className="relative aspect-video rounded-sm overflow-hidden bg-black animate-scale-in">
        <video
          className="w-full h-full"
          src={videoSrc}
          title={title}
          controls
          autoPlay
        />
      </div>
    );
  }

  if (playing && youtubeId) {
    return (
      <div className="relative aspect-video rounded-sm overflow-hidden bg-black animate-scale-in">
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
    <div className="relative aspect-video rounded-sm overflow-hidden group cursor-pointer" onClick={() => setPlaying(true)}>
      <img src={thumbnail} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
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
}: {
  thumbnail: string;
  title: string;
  onClose: () => void;
  youtubeId?: string | null;
  videoSrc?: string | null;
}) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center animate-fade-in p-4" onClick={onClose}>
      <button className="absolute top-6 right-6 text-white/80 hover:text-white p-2" onClick={onClose}>
        <X size={32} />
      </button>
      <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <VideoPlayer thumbnail={thumbnail} title={title} youtubeId={youtubeId} videoSrc={videoSrc} />
      </div>
    </div>
  );
}
