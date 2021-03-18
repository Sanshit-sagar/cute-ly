import React, { useState, useRef, useEffect } from 'react';

import Link from '@material-ui/core/Link';
import Router from 'next/router'; 

import Box from '@material-ui/core/Box';
import Button from './Button'; 
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider'; 
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper'; 

import List from '@material-ui/core/List'; 
import ListItem from '@material-ui/core/ListItem'; 
import Collapse from '@material-ui/core/Collapse';

import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import { useAuth } from '../lib/auth'; 
import { useCount } from './SharedContext';  
import { Loading, Dashboard, LightMode, DarkMode, Analytics } from '../icons/icons'; 
import { withStyles, makeStyles } from '@material-ui/core/styles'; 

import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import DarkModeSwitch from './DarkModeSwitch'; 

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

function useHover() {
  const [value, setValue] = useState(false);

  const ref = useRef(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(
      () => {
      const node = ref.current;
      if (node) {
          node.addEventListener('mouseover', handleMouseOver);
          node.addEventListener('mouseout', handleMouseOut);

          return () => {
          node.removeEventListener('mouseover', handleMouseOver);
          node.removeEventListener('mouseout', handleMouseOut);
          };
      }
      },
      [ref.current] 
  );

  return [ref, value];
}

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
          style={{ fontSize: '22px' }} 
        />
      </Button>
  )
}

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

// const HeaderLink = ({ href, children }) => {
//   return (
//     <Link 
//       href={href} 
//       mr={4} 
//       fontWeight='light'
//     >
//         <Button 
//           variant="primary" 
//           color="primary" 
//           passHref 
//           style = {{ 
//             marginRight: '10px', 
//             borderRadius: '5px' 
//           }}
//         >
//           { children }
//         </Button>
//      </Link>
//   );
// };

const Header = ({ props }) => {
  const classes = useStyles(); 
  
  const [state, dispatch] = useCount(); 
  const [hoverRef, isHovered] = useHover();
 

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
                {/* <LightDarkModeButton 
                  executeOnClick = {handleSwitchToggle} 
                />  */}
                <DarkModeSwitch style={{ backgroundColor: 'red' }} />

                <Divider 
                    orientation="vertical" 
                    flexItem 
                />

              <div ref={hoverRef}>
                <LightTooltip 
                  title="View Profile" 
                  aria-label="view-profile"
                >  
                  <Button 
                    margin="dense" 
                    className={classes.responsiveButton}
                    onClick={(e) => dispatch({
                        type: 'SHOW_RESULTS', 
                        payload: {
                          value: true
                        }
                      })}
                  >
                     
                      <Avatar className={classes.avatar}>
                        { user.email.charAt(0) }
                      </Avatar>  
                  </Button>
                </LightTooltip>
              </div> 

                <Divider orientation="vertical" flexItem /> 

               
                <Signout /> 
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
