// src/types.ts

export type LeaderboardEntry = {
  playerId: string;
  name: string;
  totalProfit: number;
};

// src/types.ts
export interface Player {
  id: string;
  name: string;
}

export interface GamePlayer {
  playerId: string;
  playerName: string;
  buyIn: number;
  cashOut: number;
  result: number;
}

export interface GamePlayerInput {
  playerId: string;
  playerName: string;
  buyIn: number;
  cashOut: number;
}

export interface Game {
  id: string;
  playedOn: string;
  totalBuyIn: number;
  totalCashOut: number;
  imbalance: number;
  status: string;
  players?: GamePlayer[];
}
