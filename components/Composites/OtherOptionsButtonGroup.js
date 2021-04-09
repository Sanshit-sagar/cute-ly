import React, { Fragment, useState } from 'react'; 

import { 
    Typography, Paper, FormLabel, Grid, Divider
} from '@material-ui/core'; 
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import StarIcon from '@material-ui/icons/Star'; 
import HomeIcon from '@material-ui/icons/Home'; 

import { makeStyles, withStyles } from '@material-ui/core/styles'; 

import CopyToClipboardButton from '../Buttons/CopyToClipboardButton';
import MarkFavouriteButton from '../Buttons/MarkFavouriteButton'; 
import StyledSharedDialog from './StyledSharedDialog'; 
import { useCount } from '../SharedContext'; 

const useStyles = makeStyles((theme) => ({
    paper: {
        border: '1px solid',
        borderColor: '#1eb980',
        padding: theme.spacing(1),
        margin: theme.spacing(3),
    },
    buttonGroup: {
        display: 'flex', 
        flexDirection: 'column',
    },
})); 

const StyledToggleButtonGroup = withStyles((theme) => ({
    grouped: {
      margin: theme.spacing(0.5),
      border: 'thin solid',
      borderColor: theme.palette.primary.main,
      '&:not(:first-child)': {
        borderRadius: theme.shape.borderRadius,
      },
      '&:first-child': {
        borderRadius: theme.shape.borderRadius,
      },
    },
}))(ToggleButtonGroup);

export default function OtherOptionsButtonGroup() {
    const classes = useStyles();
    const [state, dispatch] = useCount(); 

    const [dialogOpen, setDialogOpen] = useState(false); 
    const [openDialogName, setOpenDialogName] = useState('');
  
    const handleDialogOpen = (event, buttonName) => {
        setOpenDialogName(buttonName);
        setDialogOpen(true); 
    }

    const handleDialogClose = () => {
        setDialogOpen(false); 
    }

    const getContent = () => {
        if(openDialogName==='fav') {
            if(state.starred) {
                return favContent; 
            } else {
                return { 
                    title: 'Remove Star', 
                    message: 'Are you sure you want to unmark as favorite?', 
                    noSubmissionReq: false,
                    component: <HomeIcon />
                };
            }
        } else if(openDialogName==='title') {
            return titleContent; 
        } else {
            return null; 
        }
    }

    const handleSubmit = () => {
        console.log('handling submit...');
    }

    const StarIconsGraphic = () => {
        return (
            <Grid container direction="row" justify="center">
                <Grid item> 
                    <Paper elevation={10}>
                        <StarIcon style={{ fontSize: '64px', color: 'yellow' }} />
                    </Paper>
                </Grid>
            </Grid>
        );
    }
    
    const favContent = {
        title: 'Mark as favorite',
        message: 'Do you really love this one that much?',
        component: <StarIconsGraphic />,
        noSubmissionReq: true
    };

    const validUrlPattern =  /^https?:\/\/([\w\d\-]+\.)+\w{2,}(\/.+)?$/;

    const getBodyColor = () => {
        const [state, dispatch] = useCount(); 
        return !validUrlPattern.test(state.url) ? 'gray' : '#1eb980';
    }

    return (
        <Fragment>
            <StyledToggleButtonGroup>
                <Paper elevation={0} className={classes.paper}>
                    <div className={classes.buttonGroup}>
                        <FormLabel component="legend" style={{ marginLeft: '5px' }}>
                            <Typography variant="overline" style={{ color: getBodyColor() }}> 
                                Additional Options
                            </Typography> 
                        </FormLabel>
                        
                        <Divider style={{ backgroundColor: getBodyColor() }} /> 

                        <div style={{ 
                                height: '100%', 
                                display: 'flex', 
                                flexDirection: 'row', 
                                justifyContent: 'space-between'
                            }}
                        >
                            <MarkFavouriteButton handleClick={(e) => handleDialogOpen(e, "fav")} />
                            <CopyToClipboardButton />
                        </div>
                    </div>
                </Paper>
            </StyledToggleButtonGroup>
            
            <StyledSharedDialog 
                open={dialogOpen}
                handleClose={handleDialogClose}
                handleSubmit={handleSubmit}
                content={getContent()}
                noSubmissionReq={true}
            /> 
        </Fragment>
    );
}