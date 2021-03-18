import React, { useState, Fragment } from 'react'; 
import Router from 'next/router';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Tooltip from '@material-ui/core/Tooltip';  
import TextField from '@material-ui/core/TextField'; 
import Typography from '@material-ui/core/Typography'; 

import { makeStyles } from '@material-ui/core/styles'; 


import { useAuth } from '../lib/auth';
import { useCount } from '../components/SharedContext'; 

import SharedSnackbar from '../components/Snackbar';
import PageContainer from '../components/PageContainer'; 
import DashboardCard from '../components/DashboardCard'; 
import ResultsDialog from '../components/ResultsDialog';

const useStyles = makeStyles({
    root: {
        display: 'flex', 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'center',
        margin: '2.5px',
        width: '100%'
    },
});

const RadioA = () => {
    const [state, dispatch] = useCount();
  
    return (
        <Radio 
            color="primary"
            value="SHORT"
            name="radio-short"
            checked = {
                state.mode === 'SHORT'
            }
            onChange={(e) => 
                dispatch({ 
                    'type'  : 'UPDATE_MODE', 
                    payload : e.target 
                })
            }
        />
    );
}

const RadioB = () => {
    const [state, dispatch] = useCount();
  
    return (
        <Radio 
            color="primary"
            value="UNGUESSABLE"
            name="radio-unguessable"
            checked = {
                state.mode === 'UNGUESSABLE'
            }
            onChange={(e) => 
                dispatch({ 
                    'type'  : 'UPDATE_MODE', 
                    payload : e.target 
                })
            }
        />
    );
}

const ModeSelectionRadio = () => {
    
    return (
      <div className="radioButtonGroup">
          <FormControl component="fieldset">
            
            <FormLabel component="legend" style={{ marginLeft: '5px' }}> 
                <Typography variant="overline" style={{ fontSize: '12px', marginLeft: '5px' }}> 
                    format 
                </Typography> 
            </FormLabel>

            <RadioGroup 
                row 
                aria-label="options-radio" 
                name="customized-radios"
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}
            >
                <FormControlLabel
                    value="SHORT"
                    control={<RadioA color="primary" />}
                    label={
                        <Typography 
                        variant="overline" 
                        style={{ fontSize: '10px' }}
                        > 
                            SHORT 
                        </Typography>
                    }
                    labelPlacement="bottom"
                />
                
                <FormControlLabel
                    value="UNGUESSABLE"
                    control={
                        <RadioB color="primary" />
                    }
                    label={
                        <Typography 
                            variant="overline" 
                            style={{ fontSize: '10px' }}
                        > 
                            CRYPTIC 
                        </Typography>
                    }
                    labelPlacement="bottom"
                />
            </RadioGroup>
        </FormControl> 
    </div> 
    );
 }


const utmFields = [
    {
        name: 'campaign', 
        label: 'Campaign', 
        placeholder: "e.g. ACME Campaign, ...", 
        title: 'UTM Parameter - Campaign', 
        description: 'todo'
    },
    { 
        name: 'source', 
        label: 'Source', 
        placeholder: "e.g. Facebook, Twitter etc", 
        title: 'UTM Parameter - Source', 
        description: 'todo',
    },
    { 
        name: 'term', 
        label: 'Term', 
        placeholder: "e.g TODO", 
        title: 'UTM Parameter - Term', 
        description: 'todo',
    },
    { 
        name: 'medium',
        label: 'Medium', 
        placeholder: "e.g. Newspaper, Social Media, etc.",
        title: 'UTM Parameter - Source',
        description: 'todo', 
    }
];

const iosFields = [
    {
        name: 'bundleId', 
        label: 'iOS Bundle ID', 
        placeholder: "e.g. todo", 
        title: 'iOS Info - Bundle ID', 
        description: 'todo'
    },
    { 
        name: 'customScheme', 
        label: 'iOS Custom Scheme', 
        placeholder: "e.g. todo", 
        title: 'UTM Parameter - Source', 
        description: 'todo',
    },
    { 
        name: 'fallbackLink', 
        label: 'iOS Fallback Link', 
        placeholder: "e.g. todo", 
        title: 'iOS Info - Fallback Link', 
        description: 'todo',
    },
    { 
        name: 'ipadBundleId',
        label: 'iOS iPad Bundle ID', 
        placeholder: "e.g. todo", 
        title: 'UTM Parameter - iPad Bundle ID',
        description: 'todo', 
    }
];

const UtmForm = () => {
    const classes = useStyles();
    const [state, dispatch] = useCount();  

    const handleKeyPress = (event) => { 
        dispatch({ 
            type: 'UPDATE_UTM', 
            payload: { 
                name: event.target.name, 
                value: event.target.value
            }
        });
    }

    return (
        <div className={classes.utmForm}> 
            {utmFields.map((item) => (
                <div key={item.key}>
                    <Tooltip title={item.title}> 
                        <TextField
                            variant="outlined"
                            color="primary"
                            name={item.name}
                            label={item.label}
                            value={state.utm[item.name]}
                            placeholder={item.placeholder} 
                            style={{ margin: '7.5px'}} 
                            onChange={handleKeyPress}
                        />
                    </Tooltip>
                </div>
            ))} 
        </div>  
       
    );
}

const IosForm = () => {
    const classes = useStyles();
    const [state, dispatch] = useCount();  

    return (
        <Fragment> 
            <div className={classes.utmForm}> 
                {iosFields.map((item) => (
                    <div key={item.key}>
                        <Tooltip title={item.title}> 
                            <TextField
                                variant="outlined"
                                color="primary"
                                name={item.name}
                                label={item.label}
                                value={state.ios [item.name] }
                                placeholder={item.placeholder} 
                                style={{ margin: '7.5px'}} 
                                onChange={
                                    (e) => dispatch({ 
                                        type: 'UPDATE_IOS', 
                                        payload: { 
                                            name: item.name, 
                                            value: e.target.value
                                        }
                                    })
                                }
                            />
                        </Tooltip>
                    </div>
                ))} 
            </div>  
        </Fragment>
    );
}

var androidFields = [
    {
        key: 1,
        name: 'packageName', 
        label: 'Android Package Name', 
        placeholder: "e.g. todo", 
        title: 'Android Info - Package Name', 
        description: 'todo'
    },
    {
        key: 2,
        name: 'fallbackLink', 
        label: 'Android Fallback Link', 
        placeholder: "e.g. todo", 
        title: 'Android Info - Fallback Link', 
        description: 'todo'
    },
    {
        key: 3,
        name: 'minPackageVersionCode', 
        label: 'Min Package Code', 
        placeholder: "e.g. todo", 
        title: 'Android Info - Android Min. Package Version Code', 
        description: 'Android Min. Package Version Code'
    },
]

var metaTagsFields = [ 
    {
        key: 1,
        name: 'socialTitle',
        label: 'Social Title', 
        placeholder: 'e.g. todo',
        title: 'Social Title', 
        description: 'The title to use when the Dynamic Link is shared in a social post'
    },
    {
        key: 2,
        name: 'socialDescription',
        label: 'Social Description', 
        placeholder: 'e.g. todo',
        title: 'Social Description', 
        description: 'The description to use when the Dynamic Link is shared in a social post.'
    },
    {
        key: 3,
        name: 'socialImageLink',
        label: 'Social Image Link', 
        placeholder: 'e.g. facebook.com...',
        title: 'Social Title', 
        description: 'The URL to an image related to this link.'
    }
]; 

const SocialMetaTagsForm = () => {
    const classes = useStyles();
    const [state, dispatch] = useCount();  

    return (
        <Fragment> 
            <div className={classes.metaTagsForm}> 
                {metaTagsFields.map((item) => (
                    <div key={item.key}>
                        <Tooltip title={item.title}> 
                            <TextField
                                variant="outlined"
                                color="primary"
                                name={item.name}
                                label={item.label}
                                value={state.meta[item.name]}
                                placeholder={item.placeholder} 
                                style={{ margin: '7.5px'}} 
                                onChange={
                                    (e) => dispatch({ 
                                        type: 'UPDATE_META', 
                                        payload: { 
                                            name: item.name, 
                                            value: e.target.value
                                        }
                                    })
                                }
                            />
                        </Tooltip>
                    </div>
                ))} 
            </div>  
        </Fragment>
    );
}

const AndroidForm = () => {
    const classes = useStyles();
    const [state, dispatch] = useCount();  

    return (
        <Fragment> 
            <div className={classes.androidForm}> 
                {androidFields.map((item) => (
                     <div key={item.key}>
                        <Tooltip title={item.title}> 
                            <TextField
                                variant="outlined"
                                color="primary"
                                name={item.name}
                                label={item.label}
                                value={state.android[item.name]}
                                placeholder={item.placeholder} 
                                style={{ margin: '7.5px'}} 
                                onChange={
                                    (e) => dispatch({ 
                                        type: 'UPDATE_ANDROID', 
                                        payload: { 
                                            name: item.name, 
                                            value: e.target.value
                                        }
                                    })
                                }
                            />
                        </Tooltip>
                    </div>
                ))} 
            </div>  
        </Fragment>
    );
}


function Dashboard () {
    const { user, loading } = useAuth(); 

    const [open, setOpen] = useState(false); 
    const resultMssg = "Hello Hello Hello There"; 

    const handleOpen = () => {
        setOpen(true); 
    }
    const handleClose = () => {
        setOpen(false); 
    }

    if(!user && !loading) {
        Router.push('/');
    }
    
    return (
        <PageContainer> 
            <DashboardCard 
                GoogleAnalyticsForm = { UtmForm } 
                iOSAnalyticsForm = { IosForm }
                AndroidAnalyticsForm = { AndroidForm }
                MetaTagsDetailsForm = { SocialMetaTagsForm }
                ModeSelector = { ModeSelectionRadio }  
            /> 

            <ResultsDialog />
            <SharedSnackbar /> 
        </PageContainer>
    ); 
}

export default Dashboard; 


