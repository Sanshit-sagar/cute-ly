import React, { useState } from 'react'; 

import Button from '@material-ui/core/Button'; 

import { useCount } from './SharedContext'; 

import {LightMode, DarkMode} from '../icons/icons'; 


export default function DarkModeSwitch() {
    const [on, setOn] = useState(false); 
    const [state, dispatch] = useCount(); 

    const toggleTheme = () => {
        setOn(!on);
        dispatch({
            type: "DARKMODE",
            payload: {
                message: "Changed Mode",
                key: new Date().getTime()
              }
            }
        );
    };
    
    return (
        <Button onClick={toggleTheme}> 
          { on ? <DarkMode /> : <LightMode /> }
        </Button>
    );
}
