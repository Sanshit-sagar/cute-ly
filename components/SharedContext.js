import React, { 
    useReducer, 
    useContext, 
    createContext 
} from 'react';

const initialState =  {
    linksMap: {},
    dark: false, 
    showResults: false, 
    copyToClipboard: false,
    url: '',   
    nickname: '', 
    generatedUrls: [],
    starred: false,
    tags: [],
    generatedSocialUrls: {
        facebook: '',
        linkedin: '',
        whatsapp: '',
        twitter: '',
    },
    openGraphData: {},
    counts: {
        utm: 0, 
        ios: 0,
        android: 0,
        meta: 0,
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
        ipadFallbackLink: '',
        appStoreId: '',
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
        messageInfo: {}, 
        snackpack: [], 
    },
    mostRecentResult: '',
    messages: {
        twitter: '',
    },
    lastUpdate: ''
}; 

const reducer = (state, action) => {
    switch(action.type) {
        case "CLEAR": 
            return {
                ...state,
                copyToClipboard: false,
                showResults: false, 
                url: '',   
                nickname: '', 
                generatedUrls: [],
                starred: false,
                tags: [],
                openGraphData: {},
                generatedSocialUrls: {
                    facebook: '',
                    linkedin: '',
                    whatsapp: '',
                    twitter: '',
                },
                counts: {
                    utm: 0, 
                    ios: 0,
                    android: 0,
                    meta: 0,
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
                    ipadFallbackLink: '',
                    appStoreId: '',
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
                messages: {
                    twitter: '',
                },
            };
        case "UPDATE_URL":  
            return {
                ...state,
                 url: action.payload.target.value
            };
        case "UPDATE_NICKNAME":  
            return {
                ...state,
                 nickname: action.payload.value
            };
        case "UPDATE_UTM": 
            return {
                ...state, 
                utm: {
                    source: action.payload.source,
                    medium: action.payload.medium,
                    term: action.payload.term,
                    campaign: action.payload.campaign
                },
                counts: {
                    ...state.counts,
                    utm: action.payload.count
                }
            };
        case "UPDATE_IOS": 
            return {
                ...state, 
                ios: {
                    fallbackLink: action.payload.fallbackLink,
                    ipadFallbackLink: action.payload.ipadFallbackLink,
                    bundleId: action.payload.bundleId,
                    ipadBundleId: action.payload.ipadBundleId,
                    customScheme: action.payload.customScheme,
                    appStoreId: action.payload.appStoreId,
                },
                counts: {
                    ...state.counts,
                    ios: action.payload.count
                }
            };
        case "UPDATE_ANDROID": 
            return {
                ...state, 
                android: { 
                    fallbackLink: action.payload.fallbackLink, 
                    minPackageVersionCode: action.payload.minPackageVersionCode,
                    packageName: action.payload.packageName,
                },
                counts: {
                    ...state.counts,
                    android: action.payload.count
                }
            };
        case "UPDATE_META": 
            return {
                ...state, 
                meta: {
                    imageLink: action.payload.imageLink,
                    description: action.payload.description,
                    title: action.payload.title,
                },
                counts: {
                    ...state.counts,
                    meta: action.payload.count
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
        case "UPDATE_PURL":
            return {
                ...state, 
                mostRecentPurl: action.payload.value,
            };
        case "UPDATE_RESULTS":
            return {
                ...state, 
                mostRecentResult: action.payload.value,
                showResults: true,
                copyToClipboard: false,
                snackbar: {
                    ...state.snackbar, 
                    snackpack: [
                        ...state.snackbar.snackpack, 
                        { 
                            message: "New URL Generated: ", 
                            key: new Date().getTime().toString()
                        },
                    ],
                },
            };
        case "PERSISTED":
            return {
                ...state, 
                lastUpdate: action.payload.value
            };
        case "COPY_TO_CLIPBOARD": 
            return {
                ...state, 
                copyToClipboard: !state.copyToClipboard,
                snackbar: {
                    ...state.snackbar,
                    snackpack: [
                        ...state.snackbar.snackpack, 
                        { 
                            message: state.copyToClipboard ? 'UnCopying from Clipboard' : 'Copying to Clipboard', 
                            key: new Date().getTime().toString(),
                        },
                    ]
                },
            };
        case "UPDATE_SOCIAL": 
            return {
                ...state,
                socials: {
                    ...state.socials, 
                    [action.payload.name]: action.payload.value
                },
                url: action.payload.prefix + state.url
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
            };
        case "TOGGLE_STAR": 
            return {
                ...state, 
                starred: !state.starred,
                snackbar: {
                    ...state.snackbar,
                    snackpack: [
                        ...state.snackbar.snackpack, 
                        { 
                            message: !state.starred ? 'Marked this link as one of your favorites' : 'Removed this link from your favourites',
                            key: new Date().getTime().toString()
                        },
                    ]
                }
            };
        case "GENERATE":
            return {
                ...state,
                generatedUrls: [
                    ...state.generatedUrls,
                    action.payload.value
                ],
                showResults: true,
                snackbar: {
                    ...state.snackbar,
                    snackpack: [
                        ...state.snackbar.snackpack, 
                        { 
                            message: 'Generated a new URL with destination: ' + action.payload.value, 
                            key: new Date().getTime().toString()
                        },
                    ]
                }
            };
        case "GENERATE_SOCIAL_URL":
            return {
                ...state,
                generatedSocialUrls: {
                    ...state.generatedSocialUrls,
                    [action.payload.name]: action.payload.value,
                },
                socials: {
                    ...state.socials,
                    [action.payload.name]: true,
                },
                url: action.payload.value,
            };
        case "ADD_TAGS": 
            return {
                ...state,
                tags: [
                    ...state.tags,
                    action.payload.value
                ]
            }; 
        case "UPDATE_USER_LINKS_MAP":
            return {
                ...state,
                linksMap: action.payload.value,
            }; 
        case "OPEN_GRAPH_RESULTS":
            return {
                ...state, 
                openGraphData: {
                    ...action.payload.value
                },
                showResults: true,
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