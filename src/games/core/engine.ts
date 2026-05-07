export interface GameEngine<TState, TAction> {
  init(seed: string, difficulty?: string): TState;
  applyMove(state: TState, action: TAction): TState;
  isComplete(state: TState): boolean;
}
