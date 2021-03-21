import React from 'react';

import Box from '@material-ui/core/Box'; 
import Backdrop from '@material-ui/core/Backdrop'; 
import Container from '@material-ui/core/Container'; 

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { useCount } from './SharedContext';
import Header from './Header';

import { 
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
      position: 'absolute',
      right: '100px', 
      bottom: '75px',
      height: 380,
    },
    speedDial: {
      position: 'absolute',
      '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
        bottom: theme.spacing(0),
        right: theme.spacing(0),
      },
    },
}));

  
const actions = [
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
                                tooltipPlacement="right"
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

                        <SpeedDials />
                    </div>  

                    
                </div> 
               
            </Container> 
        </div> 
    );
};

export default PageContainer;
