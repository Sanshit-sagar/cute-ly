import React, { Fragment, useState } from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import { makeStyles } from '@material-ui/core/styles'; 
import InfoIcon from '@material-ui/icons/Info';

import { useCount } from '../SharedContext';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';

const useStyles = makeStyles((theme) => ({
    nameInput: {
        borderRadius: '5px',
    },
    nicknamePaper: {
        border: 'thin solid', 
        borderColor: '#1eb890' 
    },
})); 

const validUrlPattern =  /^https?:\/\/([\w\d\-]+\.)+\w{2,}(\/.+)?$/;

const NicknameHeaderInput = () => {
    const classes = useStyles(); 
    const [state, dispatch] = useCount();

   const handleChange = (inputValue) => {
       const sanitizedValue = sanitizeInput(inputValue);

       dispatch({
           type: "UPDATE_NICKNAME",
           payload: {
               value: sanitizedValue,
           },
       });
   }

   const handleInfoButtonClick = () => {
       alert('Info Button Clicked'); 
   }

   const sanitizeInput = (input) => {
       if(input.charAt(input.length-1) === ' ') {
           return input.substring(0, input.length-1);
       } else if(input.length > 20) {
           return input.substring(0, 20);
       }
       return input; 
   }

    const getInputColor = () => {
        return (!validUrlPattern.test(state.url) ? 'black' :  '#1eb980'); 
    }

    const getInputHeaderColor = () => {
        return (!validUrlPattern.test(state.url) ? 'gray' : (!state.nickname.length ? '#1eb980' : (state.dark ? '#fff' : '#000')));  
    }

   return (
       <Grid container direction="row" justify="space-between" spacing={1}>
           <Grid item>
                <FormControl fullWidth variant="filled">
                    <Paper elevation={0} className={classes.nicknamePaper}>
                        <InputLabel style={{ color: getInputHeaderColor() }}>
                            Nickname
                        </InputLabel>

                        <FilledInput
                            name="urlInput"
                            variant="outlined"
                            disabled={!validUrlPattern.test(state.url)}
                            value={state.nickname}
                            size="small"
                            margin="dense"
                            autoComplete="off"
                            onChange={(e) => handleChange(e.target.value)}
                            InputProps={{
                                endAdornment: 
                                    <InputAdornment position="end">
                                        <IconButton 
                                            margin="dense" 
                                            onClick={() => handleInfoButtonClick()}
                                        >
                                            <InfoIcon />
                                        </IconButton>
                                    </InputAdornment>,
                            }}
                            className={classes.nameInput}
                            style={{ color: getInputColor() }}
                        />
                    </Paper> 
                </FormControl>
           </Grid>
       </Grid>
   );
}

const SocialMetaTagsButton = () => {
    const classes = useStyles();
    const [globalState, globalDispatch] = useCount(); 

    const [open, setOpen] = useState(false); 

    const validUrlPattern =  /^https?:\/\/([\w\d\-]+\.)+\w{2,}(\/.+)?$/;

    const handleOpen = (name) => {
        setOpen(true); 
    }

    return (
        <div className={classes.buttonContainer}>
            <Tooltip arrow enterDelay={500} title={
                    <Typography variant="caption" color="primary">
                        Social Metadata
                    </Typography>
                }
            >  
                <span>
                    <Button 
                        size="large"
                        color="primary"
                        variant="outlined"
                        disabled={!validUrlPattern.test(globalState.url)}
                        onClick={() => handleOpen()}
                        className={classes.button}
                    >
                        <Fragment>
                            { 
                                    globalState.counts.meta >= 1 
                                ?
                                    <Badge badgeContent={globalState.counts.meta} color="secondary">
                                        <LabelImportantIcon style={{ color: 'aqua' }} />
                                    </Badge>
                                : 
                                    <Badge badgeContent={0} color="secondary">
                                        <LabelImportantIcon color="disabled" />
                                    </Badge>
                            }
                        </Fragment>
                    </Button>
                </span>
            </Tooltip>    
        </div> 
    );
}

const NicknameDisplay = () => {
    return (
        <Grid 
            container 
            direction="row" 
            justify="flex-start" 
            alignItems="center" 
            spacing={2}
        >
            <Grid item>
                <NicknameHeaderInput /> 
            </Grid>
            <Grid item>
                <SocialMetaTagsButton /> 
            </Grid>
        </Grid>
    )
}



export default NicknameDisplay; 