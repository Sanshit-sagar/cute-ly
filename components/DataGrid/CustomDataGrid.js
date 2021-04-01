import React, { useState } from 'react';

import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'; 
import Button from '@material-ui/core/Button'; 
import Link from '@material-ui/core/Link';
import Chip from '@material-ui/core/Chip';
import LinearProgress from '@material-ui/core/LinearProgress';
import Avatar from '@material-ui/core/Avatar'; 
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import LaunchIcon from '@material-ui/icons/Launch'; 
import CustomNoRowsOverlay from './CustomOverlays'; 
import StarIcon from '@material-ui/icons/Star';
import SearchIcon from '@material-ui/icons/Search'; 

import FacebookIcon from '@material-ui/icons/Facebook'; 
import LinkedInIcon from '@material-ui/icons/LinkedIn'; 
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsAppIcon from '@material-ui/icons/WhatsApp'; 
import HttpIcon from '@material-ui/icons/Http'; 

import LinkDetailsDialog from './LinkDetailsDialog'; 

import { blue } from '@material-ui/core/colors'
import { useCount } from '../SharedContext'; 

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
        width: '1342.5px',
    },
    iosAvatar: {
        color: theme.palette.getContrastText(blue[900]),
        backgroundColor: blue[900],
    },
    androidAvatar: {
        color: theme.palette.getContrastText(theme.palette.secondary.light),
        backgroundColor: theme.palette.secondary.light,
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

const CustomParameterChip = ({ item }) => {
    const classes = useStyles(); 
    const [state, dispatch] = useCount(); 

    return (
        <Tooltip title={item.group + "-" + item.key + ":" + item.value}>
            <Chip 
                avatar={
                    <Avatar 
                        variant="rounded" 
                        className={item.group==="ios" ? classes.iosAvatar : classes.androidAvatar}
                    >
                        { item.key.charAt(0).toUpperCase() }
                    </Avatar> 
                } 
                variant="outlined"
                label={ 
                    item.value.length >= 8 ? (item.value.substring(0,8) + "...") : item.value
                } 
                size="small" 
                color="default"
                style={{
                    margin:'2.5px',
                    borderRadius: '5px', 
                    backgroundColor: state.dark ? ( item.group==="ios" ? 'silver' : (item.group==='android' ? 'green' : 'black') ) : ( item.group==="ios" ? 'black' : (item.group==='android' ? 'pink' : 'white') ),
                    color: state.dark ? ( item.group==="ios" ? 'black' : (item.group==='android' ? 'pink' : 'white') ) : ( item.group==="ios" ? 'silver' : (item.group==='android' ? 'green' : 'black') ),
                }}
            />
        </Tooltip>
    );
}

const RenderParameters = ({ data }) => {
    
    return (
        <div style={{ display: 'flex', maxWidth: '250px', flexDirection: 'row', flexWrap: 'wrap' }}>
            {   
                data.length >= 0 && data[0] && data[0].value && data[0].value?.length &&  
                <CustomParameterChip 
                    item={data[0]} 
                    index={0}  
                    style={{ borderRadius: '5px' }} 
                /> 
            }

            {   
                data.length >= 1 && data[1] && data[1].value && data[1].value?.length &&  
                <CustomParameterChip item={data[1]} index={1}  style={{ borderRadius: '5px' }} /> 
            }
            {   
                data.length >= 2 && data[2] && data[2].value && data[2].value?.length &&  
                <CustomParameterChip item={data[2]} index={2}  /> 
            }
            {   
                data.length > 3 && 
                <Chip label={"+" + (data.length-3)} size="small" variant="outlined" style={{ margin: '2.5px' }} /> 
            }
        </div>
    );
}  

const DestinationUrlFavicons = ({ url }) => {

    if(url && url.length > 0) {
        return (
            <div>
                { url.includes('facebook')  && <FacebookIcon style={{ marginLeft: '5px', marginRight: '10px'}} /> }
                { url.includes('linkedin')  && <LinkedInIcon style={{ marginLeft: '5px', marginRight: '10px' }} /> }
                { url.includes('twitter')   && <TwitterIcon style={{ marginLeft: '5px',marginRight: '10px' }} /> }
                { url.includes('whatsapp')  && <WhatsAppIcon style={{ marginLeft: '5px', marginRight: '10px' }} /> }
                { !url.includes('whatsapp') && !url.includes('facebook') && !url.includes('twitter') && !url.includes('linkedin') && <HttpIcon style={{ marginLeft: '5px', marginRight: '10px' }} /> }
            </div>
        ); 
    } else {
        return <p style={{ marginLeft: '10px' }}> ... </p>;  
    }
}

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

    const [open, setOpen] = useState(false); 
    const [displayDetails, setDisplayDetails] = useState(null); 

    const handleCloseDetails = () => {
        setOpen(false); 
    }

    const OpenLinkDetailsButton = ({ slug }) => {
        const handleNavigatetToModifiedUrl = () => {
            const displayDetailsObj = linksMap[slug]; 

            setDisplayDetails(displayDetailsObj); 
            setOpen(true); 
        }

        return (
            <Button
                fullWidth
                variant="outlined"
                color="secondary"
                size="small"
                margin="dense"
                onClick={handleNavigatetToModifiedUrl}
            >
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div style={{ float: 'left'}}>
                    <Typography variant="button">
                        { slug.substring(0, 4) } 
                    </Typography>
                    <Typography variant="button">
                        { slug.length > 4 && "..." } 
                    </Typography>
                    </div>
                    <div>
                        <LaunchIcon style={{ marginLeft: '10px' }} />
                    </div>
                </div>
            </Button>
        );
    }

    const columns = [
       { 
            field: 'nickname', 
            headerName: 'Nickname', 
            width: 130,
            renderCell: (params) => (
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Typography variant="caption"> 
                        { params.value }
                    </Typography>
                </div>
            )
        }, { 
            field: 'originalUrl', 
            headerName: ' ', 
            width: 60,
            renderCell: (params) => (
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Link href={params.value} style={{ color: '#1eb980', marginTop: '10px' }}>
                        <DestinationUrlFavicons url={params.value} />
                    </Link>
                </div>
            ),
        },  { 
            field: 'starred', 
            headerName: ' ', 
            width: 60,
            renderCell: (params) => (
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    {params.value ? <StarIcon style={{ color: 'yellow' }} /> : <StarIcon /> }
                </div>   
            )
        }, { 
            field: 'utmNN', 
            headerName: 'UTM Parameters', 
            width: 200,
            renderCell: (params) => (
                <div>
                {
                    params.value  && params.value ?
                    <div>
                        <RenderParameters data={params.value} /> 
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
            width: 200,
            renderCell: (params) => (
                <div>
                {
                    params.value  && params.value ?
                    <div>
                        <RenderParameters data={params.value} /> 
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
            width: 200,
            renderCell: (params) => (
                <div>
                {
                    params.value  && params.value ?
                    <div>
                        <RenderParameters data={params.value} /> 
                    </div>
                    :
                    <div>
                        <Button> X </Button>
                    </div>
                }
                </div>
            ),
        }, { 
            field: 'newDate', 
            headerName: 'Timestamp', 
            width: 175,
            renderCell: (params) => (
                <div>
                    <Typography variant="caption">
                        { params.value }
                    </Typography>
                </div>
            ),
        }, {
            field: 'modifiedUrl', 
            headerName: 'Slug', 
            width: 150,
            renderCell: (params) => (
            <div>
                <OpenLinkDetailsButton 
                    slug={params.value.substring(31)} 
                /> 
            </div>
            ),
        }
    ];

    return (
        <Grid container direction="column" justify="center" alignItems="stretch"> 
            <Grid item>
                <Paper elevation={0} className={classes.paperDataGrid}>
                    <StyledGrid 
                        Rows={getRows(allLinks)} 
                        Columns={columns}
                        Loading={loading || allLinks.length == 0}
                        CustomToolbar={CustomToolbar}
                        LoadingOverlay={CustomLoadingOverlay}
                        NoRowsOverlay={CustomNoRowsOverlay}
                    /> 
                </Paper>      
            </Grid>

           <LinkDetailsDialog 
                open={open} 
                handleClose={handleCloseDetails} 
                data={displayDetails}
            /> 
        </Grid>
    );
}

export default CustomDataGrid; 