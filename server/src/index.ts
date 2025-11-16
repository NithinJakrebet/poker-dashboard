import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';

import { playersRoutes } from './routes/players';
import { gamesRoutes } from './routes/games';
import { leaderboardRoutes } from './routes/leaderboard';

const app = Fastify({ logger: true });

app.get('/health', async () => ({ status: 'ok' }));

app.register(cors, {
  origin: '*',
});

// Register route “groups”
app.register(playersRoutes, { prefix: '/players' });
app.register(gamesRoutes,   { prefix: '/games' });
app.register(leaderboardRoutes,   { prefix: '/leaderboard' });

const start = async () => {
  try {
    await app.listen({ port: 3000, host: '0.0.0.0' });
    console.log(`Server listening on http://localhost:3000`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
