import { useEffect, type ReactNode } from 'react';
import { initLenis, destroyLenis } from '@/lib/lenis';

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    initLenis();
    return () => destroyLenis();
  }, []);

  return <>{children}</>;
}
