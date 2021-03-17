import React from 'react';

import { AuthProvider } from '../lib/auth';
import { CountProvider } from '../components/SharedContext';
import { GlobalStyles } from "../components/Globalstyle";
import { ThemeProvider } from "styled-components";
import { useCount } from '../components/SharedContext'; 
import { lightTheme, darkTheme } from '../components/Themes'; 
import Button from '@material-ui/core/Button'; 

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

          {/* <Button className="darkModeBtn" variant="outlined" onClick={handleToggle}>Toggle Theme is {currentTheme} </Button>  */}
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


