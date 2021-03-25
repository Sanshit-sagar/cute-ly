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

const MetaForm = ({ state, dispatch }) => {
    const classes = useStyles();

    const handleInputChange = (inputValue, inputName) => {
        dispatch({ 
            type: "UPDATE_INPUT_META", 
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
                                name="imageLink"
                                label="Social Image Link"
                                value={state.meta.imageLink}
                                handleChange={handleInputChange}
                            /> 
                        </Grid> 
                    

                        <Grid item> 
                            <CustomInput
                                name="description"
                                label="Social Description"
                                value={state.meta.description}
                                handleChange={handleInputChange}
                            /> 
                        </Grid>

                        <Grid item>
                            <CustomInput
                                name="title"
                                label="Social Title"
                                value={state.meta.title}
                                handleChange={handleInputChange}
                            /> 
                        </Grid>

                    </Grid>
                </Paper>
            </Grid>
        </Paper>
    );
}

export default MetaForm; 