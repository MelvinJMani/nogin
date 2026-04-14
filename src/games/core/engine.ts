export interface GameEngine<State, Action, Difficulty = string> {
  init(seed: string, difficulty?: Difficulty): State;
  applyMove(state: State, action: Action): State;
  isComplete(state: State): boolean;
}
