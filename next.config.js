const { siteUrl } = require('./next-sitemap.config');

// bundle analyzer 
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    fastRefresh: true,
    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true
    },
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'cms.epiccleaning.co.nz',
            port: '',
            pathname: '/**'
        }],
    },
    env: {
        url: "https://cms.epiccleaning.co.nz",
        siteUrl: "https://epiccleaning.co.nz",
        name: "Epic Cleaning Tauranga",
        gurpreet: "/gurpreet.jpg"
    },
    async redirects() {
        return [
            {
                source: '/privacy',
                destination: '/privacy-policy',
                permanent: true,
            },

        ];
    },
}

module.exports = withBundleAnalyzer(nextConfig)
