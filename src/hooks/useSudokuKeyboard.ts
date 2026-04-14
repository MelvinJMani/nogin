import { useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';

export function useSudokuKeyboard() {
  const selected = useGameStore((s) => s.selected);
  const select = useGameStore((s) => s.selectCell);
  const dispatch = useGameStore((s) => s.dispatch);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (!selected) return;

      const { row, col } = selected;

      // 🔢 Numbers
      if (e.key >= '1' && e.key <= '9') {
        dispatch({
          type: 'SET_VALUE',
          row,
          col,
          value: Number(e.key),
        });
      }

      if (e.key === 'Backspace' || e.key === 'Delete') {
        dispatch({
          type: 'SET_VALUE',
          row,
          col,
          value: null,
        });
      }

      // ⬅️➡️⬆️⬇️ Navigation
      if (e.key === 'ArrowUp') select(Math.max(0, row - 1), col);
      if (e.key === 'ArrowDown') select(Math.min(8, row + 1), col);
      if (e.key === 'ArrowLeft') select(row, Math.max(0, col - 1));
      if (e.key === 'ArrowRight') select(row, Math.min(8, col + 1));
    }

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [dispatch, select, selected]);
}
