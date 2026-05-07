import type { Tile } from '../types';

export const WIN_VALUE = 2048;

export function hasWon(tiles: ReadonlyArray<Tile>): boolean {
  return tiles.some((t) => t.value >= WIN_VALUE);
}

export function canMove(grid: number[][]): boolean {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (grid[r][c] === 0) return true;
    }
  }
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 3; c++) {
      if (grid[r][c] === grid[r][c + 1]) return true;
    }
  }
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 4; c++) {
      if (grid[r][c] === grid[r + 1][c]) return true;
    }
  }
  return false;
}
