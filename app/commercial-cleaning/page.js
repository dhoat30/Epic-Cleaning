import { getOptions, getSinglePostData, getAllPosts, getSingleServicePackage, getGoogleReviews } from '@/utils/fetchData'
import Layout from '@/components/UI/Layout/Layout'
import OptimizedHero from '@/components/UI/Hero/OptimizedHero/OptimizedHero'
import TechLogos from '@/components/UI/TechLogos/TechLogos'
import USP from '@/components/UI/USP/USP'
import Header from '@/components/UI/Header/Header'
import Footer from '@/components/UI/Footer/Footer'
import ServicesCardsTemplate from '@/components/UI/Services/ServicesCardsTemplate'
import GoogleReviewsCarousel from '@/components/UI/GoogleReviews/GoogleReviewsCarousel'
import JsonLd from '@/components/UI/Meta/JsonLd'
import { getCollectionPageSchema } from '@/utils/schema'
import { getSeoMetadata } from '@/utils/metadata'


export async function generateMetadata() {
  const data = await getSinglePostData("commercial-cleaning", "/wp-json/wp/v2/pages")

  return getSeoMetadata({
    seoData: data?.[0]?.yoast_head_json,
    path: '/commercial-cleaning',
  })
}

export default async function Contact({ params }) {
    const slug = params.slug
    const postData = await getSinglePostData("commercial-cleaning", "/wp-json/wp/v2/pages")
    const allPosts = await getAllPosts("wp-json/wp/v2/commercial-cleaning")
    const options = await getOptions()
    if (!postData) {
        return {
            notFound: true,
        }
    }
    const googleReviewsData = await getGoogleReviews() 
    const seoData = postData[0]?.yoast_head_json
    const jsonLd = getCollectionPageSchema({
        path: '/commercial-cleaning',
        name: seoData?.title,
        description: seoData?.description,
        image: seoData?.og_image,
        items: allPosts.map((post) => ({
            name: post.title.rendered,
            path: `/commercial-cleaning/${post.slug}`,
        })),
    })
    return (
        <>
            <JsonLd data={jsonLd} idPrefix="commercial-archive-schema" />
            <Header />
            <main>
                <OptimizedHero data={postData[0]?.acf?.hero_section} heroUSP={options.hero_usp} />
                <TechLogos data={options.clients_logos} />
                <ServicesCardsTemplate title={postData[0]?.acf.service_cards_section.title} description={postData[0]?.acf.service_cards_section.description} cards={allPosts} archivePageSlug="commercial-cleaning" />
                <Layout sections={postData[0]?.acf?.sections} />
                <USP showTitle={true} statsArray={options.stats.items} cards={options.usp.items} title={options.usp.section_title} description={options.usp.section_description} />
                <GoogleReviewsCarousel data={googleReviewsData} />
            </main>
            <Footer footerCtaData={options.footer_cta} certifications={options.certifications} contactInfo={options.contact_info} socialData={options.social_links} />
        </>

    )
}
