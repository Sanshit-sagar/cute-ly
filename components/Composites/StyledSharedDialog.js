import React, { Fragment } from 'react'; 

import { 
    Grid, 
    Paper, 
    Button, 
    Dialog,
    DialogActions, 
    DialogContent, 
    DialogTitle,
    CardContent,
    IconButton,
    Typography, 
    Tooltip
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';

const useStyles = makeStyles((theme) => ({
    root: {

    },
    paper: {
        backgroundColor: theme.palette.primary.main,
        margin: theme.spacing(2),
    },
    helpTooltip__title: {
        marginRight: '2.25px', 
        paddingTop: '5px',
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

    const handleConfirmDialog = () => {
        handleClose(); 
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            { content &&
                <DialogTitle>
                    {content?.title && 
                        <div>
                            <Grid 
                                container 
                                direction="row" 
                                justify="flex-start"
                                spacing={2}
                            >
                                <Grid item>
                                    <Typography 
                                        variant="h4"
                                        color="textPrimary"
                                    > 
                                        {content.title} 
                                    </Typography>
                                </Grid> 
                                
                                <Grid item>
                                    <Tooltip title = {"Whats " + content.title + "?"}>
                                        <IconButton 
                                            size="small"
                                            color="primary"
                                            className="helpTooltip__title"
                                        >
                                            <HelpOutlineOutlinedIcon /> 
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                    
                            <Typography 
                                variant="subtitle1"
                                color="textSecondary"
                            > 
                                {content.message}
                            </Typography>
                        </div>
                    }
                </DialogTitle>
            }

            { content && content?.component && 
                <DialogContent style={{ padding: '10px' }}> 
                    <CardContent> 
                        {content.component}
                    </CardContent>
                </DialogContent>
            }

            { content && !content?.noSubmissionReq ?
            
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
                            <Paper elevation={15} className={classes.paper}>
                                <Button 
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    margin="normal"
                                    onClick={handleSubmitContent}
                                >
                                    Confirm
                                </Button> 
                            </Paper>
                        </Grid>
                    </Grid> 
                </DialogActions>

                :

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
                                <Typography variant="button" onClick={handleCancel}>
                                    Disagree
                                </Typography>
                            </Button>
                        </Grid> 

                        <Grid> 
                            <Paper elevation={15} className={classes.paper}>
                                <Button 
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    onClick={handleConfirmDialog}
                                > 
                                    <Typography variant="button">
                                        Agree
                                    </Typography>
                                </Button> 
                            </Paper>
                        </Grid>
                    </Grid>
                </DialogActions>
            }
           
        </Dialog>
    );
}

const CustomSharedDialog = ({ open, handleClose, handleSubmit, content }) => {

    return (
        <Fragment> 
            <DialogBase 
                open={open}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                content={content}
            /> 
        </Fragment>
    )
}

export default CustomSharedDialog;