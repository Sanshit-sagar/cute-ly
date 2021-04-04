import React, { Fragment } from 'react';
import clsx from 'clsx';

import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MenuIcon from '@material-ui/icons/Menu';
import GitHubIcon from '@material-ui/icons/GitHub';
import SettingsPowerIcon from '@material-ui/icons/SettingsPower'; 

import { makeStyles } from '@material-ui/core/styles';

import { LightMode, DarkMode } from '../icons/icons'; 

import { useCount } from './SharedContext';
import { useAuth } from '../lib/auth'; 

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: theme.palette.background.header,
    border: 'thin solid',
    borderRadius: '5px',
    borderColor: theme.palette.primary.main,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    icon: {
      color: theme.palette.background.header,
    },
}));

const MenuAppBarBase = ({ drawerOpen, handleDrawer }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [state, dispatch] = useCount(); 
  const { user, loading, signout } = useAuth(); 

  const toggleTheme = () => {
    dispatch({
        type: "DARKMODE"
    });
  }

  const handleNavToGithub = () => {
    Router.push("https://www.github.com/Sanshit-sagar/cute.ly-app");
  }

  const handleSignOut = () => {
    signout(); 
  }


  return (
    <div className={classes.root}>
    
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
      })}
    >
        <Toolbar>
          <Button
              color="primary"
              size="small"
              margin="dense"
              variant="outlined"
              aria-label="open drawer"
              onClick={handleDrawer}
              edge="start"
              className={clsx(classes.menuButton, {
                  [classes.hide]: drawerOpen,
              })}
          >
              <MenuIcon />
          </Button>
        
            <Grid container direction="row" justify="flex-end" alignItems="stretch" spacing={1}>
              <Fragment>
                { user && !loading 
                  ?
                  <Fragment>
                      <Grid item>
                        <Button 
                          variant="contained"
                          color="primary"
                          onClick={handleNavToGithub}
                        > 
                          <GitHubIcon className={classes.icon}/> 
                        </Button>
                      </Grid>

                      <Grid item>
                        <Button
                          aria-label="account of current user"
                          aria-controls="menu-appbar"
                          aria-haspopup="true"
                          color="primary"
                          variant="contained"
                        >
                          <AccountBoxIcon className={classes.icon}/>
                        </Button>
                      </Grid>
                    

                      <Grid item>
                        <Button 
                          variant="contained"
                          color="primary"
                          onClick={(e) => handleSignOut(e)}
                        > 
                          <SettingsPowerIcon className={classes.icon}/> 
                        </Button>
                      </Grid>
                      
                    </Fragment>
                  :
                    <p> Loading Profile </p>
                }
                </Fragment> 

              <Grid item>
                <Button 
                  variant="contained"
                  onClick={toggleTheme}
                  color="primary"
                > 
                  { 
                    state.dark  
                  ? 
                    <DarkMode /> 
                  : 
                    <LightMode /> 
                  }
                </Button>
              </Grid>
            </Grid>

        </Toolbar>
      </AppBar>
    </div>
  );
}

const MenuAppBar = ({ open, handleDrawer }) => {
  return (
    <Fragment>
      <MenuAppBarBase 
        drawerOpen={open}
        handleDrawer={handleDrawer}
      />
    </Fragment>
  );
}

export default MenuAppBar; 