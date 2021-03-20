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

const useCopyToClipboard = text => {
    const copyToClipboard = str => {
      const el = document.createElement('textarea');
      el.value = str;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      const selected =
        document.getSelection().rangeCount > 0
          ? document.getSelection().getRangeAt(0)
          : false;
      el.select();
      const success = document.execCommand('copy');
      document.body.removeChild(el);
      if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
      }
      return success;
    };
  
    const [copied, setCopied] = React.useState(false);
  
    const copy = React.useCallback(() => {
      if (!copied) setCopied(copyToClipboard(text));
    }, [text]);
    React.useEffect(() => () => setCopied(false), [text]);
  
    return [copied, copy];
};

const ResultsDialog = ({ message }) => {
    const [state, dispatch] = useCount(); 

    const resultDisplayed = state.mostRecentResult;
    const [copied, copy] = useCopyToClipboard(`${resultDisplayed}`);

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
                           <span> {copied && 'Copied!' } </span>
                        </Typography>   
                    </DialogContentText>    
                </DialogContent>

                <DialogActions> 
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', marginRight: '50px' }}> 
                            <IconButton onClick={copy}> 
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