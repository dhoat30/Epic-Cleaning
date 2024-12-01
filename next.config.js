const { siteUrl } = require('./next-sitemap.config');

// bundle analyzer 
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfigp} */
const nextConfig = {

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
        },
        {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            port: '',
            pathname: '/**'
        }
        
    ],
    },
    env: {
        url: "https://cms.epiccleaning.co.nz",
        siteUrl: "https://epiccleaning.co.nz",
        name: "Epic Cleaning Tauranga",
        GOOGLE_REDIRECT_URI: process.env.NODE_ENV === 'production' ? 'https://epiccleaning.co.nz' : 'http://localhost:3000'
    },
    async redirects() {
        return [
            {
                source: '/blog',
                destination: '/blogs',
                permanent: true,
            },
            {
                source: '/testimonial',
                destination: '/testimonials',
                permanent: true,
            }, {
                source: '/services',
                destination: '/residential-cleaning',
                permanent: true,
            }, {
                source: '/gallery',
                destination: '/our-work/gallery',
                permanent: true,
            }, {
                source: '/exterior-washing',
                destination: '/residential-cleaning/exterior-house-washing-tauranga',
                permanent: true,
            }, {
                source: '/window-cleaning',
                destination: '/residential-cleaning/window-cleaning-tauranga',
                permanent: true,
            }, {
                source: '/builder-clean',
                destination: '/residential-cleaning/builders-cleaning-tauranga',
                permanent: true,
            }, {
                source: '/oven-cleaning',
                destination: '/residential-cleaning/oven-cleaning-tauranga',
                permanent: true,
            }, {
                source: '/office-cleaning',
                destination: '/commercial-cleaning/office-cleaning-tauranga',
                permanent: true,
            }, {
                source: '/flood-restoration',
                destination: '/residential-cleaning/flood-restoration-tauranga',
                permanent: true,
            }, {
                source: '/carpet-cleaning',
                destination: '/residential-cleaning/carpet-cleaning-tauranga',
                permanent: true,
            }, {
                source: '/spring-cleaning',
                destination: '/residential-cleaning/spring-cleaning-tauranga',
                permanent: true,
            }, {
                source: '/upholstery-cleaning',
                destination: '/residential-cleaning/upholstery-cleaning-tauranga',
                permanent: true,
            }, {
                source: '/sweeping-and-scrubbing',
                destination: '/industrial-cleaning',
                permanent: true,
            }, {
                source: '/grout-tiles-cleaning',
                destination: '/residential-cleaning/tile-and-grout-cleaning-tauranga',
                permanent: true,
            }, {
                source: '/category/home-cleaning/',
                destination: '/blogs',
                permanent: true,
            }, {
                source: '/professional-house-cleaning',
                destination: '/residential-cleaning/move-out-cleaning',
                permanent: true,
            }, {
                source: '/zero-waste-cleaning',
                destination: '/blogs/what-is-zero-waste-cleaning',
                permanent: true,
            }, {
                source: '/end-of-tenancy',
                destination: '/residential-cleaning/move-out-cleaning',
                permanent: true,
            }, {
                source: '/category/carpet-cleaning',
                destination: '/residential-cleaning/carpet-cleaning-tauranga',
                permanent: true,
            }, {
                source: '/category/windows-cleaning',
                destination: '/residential-cleaning/window-cleaning-tauranga',
                permanent: true,
            }, {
                source: '/epic-cleaning-services',
                destination: '/residential-cleaning',
                permanent: true,
            }, {
                source: '/category/supermarket-cleaning',
                destination: '/blogs/supermarket-cleaning-service',
                permanent: true,
            }, {
                source: '/vinyl-strip-and-polish',
                destination: '/commercial-cleaning/vinyl-floor-cleaning-and-polishing-tauranga',
                permanent: true,
            }, {
                source: '/house-cleaning-tauranga-reviews',
                destination: '/testimonials',
                permanent: true,
            }, {
                source: '/1-spotless-cleaning-tauranga',
                destination: '/blogs',
                permanent: true,
            }, {
                source: '/category/vinyl-floor-polish',
                destination: '/commercial-cleaning/vinyl-floor-cleaning-and-polishing-tauranga',
                permanent: true,
            }, {
                source: '/category/sweeping-and-scrubbing',
                destination: '/industrial-cleaning',
                permanent: true,
            }, {
                source: '/commercial-cleaning-services-in-tauranga',
                destination: '/commercial-cleaning',
                permanent: true,
            }, {
                source: '/blog/page/3',
                destination: '/blogs',
                permanent: true,
            }, {
                source: '/supermarket-cleaning-services-in-tauranga',
                destination: '/commercial-cleaning/supermarket-cleaning-tauranga',
                permanent: true,
            }, {
                source: '/window-cleaning-in-auckland-tauranga',
                destination: '/residential-cleaning/window-cleaning-tauranga',
                permanent: true,
            }, {
                source: '/commercial-cleaning-companies-in-tauranga',
                destination: '/commercial-cleaning',
                permanent: true,
            }, {
                source: '/blog/page/4',
                destination: '/blogs',
                permanent: true,
            }, {
                source: '/best-cleaning-service-in-taurnga',
                destination: '/blogs',
                permanent: true,
            }, {
                source: '/move-out-cleaning-tauranga-2024',
                destination: '/residential-cleaning/move-out-cleaning',
                permanent: true,
            }, {
                source: '/spotless-solutions-premier-commercial-cleaners-in-tauranga',
                destination: '/blogs',
                permanent: true,
            }, {
                source: '/how-to-strip-and-polish-vinyl-floors',
                destination: '/blogs',
                permanent: true,
            }, {
                source: '/end-of-tenancy-cleaning-services-in-tauranga',
                destination: '/residential-cleaning/move-out-cleaning',
                permanent: true,
            }, {
                source: '/commercial-cleaning-companies-in-tauranga',
                destination: '/commercial-cleaning',
                permanent: true,
            }, {
                source: '/benefits-of-hiring-commercial-cleaners-in-tauranga',
                destination: '/blogs',
                permanent: true,
            }, {
                source: '/services/vinyl-strip-and-polish-services-in-tauranga',
                destination: '/commercial-cleaning/vinyl-floor-cleaning-and-polishing-tauranga',
                permanent: true,
            }, {
                source: '/freshen-up-your-workspace-office-cleaning-services-in-tauranga',
                destination: '/commercial-cleaning/office-cleaning-tauranga',
                permanent: true,
            }, {
                source: '/4-reasons-commercial-cleaning-saves-money-commercial-cleaners-tauranga',
                destination: '/blogs',
                permanent: true,
            }, {
                source: '/5-reasons-why-every-company-needs-winter-office-cleaning',
                destination: '/blogs',
                permanent: true,
            }, {
                source: '/elevate-your-workspace-with-exceptional-commercial-cleaning-in-tauranga',
                destination: '/blogs',
                permanent: true,
            }, {
                source: '/4-common-mistakes-to-avoid-when-cleaning-your-windows',
                destination: '/blogs',
                permanent: true,
            }, {
                source: '/best-cleaning-service-in-taurnga',
                destination: '/blogs',
                permanent: true,
            }, {
                source: '/achieve-brilliant-shine-a-complete-guide-to-vinyl-floor-polish',
                destination: '/blogs',
                permanent: true,
            }, {
                source: '/7-things-to-research-before-hiring-a-commercial-cleaning-company',
                destination: '/blogs',
                permanent: true,
            }, {
                source: '/epic-carpet-cleaning-tauranga-finding-the-cheapest-and-most-efficient-services',
                destination: '/blogs',
                permanent: true,
            }, {
                source: '/how-to-plan-a-top-notch-afternoon-tea-party-home-cleaning-services',
                destination: '/blogs',
                permanent: true,
            }, {
                source: '/how-do-i-clean-a-wool-carpet-carpet-cleaning-easy-way-2024',
                destination: '/blogs',
                permanent: true,
            }, {
                source: '/efficient-floor-maintenance-the-art-of-sweeping-and-scrubbing-in-commercial-spaces',
                destination: '/blogs',
                permanent: true,
            }, {
                source: '/why-you-should-have-a-year-end-cleaning-ritual-and-end-of-tenancy-cleaning',
                destination: '/blogs',
                permanent: true,
            }, {
                source: '/revitalize-your-home-with-epic-carpet-cleaning-tauranga-expert-solutions-for-fresh-flawless-carpets',
                destination: '/blogs',
                permanent: true,
            }, {
                source: '/epic-cleaning-services-your-one-stop-shop-for-a-sparkling-home-or-business-in-tauranga',
                destination: '/blogs',
                permanent: true,
            }, {
                source: '/the-benefits-and-importance-of-regular-commercial-floor-cleaning-why-companies-should-invest-in-professional-services',
                destination: '/blogs',
                permanent: true,
            },
            {
                source: '/spring-cleaning-in-tauranga-tips-for-a-fresh-and-organized-home',
                destination: '/residential-cleaning/spring-cleaning-tauranga',
                permanent: true,
            },
            {
                source: '/residential-cleaning/end-of-tenancy-cleaning-tauranga',
                destination: '/residential-cleaning/move-out-cleaning',
                permanent: true,
            }
        ];
    },
}

module.exports = withBundleAnalyzer(nextConfig)
