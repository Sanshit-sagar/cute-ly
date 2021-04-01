import React from 'react'; 
import Router from 'next/router';

import { makeStyles } from '@material-ui/core/styles'; 
import { Grid, Paper, Typography, Divider } from '@material-ui/core';

import { useAuth } from '../lib/auth';
import { useCount } from '../components/SharedContext';

import PageContainer from '../components/PageContainer'; 
import ResultsDialog from '../components/ResultsDialog';
import UrlModifier from '../components/Composites/UrlModifier'; 

const useStyles = makeStyles((theme) => ({
    paperHeader: {
        padding: '5px',
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        alignItems: 'flex-start',
    },
    paper: {
        padding: '5px',
        marginTop: theme.spacing(2),
        border: '1px solid',
        borderColor: '#1eb980',
        marginBottom: '10px',
    },
    divider: {
        backgroundColor: '#1eb980', 
        marginLeft: '20px', 
        marginRight: '20px',
    },
}));

function Dashboard () {
    const classes = useStyles(); 
    const { user, loading } = useAuth(); 
    const [state, dispatch] = useCount();

    if(!user && !loading) {
        Router.push('/');
    }

    //TOOD: dispatch SNACKBAR_TRIGGER with message greeting user
    
    return (
        <PageContainer> 
            <div className={classes.paperHeader}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                    <Typography variant="h4" color="secondary" style={{ marginRight: '10px' }}> 
                        { Object.keys(state.linksMap).length }
                    </Typography>
                    <Typography variant="caption"> 
                        links
                    </Typography>
                </div>

                <Divider 
                    className={classes.divider} 
                    orientation="vertical" 
                    flexItem 
                />
            </div>
               

            <Grid container spacing={1}>
                <Grid item>
                    <Paper elevation={5} className={classes.paper}>
                        <UrlModifier />
                    </Paper>
                </Grid>
            </Grid>

            <ResultsDialog /> 
        </PageContainer>
    ); 
}

export default Dashboard; 


