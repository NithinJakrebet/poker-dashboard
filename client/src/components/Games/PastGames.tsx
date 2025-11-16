import type { FC } from "react";
import { useState } from "react";
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
  Collapse,
} from "@mui/material";
import type { Game, GamePlayer } from "../../types";

interface PastGamesProps {
  games: Game[];
}

const formatDateUTC = (iso: string) =>
  new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));

/* ---------- Subcomponents ---------- */

interface GameRowProps {
  game: Game;
}

const GameRow: FC<GameRowProps> = ({ game }) => {
  const [open, setOpen] = useState(false);
  const players: GamePlayer[] = (game as any).players ?? []; // or game.players if you added it to the type

  const date = formatDateUTC(game.playedOn);
  const imbalanceNum = Number(Number(game.imbalance).toFixed(2));

  const handleToggle = () => setOpen((prev) => !prev);

  return (
    <>
      {/* Main clickable row */}
      <TableRow
        hover
        onClick={handleToggle}
        sx={{ cursor: "pointer" }}
      >
        <TableCell>{date}</TableCell>
        <TableCell align="right">
          {`$ ${Number(game.totalBuyIn).toFixed(2)}`}
        </TableCell>
        <TableCell align="right">
          {`$ ${Number(game.totalCashOut).toFixed(2)}`}
        </TableCell>
        <TableCell
          align="right"
          sx={{
            fontWeight: 500,
            color:
              imbalanceNum > 0
                ? "warning.main"
                : imbalanceNum < 0
                ? "error.main"
                : "text.secondary",
          }}
        >
          {imbalanceNum.toFixed(2)}
        </TableCell>
        <TableCell
          align="right"
          sx={{ textTransform: "capitalize" }}
        >
          {game.status.toLowerCase()}
        </TableCell>
      </TableRow>

      {/* Dropdown row with players */}
      {open && (
        <TableRow
          sx={{
            "& > *": { borderBottom: "none" },
          }}
        >
          <TableCell colSpan={5} sx={{ p: 0 }}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ pt: 1.25, pb: 1.5, pl: 8, pr: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Players
                </Typography>

                {players.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    No player data recorded for this game.
                  </Typography>
                ) : (
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
                      {players.map((gp) => {
                        const result = Number(gp.adjustedResult);
                        return (
                          <TableRow key={gp.id}>
                            <TableCell>{gp.player.name}</TableCell>
                            <TableCell align="right">
                              {`$ ${Number(gp.buyIn).toFixed(2)}`}
                            </TableCell>
                            <TableCell align="right">
                              {`$ ${Number(gp.cashOut).toFixed(2)}`}
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{
                                color:
                                  result > 0
                                    ? "success.main"
                                    : result < 0
                                    ? "error.main"
                                    : "text.secondary",
                              }}
                            >
                              {`$ ${result.toFixed(2)}`}
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
      )}
    </>
  );
};

/* ---------- Wrapper component ---------- */

const PastGames: FC<PastGamesProps> = ({ games }) => {
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
          Past Games
        </Typography>
        <Chip
          label={`${games.length} games`}
          size="medium"
          color="primary"
          variant="outlined"
          sx={{ fontSize: "1rem", px: 2 }}
        />
      </Box>

      {/* Table */}
      <Table
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
        size="small"
      >
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Total Buy-in</TableCell>
            <TableCell align="right">Total Cash-out</TableCell>
            <TableCell align="right">Imbalance</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {games.map((game) => (
            <GameRow key={game.id} game={game} />
          ))}

          {games.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography variant="h6" color="text.secondary">
                  No games recorded yet.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default PastGames;
