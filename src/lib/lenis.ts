import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '@/lib/perf';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
let tickerFn: ((time: number) => void) | null = null;
let heightObserver: ResizeObserver | null = null;
let refreshTimer: number | null = null;

export function initLenis(): Lenis | null {
  // ScrollTrigger caches each trigger's pixel position the moment it's created,
  // using whatever font is rendering at that instant. Web fonts (and lazy images)
  // finish loading afterwards — especially late on slower mobile connections —
  // and the resulting reflow silently desyncs every trigger from the real layout,
  // leaving Reveal-wrapped content stuck at opacity:0 forever. Re-measuring
  // whenever the document's height actually changes keeps triggers honest. This
  // runs unconditionally (even when Lenis itself is skipped for reduced motion)
  // because ScrollTrigger tracks native scroll on its own either way.
  if (!heightObserver && typeof window !== 'undefined') {
    const scheduleRefresh = () => {
      if (refreshTimer !== null) window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    };
    document.fonts?.ready?.then(scheduleRefresh);
    heightObserver = new ResizeObserver(scheduleRefresh);
    heightObserver.observe(document.body);
  }

  if (lenis) return lenis;
  if (prefersReducedMotion()) return null;

  lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
    syncTouch: false,
    wheelMultiplier: 1,
    // Lets modals, dropdowns, and the mobile drawer's own overflow-y-auto areas
    // scroll natively under the cursor instead of always driving the page scroll.
    allowNestedScroll: true,
  });

  lenis.on('scroll', ScrollTrigger.update);

  tickerFn = (time: number) => {
    lenis?.raf(time * 1000);
  };
  gsap.ticker.add(tickerFn);
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function getLenis(): Lenis | null {
  return lenis;
}

export function destroyLenis(): void {
  if (tickerFn) {
    gsap.ticker.remove(tickerFn);
    tickerFn = null;
  }
  if (heightObserver) {
    heightObserver.disconnect();
    heightObserver = null;
  }
  if (refreshTimer !== null) {
    window.clearTimeout(refreshTimer);
    refreshTimer = null;
  }
  lenis?.destroy();
  lenis = null;
}
