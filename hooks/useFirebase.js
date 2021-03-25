import React, { useState, useEffect, useReducer } from 'react';
import firebase from '../lib/firebase'; 

export default function useFirebaseRealtime() {
    const realtimeDatabase = firebase.db(); 

    const [links, setLinks] = useState([]); 
    const [linksMap, setLinksMap] = useState({});
    const [status, setStatus] = useState(false); 
    const [error, setError] = useState(null); 
    
    useEffect(() => {
        setLoading(true); 

        const ref = realtimeDatabase.ref('links'); 
        const listener = ref.on('value', snapshot => {
            const fetchedLinks = []; 
            const fetchedLinksMap = {}; 

            snapshot.forEach((childSnapshot) => {
                const key = childSnapshot.key; 
                const data = childSnapshot.val(); 

                fetchedLinks.push({ 
                    id: key, 
                    ...data 
                }); 
                fetchedLinksMap[key] = data; 
            });

            setLinks(fetchedLinks);
            setLinksMap(fetchedLinksMap); 
            setLoading(false); 
        });

        // handle (!snapshot.exists) and (snapshot.empty)
        
        return () => ref.off('value', listener); 
    }, [realtimeDatabase]);
    
    return { 
        links, 
        linksMap, 
        status
    };
}