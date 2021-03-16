import React, { Fragment, useState } from 'react'; 
import { useCount } from '../../components/SharedContext'; 
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button'; 
import FormControl from '@material-ui/core/FormControl';
import LanguageIcon from '@material-ui/icons/Language';
import CustomToggleButtonGroup from './ToggleButtonGroup'; 
import UtmParamsDialog from './UtmParamsDialog';

import Container from '@material-ui/core/Container'; 

import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider'; 

// import { shadows } from '@material-ui/system'; 

import { createLink } from '../../lib/db'; 
import SharedSnackbar from '../../components/Snackbar';

const useStyles = makeStyles({
    root: {
        
    },
    urlInput: {
        backgroundColor: '#fff', 
        color: '#000', 
        borderColor: '#000', 
        border: 'thin solid black', 
        borderRadius: '5px', 
        marginBottom: '5px',
    }, 
    shortenUrlButton: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'center',
        float: 'right', 
    }, 
    dashboardCard: {
        position: 'relative',
        left: '12.5%', 
        top: '15%',
        width: '75%', 
        height: '57.5%',
        backgroundColor: 'white', 
        border: 'thin solid black', 
        borderRadius: "5px", 
    },
    cardContent: {
        borderRadius: '5px', 
    },
    customToggleButtons: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },
    smallGap: {
        marginTop: '10px',
    }
});

const DashboardBase = ({ ParamDialogComp, ModeSelectorComp }) => { 
    const classes = useStyles();

    const [state, dispatch] = useCount(); 
    const [open, setOpen] = useState(false);
 
    const handleOpenDialog = () => {
        setOpen(true);
    }

    const handleCloseDialog = () => {
        setOpen(false);
    }

    const validUrlPattern =  /^https?:\/\/([\w\d\-]+\.)+\w{2,}(\/.+)?$/;
    return (
        <Fragment> 
            <Container>
              
                <FormControl 
                    fullWidth 
                    className={classes.margin} 
                    variant="filled"
                >
                    <div className={classes.smallGap}> 
                        <InputLabel 
                            htmlFor="filled-adornment-amount"
                        >
                            Destination URL 
                        </InputLabel>

                        <FilledInput
                            fullWidth
                            id="filled-adornment-amount"
                            value={state.url}
                            onChange={(e) => dispatch({ type: 'UPDATE_URL', payload: (e)})}
                            color="primary"
                            variant="standard"
                            placeholde="Enter or Type a Valid URL"
                            error=
                            {
                                state.url.length > 0 && !validUrlPattern.test(state.url
                            )}
                            endAdornment = {
                                <InputAdornment 
                                    position="end"
                                >
                                    <LanguageIcon />
                                </InputAdornment>
                            }
                            className={classes.urlInput}
                        />
                    </div>
                    <CustomToggleButtonGroup  
                        handleDialogOpen={handleOpenDialog}
                        ModeSelectorComponent={ModeSelectorComp} 
                    /> 

                </FormControl>
              
            </Container>

            <UtmParamsDialog 
                open={open} 
                handleCloseDialogHook={handleCloseDialog} 
                ParamDialogComponent={ParamDialogComp} 
            /> 
        </Fragment>
    );
}

const SnackBar = () => {
    const [state, dispatch] = useCount(); 

    return (
        <Button
            size="large" 
            color="primary"
            onClick={(e) => dispatch({ 
                type: 'SNACKBAR_MESSAGE', 
                payload: { 
                    variant: 'alert', 
                    message: 'no more snacks', 
                }
            })} 
        > 
            Scooby Snacks! 
        </Button> 
    ); 
}

const DashboardCard = ({ ParamDialog, ModeSelector }) => {
    const classes = useStyles(); 

    const [state, dispatch] = useCount(); 

    const handleSubmit = () => {
        console.log('Submitting...');
        console.log(JSON.stringify(state)); 

        const resp = createLink(state); 
        console.log("Response..."); 
        console.log(resp); 
    }

    return (
        <Container 
            display="flex" 
            justifycontent="center"
        >
            <Card 
                className = {classes.dashboardCard}
            > 
                <CardContent>
                    <Typography 
                        variant="overline"
                        style = {{ 
                            fontSize: '16px' 
                        }}
                    >
                        URL Shortner
                    </Typography>

                    <Divider /> 

                    <DashboardBase 
                        ParamDialogComp={ParamDialog} 
                        ModeSelectorComp={ModeSelector} 
                    />
                </CardContent>

            
                <CardActions> 
                    <Button 
                        size="large" 
                        color="primary" 
                        variant="outlined" 
                        onClick={handleSubmit}
                    > 
                            Submit
                    </Button>
                    
                    <SnackBar /> 

                </CardActions>
            </Card> 

            <SharedSnackbar /> 
        </Container>
    )
}

export default DashboardCard;