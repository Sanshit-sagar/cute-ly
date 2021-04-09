import { useEffect } from 'react';
import useSWR from 'swr';
import format from 'comma-number';

async function fetcher(...args) {
    const res = await fetch(...args);
    return res.json();
}

export default function ViewCounter({ slug }) {
    const { data } = useSWR(`/api/views/${slug}`, fetcher);
    const views = data?.total;

    useEffect(() => {
        const registerView = () =>
          fetch(`/api/views/${slug}`, {
            method: 'POST'
          });

        registerView();
    }, [slug]);
      
    return format(views);
    // return `${views ? format(views) : '–––'} views`;
}
    
    