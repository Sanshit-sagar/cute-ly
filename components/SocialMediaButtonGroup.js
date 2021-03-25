import React, { Fragment, useState } from 'react'; 

import Dialog from '@material-ui/core/Dialog'; 
import DialogTitle from '@material-ui/core/DialogTitle'; 
import DialogContent from '@material-ui/core/DialogTitle'; 
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider'; 

import TextField from '@material-ui/core/TextField'; 
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { 
    FormControlLabel, FormHelperText, FormLabel, 
    Typography, Tooltip, 
    Button, Box, Paper, Grid
} from '@material-ui/core'; 

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsAppIcon from '@material-ui/icons/WhatsApp'; 
import LinkedInIcon from '@material-ui/icons/LinkedIn';

import { makeStyles, withStyles } from '@material-ui/core/styles';

import { useCount } from './SharedContext'; 
import { Error } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    minWidth: 500,
  },
  cardTitle: {
    fontSize: 14,
  },
  cardPos: {
    // marginBottom: 12,
  },
paper: {
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1),
    backgroundColor: '#fff',
},
paperPurple: {
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.dark,
},
  button: {
      height: '100%',
  },
})); 

const StyledToggleButtonGroup = withStyles((theme) => ({
    grouped: {
      margin: theme.spacing(0.5),
      border: 'none',
      '&:not(:first-child)': {
        borderRadius: theme.shape.borderRadius,
      },
      '&:first-child': {
        borderRadius: theme.shape.borderRadius,
      },
    },
}))(ToggleButtonGroup);

function LinkedinIconComp() {
    const [state, dispatch] = useCount(); 
    return (
        <LinkedInIcon 
            style={{ color: state.socials.linkedin ? '#005cc5' : '#000', fontSize: '24px'}} 
        />
    ); 
}

function FacebookIconComp() {
    const [state, dispatch] = useCount(); 
    return (
        <FacebookIcon 
            style={{ color: state.socials.facebook ? '#4861ac' : '#000', fontSize: '24px' }} 
        />
    ); 
}

function TwitterIconComp() {
    const [state, dispatch] = useCount(); 
    return (
        <TwitterIcon 
            style={{ color: state.socials.twitter ? '#009dff' : '#000', fontSize: '24px'}} 
        />
    ); 
}
function WhatsAppIconComp() {
    const [state, dispatch] = useCount(); 
    return (
        <WhatsAppIcon 
            style={{ color: state.socials.whatsapp ? '#00d85a' : '#000', fontSize: '24px'}} 
        />
    ); 
}


const socialMediaDetails = [
    {
        key: 1,
        name: 'linkedin',
        component: <LinkedinIconComp />,
        title: 'LinkedIn',
        prefix: 'https://www.linkedin.com/sharing/share-offsite/?url='
    },{
        key: 2,
        name: 'facebook',
        component: <FacebookIconComp />,
        title:'Facebook',
        prefix: 'https://www.facebook.com/sharer/sharer.php?u='
    },{
        key: 3,
        name: 'twitter',
        component: <TwitterIconComp />, 
        title: 'Twitter',
        prefix: ''
    },{
        key: 4,
        name: 'whatsapp',
        component: <WhatsAppIconComp />,
        title: 'WhatsApp',
        prefix: ''
    }
];

const encodeForWhatsapp = (num, mssg) => {
    const text = "https://api.whatsapp.com/send?phone=" + num + "text=" + mssg;
    return encodeURI(text); 
}

const WhatsappDialog = ({ open, handleClose }) => {
    const classes = useStyles(); 
    const [state, dispatch] = useCount(); 
    
    const [phoneNumber, setPhoneNumber] = useState(''); 
    const [message, setMessage] = useState();

    const handleSubmit = () => {
        handleClose(); 
        
        dispatch({ 
            type: 'UPDATE_SOCIAL',
            payload: {
                name: 'whatsapp',
                value: !state.socials.whatsapp,
                prefix: ''
        }});

        var urlEncodedMessage = encodeForWhatsapp(phoneNumber, message); 
        alert(urlEncodedMessage); 
    }

    const handleNumberChange = (event) => {
        setPhoneNumber('+' + event.target.value.substring(1));
    }

    const regex = /([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}/;

    return (
        <Dialog 
            open={open} 
            onClose={handleClose}
        > 
            <DialogTitle>
                <Typography variant="h4">
                    Share on Whatsapp
                </Typography>
            </DialogTitle> 

            <DialogContent> 
                <Card 
                    className={classes.cardRoot}
                    variant="outlined"
                >
                    <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                        
                        <TextField 
                            variant="filled"
                            margin="dense"
                            size="large"
                            color="primary"
                            label="Recipient's Phone Number"
                            value={'+' + phoneNumber.substring(1)}
                            onChange={handleNumberChange}
                            error={!regex.test(phoneNumber)}
                        />
                        <FormHelperText> Include the Country Code </FormHelperText>

                        <TextField 
                            variant="filled"
                            margin="normal"
                            size="large"
                            color="primary"
                            label="Your Message" 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />

                    </CardContent> 
                </Card> 
            </DialogContent> 

            <DialogActions> 
                <Button variant="contained" onClick={handleClose}> 
                    Cancel
                </Button>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleSubmit} 
                    disabled={!regex.test(phoneNumber) || message?.length===0}
                >
                    Done
                </Button> 
            </DialogActions>
        </Dialog> 
    );
}

function fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
      return '%' + c.charCodeAt(0).toString(16);
    });
  }

const TwitterDialog = ({ open, handleClose }) => {
    const classes = useStyles(); 
    const [state, dispatch] = useCount(); 
    
    const [message, setMessage] = useState(state.url);
    const [charsRemaining, setCharsRemaining] = useState(280 - message.length); 

    const handleSubmit = () => {
        var twitterPrefix = 'https://twitter.com/intent/tweet?text=';
        var encodedUrlMessage = twitterPrefix + fixedEncodeURIComponent(state.url + 'text=' + message);

        dispatch({ 
            type: 'UPDATE_SOCIAL',
            payload: {
                name: 'twitter',
                value: true,
                prefix: ''
        }});
        dispatch({
            type: 'GENERATE',
            payload: {
                newUrl: encodedUrlMessage
        }});

        handleClose();
    }

    const handleInputChange = (e) => {
        setMessage(e.target.value);
        setCharsRemaining(280 - message.length); 
    }

    return (
        <Dialog 
            open={open} 
            onClose={handleClose}
        > 
            <DialogTitle>
                <Typography variant="h4">
                    Share on Twitter
                </Typography>
            </DialogTitle> 

            <DialogContent> 
                <Paper elevation={5} className={classes.paperPurple}>
                    <Grid container spacing={1}>
                        <Paper elevation={5} className={classes.paper}>
                            <Grid 
                                container
                                direction="row"
                                justify="space-around"
                                wrap='wrap'
                            >
                                <Grid item>
                                    <Typography 
                                        className={classes.cardTitle}
                                        color="textPrimary"
                                        gutterBottom
                                    >
                                        Your Message
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary" style={{fontSize: "12px"}} > 
                                        Links that exceed 32 characters are automatically shortened or truncated.
                                    </Typography>
                                    <TextField 
                                        multiline
                                        fullWidth
                                        margin="normal"
                                        size="large"
                                        variant="filled"
                                        color="primary"
                                        value={message}
                                        onChange={handleInputChange}
                                    /> 
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}> 
                                        <TextField 
                                            disabled
                                            variant="standard"
                                            margin="dense"
                                            size="small"
                                            value={charsRemaining + " chars remaining"}
                                        /> 
                                    </div>
                                </Grid>
                            </Grid>
                        </Paper> 
                    </Grid> 
                </Paper>    
            </DialogContent>

            <DialogActions> 
                <Grid 
                    container 
                    direction="row" 
                    justify="flex-end" 
                    alignItems="center" 
                    spacing={2}
                >
                    <Grid item>
                        <Button 
                            variant="outlined"
                            color="primary"
                            size="large"
                            margin="normal"
                            onClick={handleClose}
                        > 
                            <Typography variant="button"> Cancel </Typography>
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button 
                            variant="contained"
                            color="primary"
                            size="large"
                            margin="normal"
                            onClick={handleSubmit}
                        > 
                            <Typography variant="button"> Generate </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    );
}

const SocialMediaButtonGroup = () => {
    const classes = useStyles(); 
    const [state, dispatch] = useCount(); 

    const [openTwitter, setOpenTwitter] = useState(false); 
    const [openWhatsapp, setOpenWhatsapp] = useState(false); 

    const handleCloseTwitter = () => {
        setOpenTwitter(false); 
    }

    const clearTwitterData = () => {
        dispatch({ 
            type: 'UPDATE_SOCIAL',
            payload: {
                name: 'twitter',
                value: false,
                prefix: ''
        }});
        dispatch({
            type: 'SNACKBAR_TRIGGER', 
            payload: {
                message: 'Excluding Twitter Data',
                key: new Date().getTime().toString()
            }
        });
    }

    const handleCloseWhatsapp = () => {
        setOpenWhatsapp(false); 
    }

    return (
        <Fragment>
            <StyledToggleButtonGroup>
                <Paper elevation={3} className={classes.paper}>
                <div style = {{ display: 'flex', flexDirection: 'column' }}>
                    <FormLabel component="legend" style={{ marginLeft: '15px' }}> 
                        <Typography variant="overline"> 
                            Share
                        </Typography> 
                    </FormLabel>

                    <Divider /> 
            
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        {socialMediaDetails.map((item) => (
                        <div style={{ marginTop: '17.5px', marginRight: '5px' }}> 
                            <Tooltip title={item.title}> 
                                <Button 
                                    name={item.name}
                                    size="large"
                                    color="primary"
                                    onClick={(e) => { 
                                        if(item.name==='twitter') {
                                            if(!state.socials.twitter) {
                                                setOpenTwitter(true); 
                                            } else {
                                                clearTwitterData(); 
                                            }
                                        } else if(item.name==='whatsapp') {
                                            if(!state.socials.whatsapp) {
                                                setOpenWhatsapp(true); 
                                            } else {
                                                alert('Clearing whatsapp data')
                                            }
                                        } else {
                                            dispatch({ 
                                                type: 'UPDATE_SOCIAL',
                                                payload: {
                                                    name: item.name,
                                                    value: !state.socials[item.name],
                                                    prefix: item.prefix
                                            }})
                                        }
                                    }}
                                    style={{ height: '100%'}}
                                >
                                    <FormControlLabel 
                                        control={item.component}
                                        label={
                                            <Typography 
                                                variant="overline"
                                                style={{ fontSize: '8px', color:'#000' }}
                                            > 
                                                {item.name}
                                            </Typography>
                                        }
                                        labelPlacement="bottom"
                                    />
                                </Button>
                            </Tooltip>
                        </div>
                        ))} 
                    </div> 
                </div> 
                </Paper>
            </StyledToggleButtonGroup>

            <TwitterDialog 
                open={openTwitter}
                handleClose={handleCloseTwitter}
            />

            <WhatsappDialog 
                open={openWhatsapp} 
                handleClose={handleCloseWhatsapp}
            />
        </Fragment>
    ); 
}

export default SocialMediaButtonGroup;