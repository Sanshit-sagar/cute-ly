import React from 'react';
import clsx from 'clsx';
import Router from 'next/router';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import HomeIcon from '@material-ui/icons/Home';
import HttpIcon from '@material-ui/icons/Http';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

import { makeStyles } from '@material-ui/core/styles';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    hide: {
        display: 'none',
    },
    drawer: { 
        backgroundColor: theme.palette.primary.main,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        width: drawerWidth,
    },
    drawerOpen: {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        color: '#fff',
        backgroundColor: theme.palette.primary.main,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const list = [
    {
      name: 'Dashboard',
      description: 'Prettify a link',
      route: '/dashboard',
      icon: <HomeIcon /> 
    },
    {
      name: 'Links',
      description: 'Manage your links',
      route: '/analytics',
      icon: <HttpIcon />
    },
];

const CustomMiniDrawer = ({ open, handleDrawer }) => {
    const classes = useStyles();

    const handleClick = ({route}) => {
        Router.push(route); 
    }

    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}
        >
            <div className={classes.toolbar}>
                <IconButton onClick={handleDrawer}>
                    {open ? <ChevronLeftIcon /> : <ChevronRightIcon />} 
                </IconButton>
            </div>

            <Divider />
                <List>
                    { list.map(({ name, description, route, icon }, i) => (
                        <ListItem key={name} button onClick={() => handleClick({route})}>
                            <ListItemIcon> 
                                { icon } 
                            </ListItemIcon>
                            <ListItemText 
                                primary={name}
                                secondary={description}
                            /> 
                        </ListItem>
                    ))}
                </List>
            <Divider />
        </Drawer>
    );
}

export default CustomMiniDrawer;