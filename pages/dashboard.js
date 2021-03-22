import React, { Fragment } from 'react'; 
import Router from 'next/router';

import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tooltip from '@material-ui/core/Tooltip';  
import TextField from '@material-ui/core/TextField'; 
import Typography from '@material-ui/core/Typography'; 
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Box from '@material-ui/core/Box';

import { makeStyles, withStyles } from '@material-ui/core/styles'; 

import { useAuth } from '../lib/auth';
import { useCount } from '../components/SharedContext'; 

import SharedSnackbar from '../components/Snackbar';
import PageContainer from '../components/PageContainer'; 
import DashboardCard from '../components/DashboardCard'; 
import ResultsDialog from '../components/ResultsDialog';

import { iosFields, androidFields, metaTagsFields, utmFields } from '../constants/analyticsFields'; 

const useStyles = makeStyles({
    root: {
        display: 'flex', 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'center',
        margin: '2.5px',
        width: '100%'
    },
    utmForm: {
        display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '450px', justifyContent: 'space-around'
    }
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


const ModeSelectionRadio = () => {
    
    return (
    <StyledToggleButtonGroup>
        <div style = {{ display: 'flex', flexDirection: 'column' }}>
            <FormLabel component="legend" style={{ marginLeft: '5px' }}> 
                <Typography variant="overline"> 
                    options
                </Typography> 
            </FormLabel>
    
            <div style={{ height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Tooltip title="Short format (4 chars)"> 
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
                </Tooltip> 
                

                <Tooltip title="Unguessable format (16 chars)">
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
                </Tooltip>
            </div>

        </div>  
    </StyledToggleButtonGroup> 
    );
 }


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
                                value={state.ios[item.name] }
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


const SocialMetaTagsForm = () => {
    const classes = useStyles();
    const [state, dispatch] = useCount();  

    return (
        <Fragment> 
            <div className={classes.utmForm}> 
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
            <div className={classes.utmForm}> 
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
    const [ state, dispatch ] = useCount(); 

    if(!user && !loading) {
        Router.push('/');
    }

    //TOOD: dispatch SNACKBAR_TRIGGER with message greeting user
    
    return (
        <PageContainer> 
        
            <DashboardCard 
                GoogleAnalyticsForm = { UtmForm } 
                iOSAnalyticsForm = { IosForm }
                AndroidAnalyticsForm = { AndroidForm }
                MetaTagsDetailsForm = { SocialMetaTagsForm }
                ModeSelector = { ModeSelectionRadio }  
            /> 
            {/* <TextField 
                multiline 
                // fullWidth 
                variant="outlined" 
                color="textSecondary"
                disabled 
                value={state.url}
                style={{ marginTop: '100px', width: '600px'}} 
            />  */}
            <ResultsDialog />
            <SharedSnackbar /> 
            
        </PageContainer>
    ); 
}

export default Dashboard; 


