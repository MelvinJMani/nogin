import { create } from 'zustand';
import { todayKey } from '../utils/time';
import { loadDailyLimit, saveDailyLimit } from '../utils/persistence';

const DEFAULT_BUDGET_MS = 20 * 60 * 1000;

type DailyLimitState = {
  dailyBudgetMs: number;
  usedTodayMs: number;
  lastResetDate: string;
  sessionStartedAt: number | null;
  isLimitReached: boolean;
  isHydrated: boolean;
};

type DailyLimitActions = {
  hydrate: () => Promise<void>;
  startSession: () => void;
  pauseSession: () => void;
  tick: (nowMs: number) => void;
  setBudget: (ms: number) => void;
};

export const useDailyLimitStore = create<DailyLimitState & DailyLimitActions>()(
  (set, get) => ({
    dailyBudgetMs: DEFAULT_BUDGET_MS,
    usedTodayMs: 0,
    lastResetDate: todayKey(),
    sessionStartedAt: null,
    isLimitReached: false,
    isHydrated: false,

    hydrate: async () => {
      if (get().isHydrated) return;
      const saved = await loadDailyLimit();
      const today = todayKey();

      if (saved) {
        const usedTodayMs = saved.lastResetDate === today ? saved.usedTodayMs : 0;
        set({
          usedTodayMs,
          lastResetDate: today,
          dailyBudgetMs: saved.dailyBudgetMs,
          isLimitReached: usedTodayMs >= saved.dailyBudgetMs,
          isHydrated: true,
        });
      } else {
        set({ lastResetDate: today, isHydrated: true });
      }
    },

    startSession: () => {
      if (get().isLimitReached) return;
      set({ sessionStartedAt: Date.now() });
    },

    pauseSession: () => {
      const { sessionStartedAt, usedTodayMs, dailyBudgetMs } = get();
      if (sessionStartedAt === null) return;
      const delta = Date.now() - sessionStartedAt;
      const newUsed = usedTodayMs + delta;
      const isLimitReached = newUsed >= dailyBudgetMs;
      set({ sessionStartedAt: null, usedTodayMs: newUsed, isLimitReached });
      void saveDailyLimit({
        usedTodayMs: newUsed,
        lastResetDate: get().lastResetDate,
        dailyBudgetMs,
      });
    },

    tick: (nowMs: number) => {
      const { sessionStartedAt, usedTodayMs, dailyBudgetMs } = get();
      if (sessionStartedAt === null) return;
      const delta = nowMs - sessionStartedAt;
      const newUsed = usedTodayMs + delta;
      const isLimitReached = newUsed >= dailyBudgetMs;
      set({ sessionStartedAt: nowMs, usedTodayMs: newUsed, isLimitReached });
      if (isLimitReached) {
        void saveDailyLimit({
          usedTodayMs: newUsed,
          lastResetDate: get().lastResetDate,
          dailyBudgetMs,
        });
      }
    },

    setBudget: (ms: number) => {
      set({ dailyBudgetMs: ms });
    },
  }),
);
