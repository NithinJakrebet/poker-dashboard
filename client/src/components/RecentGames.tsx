// src/components/RecentGames.tsx
import type { FC } from 'react';
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from '@mui/material';
import type { Game } from '../types';

interface RecentGamesProps {
  games: Game[];
}

const RecentGames: FC<RecentGamesProps> = ({ games }) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Recent Games
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Total Buy-in</TableCell>
            <TableCell align="right">Total Cash-out</TableCell>
            <TableCell align="right">Imbalance</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {games.map((game) => {
            const date = new Date(game.playedOn).toLocaleDateString();
            const imbalance = Number(game.imbalance);
            return (
              <TableRow key={game.id}>
                <TableCell>{date}</TableCell>
                <TableCell align="right">
                  {Number(game.totalBuyIn).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  {Number(game.totalCashOut).toFixed(2)}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color:
                      imbalance > 0
                        ? 'warning.main'
                        : imbalance < 0
                        ? 'error.main'
                        : 'text.secondary',
                  }}
                >
                  {imbalance.toFixed(2)}
                </TableCell>
                <TableCell sx={{ textTransform: 'capitalize' }}>
                  {game.status.toLowerCase()}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default RecentGames;
