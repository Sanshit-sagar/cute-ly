import React, { useContext, useReducer } from 'react'; 

export const globalContext = React.createContext();

export function GlobalContextProvider({ children }) {
    const gc = useSnackbar(); 
    return (
        <globalContext.Provider value={gc}>
            { children }
        </globalContext.Provider>
    ) 
}

export const useGlobalContext = () => {
    return useContext(globalContext); 
}

const initialState = {
    url: '', 
}; 

function reducer(state, action) {
    switch(action.type) {
        case 'EDIT_URL': 
            return {...state, userInputUrl: action.payload}; 
        default: 
            throw new Error(); 
    }
}

function useSnackbar() {
    const [state, dispatch] = useReducer(reducer, initialState); 

    const setUrl = (updatedUrl) => {
        dispatch({'type': 'EDIT_URL', 'payload': updatedUrl });
    }
 
    return {
        state, 
        setUrl,
    }; 
}