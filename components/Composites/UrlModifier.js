import React from 'react'; 

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import FullscreenIcon from '@material-ui/icons/Fullscreen';

import { makeStyles } from '@material-ui/core/styles'; 

import UrlInput from './UrlInput'; 
import ModeSelector from './ModeSelector'; 
import TesterComponent from '../TesterComponent'; 
import OtherOptionsButtonGroup from './OtherOptionsButtonGroup';
import DetailsButtonGroup from './DetailsButtonGroup'; 
import SocialMediaButtonGroup from './SocialMediaButtonGroup';
import ProgressBar from './ProgressBar';

import { useCount } from '../SharedContext';
import { createLink } from '../../lib/db'; 
import { useRealtime } from '../../utils/useFirebaseRealtime'; 
import { useSnackbar } from 'notistack';
import sanitizeUrlModifierInput from '../../utils/helpers/sanitizers'; 

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
    realtimeState: {
        marginLeft: theme.spacing(2),
    },
}));

const validUrlPattern =  /^https?:\/\/([\w\d\-]+\.)+\w{2,}(\/.+)?$/;

 function SubmitButton() {
    const [state, dispatch] = useCount(); 
    const { createNewLink } = useRealtime(); 
    
    const handleSubmit = async () => {
        const response = await createLink(state, state.url);

        const linkData = sanitizeUrlModifierInput(response, state);
        const resp = await createNewLink(linkData); 
    }

    return (
        <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            margin="dense"
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
            margin="dense"
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

    const { enqueueSnackbar } = useSnackbar();

    const triggerSnackbarVariant = ({ message, variant }) => {
        enqueueSnackbar(message, 
        { 
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
            },
            variant: variant,
            TransitionComponent: Slide, 
        });
    };

    const handleExpandDetails = () => {
        if(state.url && state.url.length && validUrlPattern.test(state.url)) {
            dispatch({
                type: 'SHOW_RESULTS',
                payload: {
                    value: true,
                },
            });
            triggerSnackbarVariant({ 
                message: 'displaying summary',
                variant: 'info',
            });
        } else {
            triggerSnackbarVariant({ 
                message: 'a valid URL is needed to proceed',
                variant: 'warning',
            });
        }
    }

    return (
        <Paper elevation={0} className={classes.paperDataGrid}>
            <Grid container direction="column" justify="space-between" alignItems="stretch" spacing={2}>
                <Grid item>
                    <div className={classes.headerRow}>
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
                    <Grid container direction="row" justify="flex-end" alignItems="center">
                        <Grid item> 
                            <ModeSelector triggerSnackbar={handleExpandDetails} />
                        </Grid>
                        <Grid item>
                            <DetailsButtonGroup /> 
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
                    <Grid container direction="row" justify="space-between" alignItems="center" spacing={2}>
                        <Grid item>
                            <Button 
                                disabled={!validUrlPattern.test(state.url) || !state.url.length}
                                size="small" margin="dense" variant="outlined" color="primary" onClick={handleExpandDetails}>
                                <FullscreenIcon /> 
                            </Button>
                        </Grid>
                        <Grid item>
                            <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
                                <Grid item>
                                    <ClearButton />
                                </Grid> 
                                <Grid item>
                                    <SubmitButton /> 
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}  

const UrlModifier = () => {
    return (
        
        <Grid 
            container 
            direction="row" 
            justify="flex-start" 
            alignIitems="center"
        >
            <Grid item>
            
                <UrlModifierBase /> 
            </Grid>
        </Grid>    
    ); 
}

export default UrlModifier;