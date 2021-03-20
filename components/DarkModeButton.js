import React, { useState } from 'react'; 
import Button from '@material-ui/core/Button'; 
import { useCount } from './SharedContext'; 
import {LightMode, DarkMode} from '../icons/icons'; 


export default function DarkModeSwitch() {
    const [on, setOn] = useState(false); 
    const [state, dispatch] = useCount(); 

    const getTheme = () => {
        if(on) {
            return "Light Mode";
        }
        return "Dark Mode"; 
    }

    const toggleTheme = () => {
        setOn(!on);
        dispatch({
            type: "DARKMODE"
        });
        dispatch({
            type: "SNACKBAR_TRIGGER",
            payload: {
                message: "Theme Changed to " + getTheme() + "!",
                key: new Date().getTime().toString()
            }
        });
    }
    
    return (
        <Button color="primary" onClick={toggleTheme}> 
          { on ? <DarkMode /> : <LightMode /> }
        </Button>
    );
}