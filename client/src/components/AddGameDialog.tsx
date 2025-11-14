// src/components/AddGameDialog.tsx
import type { FC } from 'react';
import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Player, GamePlayerInput } from '../types';
import PlayerPickerDialog from './PlayerPickerDialog';

interface AddGameDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (payload: {
    playedOn: string;
    players: GamePlayerInput[];
    baseBuyIn: number;
  }) => void;
  players: Player[];
}

const AddGameDialog: FC<AddGameDialogProps> = ({
  open,
  onClose,
  onSave,
  players,
}) => {
  const [playedOn, setPlayedOn] = useState<string>(
    new Date().toISOString().slice(0, 16) // yyyy-MM-ddTHH:mm (for datetime-local)
  );
  const [baseBuyIn, setBaseBuyIn] = useState<number>(20);
  const [gamePlayers, setGamePlayers] = useState<GamePlayerInput[]>([]);
  const [pickerOpen, setPickerOpen] = useState(false);

  const handleAddPlayerFromExisting = (playerId: string) => {
    const p = players.find((pl) => pl.id === playerId);
    if (!p) return;
    setGamePlayers((prev) => [
      ...prev,
      { playerId: p.id, playerName: p.name, buyIn: baseBuyIn, cashOut: 0 },
    ]);
  };

  const handleCreateNewPlayer = (name: string) => {
    // For now, treat as client-side only; backend can create real ID on save
    const tempId = `temp-${Date.now()}-${Math.random()}`;
    setGamePlayers((prev) => [
      ...prev,
      { playerId: tempId, playerName: name, buyIn: baseBuyIn, cashOut: 0 },
    ]);
  };

  const handleRemovePlayer = (playerId: string) => {
    setGamePlayers((prev) => prev.filter((p) => p.playerId !== playerId));
  };

  const handleChangeBuyIn = (playerId: string, value: number) => {
    setGamePlayers((prev) =>
      prev.map((p) =>
        p.playerId === playerId ? { ...p, buyIn: value } : p
      )
    );
  };

  const handleChangeCashOut = (playerId: string, value: number) => {
    setGamePlayers((prev) =>
      prev.map((p) =>
        p.playerId === playerId ? { ...p, cashOut: value } : p
      )
    );
  };

  const handleSave = () => {
    if (!playedOn || gamePlayers.length === 0) return;
    onSave({
      playedOn,
      players: gamePlayers,
      baseBuyIn,
    });
    // optional clear
    setGamePlayers([]);
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>Add Game</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <TextField
              label="Date & time"
              type="datetime-local"
              size="small"
              value={playedOn}
              onChange={(e) => setPlayedOn(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Default buy-in per player"
              type="number"
              size="small"
              value={baseBuyIn}
              onChange={(e) => setBaseBuyIn(Number(e.target.value))}
            />

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <span>Players</span>
              <Button
                onClick={() => setPickerOpen(true)}
                variant="outlined"
                size="small"
              >
                Add player
              </Button>
            </Stack>

            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Player</TableCell>
                  <TableCell align="right">Buy-in</TableCell>
                  <TableCell align="right">Cash-out</TableCell>
                  <TableCell align="center">Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {gamePlayers.map((p) => (
                  <TableRow key={p.playerId}>
                    <TableCell>{p.playerName}</TableCell>
                    <TableCell align="right">
                      <TextField
                        type="number"
                        size="small"
                        value={p.buyIn}
                        onChange={(e) =>
                          handleChangeBuyIn(p.playerId, Number(e.target.value))
                        }
                        inputProps={{ style: { textAlign: 'right' } }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        type="number"
                        size="small"
                        value={p.cashOut}
                        onChange={(e) =>
                          handleChangeCashOut(p.playerId, Number(e.target.value))
                        }
                        inputProps={{ style: { textAlign: 'right' } }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={() => handleRemovePlayer(p.playerId)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {gamePlayers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No players added yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="text">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={!playedOn || gamePlayers.length === 0}
          >
            Save Game
          </Button>
        </DialogActions>
      </Dialog>

      <PlayerPickerDialog
        open={pickerOpen}
        players={players}
        onClose={() => setPickerOpen(false)}
        onSelectExisting={handleAddPlayerFromExisting}
        onCreateNew={handleCreateNewPlayer}
      />
    </>
  );
};

export default AddGameDialog;
