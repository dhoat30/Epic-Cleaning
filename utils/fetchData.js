import { unstable_cache } from 'next/cache';

//get single post with slug 
export const getSinglePostData = async (slug, apiRoute) => {
    let response = await fetch(`${process.env.url}/${apiRoute}?slug=${slug}&acf_format=standard`, {
        next: { revalidate: 2592000 },
    });
    let data = await response.json();
    return data
}

// get single post data using post id 
export const getSinglePostDataWithID = async (id, apiRoute) => {
    let response = await fetch(`${process.env.url}/${apiRoute}/${id}?acf_format=standard`, {
        next: { revalidate: 2592000 },
    });
    let data = await response.json();
    return data
}

//get all posts 
export const getAllPosts = async (apiRoute) => {
    let response = await fetch(`${process.env.url}/${apiRoute}?acf_format=standard&per_page=100`, {
        next: { revalidate: 2592000 },
    });
    let data = await response.json();
    return data
}


export const getOptions = async () => {
    let fetchData = await fetch(`${process.env.url}/wp-json/options/all`, {
        next: { revalidate: 2592000 },
    });
    let data = await fetchData.json();
    return data
}





const GOOGLE_REVIEWS_REVALIDATE = 30 * 86400;

// get reivews 
const fetchGoogleReviews = async () => {
    try {
        const { google } = require('googleapis');
        // Fetch reviews directly from Google API
        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET
        );

        oauth2Client.setCredentials({
            refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
        });

        const accountId = process.env.GOOGLE_ACCOUNT_ID;
        const locationId = process.env.GOOGLE_LOCATION_ID;

        // Fetch reviews
        const response = await oauth2Client.request({
            url: `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews`,
            method: "GET",
        });

        return {
            reviews: response.data.reviews || [],
            averageRating: response.data.averageRating ?? null,
            totalReviewCount: response.data.totalReviewCount ?? null,
        };
    } catch (error) {
        console.error('Failed to fetch Google reviews:', error?.message || error);
        return { reviews: [], averageRating: null, totalReviewCount: null };
    }
};

export const getGoogleReviews = unstable_cache(
    fetchGoogleReviews,
    ['google-reviews'],
    { revalidate: GOOGLE_REVIEWS_REVALIDATE }
);


//get service packages  
export const getCommercialServices = async () => {
    let fetchData = await fetch(`${process.env.url}/wp-json/wp/v2/commercial-cleaning?acf_format=standard&per_page=100`, {
        next: { revalidate: 2592000 },
    });
    let data = await fetchData.json();
    return data
}

export const getSingleCommercialService = async (slug) => {
    let fetchData = await fetch(`${process.env.url}/wp-json/wp/v2/commercial-cleaning?slug=${slug}&acf_format=standard`, {
        next: { revalidate: 2592000 },
    });
    let data = await fetchData.json();
    return data
}
// get single service package 

// get all blogs  
export const getBlogsData = async () => {
    let fetchData = await fetch(`${process.env.url}/wp-json/wp/v2/posts?acf_format=standard&per_page=100`, {
        next: { revalidate: 2592000 },
    });
    let data = await fetchData.json();
    return data
}
// get single blog data 
export const getSingleBlog = async (slug) => {
    let fetchData = await fetch(`${process.env.url}/wp-json/wp/v2/posts?slug=${slug}&acf_format=standard`, {
        next: { revalidate: 2592000 },
    });
    let data = await fetchData.json();
    return data
}
