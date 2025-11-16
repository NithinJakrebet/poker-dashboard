// src/components/Leaderboard/PlayerDetails.tsx
import type { FC } from "react";
import { useState } from "react";
import {
  TableRow,
  TableCell,
  Collapse,
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
} from "@mui/material";
import type { LeaderboardEntry, GamePlayer } from "../../types";

interface PlayerDetailsProps {
  data: LeaderboardEntry;
}


interface PlayerMainRowProps {
  data: LeaderboardEntry;
  onToggle: () => void;
}

const PlayerMainRow: FC<PlayerMainRowProps> = ({ data, onToggle }) => {
  return (
    <TableRow
      hover
      onClick={onToggle}
      sx={{
        cursor: "pointer",
      }}
    >
      <TableCell>
        <Typography fontWeight="300" variant="h6" component="span">
          {data.name}
        </Typography>
      </TableCell>

      <TableCell
        align="right"
        sx={{
          fontWeight: 600,
          fontSize: "1rem",
          color:
            data.totalProfit > 0
              ? "success.main"
              : data.totalProfit < 0
              ? "error.main"
              : "text.secondary",
        }}
      >
        {`$ ${data.totalProfit.toFixed(2)}`}
      </TableCell>
    </TableRow>
  );
};

/* ---------- Sessions row (dropdown) ---------- */

interface PlayerSessionsRowProps {
  open: boolean;
  games: GamePlayer[];
}

const PlayerSessionsRow: FC<PlayerSessionsRowProps> = ({ open, games }) => {
  // 🚫 If not open, render nothing at all (no extra line / row)
  if (!open) return null;

  return (
    <TableRow
      sx={{
        "& > *": { borderBottom: "none" },
      }}
    >
      <TableCell colSpan={2} sx={{ p: 0 }}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ pt: 1.25, pb: 1.5, pl: 8, pr: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Sessions
            </Typography>

            {games.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No games recorded for this player.
              </Typography>
            ) : (
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Adjusted Result</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {games.map((gp) => {
                    const date = new Date(
                      gp.game.playedOn
                    ).toLocaleDateString();

                    return (
                      <TableRow key={gp.id}>
                        <TableCell>{date}</TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            color:
                              gp.adjustedResult > 0
                                ? "success.main"
                                : gp.adjustedResult < 0
                                ? "error.main"
                                : "text.secondary",
                          }}
                        >
                          {`$ ${gp.adjustedResult.toFixed(2)}`}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

/* ---------- Wrapper ---------- */

const PlayerDetails: FC<PlayerDetailsProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const games = data.games ?? [];

  const handleToggle = () => setOpen((prev) => !prev);

  return (
    <>
      <PlayerMainRow data={data} onToggle={handleToggle} />
      <PlayerSessionsRow open={open} games={games} />
    </>
  );
};

export default PlayerDetails;
