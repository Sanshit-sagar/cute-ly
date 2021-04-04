import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';

import { makeStyles } from '@material-ui/core/styles';

import MenuAppBar from './MenuAppBar'; 
import CustomMiniDrawer from './CustomMiniDrawer'; 
import SharedSnackbar from './Snackbar'; 

const useStyles = makeStyles((theme) => ({
    root: {
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
    content: {
        flexGrow: 1,
        margin: theme.spacing(1),
        paddingTop: theme.spacing(5),
    },
}));

export default function PageContainer({ children }) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleDrawer = () => {
        setOpen(!open);
    }

    return (
        <div className={classes.root}>
            <CssBaseline />

            <Grid container direction="column" justify="center" alignItems="stretch" spacing={2}>
                <Grid item>
                    <MenuAppBar 
                        open={open} handleDrawer={handleDrawer}
                    /> 
                </Grid>
                <Grid item>
                    <Paper elevation={0}>
                        <Grid container direction="row" justify="flex-end" alignItems="center" spacing={2}>
                            <Grid item>
                                <CustomMiniDrawer
                                    open={open}
                                    handleDrawer={handleDrawer}
                                />
                            </Grid>
                            
                            <Grid item>
                                <Paper elevation={0} className={classes.content}> 
                                    { children }
                                </Paper>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

            <SharedSnackbar />
        </div>
    );
  }