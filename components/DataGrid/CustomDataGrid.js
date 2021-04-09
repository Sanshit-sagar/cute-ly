import React, { Fragment, useState } from 'react';
 
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link'; 
import Button from '@material-ui/core/Button'; 

import StarIcon from '@material-ui/icons/Star';
import FacebookIcon from '@material-ui/icons/Facebook'; 
import LinkedInIcon from '@material-ui/icons/LinkedIn'; 
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import PageviewIcon from '@material-ui/icons/Pageview';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import CreateIcon from '@material-ui/icons/Create';

import Moment from 'react-moment';
import 'moment-timezone';

import {  
    GridToolbarContainer,
    GridColumnsToolbarButton,
    GridDensitySelector,
} from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';

import StyledGrid from './StyledGrid'; 
import AnalyticsCell from './AnalyticsCell'; 
import SharedInfoDialog from '../SharedInfoDialog';
import { useRealtime } from '../../utils/useFirebaseRealtime';
import { DeleteOutlineTwoTone } from '@material-ui/icons';
import { AnalyticsProvider } from '../../utils/useAnalytics'; 

const useStyles = makeStyles((theme) => ({
    avatarIcon: {
        fontSize: '15px',
    },
    socialIcons: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        alignItems: 'center',
        marginTop: theme.spacing(2),
    },
    rowCenterCenter: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    facebookIcon: {
        color: theme.palette.icons.facebook,
        margin: theme.spacing(0.5),
    },
    twitterIcon: {
        color: theme.palette.icons.twitter,
        margin: theme.spacing(0.5),
    },
    linkedinIcon: {
        color: theme.palette.icons.linkedin,
        margin: theme.spacing(0.5),
    },
    whatsappIcon: {
        color: theme.palette.icons.whatsapp,
        margin: theme.spacing(0.5),
    },
    trashIcon: {
        color: theme.palette.icons.trash,
    },
    buttonGroup: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-evenly', 
        alignItems: 'stretch',
        spacing: theme.spacing(1),
    },
    actionButton: {
        marginLeft: theme.spacing(0.5),
    },
    toggleButton: {
        borderColor: theme.palette.primary.main,
        width: '135px',
    },
    toggleButtonText: {
        color: theme.palette.primary.dark,
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

const ActionButtonGroup = ({ params }) => {
    const classes = useStyles(); 

    return (
        <Fragment>
            <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
                <Grid item>
                    <Link href={params.value}>
                        <Button 
                            variant="outlined"   
                            color="primary" 
                            size="small" 
                            margin="dense" 
                            className={classes.actionButton}
                        >
                            <PageviewIcon />
                        </Button>
                    </Link>
                </Grid>
                <Grid item>
                    <Button 
                        variant="outlined"
                        color="primary" 
                        size="small" 
                        margin="dense" 
                        className={classes.actionButton}
                    >
                        <OpenInNewIcon />
                    </Button>
                </Grid>
                <Grid item>
                    <Button  
                        variant="outlined"
                        color="primary" 
                        size="small" 
                        margin="dense" 
                        className={classes.actionButton}
                    >
                        <DeleteOutlineTwoTone className={classes.trashIcon} />
                    </Button>
                </Grid>
            </Grid>
        </Fragment>
    );
}

const SocialIcons = ({ params }) => {
    const classes = useStyles();

    return (
        <div className={classes.socialIcons}>
            <div>   { params.value.facebook     ?    <FacebookIcon className={classes.facebookIcon} />    : null  }</div>
            <div>   { params.value.linkedin     ?    <LinkedInIcon className={classes.linkedinIcon} />    : null  }</div>
            <div>   { params.value.whatsapp     ?    <WhatsAppIcon className={classes.whatsappIcon} />    : null  }</div>
            <div>   { params.value.twitter      ?    <TwitterIcon  className={classes.twitterIcon}  />    : null  }</div>
        </div>
    )
}

const CustomTimestamp = ({ params }) => {
    const classes = useStyles(); 
    const [moment, setMoment] = useState(params.value);

    const MomentRelative = () => {
        return (
            <Moment parse="x" fromNow ago>
                { moment }
            </Moment>
        );
    }

    return (
        <Grid container direction="row" justify="center" alignItems="flex-start" spacing={1}>
            <Typography 
                variant="overline"
                className={classes.toggleButtonText}
            >
                <MomentRelative /> 
            </Typography>
        </Grid>
    );
}

const NicknameCell = ({ params }) => {
    const classes = useStyles();

    const UntitledPlaceholder = () => {
        return (
            <Typography 
                variant="caption" 
                color="default"
            >
                untitled 
            </Typography>
        );
    }

    return (
        <div className={classes.rowCenterCenter}>
             { 
                params.value?.length 
            ?
                <Typography 
                    variant="body1" 
                    color="primary"
                >
                    { params.value.substring(0, 11) }
                    { params.value.length > 11 && "..." }
                </Typography>  
            :
                <UntitledPlaceholder />
            }
        </div>
    );
}

const SlugDisplayCell = ({ params }) => {
    const classes = useStyles(); 

    return (
        <div className={classes.rowCenterCenter}>
            <Tooltip title={"https://sanshitsagar.page.link/" + params.value}>
                <Typography variant="overline" color="primary">
                    /{ params.value }
                </Typography>  
            </Tooltip>
        </div>
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
            width: 125,
            renderCell: (params) => (
               <NicknameCell params={params} />
            ),
        }, { 
            field: 'slug', 
            headerName: 'Unique Slug', 
            width: 185,
            renderCell: (params) => (
                <SlugDisplayCell params={params} />
            ),
        }, 
        {
            field: 'analytics',
            headerName: 'Analytics Parameters',
            width: 210,
            renderCell: (params) => (
                <AnalyticsCell params={params} />
            ),
        }, 
        { 
            field: 'socials', 
            headerName: 'Shareable Links', 
            width: 160,
            renderCell: (params) => (
                <SocialIcons params={params} />
            ),
        }, {
            field: 'previewLink', 
            headerName: 'Actions', 
            width: 255,
            renderCell: (params) => (
                <ActionButtonGroup params={params} />
            ),
        }, { 
            field: 'timestamp', 
            headerName: 'Age', 
            width: 145,
            renderCell: (params) => (
                <CustomTimestamp params={params} />
            ),
        }, { 
            field: 'views',
            headerName: 'Views',
            width: 130,
            renderCell: (params) => {
                <Typography variant="subtitle" color="secondary">
                    { params.value }
                </Typography>
            }
        }
    ];
    return columns
}

const CustomDataGrid = ({ user }) => {
    const { links, linksMap, linksLoading, linksError } = useRealtime();
    
    return (
        <Grid container direction="column" justify="center" alignIitems="center">
            <Grid item>
                <AnalyticsProvider>
                    <StyledGrid  
                        rows={links}
                        columns={getCols()}
                        loading={linksLoading}
                        toolbar={CustomToolbar}
                    />
                    <SharedInfoDialog /> 
                </AnalyticsProvider>
            </Grid>
        </Grid>
    )
}

export default CustomDataGrid; 