import React, { Fragment } from 'react'; 
import Router from 'next/router';

import { makeStyles } from '@material-ui/core/styles'; 
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'; 

import Skeleton from '@material-ui/lab/Skeleton'; 

import { useAuth } from '../lib/auth';
import PageContainer from '../components/PageContainer';
import ResultsDialog from '../components/ResultsDialog'; 
import CustomDataGrid from '../components/DataGrid/CustomDataGrid';
import { RealtimeProvider } from '../utils/useFirebaseRealtime';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: theme.spacing(1),
        border: 'thin solid',
        borderColor: theme.palette.primary.main,
    },
    dataGridSkeleton: {
        marginTop: '10px', 
        marginRight: '15px',
    },
})); 

const AnalyticsBase = ({ user, loading }) => {
    const classes = useStyles();

    return (
        <Fragment>
            <Typography 
                color="primary"
                variant="h1" 
                component="h1" 
                className={classes.title}
            >
                Analytics
            </Typography>

            <Fragment>
                { 
                        user && !loading 
                    ?
                        <Paper elevation={10} className={classes.container}>
                            <RealtimeProvider>
                                <CustomDataGrid user={user} />
                            </RealtimeProvider>
                        </Paper>
                    : 
                        <Skeleton 
                            variant="rect" 
                            width="1325px" 
                            height="65vh" 
                            className={classes.dataGridSkeleton}
                        />  
                }
            </Fragment>

            <ResultsDialog /> 
        </Fragment>
    ); 
}

function Analytics() {
    const { user, loading } = useAuth(); 

    if(!user && !loading) {
        Router.push('/'); 
    }

    return (
        <PageContainer>
            <AnalyticsBase user={user} loading={loading} />
        </PageContainer>
    );
}

export default Analytics; 