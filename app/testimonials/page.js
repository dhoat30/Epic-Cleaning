import { getOptions, getSinglePostData, getGoogleReviews } from '@/utils/fetchData'
import Layout from '@/components/UI/Layout/Layout'
import TechLogos from '@/components/UI/TechLogos/TechLogos'
import USP from '@/components/UI/USP/USP'
import Header from '@/components/UI/Header/Header'
import Footer from '@/components/UI/Footer/Footer'
import Gallery from '@/components/UI/Gallery/Gallery'
import BreadcrumbHero from '@/components/UI/Hero/BreadcrumbHero'
import GoogleReviewGridLayout from '@/components/UI/GoogleReviews/GoogleReviewGridLayout'
import JsonLd from '@/components/UI/Meta/JsonLd'
import { getWebPageSchema } from '@/utils/schema'
import { getSeoMetadata } from '@/utils/metadata'


export async function generateMetadata() {
  const data = await getSinglePostData("testimonials", "/wp-json/wp/v2/pages")

  return getSeoMetadata({
    seoData: data?.[0]?.yoast_head_json,
    path: '/testimonials',
  })
}

export default async function Contact() {

    const postData = await getSinglePostData("testimonials", "/wp-json/wp/v2/pages")

    const googleReviewsData = await getGoogleReviews()
    const options = await getOptions()
    if (!postData) {
        return {
            notFound: true,
        }
    }
    const seoData = postData[0]?.yoast_head_json
    const jsonLd = getWebPageSchema({
        path: '/testimonials',
        name: seoData?.title,
        description: seoData?.description,
        image: seoData?.og_image,
        type: 'CollectionPage',
    })
    return (
        <>
            <JsonLd data={jsonLd} idPrefix="testimonials-schema" />
            <Header />
            <main>
                <BreadcrumbHero title={postData[0]?.acf.hero_section.title} description={postData[0]?.acf.hero_section.description} showBreadcrumb={false} />
                <GoogleReviewGridLayout data={googleReviewsData} />
                <TechLogos data={options.clients_logos} />
                <Layout sections={postData[0]?.acf?.sections} />
                <USP showTitle={true} statsArray={options.stats.items} cards={options.usp.items} title={options.usp.section_title} description={options.usp.section_description} />
            </main>
            <Footer footerCtaData={options.footer_cta} certifications={options.certifications} contactInfo={options.contact_info} socialData={options.social_links} />
        </>

    )
}
