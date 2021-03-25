import { createMuiTheme } from '@material-ui/core/styles';

export const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#f9aaaa',
    },
    secondary: {
      main: '#1eb980',
    },
    background: {
      paper: '#363537',
      default: '#fff',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#1eb980',
    },
    secondary: {
      main: '#f9aaaa',
    },
    background: {
      paper: '#fff',
      default: '#363537',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});