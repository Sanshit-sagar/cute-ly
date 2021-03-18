import React, { 
    useReducer, 
    useContext, 
    createContext 
} from 'react';

const initialState =  {
    dark: false, 
    showResults: false, 
    url: '',   
    tagCount: {
        utm: 0, 
        ios: 0,
        android: 0,
        meta: 0
    },
    utm: {
        source: '', 
        medium: '', 
        campaign: '', 
        term: '', 
    },
    ios: {
        bundleId: '', 
        fallbackLink: '', 
        ipadBundleId: '', 
        customScheme: '', 
    },
    android: {
        packageName: '', 
        fallbackLink: '', 
        minPackageVersionCode: '', 
    },
    meta: {
        socialTitle: '', 
        socialDescription: '', 
        socialImageLink: '',
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
    mostRecentResult: null
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
        case "UPDATE_IOS": 
            return {
                ...state, 
                ios: { 
                    ...state.ios, 
                    [action.payload.name]: action.payload.value
                }
            };
        case "UPDATE_ANDROID": 
            return {
                ...state, 
                android: { 
                    ...state.android, 
                    [action.payload.name]: action.payload.value
                }
            };
        case "UPDATE_META": 
            return {
                ...state, 
                meta: {
                    ...state.meta, 
                    [action.payload.name]: action.payload.value
                }
            };
        case "UPDATE_MODE": 
            return {
                ...state, 
                mode: action.payload.value
            };
        case "SHOW_RESULTS": 
            return {
                ...state, 
                showResults: action.payload.value
            };
        case "UPDATE_RESULTS":
            return {
                ...state, 
                mostRecentResult: action.payload.value,
                showResults: true,
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
        case "UPDATE_SOCIAL": 
            return {
                ...state,
                url: (action.payload.prefix + state.url),
                socials: {
                    ...state.socials, 
                    [action.payload.name]: action.payload.value
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
            };
        case "DARKMODE": 
            return {
                ...state, 
                dark: !state.dark,
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
        default: 
            return state; 
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