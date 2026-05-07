import { useClock } from '../hooks/useClock';
import { useDailyLimitStore } from '../features/daily-limit/store/useDailyLimitStore';
import { formatRemaining } from '../features/daily-limit/utils/time';

export default function Header() {
  const clock = useClock();
  const isHydrated = useDailyLimitStore((s) => s.isHydrated);
  const dailyBudgetMs = useDailyLimitStore((s) => s.dailyBudgetMs);
  const usedTodayMs = useDailyLimitStore((s) => s.usedTodayMs);
  const remainingMs = Math.max(0, dailyBudgetMs - usedTodayMs);

  return (
    <header className='eink-paper border-b border-black/60'>
      <div className='w-full flex items-center justify-between px-4 py-3'>
        <h1 className='font-mono text-xl font-semibold uppercase'>NOGIN</h1>
        <div className='flex flex-col items-end gap-0.5'>
          <span className='font-mono text-sm' aria-live='polite'>
            {clock}
          </span>
          {isHydrated && (
            <span className='font-mono text-[10px] text-[rgb(var(--ink-weak))]'>
              {formatRemaining(remainingMs)}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
