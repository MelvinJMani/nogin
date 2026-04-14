import { SudokuGrid } from '../../components/sudoku/SudokuGrid';
import { NumberPad } from '../../components/sudoku/NumberPad';
import { useSudokuKeyboard } from '../../hooks/useSudokuKeyboard';

export function SudokuGame() {
  useSudokuKeyboard();

  return (
    <>
      <SudokuGrid />
      <NumberPad />
    </>
  );
}
