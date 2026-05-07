import { get, set, del } from 'idb-keyval';
import type { SudokuGameState, CellState } from '../types';

const STORAGE_KEY = 'sudoku:current-game';

type SerializedCell = {
  value: number | null;
  solution: number;
  given: boolean;
  notes: number[];
};

type SerializedState = Omit<SudokuGameState, 'board'> & {
  board: SerializedCell[][];
  mistakes?: number;
  failed?: boolean;
};

function serializeState(state: SudokuGameState): SerializedState {
  return {
    ...state,
    board: state.board.map((row) =>
      row.map((cell) => ({
        value: cell.value,
        solution: cell.solution,
        given: cell.given,
        notes: Array.from(cell.notes),
      })),
    ),
  };
}

function deserializeState(raw: SerializedState): SudokuGameState {
  return {
    ...raw,
    mistakes: typeof raw.mistakes === 'number' ? raw.mistakes : 0,
    failed: raw.failed === true,
    board: raw.board.map((row) =>
      row.map(
        (cell): CellState => ({
          value: cell.value,
          solution: cell.solution,
          given: cell.given,
          notes: new Set(cell.notes) as ReadonlySet<number>,
        }),
      ),
    ),
  };
}

function isValidSerializedState(raw: unknown): raw is SerializedState {
  if (typeof raw !== 'object' || raw === null) return false;
  const s = raw as Record<string, unknown>;
  return (
    Array.isArray(s['board']) &&
    (s['board'] as unknown[]).length === 9 &&
    typeof s['seed'] === 'string' &&
    typeof s['difficulty'] === 'string' &&
    typeof s['elapsedMs'] === 'number' &&
    typeof s['completed'] === 'boolean'
  );
}

export async function saveGame(state: SudokuGameState): Promise<void> {
  if (state.completed || state.failed) return;
  try {
    await set(STORAGE_KEY, serializeState(state));
  } catch {
    // Persistence failures are non-fatal
  }
}

export async function loadGame(): Promise<SudokuGameState | null> {
  try {
    const raw = await get<SerializedState>(STORAGE_KEY);
    if (!isValidSerializedState(raw)) {
      await del(STORAGE_KEY);
      return null;
    }
    if (raw.completed || raw.failed) {
      await del(STORAGE_KEY);
      return null;
    }
    return deserializeState(raw);
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
