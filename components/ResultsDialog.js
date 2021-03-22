import React  from 'react';
import { useCopyToClipboard } from 'react-use'; 
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

const ResultsDialog = () => {
    const [state, dispatch] = useCount(); 
    const [copyState, copyToClipboard] = useCopyToClipboard();

    const handleCopy = () => {
        console.log("Copying...");
        copyToClipboard(state.mostRecentResult); 
        
        if(copyState.error) {
            alert('Unable to copy value:' + copyState.error.message);
        } else if(copyState.value) {
            alert('Copied... ' + copyState.value.substring(copyState.value.length - 7));
        } else {
            console.log('Nothing to copy...'); 
        }
    }

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
                        <Typography variant="body1" class="copyText"> 
                           { state.mostRecentResult }
                        </Typography>   
                    </DialogContentText>    
                </DialogContent>

                <DialogActions> 
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        
                        <div style={{ display: 'flex', flexDirection: 'row', marginRight: '50px' }}> 
                            <IconButton onClick={handleCopy}> 
                                <FileCopyIcon /> 
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