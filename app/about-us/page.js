import { getOptions, getSinglePostData, getAllPosts, getSingleServicePackage } from '@/utils/fetchData'
import Layout from '@/components/UI/Layout/Layout'
import OptimizedHero from '@/components/UI/Hero/OptimizedHero/OptimizedHero'
import TechLogos from '@/components/UI/TechLogos/TechLogos'
import USP from '@/components/UI/USP/USP'
import Header from '@/components/UI/Header/Header'
import Footer from '@/components/UI/Footer/Footer'
import ServicesCardsTemplate from '@/components/UI/Services/ServicesCardsTemplate'
import JsonLd from '@/components/UI/Meta/JsonLd'
import { getWebPageSchema } from '@/utils/schema'
import { getSeoMetadata } from '@/utils/metadata'


export async function generateMetadata() {
  const data = await getSinglePostData("about-us", "/wp-json/wp/v2/pages")

  return getSeoMetadata({
    seoData: data?.[0]?.yoast_head_json,
    path: '/about-us',
  })
}

export default async function Contact({ params }) {
    const slug = params.slug
    const postData = await getSinglePostData("about-us", "/wp-json/wp/v2/pages")
    const options = await getOptions()
    if (!postData) {
        return {
            notFound: true,
        }
    }

    const seoData = postData[0]?.yoast_head_json
    const jsonLd = getWebPageSchema({
        path: '/about-us',
        name: seoData?.title,
        description: seoData?.description,
        image: seoData?.og_image,
        type: 'AboutPage',
    })

    return (
        <>
            <JsonLd data={jsonLd} idPrefix="about-schema" />
            <Header />
            <main className="mt-16">
                <OptimizedHero data={postData[0]?.acf?.hero_section} heroUSP={options.hero_usp} />
                <Layout sections={postData[0]?.acf?.sections} />
                <USP showTitle={true} statsArray={options.stats.items} cards={options.usp.items} title={options.usp.section_title} description={options.usp.section_description} />

            </main>
            <Footer footerCtaData={options.footer_cta} certifications={options.certifications} contactInfo={options.contact_info} socialData={options.social_links} />
        </>

    )
}
