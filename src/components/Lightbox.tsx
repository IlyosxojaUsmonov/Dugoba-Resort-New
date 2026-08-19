import { useState, useCallback, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';

interface LightboxProps {
  images: string[];
  startIndex: number;
  onClose: () => void;
}

export default function Lightbox({ images, startIndex, onClose }: LightboxProps) {
  const { t } = useTranslation();
  const [index, setIndex] = useState(startIndex);

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, next, prev]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      <button
        className="absolute top-6 right-6 text-white/80 hover:text-white p-2 transition-colors z-10"
        onClick={onClose}
        aria-label={t('lightbox.close')}
      >
        <X size={32} />
      </button>

      {images.length > 1 && (
        <>
          <button
            className="absolute left-4 sm:left-8 text-white/80 hover:text-white p-2 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label={t('lightbox.previous')}
          >
            <ChevronLeft size={40} />
          </button>
          <button
            className="absolute right-4 sm:right-8 text-white/80 hover:text-white p-2 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label={t('lightbox.next')}
          >
            <ChevronRight size={40} />
          </button>
        </>
      )}

      <img
        src={images[index]}
        alt=""
        className="max-w-[90vw] max-h-[85vh] object-contain animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      />

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
        {index + 1} / {images.length}
      </div>
    </div>
  );
}
