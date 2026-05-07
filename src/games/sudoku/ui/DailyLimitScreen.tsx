import { formatDuration } from '../../../features/daily-limit/utils/time';

type Props = {
  usedTodayMs: number;
  dailyBudgetMs: number;
};

export function DailyLimitScreen({ usedTodayMs, dailyBudgetMs }: Props) {
  return (
    <div className='flex flex-col items-center justify-center py-16 text-center'>
      <p className='font-mono text-base text-[rgb(var(--ink-fg))] mb-2'>
        Today's session is complete.
      </p>
      <p className='text-[rgb(var(--ink-weak))] text-sm mb-6'>Come back tomorrow.</p>
      <p className='font-mono text-xs text-[rgb(var(--ink-weak))]'>
        {formatDuration(usedTodayMs)} played today · {formatDuration(dailyBudgetMs)} limit
      </p>
    </div>
  );
}
