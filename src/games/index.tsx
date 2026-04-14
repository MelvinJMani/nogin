import { SudokuGame } from './sudoku/SudokuGame';
import type { GameConfig } from '../types';

export const games: Record<string, GameConfig> = {
  sudoku: {
    title: 'Sudoku',
    Component: SudokuGame,
  },
};
