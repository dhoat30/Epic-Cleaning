/** @type {import('next-sitemap').IConfig} */




const getBlogsData = async () => {
    try {
        const fetchData = await fetch('https://cms.epiccleaning.co.nz/wp-json/wp/v2/posts?acf_format=standard&per_page=100');
        const data = await fetchData.json();
        return data.map(post => `/blogs/${post.slug}`);
    } catch (error) {
        console.error('Failed to fetch blog data:', error);
        return []; // Return an empty array on error to avoid breaking the sitemap generation
    }
};


const getResidentialServices = async () => {
    try {
        const fetchData = await fetch('https://cms.epiccleaning.co.nz/wp-json/wp/v2/residential-cleaning?acf_format=standard&per_page=100');
        const data = await fetchData.json();
        return data.map(post => `/residential-cleaning/${post.slug}`);
    } catch (error) {
        console.error('Failed to fetch our work data:', error);
        return []; // Return an empty array on error to avoid breaking the sitemap generation
    }
};


const getCommercialServices = async () => {
    try {
        const fetchData = await fetch('https://cms.epiccleaning.co.nz/wp-json/wp/v2/commercial-cleaning?acf_format=standard&per_page=100');
        const data = await fetchData.json();
        return data.map(post => `/commercial-cleaning/${post.slug}`);
    } catch (error) {
        console.error('Failed to fetch our work data:', error);
        return []; // Return an empty array on error to avoid breaking the sitemap generation
    }
};
const getIndustrialServices = async () => {
    try {
        const fetchData = await fetch('https://cms.epiccleaning.co.nz/wp-json/wp/v2/industrial-cleaning?acf_format=standard&per_page=100');
        const data = await fetchData.json();
        return data.map(post => `/industrial-cleaning/${post.slug}`);
    } catch (error) {
        console.error('Failed to fetch our work data:', error);
        return []; // Return an empty array on error to avoid breaking the sitemap generation
    }
};


module.exports = {
    siteUrl: process.env.SITE_URL || 'https://epiccleaning.co.nz',
    generateRobotsTxt: true,
    sitemapSize: 1000,
    additionalPaths: async (config) => {
        const blogUrls = await getBlogsData();
        const residentialCleaning = await getResidentialServices();
        const commercialCleaning = await getCommercialServices();
        const industrialCleaning = await getIndustrialServices();

        // Combine and transform both sets of URLs
        return [
            ...await Promise.all(blogUrls.map(url => config.transform(config, url))),
            // ...await Promise.all(projectUrls.map(url => config.transform(config, url))),
        ];
    },


};
