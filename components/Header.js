import React, { useState } from 'react';

import Router from 'next/router'; 
import Link from 'next/link'; 
import Button from './Button'; 

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
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
    color: 'white'
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

  const handleMenu = () => {
    alert('handling menu'); 
  }

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

  const HeaderLogo = () => {
    return (
      <Link href="/dashboard">
        <Typography variant="h6" className={classes.title}>
          cute.ly
        </Typography>
      </Link>
    );
  }

  const handleNavToGithub = () => {
    Router.push("https://www.github.com/Sanshit-sagar/cute.ly-app");
  }

  return (
    <div className={classes.root}>
      <AppBar color="inherit" position="sticky" style={{ borderRadius: '2.5px' }}>
        <Toolbar style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
         
          
          <Button
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              variant="standard"
              style={{ margin: '2px' }}
            >
              <AccountCircle />
          </Button> 

          <Button 
            variant="standard"
            onClick={toggleTheme}
            style={{ margin: '2px' }}
          > 
            { on ? <DarkMode /> : <LightMode /> }
          </Button>

          <Button 
            variant="standard" 
            onClick={handleNavToGithub}
            style={{ margin: '2px' }}
          > 
            <GitHubIcon /> 
          </Button>

          <Button 
            variant="standard"
            onClick={handleSignOut}
            style={{ margin: '2px' }}
          > 
            <PowerSettingsNewIcon 
              color="inherit" 
            />
          </Button>
        </Toolbar>
      </AppBar>
    </div>

  );
}

export default Header;
