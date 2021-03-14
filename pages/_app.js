
import React, { useState } from 'react';

import { AuthProvider } from '../lib/auth';
import { GlobalContextProvider } from '../components/ContextProvider'; 
import { ThemeProvider } from "styled-components";
import { CountProvider } from '../components//CounterContext';

import { GlobalStyles } from "../components/Globalstyle";
import { lightTheme, darkTheme } from "../components/Themes"

import Toggle from '../components/Toggle'; 
import {useDarkMode} from '../components/useDarkMode'; 

const App = ({ Component, pageProps }) => {
  const [theme, themeToggler, mountedComponent] = useDarkMode();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  if(!mountedComponent) return <div/>
  return (
    <React.Fragment>
      <ThemeProvider theme={themeMode}>
        <GlobalStyles/>
          <GlobalContextProvider> 
            <CountProvider>
            <AuthProvider> 

              <div className="App">
                <div style={{ position: 'absolute', left: '5%', bottom: '10%' }}>
                  <Toggle theme={theme} toggleTheme={themeToggler}  />
                </div>   
                <Component {...pageProps} />  
              </div>

          </AuthProvider>
          </CountProvider>
        </GlobalContextProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App; 
