import React, { useState } from 'react';

import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'; 

import { makeStyles, withStyles } from '@material-ui/core/styles'; 

import { useCount } from '../SharedContext'; 

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(1),
    },
    container: {
        display: 'flex', 
        flexDirection: 'column', 
    },
    selector: {
        marginTop: theme.spacing(1),
        border: 'thin solid',
        borderColor: theme.palette.primary.main,
        borderRadius: '5px',
        padding: theme.spacing(0.25),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        color: theme.palette.primary.main,
    },
    selectionText: {
        margin: theme.spacing(1),
        border: 'thin solid',
        borderColor: theme.palette.primary.main,
        borderRadius: '5px',
    },
    menuItem: {
        borderRadius: '2.5px',
        color: theme.palette.primary.main,
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

const MinimalSelect = ({ state, dispatch, triggerSnackbar }) => {
    const classes = useStyles();
    const [val,setVal] = useState("SHORT");
  
    const handleChange = (event) => {
      dispatch({
        type: "UPDATE_MODE",
        payload: {
            value: event.target.value,
        }
      });
      setVal(event.target.value);

      triggerSnackbar({ 
        message: 'Updated Mode to: ' + event.target.value,
        variant: 'success',
      });
    };
  
    const menuProps = {
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left"
      },
      transformOrigin: {
        vertical: "top",
        horizontal: "left"
      },
      getContentAnchorEl: null
    };
  
  
    return (
      <FormControl>
        <Select
          disableUnderline
          disabled={!validUrlPattern.test(state.url) || state.url.length === 0}
          MenuProps={menuProps}
          value={val}
          onChange={handleChange}
          className={classes.selector}
          style={{ backgroundColor: state.dark ? '#000' : '#fff', color: '#1eb980' }}
        >
            <MenuItem value="SHORT" className={classes.menuItem}> 
                <Typography variant="caption" style={{ color: !validUrlPattern.test(state.url) ? 'gray' : '#1eb980'}}>
                    SHORTEN
                </Typography> 
            </MenuItem>
            <MenuItem value="UNGUESSABLE" className={classes.menuItem}> 
                <Typography variant="caption" style={{ color: !validUrlPattern.test(state.url) ? 'gray' : '#1eb980'}}>
                    ENCRYPT
                </Typography> 
            </MenuItem>
        </Select>
      </FormControl>
    );
  };

const ModeSelector = ({ triggerSnackbar }) => {
    const classes = useStyles(); 
    const [state, dispatch] = useCount(); 

    return (
        <StyledToggleButtonGroup url={state.url}>
          <Paper elevation={0} className={classes.paper}>
                <div className={classes.container}>
                    <FormLabel component="legend" style={{ marginLeft: '5px' }}> 
                        <Typography 
                            variant="overline" 
                            style={{ color: !validUrlPattern.test(state.url) ? 'gray' : '#1eb980' }}
                        > 
                            Type
                        </Typography> 
                    </FormLabel>
                    
                    <Divider 
                        style={{ backgroundColor: !validUrlPattern.test(state.url) ? 'gray' : '#1eb980' }} 
                    /> 
                    
                    <MinimalSelect 
                      state={state} 
                      dispatch={dispatch} 
                      triggerSnackbar={triggerSnackbar} 
                    />
                </div>
            </Paper>
        </StyledToggleButtonGroup> 
    );
 }

 export default ModeSelector;