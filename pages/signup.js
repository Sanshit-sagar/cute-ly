import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '../components/Button';
import TextField from '../components/TextField';
import Link from '../components/Link';
import Grid from '@material-ui/core/Grid';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';

import { useAuth } from '../lib/auth';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(10),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(3),
      backgroundColor: theme.palette.secondary.main,
    },
    title: {
      width: '100%', 
      height: '100%',
      marginBottom: theme.spacing(8),
      textAlign: 'center',
    },
    submit: {
      margin: theme.spacing(5, 0, 5, 0),
    },
  }));
  
  export default function SignUp() {
    const classes = useStyles();

    const [email, setEmail] =  useState(""); 
    const [password, setPassword] = useState(""); 
    const [firstName, setFirstName] = useState(""); 
    const [lastName, setLastName] = useState("");

    const auth = useAuth(); 

    return (
      <Container component="main" maxWidth="xs">
       
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className={classes.title}>
            sign up
          </Typography>
         
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={lastName} 
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </Grid>

              <Grid item xs={12}>
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              size="large"
              variant="outlined"
              color="primary"
              onClick={(e) => auth.signupWithEmailAndPassword(email, password, '/dashboard')}
              className={classes.submit}
            >
              Sign Up
            </Button>

            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
       
        </div>
      </Container>
    );
  }