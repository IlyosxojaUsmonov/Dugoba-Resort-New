import { useEffect } from 'react';

// Shared, reference-counted body scroll lock. Several overlays (menu, booking
// modal, cookie settings, lightbox, intro loader) can each want the page
// locked at once; a naive `body.style.overflow = ''` on close from any one of
// them would unlock the page while another overlay is still open. Counting
// locks avoids that. Compensating with padding-right for the width the
// vertical scrollbar used to occupy avoids the page content snapping a few
// pixels to the right every time the lock toggles the scrollbar away.
let lockCount = 0;
let originalOverflow = '';
let originalPaddingRight = '';

function lock() {
  if (lockCount === 0) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    originalOverflow = document.body.style.overflow;
    originalPaddingRight = document.body.style.paddingRight;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      const currentPadding = parseFloat(getComputedStyle(document.body).paddingRight) || 0;
      document.body.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
    }
  }
  lockCount += 1;
}

function unlock() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = originalOverflow;
    document.body.style.paddingRight = originalPaddingRight;
  }
}

export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    lock();
    return () => unlock();
  }, [active]);
}
