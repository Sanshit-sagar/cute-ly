import React, { Fragment, useState, useEffect } from 'react'; 
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button'; 
import FormControl from '@material-ui/core/FormControl';
import LanguageIcon from '@material-ui/icons/Language';

import Container from '@material-ui/core/Container'; 
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider'; 
import { shadows } from '@material-ui/system';
import TextField from '@material-ui/core/TextField'; 

import { Grid, Paper } from '@material-ui/core'; 

import { createLink } from '../lib/db'; 
import { useCount } from './SharedContext'; 
import { useAuth } from '../lib/auth'; 

import SharedSnackbar from './Snackbar'; 
import CustomToggleButtonGroup from './ToggleButtonGroup'; 
import UtmParamsDialog from './UtmParamsDialog';
import ResultsDialog from './ResultsDialog';

const useStyles = makeStyles((theme) => ({
    urlInput: {
        height: '75px',
        margin: '15px'
    },
    smallGap: {
        marginTop: '2.5px',
    },
    paper: {
        backgroundColor: theme.palette.primary.dark,
        padding: theme.spacing(1),
    },
    mainPaper: {
        backgroundColor: 'white',
        padding: theme.spacing(1),
        margin: theme.spacing(2),
    },
    titlePaper: {
        padding: '5px', 
        margin: '5px', 
        minWidth: '200px', 
        backgroundColor: theme.palette.primary.dark,
    },
})); 

const DashboardBase = ({ GoogleForm, iosForm, AndroidForm, MetaForm, ModeSelectorComp }) => { 
    const classes = useStyles();
    const [state, dispatch] = useCount(); 

    const androidContent = {
        title: "Android Parameters",
        message: 'Add Android tags here'
    };
    const iosContent = {
        title: "ios Parameters",
        message: 'Add ios tags here'
    };

    const googleContent = {
        title: "Google Analytics Parameters",
        message: 'Add Google Analytics tags here'
    };
    const metaContent = {
        title: "Meta Parameters",
        message: 'Add Meta tags here'
    }

    const validUrlPattern =  /^https?:\/\/([\w\d\-]+\.)+\w{2,}(\/.+)?$/;

    return (
        <Fragment> 
           
        </Fragment>
    );
}

const DashboardCard = () => {
    const classes = useStyles(); 

    const [state, dispatch] = useCount(); 
    const [title, setTitle] = useState(''); 

    const handleTitleChange = (value) => {
        setTitle(value);
    }

    const handleClear = () => {
        dispatch({ 
            type: "CLEAR"
        })
    }

    return (
        <Fragment> 
            
        </Fragment>
    )
}

export default DashboardCard;