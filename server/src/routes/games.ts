// src/routes/games.ts
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { prisma } from '../prisma';
import { GameStatus } from '@prisma/client';


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

  // GET /games/:id
  app.get<{
    Params: { id: string };
  }>('/:id', async (request, reply) => {
    const { id } = request.params;

    const game = await prisma.game.findUnique({
      where: { id },
      include: {
        players: {
          include: {
            player: {
              select: { id: true, name: true },
            },
          },
        },
      },
    });

    if (!game) {
      reply.code(404);
      return { error: 'Game not found' };
    }

    return game;
  });


  // POST /games/:id/players  (add player + buy-in)
  app.post<{
    Params: { id: string };
    Body: { playerId: string; buyIn: number };
  }>('/:id/players', async (request, reply) => {
    const { id: gameId } = request.params;
    const { playerId, buyIn } = request.body;

    // Ensure game exists
    const game = await prisma.game.findUnique({ where: { id: gameId } });
    if (!game) {
      reply.code(404);
      return { error: 'Game not found' };
    }

    // Ensure player exists
    const player = await prisma.player.findUnique({ where: { id: playerId } });
    if (!player) {
      reply.code(404);
      return { error: 'Player not found' };
    }

    // Create GamePlayer row (cashOut defaults to 0)
    const gp = await prisma.gamePlayer.create({
      data: {
        gameId,
        playerId,
        buyIn,
        cashOut: 0,
        rawResult: -buyIn,       // 0 - buyIn
        adjustedResult: -buyIn,  // will be fixed when /end is called
      },
      include: {
        player: { select: { id: true, name: true } },
      },
    });

    reply.code(201);
    return gp;
  });

  // PATCH /games/:id/players/:gpId/cashout  (set/adjust cash-out)
  app.patch<{
    Params: { id: string; gpId: string };
    Body: { cashOut: number };
  }>('/:id/players/:gpId/cashout', async (request, reply) => {
    const { id: gameId, gpId } = request.params;
    const { cashOut } = request.body;

    // Ensure game exists (optional but nice)
    const game = await prisma.game.findUnique({ where: { id: gameId } });
    if (!game) {
      reply.code(404);
      return { error: 'Game not found' };
    }

    // Find gamePlayer
    const gp = await prisma.gamePlayer.findUnique({ where: { id: gpId } });
    if (!gp || gp.gameId !== gameId) {
      reply.code(404);
      return { error: 'Game player not found for this game' };
    }

    const rawResult = cashOut - Number(gp.buyIn);

    const updated = await prisma.gamePlayer.update({
      where: { id: gpId },
      data: {
        cashOut,
        rawResult,
        // adjustedResult will be recalculated on /end
      },
      include: {
        player: { select: { id: true, name: true } },
      },
    });

    return updated;
  });

  // POST /games/:id/end  (do imbalance math + finalize results)
  app.post<{
    Params: { id: string };
  }>('/:id/end', async (request, reply) => {
    const { id: gameId } = request.params;

    // Load game + all gamePlayers
    const game = await prisma.game.findUnique({
      where: { id: gameId },
      include: {
        players: true, // gamePlayers
      },
    });

    if (!game) {
      reply.code(404);
      return { error: 'Game not found' };
    }

    const gamePlayers = game.players;
    const playerCount = gamePlayers.length;

    if (playerCount === 0) {
      reply.code(400);
      return { error: 'Cannot end a game with no players' };
    }

    // Compute totals
    const totalBuyIn = gamePlayers.reduce(
      (sum, gp) => sum + Number(gp.buyIn),
      0
    );
    const totalCashOut = gamePlayers.reduce(
      (sum, gp) => sum + Number(gp.cashOut),
      0
    );

    // gameImbalance = totalBuyIn - totalCashOut  (what shows in the date row)
    const imbalance = totalBuyIn - totalCashOut;

    // Per-player adjustment = imbalance / numPlayers
    const perPlayerAdj = imbalance / playerCount;

    // Now recalc raw + adjusted for each player and update the game
    const result = await prisma.$transaction(async (tx) => {
      // Update all gamePlayers
      for (const gp of gamePlayers) {
        const rawResult = Number(gp.cashOut) - Number(gp.buyIn);
        const adjustedResult = rawResult + perPlayerAdj;

        await tx.gamePlayer.update({
          where: { id: gp.id },
          data: {
            rawResult,
            adjustedResult,
          },
        });
      }

      // Update game totals + status
      const updatedGame = await tx.game.update({
        where: { id: gameId },
        data: {
          totalBuyIn,
          totalCashOut,
          imbalance,
          status: GameStatus.CLOSED,
        },
        include: {
          players: {
            include: {
              player: {
                select: { id: true, name: true },
              },
            },
          },
        },
      });

      return updatedGame;
    });

    return {
      message: 'Game ended and results finalized',
      game: result,
    };
  });
}
