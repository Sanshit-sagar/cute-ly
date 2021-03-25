import React, { Fragment } from 'react'; 

import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'; 

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Card, CardActions, CardContent, CardHeader } from '@material-ui/core'; 

const UtmParamsDialog = ({ open, closeHook, AnalyticsForm, content }) => {
    const handleCancel = () => {
        closeHook(); 
    }
    const handleSubmit = () => {
        alert('Submitting...'); 
        closeHook(); 
    }

    return (
        <Dialog 
            onClose={closeHook} 
            open={open}
        > 
            <DialogTitle>
                <Typography variant="h4">
                    {content.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary"> 
                    {content.message}
                </Typography>
            </DialogTitle>
            
            <DialogContent> 
                <Card>  
                    <CardContent> 
                        <AnalyticsForm/>
                    </CardContent>
                </Card>
            </DialogContent>
            
            <DialogActions>
                <Button 
                    variant="outlined"
                    color="primary"
                    onClick = { handleCancel }
                > 
                    <Typography variant="button">
                        Cancel
                    </Typography>
                </Button>

                <Button 
                    variant="contained"
                    color="primary"
                    onClick = { handleSubmit }
                > 
                    <Typography variant="button">
                        Update
                    </Typography>
                </Button>
            
            </DialogActions>
        </Dialog> 
    );
}

export default UtmParamsDialog; 

 