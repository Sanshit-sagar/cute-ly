import React, { Fragment } from 'react'; 

import { 
    Grid, 
    Button, 
    Dialog,
    DialogActions, 
    DialogContent, 
    Paper,
    Typography, 
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    captionPaper: {
        width: '400px', 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: 'flex-start', 
        flexWrap: 'wrap',
    },
}));

const DialogBase = ({ open, handleClose, handleSubmit, content }) => {
    const classes = useStyles(); 

    const handleCancel = () => {
        handleClose();
    }

    const handleSubmitContent = () => {
        handleSubmit(); 
        handleClose(); 
    }

    return (
    <Fragment> 
        {
            content && 
            <Dialog 
                open={open} 
                onClose={handleClose}
            >
                <Paper elevation={0} margin='5px'>
                    {
                        content?.component 
                    &&    
                        <DialogContent>
                            <Fragment>
                                <Paper elevation={0} className={classes.captionPaper}>
                                    <Typography variant="h4" color="primary">
                                        {content.title} 
                                    </Typography>
                                </Paper>

                                { content?.component }
                            </Fragment>
                        </DialogContent>
                    }
                </Paper>
                
                <DialogActions> 
                    <Grid 
                        container 
                        direction="row" 
                        justify="flex-end" 
                        alignItems="center" 
                        spacing={2}
                    >
                        <Grid item>
                            <Button 
                                variant="outlined"
                                color="primary"
                                size="large"
                                margin="normal"
                                onClick={handleCancel}
                            > 
                                Cancel 
                            </Button> 
                        </Grid>

                        <Grid item>
                            <Button 
                                variant="contained"
                                color="primary"
                                size="large"
                                margin="normal"
                                onClick={handleSubmitContent}
                            >
                                Confirm
                            </Button> 
                        </Grid>
                    </Grid> 
                </DialogActions>
            </Dialog>
        }
    </Fragment>
    );
}

const CustomSharedDialog = ({ open, handleClose, handleSubmit, content }) => {

    return (
        <DialogBase 
            open={open}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            content={content}
        /> 
    )
}

export default CustomSharedDialog;