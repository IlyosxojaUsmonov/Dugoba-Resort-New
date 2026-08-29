import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { shouldReduceMotion } from '@/lib/perf';

/** Mouse-follow "magnetic button" effect. Attach the returned ref to the element. */
export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(strength = 0.35, maxOffset = 14) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    if (!ref.current || shouldReduceMotion()) return;
    if (typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches) return;

    const el = ref.current;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(gsap.utils.clamp(-maxOffset, maxOffset, relX * strength));
      yTo(gsap.utils.clamp(-maxOffset, maxOffset, relY * strength));
    };

    const handleLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [strength, maxOffset]);

  return ref;
}
