import React from 'react'; 

import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CustomInput from '../Composites/CustomInput'; 

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: '#fff',
        margin: '5px'
    },
}));

const AndroidAnalyticsForm = ({ state, dispatch }) => {
    const classes = useStyles();

    const handleInputChange = (inputValue, inputName) => {
        dispatch({ 
            type: "UPDATE_INPUT", 
            payload: {
                name: inputName, 
                value: inputValue
            }
        });
    }

    return (
        <Paper elevation={5} className={classes.paper}>
            <Grid 
                container
                direction="row"
                justify="space-evenly"
                alignItems="center"
                wrap='wrap'
                spacing={2}
            > 
                <Grid item>
                    <Paper elevation={3}  className={classes.paper}>
                        <CustomInput
                            name="input1"
                            label="Input 1"
                            value={state.input1}
                            handleChange={handleInputChange}
                        /> 
                    </Paper>
                </Grid> 
                <Grid item> 
                    <Paper elevation={3} className={classes.paper}>
                        <CustomInput
                            name="input2"
                            label="Input 2"
                            value={state.input2}
                            handleChange={handleInputChange}
                        /> 
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper elevation={3} className={classes.paper}>
                        <CustomInput
                            name="input3"
                            label="Input 3"
                            value={state.input3}
                            handleChange={handleInputChange}
                        /> 
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default AndroidAnalyticsForm; 