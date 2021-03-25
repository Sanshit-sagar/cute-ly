import React, { Fragment, useState } from 'react'; 

import { Tooltip, Button, FormControlLabel, Typography } from '@material-ui/core'; 

import AndroidIcon from '@material-ui/icons/Android';
import AppleIcon from '@material-ui/icons/Apple';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

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
                size="large"
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


const IosAnalyticsButton = ({ executeOnOpen }) => {
    const [on, setOn] = useState(false);

    const handleClick = () => {
        setOn(!on); 
        executeOnOpen(); 
    }

    return (
        <Tooltip title="iOS Info"> 
            <Button 
                size="large"
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
                size="large"
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
                size="large"
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

export default { UtmAnalyticsButton, SocialMetaTagsButton, AndroidAnalyticsButton, SocialMetaTagsButton};

