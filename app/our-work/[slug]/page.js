import { getOptions, getSingleProject } from '@/utils/fetchData'
import Header from '@/components/UI/Header/Header'
import SingleWorkPage from '@/components/Pages/OurWorkPage/SingleWorkPage/SingleWorkPage'



export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    const slug = params.slug

    // fetch data
    const data = await getSingleProject(slug)

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
    const singleProjectData = await getSingleProject(slug)
    const options = await getOptions()
    return (
        <>

            <main >
                <SingleWorkPage data={singleProjectData[0]} techLogos={options.tech_logos} />
            </main>
        </>

    )
}