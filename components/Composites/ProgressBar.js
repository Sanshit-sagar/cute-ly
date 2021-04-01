import React, { Fragment, useState, useEffect } from 'react'; 

import { Paper, LinearProgress, Typography } from '@material-ui/core'; 
import { withStyles } from '@material-ui/core/styles';

import { useCount } from '../SharedContext';  

const validUrlPattern =  /^https?:\/\/([\w\d\-]+\.)+\w{2,}(\/.+)?$/;

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 2.5,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 700 : 200],
  },
  bar: {
    borderRadius: 5,
    width: '75%',
    backgroundColor: '#f9aaaa',
  },
}))(LinearProgress);


const ProgressBar = () => {
  const [state, dispatch] = useCount();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
      var res = 6;

      if(state.url.length) {
          res = 14;
      } 
      if(state.url.length && validUrlPattern.test(state.url)) {
          res = 22; 
      }

      var total = 0; 
      if(state.url.length && validUrlPattern.test(state.url) && state.nickname.length) {
          res = 30; 

          if(state.counts.ios) { 
              total += 8;
          }
          if(state.counts.android) { 
              total += 8;
          }
          if(state.counts.utm) { 
              total += 8;
          }
          if(state.counts.meta) { 
              total += 8;
          }

          if(total > 0) {
              if(state.socials.twitter) {
                  total += 8;
              }
              if(state.socials.facebook) {
                  total += 8;
              }
              if(state.socials.linkedin) {
                  total += 8;
              }
              if(state.socials.whatsapp) {
                  total += 8;
              }
          }
      }

      res += total; 

      setProgress(res); 
      return res;

  }, [state.url, state.counts, state.nickname, state.socials, state.mostRecentResult]); 

  function getState() {
      return progress + "%";  
  }

  return (
        <Fragment>
            <Paper elevation={10}>
                <BorderLinearProgress 
                    variant="determinate" 
                    value={progress} 
                />
            </Paper>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                <Typography variant="caption">
                    { getState(progress) }
                </Typography>
            </div>
        </Fragment>
  );
}

export default ProgressBar; 