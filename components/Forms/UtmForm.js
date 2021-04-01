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

const UtmForm = ({ state, dispatch }) => {
    const classes = useStyles();

    const handleInputChange = (inputValue, inputName) => {
        dispatch({ 
            type: "UPDATE_INPUT_UTM", 
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
                            name="campaign"
                            label="Campaign"
                            description="Google Play Analytics - Campaign. E.g. todo"
                            value={state.utm.campaign}
                            handleChange={handleInputChange}
                        /> 
                    </Grid> 
                

                    <Grid item> 
                        <CustomInput
                            name="source"
                            label="Source"
                            description="Google Play Analytics - Source. E.g. todo"
                            value={state.utm.source}
                            handleChange={handleInputChange}
                        /> 
                    </Grid>

                    <Grid item>
                        <CustomInput
                            name="medium"
                            label="Medium"
                            description="Google Play Analytics - Medium. E.g. todo"
                            value={state.utm.medium}
                            handleChange={handleInputChange}
                        /> 
                    </Grid>

                    <Grid item>
                        <CustomInput
                            name="term"
                            label="Term"
                            description="Google Play Analytics - Term. E.g. todo"
                            value={state.utm.term}
                            handleChange={handleInputChange}
                        /> 
                    </Grid>

                </Grid>
            </Paper>
        </Grid>
    );
}

export default UtmForm; 