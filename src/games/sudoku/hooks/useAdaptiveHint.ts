import { useState, useEffect, useRef } from 'react';
import type { Board } from '../types';
import { findNakedSingles } from '../core/hints';

const MISTAKE_THRESHOLD = 3;
const IDLE_THRESHOLD_MS = 90_000;
const IDLE_CHECK_INTERVAL_MS = 10_000;

export function useAdaptiveHint(
  board: Board,
  mistakes: number,
  completed: boolean,
): ReadonlySet<string> {
  const [hintedCells, setHintedCells] = useState<ReadonlySet<string>>(new Set());
  const lastActivityRef = useRef(Date.now());
  const boardRef = useRef(board);

  useEffect(() => {
    lastActivityRef.current = Date.now();
    boardRef.current = board;
  }, [board]);

  // Mistake-driven hints: once threshold is crossed, show naked singles for rest of game
  useEffect(() => {
    if (completed) {
      setHintedCells(new Set());
      return;
    }
    if (mistakes >= MISTAKE_THRESHOLD) {
      setHintedCells(findNakedSingles(board));
    } else {
      setHintedCells((prev) => (prev.size > 0 ? new Set() : prev));
    }
  }, [board, mistakes, completed]);

  // Idle-driven hints: surface naked singles after prolonged inactivity
  useEffect(() => {
    if (completed || mistakes >= MISTAKE_THRESHOLD) return;

    const interval = setInterval(() => {
      const idleMs = Date.now() - lastActivityRef.current;
      if (idleMs >= IDLE_THRESHOLD_MS) {
        setHintedCells(findNakedSingles(boardRef.current));
      } else {
        setHintedCells((prev) => (prev.size > 0 ? new Set() : prev));
      }
    }, IDLE_CHECK_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [completed, mistakes]);

  return hintedCells;
}
