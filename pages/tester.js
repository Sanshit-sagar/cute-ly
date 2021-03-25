import React, { 
    Fragment, 
    useState, 
    useReducer, 
    createContext 
} from 'react'; 

import { Grid, Paper, Typography } from '@material-ui/core';
import PageContainer from '../components/PageContainer';


function TesterClass() {
    return (
        <PageContainer>
            <Grid container>
                <Paper elevation={10}>
                    
                </Paper>
            </Grid>
        </PageContainer>
    );
}

export default TesterClass;