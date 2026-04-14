import type { GameEngine } from '../core/engine';
import { generateSudoku } from './generator';
import type { SudokuState, SudokuAction, Difficulty } from './types';

export class SudokuEngine
  implements GameEngine<SudokuState, SudokuAction, Difficulty>
{
  init(seed: string, difficulty: Difficulty = 'easy'): SudokuState {
    return {
      board: generateSudoku(seed, difficulty),
      seed,
      difficulty,
      mistakes: 0,
      completed: false,
    };
  }

  applyMove(state: SudokuState, action: SudokuAction): SudokuState {
    switch (action.type) {
      case 'SET_VALUE': {
        const { row, col, value } = action;
        const cell = state.board[row][col];

        if (cell.fixed) return state;

        const newBoard = state.board.map((r) => r.map((c) => ({ ...c })));
        newBoard[row][col].value = value;

        const isCorrect = value === cell.solution;

        return {
          ...state,
          board: newBoard,
          mistakes: isCorrect ? state.mistakes : state.mistakes + 1,
          completed: this.isComplete({ ...state, board: newBoard }),
        };
      }

      case 'RESET':
        return this.init(state.seed, state.difficulty);

      default:
        return state;
    }
  }

  isComplete(state: SudokuState): boolean {
    return state.board.every((row) =>
      row.every((cell) => cell.value === cell.solution),
    );
  }
}
