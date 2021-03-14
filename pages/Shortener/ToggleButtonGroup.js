
import React from 'react';
import { useCount } from '../../components/CounterContext'; 

import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import { makeStyles, withStyles } from '@material-ui/core/styles';

import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsAppIcon from '@material-ui/icons/WhatsApp'; 
import LinkedInIcon from '@material-ui/icons/LinkedIn'; 
import EmailIcon from '@material-ui/icons/Email';
import TuneIcon from '@material-ui/icons/Tune';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    border: `1px solid ${theme.palette.divider}`,
    flexWrap: 'wrap',
  },
  divider: {
    margin: theme.spacing(1, 0.5),
  },
  shortenUrlButton: {
      maxHeight: '10px',
  },
}));

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: 'none',
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);

const VerticalDivider = () => {
    return (
        <Divider 
            flexItem 
            orientation="vertical" 
        />   
    );
}

const CustomToggleButtonGroup = ({ handleDialogOpen, ModeSelectorComponent, }) => {

  const classes = useStyles();
  const [state, dispatch] = useCount(); 

  return (
    <div>
        <Paper 
            elevation={0} 
            className={classes.paper}
        >
            <StyledToggleButtonGroup
                size="small"
                value={state.socials}
                exclusive
            >

                <ToggleButton 
                    value="facebook"
                    onClick={
                        (e) => dispatch({ 
                            type: 'UPDATE_SOCIAL', 
                            payload: { 
                                name: 'facebook', 
                                value: true
                            }
                        })
                    }
                >
                    <FacebookIcon /> 
                </ToggleButton>
                
                <ToggleButton 
                    value="linkedin"
                    onClick={
                        (e) => dispatch({ 
                            type: 'UPDATE_SOCIAL', 
                            payload: { 
                                name: 'linkedin', 
                                value: true
                            }
                        })
                    }
                >
                    <LinkedInIcon />
                </ToggleButton>
                
                <ToggleButton 
                    value="twitter"
                    onClick={
                        (e) => dispatch({ 
                            type: 'UPDATE_SOCIAL', 
                            payload: { 
                                name: 'twitter', 
                                value: true
                            }
                        })
                    }
                >
                    <TwitterIcon />
                </ToggleButton>

                <ToggleButton 
                    value="whatsapp" 
                    onClick={
                        (e) => dispatch({ 
                            type: 'UPDATE_SOCIAL', 
                            payload: { 
                                name: 'whatsapp', 
                                value: true
                            }
                        })
                    }
                >
                    <WhatsAppIcon />
                </ToggleButton>
                
                <ToggleButton 
                    value="email" 
                    onClick={
                        (e) => dispatch({ 
                            type: 'UPDATE_SOCIAL', 
                            payload: { 
                                name: 'email', 
                                value: true
                            }
                        })
                    }
                >
                    <EmailIcon />
                </ToggleButton>

                
                <VerticalDivider /> 

                <ModeSelectorComponent />

                <VerticalDivider /> 
        
                <Button 
                    onClick={handleDialogOpen}> 
                    <TuneIcon /> 
                </Button> 

            </StyledToggleButtonGroup>           
      </Paper>
    </div>
  );
}

export default CustomToggleButtonGroup;