import type { Board } from '../types';

export function getCandidates(board: Board, row: number, col: number): number[] {
  const used = new Set<number>();
  for (let i = 0; i < 9; i++) {
    const rv = board[row][i].value;
    const cv = board[i][col].value;
    if (rv !== null) used.add(rv);
    if (cv !== null) used.add(cv);
    const br = Math.floor(row / 3) * 3 + Math.floor(i / 3);
    const bc = Math.floor(col / 3) * 3 + (i % 3);
    const bv = board[br][bc].value;
    if (bv !== null) used.add(bv);
  }
  return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((n) => !used.has(n));
}

// Returns keys ('row,col') of empty cells that have exactly one valid candidate.
export function findNakedSingles(board: Board): ReadonlySet<string> {
  const hintable = new Set<string>();
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const cell = board[r][c];
      if (cell.value !== null) continue;
      if (getCandidates(board, r, c).length === 1) {
        hintable.add(`${r},${c}`);
      }
    }
  }
  return hintable;
}
