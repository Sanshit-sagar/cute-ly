import React, { Fragment } from 'react'; 

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import Button from '@material-ui/core/Button'; 

const UtmParamsDialog = ({ open, handleCloseDialogHook, ParamDialogComponent }) => {
    return (
        <Fragment> 
            <Dialog 
                onClose={handleCloseDialogHook} 
                open={open}
            > 
                <DialogTitle> Analytics Parameters </DialogTitle>
                
                <DialogContent> 
                    <DialogContentText> 
                        <ParamDialogComponent /> 
                    </DialogContentText>
                </DialogContent>
                
                <DialogActions> 

                    <Button onClick = { handleCloseDialogHook }> 
                        Cancel
                    </Button>

                    <Button onClick = { handleCloseDialogHook }> 
                        Done
                    </Button>

                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default UtmParamsDialog; 

 