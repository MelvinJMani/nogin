import { useMemo } from 'react';
import type { Board } from '../types';

type Props = {
  board: Board;
};

const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

export function RemainingDigits({ board }: Props) {
  const remaining = useMemo(() => {
    const placed = new Array(10).fill(0) as number[];
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const v = board[r][c].value;
        if (v !== null) placed[v]++;
      }
    }
    return DIGITS.map((n) => ({ digit: n, count: Math.max(0, 9 - placed[n]) }));
  }, [board]);

  return (
    <div
      className='flex justify-between mt-2 px-0.5'
      aria-label='Remaining digits'
      role='status'
    >
      {remaining.map(({ digit, count }) => (
        <div
          key={digit}
          className={`flex flex-col items-center gap-0.5 transition-opacity ${
            count === 0 ? 'opacity-25' : 'opacity-100'
          }`}
          aria-label={`${digit}: ${count} remaining`}
        >
          <span className='font-mono text-xs leading-none text-[rgb(var(--ink-fg))]'>
            {digit}
          </span>
          <span className='font-mono text-[8px] leading-none text-[rgb(var(--ink-weak))]'>
            {count}
          </span>
        </div>
      ))}
    </div>
  );
}
