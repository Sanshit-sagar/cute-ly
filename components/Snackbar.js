import React, { Fragment } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { useCount } from './SharedContext'; 


function Alert(props) {
  return <MuiAlert elevation={6} variant="outlined" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

export default function SharedSnackbar() {
  const [state, dispatch] = useCount();
  
  React.useEffect(() => {
    if (state.snackbar.snackpack.length && !state.snackbar.open) {
      dispatch({ 
        type: "SNACKBAR_IDLE", payload: { 
          messageInfo: {
            ...state.snackbar.snackpack[0] 
          }, 
          snackpack: state.snackbar.snackpack.slice(1),
        } 
      });
    } else if (state.snackbar.length && state.snackbar.messageInfo && state.snackbar.open) {
      
      dispatch({ type: "SNACKBAR_CLOSE" }); 
    }
  }, [state.snackbar.snackpack, state.snackbar.messageInfo, state.snackbar.open]);

  const handleClick = (message) => () => {  
    dispatch({ 
      type: "SNACKBAR_TRIGGER", payload: { 
        message, 
        key: new Date().getTime(), 
      }
    });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch({ 
      type: "SNACKBAR_CLOSE" 
    }); 
  };

  const handleExited = () => {
    dispatch({ 
      type: "SNACKBAR_EXIT" 
    }); 
  };

  const CloseSnackbarAction = () => {
    return (
      <Fragment>
        <IconButton
          aria-label="close"
          color="textSecondary"
          className={classes.close}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </Fragment>
    );
  }

  const classes = useStyles();
  return (
    <div>
      <Snackbar
        key = {
          state.snackbar.messageInfo ? 
          state.snackbar.messageInfo.key : 
          undefined
        }
        anchorOrigin = {{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open = {
          state.snackbar.open
        }
        autoHideDuration={2000}
        onClose={ 
          handleClose
        }
        onExited={
          handleExited
        }
      >
          <Alert onClose={handleClose} severity="info">
            { state.snackbar.messageInfo ? state.snackbar.messageInfo.message : ' ' }
          </Alert>
        </Snackbar> 
    </div>
  );
}