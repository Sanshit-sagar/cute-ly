import React, { Fragment } from 'react'; 
import Router from 'next/router';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
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
   }
}));

const DashboardBase = () => {
    const classes = useStyles();

    return (
        <Fragment>
            <Typography 
                variant="h1" 
                color="primary"
                component="h1" 
                className={classes.title}
            >
                URL Prettifier
            </Typography>
            <Paper elevation={10} className={classes.container}>
                <UrlModifier />
            </Paper>
        </Fragment>
    ); 
}

function Dashboard() {
    const { user, loading } = useAuth(); 

    if(!user && !loading) {
        Router.push('/'); 
    }

    return (
        <PageContainer> 
            <Fragment>
                {
                    user && !loading  
                ?
                    <DashboardBase /> 
                :
                    null
                }
            </Fragment>
            <ResultsDialog />
        </PageContainer> 
    );
}

export default Dashboard; 


