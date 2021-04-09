
export default function sanitizeUrlModifierInput(response, state) {
    const shortLink = response.shortLink; 
    const previewLink = response.previewLink;

    const linkData = {
        slug: shortLink.substring(31),
        originalUrl: state.url,
        modifiedUrl: shortLink,
        previewLink: previewLink,
        nickname: state.nickname,
        socials: state.socials,
        starred: state.starred,
        analytics: {
            ios: state.ios,
            utm: state.utm,
            android: state.android,
            meta: state.meta,
        },
        counts: state.counts,
        timestamp: new Date().getTime().toString(),
    }; 

    return linkData;
}

export const cropOutputField = (textField, maxLength) => {
    if(textField && maxLength && textField?.length > maxLength) {
        return textField.substring(0, maxLength - 3) + "...";
    }
    return textField; 
}

export const sanitizeOpenGraphResponse = (response) => {
    try {
        if(response && response?.url && response?.hybridGraph) {
            return {
                error: null,
                data: {
                    url: response.url,
                    siteName: response.hybridGraph.site_name,
                    title: response.hybridGraph.title,
                    description: response.hybridGraph.description,
                    type: response.hybridGraph.type,
                    image: response.hybridGraph.image,
                }
            };
        } else if(response && response?.openGraph && !response?.openGraph?.error) {
            return {
                error: null,
                data: {
                    url: response.url,
                    siteName: response.openGraph.site_name,
                    title: response.openGraph.title,
                    description: response.openGraph.description,
                    type: response.openGraph.type,
                    image: response.openGraph.image,
                }
            };
        } else {
            return {
                error: response ? response?.openGraph.error ? response.openGraph.error : 'No Data' : 'Unknown Error',
                data: null,
            };
        } 
    } catch (error) {
        return {
            error: 'Unknown Error',
            data: null,
        };
    }
}
