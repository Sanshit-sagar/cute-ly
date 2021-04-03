import React, { 
    useState, 
    useEffect, 
    useContext, 
    createContext 
} from 'react';

import firebase from '../lib/firebase'; 
import { useCount } from '../components/SharedContext';

const realtimeContext = createContext();

export function RealtimeProvider({ children }) {
  const realtime = useFirebaseRealtime();

  return (
    <realtimeContext.Provider value={realtime}>
      {children}
    </realtimeContext.Provider>
  );
}

export const useRealtime = () => {
  return useContext(realtimeContext);
};

function sanitizeData(key, data) {
    if(key && data) {
        var sanitizeData = {
            id: key,
            nickname: data.title,
            socials: data.socials,
            starred: data.starred,
            slug: data.suffix,
            modifiedUrl: data.updatedUrl,
            originalUrl: data.url,
            analytics: {
                ios: data.ios,
                android: data.android,
                meta: data.meta,
                utm: data.utm,
                tags: data.tags,
            },
            timestamp: data.timestamp,
        };

        return sanitizeData; 
    }
    return data; 
}

function useFirebaseRealtime() {
    const [state, dispatch] = useCount(); 

    const [user, setUser] = useState(null); 
    const [links, setLinks] = useState([]); 
    const [linksMap, setLinksMap] = useState({}); 

    const [realtimeLoading, setRealtimeLoading] = useState(false); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        if(firebase.auth().currentUser) {
            setRealtimeLoading(true);

            const currentUserId = firebase.auth().currentUser.uid; 
            
            const ref = firebase.database().ref('links'); 
            const listener = ref.on('value', snapshot => {
                const sanitizedLinks = []; 
                const linksMap = {}; 
            
                snapshot.forEach((childSnapshot) => {
                    const key = childSnapshot.key; 
                    const data = childSnapshot.val();

                    if(data.uid === currentUserId) {
                        linksMap[data.suffix] = sanitizeData(key, data); 

                        sanitizedLinks.push({
                            ...linksMap[data.suffix],
                        });
                    }
                });
                const sortedLinks = sanitizedLinks.reverse();

                setLinks(sortedLinks);
                setLinksMap(linksMap); 
            });

            setRealtimeLoading(false); 
            return () => ref.off('value', listener); 
        }
    }, [firebase.database()]); 
    
    return { 
        user,
        links,
        linksMap,
        realtimeLoading,
        error
    }; 
}