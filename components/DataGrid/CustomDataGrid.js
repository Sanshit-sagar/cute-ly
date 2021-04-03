import React, { Fragment } from 'react';

import Link from '@material-ui/core/Link';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar'; 
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';

import StarIcon from '@material-ui/icons/Star';
import FacebookIcon from '@material-ui/icons/Facebook'; 
import LinkedInIcon from '@material-ui/icons/LinkedIn'; 
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

import {  
    GridToolbarContainer,
    GridColumnsToolbarButton,
    GridDensitySelector,
} from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';

import StyledGrid from './StyledGrid'; 
import { useRealtime } from '../../utils/useFirebaseRealtime';
import AnalyticsCell from './AnalyticsCell'; 
import UrlPreview from './UrlPreview'; 

const useStyles = makeStyles((theme) => ({
    avatarIcon: {
        fontSize: '15px',
    },
    socialIcons: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: 'flex-start',
    },
    rowCenterCenter: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
    },
}));

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridDensitySelector />
            <GridColumnsToolbarButton   />
        </GridToolbarContainer>
    );
}

const getCols = () => {
    const classes = useStyles();
    
    const columns = [
        { 
            field: 'starred', 
            headerName: ' ', 
            width: 60,
            renderCell: (params) => (
                <div className={classes.rowCenterCenter}>
                    <StarIcon style={{ color: params.value ? 'gold' : '#000' }} /> 
                </div>   
            )
        }, { 
            field: 'nickname', 
            headerName: 'Nickname', 
            width: 150,
            renderCell: (params) => (
                <div className={classes.rowCenterCenter}>
                    <Typography variant="h5" color="primary">
                        { params.value?.length ? params.value.substring(0, 10) : 'N/A' }
                    </Typography>  
                </div>
            ),
        }, { 
            field: 'slug', 
            headerName: 'Unique Slug', 
            width: 200,
            renderCell: (params) => (
                <div className={classes.rowCenterCenter}>
                    <Tooltip title={"https://sanshitsagar.page.link/" + params.value}>
                        <Typography variant="overline" color="primary">
                            /{ params.value }
                        </Typography>  
                    </Tooltip>
                </div>
            ),
        }, {
            field: 'analytics',
            headerName: 'Analytics',
            width: 300,
            renderCell: (params) => (
                <Typography variant="caption">
                    <AnalyticsCell params={params} /> 
                </Typography>
            ),
        }, { 
            field: 'socials', 
            headerName: 'Shared @', 
            width: 125,
            renderCell: (params) => (
                <div className={classes.socialIcons}>
                    { params.value.facebook     ?       <FacebookIcon />     : null  }
                    { params.value.linkedin     ?       <LinkedInIcon />     : null  }
                    { params.value.whatsapp     ?       <WhatsAppIcon />     : null  }
                    { params.value.twitter      ?       <TwitterIcon  />     : null  }
                </div>
            ),
        }, {
            field: 'originalUrl', 
            headerName: 'Destination URL', 
            width: 200,
            renderCell: (params) => (
               <div>
                   <UrlPreview params={params}/> 
               </div>
            ),
        }, { 
            field: 'timestamp', 
            headerName: 'Timestamp', 
            width: 175,
            renderCell: (params) => (
                <Typography variant="caption">
                    { params.value.substring(0, params.value.length - 7) }
                </Typography>
            ),
        }
    ];
    return columns
}

const CustomDataGrid = ({ user }) => {
    const { links, linksMap, realtimeLoading, error } = useRealtime();
    
    console.log(links); 

    return (
        <Fragment>
            { realtimeLoading ? 
                <p> hihihi </p>
            :   
                <Grid container direction="column" justify="center" alignIitems="center">
                    <Grid item>
                        <StyledGrid  
                            rows={links}
                            columns={getCols()}
                            loading={realtimeLoading || links.length===0}
                            toolbar={CustomToolbar}
                        />
                    </Grid>
                </Grid>
            }
        </Fragment>
    )
}

export default CustomDataGrid; 