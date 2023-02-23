import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#eab308',
    },
    secondary: {
      main: '#525252',
    },
    nav: {
      main: '#373F41',
    },
    black: {
      main: '#1e1e1e',
    },
    white: {
      main: '#FFFFFF',
      background: '#F5F5F7',
    },
  },
  spacing: [0, 4, 8, 16, 20, 24, 32, 64],
  typography: {
    fontFamily: ['Mulish', 'sans-serif'].join(','),
    h1: { fontSize: '2.00em', fontWeight: '600' },
    h2: { fontSize: '1.50em', fontWeight: '600' },
    h3: { fontSize: '1.50em', fontWeight: '700' },
    h4: { fontSize: '1.25em', fontWeight: 'bold' },
    h5: { fontSize: '1.00em', fontWeight: '700' },
    h6: { fontSize: '1.00em', fontWeight: '600' },
    button: {
      textTransform: 'none',
      fontWeight: '700',
    },
    link: {
      textTransform: 'none',
      fontWeight: '700',
    },
  },
});
