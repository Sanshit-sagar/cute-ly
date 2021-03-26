import React, { useState } from 'react'; 

import { 
    Tooltip, 
    Button, 
    FormControlLabel, 
    Typography 
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';

import { useCount } from '../SharedContext'; 

const MarkFavouriteButton = ({ handleClick }) => {
    const [state, dispatch] = useCount(); 

    const getIconColor = () => {
        return state.starred ? 'yellow' : 'black'; 
    };

    const handleStarred = () => {
        dispatch({
            type: 'TOGGLE_STAR',
        });
        handleClick();
    }

    return (
        <div style={{ marginRight: '5px' }}> 
            <Tooltip title="Mark as favorite"> 
                <Button 
                    size="large"
                    color="primary"
                    onClick={handleStarred}
                    style={{ marginTop: '5px', height: '100%'}}
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