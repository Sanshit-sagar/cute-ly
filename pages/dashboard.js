import React, { Fragment, useEffect } from 'react'; 
import { useRouter } from 'next/router';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles'; 
import Slide from '@material-ui/core/Slide';

import PageContainer from '../components/PageContainer'; 
import ResultsDialog from '../components/ResultsDialog';
import UrlModifier from '../components/Composites/UrlModifier';

import { useAuth } from '../lib/auth'; 
import { SnackbarProvider } from 'notistack';

const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: theme.spacing(2),
        color: theme.palette.primary.main,
    },
    container: {
       margin: theme.spacing(1),
       border: 'thin solid',
       borderColor: theme.palette.primary.main,
   },
   urlModifierSkeleton: {
        marginTop: '10px', 
        marginRight: '15px',
        borderRadius: '5px',
    },
    success: { backgroundColor: 'purple' },
    error: { backgroundColor: 'blue' },
    warning: { backgroundColor: 'green' },
    info: { backgroundColor: 'yellow' },
}));


const DashboardBase = ({ user, loading }) => {
    const classes = useStyles();

    return (
        <Fragment>
            <Typography 
                variant="h1" 
                color="primary"
                component="h1" 
                className={classes.title}
            >
                url prettifier
            </Typography>

            <Fragment>
                {
                    user && !loading  
                ?
                    <Paper 
                        elevation={5} 
                        className={classes.container}
                    >
                        <UrlModifier />
                    </Paper>
                :
                    <Skeleton 
                        variant="rect" 
                        width="1160px" 
                        height="45vh" 
                        className={classes.urlModifierSkeleton}
                    />  
                }
            </Fragment>
        </Fragment>
    ); 
}

function Dashboard() {
    const classes = useStyles();
    const { user, loading } = useAuth(); 
    const router = useRouter(); 

    useEffect(() => {
        if(!user && !loading) {
            router.push('/'); 
        }
    }, [user, loading]);

    return (
        <PageContainer> 
            <SnackbarProvider 
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                TransitionComponent={Slide}
                maxSnack={3}
                dense
                // preventDuplicate
                autoHideDuration={4000}
                classes={{
                    variantSuccess: classes.success,
                    variantError: classes.error,
                    variantWarning: classes.warning,
                    variantInfo: classes.info,
                }}
            >
                <DashboardBase 
                    user={user} 
                    loading={loading} 
                /> 
                <ResultsDialog />
            </SnackbarProvider>
        </PageContainer> 
    );
}

export default Dashboard; 


