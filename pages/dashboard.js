import React, { Fragment, useEffect } from 'react'; 
import { useRouter } from 'next/router';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles'; 

import PageContainer from '../components/PageContainer'; 
import ResultsDialog from '../components/ResultsDialog';
import UrlModifier from '../components/Composites/UrlModifier'; 

import { useAuth } from '../lib/auth'; 

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
    },
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
                        width="815px" 
                        height="50vh" 
                        className={classes.urlModifierSkeleton}
                    />  
                }
            </Fragment>
        </Fragment>
    ); 
}

function Dashboard() {
    const { user, loading, signout } = useAuth(); 
    const router = useRouter(); 

    useEffect(() => {
        if(!user && !loading) {
            router.push('/'); 
        }
    }, [user, loading]);

    return (
        <PageContainer> 
            <DashboardBase 
                user={user} 
                loading={loading} 
            /> 
            <ResultsDialog />
        </PageContainer> 
    );
}

export default Dashboard; 


