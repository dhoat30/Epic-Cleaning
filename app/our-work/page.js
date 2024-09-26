import OurWorkPage from '@/components/Pages/OurWorkPage/OurWorkPage'
import { getProjects, getProjectCategories, getPageData, getOptions } from '@/utils/fetchData'



export async function generateMetadata({ params, searchParams }, parent) {


    // fetch data
    const data = await getPageData("our-work")
    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []
    if (data.length > 0) {
        const seoData = data[0].yoast_head_json
        return {
            title: seoData.title,
            description: seoData.description,
            metadataBase: new URL('https://webduel.co.nz'),
            alternates: {
                canonical: `https://webduel.co.nz/our-work`,
            },
            openGraph: {
                title: seoData.title,
                description: seoData.description,
                url: `https://webduel.co.nz/blogs/our-work`,
                siteName: 'webduel',
                images: [
                    {
                        url: seoData.og_image && seoData.og_image[0].url,
                        width: 800,
                        height: 600,
                    }, {
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


    const projectsData = await getProjects() // get all blogs
    const categoryData = await getProjectCategories() // get all blogs categories
    const data = await getPageData("our-work")
    const options = await getOptions()
    return (
        <>
            <main >
                <OurWorkPage techLogos={options.tech_logos} pageData={data[0]} projectsData={projectsData} categoryData={categoryData} />

            </main>
        </>

    )
}
