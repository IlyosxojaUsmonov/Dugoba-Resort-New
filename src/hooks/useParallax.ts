import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { shouldReduceMotion } from '@/lib/perf';

/**
 * Attach the returned ref to an oversized background layer (e.g. `absolute inset-[-10%] object-cover`)
 * inside an `overflow-hidden` container. `speed` is the fraction of the element's own height it
 * travels across its scroll range (0.2 = 20% total travel) — keep it under the layer's overscan.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(speed = 0.2) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    if (!ref.current || shouldReduceMotion()) return;
    const el = ref.current;
    const trigger = el.closest('section') ?? el.parentElement ?? el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -speed * 50 },
        {
          yPercent: speed * 50,
          ease: 'none',
          scrollTrigger: {
            trigger,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    });

    return () => ctx.revert();
  }, [speed]);

  return ref;
}
