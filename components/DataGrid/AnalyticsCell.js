import React, { Fragment, useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import AppleIcon from '@material-ui/icons/Apple';
import AndroidIcon from '@material-ui/icons/Android'; 
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CodeIcon from '@material-ui/icons/Code';

import SharedInfoDialog from '../SharedInfoDialog';
import { AnalyticsProvider, useAnalytics } from '../../utils/useAnalytics'; 

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: 'center',
    },
    tagsArr: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
      margin: theme.spacing(0.5),
      borderRadius: '3px',
    },
    chipArr: {
        borderRadius: '3px',
        paddingLeft: theme.spacing(1),
    },
    utmIcon: {
        color: theme.palette.icons.utm,
    },
    appleIcon: {
        color: theme.palette.icons.apple,
    },
    androidIcon: {
        color: theme.palette.icons.android,
    },
    metaIcon: {
        color: theme.palette.icons.meta,
    },
}));
  

const TagsGroup = ({ values }) => {
    const classes = useStyles(); 

    const handleDelete = (index) => {
        alert('Deleting @ ' + index);
    }

    return (
        <Paper 
            component="ul" 
            elevation={0} 
            className={classes.tagsArr}
        >
            { Object.keys(values).map(function(key, index) {
                if(values[key] && values[key].length) {
                    return (
                        <li key={key}>
                            <Chip 
                                avatar={
                                    <Avatar variant="rounded"> 
                                        { key.charAt(0).toUpperCase() }
                                    </Avatar> 
                                }
                                size="small"
                                clickable
                                label={values[key]} 
                                className={classes.chip}
                                variant="outlined"
                                color="secondary" 
                                onDelete={() => handleDelete(index)}
                            /> 
                        </li>
                    );
                }
            })}
        </Paper>
    ); 
}

const PreviewIcon = ({ group }) => {
    const classes = useStyles(); 

    switch(group) {
        case "utm":
            return <PlayArrowIcon fontSize="small" color="error" className={classes.utmIcon} />; 
        case "ios":
            return <AppleIcon fontSize="small" color="disabled" className={classes.appleIcon}/>;
        case "android":
            return <AndroidIcon fontSize="small" className={classes.androidIcon} />;
        case "meta":
            return <CodeIcon fontSize="small" className={classes.metaIcon} /> 
        default:
            return null;
    } 
}

const TagsPreview = ({ values, group }) => {
    const classes = useStyles();

    let nonEmptyKeys = [];

    if(values) {
        nonEmptyKeys = Object.keys(values).filter((key) => values[key] && values[key]?.length);
    }

    const handleClick = () => {
        alert('clicked!'); 
    }

    return (
        <Fragment>
        {
            nonEmptyKeys.length  
        ?
            <Paper component="ul" elevation={0} className={classes.tagsArr}>
                <Chip 
                    icon={
                        <PreviewIcon group={group} /> 
                    } 
                    label={nonEmptyKeys.length} 
                    variant="outlined" 
                    color="primary" 
                    size="small"
                    clickable
                    onClick={handleClick}
                    className={classes.chipArr}
                /> 
            </Paper>
        :
            null
        }
        </Fragment> 
    ); 
}

const TagsPreviewList = ({ parameters }) => {

    const [state, dispatch] = useAnalytics(); 

    return (
        <Fragment>
            <TagsPreview values={parameters.utm} group="utm" state={state} dispatch={dispatch} /> 
            <TagsPreview values={parameters.ios} group="ios" state={state} dispatch={dispatch} /> 
            <TagsPreview values={parameters.android} group="android" state={state} dispatch={dispatch} /> 
        </Fragment>
    )
}

const AnalyticsCell = ({ params }) => {
    const classes = useStyles(); 

    const parameters = {
        'utm': params.value.utm,
        'ios': params.value.ios, 
        'android': params.value.android,
        'meta': params.value.meta,
    };

    return (
        <Fragment>
            <AnalyticsProvider>
                <div className={classes.root}>
                    <TagsPreviewList parameters={parameters} /> 
                </div>
                <SharedInfoDialog /> 
            </AnalyticsProvider>
        </Fragment>
    );
}

export default AnalyticsCell; 