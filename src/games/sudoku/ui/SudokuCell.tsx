import type { CellState } from '../types';

export type CellHighlight = 'none' | 'selected' | 'related' | 'conflict' | 'sameValue';

type Props = {
  cell: CellState;
  row: number;
  col: number;
  highlight: CellHighlight;
  isHinted: boolean;
  onClick: () => void;
  onLongPress: () => void;
};

const NOTE_POSITIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

const HIGHLIGHT_BG: Record<CellHighlight, string> = {
  none: '',
  selected: 'bg-[rgb(var(--ink-fg))]/[0.15]',
  related: 'bg-[rgb(var(--ink-fg))]/[0.07]',
  conflict: 'bg-[rgb(var(--ink-fg))]/[0.07]',
  sameValue: 'bg-[rgb(var(--ink-fg))]/[0.11]',
};

export function SudokuCell({ cell, row, col, highlight, isHinted, onClick, onLongPress }: Props) {
  const isBoxRight = col === 2 || col === 5;
  const isBoxBottom = row === 2 || row === 5;
  const isConflict = highlight === 'conflict';

  let longPressTimer: ReturnType<typeof setTimeout> | null = null;

  const handlePointerDown = () => {
    longPressTimer = setTimeout(() => {
      onLongPress();
      longPressTimer = null;
    }, 350);
  };

  const handlePointerUp = () => {
    if (longPressTimer !== null) {
      clearTimeout(longPressTimer);
      longPressTimer = null;
    }
  };

  return (
    <button
      className={`sudoku-cell ${isHinted ? 'sudoku-cell-hinted' : ''} relative flex items-center justify-center
        border-r border-b border-[rgb(var(--ink-border))]
        min-w-9 min-h-9 aspect-square w-full h-full
        touch-manipulation select-none
        ${HIGHLIGHT_BG[highlight]}
        ${cell.given ? 'cursor-default' : 'cursor-pointer'}
      `}
      data-box-right={isBoxRight ? 'true' : undefined}
      data-box-bottom={isBoxBottom ? 'true' : undefined}
      onClick={onClick}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      aria-label={`Row ${row + 1}, column ${col + 1}${cell.value ? `, value ${cell.value}` : ''}${isHinted ? ', hint available' : ''}`}
      aria-pressed={highlight === 'selected'}
    >
      {cell.value !== null ? (
        <span
          className={`font-mono text-sm leading-none
            ${cell.given ? 'font-semibold' : 'font-normal'}
            ${isConflict ? 'opacity-40 line-through' : 'text-[rgb(var(--ink-fg))]'}
          `}
        >
          {cell.value}
        </span>
      ) : cell.notes.size > 0 ? (
        <div className='grid grid-cols-3 grid-rows-3 w-full h-full p-0.5'>
          {NOTE_POSITIONS.map((n) => (
            <span
              key={n}
              className='flex items-center justify-center text-[7px] leading-none font-mono text-[rgb(var(--ink-weak))]'
            >
              {cell.notes.has(n) ? n : ''}
            </span>
          ))}
        </div>
      ) : null}
    </button>
  );
}
