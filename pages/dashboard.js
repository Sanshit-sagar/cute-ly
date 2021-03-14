import React, { Fragment } from 'react'; 
import Router from 'next/router';

import { useAuth } from '../lib/auth';
import { useCount } from '../components/CounterContext'; 
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';  

import PageContainer from '../components/PageContainer'; 
import DashboardCard from './Shortener/DashboardBase'; 
import TextField from '@material-ui/core/TextField'; 

import ToolTip from '@material-ui/core/ToolTip';  

import Radio from '@material-ui/core/Radio'; 

const useStyles = makeStyles({
    root: {
        display: 'flex', 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-around',
    },        
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
      <div>
        <Radio
          checked={state.mode === 'SHORT'}
          onChange={(e) => 
            dispatch({ 
                'type'  : 'UPDATE_MODE', 
                payload : e.target 
            })
          }
          value="SHORT"
          name="radio-short"
        />

        <Radio
          checked = {
              state.mode === 'GUESSABLE'
          }
          onChange={(e) => 
            dispatch({ 
                'type'  : 'UPDATE_MODE', 
                payload : e.target 
            })
          }
          value="GUESSABLE"
          name="radio-guessable"
        />
    </div> 
    );
 }

function Dashboard () {
    const { user, loading } = useAuth(); 
 
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


