import React, { Fragment, useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';

import { useAnalytics } from '../utils/useAnalytics';

const SharedInfoDialogBase = () => {
    const [state, dispatch] = useAnalytics();
    
    const handleClose = () => {
        dispatch({
            type: 'CLOSE_DIALOG'
        }); 
    }

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
      });

    return (
        <Dialog open={state.openDialog} handleClose={handleClose} TransitionComponent={Transition}>
            <DialogTitle> 
                <Typography variant="h5" color="primary">
                    HiHiHi
                </Typography>
            </DialogTitle>

            <DialogContent>
                <Typography variant="h5" color="primary">
                    Body Text
                </Typography>
            </DialogContent>

            <DialogActions>
                <Button variant="outlined" color="primary" onClick={handleClose}>
                    <Typography variant="button" color="default">
                        Cancel
                    </Typography>
                </Button>
                <Button variant="contained" color="primary" onClick={handleClose}>
                    <Typography variant="button" color="default">
                        Done
                    </Typography>
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default function SharedInfoDialog() {
    return (
       
        <SharedInfoDialogBase /> 
       
    );
}