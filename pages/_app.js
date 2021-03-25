import React from 'react';

import { AuthProvider } from '../lib/auth';
import { CountProvider, useCount } from '../components/SharedContext';
import { ThemeProvider } from '@material-ui/core/styles';
import { lightTheme, darkTheme } from '../components/Themes'; 
// import GlobalStyles from '../Components/Globalstyle'; 

import CssBaseline from '@material-ui/core/CssBaseline';

import Fade from '@material-ui/core/Fade';

const AppBase = ({ AppComp, AppPageProps }) => {
  const [state, dispatch] = useCount();
  
  const handleToggle = (event) => {
    dispatch({
        type: "DARKMODE"
    });
  } 

  const currentTheme = state.dark ? 'Dark' : 'Normal'; 

  return (
      <React.Fragment>
        {/* <GlobalStyles /> */}
          <ThemeProvider theme={currentTheme === 'Dark' ? darkTheme : lightTheme}>
            <CssBaseline /> 
              <Fade in={state.dark} timeout={5000}>
                <AppComp {...AppPageProps} toggleTheme={handleToggle} />  
              </Fade>
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


