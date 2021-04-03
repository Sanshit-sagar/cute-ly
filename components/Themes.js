import { createMuiTheme } from '@material-ui/core/styles';

export const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#1eb980',
      textPrimary: 'yellow',
    },
    secondary: {
      main: '#f9aaaa',
    },
    background: {
      paper: '#fff',
      default: '#fff',
      tooltip: '#000',
      header: '#f9aaaa',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    h4: {
      color: '#000',
    },
    overline: {
      fontSize: 12,
      color: '#000',
    },
    caption: {
      color: '#000',
    }
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#1eb980',
      textPrimary: 'blue',
    },
    secondary: {
      main: '#f9aaaa',
    },
    background: {
      paper: '#000',
      default: '#000',
      tooltip: '#fff',
      header: '#000',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    h4: {
      color: '#fff',
    },
    overline: {
      fontSize: 12,
      color: '#fff',
    },
    caption: {
      color: '#fff',
    }
  },
});