// src/App.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Box, CircularProgress } from "@mui/material";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import PastGames from "./components/Games/PastGames";

import type { LeaderboardEntry, Game } from "./types";

const API_URL = import.meta.env.VITE_API_URL as string;

function App() {
  const [lb, setLb] = useState<LeaderboardEntry[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const lbResponse = await axios.get<LeaderboardEntry[]>(
          `${API_URL}/leaderboard`
        );
        setLb(lbResponse.data);

        const gamesResponse = await axios.get<Game[]>(`${API_URL}/games`);
        setGames(gamesResponse.data);
      } catch (err) {
        console.error("Failed to fetch", err);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Leaderboard lb={lb} />
          <PastGames games={games} />
        </Box>
      )}
    </Container>
  );
}

export default App;
