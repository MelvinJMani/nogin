export type Difficulty =
  | 'very-easy'
  | 'easy'
  | 'medium'
  | 'hard'
  | 'very-hard'
  | 'insane'
  | 'inhuman';

export type CellState = {
  readonly value: number | null;
  readonly solution: number;
  readonly given: boolean;
  readonly notes: ReadonlySet<number>;
};

export type Board = ReadonlyArray<ReadonlyArray<CellState>>;

export const MAX_MISTAKES = 3;

export type SudokuGameState = {
  readonly board: Board;
  readonly difficulty: Difficulty;
  readonly seed: string;
  readonly notesMode: boolean;
  readonly selected: { readonly row: number; readonly col: number } | null;
  readonly startedAt: number;
  readonly elapsedMs: number;
  readonly completed: boolean;
  readonly mistakes: number;
  readonly failed: boolean;
};

export type SudokuAction =
  | { type: 'SELECT_CELL'; row: number; col: number }
  | { type: 'PLACE_VALUE'; value: number }
  | { type: 'CLEAR_CELL' }
  | { type: 'TOGGLE_NOTE'; value: number }
  | { type: 'TOGGLE_NOTES_MODE' }
  | { type: 'MOVE_SELECTION'; direction: 'up' | 'down' | 'left' | 'right' }
  | { type: 'TICK'; deltaMs: number }
  | { type: 'FILL_CELL'; row: number; col: number };

export type DifficultyConfig = {
  readonly givenCells: number;
  readonly label: string;
};

export const DIFFICULTY_CONFIG: Record<Difficulty, DifficultyConfig> = {
  'very-easy': { givenCells: 72, label: 'Very Easy' },
  easy:        { givenCells: 62, label: 'Easy' },
  medium:      { givenCells: 53, label: 'Medium' },
  hard:        { givenCells: 44, label: 'Hard' },
  'very-hard': { givenCells: 35, label: 'Very Hard' },
  insane:      { givenCells: 26, label: 'Insane' },
  inhuman:     { givenCells: 17, label: 'Inhuman' },
} as const;
