import React from 'react';

import { AuthProvider } from '../lib/auth';
import { CountProvider, useCount } from '../components/SharedContext';

import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../components/Globalstyle";
import { lightTheme, darkTheme } from '../components/Themes'; 

const AppBase = ({ Comp, pageP }) => {
  const [state, dispatch] = useCount();
  
  const handleToggle = (event) => {
    dispatch({
        type: "DARKMODE"
    });
  } 

  const currentTheme = state.dark ? 'Dark' : 'Normal'; 

  return (
      <React.Fragment>
       <ThemeProvider theme={currentTheme === 'Dark' ? darkTheme : lightTheme}>
        <GlobalStyles/>
          <Comp {...pageP} toggleTheme={handleToggle} />  
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
            Comp={Component} 
            pageP={pageProps} 
          /> 
        
        </AuthProvider> 
      </CountProvider>
    </React.Fragment>
  ); 
}


