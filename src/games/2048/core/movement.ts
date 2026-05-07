import type { Tile, Direction } from '../types';
import { mergeRow } from './merge';
import { spawnTile } from './generator';
import { canMove } from './scoring';

type Grid = number[][];

function tilesToGrid(tiles: ReadonlyArray<Tile>): Grid {
  const grid: Grid = Array.from({ length: 4 }, () => new Array(4).fill(0) as number[]);
  for (const tile of tiles) {
    grid[tile.row][tile.col] = tile.value;
  }
  return grid;
}

function gridToTiles(grid: Grid, startId: number): { tiles: Tile[]; nextId: number } {
  const tiles: Tile[] = [];
  let id = startId;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (grid[r][c] !== 0) {
        tiles.push({ id: id++, value: grid[r][c], row: r, col: c });
      }
    }
  }
  return { tiles, nextId: id };
}

function gridsEqual(a: Grid, b: Grid): boolean {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (a[r][c] !== b[r][c]) return false;
    }
  }
  return true;
}

function transpose(grid: Grid): Grid {
  return grid.map((_, i) => grid.map((row) => row[i]));
}

function flipH(grid: Grid): Grid {
  return grid.map((row) => [...row].reverse());
}

function slideLeft(grid: Grid): { grid: Grid; scoreDelta: number } {
  let scoreDelta = 0;
  const newGrid = grid.map((row) => {
    const { row: merged, scoreDelta: delta } = mergeRow(row);
    scoreDelta += delta;
    return merged as number[];
  });
  return { grid: newGrid, scoreDelta };
}

export type MoveResult = {
  readonly tiles: ReadonlyArray<Tile>;
  readonly scoreDelta: number;
  readonly moved: boolean;
  readonly nextTileId: number;
  readonly isOver: boolean;
};

export function applyMovement(
  tiles: ReadonlyArray<Tile>,
  direction: Direction,
  nextTileId: number,
): MoveResult {
  const original = tilesToGrid(tiles);

  let work: Grid;
  switch (direction) {
    case 'left':
      work = original;
      break;
    case 'right':
      work = flipH(original);
      break;
    case 'up':
      work = transpose(original);
      break;
    case 'down':
      work = flipH(transpose(original));
      break;
  }

  const { grid: moved, scoreDelta } = slideLeft(work);

  let result: Grid;
  switch (direction) {
    case 'left':
      result = moved;
      break;
    case 'right':
      result = flipH(moved);
      break;
    case 'up':
      result = transpose(moved);
      break;
    case 'down':
      result = transpose(flipH(moved));
      break;
  }

  if (gridsEqual(original, result)) {
    return { tiles, scoreDelta: 0, moved: false, nextTileId, isOver: false };
  }

  const { tiles: newTiles, nextId } = gridToTiles(result, nextTileId);

  const spawned = spawnTile(newTiles, nextId);
  const finalTiles = spawned ? [...newTiles, spawned] : newTiles;
  const finalNextId = spawned ? nextId + 1 : nextId;

  const finalGrid = tilesToGrid(finalTiles);
  const isOver = !canMove(finalGrid);

  return {
    tiles: finalTiles,
    scoreDelta,
    moved: true,
    nextTileId: finalNextId,
    isOver,
  };
}
