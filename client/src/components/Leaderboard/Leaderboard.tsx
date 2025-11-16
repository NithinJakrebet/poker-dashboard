// src/components/Leaderboard/Leaderboard.tsx
import type { FC } from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import type { LeaderboardEntry } from "../../types";
import PlayerDetails from "./PlayerDetails";

interface LeaderboardProps {
  lb: LeaderboardEntry[];
}

const Leaderboard: FC<LeaderboardProps> = ({ lb }) => {
  return (
    <Paper
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h3" fontWeight={700}>
          Leaderboard
        </Typography>
        <Chip
          label={`${lb.length} players`}
          size="medium"
          color="primary"
          variant="outlined"
          sx={{ fontSize: "1rem", px: 2 }}
        />
      </Box>

      {/* Table */}
      <Table
        size="small"
        sx={{
          "& th": {
            fontSize: "1.1rem",
            fontWeight: 700,
          },
          "& td": {
            fontSize: "1rem",
            py: 1.5,
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell variant="body">Player</TableCell>
            <TableCell align="right">Profit</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {lb.map((row) => (
            <PlayerDetails key={row.playerId} data={row} />
          ))}

          {lb.length === 0 && (
            <TableRow>
              <TableCell colSpan={2} align="center">
                <Typography variant="h6" color="text.secondary">
                  No data yet.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default Leaderboard;
