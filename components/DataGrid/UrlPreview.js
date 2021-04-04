
import React, { Fragment } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const useStyles = makeStyles((theme) => ({
    destinationUrlContainer: {
        width: '150px', 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
    },
}));

const UrlPreview = ({ params }) => {
    const classes = useStyles(); 

    const first = params.value.substring(7).split('/')[1].substring(0,5);
    
    return (
        <Fragment>
            <Button variant="outlined" color="primary" style={{ width: '125px', margin: '12.5px' }}>
                <div className={classes.destinationUrlContainer}>
                    <div>
                        <Tooltip title={params.value}>
                            <Link href={params.value}>
                                { first }  
                            </Link>
                        </Tooltip>
                    </div>
                    <div>
                        <OpenInNewIcon />
                    </div>
                </div>
            </Button>
        </Fragment>
    );
}

export default UrlPreview; 