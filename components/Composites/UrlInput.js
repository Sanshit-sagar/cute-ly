import React from 'react'; 
import { makeStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import HttpIcon from '@material-ui/icons/Http';

import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper'; 

import { useCount } from '../SharedContext'; 

const useStyles = makeStyles((theme) => ({
    urlInput: {
        borderRadius: '5px',
        height: '62.5px',
    },
    paper: {
        // padding: theme.spacing(1),
    },
})); 

const UrlInput = () => {
    const classes = useStyles(); 
    const [state, dispatch] = useCount(); 

    const validUrlPattern =  /^https?:\/\/([\w\d\-]+\.)+\w{2,}(\/.+)?$/;

    const getInputColor = () => {
        return '#1eb980'; 
    }
    const getInputHeaderColor = () => {
        return state.dark ? '#fff' : '#000'; 
    }
    
    return (
        <FormControl fullWidth variant="filled">
            <div className={classes.smallGap}> 
                <InputLabel style={{ color: getInputHeaderColor() }}>
                    Destination URL 
                </InputLabel>
                <Paper elevation={0} className={classes.paper}>
                    <FilledInput
                        fullWidth
                        id="filled-adornment-amount"
                        value={state.url}
                        onChange={(e) => dispatch({ type: 'UPDATE_URL', payload: (e)})}
                        color="primary"
                        variant="outlined"
                        placeholde="Enter or Type a Valid URL"
                        error={!validUrlPattern.test(state.url) && state.url.length > 0}
                        autoComplete="off"
                        endAdornment = {
                            <InputAdornment 
                                position="end"
                            >
                                <HttpIcon style={{ fontSize: '48px' }} />
                            </InputAdornment>
                        }
                        className={classes.urlInput}
                        style={{ color: getInputColor() }}
                    />
                </Paper>
            </div>
        </FormControl>
    ); 
}

export default UrlInput; 