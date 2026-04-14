import { create } from 'zustand';
import { SudokuEngine } from '../games/sudoku/engine';
import type {
  SudokuState,
  SudokuAction,
  Difficulty,
} from '../games/sudoku/types';

type GameStore = {
  game: SudokuState | null;
  selected: { row: number; col: number } | null;

  startSudoku: (seed: string, difficulty: Difficulty) => void;
  selectCell: (row: number, col: number) => void;
  dispatch: (action: SudokuAction) => void;
};

const engine = new SudokuEngine();

export const useGameStore = create<GameStore>((set) => ({
  game: null,
  selected: null,

  startSudoku: (seed, difficulty) =>
    set({
      game: engine.init(seed, difficulty),
      selected: null,
    }),

  selectCell: (row, col) => set({ selected: { row, col } }),

  dispatch: (action) =>
    set((state) => {
      if (!state.game) return state;

      return {
        game: engine.applyMove(state.game, action),
      };
    }),
}));
