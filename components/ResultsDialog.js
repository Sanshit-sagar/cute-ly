import React, { Fragment, useState, useCallback } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import { DialogTitle, FormControl, FormHelperText, OutlinedInput } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography'; 
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import FileCopyIcon from '@material-ui/icons/FileCopy';
import StarIcon from '@material-ui/icons/Star';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import Tooltip from '@material-ui/core/Tooltip'; 

import { makeStyles } from '@material-ui/core/styles';

import { useCount } from './SharedContext'; 
import OpenGraphDataDisplay from './Composites/OpenGraphDataDisplay'; 

import { useClipboard } from 'use-clipboard-copy';
import Image from 'next/image'; 

const useStyles = makeStyles((theme) => ({
    root: {

    },
    dialog: {
       border: 'thin solid',
       borderColor: theme.palette.primary.main,
       borderRadius: '5px',
    },
    details: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', 
        alignItems: 'stretch',
    },
    cover: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
    buttonGroup: {
        display: 'flex',
        direction: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    paper: {
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '5px',
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    cardHeaderPaper: { 
        margin: theme.spacing(0.3), 
        border: 'thin solid', 
        borderColor: theme.palette.primary.main,
        padding: theme.spacing(1),
    },
    iconButton: {
        margin: '5px',
    },
    nickname: {
        border: 'thin solid',
        borderColor: theme.palette.primary.main,
        color: theme.palette.background.header,
    },
    innerContent: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'center' 
    },
    cardHeaderPaperGreen: {
        margin: theme.spacing(0.3), 
        border: 'thin solid', 
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
    },
    fileCopyIcon: {
        color: theme.palette.primary.main,
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

const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 100}`
}

const HttpImage = ({ imageLink }) => {
    if(!imageLink || !imageLink.length) {
        imageLink = "/external-link.png";
    }

    return (
        <Fragment>
            <Image
                loader={myLoader}
                src={imageLink}
                alt="Open Graph Detected Image"
                width={96}
                height={96}
            />
        </Fragment>
    );
}

const LinkFaviconComp = ({ imageLink }) => {
    const classes = useStyles();
    const [state, dispatch] = useCount();
    
    const medium = getMedium(state.url); 

    return (
        <Fragment>
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
                        title="Shareable on Facebook"
                        style={{ backgroundColor: '#4861ac' }}
                    />
                }
                {
                    medium==='http' && 
                    <HttpImage imageLink={imageLink} /> 
                }
            </Paper>
        </Fragment>
    );
}

const ActionButtonGroup = () => {
    const classes = useStyles();
    const [state, dispatch] = useCount();

    const [prev, setPrev] = useState(''); 
    const [copyError, setCopyError] = useState(false);
    
    const validUrlPattern =  /^https?:\/\/([\w\d\-]+\.)+\w{2,}(\/.+)?$/;

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
            <div>
                <Button 
                    variant="outlined" 
                    color="primary" 
                    size="large"
                    className={classes.iconButton}
                    onClick={handleStar}
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
            </div>
            <div>
                <Button 
                    variant="outlined" 
                    color="primary" 
                    size="large"
                    onClick={handleCopy}
                    disabled={!validUrlPattern.test(state.url) || !state.mostRecentResult.length}
                    className={classes.iconButton}
                >
                    { 
                        ( !state.copyToClipboard || !prev.length || prev!=state.mostRecentResult ) 
                    ?     
                        <Tooltip 
                            arrow
                            enterDelay={500} 
                            title={
                                <Typography variant="caption" color="primary">
                                    Copy to clipboard?
                                </Typography>
                            }
                        >  
                            <FileCopyIcon className={classes.fileCopyIcon} />
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
                            <DoneOutlineIcon color="primary" />
                        </Tooltip>
                    }
                </Button>
            </div>
        </div>
    );
}

const Header = () => {
    const classes = useStyles();
    const [state, dispatch] = useCount();

    return (
        <Fragment>
            { 
                state.mostRecentResult && state.mostRecentResult?.length 
            ?  
                <Paper 
                    elevation={5} 
                    className={classes.cardHeaderPaper}
                >
                    <Link href={state.mostRecentResult}>
                        <Typography variant="h6" style={{ color: state.dark ? '#fff' : '#000' }}>
                            { state.mostRecentResult.substring(31) }
                        </Typography>
                    </Link>
                </Paper>
            :
                null
            }
        </Fragment>
    ); 
}

const OpenGraphData = () => {
    const classes = useStyles();
    const [state, dispatch] = useCount();

    return (
        <Fragment>
            {
                state.openGraphData && Object.entries(state.openGraphData).length 
            ?
                <Paper elevation={5} className={classes.cardHeaderPaper}>
                    <OpenGraphDataDisplay state={state} /> 
                </Paper>
            :
                null
            }
        </Fragment>
    )
}

const LinkDataCard = () => {
    const classes = useStyles();
    const [state, dispatch] = useCount(); 

    const hybridGraph = state.openGraphData;

    const imageLink = (
            hybridGraph && hybridGraph?.data && hybridGraph?.data?.image.length 
        ?   hybridGraph.data.image 
        :   '/external-link.png'
    );

    return (
        <Card className={classes.root}>
            <CardContent className={classes.content}>
                <div className={classes.innerContent}>
                    
                    <div className={classes.details}>
                        <Paper elevation={5} className={classes.cardHeaderPaperGreen}>
                            <div>
                                <LinkFaviconComp imageLink={imageLink} /> 
                            </div>
                        </Paper>
                    </div>

                    <div className={classes.details}>
                        <Header /> 
                        <OpenGraphData /> 
                        <ActionButtonGroup /> 
                    </div>
                </div>
            </CardContent>
        </Card>  
    );
}

const ResultsDialog = () => {
    const classes = useStyles(); 
    const [state, dispatch] = useCount(); 

    const handleClose = () => {
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
            <DialogTitle style={{ backgroundColor: '#1eb980'}}>
                <Typography 
                    variant="h2" 
                    color="secondary"
                    style={{ color: state.dark ? '#000' : '#fff' }}
                >
                    summary
                </Typography>
            </DialogTitle>

            <Paper 
                elevation={10} 
                className={classes.paper}
            >
                <LinkDataCard
                    handleClose={handleClose}
                /> 
            </Paper>

            <DialogActions style={{ backgroundColor: '#1eb980'}}>
                <Button 
                    variant="contained" 
                    size="large" 
                    onClick={handleClose}
                    style={{ backgroundColor: state.dark ? '#000' : '#fff' }}
                >
                    <Typography 
                        variant="button" 
                        style={{ color: '#1eb980'}}
                    >
                        Dismiss
                    </Typography>
                </Button>
            </DialogActions>
        
        </Dialog>
    );
}

export default ResultsDialog; 