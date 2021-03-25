import React, { 
    Fragment, 
    useState, 
    useReducer, 
    createContext 
} from 'react'; 

import { makeStyles, withStyles } from '@material-ui/core/styles';

import { 
    Grid, 
    Paper, 
    Button, 
    FormLabel, 
    FormControlLabel,
    Typography, 
    Divider,
    Tooltip,
    Badge
} from '@material-ui/core';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import PlayArrowIcon from '@material-ui/icons/PlayArrow'; 
import AppleIcon from '@material-ui/icons/Apple'; 
import AndroidIcon from '@material-ui/icons/Android';
import InstagramIcon from '@material-ui/icons/Instagram';

import { useCount } from './SharedContext'; 
import StyledSharedDialog from './Composites/StyledSharedDialog';

import UtmForm from './Forms/UtmForm';
import AppleForm from './Forms/AppleForm';
import AndroidForm from './Forms/AndroidForm'; 
import MetaForm from './Forms/MetaForm'; 

const useStyles = makeStyles((theme) => ({
    paper: {
        border: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(1),
        backgroundColor: '#fff'
    },
    paperPurple: {
        border: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(2),
        backgroundColor: theme.palette.primary.dark,
    },
}));

const initialState = {
    utm: {
        source: '',
        medium: '',
        campaign: '',
        term: '',
    },
    ios: {
        bundleId: '',
        fallbackLink: '',
        ipadBundleId: '',
        ipadFallbackLink: '',
        customScheme: '',
        appStoreId: '',
    },
    android: {
        packageName: '',
        fallbackLink: '',
        minPackageVersionCode: '',
    },
    meta: {
        title: '',
        description: '',
        imageLink: '',
    },
};

const testReducer = (state, action) => {
    switch(action.type) {
        case "UPDATE_INPUT_UTM":
            return {
                ...state,
                utm: {
                    ...state.utm,
                    [action.payload.name]: action.payload.value
                }
            };
        case "UPDATE_INPUT_IOS":
            return {
                ...state,
                ios: {
                    ...state.ios,
                    [action.payload.name]: action.payload.value
                }
            };
        case "UPDATE_INPUT_ANDROID": 
            return {
                ...state,
                android: {
                    ...state.android,
                    [action.payload.name]: action.payload.value
                }
            };
        case "UPDATE_INPUT_META":
            return {
                ...state,
                meta: {
                    ...state.meta,
                    [action.payload.name]: action.payload.value
                }
            };
        default: 
            return state;
    } 
}

const StyledToggleButtonGroup = withStyles((theme) => ({
    grouped: {
      margin: theme.spacing(0.5),
      border: 'none',
      '&:not(:first-child)': {
        borderRadius: theme.shape.borderRadius,
      },
      '&:first-child': {
        borderRadius: theme.shape.borderRadius,
      },
    },
}))(ToggleButtonGroup);

const TesterBase = ({ state, dispatch, handleGoogle, handleApple, handleAndroid, handleMeta }) => {
    const classes = useStyles(); 

    const [globalState, globalDispatch] = useCount(); 

    const [open, setOpen] = useState(false); 
    const [name, setName] = useState(''); 

    const handleOpen = (name) => {
        setName(name);
        setOpen(true); 
    }

    const handleClose = () => {
        setOpen(false); 
    }

    const GooglePlayAnalyticsButton = () => {
        return (
        <div style={{ marginTop: '10px', marginRight: '5px' }}>
            <Tooltip title="Google Analytics Info"> 
                <Button 
                    size="large"
                    color="primary"
                    onClick={() => handleOpen("google")}
                    style={{ height: '100%', backgroundColor: (globalState.counts.utm >=1 && 'white') }}
                >
                    <FormControlLabel 
                        value="utm" 
                        control = {
                            <div>
                                { 
                                    globalState.counts.utm >= 1 ?
                                        (
                                            <Badge badgeContent={globalState.counts.utm} color="secondary">
                                                <PlayArrowIcon style={{ color: 'maroon' }} />
                                            </Badge>
                                        )
                                    : 
                                        <PlayArrowIcon style={{ color: 'black' }} />
                                }
                            </div>
                        }
                        label={
                            <Typography 
                                variant="overline"
                                style={{ fontSize: '8px', color: 'black' }}
                            > 
                                Google 
                            </Typography>
                        }
                        labelPlacement="bottom"
                    />
                </Button>
            </Tooltip>     
        </div>
        );
    }

    const AppleAnalyticsButton = () => {
        return (
        <div style={{ marginTop: '10px', marginRight: '5px' }}>
            <Tooltip title="iOS Info"> 
                <Button 
                    size="large"
                    color="primary"
                    onClick={() => handleOpen("apple")}
                    style={{ height: '100%', backgroundColor: (globalState.counts.ios >=1 && 'white') }}
                >
                    <FormControlLabel 
                        value="ios" 
                        control={
                            <div>
                                 { 
                                    globalState.counts.ios >= 1 ?
                                        (
                                            <Badge badgeContent={globalState.counts.ios} color="secondary">
                                                <AppleIcon style={{ color: 'silver' }} />
                                            </Badge>
                                        )
                                    : 
                                    <AppleIcon style={{ color: 'black' }} />
                                }
                            </div>
                        }
                        label={
                            <Typography 
                                variant="overline"
                                style={{ fontSize: '8px', color: 'black' }}
                            > 
                                iOS 
                            </Typography>
                        }
                        labelPlacement="bottom"
                    />
                </Button>
            </Tooltip>  
        </div>   
        );
    }

    const AndroidAnalyticsButton = () => {
        return (
        <div style={{ marginTop: '10px', marginRight: '5px' }}>
            <Tooltip title="Android Info"> 
                <Button 
                    size="large"
                    color="primary"
                    onClick={() => handleOpen('android')}
                    style={{ height: '100%', backgroundColor: (globalState.counts.android >=1 && 'white') }}
                >
                    <FormControlLabel 
                        value="android" 
                        control={
                            <div>
                                 { 
                                    globalState.counts.android >= 1 ?
                                        (
                                            <Badge badgeContent={globalState.counts.android} color="secondary">
                                                <AndroidIcon style={{ color: 'lime' }} />
                                            </Badge>
                                        )
                                    : 
                                    <AndroidIcon style={{ color: 'black' }} />
                                }
                            </div>
                        }
                        label={
                            <Typography 
                                variant="overline"
                                style={{ fontSize: '8px', color: 'black' }}
                            > 
                                Android
                            </Typography>
                        }
                        labelPlacement="bottom"
                    />
                </Button>
            </Tooltip>  
        </div>   
        );
    }

    const SocialMetaTagsButton = () => {
        return (
        <div style={{ marginTop: '10px', marginRight: '5px' }}>
            <Tooltip title="Social Meta Info"> 
                <Button 
                    size="large"
                    color="primary"
                    onClick={() => handleOpen('meta')}
                    style={{ height: '100%',  backgroundColor: (globalState.counts.meta >=1 && 'white')}}
                >
                    <FormControlLabel 
                        value="meta" 
                        control={
                            <div>
                                 { 
                                    globalState.counts.meta >= 1 ?
                                        (
                                            <Badge badgeContent={globalState.counts.meta} color="secondary">
                                                <InstagramIcon style={{ color: 'pink' }} />
                                            </Badge>
                                        )
                                    : 
                                    <InstagramIcon style={{ color: 'black' }} />
                                }
                            </div>
                        }
                        label={
                            <Typography 
                                variant="overline"
                                style={{ fontSize: '8px', color: 'black' }}
                            > 
                                Social
                            </Typography>
                        }
                        labelPlacement="bottom"
                    />
                </Button>
            </Tooltip>    
        </div> 
        );
    }

    const googleFormFields = {
        name:'google',
        title: 'google form',
        message: 'google analytics parameters below - description here', 
        component: <UtmForm state={state} dispatch={dispatch} /> 
    }

    const appleFormFields = {
        name: 'ios',
        title: 'ios form',
        message: 'ios analytics parameters below - description here', 
        component: <AppleForm state={state} dispatch={dispatch} />
    }

    const androidFormFields = {
        name: 'android',
        title: 'android form',
        message: 'android analytics parameters below - description here', 
        component: <AndroidForm state={state} dispatch={dispatch} />
    }

    const metaFormFields = {
        name: 'meta',
        title: 'meta form',
        message: 'social meta tag parameters below - description here', 
        component: <MetaForm state={state} dispatch={dispatch} />
    }

    const submitHandlerMap = {
        google: handleGoogle, 
        apple: handleApple,
        android: handleAndroid,
        meta: handleMeta
    };
    const formFieldsMap = {
        google: googleFormFields,
        apple: appleFormFields,
        android: androidFormFields,
        meta: metaFormFields
    };

   return (
        <Fragment>
            <StyledToggleButtonGroup>
                <Paper elevation={3} className={classes.paper}>
                    <div style = {{ display: 'flex', flexDirection: 'column' }}>
                        <FormLabel component="legend" style={{ marginLeft: '15px' }}> 
                            <Typography variant="overline"> 
                                Analytics
                            </Typography> 
                        </FormLabel>

                        <Divider /> 
                
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                           <GooglePlayAnalyticsButton /> 
                           <AppleAnalyticsButton /> 
                           <AndroidAnalyticsButton />
                           <SocialMetaTagsButton />
                        </div> 
                    </div> 
                </Paper> 
            </StyledToggleButtonGroup> 

            <StyledSharedDialog 
                open={open}
                handleClose={handleClose} 
                handleSubmit={submitHandlerMap[name]}
                content={formFieldsMap[name]} 
            />
        </Fragment>
    );
}


const TesterContext = createContext(); 

function TesterComp() {
    const [globalState, globalDispatch] = useCount(); 
    const [state, dispatch] = useReducer(testReducer, initialState);  

    const handleGoogle = () => {
        var utmCount = getUtmCount(); 

        globalDispatch({
            type: "UPDATE_UTM",
            payload: {
                source: state.utm.source,
                campaign: state.utm.campaign,
                medium: state.utm.medium,
                term: state.utm.term,
                count: utmCount
            }
        });
    }

    const handleApple = () => {
        var appleCount = getAppleCount(); 

        globalDispatch({ 
            type: "UPDATE_IOS", 
            payload: {
                bundleId: state.ios.bundleId,
                fallbackLink: state.ios.fallbackLink,
                ipadBundleId: state.ios.ipadBundleId,
                ipadFallbackLink: state.ios.ipadFallbackLink,
                appStoreId: state.ios.appStoreId,
                customScheme: state.ios.customScheme,
                count: appleCount
            }
        }); 
    }

    const handleAndroid = () => {
        var androidCount = getAndroidCount(); 

        globalDispatch({ 
            type: "UPDATE_ANDROID", 
            payload: {
                fallbackLink: state.android.fallbackLink,
                minPackageVersionCode: state.android.minPackageVersionCode,
                packageName: state.android.packageName,
                count: androidCount
            }
        });
    }

    const handleMeta = () => {
        var metaCount = getMetaCount();

        globalDispatch({ 
            type: "UPDATE_META",
            payload: {
                imageLink: state.meta.imageLink,
                description: state.meta.description,
                title: state.meta.title,
                count: metaCount
            }
        });
    }

    const getUtmCount = () => {
        var count = 0; 
        if(state.utm.source.length) {
            count = count + 1; 
        }
        if(state.utm.campaign.length) {
            count = count + 1;
        }
        if(state.utm.medium.length) {
            count = count + 1;
        }
        if(state.utm.term.length) {
            count = count + 1;
        }
        return count; 
    }

    const getAppleCount = () => {
        var count = 0; 
        if(state.ios.bundleId.length) {
            count = count + 1; 
        }
        if(state.ios.ipadBundleId.length) {
            count = count + 1; 
        }
        if(state.ios.fallbackLink.length) {
            count = count + 1;
        }
        if(state.ios.ipadFallbackLink.length) {
            count = count + 1;
        }
        if(state.ios.appStoreId.length) {
            count = count + 1;
        }
        if(state.ios.customScheme.length) {
            count = count + 1;
        }
        return count; 
    }

    const getAndroidCount = () => {
        var count = 0;
        if(state.android.packageName.length) {
            count = count + 1;
        }
        if(state.android.fallbackLink.length) {
            count = count + 1;
        }
        if(state.android.minPackageVersionCode.length) {
            count = count + 1; 
        }
        return count; 
    }

    const getMetaCount = () => {
        var count = 0; 
        if(state.meta.imageLink) {
            count = count + 1;
        }
        if(state.meta.description) {
            count = count + 1;
        }
        if(state.meta.title) {
            count = count + 1;
        }
        return count; 
    }
   
    return(
        <TesterContext.Provider value={{ state, dispatch }}>
            <TesterBase
                state={state}
                dispatch={dispatch} 
                handleGoogle={handleGoogle}
                handleApple={handleApple}
                handleAndroid={handleAndroid}
                handleMeta={handleMeta}
            />
        </TesterContext.Provider>
    );
}

const TesterComponent = () => {
    return (
        <TesterComp /> 
    );
}

export default TesterComponent;