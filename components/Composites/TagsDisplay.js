import React, { useState } from 'react'; 

import { Grid, Button, Chip, Avatar, Popover, Typography, IconButton } from '@material-ui/core'; 
import AddIcon from '@material-ui/icons/Add'; 

import { makeStyles } from '@material-ui/core/styles'; 

import { useCount } from '../SharedContext';
import { useAnalytics } from '../../utils/useAnalytics';

const useStyles = makeStyles((theme) => ({
    list: {
        height: '50px',
        width: '200px',
        maxHeight: '50px',  
        maxWidth: '200px', 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        alignItems: 'flex-start', 
        flexWrap: 'wrap', 
        overflowY: 'auto',
        listStyle: "none",
        height: "100%",
        '&::-webkit-scrollbar': {
            width: '0.6em'
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.primary.dark,
            outline: '1px solid slategrey'
        },
        border: '0.25px solid',
        borderColor: theme.palette.secondary.dark,
        borderRadius: '5px',
    },
    tagsComp: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        alignItems: 'center',
    },
    headerButton: {
        height: '45px',
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
}));

const validUrlPattern =  /^https?:\/\/([\w\d\-]+\.)+\w{2,}(\/.+)?$/;

const AddTagsButton = ({ open, anchorEl, handlePopoverOpen, handlePopoverClose, show, handleClickShow }) => {
    const classes = useStyles();

    const [globalState, globalDispatch] = useCount(); 
    const [analyticsState, analyticsDispatch] = useAnalytics(); 

    const handleClick = () => {
        analyticsDispatch({
            type: "CREATE_TAG",
            payload: {
                value: 'newTag',
            }
        });
    }

    return (
        <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2} style={{ marginRight: '5px' }}>
           {/* <Grid item>
                <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    margin="normal"
                    disabled={!validUrlPattern.test(globalState.url)}
                    onClick={handleClickShow}
                    className={classes.headerButton}
                >
                    <Typography 
                        variant="button"
                        aria-owns={
                            open ? 'mouse-over-popover' : undefined
                        }
                        aria-haspopup="true"
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                    > 
                        TAGS
                    </Typography>
                </Button>
            </Grid> */}

            <Grid item>
                <Button 
                    variant="outlined"
                    color="primary" 
                    size="large" 
                    margin="normal"
                    disabled={!validUrlPattern.test(globalState.url)}
                    className={classes.headerButton}
                > 
                    <AddIcon onClick={handleClick} /> 
                </Button>
            </Grid>
        </Grid>
    );
 }

 const TagsList = ({ onMouseEnter, onMouseLeave }) => {
    const classes = useStyles();
    
    const [state, dispatch] = useAnalytics();

     return (
         <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            { state.tags.length ?
                <div className={classes.list}>
                    { state.tags.map((item) => (
                        <div key={item}>
                            <Chip  
                                avatar={
                                    <Avatar 
                                        variant="rounded" 
                                        style={{ color: 'white' }}
                                    >
                                        { item.charAt(0).toUpperCase() }
                                    </Avatar> 
                                } 
                                variant="outlined" 
                                color="primary"
                                size="small" 
                                label={item} 
                                style={{ marginRight: '5px', marginBottom: '5px',  borderRadius: '5px' }} 
                            /> 
                        </div>
                    ))}
                </div>
            :
                null
            }
        </div>
     );
 }

 const TagsPopover = ({ open, anchorEl, handlePopoverOpen, handlePopoverClose}) => {
     const classes = useStyles(); 

     return (
         
        <Popover
            id="mouse-over-popover"
            className={classes.popover}
            classes={{
                paper: classes.paper,
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'right',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
        >
           <TagsList 
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            /> 
        </Popover>

     );
 }

 const TagsDisplay = () => {
     const classes = useStyles();

     const [anchorEl, setAnchorEl] = React.useState(null);
     const [show, setShow] = useState(true); 

     const handlePopoverOpen = (event) => {
       setAnchorEl(event.currentTarget);
     };
   
     const handlePopoverClose = () => {
       setAnchorEl(null);
     };
   
     const open = Boolean(anchorEl);

    const handleClickShow = () => {
        setShow(!show);
    }

     return (
        <div className={classes.tagsComp}>
            <AddTagsButton 
                open={open}
                anchorEl={anchorEl}
                handlePopoverOpen={handlePopoverOpen}
                handlePopoverClose={handlePopoverClose}
                show={show}
                handleClickShow={handleClickShow}
            />

            <TagsPopover 
                open={open}
                anchorEl={anchorEl}
                handlePopoverOpen={handlePopoverOpen}
                handlePopoverClose={handlePopoverClose}
            /> 
        </div>
     );
 }

 export default TagsDisplay; 