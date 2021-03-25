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
        backgroundColor: '#fff',
        padding: theme.spacing(0.3),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1),
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


const RadioA = () => {
    const [state, dispatch] = useCount();
  
    return (
        <Radio 
            color="primary"
            value="SHORT"
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

const ModeSelector = () => {
    const classes = useStyles(); 

    return (
        <StyledToggleButtonGroup>
          <Paper elevation={5} className={classes.buttonGroupPaper}>
                <div style = {{ display: 'flex', flexDirection: 'column' }}>
                    <FormLabel component="legend" style={{ marginLeft: '15px', marginTop: '6px'}}> 
                        <Typography variant="overline"> 
                            Options
                        </Typography> 
                    </FormLabel>

                    <Divider /> 
        
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <div style={{ marginTop: '17.5px', marginRight: '5px' }}> 
                            <Tooltip title="Short format (4 chars)"> 
                                <FormControlLabel
                                    value="SHORT"
                                    control={<RadioA color="primary" />}
                                    label={
                                        <Typography 
                                        variant="overline" 
                                        style={{ fontSize: '10px' }}
                                        > 
                                            SHORT 
                                        </Typography>
                                    }
                                    labelPlacement="bottom"
                                />
                            </Tooltip> 
                        </div>
                            
                        <div style={{ marginTop: '17.5px',marginRight: '5px' }}> 
                            <Tooltip title="Unguessable format (16 chars)">
                                <FormControlLabel
                                    value="UNGUESSABLE"
                                    control={
                                        <RadioB color="primary" />
                                    }
                                    label={
                                        <Typography 
                                            variant="overline" 
                                            style={{ fontSize: '10px' }}
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