import React from 'react'; 
import Router from 'next/router';

import { makeStyles } from '@material-ui/core/styles'; 

import { useAuth } from '../lib/auth';
import { useCount } from '../components/SharedContext'; 

import SharedSnackbar from '../components/Snackbar';
import PageContainer from '../components/PageContainer'; 
import ResultsDialog from '../components/ResultsDialog';
import UrlModifier from '../components/Composites/UrlModifier'; 

function Dashboard () {
    const { user, loading } = useAuth(); 

    if(!user && !loading) {
        Router.push('/');
    }

    //TOOD: dispatch SNACKBAR_TRIGGER with message greeting user
    
    return (
        <PageContainer> 
            <UrlModifier />
            <ResultsDialog /> 
        </PageContainer>
    ); 
}

export default Dashboard; 


