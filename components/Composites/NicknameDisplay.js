import React from 'react';

import { 
    Grid, 
    Paper, 
    IconButton, 
    FilledInput, 
    InputAdornment, 
    FormControl, 
    InputLabel
} from '@material-ui/core'; 

import { makeStyles } from '@material-ui/core/styles'; 
import InfoIcon from '@material-ui/icons/Info';

import { useCount } from '../SharedContext';

const useStyles = makeStyles((theme) => ({
    nameInput: {
        borderRadius: '5px',
    },
})); 

const NicknameDisplay = () => {
    const classes = useStyles(); 
    const [state, dispatch] = useCount();

   const handleChange = (inputValue) => {
       const sanitizedValue = sanitizeInput(inputValue);

       dispatch({
           type: "UPDATE_NICKNAME",
           payload: {
               value: sanitizedValue,
           },
       });
   }

   const handleInfoButtonClick = () => {
       alert('Info Button Clicked'); 
   }

   const sanitizeInput = (input) => {
       if(input.charAt(input.length-1) === ' ') {
           return input.substring(0, input.length-1);
       } else if(input.length > 20) {
           return input.substring(0, 20);
       }
       return input; 
   }
   const validUrlPattern =  /^https?:\/\/([\w\d\-]+\.)+\w{2,}(\/.+)?$/;

    const getInputColor = () => {
        return (!validUrlPattern.test(state.url) ? 'black' :  '#1eb980'); 
    }

    const getInputHeaderColor = () => {
        return (!validUrlPattern.test(state.url) ? 'gray' : (!state.nickname.length ? '#1eb980' : (state.dark ? '#fff' : '#000')));  
    }

   return (
       <Grid container direction="row" justify="space-between" spacing={1}>
           <Grid item>
                <FormControl fullWidth variant="filled">
                    <Paper elevation={0} style={{ border: 'thin solid', borderColor: '#1eb890' }}>
                        <InputLabel style={{ color: getInputHeaderColor() }}>
                            Nickname
                        </InputLabel>

                        <FilledInput
                            name="urlInput"
                            variant="outlined"
                            disabled={!validUrlPattern.test(state.url)}
                            value={state.nickname}
                            size="small"
                            margin="dense"
                            autoComplete="off"
                            onChange={(e) => handleChange(e.target.value)}
                            InputProps={{
                                endAdornment: 
                                    <InputAdornment position="end">
                                        <IconButton 
                                            margin="dense" 
                                            onClick={() => handleInfoButtonClick()}
                                        >
                                            <InfoIcon />
                                        </IconButton>
                                    </InputAdornment>,
                            }}
                            className={classes.nameInput}
                            style={{ color: getInputColor() }}
                        />
                    </Paper> 
                </FormControl>
           </Grid>
       </Grid>
   );
}

export default NicknameDisplay; 