import React, { Fragment, useState } from 'react'; 

import { 
    Typography, Paper, FormLabel, 
    Grid, TextField,  FormHelperText, 
    Divider
} from '@material-ui/core'; 
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import StarIcon from '@material-ui/icons/Star'; 
import HomeIcon from '@material-ui/icons/Home'; 

import { makeStyles, withStyles } from '@material-ui/core/styles'; 

import CopyToClipboardButton from '../components/Buttons/CopyToClipboardButton';
import MarkFavouriteButton from '../components/Buttons/MarkFavouriteButton'; 
import NicknameButton from '../components/Buttons/NicknameButton'; 

import StyledSharedDialog from '../components/Composites/StyledSharedDialog'; 
import { useCount } from '../components/SharedContext'; 


const useStyles = makeStyles((theme) => ({
    paper: {
        border: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(1),
        backgroundColor: '#fff', 
    },
    paperPurple: {
        border: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(1.5),
        backgroundColor: theme.palette.primary.dark,
        width: '99%',
    },
    buttonGroup: {
        display: 'flex', 
        flexDirection: 'column',
    },
})); 

const StyledToggleButtonGroup = withStyles((theme) => ({
    grouped: {
      margin: theme.spacing(0.5),
      border: 'none',
      '&:not(:first-child)': {
        borderRadius: theme.shape.borderRadius,
      },
      '&:first-child': {
        borderRadius: theme.shape.borderRadius,
      },
    },
}))(ToggleButtonGroup);

const TitleInput = () => {
    const classes = useStyles(); 
    const [state, dispatch] = useCount();

    // const [name, setName] = useState(state.name); 
    const [rem, setRem] = useState(0); 

    const handleNicknameChange = (name) => {
        const sanitizedName = enforceLimit(name); 
        dispatch({
            type: "UPDATE_NICKNAME", 
            payload: {
                value: sanitizedName
            }
        }); 
        handleRemUpdate();
    }

    const handleSubmit = () => {
        //todo dispatch a name update here
        // alert('Updating Name'); 
        console.log('Done updating name');
    }

    const enforceLimit = (name) => {
        //handle spacing here as well 
        return (name.length > 20) ? name.substring(0, 20) : name; 
    }

    const handleRemUpdate = () => {
        setRem(20 - state.nickname.length); 
    }

    return (
        
        <Grid 
            container
            direction="column"
            justify="space-evenly"
            alignItems="center"

        > 
            <Paper elevation={5} className={classes.paperPurple}>
                <Grid container direction="column" alignItems="flex-start" spacing={1}>
                    <Paper elevation={5} className={classes.paper}>
                        <Grid item>
                            <TextField
                                fullWidth
                                variant="outlined"
                                color="primary"
                                name="nickname"
                                label="Nickname"
                                value={state.nickname}
                                style={{ width: '300px', margin: '10px' }}
                                onChange={(e) => handleNicknameChange(e.target.value)}
                            /> 
                            <FormHelperText> Meaningful names make links easy to find </FormHelperText>
                        </Grid>
                  
                        <Grid container direction="row" justify="flex-end"> 
                            <Grid item>
                                <TextField 
                                    disabled
                                    variant="outlined"
                                    color="primary"
                                    label="remaining" 
                                    value={rem}
                                    size="small"
                                    margin="dense"
                                    style={{maxWidth: '100px', margin: '10px' }}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Paper>
        </Grid> 
    );
}

export default function OtherOptionsButtonGroup() {
    const classes = useStyles();
    const [state, dispatch] = useCount(); 

    const [dialogOpen, setDialogOpen] = useState(false); 
    const [openDialogName, setOpenDialogName] = useState('');
  
    const handleDialogOpen = (event, buttonName) => {
        setOpenDialogName(buttonName);
        setDialogOpen(true); 
    }

    const handleDialogClose = () => {
        setDialogOpen(false); 
    }

    const getContent = () => {
        if(openDialogName==='fav') {
            if(state.starred) {
                return favContent; 
            } else {
                return { 
                    title: 'Remove Star', 
                    message: 'Are you sure you want to unmark as favorite?', 
                    noSubmissionReq: false,
                    component: <HomeIcon />
                };
            }
        } else if(openDialogName==='title') {
            return titleContent; 
        } else {
            return null; 
        }
    }


    const handleCopyToClipboard = () => {
        dispatch({
            type: 'COPY_TO_CLIPBOARD',
            payload: {
                value: true
            }
        });
        dispatch({
            type: 'SNACKBAR_TRIGGER',
            payload: {
                message: 'Copied to clipboard.',
                key: new Date().getTime().toString()
            }
        });
    }

    const handleSubmit = () => {
        console.log('handling submit...');
    }

    const StarIconsGraphic = () => {
        return (
            <Grid container direction="row" justify="center">
                <Grid item> 
                    <Paper elevation={10}>
                        <StarIcon style={{ fontSize: '64px', color: 'yellow' }} />
                    </Paper>
                </Grid>
            </Grid>
        );
    }
    
    const favContent = {
        title: 'Mark as favorite',
        message: 'Do you really love this one that much?',
        component: <StarIconsGraphic />,
        noSubmissionReq: true
    };

    const titleContent = {
        title: 'Nickname',
        message: 'What would you like to call this URL? A meaningful name makes Links easily identifiable within your collection',
        component: <TitleInput />,
        noSubmissionReq: false
    };

    return (
        <Fragment>
            <StyledToggleButtonGroup>
                <Paper elevation={3} className={classes.paper}>
                    <div className={classes.buttonGroup}>
                        <FormLabel component="legend" style={{ marginLeft: '15px' }}>
                            <Typography variant="overline" color="textSecondary"> 
                                Additional Options
                            </Typography> 
                        </FormLabel>
                        
                        <Divider /> 

                        <div style={{ 
                                height: '100%', 
                                display: 'flex', 
                                flexDirection: 'row', 
                                justifyContent: 'space-between'
                            }}
                        >
                            <MarkFavouriteButton
                                handleClick={(e) => handleDialogOpen(e, "fav")}
                            /> 
                            <CopyToClipboardButton 
                                handleClick={handleCopyToClipboard}
                            />
                            <NicknameButton 
                                handleClick={(e) => handleDialogOpen(e, "title")} 
                            /> 
                        </div>
                    </div>
                </Paper>
            </StyledToggleButtonGroup>
            
            <StyledSharedDialog 
                open={dialogOpen}
                handleClose={handleDialogClose}
                handleSubmit={handleSubmit}
                content={getContent()}
                noSubmissionReq={true}
            /> 
        </Fragment>
    );
}