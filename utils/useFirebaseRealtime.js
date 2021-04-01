import React, { 
    useState, 
    useEffect, 
    useContext, 
    useReducer,
    createContext 
} from 'react';

import firebase from '../lib/firebase'; 

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
            slug: data.suffix,
            modifiedUrl: data.updatedUrl,
            originalUrl: data.url,
            analytics: {
                ios: data.ios,
                android: data.android,
                social: data.meta,
                utm: data.utm,
                tags: data.tags,
            },
            timestamp: data.timestamp,
        };

        return sanitizeData; 
    }
    return { key, ...data }; 
}

function useFirebaseRealtime() {
    const [user, setUser] = useState(null); 

    const [links, setLinks] = useState(null); 
    const [loading, setLoading] = useState(null); 

    const [linksMap, setLinksMap] = useState({}); // {  [slug]: linkData }

    useEffect(() => {
        if(firebase.auth().currentUser) {
            setLoading(true);

            const currentUserId = firebase.auth().currentUser.uid; 
            
            const ref = firebase.database().ref('links'); 
            const listener = ref.on('value', snapshot => {
                const sanitizedLinks = []; 
                const linksMap = {}; 
            
                snapshot.forEach((childSnapshot) => {
                    const key = childSnapshot.key; 
                    const data = childSnapshot.val();

                    if(data.uid === currentUserId) {
                        //handle (!linksMap.hasOwnProperty(data.slug) || linksMap[data.slug].timestamp != data.timestamp)

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
            
            setLoading(false); 
            return () => ref.off('value', listener); 
        }
    }, [firebase.database()]); 
    
    return { 
        user,
        links, 
        loading,
        linkMappingsBySlug,
    }; 
}