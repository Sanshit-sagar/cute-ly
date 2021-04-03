import React, { Fragment, useState, useEffect } from 'react'; 

import Dialog from '@material-ui/core/Dialog'; 
import DialogTitle from '@material-ui/core/DialogTitle'; 
import DialogContent from '@material-ui/core/DialogTitle'; 
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider'; 

import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { 
    FormControl, FormControlLabel, FormHelperText, FormLabel, InputLabel,
    Typography, Tooltip, Link, FilledInput,
    Button, Paper, Grid, TextField
} from '@material-ui/core';

import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsAppIcon from '@material-ui/icons/WhatsApp'; 
import LinkedInIcon from '@material-ui/icons/LinkedIn';

import OpenInNewIcon from '@material-ui/icons/OpenInNew'; 
import { makeStyles, withStyles } from '@material-ui/core/styles';

import { createLink } from '../../lib/db'; 
import { useCount } from '../SharedContext';

const useStyles = makeStyles((theme) => ({
    paper: {
        border: `1px solid`,
        padding: theme.spacing(1),
        borderColor: theme.palette.primary.dark,
    },
    button: {
        height: '100%',
    },
    dialogTitle: {
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'flex-start', 
        alignItems: 'stretch',
    },
    linkContainer: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    socialMediaDetailsItem: {
        marginTop: '7.5px', 
        marginRight: '5px', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
    },
})); 


const validUrlPattern =  /^https?:\/\/([\w\d\-]+\.)+\w{2,}(\/.+)?$/;

const StyledToggleButtonGroup = withStyles((theme) => ({
    grouped: {
      margin: theme.spacing(0.5),
      border: 'thin solid',
      borderColor: theme.palette.primary.main,
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
            style={{ color: state.socials.linkedin ? '#005cc5' : (!validUrlPattern.test(state.url) ? 'gray' :   '#1eb980'), fontSize: '24px' }} 
        />
    ); 
}

function FacebookIconComp() {
    const [state, dispatch] = useCount(); 
    return (
        <FacebookIcon 
            style={{ color: state.socials.facebook ? '#4861ac' : (!validUrlPattern.test(state.url) ? 'gray' :   '#1eb980'), fontSize: '24px' }} 
        />
    ); 
}

function TwitterIconComp() {
    const [state, dispatch] = useCount(); 
    return (
        <TwitterIcon 
            style={{ color: state.socials.twitter ? '#009dff' : (!validUrlPattern.test(state.url) ? 'gray' :   '#1eb980'), fontSize: '24px'}} 
        />
    ); 
}

function WhatsAppIconComp() {
    const [state, dispatch] = useCount(); 
    return (
        <WhatsAppIcon 
            style={{ color: state.socials.whatsapp ? '#00d85a' : (!validUrlPattern.test(state.url) ? 'gray' :   '#1eb980'), fontSize: '24px'}} 
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
    const [result, setResult] = useState(''); 
    const regex = /([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}/;
    
    const handleSubmit = async () => {
        const encodedMessageUrl = encodeForWhatsapp(props.phoneNumber, props.message);

        dispatch({
            type: 'GENERATE_SOCIAL_URL',
            payload: {
                name: 'whatsapp',
                value: encodedMessageUrl,
            },
        }); 

        const result = await createLink(state, encodedMessageUrl); 
        const updatedResultUrl = result.updatedUrl;
        
        setResult(updatedResultUrl);
    
        dispatch({
            type: "UPDATE_RESULTS",
            payload: {
                value: updatedResultUrl
            }
        });        

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
                <div className={classes.dialogTitle}>
                    <WhatsAppIcon style={{ margin: '10px', color: '#00d85a' }} />
                    <Typography variant="h4" style={{ color: '#1eb980' }}>
                        Share on WhatsApp
                    </Typography>
                </div>
            </DialogTitle> 

            <DialogContent> 
                <Paper 
                    elevation={5}
                    className={classes.paper}
                >
                    <Grid 
                        container
                        direction="column"
                        justify="space-evenly"
                        spacing={2}
                    >
                        <Grid item>
                            <div style={{ 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    justifyContent: 'flex-start', 
                                    alignItems: 'stretch', 
                                    marginBottom: '20px',
                                }}
                            >
                                <Typography 
                                    variant="overline"
                                    color="primary"
                                >
                                    WhatsApp Message Details
                                </Typography>
                                <Typography 
                                    variant="caption"
                                >
                                    Please fill out these fields which are needed for every WhatsApp message 
                                </Typography>
                            </div>
                        </Grid>

                       <Grid item>
                            <FormControl fullWidth>
                                <InputLabel> Recipients Contact </InputLabel>
                                <FilledInput 
                                    multiline
                                    margin="normal"
                                    size="large"
                                    variant="filled"
                                    color="primary"
                                    value={phoneNumber}
                                    onChange={handleNumberChange}
                                    error={!regex.test(phoneNumber)}
                                    style={{ color: '#1eb980' }}
                                /> 

                                <FormHelperText style={{ color: '#f9aaaa' }}> 
                                    The number must include the country code 
                                </FormHelperText>
                            </FormControl>
                        </Grid>

                       <Grid item>
                            <FormControl fullWidth>
                                <InputLabel> The Message </InputLabel>

                                <FilledInput 
                                    multiline
                                    margin="normal"
                                    size="large"
                                    variant="filled"
                                    color="primary" 
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    error={!message.length}
                                    style={{ color: '#1eb980' }}
                                />
                                <FormHelperText style={{ color: '#f9aaaa' }}> 
                                    The message you'd like the link to contain 
                                </FormHelperText>
                            </FormControl>
                        </Grid>

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

 function LinkedinSubmitButton(props) {
    const [state, dispatch] = useCount(); 
    const [result, setResult] =  useState(''); 
    
    const handleSubmit = async () => {
        const linkedinUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=' + state.url;  

        dispatch({
            type: 'GENERATE_SOCIAL_URL',
            payload: {
                name: 'linkedin',
                value: linkedinUrl,
            },
        }); 

        const result = await createLink(state, linkedinUrl); 
        const updatedResultUrl = result.updatedUrl;
        
        setResult(updatedResultUrl);
    
        dispatch({
            type: "UPDATE_RESULTS",
            payload: {
                value: updatedResultUrl
            }
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

 const StyledProspectiveLink = ({ url }) => {
    const classes = useStyles(); 

    return (
        <Grid item>
            <Paper elevation={0}>
                <div className={classes.linkContainer}>
                    <Link href={url}> 
                        <Typography variant="caption" style={{ fontSize: '16px', color: '#1eb980' }}> 
                            { url.substring(0, 55) + "..."} 
                        </Typography>
                    </Link>
                    <OpenInNewIcon style={{ color: '#1eb980' }} /> 
                </div>
            </Paper>
        </Grid> 
    );
 }

 const StyledDialogActionsGroup = ({ type, message, handleClose }) => {
    
    return (
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
               { type==="twitter" && <SubmitButtonTwitter message={message} handleClose={handleClose} /> }
            </Grid>
        </Grid>
    )
 }

 const LinkedinDialog = ({ open, handleClose }) => {
    const classes = useStyles(); 
    const [state, dispatch] = useCount(); 
    const currUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=' + state.url; 

    return (
       <Dialog 
           open={open} 
           onClose={handleClose}
       > 
            <DialogTitle>
                <div className={classes.dialogTitle}>
                    <LinkedInIcon style={{ margin: '10px', color: '#005cc5' }} />
                    <Typography variant="h4" style={{ color: '#1eb980' }}>
                        Share on LinkedIn
                    </Typography>
                </div>
            </DialogTitle> 

           <DialogContent> 
                <Paper 
                    elevation={5}
                    className={classes.paper}
                >
                    <Grid 
                        container
                        direction="row"
                        justify="space-around"
                        wrap='wrap'
                    >
                       <StyledProspectiveLink url={currUrl} /> 
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
                           <Typography
                                variant="button" 
                                color="textSecondary"
                            > 
                                Cancel 
                            </Typography>
                       </Button>
                   </Grid>
                   <Grid item>
                       <LinkedinSubmitButton 
                           handleClose={handleClose}
                       />
                   </Grid>
               </Grid>
           </DialogActions>
       </Dialog>
    ); 
}
 
 function FacebookSubmitButton(props) {
    const [state, dispatch] = useCount();
    const [result, setResult] = useState('');  
    
    const handleSubmit = async () => {
        const facebookUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + state.url;  

        dispatch({
            type: 'GENERATE_SOCIAL_URL',
            payload: {
                name: 'facebook',
                value: facebookUrl,
            },
        }); 

        const result = await createLink(state, facebookUrl); 
        const updatedResultUrl = result.updatedUrl;

        setResult(updatedResultUrl);
    
        dispatch({
            type: "UPDATE_RESULTS",
            payload: {
                value: updatedResultUrl
            }
        });
    }

    return (
        <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            margin="normal"
            onClick={() => handleSubmit()}
        > 
            <Typography variant="button" color='textSecondary'> 
                Generate 
            </Typography>
        </Button>
    );
 }

 const FacebookDialog = ({ open, handleClose, data, setData }) => {
     const classes = useStyles(); 
     const [state, dispatch] = useCount(); 
     const currUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + state.url; 

     return (
        <Dialog 
            open={open} 
            onClose={handleClose}
        > 
             <DialogTitle>
                <div className={classes.dialogTitle}>
                    <FacebookIcon style={{ margin: '10px', color: '#4861ac' }} />
                    <Typography variant="h4" style={{ color: '#1eb980' }}>
                        Share on Facebook
                    </Typography>
                </div>
            </DialogTitle> 

            <DialogContent>  
                <Paper 
                    elevation={5}
                    className={classes.paper}
                >   
                    <Grid 
                        container
                        direction="row"
                        justify="space-around"
                        wrap='wrap'
                    >
                        <StyledProspectiveLink url={currUrl} /> 
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
                            handleClose={handleClose}
                        />
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
     ); 
 }


function fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
      return '%' + c.charCodeAt(0).toString(16);
    });
}

const SubmitButtonTwitter = ({ message, handleClose }) => {
    const [state, dispatch] = useCount(); 
    const [result, setResult] = useState(''); 
    
    const handleSubmit = async () => {
        const postfix = fixedEncodeURIComponent(message); 
        const encodedMessageUrl = 'https://twitter.com/intent/tweet?text=' + postfix; 

        dispatch({
            type: 'GENERATE_SOCIAL_URL',
            payload: {
                name: 'twitter',
                value: encodedMessageUrl,
            },
        }); 

        const result = await createLink(state, encodedMessageUrl); 
        const updatedResultUrl = result.updatedUrl;

        setResult(updatedResultUrl);
    
        dispatch({
            type: "UPDATE_RESULTS",
            payload: {
                value: updatedResultUrl
            }
        });
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

const TwitterDialog = ({ open, handleClose }) => {
    const classes = useStyles(); 
    const [state, dispatch] = useCount(); 

    const [message, setMessage] = useState(state.url);
    const [charsRemaining, setCharsRemaining] = useState(280);

    const handleInputChange = (event) => {
        setMessage(event.target.value); 
        setCharsRemaining(280 - (message ? message.length : 0)); 
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                <div className={classes.dialogTitle}>
                    <TwitterIcon 
                        style={{ 
                            margin: '7.5px', 
                            color: '#009dff' 
                        }}
                    /> 
                    <Typography 
                        variant="h4" 
                        style={{ color: '#1eb980' }}
                    >
                        Share on Twitter
                    </Typography>
                </div>
            </DialogTitle> 

            <DialogContent> 
                <Paper 
                    elevation={5}
                    className={classes.paper}
                >
                    <Grid 
                        container
                        direction="row"
                        justify="space-around"
                        wrap='wrap'
                    >
                        <Grid item>
                            <div style={{ 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    justifyContent: 'flex-start', 
                                    alignItems: 'stretch' 
                                }}
                            >
                                <Typography 
                                    variant="overline"
                                    color="primary"
                                >
                                    Your Message
                                </Typography>

                                <Typography 
                                    variant="caption" 
                                    style={{fontSize: "12px"}}
                                > 
                                    Links that exceed 32 characters are automatically shortened or truncated.
                                </Typography>
                            </div>

                            <div>
                                <FormControl fullWidth>
                                    <FilledInput 
                                        multiline
                                        margin="normal"
                                        size="large"
                                        variant="filled"
                                        color="primary"
                                        value={message}
                                        onChange={handleInputChange}
                                        style={{ color: '#1eb980' }}
                                    /> 
                                </FormControl>
                            </div>

                            <div style={{ 
                                    display: 'flex', 
                                    flexDirection: 'row', 
                                    justifyContent: 'flex-end' 
                                }}
                            > 
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
            </DialogContent>

            <DialogActions> 
                <StyledDialogActionsGroup type="twitter" message={message} handleclose={handleClose} /> 
            </DialogActions>
        </Dialog>
    );
}

const SocialMediaButtonGroup = () => {
    const classes = useStyles(); 
    const [state, dispatch] = useCount(); 

    const [open, setOpen] = useState(false);
    const [medium, setMedium] = useState(''); 

    const handleOpen = (currentMedium) => {
        setMedium(currentMedium);
        setOpen(true);
    }
    const handleClose = () => {
        setMedium('');
        setOpen(false); 
    }

    useEffect(() => {
        if(state.showResults) {
            setMedium('');
            setOpen(false);
        };
        return open;
    }, [open, medium, state.showResults]); 

    const dispatchAlreadyGenerated = (medium) => {
        dispatch({
            type: 'SNACKBAR_TRIGGER',
            payload: {
                message: 'Already generated a link for ' + medium + ' using this URL',
                key: new Date().getTime().toString(),
            },
        });
    }
   
    return (
    <Fragment>
        <StyledToggleButtonGroup>
            <Paper elevation={0} className={classes.paper}>
                
                <div style = {{ display: 'flex', flexDirection: 'column' }}>
                    <FormLabel component="legend" style={{ marginLeft: '5px' }}> 
                        <Typography 
                            variant="overline" 
                            style={{ color: !validUrlPattern.test(state.url) ? 'gray' : '#1eb980' }}
                        > 
                            Share
                        </Typography> 
                    </FormLabel>

                    <Divider style={{ backgroundColor: !validUrlPattern.test(state.url) ? 'gray' : '#1eb980' }} /> 
            
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        {socialMediaDetails.map((item) => (
                            <div className={classes.socialMediaDetailsItem}> 
                                <Tooltip 
                                    arrow
                                    enterDelay={500} 
                                    title={
                                        <Fragment>
                                            <Typography 
                                                variant="caption"
                                                color="primary"
                                            >
                                                {item.title}
                                            </Typography>
                                        </Fragment>
                                    }
                                > 
                                    <Button 
                                        name={item.name}
                                        color="primary"
                                        size="small"
                                        margin="dense"
                                        variant="outlined"
                                        disabled={!validUrlPattern.test(state.url)}
                                        onClick={(e) => { 
                                            if(!state.socials[item.name]) {
                                                handleOpen(item.name);
                                            } else {
                                                dispatchAlreadyGenerated(item.name);
                                            }
                                        }}
                                        style ={{ paddingTop: '7.5px'}}
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

                <TwitterDialog open={open && medium==="twitter"} handleClose={handleClose} />
                <WhatsappDialog 
                    open={open && medium==="whatsapp"}
                    handleClose={handleClose}
                />

                <FacebookDialog 
                    open={open && medium==="facebook"}
                    handleClose={handleClose}
                />

                <LinkedinDialog 
                    open={open && medium==="linkedin"}
                    handleClose={handleClose}
                />
    </Fragment>
    ); 
}

export default SocialMediaButtonGroup;