import { getAllPosts, getOptions, getSinglePostData, getSinglePostDataWithID, getSingleServicePackage } from '@/utils/fetchData'
import Layout from '@/components/UI/Layout/Layout'
import OptimizedHero from '@/components/UI/Hero/OptimizedHero/OptimizedHero'
import TechLogos from '@/components/UI/TechLogos/TechLogos'
import USP from '@/components/UI/USP/USP'
import Header from '@/components/UI/Header/Header'
import Footer from '@/components/UI/Footer/Footer'
import ServiceSelectorTabs from '@/components/UI/Tabs/ServicesSelectorTabs/ServiceSelectorTabs'
import FaqAccordionSection from '@/components/UI/Layout/Sections/FaqAccordionSection/FaqAccordionSection'
import BlogsArchive from '@/components/Pages/BlogsPage/BlogsArchive'
import JsonLd from '@/components/UI/Meta/JsonLd'
import { getCollectionPageSchema } from '@/utils/schema'
import { getSeoMetadata } from '@/utils/metadata'


export async function generateMetadata() {
  const data = await getSinglePostData("blogs", "/wp-json/wp/v2/pages")

  return getSeoMetadata({
    seoData: data?.[0]?.yoast_head_json,
    path: '/blogs',
  })
}

export default async function Page({ searchParams }) {

    const postData = await getSinglePostData("blogs", "/wp-json/wp/v2/pages")
    const options = await getOptions()
    if (!postData) {
        return {
            notFound: true,
        }
    }

    // get all blogs 
    const allBlogsData = await getAllPosts("wp-json/wp/v2/posts")
    const seoData = postData[0]?.yoast_head_json
    const jsonLd = getCollectionPageSchema({
        path: '/blogs',
        name: seoData?.title,
        description: seoData?.description,
        image: seoData?.og_image,
        items: allBlogsData.map((blog) => ({
            name: blog.title.rendered,
            path: `/blogs/${blog.slug}`,
        })),
    })



    return (
        <>
            <JsonLd data={jsonLd} idPrefix="blogs-schema" />
            <Header />
            <main>
                <BlogsArchive blogsData={allBlogsData} searchQuery={searchParams?.search} />

                <TechLogos data={options.clients_logos} />
                <Layout sections={postData[0]?.acf?.sections} />
                <USP showTitle={true} statsArray={options.stats.items} cards={options.usp.items} title={options.usp.section_title} description={options.usp.section_description} />
                <FaqAccordionSection title={options.faq.section_title} description={options.faq.section_description} qaData={options.faq.items} />
            </main>
            <Footer footerCtaData={options.footer_cta} certifications={options.certifications} contactInfo={options.contact_info} socialData={options.social_links} />
        </>

    )
}
