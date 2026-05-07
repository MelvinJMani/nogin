export type Direction = 'left' | 'right' | 'up' | 'down';

export type Tile = {
  readonly id: number;
  readonly value: number;
  readonly row: number;
  readonly col: number;
};

export type GameState2048 = {
  readonly tiles: ReadonlyArray<Tile>;
  readonly score: number;
  readonly best: number;
  readonly isOver: boolean;
  readonly hasWon: boolean;
  readonly continueAfterWin: boolean;
  readonly elapsedMs: number;
  readonly moveCount: number;
  readonly nextTileId: number;
};

export type GameAction2048 =
  | { type: 'MOVE'; direction: Direction }
  | { type: 'TICK'; deltaMs: number }
  | { type: 'CONTINUE_AFTER_WIN' };
