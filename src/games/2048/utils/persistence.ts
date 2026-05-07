import { get, set, del } from 'idb-keyval';
import type { GameState2048, Tile } from '../types';

const STORAGE_KEY = '2048:current-game';

type SerializedTile = { value: number; row: number; col: number };

type SerializedState = Omit<GameState2048, 'tiles' | 'nextTileId'> & {
  tiles: SerializedTile[];
};

function serialize(state: GameState2048): SerializedState {
  return {
    ...state,
    tiles: state.tiles.map(({ value, row, col }) => ({ value, row, col })),
  };
}

function deserialize(raw: SerializedState): GameState2048 {
  let nextId = 0;
  const tiles: Tile[] = raw.tiles.map(({ value, row, col }) => ({
    id: nextId++,
    value,
    row,
    col,
  }));
  return { ...raw, tiles, nextTileId: nextId };
}

function isValid(raw: unknown): raw is SerializedState {
  if (typeof raw !== 'object' || raw === null) return false;
  const s = raw as Record<string, unknown>;
  return (
    Array.isArray(s['tiles']) &&
    typeof s['score'] === 'number' &&
    typeof s['best'] === 'number' &&
    typeof s['isOver'] === 'boolean' &&
    typeof s['hasWon'] === 'boolean' &&
    typeof s['elapsedMs'] === 'number'
  );
}

export async function saveGame(state: GameState2048): Promise<void> {
  try {
    await set(STORAGE_KEY, serialize(state));
  } catch {
    // Non-fatal
  }
}

export async function loadGame(): Promise<GameState2048 | null> {
  try {
    const raw = await get<SerializedState>(STORAGE_KEY);
    if (!isValid(raw)) {
      await del(STORAGE_KEY);
      return null;
    }
    return deserialize(raw);
  } catch {
    return null;
  }
}

export async function clearGame(): Promise<void> {
  try {
    await del(STORAGE_KEY);
  } catch {
    // Non-fatal
  }
}
