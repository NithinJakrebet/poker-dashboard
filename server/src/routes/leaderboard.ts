// src/routes/leaderboard.ts
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { prisma } from '../prisma';

export async function leaderboardRoutes(
  app: FastifyInstance,
  _opts: FastifyPluginOptions
) {
      
// GET /leaderboard
  app.get('/', async () => {
    const players = await prisma.player.findMany({
      select: {
        id: true,
        name: true,
        games: {
          select: {
            adjustedResult: true,
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
        };
      })
      .sort((a, b) => b.totalProfit - a.totalProfit);

    return leaderboard;
  });
}
