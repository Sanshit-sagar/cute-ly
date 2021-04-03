import React, { useState, useContext, useReducer, createContext } from 'react';
import firebase from '../lib/firebase';

const initialState = {
    tags: [],
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