import React, { Fragment } from 'react'; 
import Router from 'next/router';

import { makeStyles } from '@material-ui/core/styles'; 

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { useAuth } from '../lib/auth';
import { useCount } from '../components/SharedContext';
import { RealtimeProvider, useRealtime } from '../utils/useFirebaseRealtime'; 

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
        padding: '2px',
        marginTop: theme.spacing(2),
        border: '1px solid',
        borderColor: '#1eb980',
        marginBottom: '10px',
    },
    divider: {
        backgroundColor: '#1eb980', 
        marginLeft: '10px',
    },
    numLinksContainer: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        alignItems: 'flex-end',
    },
    numLinksText: {
        marginLeft: '10px',
        marginRight: '10px',
    },
}));

const DashboardBase = () => {
    const classes = useStyles(); 

    const [state, dispatch] = useCount();
    const { user, loading } = useAuth(); 
    const { links, linksMap, realtimeLoading, error } = useRealtime();

    if(!user && !loading) {
        Router.push('/');
    }

    //TOOD: dispatch SNACKBAR_TRIGGER with message greeting user
    
    return (
        <PageContainer> 
            { 
                !realtimeLoading 
            ?
                <Fragment>
                    <div className={classes.paperHeader}>
                        <div className={classes.numLinksContainer}>
                            <Typography variant="h4" color="secondary" className={classes.numLinksText}> 
                                {links.length}
                            </Typography>
                            <Typography variant="overline"> 
                                links
                            </Typography>
                        </div>

                        <Divider 
                            className={classes.divider} 
                            orientation="vertical" 
                            flexItem 
                        />

                        <div className={classes.numLinksContainer}>
                            <Typography variant="h4" color="secondary" className={classes.numLinksText}> 
                                12
                            </Typography>
                            <Typography variant="overline" style={{ marginTop: '7.5px', fontSize: '12px' }}> 
                                views
                            </Typography>
                        </div>
                    </div>
                    
                    <div>
                        <Grid item>
                            <Paper elevation={5} className={classes.paper}>
                                <UrlModifier />
                            </Paper>
                        </Grid>
                    </div>
                </Fragment>
            :
                null
            }

            <ResultsDialog /> 
        </PageContainer>
    ); 
}

function Dashboard() {
    return (
        <RealtimeProvider>
            <DashboardBase /> 
        </RealtimeProvider>
    );
}

export default Dashboard; 


