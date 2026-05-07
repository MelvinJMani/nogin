import { formatDuration } from '../../../features/daily-limit/utils/time';

type Props = {
  score: number;
  best: number;
  elapsedMs: number;
  moveCount: number;
  onNewGame: () => void;
};

export function Controls2048({ score, best, elapsedMs, moveCount, onNewGame }: Props) {
  return (
    <div className='flex flex-col gap-2 mt-3'>
      {/* Score row */}
      <div className='flex justify-between items-center font-mono text-xs text-[rgb(var(--ink-weak))]'>
        <span>
          Score <span className='text-[rgb(var(--ink-fg))] font-semibold'>{score}</span>
        </span>
        <span>
          Best <span className='text-[rgb(var(--ink-fg))] font-semibold'>{best}</span>
        </span>
      </div>

      {/* Stats + new game */}
      <div className='flex justify-between items-center'>
        <span className='font-mono text-xs text-[rgb(var(--ink-weak))]'>
          {formatDuration(elapsedMs)} · {moveCount} moves
        </span>
        <button
          onClick={onNewGame}
          className='eink-paper border border-[rgb(var(--ink-border))] px-3 py-1 font-mono text-xs text-[rgb(var(--ink-weak))] touch-manipulation'
          aria-label='Start a new game'
        >
          New game
        </button>
      </div>

      {/* Hint line */}
      <p className='text-center text-xs text-[rgb(var(--ink-weak))]/50 font-mono hidden md:block'>
        arrow keys or WASD to move · swipe on mobile
      </p>
    </div>
  );
}
