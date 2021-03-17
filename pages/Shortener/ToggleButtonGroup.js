
import React from 'react';
import { useCount } from '../../components/SharedContext'; 

import TuneIcon from '@material-ui/icons/Tune';
import Typography from '@material-ui/core/Typography'; 
import FormLabel from '@material-ui/core/FormLabel';

import { makeStyles, withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsAppIcon from '@material-ui/icons/WhatsApp'; 
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import AndroidIcon from '@material-ui/icons/Android';
import ShareIcon from '@material-ui/icons/Share'; 

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

const LinkedinIconComp = () => {
    return (<LinkedInIcon />);
}
const FacebookIconComp = () => {
    return (<FacebookIcon />); 
}
const TwitterIconComp = () => {
    return (<TwitterIcon />);
}
const WhatsAppIconComp = () => {
    return (<WhatsAppIcon />);
}

const medias = [
    {
        name: 'linkedin',
        component: <LinkedinIconComp />,
    },{
        name: 'facebook',
        component: <FacebookIconComp />,
    },{
        name: 'twitter',
        component: <TwitterIconComp />, 
    },{
        name: 'whatsapp',
        component: <WhatsAppIconComp />,
    }
];
 
  
const ToggleButtonGroup2 = () => {
    const [state, dispatch] = useCount(); 

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <FormLabel component="legend" style={{ marginLeft: '5px' }}> 
                <Typography variant="overline" style={{ fontSize: '12px', marginLeft: '5px' }}> 
                    SHARE  
                </Typography> 
            </FormLabel>
            
            <StyledToggleButtonGroup 
                style={{ height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
           
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
                { medias[0].component }
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
                { medias[1].component }
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
               { medias[2].component }
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
                { medias[3].component }
            </ToggleButton>
        </StyledToggleButtonGroup>
        </div> 
    );
}


const UtmAnalyticsButton = ({ executeOnOpen }) => {
    return (
        <React.Fragment>
            
            <Button 
                onClick={executeOnOpen}
            >         
                <TuneIcon /> 
            </Button>     

        </React.Fragment>
    );
}

const IOSAnalyticsButton = ({ executeOnOpen }) => {
    return (
        <Button 
            onClick={executeOnOpen}
        > 
            <Typography 
                variant="Body"
                style={{ marginRight: '5px' }}> 
                iOS 
            </Typography>
            
        </Button>     
    );
}

const AndroidAnalyticsButton = ({ executeOnOpen }) => {
    return (
        <Button 
            onClick={executeOnOpen}
        > 
            <AndroidIcon /> 
        </Button>     
    );
}

const SocialMetaTagsButton = ({ executeOnOpen }) => {
    return (
        <Button onClick={executeOnOpen}>
            <ShareIcon /> 
        </Button>
    );
}

const CustomDivider = () => {
    return (
        <React.Fragment> 
            <VerticalDivider /> 
            <VerticalDivider />
            <VerticalDivider /> 
        </React.Fragment>
    )
}

const CustomToggleButtonGroup = ({ openGoogleDialog, openiOSDialog, openAndroidDialog, openMetadataDialog, ModeSelectorComponent, }) => {
  const classes = useStyles();
  const [state, dispatch] = useCount(); 

  return (
    <Paper 
        elevation={0} 
        className={classes.paper}
        style = {{ 
            display: 'flex', 
            flexDirection: 'row',
            justifyContent: 'flex-start'
            }}
        >
         <div style = {{ 
                display: 'flex', 
                flexDirection: 'row'
            }}
        >
            <ModeSelectorComponent />
            
            <CustomDivider />
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <FormLabel component="legend" style={{ marginLeft: '5px' }}> 
                    <Typography variant="overline" style={{ fontSize: '12px', marginLeft: '5px' }}> 
                        Analytics  
                    </Typography> 
                </FormLabel>

                <div style={{ height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <UtmAnalyticsButton executeOnOpen={openGoogleDialog} />
                    <IOSAnalyticsButton executeOnOpen={openiOSDialog} />
                    <AndroidAnalyticsButton executeOnOpen={openAndroidDialog} /> 
                    <SocialMetaTagsButton executeOnOpen={openMetadataDialog} /> 
                </div> 
            </div> 
        </div> 

        <ToggleButtonGroup
            size="small"
            value={state.socials}
            exclusive
        > 
            <CustomDivider />

            <ToggleButtonGroup2 /> 

            <CustomDivider />
        </ToggleButtonGroup>           

    </Paper>
  );
}

export default CustomToggleButtonGroup;