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
      header: '#000',
    },
    icons: {
      android: 'lime',
      apple: 'silver',
      utm: 'maroon',
      meta: 'blue',
      facebook: '#4861ac',
      twitter: '#009dff',
      linkedin: '#005cc5',
      whatsapp: '#00d85a',
      trash: 'red',
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
      header: '#fff',
    },
    icons: {
      android: 'lime',
      apple: 'silver',
      utm: 'maroon',
      meta: 'blue',
      facebook: '#4861ac',
      twitter: '#009dff',
      linkedin: '#005cc5',
      whatsapp: '#00d85a',
      trash: 'red',
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