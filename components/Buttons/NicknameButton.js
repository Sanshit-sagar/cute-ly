import React, { Fragment, useState } from 'react'; 
import { 
    Tooltip, 
    Button, 
    FormControlLabel, 
    Typography 
} from '@material-ui/core';
import { useCount } from '../SharedContext'; 
import FingerprintIcon from '@material-ui/icons/Fingerprint'; 

const NicknameButton = ({ handleClick }) => {
    const [state, dispatch] = useCount(); 
    const [starred, setStarred] = useState(false); 

    const handleStarred = () => {
        setStarred(!starred); 
        handleClick(); 
    }
    const getIconColor = () => {
        return !validUrlPattern.test(state.url) ? 'gray' : (state.nickname.length ? '#f9aaaa' : '#1eb980');
    }

    const getIconTextColor = () => {
        return !validUrlPattern.test(state.url) ? 'gray' : (state.dark ? '#fff' : '#000' ); 
    }

    const validUrlPattern =  /^https?:\/\/([\w\d\-]+\.)+\w{2,}(\/.+)?$/;

    return (
        <div style={{  marginRight: '5px',marginTop: '7.5px' }}> 
           <Tooltip 
                arrow
                enterDelay={500} 
                title={
                    <Typography variant="caption" color="primary">
                        {state.nickname.length ? ('Current Nickname: ' + state.nickname) : 'Assign Nickname?'}
                    </Typography>
                }
            >  
                <span>
                    <Button 
                        size="large"
                        color="primary"
                        disabled={!validUrlPattern.test(state.url)}
                        variant="outlined"
                        onClick={handleStarred}
                        style={{ paddingTop: '7.5px' }}
                    > 
                        {/* <FormControlLabel 
                            value="meta" 
                            control = { 
                                <FingerprintIcon style={{ color: getIconColor(), fontSize: '24px' }} /> 
                            }
                            label={
                                <Typography 
                                    variant="overline"
                                    style={{ fontSize: '8px', color: getIconTextColor() }}
                                > 
                                    Nickname 
                                </Typography>
                            }
                            labelPlacement="bottom"
                        /> */}
                        <FingerprintIcon style={{ color: getIconColor(), fontSize: '24px' }} />
                    </Button>
                </span>
            </Tooltip>
        </div>
    );   
}

export default NicknameButton; 