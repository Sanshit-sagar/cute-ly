import React from 'react'; 
import { useAuth } from '../lib/auth'; 
import Button from '@material-ui/core/Button'; 
import Router from 'next/router'

export default function Signout() {
    const auth = useAuth(); 

    const handleSignOut = () => {
        auth.signout().then(() => {
            Router.push('/'); 
        })
    }

    return (
        <Button onClick={handleSignOut}> 
            SIGN OUT 
        </Button>
    )
}