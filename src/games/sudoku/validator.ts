import type { Board } from './types';

export function isValidMove(
  board: Board,
  row: number,
  col: number,
  value: number,
) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i].value === value) return false;
    if (board[i][col].value === value) return false;
  }

  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[boxRow + r][boxCol + c].value === value) return false;
    }
  }

  return true;
}
