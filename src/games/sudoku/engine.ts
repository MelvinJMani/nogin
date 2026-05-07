import type { GameEngine } from '../core/engine';
import type { SudokuGameState, SudokuAction, Difficulty } from './types';
import { generatePuzzle } from './core/generator';
import { buildBoard, applyAction, checkComplete } from './core/sudoku.core';

const VALID_DIFFICULTIES = new Set<string>([
  'very-easy',
  'easy',
  'medium',
  'hard',
  'very-hard',
  'insane',
  'inhuman',
]);

function isValidDifficulty(d: string | undefined): d is Difficulty {
  return d !== undefined && VALID_DIFFICULTIES.has(d);
}

export const sudokuEngine: GameEngine<SudokuGameState, SudokuAction> = {
  init(seed: string, difficulty?: string): SudokuGameState {
    const diff: Difficulty = isValidDifficulty(difficulty) ? difficulty : 'medium';
    const puzzle = generatePuzzle(seed, diff);
    const board = buildBoard(puzzle);
    return {
      board,
      difficulty: diff,
      seed,
      notesMode: false,
      selected: null,
      startedAt: Date.now(),
      elapsedMs: 0,
      completed: false,
      mistakes: 0,
      failed: false,
    };
  },

  applyMove(state: SudokuGameState, action: SudokuAction): SudokuGameState {
    return applyAction(state, action);
  },

  isComplete(state: SudokuGameState): boolean {
    return checkComplete(state.board);
  },
};
