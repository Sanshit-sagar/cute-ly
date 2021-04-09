import React, { Fragment, useState } from 'react';
 
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link'; 
import Button from '@material-ui/core/Button'; 
import IconButton from '@material-ui/core/IconButton'; 

import StarIcon from '@material-ui/icons/Star';
import FacebookIcon from '@material-ui/icons/Facebook'; 
import LinkedInIcon from '@material-ui/icons/LinkedIn'; 
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import PageviewIcon from '@material-ui/icons/Pageview';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

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

    const toggleMoment = () => {
        alert('toggling');
    }

    const MomentRelative = () => {
        return (
            <Moment parse="x" fromNow ago>
                { moment }
            </Moment>
        );
    }

    return (
        <Grid container direction="row" justify="center" alignItems="flex-start" spacing={2}>
            <Grid item>
                <Typography 
                    variant="overline"
                    className={classes.toggleButtonText}
                >
                    <MomentRelative /> 
                </Typography>
            </Grid>
            <Grid item>
                <IconButton 
                    onClick={toggleMoment}
                    size="small"
                >
                    <NavigateNextIcon 
                        fontSize="small"
                        style={{ margin: '5px' }} 
                    />
                </IconButton>
            </Grid>
        </Grid>
    );
}

const NicknameCell = ({ params }) => {
    const classes = useStyles();

    const handleUpdateName = () => {
        alert('Updating name...');
    }

    const UntitledPlaceholder = () => {
        return (
            <Fragment>
                <Button onClick={handleUpdateName}>
                    <Typography 
                            variant="caption" 
                            color="default"
                    >
                        click to add 
                    </Typography>
                </Button> 
            </Fragment>
        );
    }

    return (
        <div className={classes.rowCenterCenter}>
             { 
                params.value?.length 
            ?
                <Typography 
                    variant="h5" 
                    color="primary"
                >
                    { params.value.substring(0, 10) }
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
            width: 160,
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
            headerName: 'Analytics',
            width: 215,
            renderCell: (params) => (
                <AnalyticsCell params={params} />
            ),
        }, 
        { 
            field: 'socials', 
            headerName: 'Shared @', 
            width: 160,
            renderCell: (params) => (
                <SocialIcons params={params} />
            ),
        }, {
            field: 'previewLink', 
            headerName: 'Actions', 
            width: 265,
            renderCell: (params) => (
                <ActionButtonGroup params={params} />
            ),
        }, { 
            field: 'timestamp', 
            headerName: 'Age', 
            width: 170,
            renderCell: (params) => (
                <CustomTimestamp params={params} />
            ),
        },  
    ];
    return columns
}

const CustomDataGrid = ({ user }) => {
    const { links, linksMap, linksLoading, linksError } = useRealtime();
    
    console.log(links); 

    return (
        <Fragment>
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
        </Fragment>
    )
}

export default CustomDataGrid; 