import React, { Fragment } from 'react'; 
import Router from 'next/router';

import { makeStyles } from '@material-ui/core/styles'; 
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'; 
import Skeleton from '@material-ui/lab/Skeleton';
import Divider from '@material-ui/core/Divider'; 

import { useAuth } from '../lib/auth';
import PageContainer from '../components/PageContainer';
import ResultsDialog from '../components/ResultsDialog'; 
import CustomDataGrid from '../components/DataGrid/CustomDataGrid';
import { RealtimeProvider } from '../utils/useFirebaseRealtime';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: theme.spacing(1),
        border: 'thin solid',
        borderColor: theme.palette.background.header,
        borderRadius: '3px',
    },
    dataGridSkeleton: {
        marginTop: '10px', 
        marginRight: '15px',
    },
    divider: { 
        backgroundColor: theme.palette.primary.dark,
        marginBottom: '25px',
    },
})); 

const AnalyticsBase = ({ user, loading }) => {
    const classes = useStyles();

    return (
        <div style={{ marginLeft: '75px' }}>
            <Typography 
                color="primary"
                variant="h1" 
                component="h1" 
                className={classes.title}
            >
                analytics
            </Typography>

            <Divider className={classes.divider} /> 

            <Fragment>
                { 
                    user && !loading 
                ?
                    <Paper 
                        elevation={0} 
                        className={classes.container}
                    >
                        <RealtimeProvider>
                            <CustomDataGrid 
                                user={user} 
                            />
                        </RealtimeProvider>
                    </Paper>
                : 
                    <Skeleton 
                        variant="rect" 
                        width="1150px" 
                        height="65vh" 
                        className={classes.dataGridSkeleton}
                    />  
                }
            </Fragment>

            <ResultsDialog /> 
        </div>  
    ); 
}

function Analytics() {
    const { user, loading } = useAuth(); 

    if(!user && !loading) {
        Router.push('/'); 
    }

    return (
        <PageContainer>
            <AnalyticsBase 
                user={user} 
                loading={loading}
            />
        </PageContainer>
    );
}

export default Analytics; 