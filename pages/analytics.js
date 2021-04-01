import React from 'react'; 
import Router from 'next/router';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core'; 

import { useAuth } from '../lib/auth';
import { RealtimeProvider, useRealtime } from '../utils/useFirebaseRealtime'; 

import CustomDataGrid from '../components/DataGrid/CustomDataGrid';
import PageContainer from '../components/PageContainer';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
    },
}));

const AnalyticsBase = ({ userData }) => {
    const classes = useStyles(); 
    const { links, linksMap, realtimeLoading, error } = useRealtime();

    return (
       <div className="root"> 
            { 
                !error 
            ?
                <Grid container spacing={1}>
                    <Grid item>
                        <Paper elevation={5} className={classes.paper}>
                            <CustomDataGrid 
                                loading={realtimeLoading}
                                userDetails={userData}
                                allLinks={links}
                                linksMap={linksMap}
                            />  
                        </Paper>
                    </Grid>
                </Grid>
            :
                <h1> Error... </h1>
            }
       </div>
    );
}

const Analytics = () => {
    const { user, loading } = useAuth(); 

    if(!user && !loading) {
        Router.push('/'); 
    }

    return (
        <PageContainer>
            {user && !loading ? 
                <RealtimeProvider>
                    <AnalyticsBase userData={user} />
                </RealtimeProvider>
            : 
                null  
            }
        </PageContainer>    
    );
}

export default Analytics; 