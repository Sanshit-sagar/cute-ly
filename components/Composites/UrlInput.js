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
        color: theme.palette.primary.main,
    },
})); 

const UrlInput = () => {
    const classes = useStyles(); 
    const [state, dispatch] = useCount(); 

    const validUrlPattern =  /^https?:\/\/([\w\d\-]+\.)+\w{2,}(\/.+)?$/;

    const getInputHeaderColor = () => {
        return state.dark ? '#fff' : '#000'; 
    }
    
    return (
        <FormControl fullWidth variant="filled">
            <div className={classes.smallGap}> 
                <InputLabel style={{ color: getInputHeaderColor() }}>
                    Destination URL 
                </InputLabel>
                <Paper elevation={0}>
                    <FilledInput
                        id="filled-adornment-amount"
                        fullWidth
                        value={state.url}
                        color="primary"
                        variant="outlined"
                        placeholde="Enter or Type a Valid URL"
                        error={!validUrlPattern.test(state.url) && state.url.length > 0}
                        onChange={
                            (e) => dispatch({ 
                                    type: 'UPDATE_URL', 
                                    payload: (e)
                                })
                        }
                        autoComplete="off"
                        endAdornment = {
                            <InputAdornment 
                                position="end"
                            >
                                <HttpIcon style={{ fontSize: '48px' }} />
                            </InputAdornment>
                        }
                        className={classes.urlInput}
                    />
                </Paper>
            </div>
        </FormControl>
    ); 
}

export default UrlInput; 