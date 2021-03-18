import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// import Copyright from '../components/Copyright'; 


import Avatar from '@material-ui/core/Avatar';
import FacebookIcon from '@material-ui/icons/Facebook'; 
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';

import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';

import { useAuth } from '../lib/auth'; 

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundColor: '#efefef',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(10, 12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    width: '100%', 
    marginBottom: theme.spacing(5),
    textAlign: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const auth = useAuth(); 

  return (
    <Grid container component="main">
      {/* <CssBaseline /> */}
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography className={classes.title} component="h1" variant="h5">
            sign in
          </Typography>
         
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
              autoComplete="current-password"
            />
           
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="primary"
              className={classes.submit}
              onClick={(e) => auth.signinWithEmail(email, password, '/dashboard')}
            >
              sign in
            </Button>

            <Box height='20vh'> 
              <Grid container> 

                
                <Grid item xs> 
                  <IconButton> 
                    <FacebookIcon /> 
                  </IconButton>
                </Grid>

                <Grid item xs> 
                  <IconButton 
                    onClick={
                      () => auth.signinWithTwitter('/dashboard')
                    }
                  > 
                    <TwitterIcon /> 
                  </IconButton>
                </Grid>

                <Grid item xs> 
                  <IconButton
                    onClick={
                      () => auth.signinWithGoogle('/dashboard')
                    }
                  > 
                    <GitHubIcon /> 
                  </IconButton>
                </Grid>
              
                <Grid item xs> 
                  <IconButton
                    onClick = {
                      () => auth.signinWithGitHub('/dashboard')
                    }
                  > 
                    <SvgIcon>
                      <GitHubIcon /> 
                    </SvgIcon>
                  </IconButton>
                </Grid>
                
              </Grid>
            </Box>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>

              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
{/* 
            <Box mt={5}>
              <Copyright />
            </Box> */}
        </div>
      </Grid>
    </Grid>
  );
}