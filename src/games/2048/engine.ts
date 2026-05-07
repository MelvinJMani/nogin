import type { GameEngine } from '../core/engine';
import type { GameState2048, GameAction2048 } from './types';
import { createInitialTiles } from './core/generator';
import { applyMovement } from './core/movement';
import { hasWon } from './core/scoring';

export const engine2048: GameEngine<GameState2048, GameAction2048> = {
  init(_seed: string): GameState2048 {
    const { tiles, nextTileId } = createInitialTiles();
    return {
      tiles,
      score: 0,
      best: 0,
      isOver: false,
      hasWon: false,
      continueAfterWin: false,
      elapsedMs: 0,
      moveCount: 0,
      nextTileId,
    };
  },

  applyMove(state: GameState2048, action: GameAction2048): GameState2048 {
    switch (action.type) {
      case 'MOVE': {
        if (state.isOver) return state;
        if (state.hasWon && !state.continueAfterWin) return state;

        const result = applyMovement(state.tiles, action.direction, state.nextTileId);
        if (!result.moved) return state;

        const newScore = state.score + result.scoreDelta;
        const newBest = Math.max(state.best, newScore);
        const won = hasWon(result.tiles);

        return {
          ...state,
          tiles: result.tiles,
          score: newScore,
          best: newBest,
          isOver: result.isOver,
          hasWon: won,
          nextTileId: result.nextTileId,
          moveCount: state.moveCount + 1,
        };
      }

      case 'TICK': {
        if (state.isOver || (state.hasWon && !state.continueAfterWin)) return state;
        return { ...state, elapsedMs: state.elapsedMs + action.deltaMs };
      }

      case 'CONTINUE_AFTER_WIN':
        return { ...state, continueAfterWin: true };
    }
  },

  isComplete(state: GameState2048): boolean {
    return state.hasWon || state.isOver;
  },
};
