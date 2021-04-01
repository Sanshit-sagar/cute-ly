import React, { Fragment, useState, useCallback } from 'react'; 

import { 
    Tooltip, 
    Button, 
    FormControlLabel, 
    Typography 
} from '@material-ui/core';

import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

import { useCount } from '../SharedContext'; 
import { useClipboard } from 'use-clipboard-copy';

const CopyToClipboardButton = () => {
    const [state, dispatch] = useCount(); 

    const [copyError, setCopyError] = useState(false);

    const clipboard = useClipboard({
        onSuccess() {
            setCopyError(false);
        },
        onError() {
            setCopyError(true);
        }
    });

    const handleClick = useCallback(
        () => {
            const url = state.mostRecentResult;
            clipboard.copy(url);
        }, [clipboard.copy, state.mostRecentResult]
    ); 

    const handleCopyToClipboard = () => {
        if(!state.mostRecentResult.length) {
            dispatch({
                type: 'SNACKBAR_TRIGGER',
                payload: {
                    message: 'No URL has been generated yet',
                    key: new Date().getTime().toString(),
                }
            });

            return; 
        }

        if(!state.copyToClipboard) {
            handleClick();
        } else {
            dispatch({
                type: 'SNACKBAR_TRIGGER',
                payload: {
                    message: 'Your Clipboard already contains the URL',
                    key: new Date().getTime().toString(),
                },
            });
        }

        if(copyError) {
            alert('Error in copying to clipboard...'); 
            setCopyError(false); 
        } else if(!state.copyToClipboard) {
            dispatch({
                type: 'COPY_TO_CLIPBOARD',
            }); 
        }
    }

    const validUrlPattern =  /^https?:\/\/([\w\d\-]+\.)+\w{2,}(\/.+)?$/;

    const getIconColor = () => {
        return (!validUrlPattern.test(state.url) || !state.mostRecentResult.length) ? 'gray' : (state.copyToClipboard ? (state.dark ? '#fff' : '#000') : '#1eb980');
    }

    const getIconTextColor = () => {
        return (!validUrlPattern.test(state.url) || !state.mostRecentResult.length) ? 'gray' : (state.dark ? '#fff' : '#000' ); 
    }

    return (
        <div style={{  marginRight: '5px',marginTop: '7.5px' }}> 
             <Tooltip 
                arrow
                enterDelay={500} 
                title={
                    <Typography variant="caption" color="primary">
                        {state.copyToClipboard ? 'Copied to Clipboard!' : 'Copy Result To Clipboard?'}
                    </Typography>
                }
            >  
                <span>
                    <Button 
                        size="small"
                        variant="outlined"
                        color="primary"
                        disabled={!validUrlPattern.test(state.url) || !state.mostRecentResult.length}
                        onClick={handleCopyToClipboard}
                        style={{ paddingTop: '7.5px'}}
                    > 
                        <FormControlLabel 
                            value="meta" 
                            control = { 
                                <Fragment>
                                    { state.copyToClipboard ?
                                        <DoneOutlineIcon 
                                            style = {{  
                                                color: getIconColor(),
                                                fontSize: '24px' 
                                            }} 
                                        /> 
                                    : 
                                        <FileCopyOutlinedIcon 
                                            style = {{  
                                                color: getIconColor(),
                                                fontSize: '24px' 
                                            }} 
                                        /> 
                                    }
                                </Fragment>
                            }
                            label={
                                <Typography 
                                    variant="overline"
                                    style={{ fontSize: '8px', color: getIconTextColor() }}
                                > 
                                    Clipboard 
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

export default CopyToClipboardButton; 