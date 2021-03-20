import React from 'react'; 
import Router from 'next/router';
import firebase from '../lib/firebase';
import { DataGrid } from '@material-ui/data-grid';


import { useAuth } from '../lib/auth'; 

import SharedSnackbar from '../components/Snackbar';
import PageContainer from '../components/PageContainer';

class AnalyticsBase extends React.Component {
    constructor(props) {
        super(props); 

        this.state = {
            uid: '', 
            loading: false, 
            payload: null, 
            error: null, 
            userData: null, 
            links: [], 
            selection: [],
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        var linksRef = firebase.database()
            .ref('/links') 
            .on('value', querySnapShot => {
                let allLinks = [];
                let index = 0; 
                querySnapShot.forEach(snap => {
                    allLinks.push({
                        id: index, 
                        ...snap.val(),
                    }); 
                    index = index + 1; 
                });
                this.setState({ 
                    links: allLinks,
                    loading: false
                }); 
            }); 
       
    }

    handleTransformation(transformation_type) {
        console.log("Handling transition of type: " + transformation_type)
    }

    handleSelectionChange(props) {
        console.log("hallo hallow"); 
        setSelection(newSelection.rows);
    }

    render() {
        return (
           <PageContainer height="100%" width="100%"> 
                <div style={{ height: '85%', width: '75%', marginLeft: '12.5%'}}> 
                    <DataGrid
                        columns={[
                            { field: 'id', width: 75},
                            { field: 'suffix', width: 120 },
                            { field: 'originalUrl', width: 225 },
                            { field: 'medium', width: 120 },
                            { field: 'term', width: 120 },
                            { field: 'source', width: 120 },
                            { field: 'campaign', width: 120 },
                            { field: 'timestamp', width: 200 },
                        ]}
                        checkboxSelection
                        pagination
                        rows={this.state.links}
                        pageSize={20} 
                        rowsPerPageOptions={[10, 20, 40]} 
                        loading={this.state.loading}
                        disableMultipleSelection={true}
                        onFilterModelChange={() => this.handleTransformation("filter")}
                        onSelectionChange={(newSelection) => {
                            handleSelectionChange(newSelection.rows);
                        }}
                    />
                </div> 
           </PageContainer> 
        )
    }
}

const Analytics = () => {
    const { user, loading } = useAuth(); 

    if(!user && !loading) {
        Router.push('/'); 
    }

    return (
        <React.Fragment>
            <AnalyticsBase /> 
            <SharedSnackbar /> 
        </React.Fragment>
    );
}

export default Analytics; 