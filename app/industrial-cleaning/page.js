import { getOptions, getSinglePostData, getAllPosts, getGoogleReviews } from '@/utils/fetchData'
import Layout from '@/components/UI/Layout/Layout'
import OptimizedHero from '@/components/UI/Hero/OptimizedHero/OptimizedHero'
import TechLogos from '@/components/UI/TechLogos/TechLogos'
import USP from '@/components/UI/USP/USP'
import Header from '@/components/UI/Header/Header'
import Footer from '@/components/UI/Footer/Footer'
import ServicesCardsTemplate from '@/components/UI/Services/ServicesCardsTemplate'
import GoogleReviewsCarousel from '@/components/UI/GoogleReviews/GoogleReviewsCarousel'


export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    const slug = params.slug

    // fetch data
    const data = await getSinglePostData("industrial-cleaning", "/wp-json/wp/v2/pages")

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []
    if (data.length > 0) {
        const seoData = data[0].yoast_head_json
        return {
            title: seoData.title,
            description: seoData.description,
            metadataBase: new URL('https://epiccleaning.co.nz'),
            openGraph: {
                title: seoData.title,
                description: seoData.description,
                url: 'https://epiccleaning.co.nz',
                siteName: 'Epic Cleaning Tauranga',
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
    const postData = await getSinglePostData("industrial-cleaning", "/wp-json/wp/v2/pages")
    const allPosts = await getAllPosts("wp-json/wp/v2/industrial-cleaning")
    const options = await getOptions()
    if (!postData) {
        return {
            notFound: true,
        }
    }
// google reviews data fetch 
const googleReviewsData = await getGoogleReviews()  
    return (
      <>
        <Header />
        <main>
          <OptimizedHero
            data={postData[0]?.acf?.hero_section}
            heroUSP={options.hero_usp}
          />
          <TechLogos data={options.clients_logos} />
          <ServicesCardsTemplate
            title={postData[0]?.acf?.service_cards_section?.title}
            description={postData[0]?.acf?.service_cards_section?.description}
            cards={allPosts}
            archivePageSlug="industrial-cleaning"
          />
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
