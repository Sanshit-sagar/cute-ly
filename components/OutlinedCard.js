import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

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
  }
});

export default function OutlinedCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
     
      <CardContent>
        <Avatar>
          { props.data1.charAt(0) }
        </Avatar>

        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.title}
        </Typography>
       
        <Typography variant="h5" component="h2">
          {props.subtitle}
        </Typography>
        
        <Typography className={classes.pos} color="textSecondary">
          {props.data1}
        </Typography>
        
        <Typography variant="body2" component="p">
            {props.data2A}
            <br />
            {props.data2B}
        </Typography>
      </CardContent>
     
      {/* <CardActions>
        <Button size="small"> Actions </Button>
      </CardActions> */}
    </Card>
  );
}