// src/types.ts

export type LeaderboardEntry = {
  playerId: string;
  name: string;
  totalProfit: number;
};

export type Game = {
  id: string;
  playedOn: string;
  totalBuyIn: string;
  totalCashOut: string;
  imbalance: string;
  status: string;
};
