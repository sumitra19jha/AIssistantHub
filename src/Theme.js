// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1E88E5',
    },
    secondary: {
      main: '#FFC107',
    },
    background: {
      default: '#FFFFFF',
    },
    text: {
      primary: '#333333',
    },
  },
  typography: {
    fontFamily: 'Open Sans, Roboto, Arial, sans-serif',
    h1: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
    h2: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
    h3: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
    h4: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
    h5: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
    h6: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        enableColorOnDark: true,
      },
    },
  },
});

export default theme;
