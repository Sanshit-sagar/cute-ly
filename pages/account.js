import React, { Fragment, useState } from 'react';

import { useCount } from '../components/CounterContext'; 
import { useAuth } from '../lib/auth'; 

import Router from 'next/router'

import Button from '@material-ui/core/Button'; 
import TextField from '@material-ui/core/TextField';
import PageContainer from '../components/PageContainer';

import { 
    Dialog, 
    DialogActions, 
    DialogTitle, 
    DialogContent, 
    DialogContentText 
} from '@material-ui/core';


const CustomDialogComponent = ({ fnVal, fnSetter, isOpen, openHandler, handleClose }) => {
    
    return (
        <Fragment> 
            <Dialog open={isOpen} onClose={(e) => openHandler(e)}>
                <DialogTitle> useContext Trial </DialogTitle>
                <DialogContent> 
                    <DialogContentText> Does this work? </DialogContentText>
                    <TextField value={fnVal} onChange={(e) => fnSetter(e.target.value)} />
                    <TextField value={fnVal} onChange={(e) => fnSetter(e.target.value)} /> 
                </DialogContent>

                <DialogActions> 
                    <Button onClick={(e) => handleClose(e)}> 
                        DONE 
                    </Button>
                </DialogActions>
            </Dialog> 
        </Fragment>
    );
}

export default function Account() {
    const { user, loading } = useAuth(); 
    const [open, setOpen] = useState(false); 
    const [fn, setFn] = useState(''); 

    if(!user && !loading) {
        Router.push('/'); 
    }

    const setClosed = () => {
        setOpen(false); 
    }

    return (
        <PageContainer> 
            <React.Fragment> 
                
              


                {/* <Button onClick={setOpen} > CLICK ME! </Button>
                <CustomDialogComponent  fnVal={fn} fnSetter={setFn} isOpen={open} openHandler={setOpen} handleClose={setClosed} />  */}

            </React.Fragment>
        </PageContainer>
    )
}