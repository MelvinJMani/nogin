import { useEffect } from 'react';
import { useDailyLimitStore } from '../store/useDailyLimitStore';

export type UseDailyLimitReturn = {
  isLimitReached: boolean;
  usedTodayMs: number;
  dailyBudgetMs: number;
  remainingMs: number;
  isHydrated: boolean;
};

export function useDailyLimit(): UseDailyLimitReturn {
  const { isLimitReached, usedTodayMs, dailyBudgetMs, isHydrated, hydrate, startSession, pauseSession, tick } =
    useDailyLimitStore();

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!isHydrated || isLimitReached) return;

    startSession();

    const interval = setInterval(() => {
      tick(Date.now());
    }, 1000);

    const onVisibilityChange = () => {
      if (document.hidden) {
        pauseSession();
      } else {
        startSession();
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      pauseSession();
    };
  }, [isHydrated, isLimitReached, startSession, pauseSession, tick]);

  return {
    isLimitReached,
    usedTodayMs,
    dailyBudgetMs,
    remainingMs: Math.max(0, dailyBudgetMs - usedTodayMs),
    isHydrated,
  };
}
