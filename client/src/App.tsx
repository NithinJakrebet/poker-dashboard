// src/App.tsx
import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  AppBar,
  Tabs,
  Tab,
  Toolbar,
} from '@mui/material';

import Leaderboard from './components/Leaderboard';
import RecentGames from './components/RecentGames';
import type { Game, LeaderboardEntry } from './types';

type View = 'leaderboard' | 'games';

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<View>('leaderboard');

  useEffect(() => {
    async function fetchData() {
      try {
        const [lbRes, gamesRes] = await Promise.all([
          fetch('http://localhost:3000/leaderboard'),
          fetch('http://localhost:3000/games'),
        ]);

        const lbData = (await lbRes.json()) as LeaderboardEntry[];
        const gamesData = (await gamesRes.json()) as Game[];

        setLeaderboard(lbData);
        setGames(gamesData);
      } catch (err) {
        console.error('Failed to load data', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Top Nav */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ px: 2 }}>
          <Typography
            variant="h5"
            sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 0.5 }}
          >
            Poker Dashboard
          </Typography>
          <Tabs
            value={view}
            onChange={(_, val) => setView(val)}
            textColor="inherit"
            indicatorColor="secondary"
          >
            <Tab value="leaderboard" label="Leaderboard" />
            <Tab value="games" label="Recent Games" />
          </Tabs>
        </Toolbar>
      </AppBar>

      {/* Main content */}
      <Container maxWidth="md" sx={{ py: 3 }}>
        {view === 'leaderboard' && <Leaderboard leaderboard={leaderboard} />}
        {view === 'games' && <RecentGames games={games} />}
      </Container>
    </Box>
  );
}

export default App;
