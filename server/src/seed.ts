import 'dotenv/config';
import { PrismaClient, GameStatus } from '@prisma/client';

const prisma = new PrismaClient();

// All your games + per-player adjusted results (from the sheet)
const rawGames = [
  {
    playedOn: '2025-03-08',
    players: [
      { name: 'Rutesh',  buyIn: 15.0, cashOut: 2.5,  adjusted: -12.07 },
      { name: 'Yash',    buyIn: 10.0, cashOut: 10.1, adjusted: 0.53 },
      { name: 'Kausthub',buyIn: 10.0, cashOut: 4.8,  adjusted: -4.77 },
      { name: 'Naren',   buyIn: 10.0, cashOut: 22.7, adjusted: 13.13 },
      { name: 'Nithin',  buyIn: 10.0, cashOut: 12.4, adjusted: 2.83 },
      { name: 'Joseph',  buyIn: 10.0, cashOut: 0.0,  adjusted: -9.57 },
      { name: 'Srikar',  buyIn: 10.0, cashOut: 19.5, adjusted: 9.93 },
    ],
  },
  {
    playedOn: '2025-03-21',
    players: [
      { name: 'Nithin',  buyIn: 10.0, cashOut: 23.51, adjusted: 13.55 },
      { name: 'Naman',   buyIn: 20.0, cashOut: 19.77, adjusted: -0.19 },
      { name: 'Yash',    buyIn: 10.0, cashOut: 14.44, adjusted: 4.48 },
      { name: 'Srikar',  buyIn: 10.0, cashOut: 6.5,   adjusted: -3.46 },
      { name: 'Rutesh',  buyIn: 10.0, cashOut: 3.12,  adjusted: -6.84 },
      { name: 'Naren',   buyIn: 10.0, cashOut: 12.36, adjusted: 2.4 },
      { name: 'Vikram',  buyIn: 10.0, cashOut: 0.0,   adjusted: -9.96 },
    ],
  },
  {
    playedOn: '2025-04-06',
    players: [
      { name: 'Nithin',  buyIn: 20.0, cashOut: 5.4,   adjusted: -14.6 },
      { name: 'Joseph',  buyIn: 20.0, cashOut: 0.0,   adjusted: -20.0 },
      { name: 'Naren',   buyIn: 10.0, cashOut: 51.45, adjusted: 41.45 },
      { name: 'Yash',    buyIn: 15.0, cashOut: 0.0,   adjusted: -15.0 },
      { name: 'Srikar',  buyIn: 10.0, cashOut: 29.25, adjusted: 19.25 },
      { name: 'Johnny',  buyIn: 20.0, cashOut: 8.9,   adjusted: -11.1 },
    ],
  },
  {
    playedOn: '2025-04-10',
    players: [
      { name: 'Nithin',  buyIn: 20.0, cashOut: 0.0,   adjusted: -19.61 },
      { name: 'Srikar',  buyIn: 15.0, cashOut: 5.4,   adjusted: -9.21 },
      { name: 'Joseph',  buyIn: 10.0, cashOut: 45.0,  adjusted: 35.39 },
      { name: 'Rutesh',  buyIn: 10.0, cashOut: 18.7,  adjusted: 9.09 },
      { name: 'Sanjay',  buyIn: 15.0, cashOut: 15.8,  adjusted: 1.19 },
      { name: 'Kausthub',buyIn: 10.0, cashOut: 1.3,   adjusted: -8.31 },
      { name: 'Yash',    buyIn: 10.0, cashOut: 0.0,   adjusted: -9.61 },
      { name: 'Johnny',  buyIn: 20.0, cashOut: 11.2,  adjusted: -8.41 },
      { name: 'Naren',   buyIn: 10.0, cashOut: 29.1,  adjusted: 19.49 },
      { name: 'Naveen',  buyIn: 10.0, cashOut: 0.0,   adjusted: -9.61 },
      { name: 'Vikram',  buyIn: 20.0, cashOut: 0.0,   adjusted: -19.61 },
      { name: 'Shiv',    buyIn: 10.0, cashOut: 28.8,  adjusted: 19.19 },
    ],
  },
  {
    playedOn: '2025-05-08',
    players: [
      { name: 'Nithin',  buyIn: 10.0, cashOut: 18.05, adjusted: 8.05 },
      { name: 'Joseph',  buyIn: 10.0, cashOut: 0.0,   adjusted: -10.0 },
      { name: 'Kausthub',buyIn: 10.0, cashOut: 7.6,   adjusted: -2.4 },
      { name: 'Johnny',  buyIn: 10.0, cashOut: 11.75, adjusted: 1.75 },
      { name: 'Naren',   buyIn: 10.0, cashOut: 0.0,   adjusted: -10.0 },
      { name: 'Naveen',  buyIn: 10.0, cashOut: 25.55, adjusted: 15.55 },
      { name: 'James D', buyIn: 10.0, cashOut: 9.55,  adjusted: -0.45 },
      { name: 'Yash',    buyIn: 10.0, cashOut: 7.5,   adjusted: -2.5 },
    ],
  },
  {
    playedOn: '2025-05-11',
    players: [
      { name: 'Nithin',  buyIn: 5.0, cashOut: 0.0,   adjusted: -5.0 },
      { name: 'Srikar',  buyIn: 5.0, cashOut: 0.0,   adjusted: -5.0 },
      { name: 'Yash',    buyIn: 5.0, cashOut: 0.0,   adjusted: -5.0 },
      { name: 'Kausthub',buyIn: 5.0, cashOut: 0.0,   adjusted: -5.0 },
      { name: 'Sanjay',  buyIn: 5.0, cashOut: 1.5,   adjusted: -3.5 },
      { name: 'Rutesh',  buyIn: 5.0, cashOut: 4.0,   adjusted: -1.0 },
      { name: 'Arjit',   buyIn: 5.0, cashOut: 6.8,   adjusted: 1.8 },
      { name: 'Naren',   buyIn: 5.0, cashOut: 27.7,  adjusted: 22.7 },
    ],
  },
  {
    playedOn: '2025-05-18',
    players: [
      { name: 'PJ',      buyIn: 5.0, cashOut: 10.64, adjusted: 5.64 },
      { name: 'Srikar',  buyIn: 5.0, cashOut: 10.63, adjusted: 5.63 },
      { name: 'Yash',    buyIn: 5.0, cashOut: 5.78,  adjusted: 0.78 },
      { name: 'Naren',   buyIn: 5.0, cashOut: 2.95,  adjusted: -2.05 },
      { name: 'Kausthub',buyIn: 5.0, cashOut: 0.0,   adjusted: -5.0 },
      { name: 'Nithin',  buyIn: 5.0, cashOut: 0.0,   adjusted: -5.0 },
    ],
  },
  {
    playedOn: '2025-09-27',
    players: [
      { name: 'Nithin',  buyIn: 10.0, cashOut: 0.0,   adjusted: -10.09 },
      { name: 'Vikram',  buyIn: 10.0, cashOut: 0.0,   adjusted: -10.09 },
      { name: 'Srikar',  buyIn: 10.0, cashOut: 14.1,  adjusted: 4.01 },
      { name: 'Zein',    buyIn: 10.0, cashOut: 25.6,  adjusted: 15.51 },
      { name: 'Arjit',   buyIn: 10.0, cashOut: 10.0,  adjusted: -0.09 },
      { name: 'Neil',    buyIn: 10.0, cashOut: 18.9,  adjusted: 8.81 },
      { name: 'Yash',    buyIn: 10.0, cashOut: 2.0,   adjusted: -8.09 },
    ],
  },
  {
    playedOn: '2025-10-04',
    players: [
      { name: 'Nithin',  buyIn: 5.0, cashOut: 6.6,   adjusted: 1.6 },
      { name: 'Neil',    buyIn: 5.0, cashOut: 3.4,   adjusted: -1.6 },
      { name: 'Srikar',  buyIn: 5.0, cashOut: 3.9,   adjusted: -1.1 },
      { name: 'Akshay',  buyIn: 5.0, cashOut: 11.0,  adjusted: 6.0 },
      { name: 'Vikram',  buyIn: 5.0, cashOut: 0.0,   adjusted: -5.0 },
      { name: 'Anshul',  buyIn: 5.0, cashOut: 5.1,   adjusted: 0.1 },
    ],
  },
  {
    playedOn: '2025-10-11',
    players: [
      { name: 'Nithin',  buyIn: 20.0, cashOut: 11.1, adjusted: -8.9 },
      { name: 'Yash',    buyIn: 20.0, cashOut: 33.1, adjusted: 13.1 },
      { name: 'Srikar',  buyIn: 10.0, cashOut: 19.9, adjusted: 9.9 },
      { name: 'Rutesh',  buyIn: 20.0, cashOut: 5.9,  adjusted: -14.1 },
    ],
  },
  {
    playedOn: '2025-11-07',
    players: [
      { name: 'Nithin',  buyIn: 10.0, cashOut: 25.9, adjusted: 15.9 },
      { name: 'Yash',    buyIn: 10.0, cashOut: 11.6, adjusted: 1.6 },
      { name: 'Srikar',  buyIn: 15.0, cashOut: 14.4, adjusted: -0.6 },
      { name: 'Vikram',  buyIn: 10.0, cashOut: 7.2,  adjusted: -2.8 },
      { name: 'Kausthub',buyIn: 10.0, cashOut: 0.0,  adjusted: -10.0 },
      { name: 'Zein',    buyIn: 10.0, cashOut: 5.9,  adjusted: -4.1 },
    ],
  },
];

async function main() {
  // Wipe existing data (optional but handy while developing)
  await prisma.gamePlayer.deleteMany();
  await prisma.game.deleteMany();
  await prisma.player.deleteMany();

  // 1) Create players (unique by name)
  const nameSet = new Set<string>();
  for (const g of rawGames) {
    for (const p of g.players) {
      nameSet.add(p.name);
    }
  }

  const playerIdByName = new Map<string, string>();

  for (const name of nameSet) {
    const player = await prisma.player.create({ data: { name } });
    playerIdByName.set(name, player.id);
  }

  // 2) Create games and game_players
  for (const g of rawGames) {
    const totalBuyIn = g.players.reduce((sum, p) => sum + p.buyIn, 0);
    const totalCashOut = g.players.reduce((sum, p) => sum + p.cashOut, 0);
    const imbalance = totalBuyIn - totalCashOut; // same idea as your sheet's date row

    const game = await prisma.game.create({
      data: {
        playedOn: new Date(g.playedOn),
        totalBuyIn,
        totalCashOut,
        imbalance,
        status: GameStatus.CLOSED,
      },
    });

    for (const p of g.players) {
      const playerId = playerIdByName.get(p.name)!;

      const rawResult = p.cashOut - p.buyIn; // BEFORE redistribution

      await prisma.gamePlayer.create({
        data: {
          gameId: game.id,
          playerId,
          buyIn: p.buyIn,
          cashOut: p.cashOut,
          rawResult,         // C - B
          adjustedResult: p.adjusted, // your sheet result (with + Dtotal/players)
        },
      });
    }
  }

  console.log('Seed complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
