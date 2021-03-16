
import React, { 
    useReducer, 
    useContext, 
    createContext 
} from 'react';

const initialState =  {
    url: '',   
    utm: {
        source: '', 
        medium: '', 
        campaign: '', 
        term: '', 
    },
    mode: "SHORT",
    socials: {
        facebook: false, 
        twitter: false, 
        whatsapp: false, 
        linkedin: false, 
        email: false, 
        google: false, 
    }, 
    responseData: {
        payload: '', 
        timestamp: '',  
    },
    snackbar: {
        open: false, 
        messageInfo: undefined, 
        snackpack: [], 
    },
}; 

const reducer = (state, action) => {
    switch(action.type) {
        case "UPDATE_URL":  
            return {
                ...state,
                 url: action.payload.target.value
            };
        case "UPDATE_UTM": 
            return {
                ...state, 
                utm: { 
                    ...state.utm, 
                    [action.payload.name]: action.payload.value
                }
            };
        case "UPDATE_MODE": 
            return {
                ...state, 
                mode: action.payload.value
            };
        case "UPDATE_SOCIAL": 
            return {
                ...state,
                socials: {
                    ...state.socials, 
                    [action.payload.name]: action.payload.value,
                } 
            };
        case "DB_RESPONSE": 
            return {
                ...state, 
                responseData: {
                    ...state.responseData, 
                    payload: action.payload,  
                }
            };
        case "SNACKBAR_CLOSE":
            return {
                ...state, 
                snackbar: {
                    ...state.snackbar, 
                    open: false
                }
            };
        case "SNACKBAR_TRIGGER": 
            return {
                ...state, 
                snackbar: {
                    ...state.snackbar, 
                    snackpack: [
                        ...state.snackbar.snackpack, 
                        { 
                            message: action.payload.message, 
                            key: action.payload.key,  
                        },
                    ]
                }
            };
        case "SNACKBAR_IDLE": 
            return { 
                ...state, 
                snackbar: {
                    ...state.snackbar, 
                    snackpack: action.payload.snackpack,
                    open: true, 
                    messageInfo: action.payload.messageInfo
                }
            };
        case "SNACKBAR_EXIT": 
            return {
                ...state, 
                snackbar: {
                    ...state.snackbar, 
                    messageInfo: undefined
                }
            }
        default: 
            throw new Error("Unexpected Input"); 
    }
}

export const SharedContext = createContext(); 

export const CountProvider = ({ children }) => {
    const contextValue = useReducer(reducer, initialState); 
    
    return (
        <SharedContext.Provider value={contextValue}>
            { children }
        </SharedContext.Provider>
    );
}

export const useCount = () => {
    const contextValue = useContext(SharedContext); 
    return contextValue;
}