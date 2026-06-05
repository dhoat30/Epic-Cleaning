import { getOptions, getSinglePostData, getGoogleReviews } from '@/utils/fetchData'
import Layout from '@/components/UI/Layout/Layout'
import OptimizedHero from '@/components/UI/Hero/OptimizedHero/OptimizedHero'
import TechLogos from '@/components/UI/TechLogos/TechLogos'
import USP from '@/components/UI/USP/USP'
import Header from '@/components/UI/Header/Header'
import Footer from '@/components/UI/Footer/Footer'
import GoogleReviewsCarousel from '@/components/UI/GoogleReviews/GoogleReviewsCarousel'
import JsonLd from '@/components/UI/Meta/JsonLd'
import { getServiceSchema, getWebPageSchema } from '@/utils/schema'
import { getSeoMetadata } from '@/utils/metadata'


export async function generateMetadata({ params }) {
  const slug = params.slug
  const data = await getSinglePostData(slug, "/wp-json/wp/v2/industrial-cleaning")

  return getSeoMetadata({
    seoData: data?.[0]?.yoast_head_json,
    path: `/industrial-cleaning/${slug}`,
    type: 'website',
  })
}

export default async function Contact({ params }) {
    const slug = params.slug

    const postData = await getSinglePostData(slug, "/wp-json/wp/v2/industrial-cleaning")
    const options = await getOptions()
    if (!postData) {
        return {
            notFound: true,
        }
    }
    const seoData = postData[0]?.yoast_head_json
    const jsonLd = [
      getWebPageSchema({
        path: `/industrial-cleaning/${slug}`,
        name: seoData?.title,
        description: seoData?.description,
        image: seoData?.og_image,
      }),
      getServiceSchema({
        path: `/industrial-cleaning/${slug}`,
        name: postData[0]?.title?.rendered || seoData?.title,
        description: seoData?.description,
        image: seoData?.og_image,
        serviceType: postData[0]?.title?.rendered,
      }),
    ]
    // google reviews data fetch 
  const googleReviewsData = await getGoogleReviews()  
    return (
      <>
        <JsonLd data={jsonLd} idPrefix="industrial-service-schema" />
        <Header />
        <main>
          <OptimizedHero
            data={postData[0]?.acf?.hero_section}
            heroUSP={options.hero_usp}
          />
          <TechLogos data={options.clients_logos} />
          <Layout sections={postData[0]?.acf?.sections} />
          <USP
            showTitle={true}
            statsArray={options.stats.items}
            cards={options.usp.items}
            title={options.usp.section_title}
            description={options.usp.section_description}
          />
          <GoogleReviewsCarousel data={googleReviewsData} />
        </main>
        <Footer
          footerCtaData={options.footer_cta}
          certifications={options.certifications}
          contactInfo={options.contact_info}
          socialData={options.social_links}
        />
      </>
    );
}
