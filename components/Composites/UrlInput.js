import React, { Fragment, useState, useEffect } from 'react'; 
import { makeStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import LanguageIcon from '@material-ui/icons/Language';

import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper'; 

import { useCount } from '../SharedContext'; 

const useStyles = makeStyles((theme) => ({
    urlInput: {
        borderRadius: '5px', 
        marginBottom: '5px',
        marginTop: '5px',
        height: '62.5px',
        backgroundColor: 'white',
    },
    paper: {
        padding: theme.spacing(1),
        backgroundColor: 'white',
    },
})); 

const UrlInput = () => {
    const classes = useStyles(); 
    const [state, dispatch] = useCount(); 

    const validUrlPattern =  /^https?:\/\/([\w\d\-]+\.)+\w{2,}(\/.+)?$/;
    
    return (
        <FormControl fullWidth variant="filled">
            <div className={classes.smallGap}> 
                <InputLabel style={{ marginTop: '10px' }}>
                    Destination URL 
                </InputLabel>
                <Paper elevation={5} className={classes.paper}>
                    <FilledInput
                        fullWidth
                        id="filled-adornment-amount"
                        value={state.url}
                        onChange={(e) => dispatch({ type: 'UPDATE_URL', payload: (e)})}
                        color="secondard"
                        variant="outlined"
                        placeholde="Enter or Type a Valid URL"
                        error={state.url.length > 0 && !validUrlPattern.test(state.url)}
                        autoComplete="off"
                        endAdornment = {
                            <InputAdornment 
                                position="end"
                            >
                                <LanguageIcon />
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