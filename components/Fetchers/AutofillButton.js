import React, { Fragment, useEffect, useState } from 'react'; 

import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EvStationIcon from '@material-ui/icons/EvStation';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorTwoToneIcon from '@material-ui/icons/ErrorTwoTone';

import { makeStyles } from '@material-ui/core/styles'; 

import useSWR from "swr";
import { useCount } from '../SharedContext';
import fixedEncodeURIComponent from '../../utils/helpers/encoders'; 
import {sanitizeOpenGraphResponse} from '../../utils/helpers/sanitizers'; 

const useStyles = makeStyles((theme) => ({
    fetcherIcon: {
        color: theme.palette.background.header,
    },
}));

const fetcher = url => fetch(url).then(res => res.json());

const OpenGraphFetcher = () => {
    const classes = useStyles();
    const [state, dispatch] = useCount();
    const [isLoading, setIsLoading] = useState(true);

    const a = 'https://opengraph.io/api/1.1/site/';
    const b = fixedEncodeURIComponent(state.url);  
    const c = '?app_id=112cded9-a3da-4694-82e4-fa66aa7694bf'; 
    const requestBody = a + b + c; 

    const { data, error } = useSWR(requestBody, fetcher);
    const sanitizedOpenGraphData = sanitizeOpenGraphResponse(data);

    useEffect(() => {
        if(data && !error) {
            setIsLoading(false); 
        } 
    }, [data, error, sanitizedOpenGraphData]); 

    const handleAutofill = () => {
        if(!isLoading) {
            if(!error) {
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
                        message: 'Open Graph was unable to retrieve results',
                        key: new Date().getTime().toString(),
                    }
                });
            }
        } else {
            dispatch({
                type: 'SNACKBAR_TRIGGER',
                payload: {
                    message: 'Awaiting Results',
                    key: new Date().getTime().toString(),
                }
            });
        }
    }

    return (
        <Button 
            variant="outlined" 
            onClick={handleAutofill}
            size="large"
            style={{ marginTop: '7.5px', borderColor: '#1eb980' }}
        >
            <Fragment>
                {
                        isLoading 
                    ?
                        <CircularProgress size={30} />
                    :
                        <EvStationIcon 
                            color="primary" 
                        /> 
                }
            </Fragment>
        </Button>
    );
}

const AutofillButton = () => {
    const [state, dispatch] = useCount();
    const [doFetch, setDoFetch] = useState(false); 

    const validUrlPattern =  /^https?:\/\/([\w\d\-]+\.)+\w{2,}(\/.+)?$/;

    useEffect(() => {
        if(state.url && state.url.length && validUrlPattern.test(state.url)) {
            setDoFetch(true);
        } else {
            setDoFetch(false); 
        }
    }, [state.url]);

    const getTooltipText = () => {
        return 'Open Graph Autofill: Please enter a valid URL to retrieve Open Graph data';
    }

    const handleClick = () => {
        dispatch({
            type: 'SNACKBAR_TRIGGER',
            payload: {
                message: 'Please enter a valid URL to retrieve Open Graph data',
                key: new Date().getTime().toString(),
            }
        });
    }

    return (
        <Grid 
            container="row" 
            justify="space-between" 
            alignItems="center" 
            spacing={1}
        >
            <Grid item> 
                { 
                    doFetch 
                ? 
                    <OpenGraphFetcher /> 
                : 
                    <Fragment>
                        <Tooltip 
                            arrow
                            enterDelay={500} 
                            title={
                                <Typography variant="caption" color="primary">
                                    Please enter a valid URL to retrieve Open Graph data
                                </Typography>
                            }
                        >
                            <span>
                                <Button 
                                    variant="outlined" 
                                    onClick={handleClick}
                                    size="large"
                                    disabled
                                    style={{ marginTop: '7.5px' }}
                                >
                                    <ErrorTwoToneIcon style={{ color: 'gray' }} />
                                </Button>
                            </span>
                        </Tooltip>
                    </Fragment>
                } 
            </Grid>
        </Grid>    
    );
}

export default AutofillButton;