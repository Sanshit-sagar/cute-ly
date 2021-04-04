import React from 'react'; 

import { 
    Tooltip, 
    Button, 
    Typography 
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';

import { useCount } from '../SharedContext'; 

const MarkFavouriteButton = () => {
    const [state, dispatch] = useCount(); 

    const getIconColor = () => {
        return !validUrlPattern.test(state.url) ? 'gray' : (state.starred ? 'gold' : '#1eb980');
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
                        size="large"
                        color="primary"
                        disabled={!validUrlPattern.test(state.url)}
                        variant="outlined"
                        onClick={handleStarred}
                        style={{ paddingTop: '7.5px'}}
                    > 
                        <StarIcon style={{ color: getIconColor(),  fontSize: '24px' }} />
                    </Button>
                </span>
            </Tooltip>
        </div>
    );   
}

export default MarkFavouriteButton; 