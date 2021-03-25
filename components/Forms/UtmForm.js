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
                                name="campaign"
                                label="Campaign"
                                value={state.utm.campaign}
                                handleChange={handleInputChange}
                            /> 
                        </Grid> 
                    

                        <Grid item> 
                            <CustomInput
                                name="source"
                                label="Source"
                                value={state.utm.source}
                                handleChange={handleInputChange}
                            /> 
                        </Grid>

                        <Grid item>
                            <CustomInput
                                name="medium"
                                label="Medium"
                                value={state.utm.medium}
                                handleChange={handleInputChange}
                            /> 
                        </Grid>

                        <Grid item>
                            <CustomInput
                                name="term"
                                label="Term"
                                value={state.utm.term}
                                handleChange={handleInputChange}
                            /> 
                        </Grid>

                    </Grid>
                </Paper>
            </Grid>
        </Paper>
    );
}

export default UtmForm; 