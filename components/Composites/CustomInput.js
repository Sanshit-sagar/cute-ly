import React from 'react';

import { 
    Grid, 
    TextField, 
    FormHelperText, 
    Tooltip, 
    IconButton 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '5px',
        marginLeft: '5px',
        marginRight: '5px',
    },
}));

const CustomInput = ({ name, label, value, handleChange }) => {
    const classes = useStyles(); 
    
    return (
        <div style={{ marginTop: '10px' }}>
            <Grid container direction="column">
                <Grid item>
                    <TextField 
                        className={classes.root}
                        variant="outlined"
                        color="primary"
                        label={label} 
                        value={value}
                        size="medium"
                        margin="normal"
                        onChange={(e) => handleChange(e.target.value, name)}
                    />
                </Grid>
                <Grid 
                    container
                    direction="row"
                    justify="space-between"
                >
                    <Grid item>
                        <FormHelperText style={{ marginLeft: '6.5px' }}> 
                            Helper for {label}
                        </FormHelperText>
                    </Grid>
                    <Grid item> 
                        <Tooltip title="What's this?">
                            <IconButton 
                                size="small"
                                color="default"
                                style={{ marginRight: '2.25px' }}
                            >
                                <HelpOutlineOutlinedIcon /> 
                            </IconButton> 
                        </Tooltip>
                    </Grid> 
                </Grid>
            </Grid>
        </div>
    );
}

export default CustomInput; 