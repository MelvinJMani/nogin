import { useEffect, useRef, useState } from 'react';
import type { Difficulty } from '../types';
import { DifficultySelector } from './DifficultySelector';

type Props = {
  onResume: () => void;
  onNewGame: (difficulty: Difficulty) => void;
};

export function ResumeDialog({ onResume, onNewGame }: Props) {
  const [showDifficulty, setShowDifficulty] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const resumeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    resumeRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onResume();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onResume]);

  return (
    <div
      className='fixed inset-0 z-40 flex items-center justify-center bg-[rgb(var(--ink-bg))]/90'
      role='dialog'
      aria-modal='true'
      aria-labelledby='resume-dialog-title'
    >
      <div className='eink-paper border border-[rgb(var(--ink-border))] p-6 max-w-xs w-full mx-4'>
        <h3
          id='resume-dialog-title'
          className='font-mono text-base text-[rgb(var(--ink-fg))] mb-4 text-center'
        >
          Resume game?
        </h3>

        {!showDifficulty ? (
          <div className='flex flex-col gap-3'>
            <button
              ref={resumeRef}
              onClick={onResume}
              className='eink-paper border-2 border-[rgb(var(--ink-fg))] px-4 py-2 font-mono text-sm text-[rgb(var(--ink-fg))] font-semibold'
            >
              Continue
            </button>
            <button
              onClick={() => setShowDifficulty(true)}
              className='eink-paper border border-[rgb(var(--ink-border))] px-4 py-2 font-mono text-sm text-[rgb(var(--ink-weak))]'
            >
              New Game
            </button>
          </div>
        ) : (
          <div className='flex flex-col gap-4'>
            <DifficultySelector value={difficulty} onChange={setDifficulty} />
            <button
              onClick={() => onNewGame(difficulty)}
              className='eink-paper border-2 border-[rgb(var(--ink-fg))] px-4 py-2 font-mono text-sm text-[rgb(var(--ink-fg))] font-semibold'
            >
              Start
            </button>
            <button
              onClick={() => setShowDifficulty(false)}
              className='text-xs text-[rgb(var(--ink-weak))] font-mono'
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
