	
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
 
const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));
 
export default function SimpleSnackbar() {
  const classes = useStyles();
 
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
 
    // setOpen(false);
  };
 
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={false}
        autoHideDuration={6000}
        onClose={handleClose}
        message={<span>Note archived</span>}
        action={[
          <IconButton
            key="close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  );
}