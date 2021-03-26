import React, { useState } from 'react'; 
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
        return state.nickname.length ? 'green' : 'black';
    }

    return (
        <div style={{  marginRight: '5px' }}> 
            <Tooltip title="Name me"> 
                <Button 
                    size="large"
                    color="primary"
                    onClick={handleStarred}
                    style={{ marginTop: '5px', height: '100%'}}
                > 
                    <FormControlLabel 
                        value="meta" 
                        control = { 
                            <FingerprintIcon style={{ color: getIconColor(), fontSize: '24px' }} /> 
                        }
                        label={
                            <Typography 
                                variant="overline"
                                style={{ fontSize: '8px', color: 'black' }}
                            > 
                                Nickname 
                            </Typography>
                        }
                        labelPlacement="bottom"
                    />
                </Button>
            </Tooltip>
        </div>
    );   
}

export default NicknameButton; 