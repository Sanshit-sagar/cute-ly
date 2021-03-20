import React, {useState} from 'react';
import { useCount } from './SharedContext'; 

import Typography from '@material-ui/core/Typography'; 
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { makeStyles, withStyles } from '@material-ui/core/styles';

import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsAppIcon from '@material-ui/icons/WhatsApp'; 
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import AndroidIcon from '@material-ui/icons/Android';
import AppleIcon from '@material-ui/icons/Apple';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

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

const CustomDivider = () => {
    return (
        <React.Fragment> 
            <VerticalDivider /> 
            <VerticalDivider />
            <VerticalDivider /> 
        </React.Fragment>
    )
}

function LinkedinIconComp() {
    const [state, dispatch] = useCount(); 
    return (<LinkedInIcon style={{ color: state.socials.linkedin ? '#005cc5' : '#000' }} />); 
}

function FacebookIconComp() {
    const [state, dispatch] = useCount(); 
    return (<FacebookIcon style={{ color: state.socials.facebook ? '#4861ac' : '#000' }} />); 
}

function TwitterIconComp() {
    const [state, dispatch] = useCount(); 
    return (<TwitterIcon   style={{ color: state.socials.twitter ? '#009dff' : '#000' }} />); 
}
function WhatsAppIconComp() {
    const [state, dispatch] = useCount(); 
    return (<WhatsAppIcon style={{ color: state.socials.whatsapp ? '#00d85a' : '#000' }} />); 
}

const socialMediaDetails = [
    {
        key: 1,
        name: 'linkedin',
        component: <LinkedinIconComp />,
        title: 'LinkedIn',
        prefix: 'https://www.linkedin.com/sharing/share-offsite/?url='
    },{
        key: 2,
        name: 'facebook',
        component: <FacebookIconComp />,
        title:'Facebook',
        prefix: 'https://www.facebook.com/sharer/sharer.php?u='
    },{
        key: 3,
        name: 'twitter',
        component: <TwitterIconComp />, 
        title: 'Twitter',
        prefix: ''
    },{
        key: 4,
        name: 'whatsapp',
        component: <WhatsAppIconComp />,
        title: 'WhatsApp',
        prefix: ''
    }
];

const SocialMediaButtonGroup = () => {
    const [state, dispatch] = useCount(); 
    return (
        <StyledToggleButtonGroup>
            <div style = {{ display: 'flex', flexDirection: 'column' }}>
                <FormLabel component="legend" style={{ marginLeft: '5px' }}> 
                    <Typography variant="overline"> 
                        Share
                    </Typography> 
                </FormLabel>
          
                <div style={{ height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    {socialMediaDetails.map((item) => (
                        <Tooltip title={item.title}> 
                            <Button 
                                name={item.name}
                                size="small"
                                color="primary"
                                onClick={(e) => dispatch({ 
                                    type: 'UPDATE_SOCIAL',
                                    payload: {
                                        name: item.name,
                                        value: !state.socials[item.name],
                                        prefix: item.prefix
                                    }})
                                }
                            >
                                <FormControlLabel 
                                    value="female" 
                                    control={item.component}
                                    label={
                                        <Typography 
                                            variant="overline"
                                            style={{ fontSize: '8px', color:'#000' }}
                                        > 
                                            {item.name}
                                        </Typography>
                                    }
                                    labelPlacement="bottom"
                                />
                            </Button>
                        </Tooltip>
                        
                    ))} 
                </div> 
            </div> 
        </StyledToggleButtonGroup>
    ); 
}
function isEmptyValue(value) {
    return (
                value === undefined || 
                value === null      || 
                value === NaN       || 
                typeof value === 'string' && value.trim().length() === 0
            );
    }

const UtmAnalyticsButton = ({ executeOnOpen }) => {
    const [on, setOn] = useState(false);
    const [state, dispatch] = useCount(); 

    const handleClick = () => {
        setOn(!on); 
        executeOnOpen(); 
    }

    return (
        <Tooltip title="Google Analytics Info"> 
            <Button 
                size="small"
                color="primary"
                onClick={handleClick}
            >
                <FormControlLabel 
                    value="utm" 
                    control = {<PlayArrowIcon style={{ color: 'black' }} />}
                    label={
                        <Typography 
                            variant="overline"
                            style={{ fontSize: '8px', color: 'black' }}
                        > 
                            Google 
                        </Typography>
                    }
                    labelPlacement="bottom"
                />
            </Button>
        </Tooltip>     
    );
}

const IOSAnalyticsButton = ({ executeOnOpen }) => {
    const [on, setOn] = useState(false);

    const handleClick = () => {
        setOn(!on); 
        executeOnOpen(); 
    }

    return (
        <Tooltip title="iOS Info"> 
            <Button 
                size="small"
                color="primary"
                onClick={handleClick}
            >
                <FormControlLabel 
                    value="ios" 
                    control={<AppleIcon style={{ color: 'black' }} />}
                    label={
                        <Typography 
                            variant="overline"
                            style={{ fontSize: '8px', color: 'black' }}
                        > 
                            iOS 
                        </Typography>
                    }
                    labelPlacement="bottom"
                />
            </Button>
        </Tooltip>     
    );
}

const AndroidAnalyticsButton = ({ executeOnOpen }) => {
    
    const [on, setOn] = useState(false);

    const handleClick = () => {
        setOn(!on); 
        executeOnOpen(); 
    }

    return (
        <Tooltip title="Android Info"> 
            <Button 
                size="small"
                color="primary"
                onClick={handleClick}
            >
                <FormControlLabel 
                    value="android" 
                    control={<AndroidIcon style={{ color: 'black' }}/>}
                    label={
                        <Typography 
                            variant="overline"
                            style={{ fontSize: '8px', color: 'black' }}
                        > 
                            Android
                        </Typography>
                    }
                    labelPlacement="bottom"
                />
            </Button>
        </Tooltip>
    );
}

const SocialMetaTagsButton = ({ executeOnOpen }) => {
    const [on, setOn] = useState(false);

    const handleClick = () => {
        setOn(!on); 
        executeOnOpen(); 
    }

    return (
        <Tooltip title="Social Meta Tag Info"> 
            <Button 
                size="small"
                color="primary"
                onClick={handleClick}
            >
                <FormControlLabel 
                    value="meta" 
                    control={<LocalOfferIcon style={{ color: 'black' }}/>}
                    label={
                        <Typography 
                            variant="overline"
                            style={{ fontSize: '8px', color: 'black' }}
                        > 
                            Meta 
                        </Typography>
                    }
                    labelPlacement="bottom"
                />
            </Button>
        </Tooltip>
    );
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
     
        <ModeSelectorComponent />
        <CustomDivider />
        
        <StyledToggleButtonGroup>
            <div style = {{ display: 'flex', flexDirection: 'column' }}>
                <FormLabel 
                    component="legend" 
                    style={{ marginLeft: '5px' }}
                > 
                    <Typography variant="overline"> 
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
        </StyledToggleButtonGroup>
       
            <CustomDivider />
            <SocialMediaButtonGroup /> 
            <CustomDivider />
    </Paper>
  );
}

export default CustomToggleButtonGroup;