
import React from 'react';
import { useCount } from '../../components/CounterContext'; 

import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import { makeStyles, withStyles } from '@material-ui/core/styles';

import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsAppIcon from '@material-ui/icons/WhatsApp'; 
import LinkedInIcon from '@material-ui/icons/LinkedIn'; 
import EmailIcon from '@material-ui/icons/Email';
import TuneIcon from '@material-ui/icons/Tune';
import Typography from '@material-ui/core/Typography'; 

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    border: `1px solid ${theme.palette.divider}`,
    flexWrap: 'wrap',
  },
  divider: {
    margin: theme.spacing(1, 0.5),
  },
  shortenUrlButton: {
      maxHeight: '10px',
  },
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

const VerticalDivider = () => {
    return (
        <Divider 
            flexItem 
            orientation="vertical" 
        />   
    );
}

const LinkedinIconComp = () => {
    return (<LinkedInIcon />);
}
const FacebookIconComp = () => {
    return (<FacebookIcon />); 
}
const TwitterIconComp = () => {
    return (<TwitterIcon />);
}
const WhatsAppIconComp = () => {
    return (<WhatsAppIcon />);
}

const medias = [
    {
        name: 'linkedin',
        component: <LinkedinIconComp />,
    },{
        name: 'facebook',
        component: <FacebookIconComp />,
    },{
        name: 'twitter',
        component: <TwitterIconComp />, 
    },{
        name: 'whatsapp',
        component: <WhatsAppIconComp />,
    }
];
    
// const StyledToggleButtonGroup22 = () => {
//     return (
//         <ToggleButtonGroup>
//             { medias.map( (item) => {
//                 <ToggleButton 
//                     key={item.name}
//                     value={item.name}
//                     onClick={
//                         (e) => dispatch({ 
//                             type: 'UPDATE_SOCIAL', 
//                             payload: { 
//                                 name: `${item.name}`,  
//                                 value: true
//                             }
//                         })
//                     }
//                 > 
//                     {medias[`${item.name}`]}
//                 </ToggleButton>
//             })} 
//         </ToggleButtonGroup>
//     ); 
// }

  
const ToggleButtonGroup2 = () => {
    const [state, dispatch] = useCount(); 

    return (
        <StyledToggleButtonGroup>
            <ToggleButton 
                value="facebook"
                onClick={
                    (e) => dispatch({ 
                        type: 'UPDATE_SOCIAL', 
                        payload: { 
                            name: 'facebook', 
                            value: true
                        }
                    })
                }
            >
                { medias[0].component }
            </ToggleButton>
                
            <ToggleButton 
                value="linkedin"
                onClick={
                    (e) => dispatch({ 
                        type: 'UPDATE_SOCIAL', 
                        payload: { 
                            name: 'linkedin', 
                            value: true
                        }
                    })
                }
            >
                { medias[1].component }
            </ToggleButton>
            
            <ToggleButton 
                value="twitter"
                onClick={
                    (e) => dispatch({ 
                        type: 'UPDATE_SOCIAL', 
                        payload: { 
                            name: 'twitter', 
                            value: true
                        }
                    })
                }
            >
               { medias[2].component }
            </ToggleButton>

            <ToggleButton 
                value="whatsapp" 
                onClick={
                    (e) => dispatch({ 
                        type: 'UPDATE_SOCIAL', 
                        payload: { 
                            name: 'whatsapp', 
                            value: true
                        }
                    })
                }
            >
                { medias[3].component }
            </ToggleButton>
        </StyledToggleButtonGroup> 
    );
}

const UtmAnalyticsButton = ({ executeOnOpen }) => {
    return (
        <Button 
            onClick={executeOnOpen}
        > 
            <Typography 
                variant="overline"
                style={{ marginRight: '5px' }}> 
                UTM 
            </Typography>
            
            <TuneIcon /> 
        </Button>     
    );
}

// const IOSAnalyticsButton = ({ todoiOS }) => {
//     return (
//         <Button 
//             onClick={todoiOS}
//         > 
//             <Typography 
//                 variant="overline"
//                 style={{ marginRight: '5px' }}> 
//                 iOS 
//             </Typography>
            
            
//         </Button>     
//     );
// }

// const todoiOS = () => {
//     console.log("open ios button"); 
//     return (
//        <a> "hello" </a>
//     );
// }


const CustomToggleButtonGroup = ({ handleDialogOpen, ModeSelectorComponent, }) => {
  const classes = useStyles();
  const [state, dispatch] = useCount(); 

  return (
    <Paper 
        elevation={0} 
        className={classes.paper}
        style = {{ 
            display: 'flex', 
            flexDirection: 'row',
            justifyContent: 'space-between'
        }}
    >
        <div style = {{ 
                display: 'flex', 
                flexDirection: 'row', 
                justifyContent: 'flex-start'
            }}
        >
            <ModeSelectorComponent />
            <VerticalDivider /> 
           
            <UtmAnalyticsButton executeOnOpen={handleDialogOpen} />

            <VerticalDivider />

            {/* <IOSAnalyticsButton executeOnOpen={todoiOS} /> */}
           
            
        </div>

        <ToggleButtonGroup
            size="small"
            value={state.socials}
            exclusive
        >
            <VerticalDivider /> 
            <ToggleButtonGroup2 />
            <VerticalDivider /> 
        </ToggleButtonGroup>           

    </Paper>
  );
}

export default CustomToggleButtonGroup;