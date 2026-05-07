import type { Tile } from '../types';

function randomValue(): number {
  return Math.random() < 0.9 ? 2 : 4;
}

function emptyCells(tiles: ReadonlyArray<Tile>): Array<{ row: number; col: number }> {
  const occupied = new Set(tiles.map((t) => t.row * 4 + t.col));
  const cells: Array<{ row: number; col: number }> = [];
  for (let i = 0; i < 16; i++) {
    if (!occupied.has(i)) {
      cells.push({ row: Math.floor(i / 4), col: i % 4 });
    }
  }
  return cells;
}

export function spawnTile(tiles: ReadonlyArray<Tile>, nextId: number): Tile | null {
  const cells = emptyCells(tiles);
  if (cells.length === 0) return null;
  const pos = cells[Math.floor(Math.random() * cells.length)];
  return { id: nextId, value: randomValue(), row: pos.row, col: pos.col };
}

export function createInitialTiles(): {
  tiles: ReadonlyArray<Tile>;
  nextTileId: number;
} {
  let tiles: Tile[] = [];
  let nextId = 0;

  const first = spawnTile(tiles, nextId++);
  if (first) tiles = [...tiles, first];

  const second = spawnTile(tiles, nextId++);
  if (second) tiles = [...tiles, second];

  return { tiles, nextTileId: nextId };
}
