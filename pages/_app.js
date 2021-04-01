import React from 'react';

import { AuthProvider } from '../lib/auth';
import { ThemeProvider } from '@material-ui/core/styles';
import { CountProvider, useCount } from '../components/SharedContext';
import { lightTheme, darkTheme } from '../components/Themes'; 

import CssBaseline from '@material-ui/core/CssBaseline';

const AppBase = ({ AppComp, AppPageProps }) => {
  const [state, dispatch] = useCount();
  
  const handleToggle = () => {
    dispatch({
        type: "DARKMODE"
    });
  } 

  const currentTheme = state.dark ? 'Dark' : 'Normal'; 

  return (
      <React.Fragment>
          <ThemeProvider theme={currentTheme === 'Dark' ? darkTheme : lightTheme}>
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

            <AppBase 
              AppComp={Component} 
              AppPageProps={pageProps} 
            /> 
            
        </AuthProvider> 
      </CountProvider>
    </React.Fragment>
  ); 
}


