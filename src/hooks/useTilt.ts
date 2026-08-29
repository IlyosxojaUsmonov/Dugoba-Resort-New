import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { shouldReduceMotion } from '@/lib/perf';

/** 3D tilt-on-hover for cards, with a lift + shadow boost so the effect reads clearly. Attach the returned ref to the tilting element. */
export function useTilt<T extends HTMLElement = HTMLDivElement>(maxTilt = 8, lift = 10) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    if (!ref.current || shouldReduceMotion()) return;
    if (typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches) return;

    const el = ref.current;
    gsap.set(el, { transformPerspective: 800 });

    const rotateXTo = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3.out' });
    const rotateYTo = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3.out' });
    const scaleTo = gsap.quickTo(el, 'scale', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });

    const handleEnter = () => {
      scaleTo(1.035);
      yTo(-lift);
      gsap.to(el, { boxShadow: '0 30px 45px -15px rgba(12,29,22,0.35)', duration: 0.4, ease: 'power2.out' });
    };

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotateYTo(px * maxTilt * 2);
      rotateXTo(-py * maxTilt * 2);
    };

    const handleLeave = () => {
      rotateXTo(0);
      rotateYTo(0);
      scaleTo(1);
      yTo(0);
      gsap.to(el, { boxShadow: '0 0px 0px 0px rgba(12,29,22,0)', duration: 0.4, ease: 'power2.out' });
    };

    el.addEventListener('mouseenter', handleEnter);
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      el.removeEventListener('mouseenter', handleEnter);
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [maxTilt, lift]);

  return ref;
}
