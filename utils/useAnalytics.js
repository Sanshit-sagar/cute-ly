import React, { useState, useContext, useReducer, createContext } from 'react';
import firebase from '../lib/firebase';

const initialState = {
    tags: [],
    openDialog: false,
};

const reducer = (state, action) => {
    switch(action.type) {
        case "CREATE_TAG":
            return {
                ...state,
                tags: [
                    ...state.tags,
                    action.payload.value
                ]
            };
        case "OPEN_DIALOG":
            return {
                ...state,
                openDialog: open,
            };
        case "CLOSE_DIALOG":
            return {
                ...state,
                openDialog: false,
            };
        default: 
            return state; 
    }
}

export const AnalyticsContext = createContext(); 

export const AnalyticsProvider = ({ children }) => {
    const contextValue = useReducer(reducer, initialState); 
    
    return (
        <AnalyticsContext.Provider 
            value={contextValue}
        >
            { children }
        </AnalyticsContext.Provider>
    );
}

export const useAnalytics = () => {
    const contextValue = useContext(AnalyticsContext); 
    return contextValue;
}