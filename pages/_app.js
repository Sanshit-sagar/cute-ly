import React from 'react';

import { AuthProvider } from '../lib/auth';
import { CountProvider, useCount } from '../components/SharedContext';

import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../components/Globalstyle";
import { lightTheme, darkTheme } from '../components/Themes'; 

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
       <ThemeProvider theme={currentTheme === 'Dark' ? darkTheme : lightTheme}>
        <GlobalStyles/>
          <AppComp {...AppPageProps} toggleTheme={handleToggle} />  
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


