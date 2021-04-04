import React, { Fragment, useState } from 'react';

import Typography from '@material-ui/core/Typography'; 
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper'; 

import OutlinedInput from '@material-ui/core/OutlinedInput';

import OpenInNewIcon from '@material-ui/icons/OpenInNew';

import { cropOutputField } from '../../utils/helpers/sanitizers';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    chip: {
        borderRadius: '5px',
        margin: theme.spacing(1),
    },
    descriptionBox: {
        minWidth: '400px',
        backgroundColor: theme.palette.background.default,
        border: 'thin solid',
        borderColor: theme.palette.primary.main,
        borderRadius: '5px',
        display: 'flex',
        direction: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        margin: theme.spacing(1),
    },
    description: {
        color: theme.palette.primary.main,
    },
    metaTitlePaper: {
        margin: theme.spacing(1),
        padding: theme.spacing(0.3),
    },
}));

const OpenGraphDataDisplay = ({ state }) => {
    const classes = useStyles();
    const [editDescription, setEditDescription] = useState(false);

    const hybridGraph = state.openGraphData;
    
    if(!hybridGraph.data || hybridGraph.error) {
        return <Typography variant="body1"> Unable to Load Data </Typography>;
    }

    const data = hybridGraph.data; 

    const croppedTitle = cropOutputField(data.title, 15); 
    const croppedSiteName = cropOutputField(data.siteName, 12); 
    const croppedType = cropOutputField(data.type, 12); 
    const croppedUrl = cropOutputField(data.url, 30);
    
    const hybridGraphImage = data.image; 

    return (
        <Grid container direction="column" justify="center" alignItems="space-between" spacing={1}>
            <Grid item>
                <Grid container direction="row" justify="space-between" alignItems="flex-start">
                    <Grid item>
                        <Paper elevation={0} className={classes.metaTitlePaper}>
                            <Grid container direction="column" justify="flex-end" alignItems="flex-start" spacing={1}>
                                <Grid item>
                                    <Typography variant="h6" color="primary">
                                        { croppedTitle }
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Grid container direction="row">
                                        <Grid item>
                                            <Typography variant="caption" color="primary">
                                                { croppedUrl }
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <OpenInNewIcon color="primary" fontSize="small" /> 
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Chip 
                            variant="outlined" 
                            color="primary" 
                            size="small"
                            label={croppedSiteName} 
                            className={classes.chip}
                        /> 
                        <Chip 
                            variant="outlined" 
                            color="primary" 
                            size="small"
                            label={croppedType} 
                            className={classes.chip}
                        /> 
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Box className={classes.descriptionBox}>
                    <Fragment>
                        {
                                !editDescription 
                            ?
                                <div style={{ width: '100%' }}>  
                                    <OutlinedInput
                                        fullWidth 
                                        multiline 
                                        rows={3}
                                        readOnly={false}
                                        placeholder="Add a description"
                                        color="primary"
                                        margin="dense"
                                        autoComplete="off"
                                        value={data.description}
                                        className={classes.description}
                                    />
                                </div>
                            :
                                <div>
                                    <Typography variant="caption" color="primary">
                                        { data.description }
                                    </Typography>
                                </div>
                        }
                    </Fragment>
                </Box>
            </Grid>
        </Grid>
    );
}

export default OpenGraphDataDisplay; 