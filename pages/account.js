import React from 'react';
import PageContainer from '../components/PageContainer';
import axios from 'axios';
import useSWR from 'swr'; 

// import { useAuth } from '../lib/auth'; 
// import Router from 'next/router'
// import Typography from '../components/Typography';

const fetcher = url => axios.get(url).then(res => res.data)

function Profile() {
    const { data, error } = useSWR("https://api.github.com/repos/vercel/swr", fetcher);

    if (error) {
        return <div>failed to load</div>
    }
    if (!data) {
        return <div>loading...</div>
    }
      
    return (
        <div>hello {data.full_name}!</div>
    ); 
}

export default function Account() {

   
    
    return (
        <PageContainer> 
            <Profile /> 
        </PageContainer>
    );
}