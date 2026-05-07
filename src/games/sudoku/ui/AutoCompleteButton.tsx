import { useState, useRef } from 'react';
import type { Board, SudokuAction } from '../types';
import { countEmpty } from '../core/sudoku.core';
import { vibrate, HAPTIC } from '../utils/haptics';

const AUTO_COMPLETE_THRESHOLD = 8;
const FILL_INTERVAL_MS = 80;

type Props = {
  board: Board;
  dispatch: (action: SudokuAction) => void;
  completed: boolean;
};

export function AutoCompleteButton({ board, dispatch, completed }: Props) {
  const [animating, setAnimating] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const emptyCount = countEmpty(board);
  const shouldShow =
    !completed && emptyCount > 0 && emptyCount <= AUTO_COMPLETE_THRESHOLD;

  if (!shouldShow) return null;

  const handleAutoComplete = () => {
    if (animating) return;

    const cells: Array<{ row: number; col: number }> = [];
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c].value === null && !board[r][c].given) {
          cells.push({ row: r, col: c });
        }
      }
    }

    if (cells.length === 0) return;

    vibrate(HAPTIC.tap);
    setAnimating(true);

    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = cells.map(({ row, col }, i) =>
      setTimeout(() => {
        dispatch({ type: 'FILL_CELL', row, col });
        if (i === cells.length - 1) {
          setAnimating(false);
          timeoutsRef.current = [];
        }
      }, i * FILL_INTERVAL_MS),
    );
  };

  return (
    <button
      onClick={handleAutoComplete}
      disabled={animating}
      className='mt-2 w-full border border-[rgb(var(--ink-border))] py-1.5 font-mono text-xs text-[rgb(var(--ink-weak))] disabled:opacity-40 transition-opacity'
      aria-label={animating ? 'Completing puzzle…' : `Auto-complete ${emptyCount} remaining cell${emptyCount > 1 ? 's' : ''}`}
    >
      {animating ? 'Completing…' : `Complete · ${emptyCount} left`}
    </button>
  );
}
