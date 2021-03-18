import React, { useState } from 'react';
import { useCount } from './SharedContext'; 

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import Typography from '@material-ui/core/Typography'; 
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton'; 

import FileCopyIcon from '@material-ui/icons/FileCopy';
import StarIcon from '@material-ui/icons/Star';
import ShareIcon from '@material-ui/icons/Share';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const ResultsDialog = ({ message }) => {
    const [state, dispatch] = useCount(); 

    return (
        <React.Fragment> 
            <Dialog 
                open={state.showResults}
                onClose={(e) => 
                    dispatch({
                        type: "SHOW_RESULTS", 
                        payload: {
                            value: false
                        }
                    })
                }
            > 
                <DialogTitle> 
                    <Typography 
                        variant="overline" 
                        style={{ fontSize: '24px' }}
                    > 
                       Results
                    </Typography>
                </DialogTitle>

                <Divider /> 
                <DialogContent> 
                    <DialogContentText> 
                        {/* <div> 
                            <p> {generateList} </p>
                        </div> */}
                        <Typography variant="body1"> 
                           { state.mostRecentResult }
                        </Typography>   
                    </DialogContentText>    
                </DialogContent>

                <DialogActions> 
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', marginRight: '50px' }}> 
                            <IconButton> 
                                <FileCopyIcon /> 
                            </IconButton> 
                            <IconButton> 
                                <StarIcon /> 
                            </IconButton> 
                            <IconButton> 
                                <ShareIcon /> 
                            </IconButton> 
                            <IconButton>  
                                <DeleteForeverIcon /> 
                            </IconButton> 
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={(e) => dispatch({
                                        type: "SHOW_RESULTS",
                                        payload: {
                                            value: false
                                        }
                                    })
                                }
                            >
                                Done 
                            </Button>     
                        </div>
                    </div> 
                </DialogActions> 
            </Dialog>
        </React.Fragment>
    );
}

export default ResultsDialog; 