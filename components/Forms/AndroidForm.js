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

const AndroidForm = ({ state, dispatch }) => {
    const classes = useStyles();

    const handleInputChange = (inputValue, inputName) => {
        dispatch({ 
            type: "UPDATE_INPUT_ANDROID", 
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
                    spacing={3}
                >
                    <Grid item>
                        <CustomInput
                            name="fallbackLink"
                            label="Fallback Link"
                            description="The link to open when the app isn't installed. Specify this to do something other than install your app from the Play Store when the app isn't installed, such as open the mobile web version of the content, or display a promotional page for your app."
                            value={state.android.fallbackLink}
                            handleChange={handleInputChange}
                        /> 
                    </Grid> 

                    <Grid item> 
                        <CustomInput
                            name="packageName"
                            label="Package Name"
                            description="The package name of the Android app to use to open the link. The app must be connected to your project from the Overview page of the Firebase console. Required for the Dynamic Link to open an Android app."
                            value={state.android.packageName}
                            handleChange={handleInputChange}
                        /> 
                    </Grid>

                    <Grid item>
                        <CustomInput
                            name="minPackageVersionCode"
                            label="Version Code"
                            description="The versionCode of the minimum version of your app that can open the link. If the installed app is an older version, the user is taken to the Play Store to upgrade the app."
                            value={state.android.minPackageVersionCode}
                            handleChange={handleInputChange}
                        /> 
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}

export default AndroidForm; 