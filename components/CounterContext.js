
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
    }
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
        default: 
            throw new Error("Unexpected Input"); 
    }
}

export const CountContext = createContext(); 

export const CountProvider = ({ children }) => {
    const contextValue = useReducer(reducer, initialState); 
    
    return (
        <CountContext.Provider value={contextValue}>
            { children }
        </CountContext.Provider>
    );
}

export const useCount = () => {
    const contextValue = useContext(CountContext); 
    return contextValue;
}