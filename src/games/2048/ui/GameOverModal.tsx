import { useEffect, useRef } from 'react';
import { formatDuration } from '../../../features/daily-limit/utils/time';

type Props = {
  hasWon: boolean;
  continueAfterWin: boolean;
  score: number;
  elapsedMs: number;
  onContinue: () => void;
  onNewGame: () => void;
};

export function GameOverModal({
  hasWon,
  continueAfterWin,
  score,
  elapsedMs,
  onContinue,
  onNewGame,
}: Props) {
  const primaryRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    primaryRef.current?.focus();
  }, []);

  // Win modal — only shown when hasWon and not yet continued
  const showWin = hasWon && !continueAfterWin;

  return (
    <div
      className='absolute inset-0 flex items-center justify-center bg-[rgb(var(--ink-bg))]/90'
      role='dialog'
      aria-modal='true'
      aria-labelledby='modal-title'
    >
      <div className='eink-paper border border-[rgb(var(--ink-border))] p-6 max-w-xs w-full mx-4 flex flex-col gap-4'>
        <div className='text-center'>
          <p id='modal-title' className='font-mono text-base text-[rgb(var(--ink-fg))]'>
            {showWin ? 'You reached 2048.' : 'No moves left.'}
          </p>
          <p className='font-mono text-xs text-[rgb(var(--ink-weak))] mt-1'>
            Score {score} · {formatDuration(elapsedMs)}
          </p>
        </div>

        <div className='flex flex-col gap-2'>
          {showWin && (
            <button
              ref={primaryRef}
              onClick={onContinue}
              className='eink-paper border-2 border-[rgb(var(--ink-fg))] py-2 font-mono text-sm font-semibold text-[rgb(var(--ink-fg))] touch-manipulation'
            >
              Continue
            </button>
          )}
          <button
            ref={showWin ? undefined : primaryRef}
            onClick={onNewGame}
            className={`eink-paper border border-[rgb(var(--ink-border))] py-2 font-mono text-sm text-[rgb(var(--ink-weak))] touch-manipulation ${
              showWin ? '' : 'border-2 border-[rgb(var(--ink-fg))] font-semibold text-[rgb(var(--ink-fg))]'
            }`}
          >
            New game
          </button>
        </div>
      </div>
    </div>
  );
}
