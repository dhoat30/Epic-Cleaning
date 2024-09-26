const { siteUrl } = require('./next-sitemap.config');

// bundle analyzer 
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true
    },
    images: {
        remotePatterns: [{
            protocol: 'http',
            hostname: 'epic-cleaning.local',
            port: '',
            pathname: '/**'
        }],
    },
    env: {
        url: "http://epic-cleaning.local",
        siteUrl: "https://webduel.co.nz",
        name: "Epic Cleaning Tauranga",
        darkLogo: "/dark-logo.png",
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
