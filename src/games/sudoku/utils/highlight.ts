import type { Board } from '../types';
import { isSameBox } from '../../../utils';

export type HighlightMap = {
  readonly selected: readonly [number, number] | null;
  readonly related: ReadonlySet<string>;
  readonly conflict: ReadonlySet<string>;
  readonly sameValue: ReadonlySet<string>;
};

const EMPTY: HighlightMap = {
  selected: null,
  related: new Set<string>(),
  conflict: new Set<string>(),
  sameValue: new Set<string>(),
};

export function computeHighlights(
  board: Board,
  selected: { row: number; col: number } | null,
): HighlightMap {
  const conflict = new Set<string>();

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const cell = board[r][c];
      if (cell.value !== null && cell.value !== cell.solution) {
        conflict.add(`${r},${c}`);
      }
    }
  }

  if (selected === null) {
    return { ...EMPTY, conflict };
  }

  const { row, col } = selected;
  const selectedCell = board[row][col];
  const selectedValue = selectedCell.value;

  const related = new Set<string>();
  const sameValue = new Set<string>();

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (r === row && c === col) continue;
      const isRelated = r === row || c === col || isSameBox(r, c, row, col);
      if (isRelated) {
        related.add(`${r},${c}`);
        const cell = board[r][c];
        if (
          selectedValue !== null &&
          cell.value === selectedValue
        ) {
          conflict.add(`${r},${c}`);
        }
      }
      const cell = board[r][c];
      if (selectedValue !== null && cell.value === selectedValue) {
        sameValue.add(`${r},${c}`);
      }
    }
  }

  return { selected: [row, col], related, conflict, sameValue };
}
