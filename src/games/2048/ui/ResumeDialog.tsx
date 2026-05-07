import { useEffect, useRef } from 'react';

type Props = {
  score: number;
  onResume: () => void;
  onNewGame: () => void;
};

export function ResumeDialog2048({ score, onResume, onNewGame }: Props) {
  const resumeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    resumeRef.current?.focus();
  }, []);

  return (
    <div
      className='absolute inset-0 flex items-center justify-center bg-[rgb(var(--ink-bg))]/90'
      role='dialog'
      aria-modal='true'
      aria-labelledby='resume-title'
    >
      <div className='eink-paper border border-[rgb(var(--ink-border))] p-6 max-w-xs w-full mx-4 flex flex-col gap-4'>
        <div className='text-center'>
          <p id='resume-title' className='font-mono text-base text-[rgb(var(--ink-fg))]'>
            Resume game?
          </p>
          <p className='font-mono text-xs text-[rgb(var(--ink-weak))] mt-1'>
            Score {score}
          </p>
        </div>

        <div className='flex flex-col gap-2'>
          <button
            ref={resumeRef}
            onClick={onResume}
            className='eink-paper border-2 border-[rgb(var(--ink-fg))] py-2 font-mono text-sm font-semibold text-[rgb(var(--ink-fg))] touch-manipulation'
          >
            Continue
          </button>
          <button
            onClick={onNewGame}
            className='eink-paper border border-[rgb(var(--ink-border))] py-2 font-mono text-sm text-[rgb(var(--ink-weak))] touch-manipulation'
          >
            New game
          </button>
        </div>
      </div>
    </div>
  );
}
