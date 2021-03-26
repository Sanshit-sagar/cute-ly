import React, { Fragment, useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'; 
import Container from '@material-ui/core/Container'; 
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import Backdrop from '@material-ui/core/Backdrop';
import { 
    Dashboard, 
    Analytics 
} from '../icons/icons';

import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import SharedSnackbar from './Snackbar'; 

import Header from './Header';

const useStyles = makeStyles((theme) => ({
    root: {
        transform: 'translateZ(0px)',
        flexGrow: 1,
        height: '100%',
        width: '100%',
        padding: theme.spacing(1),
    },
    mainContainerPaper: {
        backgroundColor: theme.palette.primary.light,
        paddingTop: theme.spacing(2),
        margin: '0.50%',
        height: '80vh',
        width: '99%',
    },
    header: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        borderRadius: '10px',
    },
    speedDial: {
        marginTop: '20px',
        borderRadius: '10px',
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

const SpeedDials = ({ open, handleOpen, handleClose }) => {
    const classes = useStyles();
    const router = useRouter();
  
    return (
        <div className={classes.root}>
            <SpeedDial
                ariaLabel="speedial-menu"
                className={classes.speedDial}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                icon={
                    <SpeedDialIcon /> 
                }
                direction="left" 
            >   {
                    actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            tooltipPlacement="right"
                            onClick={(e) => router.push(action.route)} 
                            style={{ color: 'white'}}
                        />
                    ))
                }
            </SpeedDial>
        </div>
    );
}

const PageContainer = ({ children }) => {
    const classes =  useStyles();
    const [speedDialOpen, setSpeedDialOpen] = useState(false); 

    const handleSpeedDialOpen = () => {
        setSpeedDialOpen(true); 
    }
    const handleSpeedDialClose = () => {
        setSpeedDialOpen(false); 
    }

    return (
        <div className={classes.root}> 
            <Grid container direction="column" justify="center" alignItems='stretch'>
                <Grid item>
                    <Header className={classes.header} /> 
                </Grid>
        
                <Paper className={classes.mainContainerPaper}>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <Grid item>
                            <Backdrop open={speedDialOpen} />
                            
                            { children }
                            
                            <SpeedDials 
                                open={speedDialOpen}
                                handleOpen={handleSpeedDialOpen}
                                handleClose={handleSpeedDialClose}
                                className={classes.speedDial}
                            /> 
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

            <SharedSnackbar /> 
        </div> 
    );
};

export default PageContainer;