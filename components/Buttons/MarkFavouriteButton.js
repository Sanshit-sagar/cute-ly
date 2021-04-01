import React, { Fragment, useState } from 'react'; 

import { 
    Tooltip, 
    Button, 
    FormControlLabel, 
    Typography 
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';

import { useCount } from '../SharedContext'; 

const MarkFavouriteButton = () => {
    const [state, dispatch] = useCount(); 

    const getIconColor = () => {
        return !validUrlPattern.test(state.url) ? 'gray' : (state.starred ? 'gold' : '#1eb980');
    }
    const getIconTextColor = () => {
        return !validUrlPattern.test(state.url) ? 'gray' : (state.dark ? '#fff' : '#000' ); 
    }

    const handleStarred = () => {
        dispatch({
            type: 'TOGGLE_STAR',
        });
    }
    
    const validUrlPattern =  /^https?:\/\/([\w\d\-]+\.)+\w{2,}(\/.+)?$/;

    return (
        <div style={{ marginRight: '5px', marginTop: '7.5px' }}> 
              <Tooltip 
                arrow
                enterDelay={500} 
                title={
                    <Typography variant="caption" color="primary">
                        { state.starred ? 'Added to favorites!' : 'Add to your favorites?' } 
                    </Typography>
                }
            >  
                <span>
                    <Button 
                        size="small"
                        color="primary"
                        disabled={!validUrlPattern.test(state.url)}
                        variant="outlined"
                        onClick={handleStarred}
                        style={{ paddingTop: '7.5px'}}
                    > 
                        <FormControlLabel 
                            value="meta" 
                            control={ 
                                <StarIcon style={{ color: getIconColor(),  fontSize: '24px' }} />
                            }
                            label={
                                <Typography 
                                    variant="overline"
                                    style={{ fontSize: '8px', color: getIconTextColor() }}
                                > 
                                    Favourite
                                </Typography>
                            }
                            labelPlacement="bottom"
                        />
                    </Button>
                </span>
            </Tooltip>
        </div>
    );   
}

export default MarkFavouriteButton; 