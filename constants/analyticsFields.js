export const utmFields = [
    {
        name: 'campaign', 
        label: 'Campaign', 
        placeholder: "e.g. ACME Campaign, ...", 
        title: 'UTM Parameter - Campaign', 
        description: 'todo'
    },
    { 
        name: 'source', 
        label: 'Source', 
        placeholder: "e.g. Facebook, Twitter etc", 
        title: 'UTM Parameter - Source', 
        description: 'todo',
    },
    { 
        name: 'term', 
        label: 'Term', 
        placeholder: "e.g TODO", 
        title: 'UTM Parameter - Term', 
        description: 'todo',
    },
    { 
        name: 'medium',
        label: 'Medium', 
        placeholder: "e.g. Newspaper, Social Media, etc.",
        title: 'UTM Parameter - Source',
        description: 'todo', 
    }
];


export const metaTagsFields = [ 
    {
        key: 1,
        name: 'socialTitle',
        label: 'Social Title', 
        placeholder: 'e.g. todo',
        title: 'Social Title', 
        description: 'The title to use when the Dynamic Link is shared in a social post'
    },
    {
        key: 2,
        name: 'socialDescription',
        label: 'Social Description', 
        placeholder: 'e.g. todo',
        title: 'Social Description', 
        description: 'The description to use when the Dynamic Link is shared in a social post.'
    },
    {
        key: 3,
        name: 'socialImageLink',
        label: 'Social Image Link', 
        placeholder: 'e.g. facebook.com...',
        title: 'Social Title', 
        description: 'The URL to an image related to this link.'
    }
]; 


export const androidFields = [
    {
        key: 1,
        name: 'packageName', 
        label: 'Android Package Name', 
        placeholder: "e.g. todo", 
        title: 'Android Info - Package Name', 
        description: 'todo'
    },
    {
        key: 2,
        name: 'fallbackLink', 
        label: 'Android Fallback Link', 
        placeholder: "e.g. todo", 
        title: 'Android Info - Fallback Link', 
        description: 'todo'
    },
    {
        key: 3,
        name: 'minPackageVersionCode', 
        label: 'Min Package Code', 
        placeholder: "e.g. todo", 
        title: 'Android Info - Android Min. Package Version Code', 
        description: 'Android Min. Package Version Code'
    },
];

export const iosFields = [
    {
        name: 'bundleId', 
        label: 'iOS Bundle ID', 
        placeholder: "e.g. todo", 
        title: 'iOS Info - Bundle ID', 
        description: 'todo'
    },
    { 
        name: 'customScheme', 
        label: 'iOS Custom Scheme', 
        placeholder: "e.g. todo", 
        title: 'UTM Parameter - Source', 
        description: 'todo',
    },
    { 
        name: 'fallbackLink', 
        label: 'iOS Fallback Link', 
        placeholder: "e.g. todo", 
        title: 'iOS Info - Fallback Link', 
        description: 'todo',
    },
    { 
        name: 'ipadBundleId',
        label: 'iOS iPad Bundle ID', 
        placeholder: "e.g. todo", 
        title: 'UTM Parameter - iPad Bundle ID',
        description: 'todo', 
    }
];


