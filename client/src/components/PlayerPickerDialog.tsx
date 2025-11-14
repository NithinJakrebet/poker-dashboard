// src/components/PlayerPickerDialog.tsx
import type { FC } from 'react';
import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import type { Player } from '../types';

interface PlayerPickerDialogProps {
  open: boolean;
  players: Player[];
  onClose: () => void;
  onSelectExisting: (playerId: string) => void;
  onCreateNew: (name: string) => void;
}

const PlayerPickerDialog: FC<PlayerPickerDialogProps> = ({
  open,
  players,
  onClose,
  onSelectExisting,
  onCreateNew,
}) => {
  const [selectedId, setSelectedId] = useState('');
  const [newName, setNewName] = useState('');

  const handleUseExisting = () => {
    if (!selectedId) return;
    onSelectExisting(selectedId);
    onClose();
    setSelectedId('');
  };

  const handleCreateNew = () => {
    if (!newName.trim()) return;
    onCreateNew(newName.trim());
    onClose();
    setNewName('');
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Select or Create Player</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <Stack spacing={1}>
            <Typography variant="subtitle2">Existing player</Typography>
            <TextField
              select
              size="small"
              label="Select player"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              {players.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.name}
                </MenuItem>
              ))}
            </TextField>
            <Button
              onClick={handleUseExisting}
              variant="contained"
              disabled={!selectedId}
            >
              Use Selected
            </Button>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="subtitle2">New player</Typography>
            <TextField
              size="small"
              label="Player name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <Button
              onClick={handleCreateNew}
              variant="outlined"
              disabled={!newName.trim()}
            >
              Create & Use
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="text">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlayerPickerDialog;
