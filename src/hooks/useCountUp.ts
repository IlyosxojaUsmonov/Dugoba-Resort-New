import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/** Animates a "29", "5", "100%"-style string from 0 up to its numeric value once scrolled into view. */
export function useCountUp<T extends HTMLElement = HTMLSpanElement>(value: string, duration = 1.6) {
  const ref = useRef<T>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!match || reduced) {
      el.textContent = value;
      return;
    }

    const target = parseFloat(match[1]);
    const suffix = match[2] ?? '';
    const decimals = match[1].includes('.') ? match[1].split('.')[1].length : 0;
    const counter = { val: 0 };

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        val: target,
        duration,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onUpdate: () => {
          el.textContent = `${counter.val.toFixed(decimals)}${suffix}`;
        },
      });
    }, el);

    return () => ctx.revert();
  }, [value, duration, reduced]);

  return ref;
}
