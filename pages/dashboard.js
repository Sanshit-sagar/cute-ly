import React, { Fragment } from 'react'; 
import Router from 'next/router';

import { useAuth } from '../lib/auth';
import { useCount } from '../components/CounterContext'; 
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';  
import TextField from '@material-ui/core/TextField'; 
import ToolTip from '@material-ui/core/ToolTip';  
import Radio from '@material-ui/core/Radio'; 

import PageContainer from '../components/PageContainer'; 
import DashboardCard from './Shortener/DashboardCard'; 

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
                    <ToolTip title="utm_campaign"> 
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
                    </ToolTip> 
                    
                    <ToolTip title="utm_source"> 
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
                    </ToolTip> 
                    
                    <ToolTip title="utm_medium"> 
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
                    </ToolTip> 

                    <ToolTip title="utm_term"> 
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
                    </ToolTip>

                </div> 
            </Grid>
        </Fragment>
    );
}

const ModeSelectionRadio = () => {
    const [state, dispatch] = useCount();
  
    return (
      <div className="radioButtonGroup">
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


