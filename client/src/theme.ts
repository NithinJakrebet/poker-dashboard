// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#9c27b0', // vibrant purple
    },
    secondary: {
      main: '#2196f3', // lively blue
    },
    success: {
      main: '#00b894', // keep green for positive money
    },
    error: {
      main: '#e17055', // keep red for negative money
    },
    info: {
      main: '#00bcd4', // cyan for info
    },
    warning: {
      main: '#ff9800', // orange for warnings
    },
    background: {
      default: '#020617', // page background
      paper: '#0f172a',   // card background
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#94a3b8',
    },
  },
  typography: {
    fontFamily: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: { fontWeight: 800, fontSize: '2.5rem' },
    h2: { fontWeight: 700, fontSize: '2rem' },
    h3: { fontWeight: 700, fontSize: '1.75rem' },
    h4: { fontWeight: 600, fontSize: '1.5rem' },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    body1: { fontSize: 16 },
    body2: { fontSize: 14 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.2)',
    '0px 4px 8px rgba(0, 0, 0, 0.3)',
    '0px 8px 16px rgba(0, 0, 0, 0.4)',
    '0px 16px 32px rgba(0, 0, 0, 0.5)',
    '0px 2px 4px rgba(0, 0, 0, 0.2)',
    '0px 4px 8px rgba(0, 0, 0, 0.3)',
    '0px 8px 16px rgba(0, 0, 0, 0.4)',
    '0px 16px 32px rgba(0, 0, 0, 0.5)',
    '0px 2px 4px rgba(0, 0, 0, 0.2)',
    '0px 4px 8px rgba(0, 0, 0, 0.3)',
    '0px 8px 16px rgba(0, 0, 0, 0.4)',
    '0px 16px 32px rgba(0, 0, 0, 0.5)',
    '0px 2px 4px rgba(0, 0, 0, 0.2)',
    '0px 4px 8px rgba(0, 0, 0, 0.3)',
    '0px 8px 16px rgba(0, 0, 0, 0.4)',
    '0px 16px 32px rgba(0, 0, 0, 0.5)',
    '0px 2px 4px rgba(0, 0, 0, 0.2)',
    '0px 4px 8px rgba(0, 0, 0, 0.3)',
    '0px 8px 16px rgba(0, 0, 0, 0.4)',
    '0px 16px 32px rgba(0, 0, 0, 0.5)',
    '0px 2px 4px rgba(0, 0, 0, 0.2)',
    '0px 4px 8px rgba(0, 0, 0, 0.3)',
    '0px 8px 16px rgba(0, 0, 0, 0.4)',
    '0px 16px 32px rgba(0, 0, 0, 0.5)',
  ],
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: '1px solid rgba(148, 163, 184, 0.4)',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomColor: 'rgba(15, 23, 42, 0.8)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          fontWeight: 600,
          textTransform: 'none',
        },
        contained: {
          boxShadow: '0px 2px 8px rgba(156, 39, 176, 0.3)',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(156, 39, 176, 0.4)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '& fieldset': {
              borderColor: 'rgba(148, 163, 184, 0.4)',
            },
            '&:hover fieldset': {
              borderColor: '#9c27b0',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#9c27b0',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0f172a',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#0f172a',
          borderRight: '1px solid rgba(148, 163, 184, 0.4)',
        },
      },
    },
  },
});

export default theme;
