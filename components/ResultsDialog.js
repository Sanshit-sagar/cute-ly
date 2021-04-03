import React, { useState, useCallback } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia'; 
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography'; 
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import FileCopyIcon from '@material-ui/icons/FileCopy';
import StarIcon from '@material-ui/icons/Star';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import Tooltip from '@material-ui/core/Tooltip'; 

import { makeStyles } from '@material-ui/core/styles';

import { useCount } from './SharedContext'; 
import { useClipboard } from 'use-clipboard-copy';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    details: {
        width: 450,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', 
        alignItems: 'stretch',
    },
    content: {
        flex: '1 0 auto',
        width: '600px',
    },
    cover: {
        width: 150,
        height: 150,
        borderRadius: 5,
    },
    buttonGroup: {
        display: 'flex',
        direction: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: '5px',
    },
    dialogPaper: {
        color: theme.palette.primary.dark,
    },
    paper: {
        border: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(1),
        backgroundColor: '#fff',
        minWidth: '475px',
    },
    cardHeaderPaper: {
        padding: '10px', 
        margin: '5px', 
        border: 'thin solid', 
        borderColor: '#1eb980',
    },
    iconButton: {
        margin: '5px',
    },
}));

const getMedium = (url) => {
    if(url.includes('facebook')) {
        return 'facebook';
    }
    if(url.includes('linkedin')) {
        return 'linkedin';
    }
    if(url.includes('twitter')) {
        return 'twitter';
    }
    if(url.includes('whatsapp')) {
        return 'whatsapp';
    }
    return 'http'; 
}

const getStarIconColor = (starred) => {
    return starred ? 'gold' : '#1eb980';
}

const LinkFaviconComp = () => {
    const classes = useStyles();
    const [state, dispatch] = useCount();
    
    const medium = getMedium(state.url); 

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'stretch' }} >
            <div  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                <Paper elevation={5}>
                    { 
                        medium === "linkedin" && 
                        <CardMedia
                            className={classes.cover}
                            image = "/linkedin.png"
                            title="Shareable on LinkedIn"
                            style={{ backgroundColor: '#005cc5' }}
                        />
                    }
                    { 
                        medium==="whatsapp" && 
                        <CardMedia
                            className={classes.cover}
                            image = "/whatsapp.png"
                            title="Shareable on LinkedIn"
                            style={{ backgroundColor: '#00d85a' }}
                        />
                    }
                    { 
                        medium==="twitter" && 
                        <CardMedia
                            className={classes.cover}
                            image = "/twitter.png"
                            title="Shareable on LinkedIn"
                            style={{ backgroundColor: '#009dff' }}
                        />
                    }
                    { 
                        medium ==="facebook" && 
                        <CardMedia
                            className={classes.cover}
                            image = "/facebook.png"
                            title="Shareable on LinkedIn"
                            style={{ backgroundColor: '#4861ac' }}
                        />
                    }
                </Paper>
            </div>
        </div>
    );
}

const ActionButtonGroup = () => {
    const classes = useStyles();
    const [state, dispatch] = useCount();

    const [prev, setPrev] = useState(''); //holds prev copied URL
    const [copyError, setCopyError] = useState(false);

    const clipboard = useClipboard({
        onSuccess() {
            setCopyError(false);
        },
        onError() {
            setCopyError(true);
        }
    });

    const handleClick = useCallback(
        () => {
            const url = state.mostRecentResult;
            setPrev(url);
            clipboard.copy(url);
        }, [clipboard.copy, state.mostRecentResult]
    ); 

    const handleCopy = () => {
        if(!state.copyToClipboard) {
            handleClick();
        } else {
            dispatch({
                type: 'SNACKBAR_TRIGGER',
                payload: {
                    message: 'Clipboard already contains this URL',
                    key: new Date().getTime().toString(),
                }
            });
            return; 
        }

        if(copyError) {
            alert('Error in copying to clipboard...'); 
            setCopyError(false); 
        } else {
            dispatch({
                type: 'COPY_TO_CLIPBOARD',
            }); 
        } 
    }

    const handleStar = () => {
        dispatch({
            type: 'TOGGLE_STAR',
        }); 
    }

    return (
        <div className={classes.buttonGroup}>
            <Button 
                fullWidth
                variant="outlined" 
                color="primary" 
                size="large"
                margin="normal"
                onClick={handleStar} 
                className={classes.iconButton}
            >
                 <Tooltip 
                    arrow
                    enterDelay={500} 
                    title={
                        <Typography variant="caption" color="primary">
                            { state.starred ? 'Marked as Favorite!' : 'Mark as Favorite?' }
                        </Typography>
                    }
                >  
                    <StarIcon 
                        style={{ color: getStarIconColor(state.starred) }} 
                    />
                </Tooltip>
            </Button>

            <Button 
                variant="outlined" 
                color="primary" 
                size="large"
                margin="normal"
                className={classes.iconButton}
                onClick={handleCopy}
            >
                { ( !state.copyToClipboard || !prev.length || prev!=state.mostRecentResult ) ? 
                    <Tooltip 
                        arrow
                        enterDelay={500} 
                        title={
                            <Typography variant="caption" color="primary">
                                Copy to clipboard?
                            </Typography>
                        }
                    >  
                        <FileCopyIcon  
                            style={{ color: '#1eb980' }} 
                        /> 
                    </Tooltip>
                :
                    <Tooltip 
                        arrow
                        enterDelay={500} 
                        title={
                            <Typography variant="caption" color="primary">
                                Copied to clipboard!
                            </Typography>
                        }
                    >  
                        <DoneOutlineIcon 
                            style={{ color: '#1eb980' }} 
                        />
                    </Tooltip>
                }
            </Button>
        </div>
    );
}

const LinkDataCard = () => {
    const classes = useStyles();
    const [state, dispatch] = useCount();

    return (
        <Card className={classes.root}>
            <CardContent className={classes.content}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <div style={{ 
                        display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', margin: '5px' 
                    }}>
                        <LinkFaviconComp /> 
                    </div>

                    <div className={classes.details}>
                        <Paper elevation={10} className={classes.cardHeaderPaper}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <Link href={state.mostRecentResult}>
                                    <Typography component="h4" variant="h4">
                                        /{state.mostRecentResult.substring(31)} 
                                    </Typography>
                                </Link>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Link href={state.url}>
                                    <Typography component="overline">
                                        {"..." + state.url.substring(state.url.length - 35)}
                                    </Typography>
                                </Link>
                                <OpenInNewIcon style={{ color: '#1eb980' }} /> 
                            </div>
                        </Paper>

                        <Paper elevation={0}>
                            <ActionButtonGroup /> 
                        </Paper>
                    </div>
                </div>
            </CardContent>
        </Card>  
    );
}

const ResultsDialog = () => {
    const [state, dispatch] = useCount(); 

    const handleClose = (e) => {
        dispatch({
            type: "SHOW_RESULTS", 
            payload: {
                value: false
            }
        });
    }

    return (
        <Dialog 
            open={state.showResults} 
            onClose={handleClose}
        >
            <DialogContent style={{ padding: '2.5px', border: 'thin solid', borderColor: '#1eb980'}}>
                <LinkDataCard
                    handleClose={handleClose}
                /> 
            </DialogContent>
        </Dialog>
    );
}

export default ResultsDialog; 