import React, { useState } from 'react'; 

import { Grid, Paper, Button, Typography } from '@material-ui/core'; 

import { makeStyles } from '@material-ui/core/styles'; 

import { useCount } from '../SharedContext';
import { createLink } from '../../lib/db'; 

import UrlInput from './UrlInput'; 
import ModeSelector from './ModeSelector'; 
import NicknameDisplay from './NicknameDisplay'; 
import TesterComponent from '../TesterComponent'; 
import OtherOptionsButtonGroup from './OtherOptionsButtonGroup';
import SocialMediaButtonGroup from './SocialMediaButtonGroup';
import ProgressBar from './ProgressBar';

const useStyles = makeStyles((theme) => ({
    headerRow: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
    },
    paperDataGrid: {
        margin: theme.spacing(1),
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'flex-end',
    },
    urlInput: {
        border: 'thin solid', 
        borderColor: '#1eb890',
        width: '100%',
    },
}));

const validUrlPattern =  /^https?:\/\/([\w\d\-]+\.)+\w{2,}(\/.+)?$/;

 function SubmitButton() {
    const [state, dispatch] = useCount(); 
    const [result, setResult] = useState(''); 
    
    const handleSubmit = async () => {
        console.log('about to create');
        const result = await createLink(state); 
        const updatedResultUrl = result.updatedUrl;

        setResult(updatedResultUrl);
    
        dispatch({
            type: "UPDATE_RESULTS",
            payload: {
                value: updatedResultUrl
            }
        });
    }

    return (
        <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            margin="normal"
            disabled={!validUrlPattern.test(state.url)}
            onClick={() => handleSubmit()}
        > 
            <Typography variant="button" color='textSecondary'> 
                Generate 
            </Typography>
        </Button>
    );
 }

 const ClearButton = () => {
    const [state, dispatch] = useCount(); 

    const handleClear = () => {
        dispatch({
            type: "CLEAR"
        });
    }

     return (
        <Button 
            variant="outlined"
            color="primary"
            size="large"
            margin="normal"
            disabled={!validUrlPattern.test(state.url)}
            onClick={() => handleClear()}
        > 
            <Typography variant="button"> 
                Clear
            </Typography>
        </Button>
     );
 }

  
const UrlModifierBase = () => {
   const classes = useStyles(); 
   const [state, dispatch] = useCount(); 

    return (
        <Paper elevation={0} className={classes.paperDataGrid}>
            <Grid container direction="column" justify="space-between" alignItems="stretch" spacing={2}>
                <Grid item>
                    <div className={classes.headerRow}>
                        <div style={{ marginRight: '25px' }}>
                            <NicknameDisplay /> 
                        </div>

                        <div style={{ flexGrow: 1, margin: '2.5px' }}>
                            <ProgressBar /> 
                        </div>
                    </div>
                </Grid>
        
                <Grid item>
                    <Paper elevation={0} className={classes.urlInput}>
                        <UrlInput />
                    </Paper>
                </Grid>
            
                <Grid item>
                    <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                        <Grid item> 
                            <ModeSelector />
                        </Grid>
                        <Grid item> 
                            <TesterComponent />
                        </Grid>

                        <Grid item> 
                            <SocialMediaButtonGroup />
                        </Grid>  

                        <Grid item>
                            <OtherOptionsButtonGroup /> 
                        </Grid>                      
                    </Grid>
                </Grid>
            
                <Grid item>
                    <Grid container direction="row" justify="flex-end" alignItems='center' spacing={2}>
                        <Grid item>
                            <ClearButton />
                        </Grid> 
                        <Grid item>
                            <SubmitButton /> 
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}  

const UrlModifier = () => {
    return (

        <Grid container direction="column" justify="center" alignIitems="center">
            <Grid item>
                <UrlModifierBase /> 
            </Grid>
        </Grid>    
    ); 
}

export default UrlModifier;