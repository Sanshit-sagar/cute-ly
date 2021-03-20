import React from 'react';; 
import { Box, Container, Typography } from '@material-ui/core'; 
import Landing from './landing'; 

export default function Index() {
  
  return (
      <React.StrictMode>
        <Container maxWidth="lg">
          <Landing /> 
        </Container>
      </React.StrictMode>
    );
}