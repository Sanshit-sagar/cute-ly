import React, { useState } from 'react'; 

import { 
    Dialog, 
    DialogContent, 
    Button,
} from '@material-ui/core'; 
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';


import StarIcon from '@material-ui/icons/Star';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import LinkIcon from '@material-ui/icons/Link'; 

import TextField from '@material-ui/core/TextField';

import Paper from '@material-ui/core/Paper'; 
// import Box from '@material-ui/core/Box';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    width: 450,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', 
    alignItems: 'stretch',
  },
  content: {
    flex: '1 0 auto',
    width: '600px',
  },
  cover: {
    width: 150,
    height: 150,
    borderRadius: 5,
  },
  controls: {
    display: 'flex',
    direction: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: '5px',
  },
  playIcon: {
    // height: 38,
    // width: 38,
  },
  dialogPaper: {
      color: theme.palette.primary.dark,
  },
}));

const getMedium = (url) => {
    if(url.includes('facebook')) {
        return 'facebook';
    }
    if(url.includes('linkedin')) {
        return 'linkedin';
    }
    if(url.includes('twitter')) {
        return 'twitter';
    }
    if(url.includes('whatsapp')) {
        return 'whatsapp';
    }
    return 'http'; 
}

const DetailsCard = ({ data }) => {
    const classes = useStyles();
    const theme = useTheme(); 

    const [localData, setLocalData] = useState(data); 

    const medium = getMedium(data.url); 

    const handleClickStarred = () => {
        var tempData = localData;
        tempData.starred = !localData.starred; 
        setLocalData(tempData); 

        alert(JSON.stringify(localData)); 
    }
    
    return (
        <Card className={classes.root}>
             <CardContent className={classes.content}>
             <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ 
                    display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '10px', marginRight: '5px' 
                }}>
                  
                   <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'stretch' }} >
                       <div  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                            <Paper elevation={5}>
                                { medium==="linkedin" && <CardMedia
                                    className={classes.cover}
                                    image = "/linkedin.png"
                                    title="Shareable on LinkedIn"
                                    style={{ backgroundColor: '#005cc5' }}
                                />}
                                { medium==="whatsapp" && <CardMedia
                                    className={classes.cover}
                                    image = "/whatsapp.png"
                                    title="Shareable on LinkedIn"
                                    style={{ backgroundColor: '#00d85a' }}
                                />}
                                { medium==="twitter" && <CardMedia
                                    className={classes.cover}
                                    image = "/twitter.png"
                                    title="Shareable on LinkedIn"
                                    style={{ backgroundColor: '#009dff' }}
                                />}
                                { medium ==="facebook" && <CardMedia
                                    className={classes.cover}
                                    image = "/facebook.png"
                                    title="Shareable on LinkedIn"
                                    style={{ backgroundColor: '#4861ac' }}
                                />}
                            </Paper>
                        </div>
                        
                        <div  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                            <Paper elevation={5} style={{ marginTop: '10px' }}>
                                <Button 
                                    fullWidth
                                    size="large"
                                    margin="dense"
                                    variant="contained" 
                                    color="secondary"
                                >
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'space-between'}}>
                                        <Typography variant="overline" color="textSecondary"> 
                                            Params 
                                        </Typography>
                                        
                                        <LocalOfferIcon 
                                            style={{ marginLeft: '10px', marginTop: '2.5px', color: '#fff' }} 
                                        /> 
                                    </div>
                                </Button>
                            </Paper>
                        </div>
                    </div>
                </div>

                <div className={classes.details}>
                    <Paper elevation={10} style={{ padding: '10px', margin: '5px', border: 'thin solid silver' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Link>
                                <Typography component="h4" variant="h4">
                                    /{ data.suffix } 
                                </Typography>
                            </Link>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Link href={data.url}>
                                <Typography component="overline">
                                    { data.url.substring(0, 35) } 
                                </Typography>
                            </Link>
                            <Button size="small" margin="dense" variant="contained" color="primary" style={{ height: '30px', width: '10px' }}> 
                                <LinkIcon />
                            </Button>
                        </div>
                    </Paper>

                
                    <Paper elevation={0}>
                        <div className={classes.controls}>
                            <Button variant="contained" color="primary" onClick={handleClickStarred} style={{ margin: '2.5px' }}>
                                <StarIcon style={{ color: localData.starred ? 'yellow' : 'black' }} />
                            </Button>
                            <Button variant="contained" color="primary" style={{ margin: '2.5px' }}>
                                <FileCopyIcon className={classes.playIcon} />
                            </Button>
                            <Button variant="contained" color="primary" style={{ margin: '2.5px' }}>
                                <DeleteIcon /> 
                            </Button>
                        </div>
                    </Paper>
                </div>
            </div>

            </CardContent>
        </Card>
    ); 
}


const LinkDetailsDialog = ({ open, handleClose, data }) => {
    const classes = useStyles(); 

    return (
        <div>
            { data ?
                (
                    <Dialog open={open} onClose={handleClose}>
                        <DialogContent style={{ padding: '5px'}} >
                            <Paper elevation={5} className={classes.dialogPaper}>
                                <DetailsCard data={data} /> 
                            </Paper>
                        </DialogContent>
                    </Dialog>
                )
            : 
                null 
            }
        </div>
    );
}

export default LinkDetailsDialog; 