import { Box, TextField, createTheme } from '@mui/material';
import { Button, Chip, Divider, styled } from '@mui/material';

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1280,
      xl: 1536,
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#eab308',
    },
    secondary: {
      main: '#525252',
      textField: '#d9d9d9',
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
      tableHeader: '#F3F6F9',
    },
    fluctuate: {
      increase: '#4BCE58',
      decrease: '#C41E3A',
    },
  },
  // spacing: (value) => value * 2,

  typography: {
    fontFamily: ['Mulish', 'sans-serif'].join(','),
    h1: { fontSize: '1.50em', fontWeight: '800', color: '#1e1e1e' },
    h2: { fontSize: '1.50em', fontWeight: '600', color: '#1e1e1e' },
    h3: { fontSize: '1.50em', fontWeight: '700', color: '#1e1e1e' },
    h4: { fontSize: '1.25em', fontWeight: 'bold', color: '#1e1e1e' },
    h5: { fontSize: '1.00em', fontWeight: '700', color: '#525252' },
    h6: { fontSize: '0.87em', fontWeight: '600', color: '#525252' },
    p: { fontFamily: ['Mulish', 'sans-serif'].join(','), fontSize: '0.9em' },
    button: {
      textTransform: 'none',
      fontWeight: '700',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {},
      },
    },
  },
});

export const CardBox = styled(Box)({
  backgroundColor: '#FFFFFF',
  display: 'flex',
  flexDirection: 'column',
  padding: '30px 40px',
  boxShadow:
    '-1.23856px -1.23856px 16.1013px #FAFBFF, 2.47712px 2.47712px 18.5784px rgba(166, 171, 189, 0.5)',
  borderRadius: '20px',
  gap: '32px',
});

export const YellowDiv = styled(Divider)({
  width: '50px',
  fontWeight: 'bold',
  margin: '24px 0px 24px 0px',
  borderBottomWidth: '7px',
  boxShadow:
    ' -1.23856px -1.23856px 16.1013px #FAFBFF, 2.47712px 2.47712px 18.5784px rgba(166, 171, 189, 0.5)',
  borderRadius: '10px',
  borderColor: theme.palette.primary.main,
});

export const SubmitButton = styled(Button)({
  fontSize: '1.00em',
  color: theme.palette.white.main,
});

export const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '2px solid #D9D9D9',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.secondary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.secondary.main,
    },
  },
});

export const SmallTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    padding: '4px 12px',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '2px solid #D9D9D9',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.secondary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.secondary.main,
    },
  },
});

export const StatusChip = ({ label }) => {
  const chipStyle = (label) => {
    if (label === 'CREATED') {
      return {
        style: {
          fontWeight: '800',
          backgroundColor: '#E0F2FE',
          color: '#0EA5E9',
        },
      };
    } else if (label === 'LAPTOP RECEIVED') {
      return {
        style: {
          fontWeight: '800',
          backgroundColor: '#DCFCE7',
          color: '#16A34A',
        },
      };
    } else if (label === 'IN PROGRESS') {
      return {
        style: {
          fontWeight: '800',
          backgroundColor: '#FEF9C3',
          color: '#CA8A04',
        },
      };
    } else if (label === 'READY FOR PICKUP') {
      return {
        style: {
          fontWeight: '800',
          backgroundColor: '#DCFCE7',
          color: '#16A34A',
        },
      };
    } else if (label === 'COMPLETED') {
      return {
        style: {
          fontWeight: '800',
          backgroundColor: '#DCFCE7',
          color: '#16A34A',
        },
      };
    } else if (label === 'CANCELLED') {
      return {
        style: {
          fontWeight: '800',
          backgroundColor: '#FEE2E2',
          color: '#DC2626',
        },
      };
    }
  };

  return (
    <>
      <Chip label={label} {...chipStyle(label)} />
    </>
  );
};
