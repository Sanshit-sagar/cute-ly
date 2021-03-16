import React, { Fragment } from 'react'; 
import Router from 'next/router';

import { useAuth } from '../lib/auth';
import { useCount } from '../components/SharedContext'; 
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';  

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Tooltip from '@material-ui/core/Tooltip';  
import TextField from '@material-ui/core/TextField'; 

import DashboardCard from './Shortener/DashboardCard'; 
import PageContainer from '../components/PageContainer'; 

import Typography from '@material-ui/core/Typography'; 

const useStyles = makeStyles({
    root: {
        display: 'flex', 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-around',
    },    
    radioButtonGroup: {
        paddingTop: '5px'
    }    
});

const UtmParameterBuilder = () => {
    const classes = useStyles();
    const [state, dispatch] = useCount();

    return (
        <Fragment> 
            <Grid container> 
                <div className={classes.root}> 
                    <Tooltip title="utm_campaign"> 
                        <TextField 
                            variant="standard" 
                            label="campaign"
                            name="campaign"
                            value={ 
                                state.utm.campaign 
                            }
                            onChange={
                                (e) => dispatch({ 
                                    type: 'UPDATE_UTM', 
                                    payload: { 
                                        name: 'campaign', 
                                        value: e.target.value
                                    }
                                })
                            }
                            placeholder="e.g. ACME Campaign, ..."
                            style={{ margin: '10px' }}
                        />
                    </Tooltip> 
                    
                    <Tooltip title="utm_source"> 
                        <TextField 
                            variant="standard" 
                            label="source"
                            name="source"
                            value={
                                state.utm.source
                            }
                            onChange={
                                (e) => dispatch({ 
                                    type: 'UPDATE_UTM', 
                                    payload: { 
                                        name: 'source', 
                                        value: e.target.value
                                    }
                                })
                            }
                            placeholder="e.g. Facebook, Twitter etc"
                            style={{ margin: '10px' }}
                        />
                    </Tooltip> 
                    
                    <Tooltip title="utm_medium"> 
                        <TextField 
                            variant="standard" 
                            label="medium"
                            name="medium"
                            value={
                                state.utm.medium
                            }
                            onChange={
                                (e) => dispatch({ 
                                    type: 'UPDATE_UTM', 
                                    payload: { 
                                        name: 'medium', 
                                        value: e.target.value
                                    }
                                })
                            }
                            placeholder="e.g. Newspaper, Social Media, etc."
                            style={{ margin: '10px' }}
                        />
                    </Tooltip> 

                    <Tooltip title="utm_term"> 
                        <TextField 
                            variant="standard" 
                            label="term"
                            value={ 
                                state.utm.term 
                            }
                            name="term"
                            onChange={
                                (e) => dispatch({ 
                                    type: 'UPDATE_UTM', 
                                    payload: { 
                                        name: 'term', 
                                        value: e.target.value
                                    }
                                })
                            }
                            placeholder="e.g. "
                            style={{ margin: '10px' }}
                        />
                    </Tooltip>

                </div> 
            </Grid>
        </Fragment>
    );
}

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
                <Typography variant="overline" style={{ fontSize: '12px' }}> 
                    format 
                </Typography> 
            </FormLabel>

            <RadioGroup row aria-label="options-radio" name="customized-radios">
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

function Dashboard () {
    const { user, loading, signout } = useAuth(); 
 
    if(!user && !loading) {
        Router.push('/')
    }
    
    return (
        <PageContainer> 
            { user ? 
            (
                <Fragment>
                    <DashboardCard 
                        ParamDialog = { UtmParameterBuilder } 
                        ModeSelector = { ModeSelectionRadio }  
                    /> 
                </Fragment> 
            ) 
            : null 
            }
        </PageContainer>
    ); 
}

export default Dashboard; 


