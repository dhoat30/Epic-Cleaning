import GetQuotePage from "@/components/Pages/GetQuotePage/GetQuotePage"
import WebsiteEnquiryPage from "@/components/Pages/WebsiteEnquiryPage/WebsiteEnquiryPage"
import { getPageData } from '@/utils/fetchData'

export async function generateMetadata({ params, searchParams }, parent) {
    // fetch data
    const data = await getPageData("website-enquiry")
    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []
    if (data.length > 0) {
        const seoData = data[0].yoast_head_json
        return {
            title: seoData.title,
            description: seoData.description,
            metadataBase: new URL('https://webduel.co.nz'),
            alternates: {
                canonical: `https://webduel.co.nz/website-enquiry`,
            },
            openGraph: {
                title: seoData.title,
                description: seoData.description,
                url: 'https://webduel.co.nz',
                siteName: 'webduel',
                images: [
                    {
                        url: seoData.og_image && seoData.og_image.url,
                        width: 800,
                        height: 600,
                    },
                    {
                        url: seoData?.og_image && seoData.og_image[0].url,
                        width: 1800,
                        height: 1600,
                    },
                ],
                type: 'website',
            },
        }
    }

}

export default async function Page() {
    const data = await getPageData("website-enquiry")
    return (
        <>
            <main>
                <WebsiteEnquiryPage data={data[0]} />
            </main>
        </>

    )
}
