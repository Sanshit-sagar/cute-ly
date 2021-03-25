import React, { Fragment } from 'react'; 
import Router from 'next/router';

import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tooltip from '@material-ui/core/Tooltip';  
import TextField from '@material-ui/core/TextField'; 
import Typography from '@material-ui/core/Typography'; 
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {Grid, Paper} from '@material-ui/core';

import { makeStyles, withStyles } from '@material-ui/core/styles'; 

import { useAuth } from '../lib/auth';
import { useCount } from '../components/SharedContext'; 

import SharedSnackbar from '../components/Snackbar';
import PageContainer from '../components/PageContainer'; 
import DashboardCard from '../components/DashboardCard'; 
import ResultsDialog from '../components/ResultsDialog';
import UrlModifier from '../components/Composites/UrlModifier'; 
import { iosFields, androidFields, metaTagsFields, utmFields } from '../constants/analyticsFields'; 
import { theme } from '../tailwind.config';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex', 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'center',
        margin: '2.5px',
        width: '100%'
    },
    utmForm: {
        display: 'flex', 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        width: '450px', 
        justifyContent: 'space-around',
    },
    paper: {
        padding: theme.spacing(1),
    },
    inputPaper: {
        backgroundColor: theme.palette.primary.dark,
    },
}));

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
        <Grid container> 
            <Paper elevation={5} className={classes.paper}>
                <div className={classes.utmForm}> 
                    <Paper elevation={5} className={classes.inputPaper}>
                        <Grid 
                            direction="row" 
                            justify="space-around" 
                            alignItems="center" 
                            wrap="wrap" 
                            spacing={1}
                        >
                            {utmFields.map((item) => (
                                <Grid item>
                                    <Paper>
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
                                    </Paper>
                                </Grid>
                            ))} 
                        </Grid>
                    </Paper>
                </div> 
            </Paper>
        </Grid>
       
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
        
            <UrlModifier />
              
            <ResultsDialog />
            <SharedSnackbar /> 
        </PageContainer>
    ); 
}

export default Dashboard; 


