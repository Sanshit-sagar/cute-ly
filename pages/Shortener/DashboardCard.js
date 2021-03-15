import React, { Fragment, useState } from 'react'; 
import { useCount } from '../../components/CounterContext'; 
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid'; 
import Button from '@material-ui/core/Button'; 
import FormControl from '@material-ui/core/FormControl';
import LanguageIcon from '@material-ui/icons/Language';
import CustomToggleButtonGroup from './ToggleButtonGroup'; 
import UtmParamsDialog from './UtmParamsDialog';

import Container from '@material-ui/core/Container'; 
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider'; 

import { createLink } from '../../lib/db'; 

const useStyles = makeStyles({
    root: {
        
    },
    urlInput: {
        backgroundColor: 'white', 
        width: '100%', 
        height: '100%', 
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
        height: '50%',
        backgroundColor: 'white', 
        border: 'thin solid black', 
        borderRadius: "5px", 
    },
    cardContent: {
        borderRadius: '5px', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'stretch',
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
                <Grid 
                    item 
                    className={classes.urlInput}
                > 
                    <FormControl 
                        fullWidth 
                        className={classes.margin} 
                        variant="filled"
                    >
                        <div className={classes.smallGap}> 
                            <InputLabel htmlFor="filled-adornment-amount">
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
                                    <InputAdornment position="end">
                                        <LanguageIcon />
                                    </InputAdornment>
                                }
                            />
                        </div>
                        <CustomToggleButtonGroup  
                            handleDialogOpen={handleOpenDialog}
                            ModeSelectorComponent={ModeSelectorComp} 
                        /> 

                    </FormControl>
                </Grid>                
            </Container>

            <UtmParamsDialog 
                open={open} 
                handleCloseDialogHook={handleCloseDialog} 
                ParamDialogComponent={ParamDialogComp} 
            /> 
        </Fragment>
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
            justifyContent="center"
        >
            <Card 
                className = {classes.dashboardCard}
            > 
                <CardContent>
                    <Typography 
                        variant="overline"
                        component="body1" 
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
                </CardActions>
            </Card> 
        </Container>
    )
}

export default DashboardCard;