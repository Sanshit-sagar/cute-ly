import React, { useState, useEffect } from 'react';
import Router from 'next/router'; 

import { useAuth } from '../lib/auth';

import PageContainer from '../components/PageContainer';

function Profile() {
    const { user, loading } = useAuth(); 

    if(!user && !loading) {
        Router.push('/'); 
    }

    quickstartQuery(firestore);

    return (
        <>
            {user && entries.length ? (
                <main>  
                    <h1> hi {user.email} </h1> 
                </main>
            ) : <h1> Loading... </h1> }
        </>
    ); 
}

async function quickstartQuery(db) {

    const snapshot = await db.collection('links');
    snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
    });
}

export default function Account() {
    
    return (
        <PageContainer> 
            <Profile /> 
        </PageContainer>
    );
}