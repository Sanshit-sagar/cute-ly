import React, { Fragment } from 'react'; 

import { 
    Grid, 
    Button, 
    Dialog,
    DialogActions, 
    DialogContent, 
    DialogTitle,
    Paper,
    Typography, 
    Tooltip,
    DialogContentText
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';

import { useCount } from '../SharedContext';

const useStyles = makeStyles((theme) => ({
    root: {

    },
    paper: {
        backgroundColor: theme.palette.primary.main,
    },
    helpTooltip__title: {
        marginRight: '2.25px', 
        paddingTop: '10px',
        color: 'red',
    },
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
    const [state, dispatch] = useCount();

    const handleCancel = () => {
        handleClose();
    }

    const handleSubmitContent = () => {
        handleSubmit(); 
        handleClose(); 
    }

    const getHeaderFontColor = () => {
        return '#1eb980';  
    }

    const getSubtitleFontColor = () => {
        return state.dark ? '#fff' : '#000'; 
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
                            <Paper elevation={0} className={classes.captionPaper}>
                                <Typography 
                                    variant="h4"
                                    style = {{ color: getHeaderFontColor() }}
                                > 
                                    {content.title} 
                                </Typography>
                            </Paper>
                            {content?.component}
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