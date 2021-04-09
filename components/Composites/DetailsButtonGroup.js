import React, { Fragment, useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { 
    FormHelperText, FormControl, InputLabel, FilledInput 
} from '@material-ui/core';

import { makeStyles, withStyles } from '@material-ui/styles';

import NicknameButton from '../Buttons/NicknameButton';
import AutofillButton from '../Fetchers/AutofillButton';
import { useCount } from '../SharedContext';
import StyledSharedDialog from './StyledSharedDialog'; 

const useStyles = makeStyles((theme) => ({
    paper: {
        border: `1px solid`,
        padding: theme.spacing(1),
        borderColor: theme.palette.primary.dark,
    },
}));

const validUrlPattern =  /^https?:\/\/([\w\d\-]+\.)+\w{2,}(\/.+)?$/;

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

export default function DetailsButtonGroup() {
    const classes = useStyles();
    const [state, dispatch] = useCount();
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open); 
    }

    const handleClose = () => {
        setOpen(false); 
    }

    const handleSubmit = () => {
        console.log('Submitting');
    }

    const titleContent = {
        title: 'Nickname',
        message: 'What would you like to call this URL? A meaningful name makes Links easily identifiable within your collection',
        component: <TitleInput />,
        noSubmissionReq: false
    };

    return (
        <Fragment>
            <StyledToggleButtonGroup>
                <Paper elevation={0} className={classes.paper}>
                    <div style = {{ display: 'flex', flexDirection: 'column' }}>
                        <FormLabel component="legend" style={{ marginLeft: '5px' }}> 
                            <Typography 
                                variant="overline" 
                                style={{ color: !validUrlPattern.test(state.url) ? 'gray' : '#1eb980' }}
                            > 
                                Details
                            </Typography> 
                        </FormLabel>

                        <Divider style={{ backgroundColor: !validUrlPattern.test(state.url) ? 'gray' : '#1eb980' }} /> 
                
                        <Grid container direction="row" justify="space-between" alignItems="center" spacing={1}>
                            <Grid item>
                                <AutofillButton /> 
                            </Grid>
                            <Grid item>
                                <NicknameButton handleClick={handleClick} /> 
                            </Grid>
                        </Grid>
                    </div>
                </Paper>
            </StyledToggleButtonGroup>

            <StyledSharedDialog 
                open={open}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                content={titleContent}
                noSubmissionReq={true}
            /> 
        </Fragment>
    );
}