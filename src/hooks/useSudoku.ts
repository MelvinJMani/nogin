import { useGameStore } from '../store/useGameStore';

export function useSudoku() {
  const game = useGameStore((s) => s.game);
  const selected = useGameStore((s) => s.selected);

  const start = useGameStore((s) => s.startSudoku);
  const select = useGameStore((s) => s.selectCell);
  const dispatch = useGameStore((s) => s.dispatch);

  return {
    game,
    selected,
    start,
    select,

    setValue: (value: number | null) => {
      if (!selected) return;
      dispatch({
        type: 'SET_VALUE',
        row: selected.row,
        col: selected.col,
        value,
      });
    },

    reset: () => dispatch({ type: 'RESET' }),
  };
}
