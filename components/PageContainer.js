import React from 'react';

import Box from '@material-ui/core/Box'; 
import Paper from '@material-ui/core/Paper'; 
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop'; 
import Container from '@material-ui/core/Container'; 

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import Card from '@material-ui/core/Card';

import { shadows } from '@material-ui/system';

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
        height: '35%',
    },
    speedDial: {
      position: 'absolute',
      '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
        bottom: theme.spacing(0),
        right: theme.spacing(0),
      },
    },
    pageTitle: {
        margin: '0px'
    }
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
        <div className={classes.root}>
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
                maxWidth="100%"
                maxHeight="100%"

            >
                <div style={{ 
                    width: '100%',
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-evenly'
                }}>
                    <Header style={{ 
                        display: 'flex', 
                        flexDirection: 'row', 
                        justifyContent: 'space-between',
                        borderRadius: '10px'
                    }} /> 

                    {/* <div style={{ 
                        display: 'flex', 
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                    }}> */}

                        <Box boxShadow={20}
                            bgcolor="#4842b8"
                            height='70vh'
                            width='100%'
                            marginTop='2.5%'
                            borderRadius={10}
                        >
                            {children}
                             
                        </Box>        

                        {/* <SpeedDials />   */}
                    {/* </div>   */}
                </div> 
            </Container> 
        </div> 
    );
};

export default PageContainer;
