import React from 'react';
import Router from 'next/router';

import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'; 
import Button from '@material-ui/core/Button'; 
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Chip from '@material-ui/core/Chip';
import LinearProgress from '@material-ui/core/LinearProgress';
import Avatar from '@material-ui/core/Avatar'; 

import LaunchIcon from '@material-ui/icons/Launch'; 
import CustomNoRowsOverlay from './CustomOverlays'; 
import StarIcon from '@material-ui/icons/Star';

import {  
    GridOverlay,
    GridToolbarContainer,
    GridColumnsToolbarButton,
    GridFilterToolbarButton,
    GridDensitySelector,
} from '@material-ui/data-grid';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

import StyledGrid from './StyledGrid'; 

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paperDataGrid: {
        height: '65vh', 
        width: '1330px',
        margin: theme.spacing(1),
        backgroundColor: '#fff',
    },
    paperHeader: {
        height: '52.5px',
        width: '1330px', 
        margin: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
    },
    headerButton: {
        margin: theme.spacing(1),
    },
    destinationLink: {
        color: theme.palette.secondary.dark,
    }
}));

function CustomPagination(props) {
    const { state, api } = props;
    const classes = useStyles();
  
    return (
      <Pagination
        className={classes.root}
        color="primary"
        count={state.pagination.pageCount}
        page={state.pagination.page + 1}
        onChange={(event, value) => api.current.setPage(value - 1)}
      />
    );
  }


CustomPagination.propTypes = {
    api: PropTypes.shape({
      current: PropTypes.object.isRequired,
    }).isRequired,
    state: PropTypes.object.isRequired,
  };

function CustomLoadingOverlay() {
    return (
      <GridOverlay>
        <div style={{ position: 'absolute', top: 0, width: '100%' }}>
          <LinearProgress />
        </div>
      </GridOverlay>
    );
}

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridDensitySelector />
            <GridColumnsToolbarButton />
            <GridFilterToolbarButton />
        </GridToolbarContainer>
    );
}

const StarredItemsButton = () => {
    const classes = useStyles();

    return (
        <Button 
            variant="outlined" 
            color="primary" 
            className={classes.headerButton}
        > 
            <StarIcon /> 
        </Button>
    )
}


const LibrarySizeButton = ({ length }) => {
    const classes = useStyles(); 

    return (
        <Button 
            variant="contained"
            color="primary"
            className={classes.headerButton}
        > 
            {length} Links
        </Button>
    );
}

const handleNavigatetToModifiedUrl = () => {
    alert('Hello');
}

const RenderedParameters = ({ params }) => {
    const data = params.value; 
    return (
        <div style={{ display: 'flex', maxWidth: '400px', flexDirection: 'row', flexWrap: 'wrap' }}>
            <Chip avatar={<Avatar>M</Avatar>} variant="outlined" label={ data[0].value } size="small" color="default" style={{ margin: '2.5px' }}/> 
            <Chip avatar={<Avatar>S</Avatar>} variant="outlined" label={ data[1].value } size="small" color="default" style={{ margin: '2.5px' }}/> 
            <Chip avatar={<Avatar>C</Avatar>} variant="outlined" label={ data[2].value } size="small" color="default" style={{ margin: '2.5px' }}/> 
            <Chip avatar={<Avatar>T</Avatar>} variant="outlined" label={ data[2].value } size="small" color="default" style={{ margin: '2.5px' }}/> 
        </div>
    );
}

        

const columns = [
    { 
        field: 'nickname', 
        headerName: 'Nickname', 
        width: 200,
    }, {
        field: 'modifiedUrl', 
        headerName: 'Modified URL', 
        width: 225,
        renderCell: (params) => (
            <Button
                variant="outlined"
                color="primary"
                size="small"
                margin="dense"
                style={{ width: '225px' }}
                onClick={() => handleNavigatetToModifiedUrl()}
            >
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <div style={{ float: 'left'}}>
                        {params.value.substring(31)}
                    </div>
                    <div>
                        <LaunchIcon style={{ marginLeft: '10px' }} />
                    </div>
                </div>
            </Button>
        ),
    }, { 
        field: 'analyticsData', 
        headerName: 'Parameters', 
        width: 250,
        renderCell: (params) => (
            <div key={params.value[0].key}>
                <p> 
                    <RenderedParameters params={params} />  
                </p> 
            </div>
        ),
    },{ 
        field: 'originalUrl', 
        headerName: 'Destination URL', 
        width: 200,
        renderCell: (params) => (
            <Link href={params.value} style={{ color: '#1eb980' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                        {params.value.substring(0,20)}...
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <LaunchIcon 
                            style={{ marginLeft: '10px' }} 
                        />
                    </div>
                </div>
            </Link>
        ),
    }, { 
        field: 'newDate', 
        headerName: 'Timestamp', 
        width: 200,
    }, 
];

function getRows(allLinks) {
    const rows = []; 
    let newData = []; 

    allLinks.forEach((item) => {
        const dateStr =  new Date(item['timestamp']).toLocaleString();

        if(item && item.analyticsData) {
            const analyticsData = item['analyticsData']; 
            
            newData = analyticsData;
        } 

        rows.push({
            ...item,
            newDate: dateStr,
            analyticsData: newData,
        }); 
    }); 

    return rows; 
}

const CustomDataGrid = ({ loading, userDetails, allLinks, linksMap }) => {
    const classes = useStyles();
    
    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Grid item>
                <Paper elevation={10} className={classes.paperHeader}>
                    <Grid container direction="row" justify="flex-end" allItems="center">
                        <Grid item>
                            <StarredItemsButton email={userDetails.email} /> 
                        </Grid>
                        <Grid item>
                            <LibrarySizeButton length={allLinks.length} />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
           
            <Grid item>
                <Paper elevation={5} className={classes.paperDataGrid}>
                  { (!loading && allLinks) 
                  ? (
                        <StyledGrid 
                            Rows={getRows(allLinks)} 
                            Columns={columns} 
                            Loading={loading}
                            CustomToolbar={CustomToolbar}
                            LoadingOverlay={CustomLoadingOverlay}
                            NoRowsOverlay={CustomNoRowsOverlay}
                        /> 
                    ) 
                    : null }
                </Paper>      
            </Grid>
        </Grid>
    );
}

export default CustomDataGrid; 