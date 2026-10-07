import { useLayoutEffect, useRef, type ElementType, type ReactNode } from 'react';
import gsap from 'gsap';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export type RevealVariant = 'fade-up' | 'fade-in' | 'mask-reveal' | 'pop-in' | 'slide-left' | 'slide-right';

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  as?: ElementType;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  /** Stagger in seconds; when set, animates the wrapper's direct children instead of the wrapper itself. */
  stagger?: number;
  start?: string;
}

const VARIANT_FROM: Record<RevealVariant, gsap.TweenVars> = {
  'fade-up': { opacity: 0, y: 40 },
  'fade-in': { opacity: 0 },
  'mask-reveal': { clipPath: 'inset(0 0 100% 0)' },
  'pop-in': { opacity: 0, scale: 0.6 },
  'slide-left': { opacity: 0, x: -60 },
  'slide-right': { opacity: 0, x: 60 },
};

const VARIANT_TO: Record<RevealVariant, gsap.TweenVars> = {
  'fade-up': { opacity: 1, y: 0 },
  'fade-in': { opacity: 1 },
  'mask-reveal': { clipPath: 'inset(0 0 0% 0)' },
  'pop-in': { opacity: 1, scale: 1 },
  'slide-left': { opacity: 1, x: 0 },
  'slide-right': { opacity: 1, x: 0 },
};

const VARIANT_EASE: Partial<Record<RevealVariant, string>> = {
  'pop-in': 'back.out(1.7)',
  'mask-reveal': 'power3.out',
};

export default function Reveal({
  children,
  variant = 'fade-up',
  as: Tag = 'div',
  className,
  delay = 0,
  duration = 0.9,
  y,
  stagger,
  start = 'top 85%',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduced || !ref.current) return;

    const from = { ...VARIANT_FROM[variant] };
    if (variant === 'fade-up' && typeof y === 'number') from.y = y;

    const ctx = gsap.context(() => {
      const targets: Element | Element[] = stagger
        ? gsap.utils.toArray<Element>(ref.current!.children)
        : ref.current!;

      gsap.set(targets, from);
      gsap.to(targets, {
        ...VARIANT_TO[variant],
        duration,
        delay,
        ease: VARIANT_EASE[variant] ?? 'power3.out',
        stagger: stagger ?? 0,
        scrollTrigger: {
          trigger: ref.current,
          start,
          once: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [reduced, variant, delay, duration, y, stagger, start]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
