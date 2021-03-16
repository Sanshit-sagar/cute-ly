import React from 'react';
import { useAuth } from '../lib/auth'; 
import Router from 'next/router'
import PageContainer from '../components/PageContainer';

export default function Account() {
    const { user, loading } = useAuth(); 

    if(!user && !loading) {
        Router.push('/'); 
    }

    return (
        <PageContainer> 
            <React.Fragment> 
                <Typography variant="h1"> 
                    Hi, {user.email} 
                </Typography>    
            
            </React.Fragment>
        </PageContainer>
    )
}