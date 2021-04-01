import React, { Fragment } from 'react';

import { 
    Grid, 
    FilledInput, 
    Tooltip, 
    FormControl,
    InputLabel,
    Typography,
    InputAdornment,
} from '@material-ui/core';
import Zoom from '@material-ui/core/Zoom';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import InfoIcon from '@material-ui/icons/Info'; 

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: '5px', 
        color: theme.palette.primary.main,
        height: '45px',
    },
}));


const CustomTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.background.tooltip,
      color: theme.palette.primary.main,
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
      marginTop: '10px',
    },
  }))(Tooltip);

const CustomInput = ({ name, label, value, description, handleChange }) => {
    const classes = useStyles(); 

    const getInputHeaderColor = () => {
        return !value.length ? '#1eb980' : '#fff'; 
    }
    
    return (
        <Grid container direction="column">
            <Grid item>
                <FormControl variant="outlined">
                    <InputLabel 
                        style={{ color: getInputHeaderColor() }}
                    >
                        {label} 
                    </InputLabel>
                    <FilledInput 
                        className={classes.root}
                        color="primary"
                        margin="dense"
                        value={value}
                        onChange={(e) => handleChange(e.target.value, name)}
                        endAdornment = {
                            <InputAdornment 
                                position="end"
                            >
                                <CustomTooltip 
                                    TransitionComponent={Zoom}
                                    arrow
                                    title={
                                        <Fragment>
                                            <Typography 
                                                color="inherit"
                                            >
                                                {label}
                                            </Typography>
                                            <Typography 
                                                variant="caption"
                                                color="textPrimary"
                                            >
                                                {description} 
                                            </Typography>
                                        </Fragment>
                                    }
                                >
                                    <InfoIcon />
                                </CustomTooltip>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Grid>
        </Grid>
    );
}

export default CustomInput; 