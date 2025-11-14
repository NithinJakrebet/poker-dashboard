// src/routes/players.ts
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { prisma } from '../prisma';

export async function playersRoutes(
  app: FastifyInstance,
  _opts: FastifyPluginOptions
) {
  // GET /players
  app.get('/', async () => {
    return prisma.player.findMany({ orderBy: { name: 'asc' } });
  });

  // POST /players
  app.post<{
    Body: { name: string };
  }>('/', async (request, reply) => {
    const { name } = request.body;

    try {
      const player = await prisma.player.create({ data: { name } });
      reply.code(201);
      return player;
    } catch (err: any) {
      if (err.code === 'P2002') {
        reply.code(400);
        return { error: 'Player with this name already exists' };
      }
      request.log.error(err);
      reply.code(500);
      return { error: 'Internal server error' };
    }
  });
}
