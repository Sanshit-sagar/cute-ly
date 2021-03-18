import React, { useState, useEffect } from 'react';
import Router from 'next/router'; 

import PageContainer from '../components/PageContainer';
import { useAuth } from '../lib/auth';
import { render } from 'react-dom';
import {getAllSites} from '../lib/db';  


function Profile() {
    const { user, error, loading, signout } = useAuth(); 
    const [entries, setEntries] = useState([]);

    if(!user && !loading) {
        Router.push('/'); 
    }
    
    useEffect(async () => {
        const res = getAllSites(); 
        console.log(res); 
        setEntries(res.data); 
    }, []); 

    return (
        <>
        {user ? (
            <main>  
                <h1> hi {user.email} </h1> 
              {  entries && 
                <div>
                    <h1>Entries</h1>
                    {entries.map(entry => (
                        <div key={entry.uid}>
                    
                            <a>{entry.suffix}</a>
                            <br/>
                        </div>
                    ))}
                </div>
                }
            </main>
        ) : <h1> Loading... </h1> }
        </>
    ); 
}

export default function Account() {
    
    return (
        <PageContainer> 
            <Profile /> 
        </PageContainer>
    );
}