import type { Board, CellState, SudokuAction, SudokuGameState } from '../types';
import type { GeneratedPuzzle } from './generator';
import { MAX_MISTAKES } from '../types';
import { isSameBox } from '../../../utils';

export function buildBoard(puzzle: GeneratedPuzzle): Board {
  return puzzle.given.map((row, r) =>
    row.map((value, c) => ({
      value: value === 0 ? null : value,
      solution: puzzle.solution[r][c],
      given: value !== 0,
      notes: new Set<number>() as ReadonlySet<number>,
    })),
  );
}

export function checkComplete(board: Board): boolean {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const cell = board[r][c];
      if (cell.value === null || cell.value !== cell.solution) return false;
    }
  }
  return true;
}

export function countErrors(board: Board): number {
  let count = 0;
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const cell = board[r][c];
      if (cell.value !== null && cell.value !== cell.solution) count++;
    }
  }
  return count;
}

export function countEmpty(board: Board): number {
  let count = 0;
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c].value === null) count++;
    }
  }
  return count;
}

function clearNotesForValue(board: Board, row: number, col: number, value: number): Board {
  return board.map((boardRow, r) =>
    boardRow.map((cell, c) => {
      if (r === row && c === col) return cell;
      if (r !== row && c !== col && !isSameBox(r, c, row, col)) return cell;
      if (!cell.notes.has(value)) return cell;
      const newNotes = new Set(cell.notes);
      newNotes.delete(value);
      return { ...cell, notes: newNotes as ReadonlySet<number> };
    }),
  );
}

function setCell(board: Board, row: number, col: number, patch: Partial<CellState>): Board {
  return board.map((boardRow, r) =>
    r !== row
      ? boardRow
      : boardRow.map((cell, c) => (c !== col ? cell : { ...cell, ...patch })),
  );
}

export function applyAction(state: SudokuGameState, action: SudokuAction): SudokuGameState {
  switch (action.type) {
    case 'SELECT_CELL':
      return { ...state, selected: { row: action.row, col: action.col } };

    case 'PLACE_VALUE': {
      if (state.selected === null || state.completed || state.failed) return state;
      const { row, col } = state.selected;
      const cell = state.board[row][col];
      if (cell.given) return state;

      if (state.notesMode) {
        return applyAction(state, { type: 'TOGGLE_NOTE', value: action.value });
      }

      const isWrong = action.value !== cell.solution;
      const mistakes = state.mistakes + (isWrong ? 1 : 0);
      const failed = mistakes >= MAX_MISTAKES;

      let board = setCell(state.board, row, col, {
        value: action.value,
        notes: new Set<number>() as ReadonlySet<number>,
      });
      board = clearNotesForValue(board, row, col, action.value);
      const completed = !failed && checkComplete(board);
      return { ...state, board, completed, mistakes, failed };
    }

    case 'FILL_CELL': {
      if (state.completed || state.failed) return state;
      const { row, col } = action;
      const cell = state.board[row][col];
      if (cell.given || cell.value !== null) return state;
      let board = setCell(state.board, row, col, {
        value: cell.solution,
        notes: new Set<number>() as ReadonlySet<number>,
      });
      board = clearNotesForValue(board, row, col, cell.solution);
      const completed = checkComplete(board);
      return { ...state, board, completed };
    }

    case 'CLEAR_CELL': {
      if (state.selected === null) return state;
      const { row, col } = state.selected;
      const cell = state.board[row][col];
      if (cell.given) return state;
      const board = setCell(state.board, row, col, {
        value: null,
        notes: new Set<number>() as ReadonlySet<number>,
      });
      return { ...state, board };
    }

    case 'TOGGLE_NOTE': {
      if (state.selected === null || state.completed || state.failed) return state;
      const { row, col } = state.selected;
      const cell = state.board[row][col];
      if (cell.given || cell.value !== null) return state;
      const newNotes = new Set(cell.notes);
      if (newNotes.has(action.value)) {
        newNotes.delete(action.value);
      } else {
        newNotes.add(action.value);
      }
      const board = setCell(state.board, row, col, {
        notes: newNotes as ReadonlySet<number>,
      });
      return { ...state, board };
    }

    case 'TOGGLE_NOTES_MODE':
      return { ...state, notesMode: !state.notesMode };

    case 'MOVE_SELECTION': {
      const current = state.selected ?? { row: 0, col: 0 };
      let { row, col } = current;
      if (action.direction === 'up') row = Math.max(0, row - 1);
      if (action.direction === 'down') row = Math.min(8, row + 1);
      if (action.direction === 'left') col = Math.max(0, col - 1);
      if (action.direction === 'right') col = Math.min(8, col + 1);
      return { ...state, selected: { row, col } };
    }

    case 'TICK': {
      if (state.completed || state.failed) return state;
      return { ...state, elapsedMs: state.elapsedMs + action.deltaMs };
    }
  }
}
