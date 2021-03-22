import React, { Fragment, useState, useEffect } from 'react'; 
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button'; 
import FormControl from '@material-ui/core/FormControl';
import LanguageIcon from '@material-ui/icons/Language';

import Container from '@material-ui/core/Container'; 
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider'; 
import { shadows } from '@material-ui/system';
import TextField from '@material-ui/core/TextField'; 

import { createLink } from '../lib/db'; 
import { useCount } from './SharedContext'; 
import { useAuth } from '../lib/auth'; 

import SharedSnackbar from './Snackbar'; 
import CustomToggleButtonGroup from './ToggleButtonGroup'; 
import UtmParamsDialog from './UtmParamsDialog';
import ResultsDialog from './ResultsDialog';

const useStyles = makeStyles({
    urlInput: {
        backgroundColor: '#363340', 
        color: '#fff', 
        border: 'thin solid black', 
        borderRadius: '5px', 
        marginBottom: '5px',
        height: '60px',
    }, 
    shortenUrlButton: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'center',
        float: 'right', 
    }, 
    dashboardCard: {
        position: 'relative',
        left: '2.5%',
        top: '5%',
        width: '95%', 
        height: '65%',
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
        marginTop: '2.5px',
    }
});

const DashboardBase = ({ GoogleForm, iosForm, AndroidForm, MetaForm, ModeSelectorComp }) => { 
    const classes = useStyles();
    const [state, dispatch] = useCount(); 

    const [googleOpen, setGoogleOpen] = useState(false);
    const [iosOpen, setIosOpen] = useState(false); 
    const [androidOpen, setAndroidOpen] = useState(false);
    const [metaOpen, setMetaOpen] = useState(false); 
 
    const handleGoogleOpenDialog = () => {
        setGoogleOpen(true);
    }

    const handleGoogleCloseDialog = () => {
        setGoogleOpen(false);
    }

    const handleIosOpenDialog = () => {
        setIosOpen(true); 
    }

    const handleIosCloseDialog = () => {
        setIosOpen(false); 
    }

    const handleAndroidOpenDialog = () => {
        setAndroidOpen(true);
    }

    const handleAndroidCloseDialog = () => {
        setAndroidOpen(false); 
    }

    const handleMetaOpenDialog = () => {
        setMetaOpen(true);
    }

    const handleMetaCloseDialog = () => {
        setMetaOpen(false);
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
                            style={{ marginTop: '5px', color: '#fff' }}
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
                            error={state.url.length > 0 && !validUrlPattern.test(state.url)}
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
                        openGoogleDialog={handleGoogleOpenDialog}
                        openiOSDialog={handleIosOpenDialog}
                        openAndroidDialog={handleAndroidOpenDialog}
                        openMetadataDialog={handleMetaOpenDialog}
                        ModeSelectorComponent={ModeSelectorComp} 
                    /> 

                </FormControl>
              
           

                <UtmParamsDialog 
                    open={googleOpen} 
                    closeHook={handleGoogleCloseDialog} 
                    AnalyticsForm={GoogleForm}
                    name="UTM Parameters"
                /> 
                <UtmParamsDialog 
                    open={iosOpen} 
                    closeHook={handleIosCloseDialog} 
                    AnalyticsForm={iosForm} 
                    name="iOS Parameters"
                />
                <UtmParamsDialog 
                    open={androidOpen} 
                    closeHook={handleAndroidCloseDialog} 
                    AnalyticsForm={AndroidForm} 
                    name="Android Parameters"
                />

                <UtmParamsDialog 
                    open={metaOpen} 
                    closeHook={handleMetaCloseDialog} 
                    AnalyticsForm={MetaForm} 
                    name="Social Meta Tags"
                />

                </Container>
        </Fragment>
    );
}

function SubmitButton() {
    const [state, dispatch] = useCount();
    const [result, setResult] = useState(''); 
    
    const handleSubmit = async () => {
        console.log('about to create');
        const result = await createLink(state); 
        const updatedResultUrl = result.updatedUrl;

        console.log("About to dispatch: " + updatedResultUrl); 
        setResult(updatedResultUrl);

        dispatch({ 
            type: 'UPDATE_RESULTS', 
            payload: {
                value: updatedResultUrl,
                message: "New URL: " + (updatedResultUrl),
                key: new Date().getTime()
            }
        })
    }
    const validUrlPattern =  /^https?:\/\/([\w\d\-]+\.)+\w{2,}(\/.+)?$/;

    return (
        <React.Fragment>
            <Button
                size="large" 
                color="primary" 
                variant="contained" 
                onClick={handleSubmit}
                style={{ marginRight: '10px' }}
                disabled={state.url.length > 0 && !validUrlPattern.test(state.url)}
            > 
                Submit
            </Button> 
           
         </React.Fragment>
    );  
}

const DashboardCard = ({ GoogleAnalyticsForm, iOSAnalyticsForm, AndroidAnalyticsForm, MetaTagsDetailsForm, ModeSelector }) => {
    const classes = useStyles(); 

    const [state, dispatch] = useCount(); 
    // const { user, loading, error, signout } = useAuth(); 

    const handleClear = () => {
        dispatch({ 
            type: "CLEAR"
        })
    }

    return (
        <Box boxShadow={15} display="flex" flexDirection='column' justifycontent="center" className={classes.dashboardCard}>
            
                <Card style={{ width: '100%' }}>
                    
                    <CardContent>
                        <Typography 
                            variant="overline"
                            style = {{ 
                                fontSize: '16px' 
                            }}
                        >
                            URL Modifier
                        </Typography>
                        <Divider /> 
                    </CardContent>

                    <CardActions style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        }}
                    > 
                        <DashboardBase 
                            GoogleForm={GoogleAnalyticsForm} 
                            iosForm={iOSAnalyticsForm}
                            AndroidForm={AndroidAnalyticsForm}
                            MetaForm={MetaTagsDetailsForm}
                            ModeSelectorComp={ModeSelector} 
                        />

                        <div style={{  
                                marginTop: '10px', 
                                display: 'flex', 
                                flexDirection: 'row', 
                                alignSelf: 'flex-end', 
                                marginRight: '25px'
                            }}
                        >
                            <SubmitButton />
                            <Button
                                size="large" 
                                color="primary" 
                                variant="outlined" 
                                onClick={handleClear}
                            > 
                                Clear
                            </Button>
                        </div>
                    </CardActions>
                </Card> 
                
                {/* <TextField multiline fullWidth variant="standard" disabled value="Hello Hello" />  */}

            <ResultsDialog /> 
            <SharedSnackbar /> 
        </Box>
    )
}

export default DashboardCard;