export type Position = [number, number];
export type GameMap = number[][];
export type GameItem = 'key';

export interface GameState {
  playerPosition: Position;
  inventory: GameItem[];
  gameMap: GameMap;
  score: number;
  message: string;
  gameComplete: boolean;
  moves: number;
}