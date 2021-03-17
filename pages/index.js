import React from 'react';; 
import { Box, Container, Typography } from '@material-ui/core'; 

export default function Index() {
  
  return (
      <React.StrictMode>
        <Container maxWidth="lg">
          <Box my={4}>
            <Typography variant="h1"> cute.ly  </Typography> 
            <Typography variant="h3"> brand your links, cutely </Typography>
          </Box>
        </Container>
      </React.StrictMode>
    );
}