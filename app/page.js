import { getAllPosts, getOptions, getSinglePostData, getSinglePostDataWithID, getSingleServicePackage, getGoogleReviews } from '@/utils/fetchData'
import Layout from '@/components/UI/Layout/Layout'
import OptimizedHero from '@/components/UI/Hero/OptimizedHero/OptimizedHero'
import TechLogos from '@/components/UI/TechLogos/TechLogos'
import USP from '@/components/UI/USP/USP'
import Header from '@/components/UI/Header/Header'
import Footer from '@/components/UI/Footer/Footer'
import ServiceSelectorTabs from '@/components/UI/Tabs/ServicesSelectorTabs/ServiceSelectorTabs'
import FaqAccordionSection from '@/components/UI/Layout/Sections/FaqAccordionSection'
import BlogsArchive from '@/components/Pages/BlogsPage/BlogsArchive'
import GoogleReviewsCarousel from '@/components/UI/GoogleReviews/GoogleReviewsCarousel'


export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const slug = params.slug

  // fetch data
  const data = await getSinglePostData("home", "/wp-json/wp/v2/pages")


  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
  if (data.length > 0) {
    const seoData = data[0].yoast_head_json
    return {
      title: seoData?.title,
      description: seoData?.description,
      metadataBase: new URL('https://epiccleaning.co.nz'),
      openGraph: {
        title: seoData?.title,
        description: seoData?.description,
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

export default async function Page() {

  const postData = await getSinglePostData("home", "/wp-json/wp/v2/pages")
  const options = await getOptions()


  if (!postData) {
    return {
      notFound: true,
    }
  }
// google reviews data fetch 
  const googleReviewsData = await getGoogleReviews()  

  // Fetching the residential cleaning services IDs
  const residentialServicesIDs = postData[0]?.acf?.services_selector.residential_services
  // Fetching the residential cleaning services data based on IDs
  const residentialServices = await Promise.all(
    residentialServicesIDs?.map(async (id) => {
      return await getSinglePostDataWithID(id, "wp-json/wp/v2/residential-cleaning");
    })
  );


  //fetching the commercial cleaning services IDs
  const commercialServicesIDs = postData[0]?.acf?.services_selector.commercial_services
  // Fetching the commercial cleaning services data based on IDs
  const commercialServices = await Promise.all(
    commercialServicesIDs?.map(async (id) => {
      return await getSinglePostDataWithID(id, "wp-json/wp/v2/commercial-cleaning");
    })
  );

  //fetching the industrial cleaning services IDs
  const industrialServicesIDs = postData[0]?.acf?.services_selector.industrial_services
  // Fetching the industrial cleaning services data based on IDs
  const industrialServices = await Promise.all(
    industrialServicesIDs.map(async (id) => {
      return await getSinglePostDataWithID(id, "wp-json/wp/v2/industrial-cleaning");
    })
  );

  // get all blogs 
  const allBlogsData = await getAllPosts("wp-json/wp/v2/posts")
  return (
    <>
      <Header />
      <main>
        <OptimizedHero data={postData[0]?.acf?.hero_section} heroUSP={options.hero_usp} />
        <TechLogos data={options.clients_logos} />
        <GoogleReviewsCarousel data={googleReviewsData}/>

        <ServiceSelectorTabs residentialServicesData={residentialServices} commercialServicesData={commercialServices} industrialServicesData={industrialServices} title={postData[0]?.acf?.services_selector.title} description={postData[0]?.acf?.services_selector.description} />
        <Layout sections={postData[0]?.acf?.sections} />
        <USP showTitle={true} statsArray={options.stats.items} cards={options.usp.items} title={options.usp.section_title} description={options.usp.section_description} />
        <FaqAccordionSection title={options.faq.section_title} description={options.faq.section_description} qaData={options.faq.items} />
        <BlogsArchive blogsData={allBlogsData} sectionUI={true} show={3} />
      </main>
      <Footer footerCtaData={options.footer_cta} certifications={options.certifications} contactInfo={options.contact_info} socialData={options.social_links} />
    </>
  )
}
