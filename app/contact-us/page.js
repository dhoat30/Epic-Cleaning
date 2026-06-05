import { getOptions, getSinglePostData, getAllPosts, getSingleServicePackage } from '@/utils/fetchData'
import Layout from '@/components/UI/Layout/Layout'
import OptimizedHero from '@/components/UI/Hero/OptimizedHero/OptimizedHero'
import TechLogos from '@/components/UI/TechLogos/TechLogos'
import USP from '@/components/UI/USP/USP'
import Header from '@/components/UI/Header/Header'
import Footer from '@/components/UI/Footer/Footer'
import ServicesCardsTemplate from '@/components/UI/Services/ServicesCardsTemplate'
import ContactHero from '@/components/UI/Hero/OptimizedHero/ContactHero'
import JsonLd from '@/components/UI/Meta/JsonLd'
import { getWebPageSchema } from '@/utils/schema'
import { getSeoMetadata } from '@/utils/metadata'


export async function generateMetadata() {
  const data = await getSinglePostData("contact-us", "/wp-json/wp/v2/pages")

  return getSeoMetadata({
    seoData: data?.[0]?.yoast_head_json,
    path: '/contact-us',
  })
}

export default async function Contact() {

    const postData = await getSinglePostData("contact-us", "/wp-json/wp/v2/pages")
    const options = await getOptions()
    if (!postData) {
        return {
            notFound: true,
        }
    }
    const contactInfo = options.contact_info
    const seoData = postData[0]?.yoast_head_json
    const jsonLd = getWebPageSchema({
        path: '/contact-us',
        name: seoData?.title,
        description: seoData?.description,
        image: seoData?.og_image,
        type: 'ContactPage',
    })

    return (
        <>
            <JsonLd data={jsonLd} idPrefix="contact-schema" />
            <Header />
            <main>
                <ContactHero data={postData[0]?.acf?.hero_section} heroUSP={options.hero_usp} contactInfoData={contactInfo} />
                <TechLogos data={options.clients_logos} />
                <Layout sections={postData[0]?.acf?.sections} />
                <USP showTitle={true} statsArray={options.stats.items} cards={options.usp.items} title={options.usp.section_title} description={options.usp.section_description} />
            </main>
            <Footer footerCtaData={options.footer_cta} certifications={options.certifications} contactInfo={options.contact_info} socialData={options.social_links} />
        </>

    )
}
