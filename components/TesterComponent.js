import React, { 
    Fragment, 
    useState, 
    useReducer, 
    createContext 
} from 'react'; 

import { makeStyles, withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button'; 
import Paper from '@material-ui/core/Paper';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel'; 

import PlayArrowIcon from '@material-ui/icons/PlayArrow'; 
import AppleIcon from '@material-ui/icons/Apple'; 
import AndroidIcon from '@material-ui/icons/Android';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';

import UtmForm from './Forms/UtmForm';
import AppleForm from './Forms/AppleForm';
import AndroidForm from './Forms/AndroidForm'; 
import MetaForm from './Forms/MetaForm'; 
import { useCount } from './SharedContext'; 
import StyledSharedDialog from './Composites/StyledSharedDialog';

const useStyles = makeStyles((theme) => ({
    paper: {
        border: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(1),
        minHeight: '90%',
        maxHeight: '90%',
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



const TesterBase = ({ state, dispatch, handleGoogle, handleApple, handleAndroid, handleMeta }) => {
    const classes = useStyles(); 

    const [globalState, globalDispatch] = useCount(); 

    const [open, setOpen] = useState(false); 
    const [name, setName] = useState(''); 

    const [gState, gDispatch] = useCount(); 

    const validUrlPattern =  /^https?:\/\/([\w\d\-]+\.)+\w{2,}(\/.+)?$/;

    const handleOpen = (name) => {
        setName(name);
        setOpen(true); 
    }

    const handleClose = () => {
        setOpen(false); 
    }

    const getIconColor = () => {
        return !validUrlPattern.test(gState.url) ? 'gray' : '#1eb980'; 
    }

    const GooglePlayAnalyticsButton = () => {
        return (
        <div style={{ marginRight: '5px',marginTop: '7.5px' }}>
            <Tooltip 
                arrow
                enterDelay={500} 
                title={
                    <Typography variant="caption" color="primary">
                        UTM Analytics
                    </Typography>
                }
            >
                <Button 
                    size="small"
                    color="primary"
                    variant="outlined"
                    disabled={!validUrlPattern.test(gState.url)}
                    onClick={() => handleOpen("google")}
                    style={{ paddingTop: '7.5px' }}
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
                                    <Badge badgeContent={0}>
                                        <PlayArrowIcon style={{ color: getIconColor() }} />
                                    </Badge>
                                }
                            </div>
                        }
                        label={
                            <Typography 
                                variant="overline"
                                style={{ fontSize: '8px' }}
                            > 
                                UTM 
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
        <div style={{ marginRight: '5px',marginTop: '7.5px' }}>
            <Tooltip 
                arrow
                enterDelay={500} 
                title={
                    <Typography variant="caption" color="primary">
                        iOS Parameters
                    </Typography>
                }
            >
                <Button 
                    size="small"
                    color="primary"
                    disabled={!validUrlPattern.test(gState.url)}
                    variant="outlined"
                    margin="dense"
                    onClick={() => handleOpen("apple")}
                    style={{ paddingTop: '7.5px' }}
                >
                    <FormControlLabel 
                        value="ios" 
                        control={
                            <div>
                                 { 
                                    globalState.counts.ios >= 1 ?
                                        (
                                            <Badge badgeContent={globalState.counts.ios} color="secondary">
                                                <AppleIcon style={{ color: 'silver', fontSize: '24px' }} />
                                            </Badge>
                                        )
                                    : 
                                    <Badge badgeContent={0}>
                                        <AppleIcon style={{ color: getIconColor() }}/>
                                    </Badge>
                                }
                            </div>
                        }
                        label={
                            <Typography 
                                variant="overline"
                                style={{ fontSize: '8px' }}
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
        <div style={{ marginRight: '5px',marginTop: '7.5px' }}>
           <Tooltip 
                arrow
                enterDelay={500} 
                title={
                    <Typography variant="caption" color="primary">
                        Android Parameters
                    </Typography>
                }
            > 
                <Button 
                    size="small"
                    color="primary"
                    disabled={!validUrlPattern.test(gState.url)}
                    variant="outlined"
                    onClick={() => handleOpen('android')}
                    style={{ paddingTop: '7.5px' }}
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
                                    <Badge badgeContent={0}>
                                        <AndroidIcon style={{ color: getIconColor() }}/>
                                    </Badge>
                                }
                            </div>
                        }
                        label={
                            <Typography 
                                variant="overline"
                                style={{ fontSize: '8px' }}
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
        <div style={{ marginRight: '5px',marginTop: '7.5px' }}>
            <Tooltip 
                arrow
                enterDelay={500} 
                title={
                    <Typography variant="caption" color="primary">
                        Social Meta Tags
                    </Typography>
                }
            >  
                <Button 
                    size="small"
                    color="primary"
                    variant="outlined"
                    disabled={!validUrlPattern.test(gState.url)}
                    onClick={() => handleOpen('meta')}
                    style={{ paddingTop: '7.5px' }}
                >
                    <FormControlLabel 
                        value="meta" 
                        control={
                            <div>
                                 { 
                                    globalState.counts.meta >= 1 ?
                                        (
                                            <Badge badgeContent={globalState.counts.meta} color="secondary">
                                                <LabelImportantIcon style={{ color: 'aqua' }} />
                                            </Badge>
                                        )
                                    : 
                                    <Badge badgeContent={0} color="secondary">
                                        <LabelImportantIcon style={{ color: getIconColor() }} />
                                    </Badge>
                                }
                            </div>
                        }
                        label={
                            <Typography 
                                variant="overline"
                                style={{ fontSize: '8px' }}
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
        title: 'UTM Analytics',
        message: 'Google Play Analytics Parameters', 
        component: <UtmForm state={state} dispatch={dispatch} /> 
    }

    const appleFormFields = {
        name: 'ios',
        title: 'iOS Parameters',
        message: 'ios Parameters', 
        component: <AppleForm state={state} dispatch={dispatch} />
    }

    const androidFormFields = {
        name: 'android',
        title: 'Android Parameters',
        message: 'Android Parameters', 
        component: <AndroidForm state={state} dispatch={dispatch} />
    }

    const metaFormFields = {
        name: 'meta',
        title: 'Social Meta Tag Parameters',
        message: 'Social Meta Tags', 
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

    const getBodyColor = () => {
        const [state, dispatch] = useCount(); 

        return !validUrlPattern.test(state.url) ? 'gray' : '#1eb980';
    }

   return (
        <Fragment>
            <StyledToggleButtonGroup>
                <Paper elevation={0} className={classes.paper}>
                    <div style = {{ display: 'flex', flexDirection: 'column' }}>
                        <FormLabel component="legend" style={{ marginLeft: '5px' }}> 
                            <Typography variant="overline" style={{ color: getBodyColor() }}> 
                                Analytics
                            </Typography> 
                        </FormLabel>

                        <Divider style={{ backgroundColor: getBodyColor() }}/> 
                
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
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