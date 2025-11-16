// src/routes/leaderboard.ts
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { prisma } from '../prisma';

export async function leaderboardRoutes(
  app: FastifyInstance,
  _opts: FastifyPluginOptions
) {
  // GET /leaderboard (assuming this is registered under '/leaderboard')
  app.get('/', async () => {
    const players = await prisma.player.findMany({
      select: {
        id: true,
        name: true,
        games: {
          select: {
            id: true,
            gameId: true,
            playerId: true,
            buyIn: true,
            cashOut: true,
            rawResult: true,
            adjustedResult: true,
            game: {
              select: {
                id: true,
                playedOn: true,
              },
            },
          },
        },
      },
    });

    const leaderboard = players
      .map((p) => {
        const totalProfit = p.games.reduce((sum, gp) => {
          return sum + Number(gp.adjustedResult);
        }, 0);

        return {
          playerId: p.id,
          name: p.name,
          totalProfit,
          games: p.games.map((gp) => ({
            id: gp.id,
            gameId: gp.gameId,
            playerId: gp.playerId,
            buyIn: Number(gp.buyIn),
            cashOut: Number(gp.cashOut),
            rawResult: Number(gp.rawResult),
            adjustedResult: Number(gp.adjustedResult),
            game: {
              id: gp.game.id,
              playedOn: gp.game.playedOn.toISOString(),
            },
          })),
        };
      })
      .sort((a, b) => b.totalProfit - a.totalProfit);

    return leaderboard;
  });
}
