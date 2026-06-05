import { getOptions, getSinglePostData, getAllPosts, getSingleServicePackage } from '@/utils/fetchData'
import Layout from '@/components/UI/Layout/Layout'
import OptimizedHero from '@/components/UI/Hero/OptimizedHero/OptimizedHero'
import TechLogos from '@/components/UI/TechLogos/TechLogos'
import USP from '@/components/UI/USP/USP'
import Header from '@/components/UI/Header/Header'
import Footer from '@/components/UI/Footer/Footer'
import ServicesCardsTemplate from '@/components/UI/Services/ServicesCardsTemplate'
import FaqAccordionSection from '@/components/UI/Layout/Sections/FaqAccordionSection'
import JsonLd from '@/components/UI/Meta/JsonLd'
import { getFAQPageSchema } from '@/utils/schema'
import { getSeoMetadata } from '@/utils/metadata'


export async function generateMetadata() {
  const data = await getSinglePostData("faq", "/wp-json/wp/v2/pages")

  return getSeoMetadata({
    seoData: data?.[0]?.yoast_head_json,
    path: '/faq',
  })
}

export default async function Contact({ params }) {
    const slug = params.slug
    const postData = await getSinglePostData("faq", "/wp-json/wp/v2/pages")
    const allPosts = await getAllPosts("wp-json/wp/v2/industrial-cleaning")
    const options = await getOptions()
    if (!postData) {
        return {
            notFound: true,
        }
    }

    const seoData = postData[0]?.yoast_head_json
    const jsonLd = getFAQPageSchema({
        path: '/faq',
        name: seoData?.title,
        description: seoData?.description,
        image: seoData?.og_image,
        questions: options?.faq?.items || [],
    })

    return (
        <>
            <JsonLd data={jsonLd} idPrefix="faq-schema" />
            <Header />
            <main >
                <div className='mt-40'></div>
                <FaqAccordionSection title={options.faq.section_title} description={options.faq.section_description} qaData={options.faq.items} />
                <Layout sections={postData[0]?.acf?.sections} />
                <USP showTitle={true} statsArray={options.stats.items} cards={options.usp.items} title={options.usp.section_title} description={options.usp.section_description} />

            </main>
            <Footer footerCtaData={options.footer_cta} certifications={options.certifications} contactInfo={options.contact_info} socialData={options.social_links} />
        </>

    )
}
