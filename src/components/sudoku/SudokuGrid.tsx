import { useSudoku } from '../../hooks/useSudoku';
import { isSameBox } from '../../utils';

export function SudokuGrid() {
  const { game, selected, select } = useSudoku();

  if (!game) return null;

  return (
    <div>
      {game.board.map((row, r) => (
        <div key={r} style={{ display: 'flex' }}>
          {row.map((cell, c) => {
            const isSelected = selected?.row === r && selected?.col === c;

            const isSameRow = selected?.row === r;
            const isSameCol = selected?.col === c;

            const isSameBoxCell =
              selected && isSameBox(selected.row, selected.col, r, c);

            const isWrong = cell.value !== null && cell.value !== cell.solution;

            // 🎨 Priority-based background
            let background = '#fff';

            if (isSameRow || isSameCol || isSameBoxCell) {
              background = '#f5f5f5';
            }

            if (isWrong) {
              background = '#fdd';
            }

            if (isSelected) {
              background = '#ddd';
            }

            return (
              <div
                key={c}
                onClick={() => select(r, c)}
                style={{
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',

                  borderTop: r % 3 === 0 ? '2px solid black' : '1px solid #999',
                  borderLeft:
                    c % 3 === 0 ? '2px solid black' : '1px solid #999',
                  borderRight: c === 8 ? '2px solid black' : '',
                  borderBottom: r === 8 ? '2px solid black' : '',

                  background,
                  cursor: cell.fixed ? 'not-allowed' : 'pointer',
                  fontWeight: cell.fixed ? 'bold' : 'normal',
                }}
              >
                {cell.value ?? ''}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
