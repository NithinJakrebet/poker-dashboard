// src/components/Leaderboard.tsx
import type { FC } from 'react';
import {
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import type { LeaderboardEntry } from '../types';

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[];
}

const Leaderboard: FC<LeaderboardProps> = ({ leaderboard }) => {
  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Leaderboard
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Player</TableCell>
            <TableCell align="right">Total Profit ($)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaderboard.map((entry, idx) => (
            <TableRow key={entry.playerId}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{entry.name}</TableCell>
              <TableCell
                align="right"
                sx={{
                  color:
                    entry.totalProfit > 0
                      ? 'success.main'
                      : entry.totalProfit < 0
                      ? 'error.main'
                      : 'text.primary',
                  fontWeight: 600,
                }}
              >
                {entry.totalProfit.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default Leaderboard;
