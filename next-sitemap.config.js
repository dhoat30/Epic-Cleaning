/** @type {import('next-sitemap').IConfig} */

const fs = require('fs');
const path = require('path');

const toLastmod = (value) => {
    if (!value) return undefined;

    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
};

const getRouteFileLastmod = (routePath) => {
    const routeToFile = {
        '/': 'app/page.js',
        '/about-us': 'app/about-us/page.js',
        '/blogs': 'app/blogs/page.js',
        '/commercial-cleaning': 'app/commercial-cleaning/page.js',
        '/contact-us': 'app/contact-us/page.js',
        '/faq': 'app/faq/page.js',
        '/get-a-quote': 'app/get-a-quote/page.js',
        '/get-regular-cleaning-quote': 'app/get-regular-cleaning-quote/page.js',
        '/industrial-cleaning': 'app/industrial-cleaning/page.js',
        '/our-work/gallery': 'app/our-work/gallery/page.js',
        '/our-work/video-gallery': 'app/our-work/video-gallery/page.js',
        '/privacy-policy': 'app/privacy-policy/page.js',
        '/residential-cleaning': 'app/residential-cleaning/page.js',
        '/terms-and-conditions': 'app/terms-and-conditions/page.js',
        '/testimonials': 'app/testimonials/page.js',
    };
    const filePath = routeToFile[routePath];

    if (!filePath) return undefined;

    try {
        return fs.statSync(path.join(process.cwd(), filePath)).mtime.toISOString();
    } catch (error) {
        return undefined;
    }
};

const getData = async (endpoint, urlPrefix) => {
    try {
        const fetchData = await fetch(endpoint);
        const data = await fetchData.json();
        return data.map(post => ({
            loc: `/${urlPrefix}/${post.slug}`,
            lastmod: toLastmod(post.modified_gmt || post.modified),
            changefreq: urlPrefix === 'blogs' ? 'weekly' : 'monthly',
        }));
    } catch (error) {
        console.error(`Failed to fetch data from ${endpoint}:`, error);
        return [];
    }
};

const getBlogsData = () => getData('https://cms.epiccleaning.co.nz/wp-json/wp/v2/posts?acf_format=standard&per_page=100', "blogs");
const getResidentialServices = () => getData('https://cms.epiccleaning.co.nz/wp-json/wp/v2/residential-cleaning?acf_format=standard&per_page=100', "residential-cleaning");
const getCommercialServices = () => getData('https://cms.epiccleaning.co.nz/wp-json/wp/v2/commercial-cleaning?acf_format=standard&per_page=100', "commercial-cleaning");
const getIndustrialServices = () => getData('https://cms.epiccleaning.co.nz/wp-json/wp/v2/industrial-cleaning?acf_format=standard&per_page=100', "industrial-cleaning");

const staticPaths = [
    { loc: '/', changefreq: 'monthly' },
    { loc: '/about-us', changefreq: 'monthly' },
    { loc: '/blogs', changefreq: 'weekly' },
    { loc: '/commercial-cleaning', changefreq: 'monthly' },
    { loc: '/contact-us', changefreq: 'monthly' },
    { loc: '/faq', changefreq: 'monthly' },
    { loc: '/get-a-quote', changefreq: 'monthly' },
    { loc: '/get-regular-cleaning-quote', changefreq: 'monthly' },
    { loc: '/industrial-cleaning', changefreq: 'monthly' },
    { loc: '/our-work/gallery', changefreq: 'monthly' },
    { loc: '/our-work/video-gallery', changefreq: 'monthly' },
    { loc: '/privacy-policy', changefreq: 'monthly' },
    { loc: '/residential-cleaning', changefreq: 'monthly' },
    { loc: '/terms-and-conditions', changefreq: 'monthly' },
    { loc: '/testimonials', changefreq: 'monthly' },
];

module.exports = {
    siteUrl: 'https://epiccleaning.co.nz',
    generateRobotsTxt: true,
    autoLastmod: false,
    sitemapSize: 1000,
    transform: async (config, pathOrEntry) => {
        const entry = typeof pathOrEntry === 'string' ? { loc: pathOrEntry } : pathOrEntry;
        const lastmod = entry.lastmod || getRouteFileLastmod(entry.loc);

        return {
            loc: entry.loc,
            changefreq: entry.changefreq || 'monthly',
            priority: entry.priority || 0.7,
            ...(lastmod && { lastmod }),
        };
    },
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/book-now/order-received',
                ],
            },
        ],
    },
    exclude: [
        '/api/*',
        '/book-now',
        '/book-now/order-received',
        '/checkout',
        '/form-submitted/thank-you',
        '/order-received',
        '/our-work',
        '/thank-you',
    ],
    additionalPaths: async (config) => {
        const blogUrls = await getBlogsData();
        const residentialCleaning = await getResidentialServices();
        const commercialCleaning = await getCommercialServices();
        const industrialCleaning = await getIndustrialServices();

        const paths = [
            ...staticPaths.map(entry => ({
                ...entry,
                lastmod: entry.lastmod || getRouteFileLastmod(entry.loc),
            })),
            ...blogUrls,
            ...residentialCleaning,
            ...commercialCleaning,
            ...industrialCleaning,
        ];
        const uniquePaths = [...new Map(paths.map(entry => [entry.loc, entry])).values()];

        return Promise.all(
            uniquePaths.map(url => config.transform(config, url))
        );
    },
};
