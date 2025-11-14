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
  Box,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import type { Game } from '../types';

interface RecentGamesProps {
  games: Game[];
  onGameClick?: (game: Game) => void;
  onAddGame?: () => void;
}

const RecentGames: FC<RecentGamesProps> = ({ games, onGameClick, onAddGame }) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1.5,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Recent Games
        </Typography>
        <IconButton
          size="small"
          color="primary"
          onClick={onAddGame}
          aria-label="Add game"
        >
          <AddIcon />
        </IconButton>
      </Box>

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
              <TableRow
                key={game.id}
                hover
                sx={{ cursor: onGameClick ? 'pointer' : 'default' }}
                onClick={() => onGameClick?.(game)}
              >
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
