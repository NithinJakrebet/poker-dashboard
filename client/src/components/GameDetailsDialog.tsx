// src/components/GameDetailsDialog.tsx
import type { FC } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Stack,
} from '@mui/material';
import type { Game } from '../types';

interface GameDetailsDialogProps {
  open: boolean;
  game: Game | null;
  onClose: () => void;
}

const GameDetailsDialog: FC<GameDetailsDialogProps> = ({ open, game, onClose }) => {
  if (!game) return null;

  const date = new Date(game.playedOn).toLocaleString();

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Game Details</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={1.5} sx={{ mb: 2 }}>
          <Typography variant="subtitle2">Played On</Typography>
          <Typography variant="body2">{date}</Typography>

          <Typography variant="subtitle2">Totals</Typography>
          <Typography variant="body2">
            Buy-in: ${Number(game.totalBuyIn).toFixed(2)} &nbsp;|&nbsp; Cash-out:{' '}
            ${Number(game.totalCashOut).toFixed(2)} &nbsp;|&nbsp; Imbalance:{' '}
            {Number(game.imbalance).toFixed(2)}
          </Typography>
        </Stack>

        <Typography variant="subtitle1" gutterBottom>
          Players
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Player</TableCell>
              <TableCell align="right">Buy-in</TableCell>
              <TableCell align="right">Cash-out</TableCell>
              <TableCell align="right">Result</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(game.players ?? []).map((p) => (
              <TableRow key={p.playerId}>
                <TableCell>{p.playerName}</TableCell>
                <TableCell align="right">{p.buyIn.toFixed(2)}</TableCell>
                <TableCell align="right">{p.cashOut.toFixed(2)}</TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color:
                      p.result > 0
                        ? 'success.main'
                        : p.result < 0
                        ? 'error.main'
                        : 'text.secondary',
                  }}
                >
                  {p.result.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GameDetailsDialog;
