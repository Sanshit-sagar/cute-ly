import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  link: {
    margin: theme.spacing(1,1.5),
  },
}));

export default function Index() {
  const classes = useStyles();

  return (
    <div className={classes.footer}> 
    <Container maxWidth="sm">
      <Box my={4}>

        <Typography variant="h1"> cute.ly  </Typography> 
        <Typography variant="h5"> brand your links, cutely </Typography>
       
        
      </Box>
    </Container>
    </div>
  );
}