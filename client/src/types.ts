// src/types.ts

export interface Game {
  id: string;
  playedOn: string;
  totalBuyIn: number;
  totalCashOut: number;
  imbalance: number;
  status: string;
  players: GamePlayer[];
}

export interface GamePlayer {
  id: string;
  gameId: string;
  playerId: string;
  buyIn: number;
  cashOut: number;
  rawResult: number;
  adjustedResult: number;
  game?: {
    id: string;
    playedOn: string;
  }; // optional here, since /games doesn't need to send it
  player: {
    id: string;
    name: string;
  };
}

export interface LeaderboardEntry {
  playerId: string;
  name: string;
  totalProfit: number;
  games: GamePlayer[];
}
