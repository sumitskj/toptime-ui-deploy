import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
  colors: {
    tableHead: '#00adff',
  },
  typography: {
    fontFamily: ['Rubik', 'Roboto'].join(','),
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '67px',
          '@media (min-width: 600px)': {
            minHeight: '70px',
          },
        },
        dense: {
          minHeight: '67px',
        },
      },
    },
    MuiAppBar: {
      defaultProps: {},
      styleOverrides: {
        root: {
          minHeight: '67px',
          boxShadow: 'none',
          background: '#FFFFFF',
          color: '#000000',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        // disableRipple: true,
      },
      styleOverrides: {
        root: {
          boxShadow: 'none',
          outline: 'none',
          borderRadius: '0.4rem',
        },
        contained: {
          background: '#00adff',
          minWidth: '150px',
          textTransform: 'capitalize',
          fontWeight: 600,
          letterSpacing: '1px',
          '&:hover': {
            background: '#046fa3',
            boxShadow: 'none',
          },
          ':disabled': {
            background: '#888888',
            color: '#ffffff',
          },
        },
        text: {
          textTransform: 'capitalize',
        },
      },
    },
  },
});
