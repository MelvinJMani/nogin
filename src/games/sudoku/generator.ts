import { createRNG } from '../../utils/seed';
import type { Board } from './types';
import { DIFFICULTY_MAP } from './difficulty';

const SIZE = 9;

function createEmptyGrid(): number[][] {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}

function isSafe(grid: number[][], row: number, col: number, num: number) {
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === num || grid[i][col] === num) return false;
  }

  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (grid[boxRow + r][boxCol + c] === num) return false;
    }
  }

  return true;
}

function shuffle(arr: number[], rng: () => number) {
  return arr
    .map((v) => ({ v, sort: rng() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ v }) => v);
}

function fillGrid(grid: number[][], rng: () => number): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9], rng);

        for (const num of numbers) {
          if (isSafe(grid, row, col, num)) {
            grid[row][col] = num;
            if (fillGrid(grid, rng)) return true;
            grid[row][col] = 0;
          }
        }

        return false;
      }
    }
  }
  return true;
}

function removeCells(grid: number[][], rng: () => number, count: number) {
  let removed = 0;

  while (removed < count) {
    const row = Math.floor(rng() * 9);
    const col = Math.floor(rng() * 9);

    if (grid[row][col] !== 0) {
      grid[row][col] = 0;
      removed++;
    }
  }
}

export function generateSudoku(
  seed: string,
  difficulty: keyof typeof DIFFICULTY_MAP,
): Board {
  const rng = createRNG(seed);
  const grid = createEmptyGrid();

  fillGrid(grid, rng);

  const solution = grid.map((row) => [...row]);

  removeCells(grid, rng, DIFFICULTY_MAP[difficulty]);

  return grid.map((row, r) =>
    row.map((value, c) => ({
      value: value === 0 ? null : value,
      solution: solution[r][c],
      fixed: value !== 0,
    })),
  );
}
