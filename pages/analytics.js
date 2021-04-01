import React, { useState, useEffect } from 'react'; 
import Router from 'next/router';
import firebase from '../lib/firebase'; 

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core'; 

import { useAuth } from '../lib/auth';
import { useCount } from '../components/SharedContext'; 

import CustomDataGrid from '../components/DataGrid/CustomDataGrid';
import PageContainer from '../components/PageContainer';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
    },
}));

const AnalyticsBase = ({ userData }) => {
    const classes = useStyles(); 

    const [userId, setUserId] = useState(''); 
    const [state, dispatch] = useCount();
    const [loading, setLoading] = useState(false);

    const [links, setLinks] = useState([]);
    const [linksMap, setLinksMap] = useState({}); 
   
    useEffect(() => {
        if(userData) {
            setLoading(true); 

            var userId = firebase.auth().currentUser.uid; 
            setUserId(userId);

            const ref = firebase.database().ref('links'); 
            const listener = ref.on('value', snapshot => {
                const fetchedLinks = []; 
                const fetchedLinksMap = {}; 
            
                snapshot.forEach((childSnapshot) => {
                    const key = childSnapshot.key; 
                    const data = childSnapshot.val();

                    console.log(JSON.stringify(data['analyticsData']));

                    if(data.uid === userId) {
                        fetchedLinks.push({ 
                            id: key,
                            nickname: data.title,
                            mode: data.mode, 
                            starred: data.starred, 
                            slug: data.suffix,
                            originalUrl: data.url,
                            modifiedUrl: data.updatedUrl,
                            timestamp: data.timestamp.substring(0, 25),
                            analyticsData: data['analyticsData'],
                            utmSource: data['utm'].source,
                            utmMedium: data['utm'].medium,
                            utmTerm: data['utm'].term,
                            utmCampaign: data['utm'].campaign,
                            iosFallbackLink: data['ios'].fallbackLink,
                            iosBundleId: data['ios'].bundleId,
                            iosIpadFallbackLink: data['ios'].ipadFallbackLink,
                            iosIpadBundleId: data['ios'].ipadBundleId,
                            iosCustomScheme: data['ios'].customScheme,
                            androidPackageName: data['android'].packageName,
                            androidFallbackLink: data['android'].fallbackLink,
                            androidMinPackageVersionCode: data['android'].minPackageVersionCode,
                            metaDescription: data['meta'].description,
                            metaTitle: data['meta'].title,
                            dataImageLink: data['meta'].imageLink,
                            fallbackLink: data.ios.fallbackLink,
                        }); 
                        fetchedLinksMap[data.suffix] = {
                            id: key,
                            ...data,
                        }; 
                    }
                });

                const sortedFetchedLinks = fetchedLinks.reverse();

                setLinks(sortedFetchedLinks);
                setLinksMap(fetchedLinksMap);
                
                dispatch({
                    type: 'UPDATE_USER_LINKS_MAP',
                    payload: {
                        value: fetchedLinksMap,
                    },
                });

                setLoading(false); 
            });

            return () => ref.off('value', listener); 
        }
    }, [firebase.database()]); 

    return (
       <div className="root">
            <Grid container spacing={1}>
                <Grid item>
                    <Paper elevation={5} className={classes.paper}>
                        <CustomDataGrid 
                            loading={loading || links.length==0}
                            userDetails={userData}
                            allLinks={links}
                            linksMap={linksMap}
                        />  
                    </Paper>
                </Grid>
            </Grid>     
       </div>
    );
}

const Analytics = () => {
    const classes = useStyles();
    const { user, loading } = useAuth(); 

    if(!user && !loading) {
        Router.push('/'); 
    }

    console.log(JSON.stringify(user)); 

    return (
        <PageContainer>
            {user && !loading ? 
                <AnalyticsBase 
                    userData={user} 
                /> 
            : 
                null  
            }
        </PageContainer>    
    );
}

export default Analytics; 