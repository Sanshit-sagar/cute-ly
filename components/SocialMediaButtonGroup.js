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
    Typography, Tooltip, Link,
    Button, Paper, Grid
} from '@material-ui/core';

import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsAppIcon from '@material-ui/icons/WhatsApp'; 
import LinkedInIcon from '@material-ui/icons/LinkedIn';

import { makeStyles, withStyles } from '@material-ui/core/styles';

import { createLink } from '../lib/db'; 
import { useCount } from './SharedContext';

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

function SubmitButtonWhatsapp(props) {
    const [state, dispatch] = useCount(); 
    const regex = /([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}/;
    
    const handleSubmit = async () => {
        const encodedMessageUrl = encodeForWhatsapp(props.phoneNumber, props.message);

        dispatch({
            type: 'UPDATE_URL',
            payload: {
                target: {
                    value: encodedMessageUrl,
                },
            },
        }); 


        const result = await createLink(state); 
        const updatedResultUrl = result.updatedUrl;

        dispatch({
            type: 'UPDATE_PURL',
            payload: {
                value: encodedMessageUrl,
            },
        }); 

        dispatch({ 
            type: 'UPDATE_RESULTS', 
            payload: {
                value: updatedResultUrl,
            },
        });

        dispatch({ 
            type: 'UPDATE_SOCIAL',
            payload: {
                name: 'whatsapp',
                value: true,
                prefix: ''
        }});

        props.handleClose(); 
    }

    return (
        <Button 
            size="large"
            variant="contained" 
            color="primary" 
            margin="normal"
            onClick={handleSubmit} 
            disabled={!regex.test(props.phoneNumber) || props.message.length===0}
        >
            <Typography 
                variant="button" 
                color="textSecondary"
            > 
                Generate 
            </Typography>
        </Button> 
    )
 }


const WhatsappDialog = ({ open, handleClose }) => {
    const classes = useStyles(); 
    const [state, dispatch] = useCount(); 
    
    const [phoneNumber, setPhoneNumber] = useState(''); 
    const [message, setMessage] = useState('');

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
                                        WhatsApp Message Details
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary" style={{fontSize: "12px"}} > 
                                        The Recipient's phone number needs to include a country code  
                                    </Typography>
                                    <TextField 
                                        fullWidth
                                        variant="filled"
                                        margin="dense"
                                        size="large"
                                        color="primary"
                                        label="Recipient's Phone Number"
                                        value={phoneNumber}
                                        onChange={handleNumberChange}
                                        error={!regex.test(phoneNumber)}
                                    />
                                    <FormHelperText> Include the Country Code </FormHelperText>

                                    <TextField 
                                        fullWidth
                                        variant="filled"
                                        margin="normal"
                                        size="large"
                                        color="primary"
                                        label="Your Message" 
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                </Grid> 
                            </Grid> 
                        </Paper> 
                    </Grid> 
                </Paper> 
            </DialogContent>

            <DialogActions> 
                <Button 
                    size="large"
                    variant="outlined" 
                    color="primary"
                    margin="normal"
                    onClick={handleClose}
                > 
                    <Typography variant="button" color="textSecondary"> Cancel </Typography>
                </Button>

                <SubmitButtonWhatsapp 
                    message={message}
                    phoneNumber={phoneNumber}
                    handleClose={handleClose}
                /> 
                
            </DialogActions>
        </Dialog> 
    );
}

function fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
      return '%' + c.charCodeAt(0).toString(16);
    });
}

function SubmitButton(props) {
    const [state, dispatch] = useCount(); 
    
    const handleSubmit = async () => {
        const encodedMessageUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + fixedEncodeURIComponent(state.url + props.message); 

        dispatch({
            type: 'UPDATE_URL',
            payload: {
                target: {
                    value: encodedMessageUrl,
                },
            },
        }); 

        const result = await createLink(state); 
        const updatedResultUrl = result.updatedUrl;

        dispatch({
            type: 'UPDATE_PURL',
            payload: {
                value: encodedMessageUrl,
            },
        }); 

        dispatch({ 
            type: 'UPDATE_RESULTS', 
            payload: {
                value: updatedResultUrl,
            },
        });

        dispatch({ 
            type: 'UPDATE_SOCIAL',
            payload: {
                name: 'facebook',
                value: true,
                prefix: 'https://www.facebook.com/sharer/sharer.php?u='
        }});

        props.handleClose(); 
    }

    return (
        <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            margin="normal"
            onClick={() => handleSubmit()}
            style={{ marginLeft: '10px', marginTop: '5px' }}
        > 
            <Typography variant="button" color='textSecondary'> 
                Generate 
            </Typography>
        </Button>
    )
 }
 
 function FacebookSubmitButton(props) {
    const [state, dispatch] = useCount(); 
    
    const handleSubmit = async () => {
        // const facebookUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + state.url;  

        // const result = await createLink(state, 'facebook'); 
        // const updatedResultUrl = result.updatedUrl;

        dispatch({
            type: 'UPDATE_URL',
            payload: {
                target: {
                    value: props.facebookUrl,
                },
            },
        }); 

        props.handleClose(); 
    }

    return (
        <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            margin="normal"
            onClick={() => handleSubmit()}
            style={{ marginLeft: '10px', marginTop: '5px' }}
        > 
            <Typography variant="button" color='textSecondary'> 
                Generate 
            </Typography>
        </Button>
    );
 }

 const FacebookDialog = ({ open, handleClose }) => {
     const classes = useStyles(); 
     const [state, dispatch] = useCount(); 
     const currUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + state.url; 

     return (
        <Dialog 
            open={open} 
            onClose={handleClose}
        > 
            <DialogTitle>
                <div style={{ maxWidth: '400px'}}>
                    <Typography variant="h4" color="textPrimary">
                        Generate Facebook Link?
                    </Typography>
                    <Typography variant="subtitle" color="textSecondary">
                        This is what your link will look like, do you want to proceed? 
                    </Typography>
                </div>
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
                                    <TextField 
                                        disabled
                                        fullWidth
                                        variant="outlined"
                                        label="DestinationUrl"
                                        value={currUrl}
                                        size="large"
                                        margin="dense"
                                        style={{ width: '450px'}}
                                    />
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
                            <Typography variant="button" color="textSecondary"> Cancel </Typography>
                        </Button>
                    </Grid>
                    <Grid item>

                        <FacebookSubmitButton 
                            facebookUrl={currUrl}
                            handleClose={handleClose}
                        />

                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
     ); 
 }

const TwitterDialog = ({ open, handleClose }) => {
    const classes = useStyles(); 
    const [state, dispatch] = useCount(); 

    const [message, setMessage] = useState('');
    const [charsRemaining, setCharsRemaining] = useState(280);

    const handleInputChange = (event) => {
        setMessage(event.target.value); 
        setCharsRemaining(280 - (message ? message.length : 0)); 
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
                            <Typography variant="button" color="textSecondary"> Cancel </Typography>
                        </Button>
                    </Grid>
                    <Grid item>

                        <SubmitButton 
                            message={message}
                            handleClose={handleClose}
                        />

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
    const [openFacebook, setOpenFacebook] = useState(false); 


    const handleCloseTwitter = () => {
        setOpenTwitter(false); 
    }
    const handleCloseWhatsapp = () => {
        setOpenWhatsapp(false); 
    }
    const handleCloseFacebook = () => {
        setOpenFacebook(false); 
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
                message: 'Clearing Twitter Data',
                key: new Date().getTime().toString()
            }
        });
    }

    const clearWhatsappData = () => {
        dispatch({
            type: 'UPDATE_SOCIAL',
            payload: {
                name: 'whatsapp',
                value: false,
                prefix: '',
            }});
        dispatch({
            type: 'SNACKBAR_TRIGGER', 
            payload: {
                message: 'Clearing WhatsApp Data',
                key: new Date().getTime().toString()
            }
        });
    }

    const clearFacebookData = () => {
        dispatch({
            type: 'UPDATE_SOCIAL',
            payload: {
                name: 'facebook',
                value: false,
                prefix: '',
            }});
        dispatch({
            type: 'SNACKBAR_TRIGGER',
            payload: {
                message: 'Clearing Facebook Data',
                key: new Date().getTime().toString()
            },
        });
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
                        <div style={{ marginTop: '7.5px', marginRight: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}> 
                            <Tooltip title={item.title}> 
                                <Button 
                                    name={item.name}
                                    size="large"
                                    color="primary"
                                    disabled={state.url.length === 0}
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
                                                clearWhatsappData(); 
                                            }
                                        } else if(item.name==='facebook') {
                                            if(!state.socials.facebook) {
                                                setOpenFacebook(true);
                                            } else {
                                                clearFacebookData(); 
                                            }
                                        } 
                                    }}
                                    style={{ paddingTop: '7.5px', height: '100%'}}
                                >
                                    <FormControlLabel 
                                        control={item.component}
                                        label={
                                            <Typography 
                                                variant="overline"
                                                style={{ fontSize: '8px' }}
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

            <FacebookDialog 
                open={openFacebook} 
                handleClose={handleCloseFacebook}
            />
        </Fragment>
    ); 
}

export default SocialMediaButtonGroup;