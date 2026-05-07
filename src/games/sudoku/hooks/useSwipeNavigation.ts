import { useEffect } from 'react';
import type React from 'react';
import type { SudokuAction } from '../types';

const SWIPE_THRESHOLD = 30;

export function useSwipeNavigation(
  dispatch: (action: SudokuAction) => void,
  containerRef: React.RefObject<HTMLElement | null>,
  enabled: boolean,
): void {
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !enabled) return;

    let startX = 0;
    let startY = 0;

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      startX = touch.clientX;
      startY = touch.clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;

      if (Math.abs(dx) < SWIPE_THRESHOLD && Math.abs(dy) < SWIPE_THRESHOLD) return;

      if (Math.abs(dx) >= Math.abs(dy)) {
        dispatch({ type: 'MOVE_SELECTION', direction: dx > 0 ? 'right' : 'left' });
      } else {
        dispatch({ type: 'MOVE_SELECTION', direction: dy > 0 ? 'down' : 'up' });
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [dispatch, containerRef, enabled]);
}
