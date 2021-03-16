import React, { useState } from 'react';

import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Button from './Button'; 
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider'; 
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper'; 

import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import Home from '../icons/icons'; 
import { Loading, Dashboard, LightMode, DarkMode, Analytics } from '../icons/icons'; 
import { withStyles, makeStyles } from '@material-ui/core/styles'; 

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
  avatar: {
    marginLeft: '7.5px', 
  },
  headerLinkGroup: {
    display: "flex", 
    flexDirection: "row", 
    justifyContent: 'space-evenly'
  }
});

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

const HeaderLink = ({ href, children }) => {
  return (
    <Link 
      href={href} 
      mr={4} 
      fontWeight='light'
    >
        <Button 
          variant="primary" 
          color="primary" 
          passHref 
          style = {{ 
            marginRight: '10px', 
            borderRadius: '5px' 
          }}
        >
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

  const LightDarkModeButton = ({ executeOnClick }) => {
    return (
      <LightTooltip title="Dark Mode"> 
        { open 
        ? 
          <Button onClick={ executeOnClick }> 
            <LightMode /> 
          </Button> 
        : 
          <Button onClick={ executeOnClick }> 
            <DarkMode />
          </Button>
        }
      </LightTooltip>
    ); 
  }

  const { user, loading, signout } = useAuth();

  return (
    <Container 
      className={classes.cardContainer}
    > 
        <Typography 
          variant="overline" 
          color="primary" 
          style = {{ fontSize: '32px' }}
        > 
          cute.ly
        </Typography>

        <Box> 
          <Paper className={classes.profileInfo}> 
            { user ? ( 
              <React.Fragment> 
                
                <HeaderLink href='/dashboard'>
                  <Home />
                </HeaderLink>

                <HeaderLink href='/analytics'>
                  <Analytics />
                </HeaderLink>
                  
                <HeaderLink href='/account'>
                  <Dashboard /> 
                </HeaderLink>
                
                
                <LightDarkModeButton 
                  executeOnClick = {handleSwitchToggle} 
                /> 

                <Divider 
                    orientation="vertical" 
                    flexItem 
                />

                <LightTooltip 
                  title="View Profile" 
                  aria-label="view-profile"
                >  
                  <Button 
                    margin="dense" 
                    className={classes.responsiveButton}
                  >
                    <Avatar 
                      className={classes.avatar}
                    >
                      { user.email.charAt(0) }
                    </Avatar> 
                  </Button>
                </LightTooltip>
              </React.Fragment> 
            ) 
            : 
              <Loading /> 
            } 

          </Paper> 
        </Box>
    </Container>
  )
};

export default Header;