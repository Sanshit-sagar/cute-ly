import React, { 
    useState, 
    useEffect, 
    useContext, 
    createContext 
} from 'react';

import firebase from '../lib/firebase'; 

import { useCount } from '../components/SharedContext';
import { useAuth } from '../lib/auth';

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
            nickname: data.nickname,
            socials: data.socials,
            starred: data.starred,
            slug: data.slug,
            modifiedUrl: data.modifiedUrl,
            originalUrl: data.originalUrl,
            previewLink: data.previewLink,
            analytics: {
                ios: data.analytics.ios,
                android: data.analytics.android,
                meta: data.analytics.meta,
                utm: data.analytics.utm,
                tags: data.analytics.tags,
            },
            timestamp: data.timestamp,
        };
        return sanitizeData; 
    }
    return data; 
}

function useFirebaseRealtime() {
    const [state, dispatch] = useCount(); 
    const { user, loading, error } = useAuth(); 

    const [didInit, setDidInit] = useState(false);
    
    const [links, setLinks] = useState([]); 
    const [linksMap, setLinksMap] = useState({}); 
    const [linksLoading, setLinksLoading] = useState(false); 
    const [linksError, setLinksError] = useState(null); 

    const [realtimeState, setRealtimeState] = useState('IDLE'); 
    const [realtimeResponse, setRealtimeResponse] = useState();

    const handleNewListItem = (data) => {
        setLinks([
            ...links, 
            {
                id: data.suffix,
                ...sanitizeData(data.key, data.val())
            }
        ]);
    }

    useEffect(() => {
        if(user && !didInit) {
            setLinksLoading(true);
            const uid = firebase.auth().currentUser.uid;
            const ref = firebase.database().ref('/user-links/' + uid);

            const listener = ref.once('value').then((snapshot) => {
                var tempLinks = []; 

                snapshot.forEach((childSnapshot) => {
                    const key = childSnapshot.key; 
                    const data = childSnapshot.val();

                    const newEntry = { 
                        id: data.suffix, 
                        ...sanitizeData(key, data)
                    };
                    tempLinks.push(newEntry);
                    setDidInit(false);
                });

                setLinks([
                    ...tempLinks.reverse(),
                ]);
                setLinksLoading(false); 
            }); 
        }

        if(user && didInit) {
            setLinksLoading(true);
            const uid = firebase.auth().currentUser.uid;
            const userLinksRef = firebase.database().ref('/user-links/' + uid);

            const listener = userLinksRef.on('child_added', (data) => {
                handleNewListItem(data);
                setLinksLoading(false);
            });
            
            return () => userLinksRef.off('child_added', listener); 
        }
    }, [firebase.database()]); 


    const createNewLink = (linkData) => {
        const uid = firebase.auth().currentUser.uid; 
        const updatedLinkData = {
            uid,
            ...linkData,
        };
        writeLinkData(uid, updatedLinkData); 
    }

    const writeLinkData = (uid, updatedLinkData) => {
        setLinksLoading(true); 
        
        var newLinkKey = firebase.database().ref().child('user-links/' + uid).push().key; 
        
        var updates = {};
        updates['/links/' + newLinkKey] = updatedLinkData;
        updates['/user-links/' + uid + '/' + newLinkKey] = updatedLinkData;
        
        var response = firebase.database().ref().update({
            ...updates,
        }, (error) => {
            if(error) {
                console.log(error.message); 
                setLinksError(error);
            } else {  
                dispatch({
                    type: "UPDATE_RESULTS",
                    payload: {
                        value: updatedLinkData.modifiedUrl,
                    }
                });   
            }
        });

        setLinksLoading(false);
        setRealtimeResponse(response);
    }

    return { 
        links,
        linksMap,
        linksLoading,
        linksError,
        createNewLink,
        realtimeState,
        realtimeResponse,
    }; 
}