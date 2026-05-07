function toFlat(grid: number[][]): number[] {
  const flat: number[] = new Array(81);
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      flat[r * 9 + c] = grid[r][c];
    }
  }
  return flat;
}

function toGrid(flat: number[]): number[][] {
  const grid: number[][] = [];
  for (let r = 0; r < 9; r++) {
    grid[r] = flat.slice(r * 9, r * 9 + 9);
  }
  return grid;
}

function isValidFlat(flat: number[], pos: number, value: number): boolean {
  const row = Math.floor(pos / 9);
  const col = pos % 9;
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;

  for (let i = 0; i < 9; i++) {
    if (flat[row * 9 + i] === value) return false;
    if (flat[i * 9 + col] === value) return false;
    const br = boxRow + Math.floor(i / 3);
    const bc = boxCol + (i % 3);
    if (flat[br * 9 + bc] === value) return false;
  }
  return true;
}

export function isValidPlacement(
  grid: number[][],
  row: number,
  col: number,
  value: number,
): boolean {
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;

  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === value && i !== col) return false;
    if (grid[i][col] === value && i !== row) return false;
    const br = boxRow + Math.floor(i / 3);
    const bc = boxCol + (i % 3);
    if (grid[br][bc] === value && !(br === row && bc === col)) return false;
  }
  return true;
}

function solveFlat(flat: number[]): boolean {
  const pos = flat.indexOf(0);
  if (pos === -1) return true;

  for (let v = 1; v <= 9; v++) {
    if (isValidFlat(flat, pos, v)) {
      flat[pos] = v;
      if (solveFlat(flat)) return true;
      flat[pos] = 0;
    }
  }
  return false;
}

export function solveSudoku(grid: number[][]): boolean {
  const flat = toFlat(grid);
  if (!solveFlat(flat)) return false;
  const solved = toGrid(flat);
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      grid[r][c] = solved[r][c];
    }
  }
  return true;
}

function countSolutionsFlat(flat: number[], limit: number): number {
  const pos = flat.indexOf(0);
  if (pos === -1) return 1;

  let count = 0;
  for (let v = 1; v <= 9; v++) {
    if (isValidFlat(flat, pos, v)) {
      flat[pos] = v;
      count += countSolutionsFlat(flat, limit);
      flat[pos] = 0;
      if (count >= limit) return count;
    }
  }
  return count;
}

export function hasUniqueSolution(grid: number[][]): boolean {
  const flat = toFlat(grid);
  return countSolutionsFlat(flat, 2) === 1;
}
