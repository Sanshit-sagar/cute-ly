import React, { Fragment, useState } from 'react'; 

import Dialog from '@material-ui/core/Dialog'; 
import DialogTitle from '@material-ui/core/DialogTitle'; 
import DialogContent from '@material-ui/core/DialogTitle'; 
import DialogActions from '@material-ui/core/DialogActions';

import TextField from '@material-ui/core/TextField'; 
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { FormControlLabel, FormLabel, Typography, Tooltip, Button, Box } from '@material-ui/core'; 

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
    marginBottom: 12,
  }
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
            style={{ color: state.socials.linkedin ? '#005cc5' : '#000' }} 
        />
    ); 
}

function FacebookIconComp() {
    const [state, dispatch] = useCount(); 
    return (
        <FacebookIcon 
            style={{ color: state.socials.facebook ? '#4861ac' : '#000' }} 
        />
    ); 
}

function TwitterIconComp() {
    const [state, dispatch] = useCount(); 
    return (
        <TwitterIcon 
            style={{ color: state.socials.twitter ? '#009dff' : '#000' }} 
        />
    ); 
}
function WhatsAppIconComp() {
    const [state, dispatch] = useCount(); 
    return (
        <WhatsAppIcon 
            style={{ color: state.socials.whatsapp ? '#00d85a' : '#000' }} 
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

const WhatsappDialog = ({ open, handleClose }) => {
    const classes = useStyles(); 
    const [state, dispatch] = useCount(); 
    
    const [phoneNumber, setPhoneNumber] = useState(); 
    const [message, setMessage] = useState();

    const handleSubmit = () => {
        handleClose(); 
        dispatch({ 
            type: 'UPDATE_SOCIAL',
            payload: {
                name: 'whatsapp',
                value: true,
                prefix: ''
        }});
        alert('Submitting!');
    }

    const handleNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    }

    const regex = /([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}/;

    return (
        <Dialog 
            open={open} 
            onClose={handleClose}
        > 
            <DialogTitle>
                Share on Whatsapp
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
                            size="small"
                            color="primary"
                            label="Recipient's Phone Number"
                            value={phoneNumber}
                            onChange={handleNumberChange}
                            error={!regex.test(phoneNumber)}
                        />

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

const TwitterDialog = ({ open, handleClose }) => {
    const classes = useStyles(); 
    const [state, dispatch] = useCount(); 
    
    const [message, setMessage] = useState(state.url);
    const [charsRemaining, setCharsRemaining] = useState(280 - message.length); 

    const handleSubmit = () => {
        var messageVal = message.substring(state.url.length); 
         //set state.modifiedURL to url + "text=" + encoded(mssg)

        handleClose();
        dispatch({ 
            type: 'UPDATE_SOCIAL',
            payload: {
                name: 'twitter',
                value: !state.socials.twitter,
                prefix: ''
        }});
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
                Share on Twitter
            </DialogTitle> 

            <DialogContent> 
                <Card 
                    className={classes.cardRoot}
                    variant="outlined"
                >
                    <CardContent>
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
                        <br /> 
                       
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
                                style={{ width: '150px' }}
                            /> 
                        </div>
                        
                    </CardContent>
                </Card> 
            </DialogContent>

            <DialogActions> 
                <Button onClick={handleClose}> 
                    Cancel
                </Button>
                <Button onClick={handleSubmit}>
                    Done
                </Button> 
            </DialogActions>
        </Dialog>
    );
}

const SocialMediaButtonGroup = () => {
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
    <>
        <StyledToggleButtonGroup>
            <div style = {{ display: 'flex', flexDirection: 'column' }}>
                <FormLabel component="legend" style={{ marginLeft: '5px' }}> 
                    <Typography variant="overline"> 
                        Share
                    </Typography> 
                </FormLabel>
          
                <div style={{ height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    {socialMediaDetails.map((item) => (
                        <Tooltip title={item.title}> 
                            <Button 
                                name={item.name}
                                size="small"
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
                            >
                                <FormControlLabel 
                                    value="female" 
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
                        
                    ))} 
                </div> 
            </div> 
        </StyledToggleButtonGroup>

        <TwitterDialog 
            open={openTwitter}
            handleClose={handleCloseTwitter}
        />

        <WhatsappDialog 
            open={openWhatsapp} 
            handleClose={handleCloseWhatsapp}
        />
    </>
    ); 
}

export default SocialMediaButtonGroup;