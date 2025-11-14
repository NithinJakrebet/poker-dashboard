// src/routes/games.ts
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { prisma } from '../prisma';

export async function gamesRoutes(
  app: FastifyInstance,
  _opts: FastifyPluginOptions
) {
  // POST /games
  app.post<{
    Body: { playedOn?: string };
  }>('/', async (request, reply) => {
    const { playedOn } = request.body;
    const game = await prisma.game.create({
      data: {
        playedOn: playedOn ? new Date(playedOn) : new Date(),
      },
    });
    reply.code(201);
    return game;
  });

  // GET /games
  app.get('/', async () => {
    return prisma.game.findMany({ orderBy: { playedOn: 'desc' } });
  });
}
