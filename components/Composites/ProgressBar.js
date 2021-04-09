import React, { Fragment, useState, useEffect } from 'react'; 

import { Paper, LinearProgress, Typography } from '@material-ui/core'; 
import { makeStyles, withStyles } from '@material-ui/core/styles';

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
    backgroundColor: theme.palette.secondary.main,
  },
}))(LinearProgress);

const useStyles = makeStyles((theme) => ({
  progressDisplay: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    alignItems: 'center',
  },
  colorPrimary: {
      color: theme.palette.secondary.main,
  },
}));

const ProgressBar = () => {
    const classes = useStyles();
    const [state, dispatch] = useCount();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        var res = 1;

        if(state.url.length) {
            res = 15;
        } 
        if(state.url.length && validUrlPattern.test(state.url)) {
            res = 30; 
        }

        var total = 0; 
        if(state.url.length && validUrlPattern.test(state.url)) {
            if(state.nickname.length) {
                total += 20; 
            }
            if(state.counts.ios) { 
                total += 10;
            }
            if(state.counts.android) { 
                total += 10;
            }
            if(state.counts.utm) { 
                total += 10;
            }
            if(state.counts.meta) { 
                total += 10;
            }
        }

        res += total; 

        setProgress(res); 
        return res;

    }, [state.url, state.counts, state.nickname, state.socials, state.mostRecentResult]); 

    return (
        <Fragment>
            <Paper elevation={10}>
                <BorderLinearProgress 
                    variant="determinate" 
                    value={progress} 
                />
            </Paper>
        </Fragment>
    );
}

export default ProgressBar; 