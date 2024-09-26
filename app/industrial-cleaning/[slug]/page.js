import { getOptions, getSingleCommercialService, getSinglePostData, getSingleProject, getSingleServicePackage } from '@/utils/fetchData'
import Layout from '@/components/UI/Layout/Layout'
import OptimizedHero from '@/components/UI/Hero/OptimizedHero/OptimizedHero'


export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    const slug = params.slug

    // fetch data
    const data = await getSingleCommercialService(slug)

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []
    if (data.length > 0) {
        const seoData = data[0].yoast_head_json
        return {
            title: seoData.title,
            description: seoData.description,
            metadataBase: new URL('https://webduel.co.nz'),
            openGraph: {
                title: seoData.title,
                description: seoData.description,
                url: 'https://webduel.co.nz',
                siteName: 'webduel',
                images: [
                    {
                        url: seoData?.og_image && seoData?.og_image[0]?.url,
                        width: 800,
                        height: 600,
                    }, {
                        url: seoData?.og_image && seoData?.og_image[0].url,
                        width: 1800,
                        height: 1600,
                    },

                ],
                type: 'website',
            },
        }
    }

}

export default async function Contact({ params }) {
    const slug = params.slug

    const singleCommercialService = await getSinglePostData(slug, "/wp-json/wp/v2/commercial-cleaning")
    const options = await getOptions()
    if (!singleCommercialService) {
        return {
            notFound: true,
        }
    }
    return (
        <>
            <main>
                <OptimizedHero data={singleCommercialService[0].acf.hero_section} heroUSP={options.hero_usp} />
                <Layout data={singleCommercialService[0]} />
            </main>
        </>

    )
}
