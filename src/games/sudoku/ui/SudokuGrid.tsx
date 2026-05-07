import { useEffect, useRef, useState } from 'react';
import type React from 'react';
import type { Board, SudokuAction } from '../types';
import type { HighlightMap } from '../utils/highlight';
import { SudokuCell } from './SudokuCell';
import type { CellHighlight } from './SudokuCell';
import { useSwipeNavigation } from '../hooks/useSwipeNavigation';
import { vibrate, HAPTIC } from '../utils/haptics';

type Props = {
  board: Board;
  highlights: HighlightMap;
  hintedCells: ReadonlySet<string>;
  completed: boolean;
  onCellClick: (row: number, col: number) => void;
  onCellLongPress: (row: number, col: number) => void;
  dispatch: (action: SudokuAction) => void;
  enabled: boolean;
};

function getCellHighlight(row: number, col: number, highlights: HighlightMap): CellHighlight {
  if (
    highlights.selected &&
    highlights.selected[0] === row &&
    highlights.selected[1] === col
  ) {
    return 'selected';
  }
  const key = `${row},${col}`;
  if (highlights.conflict.has(key)) return 'conflict';
  if (highlights.sameValue.has(key)) return 'sameValue';
  if (highlights.related.has(key)) return 'related';
  return 'none';
}

export function SudokuGrid({
  board,
  highlights,
  hintedCells,
  completed,
  onCellClick,
  onCellLongPress,
  dispatch,
  enabled,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [flash, setFlash] = useState(false);
  const prevCompleted = useRef(completed);

  useSwipeNavigation(dispatch, containerRef as React.RefObject<HTMLElement | null>, enabled);

  useEffect(() => {
    if (completed && !prevCompleted.current) {
      vibrate(HAPTIC.success);
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 200);
      return () => clearTimeout(t);
    }
    prevCompleted.current = completed;
  }, [completed]);

  return (
    <div
      ref={containerRef}
      className={`w-full aspect-square border-2 border-[rgb(var(--ink-border))] ${flash ? 'eink-refresh' : ''}`}
    >
      <div className='grid grid-cols-9 grid-rows-9 w-full h-full border-l border-t border-[rgb(var(--ink-border))]'>
        {board.map((row, r) =>
          row.map((cell, c) => (
            <SudokuCell
              key={`${r}-${c}`}
              cell={cell}
              row={r}
              col={c}
              highlight={getCellHighlight(r, c, highlights)}
              isHinted={cell.value === null && hintedCells.has(`${r},${c}`)}
              onClick={() => {
                vibrate(HAPTIC.tap);
                onCellClick(r, c);
              }}
              onLongPress={() => onCellLongPress(r, c)}
            />
          )),
        )}
      </div>
    </div>
  );
}
