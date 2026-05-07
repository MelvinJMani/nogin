import seedrandom from 'seedrandom';
import type { Difficulty } from '../types';
import { DIFFICULTY_CONFIG } from '../types';
import { solveSudoku, hasUniqueSolution } from './solver';

export type GeneratedPuzzle = {
  readonly given: ReadonlyArray<ReadonlyArray<number>>;
  readonly solution: ReadonlyArray<ReadonlyArray<number>>;
};

function shuffleArray<T>(arr: T[], rng: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeEmptyGrid(): number[][] {
  return Array.from({ length: 9 }, () => new Array(9).fill(0) as number[]);
}

function fillDiagonalBoxes(grid: number[][], rng: () => number): void {
  for (let box = 0; box < 3; box++) {
    const nums = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9], rng);
    const startRow = box * 3;
    const startCol = box * 3;
    let idx = 0;
    for (let r = startRow; r < startRow + 3; r++) {
      for (let c = startCol; c < startCol + 3; c++) {
        grid[r][c] = nums[idx++];
      }
    }
  }
}

function copyGrid(grid: number[][]): number[][] {
  return grid.map((row) => [...row]);
}

export function generatePuzzle(seed: string, difficulty: Difficulty): GeneratedPuzzle {
  const rng = seedrandom(seed);

  const solvedGrid = makeEmptyGrid();
  fillDiagonalBoxes(solvedGrid, rng);
  solveSudoku(solvedGrid);

  const solution: ReadonlyArray<ReadonlyArray<number>> = solvedGrid.map((row) =>
    Object.freeze([...row]),
  );

  const targetGivens = DIFFICULTY_CONFIG[difficulty].givenCells;
  const targetRemovals = 81 - targetGivens;

  const positions = shuffleArray(
    Array.from({ length: 81 }, (_, i) => i),
    rng,
  );

  const workGrid = copyGrid(solvedGrid);
  let removed = 0;

  for (const pos of positions) {
    if (removed >= targetRemovals) break;
    const row = Math.floor(pos / 9);
    const col = pos % 9;
    const backup = workGrid[row][col];
    workGrid[row][col] = 0;

    if (hasUniqueSolution(workGrid)) {
      removed++;
    } else {
      workGrid[row][col] = backup;
    }
  }

  const given: ReadonlyArray<ReadonlyArray<number>> = workGrid.map((row) =>
    Object.freeze([...row]),
  );

  return { given, solution };
}
