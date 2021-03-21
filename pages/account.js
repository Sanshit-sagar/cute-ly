import React from 'react';
import Router from 'next/router'; 
import useSWR from 'swr';

import PageContainer from '../components/PageContainer';

import { useAuth } from '../lib/auth';
// import { getAllSites } from '../lib/db'; 

const fetcher = async (url, token) => {
    const res = await fetch(url, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, 
        token,
      }),
      credentials: 'same-origin',
    });
  
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.');
      error.info = await res.json();
      error.status = res.status;
      throw error;
    }
  
    return res.json();
};

function Profile() {
    const { user, loading } = useAuth(); 

    if(!user && !loading) {
        Router.push('/'); 
    }

    const { data, error, isValidating } = useSWR(
        user ? ['/api/auth/sites', user.token] : null,
        fetcher
    );

    // const [data, setData] = useState(null); 
    // useEffect(() => {
    //     console.log('Calling getAllSites from useEffect'); 

    //     user && 
    //         getAllSites().then((data) => {
    //             setData(data);
    //         });

    //     console.log('Updated data'); 
    //     console.log('User Token: ' + user?.token); 
    // }, [user]); 

    return (
        <>
            {user ? (
                <PageContainer>  
                    <h1> Sites Data </h1> 

                    { data && data?.sites.length ? (
                        <> 
                            <DetailsList rawData={data?.sites} /> 
                        </>
                    ) : <p> Validating... </p> }

                </PageContainer>
            ) : <h1> Loading... </h1> }
        </>
    ); 
}

const DetailsList = ({ rawData }) => {
    
    return (
        <>
            <p> Length is: {rawData.length} </p> 
        </>
    );
}

export default function Account() {
    
    return (
        <>
            <Profile /> 
        </> 
    );
}