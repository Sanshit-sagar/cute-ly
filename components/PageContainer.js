import React, { useState, setState } from 'react';

import Header from './Header';
import Box from '@material-ui/core/Box'; 
import Backdrop from '@material-ui/core/Backdrop'; 
import Container from '@material-ui/core/Container'; 

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles'; 
import { useRouter } from 'next/router';
import { useCount } from './SharedContext';

import { 
    Home, 
    Dashboard, 
    Analytics 
} from '../icons/icons'; 

const useStyles = makeStyles((theme) => ({
    root: {
      transform: 'translateZ(0px)',
      flexGrow: 1,
    },
    header: {
        height: '25%',
    },
    footer: {
        height: '50%', 
    },
    exampleWrapper: {
      position: 'relative',
      marginTop: theme.spacing(3),
      height: 380,
    },
    speedDial: {
      position: 'absolute',
      '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      },
    },
}));

const DarkModeSwitch = withStyles((theme) => ({
    root: {
      width: 28,
      height: 16,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      '&$checked': {
        transform: 'translateX(12px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: 'none',
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }))(Switch);

  
const actions = [
    {   icon: <Home />, 
        name: 'Home', 
        route: '/account' 
    },
    { 
        icon:  <Analytics />, 
        name: 'Analytics', 
        route: '/analytics' 
    },
    { 
        icon: <Dashboard />, 
        name: 'Dashboard', 
        route: '/dashboard'
    },
]; 
  
function SpeedDials() {
    const classes = useStyles();
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    return (
        <div className={classes.exampleWrapper}>
            <Backdrop open={open} />
               
                <SpeedDial
                    ariaLabel="speedial-menu"
                    className={classes.speedDial}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={open}
                    icon={
                        <SpeedDialIcon /> 
                    }
                    direction="up" 
                >   {
                        actions.map((action) => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                onClick={(e) => router.push(action.route)} 
                            />
                        ))
                    }
                </SpeedDial>
            
        </div>
    );
}


const PageContainer = ({ children }) => {
    const classes =  useStyles();
    const [state, dispatch] = useCount(); 

    return (
        <div className={classes.root}> 
            <Container 
                maxWidth="lg" 
            >
                <div style={{ 
                    width: '100%',
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'stretch'
                }}>
                    <Header style={{ 
                        backgroundColor: 'blue', 
                        display: 'flex', 
                        flexDirection: 'row', 
                        justifyContent: 'space-between'
                    }} /> 



                    <div style={{ 
                        marginTop: '50px',
                        display: 'flex', 
                        flexDirection: 'row' 
                    }}>
                        <Box 
                            height="77.5vh" 
                            style = {{ 
                                width: '100%' 
                            }}
                        >
                            {children}
                        </Box>

                        <SpeedDials  />
                    </div>  
                </div> 
            </Container> 
        </div> 
    );
};

export default PageContainer;
