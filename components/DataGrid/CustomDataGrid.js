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
import SearchIcon from '@material-ui/icons/Search'; 

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
        height: '57.5vh', 
        width: '1330px',
        margin: theme.spacing(0.75),
        backgroundColor: '#fff',
    },
    paperHeader: {
        height: '45px',
        width: '1330px', 
        margin: theme.spacing(0.5),
        backgroundColor: theme.palette.background.paper,
    },
    headerButton: {
        height: '40px',
        margin: '2.25px',
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
            {/* <GridDensitySelector /> */}
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

const SearchLinksButton = () => {
    const classes = useStyles(); 

    return (
        <Button
            variant="outlined"
            color="primary"
            className={classes.headerButton}
        >
            <SearchIcon /> 
        </Button> 
    ); 
}

const handleNavigatetToModifiedUrl = () => {
    alert('Hello');
}

const getChipColor = (item) => {
    if(item && item.group) {
        if(item.group === 'utm') {
            return "#363537";
        } else if(item.group ==='ios') {
            return "blue";
        } else if(item.group === 'android') {
            return "green"; 
        }
    } else {
        return "yellow";
    }
}

const CustomAdditionalParametersChip = ({ data }) => {
    if(!data || !data?.length || data?.length <= 0) {
        return null; 
    } 

    return (
        <Chip
            avatar={
                <Avatar>
                    {data.length}
                </Avatar>
            }
            variant="filled"
            label={data.length - 3}
            size="small"
            color="secondary"
            style={{ margin: '2.5px' }}
        /> 
    )
}

const CustomParameterChip = ({ item }) => {
    return (
        <Chip 
            avatar={
                <Avatar>
                    {item.key.charAt(0).toUpperCase()}
                </Avatar>
            } 
            variant="outlined"
            label={ 
                item.value.length >= 8 ? (item.value.substring(0,8) + "...") : item.value
            } 
            size="small" 
            color="secondary"
            style={{
                margin:'2.5px'
            }}
        />
    );
}

const RenderUtmParameters = ({ data }) => {
    
    return (
        <div style={{ display: 'flex', maxWidth: '250px', flexDirection: 'row', flexWrap: 'wrap' }}>
            {   data.length >= 0 && data[0] && data[0].value && data[0].value?.length &&  <CustomParameterChip item={data[0]} index={0} /> }
            {   data.length >= 1 && data[1] && data[1].value && data[1].value?.length &&  <CustomParameterChip item={data[1]} index={1} /> }
            {   data.length >= 2 && data[2] && data[2].value && data[2].value?.length &&  <CustomParameterChip item={data[2]} index={2} /> }
            {   data.length > 3 && <Chip label={"+" + (data.length-3)} size="small" variant="outlined" style={{ margin: '2.5px' }} /> }
        </div>
    );
}  

const columns = [
    { 
        field: 'nickname', 
        headerName: 'Nickname', 
        width: 125,
        renderCell: (params) => (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <p> {params.value} </p> 
            </div>
        )
    }, {
        field: 'modifiedUrl', 
        headerName: 'Slug', 
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
        field: 'utmNN', 
        headerName: 'UTM Parameters', 
        width: 225,
        renderCell: (params) => (
            <div>
            {
                params.value  && params.value ?
                <div>
                    <RenderUtmParameters data={params.value} /> 
                </div>
                :
                <div>
                    <Button> X </Button>
                </div>
            }
            </div>
        ),
    }, { 
        field: 'iosNN', 
        headerName: 'iOS Parameters', 
        width: 225,
        renderCell: (params) => (
            <div>
            {
                params.value  && params.value ?
                <div>
                    <RenderUtmParameters data={params.value} /> 
                </div>
                :
                <div>
                    <Button> X </Button>
                </div>
            }
            </div>
        ),
    }, { 
        field: 'androidNN', 
        headerName: 'Android Parameters', 
        width: 225,
        renderCell: (params) => (
            <div>
            {
                params.value  && params.value ?
                <div>
                    <RenderUtmParameters data={params.value} /> 
                </div>
                :
                <div>
                    <Button> X </Button>
                </div>
            }
            </div>
        ),
    },  { 
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

    allLinks.forEach((item) => {
        const dateStr =  new Date(item['timestamp']).toLocaleString();
        let utmNN =[];
        let iosNN =[];
        let androidNN = [];
        let metaNN = []; 
        
        if(item && item.analyticsData) {
            const analyticsData = item['analyticsData']; 

            analyticsData.forEach((item) => {
                if(item.group === 'utm') {
                    utmNN.push(item);
                } else if(item.group === 'ios') {
                    iosNN.push(item);
                } else if(item.group === 'android') {
                    androidNN.push(item);
                } else {
                    metaNN.push(item); 
                }
            });
        } 

        rows.push({
            ...item,
            newDate: dateStr,
            utmNN,
            iosNN,
            androidNN,
            metaNN,
        }); 
    }); 

    return rows; 
}

const CustomDataGrid = ({ loading, userDetails, allLinks, linksMap }) => {
    const classes = useStyles();
    
    return (
        <Grid container direction="column" justify="center" alignItems="center">
           
            <Paper elevation={10} className={classes.paperHeader}>
                <Grid container direction="row" justify="space-between" alignItems="flex-start">
                    <Grid item>
                        <LibrarySizeButton length={allLinks.length} />
                    </Grid>
                    
                    <Grid item>
                        <SearchLinksButton />
                        <StarredItemsButton email={userDetails.email} /> 
                    </Grid>
                </Grid>
            </Paper>
            
           
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