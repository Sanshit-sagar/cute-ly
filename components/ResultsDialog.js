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
    dialogPaper: {
        color: theme.palette.primary.dark,
    },
    paper: {
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '5px',
        margin: theme.spacing(1),
        backgroundColor: '#fff',
    },
    cardHeaderPaper: { 
        margin: theme.spacing(0.3), 
        border: 'thin solid', 
        borderColor: theme.palette.primary.main,
    },
    iconButton: {
        margin: '5px',
    },
    metaDetails: {
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        backgroundColor: theme.palette.background.header,
    },
    metaDetailsText: {
        color: theme.palette.background.default,
    },
    paperAnalytics: {
        
    },
    paperStatistics: {
        border: 'thin solid',
        borderColor: theme.palette.primary.main,
        margin: theme.spacing(0.5),
        backgroundColor: theme.palette.background.default,
    },
    innerPaper: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        margin: '5px',
    },
    nickname: {
        border: 'thin solid',
        borderColor: theme.palette.primary.main,
    },
    innerContent: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'center' 
    },cardHeaderPaperGreen: {
        margin: theme.spacing(0.3), 
        border: 'thin solid', 
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
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
                    <CardMedia
                        className={classes.cover}
                        image = "/external-link.png"
                        title="Shareable external link"
                        style={{ backgroundColor: '#fff' }}
                    />
                }
            </Paper>
        </Fragment>
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
                            <FileCopyIcon color="primary" />
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

const LinkDataCard = () => {
    const classes = useStyles();
    const [state, dispatch] = useCount(); 
    
    const sanitizeInput = (input) => {
        if(input.charAt(input.length-1) === ' ') {
            return input.substring(0, input.length-1);
        } else if(input.length > 20) {
            return input.substring(0, 20);
        }
        return input; 
    }

    const handleChange = (inputValue) => {
        const sanitizedValue = sanitizeInput(inputValue);
        
        dispatch({
            type: "UPDATE_NICKNAME",
            payload: {
                value: sanitizedValue,
            },
        });
    }

    const hybridGraph = state.openGraphData;
    const imageLink = hybridGraph.image; 

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
                        <Paper 
                            elevation={5} 
                            className={classes.cardHeaderPaper}
                        >
                            <div className={classes.innerPaper}>
                               {
                                    state.mostRecentResult && state.mostRecentResult.length
                                ?
                                    <Link href={state.mostRecentResult}>
                                        <Typography 
                                            component="h4" 
                                            variant="h4"
                                        >
                                            /{state.mostRecentResult.substring(31)} 
                                        </Typography>
                                    </Link>
                                :
                                    <FormControl>
                                        <OutlinedInput 
                                            placeholder="untitled"
                                            color="primary"
                                            notched="true"
                                            autoComplete="off"
                                            value={state.nickname}
                                            margin="dense"
                                            onChange={(e) => handleChange(e.target.value)}
                                            className={classes.nickname}
                                        />
                                        <Link 
                                            color="primary" 
                                            href = {
                                                    state.mostRecentResult.length  
                                                ?   state.mostRecentResult 
                                                :  'Click generate to create a slug for this URL'
                                            }
                                        >
                                            <FormHelperText> 
                                                <Typography 
                                                    variant="overline" 
                                                    color="primary"
                                                    style={{ fontSize: '9px' }}
                                                >
                                                    https://www.cutely.page.link/ 
                                                </Typography>
                                            </FormHelperText>
                                        </Link>
                                    </FormControl>
                                }
                            </div>
                        </Paper>
                        
                        
                        <Paper elevation={5} className={classes.cardHeaderPaper}>
                            {
                                state.openGraphData && Object.entries(state.openGraphData).length
                            ?
                                <OpenGraphDataDisplay state={state} /> 
                            :
                                <Button variant="outlined" color="primary">
                                    <Typography variant="button" color="secondary"> 
                                        Generate Open Graph Data?
                                    </Typography>
                                </Button>
                            }
                        </Paper>

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
            <DialogTitle>
                <Typography 
                    variant="h3" 
                    color="primary"
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

            <DialogActions>
                <Button 
                    variant="outlined" 
                    color="primary" 
                    size="large" 
                    onClick={handleClose}
                >
                    <Typography 
                        variant="button" 
                        color="default"
                    >
                        Dismiss
                    </Typography>
                </Button>
            </DialogActions>
        
        </Dialog>
    );
}

export default ResultsDialog; 