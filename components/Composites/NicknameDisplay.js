import React from 'react';

import { 
    Grid, Paper, TextField, Button, IconButton, 
    Typography, SvgIcon, InputAdornment
} from '@material-ui/core'; 
import { makeStyles } from '@material-ui/core/styles'; 

import AddIcon from '@material-ui/icons/Add'; 
import InfoIcon from '@material-ui/icons/Info';

import { useCount } from '../SharedContext';
import { createLink } from '../../lib/db'; 


const NicknameDisplay = () => {
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
           //dispatch snackbar here 
           return input.substring(0, 20);
       }
       return input; 
   }

   return (
       <Grid container direction="row" justify="space-between" spacing={1}>
           <Grid item>
               <TextField
                   name="urlInput"
                   variant="outlined"
                   color="primary"
                   value={state.nickname}
                   placeholder="@NameMe"
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
                   style={{ backgroundColor: '#fff', borderRadius: '5px' }}
               />
           </Grid>
       </Grid>
   );
}

export default NicknameDisplay; 