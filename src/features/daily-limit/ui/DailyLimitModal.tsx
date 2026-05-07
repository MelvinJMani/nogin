import { formatDuration } from '../utils/time';

type Props = {
  usedTodayMs: number;
  dailyBudgetMs: number;
  onDismiss?: () => void;
};

export function DailyLimitModal({ usedTodayMs, dailyBudgetMs, onDismiss }: Props) {
  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-[rgb(var(--ink-bg))]/90'
      role='dialog'
      aria-modal='true'
      aria-labelledby='daily-limit-title'
    >
      <div className='eink-paper border border-[rgb(var(--ink-border))] p-8 max-w-sm w-full mx-4 text-center'>
        <p
          id='daily-limit-title'
          className='font-mono text-lg text-[rgb(var(--ink-fg))] mb-2'
        >
          Today's session is complete.
        </p>
        <p className='text-[rgb(var(--ink-weak))] text-sm mb-6'>
          Come back tomorrow.
        </p>
        <p className='font-mono text-sm text-[rgb(var(--ink-weak))] mb-6'>
          Today: {formatDuration(usedTodayMs)} / {formatDuration(dailyBudgetMs)}
        </p>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className='eink-paper border border-[rgb(var(--ink-border))] px-4 py-2 text-sm font-mono text-[rgb(var(--ink-fg))]'
          >
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
}
