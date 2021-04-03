
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Tooltip from '@material-ui/core/Tooltip';
import Link from '@material-ui/core/Link';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const useStyles = makeStyles((theme) => ({
    destinationUrlContainer: {
        width: '170px', 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
    },
}));

const UrlPreview = ({ params }) => {
    const classes = useStyles(); 

    const first = params.value.substring(7).split('/')[1];
    const second = params.value.substring(7).split('/')[2];

    return (
        <div className={classes.destinationUrlContainer}>
            <div>
                <Tooltip title={params.value}>
                    <Link href={params.value}>
                        { first }  
                    </Link>
                </Tooltip>
            </div>
            <div>
                <OpenInNewIcon style={{ color: 'green' }} />
            </div>
        </div>
    );
}

export default UrlPreview; 