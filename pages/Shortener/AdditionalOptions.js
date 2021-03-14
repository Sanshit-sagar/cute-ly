import React, { Fragment, useState } from 'react';
 
import Button from '@material-ui/core/Button';
import TuneIcon from '@material-ui/core/TuneIcon';
import ModeSelector from './ModeSelector'; 

const UrlOptionsGroup = ({ handleDialogOpen }) => {
    return (
        <Fragment> 
            <div style= {{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    justifyContent: 'flex-end' 
                }}
            > 
                <ModeSelector /> 

                <Button 
                    variant="outlined" 
                    color="primary" 
                    size="small" 
                    margin="dense" 
                    onClick={ handleDialogOpen }
                    className="shortenUrlButton"
                >
                   <TuneIcon />
                </Button> 
            </div>           
            
        </Fragment>
    );
}

export default UrlOptionsGroup;


