import React, { useState, useEffect, useRef } from 'react'; 

import { 
    Avatar, TextField, Typography,
    List, ListItem, ListItemText, 
    Collapse 
} from '@material-ui/core'; 

import { makeStyles } from '@material-ui/styles'; 

import { useAuth } from '../lib/auth'; 
import { useCount } from './SharedContext'; 

const useStyles = makeStyles((theme) => ({ 
    root: {
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'stretch'
    },
    profilePreviewButton: {
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '10px', 
        width: '100%'
    },
    profileList: {
        backgroundColor: '#fff', 
        border: 'thin solid black', 
        borderRadius: '5px'
    },
    profileListText: {
        fontSize: '11px',
    },
})); 

function useHover() {
    const [value, setValue] = useState(false);
  
    const ref = useRef(null);
  
    const handleMouseOver = () => setValue(true);
    const handleMouseOut = () => setValue(false);
  
    useEffect(
        () => {
            const node = ref.current;
            if (node) {
                node.addEventListener('mouseover', handleMouseOver);
                node.addEventListener('mouseout', handleMouseOut);
    
                return () => {
                        node.removeEventListener('mouseover', handleMouseOver);
                        node.removeEventListener('mouseout', handleMouseOut);
                    };
                }
            },
        [ref.current] 
    );
    return [ref, value];
}

const CustomListItemText = ({ textToDisplay }) => {
    const classes = useStyles(); 

    return (
        <Typography 
            variant="overline"
            className={classes.profileListText}
        >
            { textToDisplay }
        </Typography> 
    );
}

const UserAvatar = () => {
    const classes = useStyles(); 
    const { user, loading, error } = useAuth(); 
    const [hoverRef, isHovered] = useHover();

    const uidText =  user.uid; 
    const emailText = user.email; 

    return (
        <div ref={hoverRef} className={classes.root}>
            <div className={classes.profilePreviewButton}> 
                <TextField 
                    disabled 
                    variant="standard" 
                    color="primary" 
                    value={user.email}
                    style={{ width: '70%', marginRight: '10%', marginLeft: '10%' }}
                /> 
                <Avatar variant="rounded"> 
                    {user && (user.email.charAt(0))}
                </Avatar>
            </div> 
            <div>   
                <Collapse in={isHovered} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding className={classes.profileList}>
                        <ListItem button>
                            <ListItemText 
                                primary={<CustomListItemText textToDisplay={emailText} />} 
                                secondary={<CustomListItemText textToDisplay={uidText} />} 
                            />
                        </ListItem>
                    </List>
                </Collapse>
            </div>
        </div>
    );
}

export default function ProfileButton() {
    const classes = useStyles(); 

    return (
        <UserAvatar />
    ); 
}