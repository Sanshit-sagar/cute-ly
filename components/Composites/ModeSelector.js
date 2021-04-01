import React from 'react';

import { 
    Radio, 
    FormControlLabel, 
    Paper, 
    Typography, 
    FormLabel, 
    Tooltip, 
    Divider 
} from '@material-ui/core';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'; 

import { makeStyles, withStyles } from '@material-ui/core/styles'; 

import { useCount } from '../SharedContext'; 

const useStyles = makeStyles((theme) => ({
    buttonGroupPaper: {
        padding: theme.spacing(0.3),
        marginRight: theme.spacing(0.25),
        marginTop: theme.spacing(0.25),
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


const RadioA = () => {
    const [state, dispatch] = useCount();
  
    return (
        <Radio 
            color="primary"
            value="SHORT"
            disabled={!validUrlPattern.test(state.url)}
            name="radio-short"
            checked = {
                state.mode === 'SHORT'
            }
            onChange={(e) => 
                dispatch({ 
                    'type'  : 'UPDATE_MODE', 
                    payload : e.target 
                })
            }
            style={{ height: '100%' }}
        />
    );
}

const RadioB = () => {
    const [state, dispatch] = useCount();
    
    return (
        <Radio 
            color="primary"
            disabled={!validUrlPattern.test(state.url)}
            value="UNGUESSABLE"
            name="radio-unguessable"
            checked = {
                state.mode === 'UNGUESSABLE'
            }
            onChange={(e) => 
                dispatch({ 
                    'type'  : 'UPDATE_MODE', 
                    payload : e.target 
                })
            }
        />
    );
}

const getBodyColor = () => {
    const [state, dispatch] = useCount(); 

    return !validUrlPattern.test(state.url) ? 'gray' : '#1eb980';
}

const ModeSelector = () => {
    const classes = useStyles(); 
    const [state, dispatch] = useCount(); 

    return (
        <StyledToggleButtonGroup url={state.url}>
          <Paper elevation={0} className={classes.buttonGroupPaper}>
                <div style = {{ display: 'flex', flexDirection: 'column', marginBottom: '1.25px' }}>
                    <FormLabel component="legend" style={{ marginTop: '3.5px', marginBottom: '1px', marginLeft: '5px'}}> 
                        <Typography variant="overline" style={{ color: getBodyColor() }}> 
                            Options
                        </Typography> 
                    </FormLabel>

                    <Divider style={{ backgroundColor: getBodyColor() }} /> 
        
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <div style={{ marginTop: '7.5px', marginRight: '5px' }}> 
                            <Tooltip 
                                arrow
                                enterDelay={500} 
                                title={
                                    <Typography variant="caption" color="primary">
                                        Shorten URL (4 Characters)
                                    </Typography>
                                }
                            >  
                                <FormControlLabel
                                    value="SHORT"
                                    control={
                                        <RadioA />
                                    }
                                    label={
                                        <Typography 
                                        variant="overline" 
                                        style={{ fontSize: '8px' }}
                                        > 
                                            SHORT 
                                        </Typography>
                                    }
                                    labelPlacement="bottom"
                                />
                            </Tooltip> 
                        </div>
                            
                        <div style={{ marginTop: '7.5px', marginRight: '5px' }}> 
                            <Tooltip 
                                arrow
                                enterDelay={500} 
                                title={
                                    <Typography variant="caption" color="primary">
                                        Generate an Unguessable URL (16 Characters)
                                    </Typography>
                                }
                            >  
                                <FormControlLabel
                                    value="UNGUESSABLE"
                                    control={
                                        <RadioB />
                                    }
                                    label={
                                        <Typography 
                                            variant="overline" 
                                            style={{ fontSize: '8px' }}
                                        > 
                                            CRYPTIC 
                                        </Typography>
                                    }
                                    labelPlacement="bottom"
                                />
                            </Tooltip>
                        </div>
                    </div>

                </div>  
            </Paper>
        </StyledToggleButtonGroup> 
    );
 }

 export default ModeSelector;