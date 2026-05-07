import { useEffect, useRef } from 'react';
import type { SudokuAction } from '../types';

export function useSudokuKeyboard(
  dispatch: (action: SudokuAction) => void,
  enabled: boolean,
  notesMode: boolean,
): void {
  const notesModeRef = useRef(notesMode);
  notesModeRef.current = notesMode;

  useEffect(() => {
    if (!enabled) return;

    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          dispatch({ type: 'MOVE_SELECTION', direction: 'up' });
          break;
        case 'ArrowDown':
          e.preventDefault();
          dispatch({ type: 'MOVE_SELECTION', direction: 'down' });
          break;
        case 'ArrowLeft':
          e.preventDefault();
          dispatch({ type: 'MOVE_SELECTION', direction: 'left' });
          break;
        case 'ArrowRight':
          e.preventDefault();
          dispatch({ type: 'MOVE_SELECTION', direction: 'right' });
          break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9': {
          const value = parseInt(e.key, 10);
          if (notesModeRef.current) {
            dispatch({ type: 'TOGGLE_NOTE', value });
          } else {
            dispatch({ type: 'PLACE_VALUE', value });
          }
          break;
        }
        case '0':
        case 'Backspace':
        case 'Delete':
          dispatch({ type: 'CLEAR_CELL' });
          break;
        case 'n':
        case 'N':
          dispatch({ type: 'TOGGLE_NOTES_MODE' });
          break;
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [dispatch, enabled]);
}
