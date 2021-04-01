import React from 'react'; 

import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CustomInput from '../Composites/CustomInput'; 

const useStyles = makeStyles((theme) => ({
    paper: {
        border: '1px solid',
        borderColor: '#1eb980',
        padding: theme.spacing(2),
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
        <Grid container spacing={1}>
            <Paper elevation={5} className={classes.paper}>
                <Grid 
                    container
                    direction="row"
                    justify="space-around"
                    wrap='wrap'
                    spacing={4}
                >
                    <Grid item>
                        <CustomInput
                            name="bundleId"
                            label="Bundle ID"
                            description="The bundle ID of the iOS app to use to open the link. The app must be connected to your project from the Overview page of the Firebase console. Required for the Dynamic Link to open an iOS app."
                            value={state.ios.bundleId}
                            handleChange={handleInputChange}
                        /> 
                    </Grid> 
                    <Grid item> 
                        <CustomInput
                            name="fallbackLink"
                            label="Fallback Link"
                            description="The link to open when the app isn't installed. Specify this to do something other than install your app from the App Store when the app isn't installed, such as open the mobile web version of the content, or display a promotional page for your app."
                            value={state.ios.fallbackLink}
                            handleChange={handleInputChange}
                        /> 
                    </Grid>
                    <Grid item>
                        <CustomInput
                            name="ipadBundleId"
                            label="iPad Bundle ID"
                            description="The bundle ID of the iOS app to use on iPads to open the link. The app must be connected to your project from the Overview page of the Firebase console."
                            value={state.ios.ipadBundleId}
                            handleChange={handleInputChange}
                        /> 
                    </Grid>
                    <Grid item>
                        <CustomInput
                            name="ipadFallbackLink"
                            label="iPad Fallback Link"
                            description="The link to open on iPads when the app isn't installed. Specify this to do something other than install your app from the App Store when the app isn't installed, such as open the web version of the content, or display a promotional page for your app."
                            value={state.ios.ipadFallbackLink}
                            handleChange={handleInputChange}
                        /> 
                    </Grid>
                    <Grid item>
                        <CustomInput
                            name="appStoreId"
                            label="App Store ID"
                            description="Your app's App Store ID, used to send users to the App Store when the app isn't installed"
                            value={state.ios.appStoreId}
                            handleChange={handleInputChange}
                        /> 
                    </Grid>
                    <Grid item>
                        <CustomInput
                            name="customScheme"
                            label="Custom Scheme"
                            description="Your app's custom URL scheme, if defined to be something other than your app's bundle ID"
                            value={state.ios.customScheme}
                            handleChange={handleInputChange}
                        /> 
                    </Grid>
                </Grid>
            </Paper>
        </Grid> 
    );
}

export default AppleForm; 