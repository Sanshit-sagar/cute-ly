import React, { Fragment, useState, useEffect } from 'react'; 
import Router from 'next/router';
import firebase from '../lib/firebase'; 

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core'; 

import { useAuth } from '../lib/auth';
import CustomDataGrid from '../components/DataGrid/CustomDataGrid';
import SharedSnackbar from '../components/Snackbar';
import PageContainer from '../components/PageContainer';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '5px',
        marginTop: theme.spacing(2),
        backgroundColor: '#1eb980',
    },
}));

const AnalyticsBase = ({ userData }) => {
    const classes = useStyles(); 

    const [userId, setUserId] = useState(''); 
    const [loading, setLoading] = useState(false);

    const [links, setLinks] = useState([]);
    const [linksMap, setLinksMap] = useState({}); 
   
    useEffect(() => {
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
                    fetchedLinksMap[key] = data; 
                }
            });


            const sortedFetchedLinks = fetchedLinks.reverse();

            setLinks(sortedFetchedLinks);
            setLinksMap(fetchedLinksMap); 
            setLoading(false); 
        });
        return () => ref.off('value', listener); 
    }, [firebase.database()]); 

    return (
       <div className="root">
            {
                (!loading && links.length > 0)  ?    
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
                : null 
            }    
       </div>
    );
}

const Analytics = () => {
    const { user, loading } = useAuth(); 

    if(!user && !loading) {
        Router.push('/'); 
    }

    return (
        <Fragment>
            <PageContainer>
                <div>
                    {loading && <h1>...Loading</h1> }
                    {user && !loading ? 
                        <AnalyticsBase 
                            userData={user} 
                        /> 
                    : 
                        null 
                    }
                </div>
                <SharedSnackbar /> 
            </PageContainer>    
        </Fragment>
    );
}

export default Analytics; 