import React from 'react'; 

import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CustomInput from '../Composites/CustomInput'; 

const useStyles = makeStyles((theme) => ({
    paper: {
        border: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(1),
        backgroundColor: '#fff',
    },
    paperPurple: {
        border: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(2),
        backgroundColor: theme.palette.primary.dark,
    },
}));


const AppleForm = ({ state, dispatch }) => {
    const classes = useStyles();

    const handleInputChange = (inputValue, inputName) => {
        dispatch({ 
            type: "UPDATE_INPUT_IOS", 
            payload: {
                name: inputName, 
                value: inputValue
            }
        });
    }

    return (
        <Paper elevation={5} className={classes.paperPurple}>
            <Grid container spacing={1}>
                <Paper elevation={5} className={classes.paper}>
                    <Grid 
                        container
                        direction="row"
                        justify="space-around"
                        wrap='wrap'
                    >
                        <Grid item>
                            <CustomInput
                                name="bundleId"
                                label="Bundle ID"
                                value={state.ios.bundleId}
                                handleChange={handleInputChange}
                            /> 
                        </Grid> 
                        <Grid item> 
                            <CustomInput
                                name="fallbackLink"
                                label="Fallback Link"
                                value={state.ios.fallbackLink}
                                handleChange={handleInputChange}
                            /> 
                        </Grid>
                        <Grid item>
                            <CustomInput
                                name="ipadBundleId"
                                label="iPad Bundle ID"
                                value={state.ios.ipadBundleId}
                                handleChange={handleInputChange}
                            /> 
                        </Grid>
                        <Grid item>
                            <CustomInput
                                name="ipadFallbackLink"
                                label="iPad Fallback Link"
                                value={state.ios.ipadFallbackLink}
                                handleChange={handleInputChange}
                            /> 
                        </Grid>
                        <Grid item>
                            <CustomInput
                                name="appStoreId"
                                label="App Store ID"
                                value={state.ios.appStoreId}
                                handleChange={handleInputChange}
                            /> 
                        </Grid>
                        <Grid item>
                            <CustomInput
                                name="customScheme"
                                label="Custom Scheme"
                                value={state.ios.customScheme}
                                handleChange={handleInputChange}
                            /> 
                        </Grid>
                    </Grid>
                </Paper>
            </Grid> 
        </Paper>
    );
}

export default AppleForm; 