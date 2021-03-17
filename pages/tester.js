import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '../components/Typography'; 

import { useAuth } from '../lib/auth'; 

import PageContainer from '../components/PageContainer';
import Drawer from '../components/Drawer'; 

const useStyles = makeStyles({ 
    root: {
        backgroundColor: 'red',
    },
});

function AuthenticatedContent({ user }) {
    const [data, setData] = useState("Hello"); 

    return (
        <Box flexDirection="column">
            
            <Typography variant="h1" color="textSecondary"> 
                Hi, {user.email}
            </Typography> 

        </Box> 
    );
}

function Tester() {    

    const classes = useStyles();

    const { user, loading, signout } = useAuth(); 

    if(!loading && !user) {
        Router.push('/'); 
    }

    return (
        <React.Fragment> 
             <Box bgcolor="white" display="flex" flexDirection="column" alignContent="center" justifyContent="space-evenly"> 
                { user ? 
                    (   
                      <PageContainer> 
                          <Drawer /> 
                      </PageContainer>
                    )
                    : 
                    ( 
                        null
                    )
                }
            </Box> 
        </React.Fragment>
    )
}

export default Tester; 