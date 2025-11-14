// src/App.tsx
import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';

import Leaderboard from './components/Leaderboard';
import RecentGames from './components/RecentGames';
import GameDetailsDialog from './components/GameDetailsDialog';
import AddGameDialog from './components/AddGameDialog';
import type { Game, LeaderboardEntry, Player, GamePlayerInput } from './types';

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);

  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [addGameOpen, setAddGameOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [lbRes, gamesRes, playersRes] = await Promise.all([
          fetch('http://localhost:3000/leaderboard'),
          fetch('http://localhost:3000/games'),
          fetch('http://localhost:3000/players'),
        ]);

        const lbData = await lbRes.json();
        const gamesData = await gamesRes.json();
        const playersData = await playersRes.json();

        setLeaderboard(lbData);
        setGames(gamesData);
        setPlayers(playersData);
      } catch (err) {
        console.error('Failed to load data', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleGameClick = (game: Game) => {
    setSelectedGame(game);
    setDetailsOpen(true);
  };

  const handleAddGameSave = async (payload: {
    playedOn: string;
    players: GamePlayerInput[];
    baseBuyIn: number;
  }) => {
    try {
      const res = await fetch('http://localhost:3000/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to create game');

      const newGame: Game = await res.json();
      setGames((prev) => [newGame, ...prev]);
    } catch (err) {
      console.error(err);
      // TODO: show toast/snackbar
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Poker Night Tracker
      </Typography>

      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { md: '1fr 1fr' } }}>
        <Leaderboard leaderboard={leaderboard} />
        <RecentGames
          games={games}
          onGameClick={handleGameClick}
          onAddGame={() => setAddGameOpen(true)}
        />
      </Box>

      <GameDetailsDialog
        open={detailsOpen}
        game={selectedGame}
        onClose={() => setDetailsOpen(false)}
      />

      <AddGameDialog
        open={addGameOpen}
        onClose={() => setAddGameOpen(false)}
        onSave={handleAddGameSave}
        players={players}
      />
    </Container>
  );
}

export default App;
