import React, { Fragment } from 'react';
import Router from 'next/router'; 

import { Grid, Paper, Typography, Link } from '@material-ui/core'; 
import { makeStyles } from '@material-ui/core/styles';

import { useAuth } from '../lib/auth';
import { RealtimeProvider, useRealtime } from '../utils/useFirebaseRealtime';

import PageContainer from '../components/PageContainer';

const useStyles = makeStyles((theme) => ({
    linksList: {
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-around', 
        alignItems: 'stretch',
    },
    dataField: {
        margin: '5px',
    },
    rowContainer: {
        backgroundColor: 'white', 
        margin: '10px', 
        padding: '10px', 
        width: '400px', 
        height: '250px'
    }
}));

const truncateDataField = (dataField) => {
    if(dataField.length) {
        if(dataField.length > 40) {
            return dataField.substring(0, 20) + "..." + dataField.substring(dataField.length - 10);
        } else {
            return dataField; 
        }
    }
    return "N/A";
}

const StyledLink = ({ href }) => {
    const classes = useStyles(); 

    return (
        <Link href={href}>
            <Typography 
                variant="body1"
                className={classes.dataField}
            > 
                { truncateDataField(href) }  
            </Typography>
        </Link>
    )
}

const LinksListRow = ({ rowData }) => {
    const classes = useStyles(); 

    return (
        <Paper elevation={5}>
            <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={2}>
                <Grid item>
                    <Typography variant="h6" className={classes.dataField}> 
                        { rowData.slug }  
                    </Typography>
                </Grid>

                <Grid item>
                    <Typography variant="body1"className={classes.dataField}>
                        { rowData.id }  
                    </Typography>
                </Grid>   
            </Grid>
       
            <Grid container direction="column" justify="flex-end" alignItems="flex-end" spacing={2}>
                <Grid item>
                    <StyledLink href={".../" + rowData.modifiedUrl.substring(31)} />
                </Grid>
                <Grid item>
                    <StyledLink href={rowData.originalUrl} />
                </Grid>
            </Grid>
       </Paper>
    );
}

const LinksList = ({ links, linksMap }) => {
    const classes = useStyles(); 

    return (
        <Paper height="500px" width="1000px" bgcolor="#efefef" style={{ overflowY: 'scroll', padding: '50px' }}>
            { links.map((item) => {
                return (
                    <div key={item.id} className={classes.linksList}>
                        <LinksListRow rowData={item} />
                    </div> 
                );
            })}
        </Paper>
    );
}

function AccountBase({ userData }) {
    const { user, links, loading, linkMappingsBySlug } = useRealtime(); 

    return (
        <PageContainer>  
            <Fragment>
                <h1> Hi, { userData.email } </h1> 
                { 
                    !loading ?
                    <div> 
                    { 
                        links 
                        ?  <LinksList links={links} linksMap={linkMappingsBySlug} /> 
                        :  <p> No links to display </p> 
                    }
                    </div>
                : <p>  Loading... </p>
                }
            </Fragment>
        </PageContainer>
    ); 
}

export default function Account() {
    const { user, loading } = useAuth(); 

    if(!user && !loading) {
        Router.push('/'); 
    }
    
    return (
        <Fragment>
            {
                user ?
                    <RealtimeProvider>
                        <AccountBase userData={user} /> 
                    </RealtimeProvider>
                :
                    <h1> Loading... </h1> 
            }
        </Fragment> 
    );
}