import React from 'react';

import { AuthProvider } from '../lib/auth';
import { RealtimeProvider } from '../utils/useFirebaseRealtime'; 
import { ThemeProvider } from '@material-ui/core/styles';
import { CountProvider, useCount } from '../components/SharedContext';
import { lightTheme, darkTheme } from '../components/Themes'; 

import { SnackbarProvider } from 'notistack';

import CssBaseline from '@material-ui/core/CssBaseline';

const AppBase = ({ AppComp, AppPageProps }) => {
  const [state, dispatch] = useCount();
  
  const handleToggle = () => {
    dispatch({
        type: "DARKMODE"
    });
  } 

  return (
      <React.Fragment>
          <ThemeProvider theme={state.dark ? darkTheme : lightTheme}>
            <CssBaseline /> 
             
              <AppComp 
                {...AppPageProps}
                toggleTheme={handleToggle}
              />  
             
          </ThemeProvider>
      </React.Fragment>
  );
}

export default function App({ Component, pageProps }) {
  
  return (
    <React.Fragment> 
      <CountProvider>
        <AuthProvider> 
          <RealtimeProvider>
            <SnackbarProvider maxSnack={3}>

            <AppBase 
              AppComp={Component} 
              AppPageProps={pageProps} 
            /> 

            </SnackbarProvider>
          </RealtimeProvider>
        </AuthProvider> 
      </CountProvider>
    </React.Fragment>
  ); 
}


