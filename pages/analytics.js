import React, { Fragment, useState } from 'react'; 
import Router from 'next/router';
import firebase from '../lib/firebase';

import Button from '@material-ui/core/Button'; 
import { DataGrid } from '@material-ui/data-grid';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'; 

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField'; 
import Typography from '@material-ui/core/Typography';

import FileCopyIcon from '@material-ui/icons/FileCopy'; 
import StarIcon from '@material-ui/icons/Star'; 
import DeleteIcon from '@material-ui/icons/Delete';

import { makeStyles } from '@material-ui/core/styles';

import { useAuth } from '../lib/auth'; 

import SharedSnackbar from '../components/Snackbar';
import PageContainer from '../components/PageContainer';

class AnalyticsBase extends React.Component {
    constructor(props) {
        super(props); 

        this.state = {
            uid: '', 
            loading: false, 
            payload: null, 
            error: null, 
            userData: null, 
            links: [], 
            linksMap: {}, 
        };
    }

    componentDidMount() {
       
        this.setState({ 
            loading: true, 
            uid: this.props.userData.uid, 
            userData: this.props.userData,
        });

        let allLinks = [];
        var linksRef = firebase.database()
            .ref('/links') 
            .on('value', querySnapShot => {
                let index = 0; 
                querySnapShot.forEach(snap => {
                    allLinks.push({
                        id: index, 
                        ...snap.val(),
                    }); 
                    index = index + 1; 
                });
            }); 

        let res = []; 
        let tempMap = {}; 
        allLinks.forEach((item) => {
            if(item.uid === this.props.userData.uid) {
                res.push({ 
                    id: item.id, 
                    ...item 
                }); 
                tempMap[item.id] = item; 
            }
        });

        this.setState({ 
            links: res,
            loading: false,
            linksMap: tempMap,
        }); 
    }

    handleTransformation(transformation_type) {
        console.log("Handling transition of type: " + transformation_type)
    }

    render() {
        return (
           <PageContainer height="100%" width="100%"> 
               <CustomDataGrid 
                    loading={this.state.loading}
                    userDetails={this.state.userData}
                    allLinks={this.state.links}
                    linksMap={this.state.linksMap}
                />   
           </PageContainer> 
        )
    }
}

const CustomDataGrid = ({ loading, userDetails, allLinks, linksMap }) => {
    const [selectionModel, setSelectionModel] = useState([]); 
    const [open, setOpen] = useState(false); 
    const [item, setItem] = useState(false); 

    const handleTransformation = () => {
        console.log("Transforming..."); 
    }

    const handleOpen = () => {
        setOpen(true); 
    }

    const handleClose = () => {
        setOpen(false); 
    }

    const handleItemDisplay = () => {
        const itemDetails = linksMap[selectionModel[0]];
        setOpen(true); 
        setItem(itemDetails); 
    }

    const ItemDisplayDialog = () => {
        return (
            <>
                <Dialog open={open} onClose={handleClose}> 
                    <DialogTitle> 
                        Item # {selectionModel[0]}
                    </DialogTitle>
                    <DialogContent> 
                        <ItemDetailsCard itemDetails={item} /> 
                    </DialogContent>
                    <DialogActions> 
                        <Button 
                            variant="contained"
                            color="primary"
                            onClick={handleClose}
                        > 
                            Done
                        </Button> 
                    </DialogActions>
                </Dialog>
            </>
        )
    }

    return (
        <div style={{ height: '85%', width: '85%', marginLeft: '7.5%'}}> 
            <DataGrid
                columns={[
                    { field: 'id', headerName: 'ID', width: 100},
                    { field: 'mode', headerName: 'Option', width: 100},
                    { field: 'suffix', headerName: 'Slash Tag', width: 120 },
                    { field: 'url', headerName: 'Original URL', width: 225 },
                    { field: 'updatedUrl', headerName: 'Updated URL', width: 225},
                    { field: 'timestamp', headerName: 'Timestamp (UTC)', width: 200 },
                ]}
                pagination
                rows={allLinks}
                pageSize={20} 
                rowsPerPageOptions={
                    [10, 20, 40]
                } 
                loading={loading}
                onFilterModelChange={handleTransformation}
                onSelectionModelChange={(newSelection) => {
                    setSelectionModel(newSelection.selectionModel)
                }}
                selectionModel={selectionModel}
            />
            
            { 
                selectionModel.length 
            
            ?   <Button 
                    variant="contained" 
                    color="primary"
                    onClick={handleItemDisplay}
                > 
                    {linksMap[selectionModel[0]].updatedUrl.substring(8)} 
                </Button> 

            : <TextField 
                disabled 
                variant="standard"
                color="textSecondary"
                value="Select an entry to view"
              /> 
            }

            <ItemDisplayDialog /> 
        </div>              
    );
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const ItemDetailsCard = ({ itemDetails }) => {
    const classes = useStyles(); 
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Fragment> 
             <Card className={classes.root} variant="outlined">
                <CardContent>

                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {itemDetails.url.substring(15)}...
                    </Typography>
                
                    <Typography variant="h5" component="h2">
                        {itemDetails.suffix}
                    </Typography>
                
                    <Typography className={classes.pos} color="textSecondary">
                        {itemDetails.mode}
                    </Typography>
                
                    <Typography variant="body2" component="p">
                        {itemDetails.originalUrl}
                    <br />
                        {itemDetails.timestamp}
                    </Typography>
                </CardContent>

                <CardActions>
                    <IconButton> 
                        <FileCopyIcon />
                    </IconButton>
                    <IconButton> 
                        <StarIcon /> 
                    </IconButton>
                    <IconButton> 
                        <DeleteIcon /> 
                    </IconButton>
                </CardActions>
            </Card>
        </Fragment>
    );
}

const Analytics = () => {
    const { user, loading } = useAuth(); 

    if(!user && !loading) {
        Router.push('/'); 
    }

    return (
        <React.Fragment>
            {user ? 
                <AnalyticsBase 
                    userData={user} 
                /> 
            : 
                null 
            }
            <SharedSnackbar /> 
        </React.Fragment>
    );
}

export default Analytics; 