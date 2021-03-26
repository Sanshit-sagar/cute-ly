import React, { useState } from 'react'; //

import { 
    Tooltip, 
    Button, 
    FormControlLabel, 
    Typography 
} from '@material-ui/core';

import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

const CopyToClipboardButton = ({ handleClick }) => {
    const [copied, setCopied] = useState(false); 

    const handleCopyToClipboard = () => {
        setCopied(!copied); 
        handleClick(); 
    }

    const getIconColor = () => {
        return copied ? 'green' : 'black';
    }
    
    return (
        <div style={{  marginRight: '5px' }}> 
            <Tooltip title="Copy to clipboard"> 
                <Button 
                    size="large"
                    color="primary"
                    onClick={handleCopyToClipboard}
                    style={{ marginTop: '5px' , height: '100%'}}
                > 
                    <FormControlLabel 
                        value="meta" 
                        control = { 
                            <FileCopyOutlinedIcon 
                                style = {{ 
                                    color: getIconColor(), 
                                    fontSize: '24px' 
                                }} 
                            /> 
                        }
                        label={
                            <Typography 
                                variant="overline"
                                style={{ fontSize: '8px', color: 'black' }}
                            > 
                                Clipboard 
                            </Typography>
                        }
                        labelPlacement="bottom"
                    />
                </Button>
            </Tooltip>
        </div>
       
    );
}

export default CopyToClipboardButton; 