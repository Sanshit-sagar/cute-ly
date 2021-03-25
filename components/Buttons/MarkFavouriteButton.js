import React, { useState } from 'react'; 

import { 
    Tooltip, 
    Button, 
    FormControlLabel, 
    Typography 
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star'; 

const MarkFavouriteButton = ({ handleClick }) => {
    const [starred, setStarred] = useState(false); 

    const handleStarred = () => {
        setStarred(!starred); 
        handleClick(); 
    }
    const getIconColor = () => {
        return starred ? 'yellow' : 'black';
    }

    return (
        <div style={{ marginTop: '17.5px',marginRight: '5px' }}> 
            <Tooltip title="Mark as favorite"> 
                <Button 
                    size="large"
                    color="primary"
                    onClick={handleStarred}
                    style={{ height: '100%'}}
                > 
                    <FormControlLabel 
                        value="meta" 
                        control={ 
                            <StarIcon style={{ color: getIconColor(),  fontSize: '24px' }} />
                        }
                        label={
                            <Typography 
                                variant="overline"
                                style={{ fontSize: '8px', color: 'black' }}
                            > 
                                Favourite 
                            </Typography>
                        }
                        labelPlacement="bottom"
                    />
                </Button>
            </Tooltip>
        </div>
    );   
}

export default MarkFavouriteButton; 