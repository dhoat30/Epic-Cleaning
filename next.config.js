const { siteUrl } = require('./next-sitemap.config');

// bundle analyzer 
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfigp} */
const nextConfig = {

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
                statusCode: 301,
            },
            {
                source: '/testimonial',
                destination: '/testimonials',
                statusCode: 301,
            }, {
                source: '/services',
                destination: '/residential-cleaning',
                statusCode: 301,
            }, {
                source: '/gallery',
                destination: '/our-work/gallery',
                statusCode: 301,
            }, {
                source: '/exterior-washing',
                destination: '/residential-cleaning/exterior-house-washing-tauranga',
                statusCode: 301,
            }, {
                source: '/window-cleaning',
                destination: '/residential-cleaning/window-cleaning-tauranga',
                statusCode: 301,
            }, {
                source: '/builder-clean',
                destination: '/residential-cleaning/builders-cleaning-tauranga',
                statusCode: 301,
            }, {
                source: '/oven-cleaning',
                destination: '/residential-cleaning/oven-cleaning-tauranga',
                statusCode: 301,
            }, {
                source: '/office-cleaning',
                destination: '/commercial-cleaning/office-cleaning-tauranga',
                statusCode: 301,
            }, {
                source: '/flood-restoration',
                destination: '/residential-cleaning/flood-restoration-tauranga',
                statusCode: 301,
            }, {
                source: '/carpet-cleaning',
                destination: '/residential-cleaning/carpet-cleaning-tauranga',
                statusCode: 301,
            }, {
                source: '/spring-cleaning',
                destination: '/residential-cleaning/spring-cleaning-tauranga',
                statusCode: 301,
            }, {
                source: '/upholstery-cleaning',
                destination: '/residential-cleaning/upholstery-cleaning-tauranga',
                statusCode: 301,
            }, {
                source: '/sweeping-and-scrubbing',
                destination: '/industrial-cleaning',
                statusCode: 301,
            }, {
                source: '/grout-tiles-cleaning',
                destination: '/residential-cleaning/tile-and-grout-cleaning-tauranga',
                statusCode: 301,
            }, {
                source: '/category/home-cleaning/',
                destination: '/blogs',
                statusCode: 301,
            }, {
                source: '/professional-house-cleaning',
                destination: '/residential-cleaning/move-out-cleaning',
                statusCode: 301,
            }, {
                source: '/zero-waste-cleaning',
                destination: '/blogs/what-is-zero-waste-cleaning',
                statusCode: 301,
            }, {
                source: '/end-of-tenancy',
                destination: '/residential-cleaning/move-out-cleaning',
                statusCode: 301,
            }, {
                source: '/category/carpet-cleaning',
                destination: '/residential-cleaning/carpet-cleaning-tauranga',
                statusCode: 301,
            }, {
                source: '/category/windows-cleaning',
                destination: '/residential-cleaning/window-cleaning-tauranga',
                statusCode: 301,
            }, {
                source: '/epic-cleaning-services',
                destination: '/residential-cleaning',
                statusCode: 301,
            }, {
                source: '/category/supermarket-cleaning',
                destination: '/blogs/supermarket-cleaning-service',
                statusCode: 301,
            }, {
                source: '/vinyl-strip-and-polish',
                destination: '/commercial-cleaning/vinyl-floor-cleaning-and-polishing-tauranga',
                statusCode: 301,
            }, {
                source: '/vinyl-strip-and-polish/',
                destination: '/commercial-cleaning/vinyl-floor-cleaning-and-polishing-tauranga',
                statusCode: 301,
            }, {
                source: '/house-cleaning-tauranga-reviews',
                destination: '/testimonials',
                statusCode: 301,
            }, {
                source: '/1-spotless-cleaning-tauranga',
                destination: '/blogs',
                statusCode: 301,
            }, {
                source: '/category/vinyl-floor-polish',
                destination: '/commercial-cleaning/vinyl-floor-cleaning-and-polishing-tauranga',
                statusCode: 301,
            }, {
                source: '/category/sweeping-and-scrubbing',
                destination: '/industrial-cleaning',
                statusCode: 301,
            }, {
                source: '/commercial-cleaning-services-in-tauranga',
                destination: '/commercial-cleaning',
                statusCode: 301,
            }, {
                source: '/blog/page/3',
                destination: '/blogs',
                statusCode: 301,
            }, {
                source: '/supermarket-cleaning-services-in-tauranga',
                destination: '/commercial-cleaning/supermarket-cleaning-tauranga',
                statusCode: 301,
            }, {
                source: '/window-cleaning-in-auckland-tauranga',
                destination: '/residential-cleaning/window-cleaning-tauranga',
                statusCode: 301,
            }, {
                source: '/commercial-cleaning-companies-in-tauranga',
                destination: '/commercial-cleaning',
                statusCode: 301,
            }, {
                source: '/blog/page/4',
                destination: '/blogs',
                statusCode: 301,
            }, {
                source: '/best-cleaning-service-in-taurnga',
                destination: '/blogs',
                statusCode: 301,
            }, {
                source: '/move-out-cleaning-tauranga-2024',
                destination: '/residential-cleaning/move-out-cleaning',
                statusCode: 301,
            }, {
                source: '/spotless-solutions-premier-commercial-cleaners-in-tauranga',
                destination: '/blogs',
                statusCode: 301,
            }, {
                source: '/how-to-strip-and-polish-vinyl-floors',
                destination: '/blogs',
                statusCode: 301,
            }, {
                source: '/end-of-tenancy-cleaning-services-in-tauranga',
                destination: '/residential-cleaning/move-out-cleaning',
                statusCode: 301,
            }, {
                source: '/commercial-cleaning-companies-in-tauranga',
                destination: '/commercial-cleaning',
                statusCode: 301,
            }, {
                source: '/benefits-of-hiring-commercial-cleaners-in-tauranga',
                destination: '/blogs',
                statusCode: 301,
            }, {
                source: '/services/vinyl-strip-and-polish-services-in-tauranga',
                destination: '/commercial-cleaning/vinyl-floor-cleaning-and-polishing-tauranga',
                statusCode: 301,
            }, {
                source: '/freshen-up-your-workspace-office-cleaning-services-in-tauranga',
                destination: '/commercial-cleaning/office-cleaning-tauranga',
                statusCode: 301,
            }, {
                source: '/4-reasons-commercial-cleaning-saves-money-commercial-cleaners-tauranga',
                destination: '/blogs',
                statusCode: 301,
            }, {
                source: '/5-reasons-why-every-company-needs-winter-office-cleaning',
                destination: '/blogs',
                statusCode: 301,
            }, {
                source: '/elevate-your-workspace-with-exceptional-commercial-cleaning-in-tauranga',
                destination: '/blogs',
                statusCode: 301,
            }, {
                source: '/4-common-mistakes-to-avoid-when-cleaning-your-windows',
                destination: '/blogs',
                statusCode: 301,
            }, {
                source: '/best-cleaning-service-in-taurnga',
                destination: '/blogs',
                statusCode: 301,
            }, {
                source: '/achieve-brilliant-shine-a-complete-guide-to-vinyl-floor-polish',
                destination: '/blogs',
                statusCode: 301,
            }, {
                source: '/7-things-to-research-before-hiring-a-commercial-cleaning-company',
                destination: '/blogs',
                statusCode: 301,
            }, {
                source: '/epic-carpet-cleaning-tauranga-finding-the-cheapest-and-most-efficient-services',
                destination: '/blogs',
                statusCode: 301,
            }, {
                source: '/how-to-plan-a-top-notch-afternoon-tea-party-home-cleaning-services',
                destination: '/blogs',
                statusCode: 301,
            }, {
                source: '/how-do-i-clean-a-wool-carpet-carpet-cleaning-easy-way-2024',
                destination: '/blogs',
                statusCode: 301,
            }, {
                source: '/efficient-floor-maintenance-the-art-of-sweeping-and-scrubbing-in-commercial-spaces',
                destination: '/blogs',
                statusCode: 301,
            }, {
                source: '/why-you-should-have-a-year-end-cleaning-ritual-and-end-of-tenancy-cleaning',
                destination: '/blogs',
                statusCode: 301,
            }, {
                source: '/revitalize-your-home-with-epic-carpet-cleaning-tauranga-expert-solutions-for-fresh-flawless-carpets',
                destination: '/blogs',
                statusCode: 301,
            }, {
                source: '/epic-cleaning-services-your-one-stop-shop-for-a-sparkling-home-or-business-in-tauranga',
                destination: '/blogs',
                statusCode: 301,
            }, {
                source: '/the-benefits-and-importance-of-regular-commercial-floor-cleaning-why-companies-should-invest-in-professional-services',
                destination: '/blogs',
                statusCode: 301,
            },
            {
                source: '/spring-cleaning-in-tauranga-tips-for-a-fresh-and-organized-home',
                destination: '/residential-cleaning/spring-cleaning-tauranga',
                statusCode: 301,
            },
            {
                source: '/residential-cleaning/end-of-tenancy-cleaning-tauranga',
                destination: '/residential-cleaning/move-out-cleaning',
                statusCode: 301,
            },
                     {
                source: '/home',
                destination: '/',
                statusCode: 301,
            }, 
             {
                source: '/$',
                destination: '/',
                statusCode: 301,
            },  {
                source: '/office-cleaning/5-reasons-why-every-company-needs-winter-office-cleaning',
                destination: '/blogs/5-reasons-why-every-company-needs-winter-office-cleaning',
                statusCode: 301,
            },  {
                source: '/category/home-cleaning',
                destination: '/residential-cleaning/regular-cleaning-tauranga',
                statusCode: 301,
            },  {
                source: '/commercial-cleaners-in-tauranga-your-trusted-choice',
                destination: '/commercial-cleaning/building-washing-tauranga',
                statusCode: 301,
            },  {
                source: '/exterior-house-washing',
                destination: '/residential-cleaning/exterior-house-washing-tauranga',
                statusCode: 301,
            },
            // trailing slash variants
            { source: '/blog/', destination: '/blogs', statusCode: 301 },
            { source: '/gallery/', destination: '/our-work/gallery', statusCode: 301 },
            { source: '/services/', destination: '/residential-cleaning', statusCode: 301 },
            { source: '/office-cleaning/', destination: '/commercial-cleaning/office-cleaning-tauranga', statusCode: 301 },
            { source: '/upholstery-cleaning/', destination: '/residential-cleaning/upholstery-cleaning-tauranga', statusCode: 301 },
            { source: '/spring-cleaning/', destination: '/residential-cleaning/spring-cleaning-tauranga', statusCode: 301 },
            { source: '/house-cleaning-tauranga-reviews/', destination: '/testimonials', statusCode: 301 },
            { source: '/flood-restoration/', destination: '/residential-cleaning/flood-restoration-tauranga', statusCode: 301 },
            { source: '/end-of-tenancy/', destination: '/residential-cleaning/move-out-cleaning', statusCode: 301 },
            { source: '/grout-tiles-cleaning/', destination: '/residential-cleaning/tile-and-grout-cleaning-tauranga', statusCode: 301 },
            { source: '/builder-clean/', destination: '/residential-cleaning/builders-cleaning-tauranga', statusCode: 301 },
            { source: '/sweeping-and-scrubbing/', destination: '/industrial-cleaning', statusCode: 301 },
            { source: '/exterior-washing/', destination: '/residential-cleaning/exterior-house-washing-tauranga', statusCode: 301 },
            { source: '/carpet-cleaning/', destination: '/residential-cleaning/carpet-cleaning-tauranga', statusCode: 301 },
            { source: '/supermarket-cleaning-services-in-tauranga/', destination: '/commercial-cleaning/supermarket-cleaning-tauranga', statusCode: 301 },
            { source: '/commercial-cleaning-services-in-tauranga/', destination: '/commercial-cleaning', statusCode: 301 },
            { source: '/office-cleaning/5-reasons-why-every-company-needs-winter-office-cleaning/', destination: '/blogs/5-reasons-why-every-company-needs-winter-office-cleaning', statusCode: 301 },
            // old nested commercial page slug
            { source: '/commercial-cleaning/commercial-cleaners-in-tauranga-your-trusted-choice', destination: '/commercial-cleaning/building-washing-tauranga', statusCode: 301 },
            { source: '/commercial-cleaning/commercial-cleaners-in-tauranga-your-trusted-choice/', destination: '/commercial-cleaning/building-washing-tauranga', statusCode: 301 },
            // strip legacy WordPress ?et_blog query param from any URL
            {
                source: '/:path*',
                has: [{ type: 'query', key: 'et_blog' }],
                destination: '/:path*',
                statusCode: 301,
            },
        ];
    },
}

module.exports = withBundleAnalyzer(nextConfig)
