import React from 'react';

import Router from 'next/router'; 
import Button from './Button'; 
import Divider from '@material-ui/core/Divider'; 
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper'; 
import Typography from '@material-ui/core/Typography';

import { useAuth } from '../lib/auth'; 
import { useCount } from './SharedContext';  
import { Loading } from '../icons/icons'; 
import { makeStyles } from '@material-ui/core/styles'; 

import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import DarkModeButton from './DarkModeButton'; 
import ProfileButton from './ProfileButton'; 

const useStyles = makeStyles({
  root: {
    height: '100%',
  },
  cardContainer: {
    paddingTop: '5px', 
    marginTop: '15px', 
    height: '10vh',
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  profileInfo: {
    border: 'thin solid black', 
    borderRadius: '5px', 
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
  },
});

export function Signout() {
  const auth = useAuth(); 

  const handleSignOut = () => {
      auth.signout().then(() => {
          Router.push('/'); 
      })
  }

  return (
      <Button 
        color="secondary" 
        onClick={handleSignOut}> 
         <PowerSettingsNewIcon 
          color="secondary" 
        />
      </Button>
  )
}


const Header = ({ props }) => {
  const classes = useStyles(); 
  const [state, dispatch] = useCount(); 
  const { user, loading, signout } = useAuth();

  return (
    <Container className={classes.cardContainer}>
        <Typography 
          variant="overline" 
          color="primary" 
          style = {{ fontSize: '32px' }}
        > 
          cute.ly
        </Typography>

        
          <Paper className={classes.profileInfo}> 
            { user ? ( 
              <React.Fragment> 
                <DarkModeButton />
                  
                  <Divider orientation="vertical" flexItem  />
                   
                      <ProfileButton />
                   
                  <Divider orientation="vertical" flexItem /> 

                <Signout /> 
              </React.Fragment> 
            ) 
            : 
              <Loading /> 
            } 

          </Paper> 
      </Container>
  )
};

export default Header;
