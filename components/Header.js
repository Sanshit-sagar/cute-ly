import React, { useState } from 'react';

import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Button from './Button'; 
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider'; 
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper'; 

import TextField from '@material-ui/core/TextField'; 
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import AssessmentIcon from '@material-ui/icons/Assessment';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness2Icon from '@material-ui/icons/Brightness2';

import { makeStyles } from '@material-ui/core/styles'; 

import { useAuth } from '../lib/auth'; 

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
    "&:hover, &:focus": {
      opacity: 0.7, 
    },
  },
  responsiveButton: {
    height: '8vh', 
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between'
    // onMouseEnter={() => handleMouseEnter()} 
    // onMouseLeave={() => handleMouseLeave()}
  },
});   

const HeaderLink = ({ href, children }) => {
  return (
    <Link href={href} mr={4} fontWeight='light'>
        <Button variant="primary" color="primary" passHref style={{ marginRight: '10px', borderRadius: '5px' }}>
          { children }
        </Button>
     </Link>
  );
};

const Header = ({ props }) => {
  const classes = useStyles(); 
  const [open, setOpen] = useState(false);

  const handleSwitchToggle = () => {
    const isCurrentlyOpen = open; 
    if(isCurrentlyOpen) {
      console.log('Toggle to closed');
      setOpen(false);
    } else {
      console.log('Toggle to open'); //
      setOpen(true); 
    }
  }

  const { user, loading, signout } = useAuth();

  return (
    <Container className={classes.cardContainer}> 
        <Typography variant="overline"> 
          cute.ly
        </Typography>

        <Box> 
          <Paper className={classes.profileInfo}> 
              { user ? ( 
                <React.Fragment> 

                  <Box style={{display: "flex", flexDirection: "row", justifyContent: 'space-evenly'}}>
                    <Tooltip title="Shorten a new Link"> 
                      <HeaderLink href='/dashboard'> 
                        <HomeIcon /> 
                      </HeaderLink>
                    </Tooltip> 

                    <Tooltip title="Find any data you need on your links">
                      <HeaderLink href='/analytics'> 
                        <AssessmentIcon /> 
                      </HeaderLink>
                    </Tooltip> 

                    <Tooltip title="The control centre of the app"> 
                      <HeaderLink href='/account'> 
                        <DashboardIcon /> 
                      </HeaderLink>
                    </Tooltip>
                  </Box> 

                  <Tooltip title="Dark Mode"> 
                    { 
                      open ? 
                      <Button onClick={handleSwitchToggle}> 
                        <WbSunnyIcon /> 
                      </Button> :

                      <Button onClick={handleSwitchToggle}> 
                        <Brightness2Icon /> 
                      </Button>
                    }
                  </Tooltip>

                  <Divider 
                      orientation="vertical" 
                      flexItem 
                  />

                  <Tooltip 
                          title="View Profile" 
                          aria-label="view-profile"
                  >  
                    <Button 
                            margin="dense" 
                            className={classes.responsiveButton}
                    >
                      <TextField 
                                color="primary" 
                                margin="dense" 
                                disabled={true} 
                                value={user.name}
                      />
                      <Avatar style = {{ marginLeft: '7.5px' }}>
                        { user.email.charAt(1) }
                      </Avatar> 
                    </Button>
                  </Tooltip>
                </React.Fragment> 
              )
              : 
              <HourglassFullIcon /> 
              } 
          </Paper> 
        </Box>
    </Container>
  )
};

export default Header;