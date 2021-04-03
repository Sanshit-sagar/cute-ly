import React, { Fragment, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import AppleIcon from '@material-ui/icons/Apple';
import AndroidIcon from '@material-ui/icons/Android'; 
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CodeIcon from '@material-ui/icons/Code';

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
        overflowX: 'hidden',
    },
    chip: {
      margin: theme.spacing(0.5),
      borderRadius: '5px',
    },
    chipArr: {
        borderRadius: '5px',
        paddingLeft: theme.spacing(1),
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
    switch(group) {
        case "utm":
            return <PlayArrowIcon fontSize="small" />; 
        case "ios":
            return <AppleIcon fontSize="small" />;
        case "android":
            return <AndroidIcon fontSize="small" />;
        case "meta":
            return <CodeIcon fontSize="small" /> 
        default:
            <AppleIcon fontSize="small" />;
    } 
}

const TagsPreview = ({ values, group }) => {
    const classes = useStyles(); 
    
    const nonEmptyKeys = Object.keys(values).filter((key) => values[key] && values[key]?.length);

    const handleClick = () => {
        alert('clicked!');
    }

    const handleDelete = () => {
        alert('deleting');
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
                    onDelete={handleDelete}
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
    return (
        <Fragment>
            <TagsPreview values={parameters['utm']} group="utm" /> 
            <TagsPreview values={parameters['ios']} group="ios" /> 
            <TagsPreview values={parameters['android']} group="android" /> 
            <TagsPreview values={parameters['meta']} group="meta" /> 
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
            <div className={classes.root}>
                <TagsPreviewList parameters={parameters} /> 
            </div>
        </Fragment>
    );
}

export default AnalyticsCell; 