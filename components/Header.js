import React, { useState } from 'react';

import Router from 'next/router'; 

import Button from '@material-ui/core/Button'; 
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import AccountCircle from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import GitHubIcon from '@material-ui/icons/GitHub';

import { useAuth } from '../lib/auth'; 
import { useCount } from './SharedContext';  
import { makeStyles } from '@material-ui/core/styles';

import {LightMode, DarkMode} from '../icons/icons'; 

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    borderRadius: '5px'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = ({ props }) => {

  const classes = useStyles(); 
  const auth = useAuth(); 

  const [state, dispatch] = useCount(); 
  const [on, setOn] = useState(false); 


  const handleSignOut = () => {
    auth.signout().then(() => {
        Router.push('/'); 
    })
  }

  const getTheme = () => {
      if(on) {
          return "Light Mode";
      }
      return "Dark Mode"; 
  }

  const toggleTheme = () => {
      setOn(!on);
      dispatch({
          type: "DARKMODE"
      });
      dispatch({
          type: "SNACKBAR_TRIGGER",
          payload: {
              message: "Theme Changed to " + getTheme() + "!",
              key: new Date().getTime().toString()
          }
      });
  }

  const getHeaderColor = () => {
    return on ? '#fff' : '#363537'; 
  }
  const getIconColor = () => {
    return on ? '#363537' : '#fff'; 
  }

  const handleNavToGithub = () => {
    Router.push("https://www.github.com/Sanshit-sagar/cute.ly-app");
  }

  return (
    <div className={classes.root}>
      <AppBar 
        position="sticky"
        style={{ 
          borderRadius: '2.5px', 
          backgroundColor: getHeaderColor(), 
          borderRadius: '5px'
        }}
      >
        <Toolbar style={{ 
          display: 'flex', 
          flexDirection: 'row', 
          justifyContent: 'flex-end'}}
        >
          
            <Button 
              variant="outlined"
              color="primary"
              onClick={handleNavToGithub}
              style={{ margin: '5px', borderRadius: '5px' }}
            > 
              <GitHubIcon style={{ color: getIconColor() }}/> 
            </Button>


            <Button 
              variant="outlined"
              onClick={toggleTheme}
              color="primary"
              style={{ margin: '5px', borderRadius: '5px' }}
            > 
              { 
              on  
              ? <DarkMode  style={{ color: getIconColor() }} /> 
              : <LightMode  style={{ color: getIconColor() }} /> 
              }
            </Button>

            <Button
              variant="outlined"
              color="primary"
              onClick={handleNavToGithub}
              style={{ margin: '5px', borderRadius: '5px' }}
            > 
              <AccountCircle  style={{ color: getIconColor() }} />
            </Button>

            <Button 
              variant="outlined"
              color="primary"
              onClick={handleSignOut}
              style={{ margin: '5px', borderRadius: '5px' }}
            > 
              <PowerSettingsNewIcon style={{ color: getIconColor() }} />
            </Button>
         
        </Toolbar>
      </AppBar>
    </div>

  );
}

export default Header;
