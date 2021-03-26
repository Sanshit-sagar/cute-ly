import React, { Fragment, useEffect }  from 'react';
import { useCopyToClipboard } from 'react-use'; 
import { useCount } from './SharedContext'; 

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography'; 
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton'; 
import FileCopyIcon from '@material-ui/icons/FileCopy';
import StarIcon from '@material-ui/icons/Star';
import { CardActions, CardHeader, Card, CardActionArea, CardContent, CardC } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {

    },
    paper: {
        border: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(1),
        backgroundColor: '#fff',
        minWidth: '475px',
    },
    paperPurple: {
        border: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(1),
        backgroundColor: theme.palette.primary.dark,
        minWidth: '500px',
        maxWidth: '550px',
    },
    paperIcon: {
        border: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(0.5),
        backgroundColor: theme.palette.secondary.dark,
        display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
    },
    paperAction: {
        border: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(0.5),
        backgroundColor: theme.palette.secondary.dark,
        display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
    },
}));

const ResultsDialog = () => {
    const classes = useStyles();
    const [state, dispatch] = useCount(); 

    const [copyState, copyToClipboard] = useCopyToClipboard();

    const handleCopy = () => {
        copyToClipboard(state.mostRecentResult);

        if(copyState.error) {
            console.log('Unable to copy value:' + copyState.error.message);
        } else if(copyState.value) {
            console.log('Copied... ' + copyState.value.substring(copyState.value.length - 7));
        }
    }

    const handleStar = () => {
        dispatch({
            type: 'TOGGLE_STAR',
        }); 
    }

    const getFileCopyIconColor = () => {
        if(!copyState.error && copyState.value) {
            return 'purple';
        } else {
            return 'gray'; 
        }
    }

    const getStarIconColor = () => {
        return state.starred ? 'yellow' : 'gray';  
    }

    const DetailsCard = () => {
        const classes = useStyles(); 

        return (
           <Fragment>
                { state.mostRecentResult  ?
                    <Paper elevation={5} className={classes.paper}>
                        <Typography variant="h5" component="h2" color="textPrimary">
                            <Link href={state.mostRecentResult}>
                                /{ state.mostRecentResult.substring(31) }
                            </Link>
                        </Typography>

                        <Link href={state.mostRecentPurl}>
                            <Typography variant="caption" color="textSecondary">
                                { state.url.substring(0, 70) + "..."}
                            </Typography>
                        </Link>                
                    </Paper>
                :
                    <h1> Loading... </h1> 
                }
            </Fragment> 
        );
    }

    const handleClose = (e) => {
        dispatch({
            type: "SHOW_RESULTS", 
            payload: {
                value: false
            }
        });
    }
    
    
    return (
        <React.Fragment> 
            <Dialog 
                open={state.showResults}
                onClose={(e) => handleClose(e)}
            > 
                { 
                    state.mostRecentResult && state.mostRecentResult.length &&
                
                    <DialogContent> 
                        <Paper elevation={3} className={classes.paperPurple}>
                            <Grid container>
                                <Grid item>
                                    <Paper elevation={5} style={{ height: '100%', width: '100%', backgroundColor: '#fff' }}>
                                        <DetailsCard /> 
                                    </Paper>
                                </Grid> 
                            </Grid>
                        </Paper>
                    </DialogContent>
                }

                <DialogActions> 
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid item>
                            { state.mostRecentResult && 
                                <Paper elevation={5} className={classes.paperIcon}>
                                    <div style={{ marginRight: '50px' }}> 
                                        <Button 
                                            size="small" 
                                            margin="dense"
                                            onClick={handleCopy} 
                                            style={{ backgroundColor: 'white' }}
                                        > 
                                            <FileCopyIcon style={{ color: getFileCopyIconColor() }} /> 
                                        </Button> 
                                    </div>

                                    <div> 
                                        <Button 
                                            size="small" 
                                            margin="dense"
                                            onClick={handleStar} 
                                            style={{ backgroundColor: 'white' }}
                                        >
                                            <StarIcon style={{ color: getStarIconColor() }}/>
                                        </Button>
                                    </div>
                                </Paper>
                            }
                        </Grid>
                        <Grid>
                            <Button 
                                size="large"
                                margin="normal"
                                variant="contained" 
                                color="primary" 
                                onClick={(e) => dispatch({
                                        type: "SHOW_RESULTS",
                                        payload: {
                                            value: false
                                        }
                                    })
                                }
                            >
                                <Typography
                                    variant="button" 
                                    color="textSecondary"
                                > 
                                    Dismiss
                                </Typography>
                            </Button>  
                        </Grid>
                    </Grid>
                </DialogActions> 
            </Dialog>
        </React.Fragment>
    );
}

export default ResultsDialog; 