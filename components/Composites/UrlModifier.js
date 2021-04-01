import React, { useState, useEffect } from 'react'; 

import { Grid, Paper, Button, Typography } from '@material-ui/core'; 

import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles'; 

import { useCount } from '../SharedContext';
import { createLink } from '../../lib/db'; 

import UrlInput from './UrlInput'; 
import ModeSelector from './ModeSelector'; 
import NicknameDisplay from './NicknameDisplay'; 
import TesterComponent from '../TesterComponent'; 
import OtherOptionsButtonGroup from '../OtherOptionsButtonGroup';
import SocialMediaButtonGroup from '../SocialMediaButtonGroup';
import ProgressBar from './ProgressBar';

const useStyles = makeStyles((theme) => ({
    mainContainerPaper: {
        height: '57.5vh', 
        width: '1350px',
        margin: theme.spacing(1),
    },
    paperDataGrid: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(3),
    },
    headerRow: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
    },
    urlInput: {
        border: 'thin solid', 
        borderColor: '#1eb890',
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
            style={{ marginLeft: '10px', marginTop: '5px' }}
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
            style={{ marginLeft: '10px', marginTop: '5px' }}
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
        <Grid container direction="column">
            <Grid container direction="column" justify="flex-start" alignIitems="center" wrap="nowrap" spacing={2}>

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
                    <Paper 
                        elevation={10} 
                        className={classes.urlInput}
                    >
                        <UrlInput />
                    </Paper>
                </Grid> 

                <Grid item direction="row" wrap="no-wrap">
                    <Grid container direction="row">
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
                    <Grid container direction="row" justify="flex-end" alignitems="center">
                        <Grid item> 
                           <ClearButton /> 
                        </Grid>
                        <Grid item > 
                            <SubmitButton /> 
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}  

const UrlModifier = () => {
    const classes= useStyles();

    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Grid item>
                <Paper elevation={0} className={classes.paperDataGrid}>
                    <Grid item>
                        <UrlModifierBase /> 
                    </Grid>
                </Paper>
            </Grid>
        </Grid> 
    ); 
}

export default UrlModifier;