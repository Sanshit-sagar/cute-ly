import React, { Fragment, useState } from 'react'; 
import useSWR from "swr";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import EvStationIcon from '@material-ui/icons/EvStation';
import ErrorIcon from '@material-ui/icons/Error';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import { makeStyles } from '@material-ui/core/styles'; 

import { useCount } from '../SharedContext';
import fixedEncodeURIComponent from '../../utils/helpers/encoders'; 
import {sanitizeOpenGraphResponse} from '../../utils/helpers/sanitizers'; 

const useStyles = makeStyles((theme) => ({
    autoFillButton: {

    },
    fetcherIcon: {
        color: theme.palette.background.header,
    },
}));

const fetcher = url => fetch(url).then(res => res.json());

const DataFetcher = () => {
    const classes = useStyles();
    const [state, dispatch] = useCount();

    const a = 'https://opengraph.io/api/1.1/site/';
    const b = fixedEncodeURIComponent(state.url);  
    const c = '?app_id=112cded9-a3da-4694-82e4-fa66aa7694bf'; 
    const requestBody = a + b + c; 

    const { data, error } = useSWR(requestBody, fetcher);
    const sanitizedOpenGraphData = sanitizeOpenGraphResponse(data);

    const handleAutofill = () => {
        if(data && !error) {
            dispatch({
                type: 'OPEN_GRAPH_RESULTS',
                payload: {
                    value: sanitizedOpenGraphData,
                }
            }); 
        } else {
            dispatch({
                type: 'SNACKBAR_TRIGGER',
                payload: {
                    message: 'Could retrieve Open Graph tags: ' + error.message,
                    key: new Date().getTime().toString(),
                }
            });
        }
    }

    return (
        <Button 
            variant="outlined" 
            onClick={handleAutofill}
            className={classes.autoFillButton}
        >
            <Fragment>
                { 
                        !data 
                    ?   
                        <CircularProgress color="primary" /> 
                    : 
                        <Fragment> 
                            {
                                    error
                                ?
                                    <ErrorIcon className={classes.fetcherIcon} /> 
                                :
                                    <CheckBoxIcon className={classes.fetcherIcon} /> 
                            }
                        </Fragment>
                }
            </Fragment>
        </Button>
    );
}

const RealtimeStatusBar = () => {
    const classes = useStyles();
    const [state, dispatch] = useCount();
    const [doFetch, setDoFetch] = useState(false); 

    const validUrlPattern =  /^https?:\/\/([\w\d\-]+\.)+\w{2,}(\/.+)?$/;
    
    const handleFetchData = () => {
        if(!state.url && !state.url?.length || !validUrlPattern.test(state.url)) {
            dispatch({
                type: 'SNACKBAR_TRIGGER',
                payload: {
                    message: 'A valid URL is required for this operation',
                    key: new Date().getTime().toString(),
                }
            });
        } else {
            setDoFetch(true); 
        }
    }

    return (
        <Grid 
            container="row" 
            justify="space-between" 
            alignItems="center" 
            spacing={1}
        >
            <Grid item>
                <Button 
                    disabled={doFetch} 
                    variant="outlined" 
                    color="primary" 
                    onClick={handleFetchData}
                >  
                    <EvStationIcon 
                        className={classes.fetcherIcon} 
                    /> 
                </Button>
            </Grid>

            <Grid item> 
                { doFetch ? <DataFetcher /> : null } 
            </Grid>
        </Grid>    
    );
}

export default RealtimeStatusBar;