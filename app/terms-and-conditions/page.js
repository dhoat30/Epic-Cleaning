import { getOptions, getSinglePostData } from '@/utils/fetchData'

import Header from '@/components/UI/Header/Header'
import Footer from '@/components/UI/Footer/Footer'
import HtmlPageTemplate from '@/components/UI/HtmlPageTemplate/HtmlPageTemplate'
import JsonLd from '@/components/UI/Meta/JsonLd'
import { getWebPageSchema } from '@/utils/schema'
import { getSeoMetadata } from '@/utils/metadata'


export async function generateMetadata() {
  const data = await getSinglePostData("terms-and-conditions", "/wp-json/wp/v2/pages")

  return getSeoMetadata({
    seoData: data?.[0]?.yoast_head_json,
    path: '/terms-and-conditions',
  })
}

export default async function Contact() {

    const postData = await getSinglePostData("terms-and-conditions", "/wp-json/wp/v2/pages")
    const options = await getOptions()
    if (!postData) {
        return {
            notFound: true,
        }
    }
    const seoData = postData[0]?.yoast_head_json
    const jsonLd = getWebPageSchema({
        path: '/terms-and-conditions',
        name: seoData?.title,
        description: seoData?.description,
        image: seoData?.og_image,
    })

    return (
        <>
            <JsonLd data={jsonLd} idPrefix="terms-schema" />
            <Header />
            <main>
                <HtmlPageTemplate pageData={postData[0]} />
            </main>
            <Footer footerCtaData={options.footer_cta} certifications={options.certifications} contactInfo={options.contact_info} socialData={options.social_links} showFooterCta={false} />
        </>
    )
}
