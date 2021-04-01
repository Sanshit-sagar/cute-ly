import React, { Fragment, useState } from 'react'; 

import { 
    Typography, Paper, FormLabel, 
    Grid, TextField,  FormHelperText, FormControl, InputLabel, FilledInput,
    Divider, Tooltip
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
        border: '1px solid',
        borderColor: '#1eb980',
        padding: theme.spacing(1),
        margin: theme.spacing(3),
    },
    buttonGroup: {
        display: 'flex', 
        flexDirection: 'column',
    },
})); 

const StyledToggleButtonGroup = withStyles((theme) => ({
    grouped: {
      margin: theme.spacing(0.5),
      border: 'thin solid',
      borderColor: theme.palette.primary.main,
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
            justify="center"
            alignItems="stretch"
            spacing={2}
        > 
            <Paper elevation={0} className={classes.paper}>
                <Grid item>
                    <FormControl fullWidth style={{ marginTop: '7.5px', marginBottom: '15px' }}>
                        <InputLabel 
                            style={{ 
                                    color: state.nickname.length 
                                ? (state.dark ? '#fff' : '#000' ) 
                                : '#1eb980' 
                            }}
                        > 
                            Nickname 
                        </InputLabel>
                        <FilledInput
                            fullWidth
                            variant="outlined"
                            color="primary"
                            name="nickname"
                            label="Nickname"
                            value={state.nickname}
                            onChange={(e) => handleNicknameChange(e.target.value)}
                            style={{ color: '#1eb980'}}
                        /> 
                    </FormControl>
                </Grid>
            
                <Grid item>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <FormControl>
                            <div style={{ display: 'flex', flexDirection:'column', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <FilledInput
                                    disabled
                                    color="primary"
                                    value={rem}
                                    size="small"
                                    margin="dense"
                                    style={{ width: '75px' }}
                                />
                                <FormHelperText> 
                                    Characters Left 
                                </FormHelperText>
                            </div>
                        </FormControl>
                    </div>
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

    const validUrlPattern =  /^https?:\/\/([\w\d\-]+\.)+\w{2,}(\/.+)?$/;

    const getBodyColor = () => {
        const [state, dispatch] = useCount(); 
        return !validUrlPattern.test(state.url) ? 'gray' : '#1eb980';
    }

    return (
        <Fragment>
            <StyledToggleButtonGroup>
                <Paper elevation={0} className={classes.paper}>
                    <div className={classes.buttonGroup}>
                        <FormLabel component="legend" style={{ marginLeft: '5px' }}>
                            <Typography variant="overline" style={{ color: getBodyColor() }}> 
                                Additional Options
                            </Typography> 
                        </FormLabel>
                        
                        <Divider style={{ backgroundColor: getBodyColor() }} /> 

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
                        

                            <CopyToClipboardButton />

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