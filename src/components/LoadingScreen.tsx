import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const SESSION_KEY = 'dugoba-intro-shown';

function alreadyReducedMotion(): boolean {
  return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

export default function LoadingScreen() {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') return false;
    if (alreadyReducedMotion()) return false;
    return sessionStorage.getItem(SESSION_KEY) !== '1';
  });
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!visible) return;

    if (reduced) {
      sessionStorage.setItem(SESSION_KEY, '1');
      setVisible(false);
      return;
    }

    document.body.style.overflow = 'hidden';
    const exitTimer = window.setTimeout(() => setIsExiting(true), 900);
    const doneTimer = window.setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, '1');
      document.body.style.overflow = '';
      setVisible(false);
    }, 1650);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
      document.body.style.overflow = '';
    };
  }, [visible, reduced]);

  if (!visible) return null;

  return (
    <div className={`loading-screen ${isExiting ? 'loading-screen-out' : ''}`} aria-hidden="true">
      <div className="loading-screen-panel loading-screen-panel-left" />
      <div className="loading-screen-panel loading-screen-panel-right" />
      <div className="loading-screen-content">
        <span className="loading-screen-index">No. 01 — Shohimardon</span>
        <span className="loading-screen-title">Dugoba Resort</span>
        <span className="loading-screen-rule" />
      </div>
    </div>
  );
}
