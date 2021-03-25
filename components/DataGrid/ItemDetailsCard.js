import React, { Fragment } from 'react'; 

import { Card, CardContent, Typography, CardActions, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'; 

import FileCopyIcon from '@material-ui/icons/FileCopy'; //
import StarIcon from '@material-ui/icons/Star';
import DeleteIcon from '@material-ui/icons/Delete'; 

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

const ItemDetailsCard = ({ itemDetails }) => {
    const classes = useStyles(); 
   
    return (
        <Fragment> 
             <Card className={classes.root} variant="outlined">
                <CardContent>

                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {itemDetails.url.substring(15)}...
                    </Typography>
                
                    <Typography variant="h5" component="h2">
                        {itemDetails.suffix}
                    </Typography>
                
                    <Typography className={classes.pos} color="textSecondary">
                        {itemDetails.mode}
                    </Typography>
                
                    <Typography variant="body2" component="p">
                        {itemDetails.originalUrl}
                    <br />
                        {itemDetails.timestamp}
                    </Typography>
                </CardContent>

                <CardActions>
                    <IconButton> 
                        <FileCopyIcon />
                    </IconButton>
                    <IconButton> 
                        <StarIcon /> 
                    </IconButton>
                    <IconButton> 
                        <DeleteIcon /> 
                    </IconButton>
                </CardActions>
            </Card>
        </Fragment>
    );
}

export default ItemDetailsCard; 