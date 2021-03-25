import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { useCount } from './SharedContext'; 

const useStyles = makeStyles((theme) => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

export default function SharedSnackbar() {
  const [state, dispatch] = useCount();
  
  React.useEffect(() => {
    if (state.snackbar?.snackpack.length && !state.snackbar?.messageInfo) {
      dispatch({ 
        type: "SNACKBAR_IDLE", payload: { 
          messageInfo: {
            ...state.snackbar?.snackpack[0] 
          }, 
          snackpack: state.snackbar?.snackpack.slice(1),
        } 
      });
    } else if (state.snackbar?.length && state.snackbar?.messageInfo && state.snackbar?.open) {
      
      dispatch({ type: "SNACKBAR_CLOSE" }); 
    }
  }, [state.snackbar?.snackpack, state.snackbar?.messageInfo, state.snackbar?.open]);

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

  const classes = useStyles();
  return (
    <div>
      <Snackbar
        key = {
          state.snackbar?.messageInfo ? 
          state.snackbar?.messageInfo.key : 
          undefined
        }
        anchorOrigin = {{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open = {
          state.snackbar?.open
        }

        autoHideDuration={2000}
        onClose={ 
          handleClose
        }
        onExited={
          handleExited
        }
        message={
            state.snackbar?.messageInfo 
          ? state.snackbar?.messageInfo.message 
          : undefined
        }
        action={
          <React.Fragment>
         
            <IconButton
              aria-label="close"
              color="textSecondary"
              className={classes.close}
              onClick={handleClose}
              color="secondary"
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}