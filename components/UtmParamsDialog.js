import React, { Fragment } from 'react'; 

import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'; 

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import { Card, CardActions, CardContent, CardHeader } from '@material-ui/core'; 

const UtmParamsDialog = ({ open, closeHook, AnalyticsForm, name }) => {
  
    return (
        <Fragment> 
            <Dialog 
                onClose={closeHook} 
                open={open}
            > 
               
                <Card>  
                    <CardContent> 
                        <Typography 
                            variant="h5" 
                            style={{ fontSize: "16px" }}
                        > 
                            {name}
                        </Typography>
                        
                        <Divider /> 

                        <AnalyticsForm/>
                    </CardContent>
                
                    <CardActions> 
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
                    </CardActions>
                </Card> 
               
            </Dialog> 
        </Fragment>
    );
}

export default UtmParamsDialog; 

 