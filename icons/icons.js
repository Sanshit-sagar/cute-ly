import React from 'react'; //

import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import AssessmentIcon from '@material-ui/icons/Assessment';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Image from 'next/image'; 

export const Home = () => {
    return ( <HomeIcon/> ); 
}

export const Dashboard = () => {
    return ( <DashboardIcon /> );
}

export const Loading = () => {
    return ( <HourglassEmptyIcon /> ); 
}

export const Analytics = () => {
    return (<AssessmentIcon />);
}

export const LightMode = () => {
    return (<WbSunnyIcon />); 
}

export const DarkMode = () => {
    return (<Brightness2Icon /> );
}

export function GoogleIcon() {
    return (
        <div>
            <Image 
                src="/OfficialGoogleLogo.svg"
            />
        </div>
    ); 
}

export default Home;  