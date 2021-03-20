import React, { Fragment } from 'react'; 

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography'; 
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

const UtmParamsDialog = ({ open, closeHook, AnalyticsForm, name }) => {
  
    return (
        <Fragment> 
            <Dialog onClose={closeHook} 
                    open={open}
            > 
                <DialogTitle> 
                    <Typography variant="overline" style={{ fontSize: "24px" }} > 
                        {name}
                    </Typography>
                </DialogTitle>

                <Divider /> 
                
                <DialogContent>
                    <AnalyticsForm/>
                </DialogContent>
                
                <DialogActions> 
                    <Button 
                        variant="outlined"
                        color="primary"
                        onClick = { closeHook }
                    > 
                        Cancel
                    </Button>

                    <Button 
                        variant="contained"
                        color="primary"
                        onClick = { closeHook }
                    > 
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default UtmParamsDialog; 

 