import { useState, useEffect } from 'react';
import type { Difficulty } from '../types';
import { DIFFICULTY_CONFIG } from '../types';
import { useSudoku } from '../hooks/useSudoku';
import { useSudokuKeyboard } from '../hooks/useSudokuKeyboard';
import { useAdaptiveHint } from '../hooks/useAdaptiveHint';
import { useDailyLimit } from '../../../features/daily-limit/hooks/useDailyLimit';
import { formatDuration } from '../../../features/daily-limit/utils/time';
import { SudokuGrid } from './SudokuGrid';
import { NumberPad } from './NumberPad';
import { ResumeDialog } from './ResumeDialog';
import { DailyLimitScreen } from './DailyLimitScreen';
import { DifficultySelector } from './DifficultySelector';
import { RemainingDigits } from './RemainingDigits';
import { AutoCompleteButton } from './AutoCompleteButton';

export function SudokuGame() {
  const { state, dispatch, highlights, newGame, resumeGame, hasSavedGame, isLoading } =
    useSudoku();
  const { isLimitReached, usedTodayMs, dailyBudgetMs, isHydrated } = useDailyLimit();

  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('easy');

  useEffect(() => {
    if (!isLoading && hasSavedGame) {
      setShowResumeDialog(true);
    }
  }, [isLoading, hasSavedGame]);

  const interactionsEnabled =
    !showResumeDialog && !isLimitReached && state !== null && !state.completed && !state.failed;

  useSudokuKeyboard(dispatch, interactionsEnabled, state?.notesMode ?? false);

  const hintedCells = useAdaptiveHint(
    state?.board ?? ([] as unknown as import('../types').Board),
    state?.mistakes ?? 0,
    state?.completed ?? true,
  );

  const handleResume = () => {
    resumeGame();
    setShowResumeDialog(false);
  };

  const handleNewGame = (difficulty: Difficulty) => {
    newGame(difficulty);
    setShowResumeDialog(false);
  };

  const handleStartGame = (difficulty: Difficulty) => {
    newGame(difficulty);
  };

  if (isLoading || !isHydrated) {
    return (
      <div className='w-full aspect-square eink-paper animate-pulse' aria-busy='true' />
    );
  }

  if (isLimitReached) {
    return <DailyLimitScreen usedTodayMs={usedTodayMs} dailyBudgetMs={dailyBudgetMs} />;
  }

  if (state === null || state.failed) {
    return (
      <div className='flex flex-col items-center gap-6 py-8'>
        {state?.failed && (
          <div className='text-center mb-2'>
            <p className='font-mono text-sm text-[rgb(var(--ink-fg))]'>
              3 mistakes — puzzle ended
            </p>
            <p className='font-mono text-xs text-[rgb(var(--ink-weak))] mt-1'>
              {formatDuration(state.elapsedMs)} elapsed
            </p>
          </div>
        )}
        <p className='font-mono text-sm text-[rgb(var(--ink-weak))]'>Choose difficulty</p>
        <DifficultySelector value={selectedDifficulty} onChange={setSelectedDifficulty} />
        <button
          onClick={() => handleStartGame(selectedDifficulty)}
          className='eink-paper border-2 border-[rgb(var(--ink-fg))] px-6 py-2 font-mono text-sm text-[rgb(var(--ink-fg))] font-semibold'
        >
          New Game
        </button>
      </div>
    );
  }

  return (
    <>
      <div className='flex flex-col'>
        <div className='flex justify-between items-center mb-2 font-mono text-xs text-[rgb(var(--ink-weak))]'>
          <span>{formatDuration(state.elapsedMs)}</span>
          <span>{DIFFICULTY_CONFIG[state.difficulty].label}</span>
          <span>
            {state.mistakes > 0 ? `${state.mistakes}/3 mistakes` : ''}
          </span>
        </div>

        {state.completed && (
          <div className='text-center mb-2 font-mono text-sm text-[rgb(var(--ink-fg))]'>
            Complete · {formatDuration(state.elapsedMs)}
          </div>
        )}

        <SudokuGrid
          board={state.board}
          highlights={highlights}
          hintedCells={hintedCells}
          completed={state.completed}
          onCellClick={(r, c) => dispatch({ type: 'SELECT_CELL', row: r, col: c })}
          onCellLongPress={() => dispatch({ type: 'TOGGLE_NOTES_MODE' })}
          dispatch={dispatch}
          enabled={interactionsEnabled}
        />

        <RemainingDigits board={state.board} />

        <AutoCompleteButton
          board={state.board}
          dispatch={dispatch}
          completed={state.completed}
        />

        <p className='text-center text-xs text-[rgb(var(--ink-weak))]/60 mt-2 font-mono hidden md:block'>
          arrows · 1-9 · n for notes · 0 to clear
        </p>

        <div className='pb-20' />
      </div>

      <NumberPad
        notesMode={state.notesMode}
        onNumber={(n) => dispatch({ type: 'PLACE_VALUE', value: n })}
        onClear={() => dispatch({ type: 'CLEAR_CELL' })}
        onToggleNotes={() => dispatch({ type: 'TOGGLE_NOTES_MODE' })}
        disabled={!interactionsEnabled}
      />

      {showResumeDialog && (
        <ResumeDialog onResume={handleResume} onNewGame={handleNewGame} />
      )}
    </>
  );
}
