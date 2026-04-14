export type Difficulty = 'easy' | 'medium' | 'hard';

export type Cell = {
  value: number | null;
  solution: number;
  fixed: boolean;
};

export type Board = Cell[][];

export type SudokuState = {
  board: Board;
  seed: string;
  difficulty: Difficulty;
  mistakes: number;
  completed: boolean;
};

export type SudokuAction =
  | { type: 'SET_VALUE'; row: number; col: number; value: number | null }
  | { type: 'RESET' };
