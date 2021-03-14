import React from 'react';

import Box from '@material-ui/core/Box'; 
import { makeStyles } from '@material-ui/core/styles'; 

import Footer from './Footer';
import Header from './Header';

import Container from '@material-ui/core/Container'; 

const useStyles = makeStyles({
    root: {
       
    },
    header: {
        height: '25%',

    },
    footer: {
        height: '50%', 
    },
});

const PageContainer = ({ children }) => {
    const classes =  useStyles();
    
    return (
        <React.Fragment> 
            <Container maxWidth="lg" style={{ backgroundColor: 'efefef'}}>
                <Header /> 
                    <Box height="77.5vh" display="flex" flexGrow={1}>
                        {children}
                    </Box>
                {/* <Footer className={classes.footer} /> */}
            </Container> 
        </React.Fragment>
    );
};

export default PageContainer;