import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import type { SudokuGameState, SudokuAction, Difficulty } from '../types';
import { applyAction } from '../core/sudoku.core';
import { sudokuEngine } from '../engine';
import { saveGame, loadGame, clearGame } from '../utils/persistence';
import { computeHighlights, type HighlightMap } from '../utils/highlight';

export type UseSudokuReturn = {
  state: SudokuGameState | null;
  dispatch: (action: SudokuAction) => void;
  highlights: HighlightMap;
  newGame: (difficulty: Difficulty) => void;
  resumeGame: () => void;
  hasSavedGame: boolean;
  isLoading: boolean;
};

const EMPTY_HIGHLIGHTS: HighlightMap = {
  selected: null,
  related: new Set<string>(),
  conflict: new Set<string>(),
  sameValue: new Set<string>(),
};

export function useSudoku(): UseSudokuReturn {
  const [state, setState] = useState<SudokuGameState | null>(null);
  const [savedGame, setSavedGame] = useState<SudokuGameState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const lastTickRef = useRef<number>(Date.now());

  useEffect(() => {
    loadGame().then((loaded) => {
      if (loaded) setSavedGame(loaded);
      setIsLoading(false);
    });
  }, []);

  const dispatch = useCallback((action: SudokuAction) => {
    setState((prev) => {
      if (prev === null) return null;
      const next = applyAction(prev, action);
      if (next.completed || next.failed) {
        void clearGame();
      } else {
        void saveGame(next);
      }
      return next;
    });
  }, []);

  const newGame = useCallback((difficulty: Difficulty) => {
    const seed = Date.now().toString(36);
    const initialState = sudokuEngine.init(seed, difficulty);
    setState(initialState);
    setSavedGame(null);
    void clearGame();
    lastTickRef.current = Date.now();
  }, []);

  const resumeGame = useCallback(() => {
    if (savedGame) {
      setState(savedGame);
      setSavedGame(null);
      lastTickRef.current = Date.now();
    }
  }, [savedGame]);

  useEffect(() => {
    if (state === null || state.completed || state.failed) return;

    lastTickRef.current = Date.now();

    const interval = setInterval(() => {
      const now = Date.now();
      const delta = now - lastTickRef.current;
      lastTickRef.current = now;
      dispatch({ type: 'TICK', deltaMs: delta });
    }, 1000);

    return () => clearInterval(interval);
  }, [state?.completed, state?.failed, dispatch, state]);

  const highlights = useMemo(
    () => (state ? computeHighlights(state.board, state.selected) : EMPTY_HIGHLIGHTS),
    [state],
  );

  return {
    state,
    dispatch,
    highlights,
    newGame,
    resumeGame,
    hasSavedGame: savedGame !== null,
    isLoading,
  };
}
