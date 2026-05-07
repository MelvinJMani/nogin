import { useState, useEffect, useCallback, useRef } from 'react';
import type { GameState2048, Direction } from '../types';
import { engine2048 } from '../engine';
import { saveGame, loadGame, clearGame } from '../utils/persistence';

export type Use2048Return = {
  state: GameState2048 | null;
  newTileIds: ReadonlySet<number>;
  move: (direction: Direction) => void;
  newGame: () => void;
  resumeGame: () => void;
  continueAfterWin: () => void;
  hasSavedGame: boolean;
  isLoading: boolean;
};

export function use2048(): Use2048Return {
  const [state, setState] = useState<GameState2048 | null>(null);
  const [savedState, setSavedState] = useState<GameState2048 | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newTileIds, setNewTileIds] = useState<ReadonlySet<number>>(new Set());
  const lastTickRef = useRef(Date.now());

  useEffect(() => {
    loadGame().then((loaded) => {
      if (loaded) setSavedState(loaded);
      setIsLoading(false);
    });
  }, []);

  // Timer
  useEffect(() => {
    if (!state || state.isOver || (state.hasWon && !state.continueAfterWin)) return;
    const interval = setInterval(() => {
      const now = Date.now();
      const delta = now - lastTickRef.current;
      lastTickRef.current = now;
      setState((prev) => {
        if (!prev) return prev;
        return engine2048.applyMove(prev, { type: 'TICK', deltaMs: delta });
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [state?.isOver, state?.hasWon, state?.continueAfterWin]);

  const move = useCallback((direction: Direction) => {
    setState((prev) => {
      if (!prev) return prev;
      const prevIds = new Set(prev.tiles.map((t) => t.id));
      const next = engine2048.applyMove(prev, { type: 'MOVE', direction });
      if (next === prev) return prev;
      const freshIds = new Set(next.tiles.filter((t) => !prevIds.has(t.id)).map((t) => t.id));
      setNewTileIds(freshIds);
      setTimeout(() => setNewTileIds(new Set()), 200);
      void saveGame(next);
      return next;
    });
  }, []);

  const newGame = useCallback(() => {
    const best = state?.best ?? savedState?.best ?? 0;
    const fresh = engine2048.init(Date.now().toString(36));
    const withBest = { ...fresh, best: Math.max(best, fresh.best) };
    setState(withBest);
    setSavedState(null);
    lastTickRef.current = Date.now();
    void clearGame();
  }, [state?.best, savedState?.best]);

  const resumeGame = useCallback(() => {
    if (!savedState) return;
    setState(savedState);
    setSavedState(null);
    lastTickRef.current = Date.now();
  }, [savedState]);

  const continueAfterWin = useCallback(() => {
    setState((prev) => {
      if (!prev) return prev;
      const next = engine2048.applyMove(prev, { type: 'CONTINUE_AFTER_WIN' });
      void saveGame(next);
      return next;
    });
  }, []);

  return {
    state,
    newTileIds,
    move,
    newGame,
    resumeGame,
    continueAfterWin,
    hasSavedGame: savedState !== null,
    isLoading,
  };
}
