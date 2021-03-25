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

import AndroidIcon from '@material-ui/icons/Android';
import AppleIcon from '@material-ui/icons/Apple';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

import SocialMediaButtonGroup from './SocialMediaButtonGroup'; 
import OtherOptionsButtonGroup from './OtherOptionsButtonGroup'; 

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    border: `1px solid ${theme.palette.divider}`,
  },
  divider: {
    margin: theme.spacing(1, 0.5),
  },
  shortenUrlButton: {
      maxHeight: '10px',
  },
  cardRoot: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  cardTitle: {
    fontSize: 14,
  },
  cardPos: {
    marginBottom: 12,
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
        executeOnOpen("utm"); 
    }

    return (
        <Tooltip title="Google Analytics Info"> 
            <Button 
                size="large"
                color="primary"
                onClick={(e) => handleClick()}
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
        executeOnOpen("ios"); 
    }

    return (
        <Tooltip title="iOS Info"> 
            <Button 
                size="large"
                color="primary"
                onClick={(e) => handleClick()}
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
        executeOnOpen("android"); 
    }

    return (
        <Tooltip title="Android Info"> 
            <Button 
                size="large"
                color="primary"
                onClick={(e) => handleClick()}
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
        executeOnOpen("meta"); 
    }

    return (
        <Tooltip title="Social Meta Tag Info"> 
            <Button 
                size="large"
                color="primary"
                onClick={(e) => handleClick()}
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

const CustomToggleButtonGroup = ({ handleOpen }) => {
  const classes = useStyles();
  const [state, dispatch] = useCount(); 

  return (
        <StyledToggleButtonGroup>
            <Paper elevation={3} className={classes.paper}>
                <div style = {{ display: 'flex', flexDirection: 'column' }}>
                    <FormLabel 
                        component="legend" 
                        style={{ marginLeft: '15px' }}
                    > 
                        <Typography variant="overline"> 
                            Analytics
                        </Typography> 
                    </FormLabel>

                    <Divider /> 

                    <div style={{ height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <UtmAnalyticsButton executeOnOpen={handleOpen} />
                        <IOSAnalyticsButton executeOnOpen={handleOpen} />
                        <AndroidAnalyticsButton executeOnOpen={handleOpen} /> 
                        <SocialMetaTagsButton executeOnOpen={handleOpen} /> 
                    </div> 
                </div> 
            </Paper>
        </StyledToggleButtonGroup>
  );
}

export default CustomToggleButtonGroup;