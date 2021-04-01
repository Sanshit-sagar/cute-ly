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
                            name="imageLink"
                            label="Social Image Link"
                            description="The URL to an image related to this link."
                            value={state.meta.imageLink}
                            handleChange={handleInputChange}
                        /> 
                    </Grid> 
                

                    <Grid item> 
                        <CustomInput
                            name="description"
                            label="Social Description"
                            description="The description to use when the Dynamic Link is shared in a social post."
                            value={state.meta.description}
                            handleChange={handleInputChange}
                        /> 
                    </Grid>

                    <Grid item>
                        <CustomInput
                            name="title"
                            label="Social Title"
                            description="The title to use when the Dynamic Link is shared in a social post."
                            value={state.meta.title}
                            handleChange={handleInputChange}
                        /> 
                    </Grid>

                </Grid>
            </Paper>
        </Grid>
    );
}

export default MetaForm; 