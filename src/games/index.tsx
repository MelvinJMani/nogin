import type { GameConfig } from '../types';
import { SudokuGame } from './sudoku';
import { Game2048 } from './2048';

export const games: Record<string, GameConfig> = {
  sudoku: { title: 'Sudoku', Component: SudokuGame },
  '2048': { title: '2048', Component: Game2048 },
};
