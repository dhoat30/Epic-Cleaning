import ServicePackagePage from '@/components/Pages/ServicePackages/ServicePacakgePage'
import { getPageData, getOptions, getServicePackages } from '@/utils/fetchData'



export async function generateMetadata({ params, searchParams }, parent) {


    // fetch data
    const data = await getPageData("service-packages")
    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []
    if (data.length > 0) {
        const seoData = data[0].yoast_head_json
        return {
            title: seoData.title,
            description: seoData.description,
            metadataBase: new URL('https://webduel.co.nz'),
            alternates: {
                canonical: `https://webduel.co.nz/service-packages`,
            },
            openGraph: {
                title: seoData.title,
                description: seoData.description,
                url: `https://webduel.co.nz/blogs/service-packages`,
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


    const allServicePackages = await getServicePackages()

    const data = await getPageData("service-packages")
    const options = await getOptions()
    return (
        <>
            <main>
                <ServicePackagePage techLogos={options.tech_logos} pageData={data[0]} servicesPackagesData={allServicePackages} />
            </main>
        </>

    )
}
