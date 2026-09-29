import { getOptions, getSinglePostData } from '@/utils/fetchData'
import Header from '@/components/UI/Header/Header'
import Footer from '@/components/UI/Footer/Footer'
import USP from '@/components/UI/USP/USP'
import ResidentialQuotePage from '@/components/Pages/GetQuotePage/ResidentialQuotePage'
import JsonLd from '@/components/UI/Meta/JsonLd'
import { getWebPageSchema } from '@/utils/schema'
import { getSeoMetadata } from '@/utils/metadata'

const title = 'House Cleaning Services Tauranga | Free Quote | Epic Cleaning'
const description = 'House cleaning in Tauranga, Papamoa and Mount Maunganui. Regular cleans, deep cleans, oven, window and carpet cleaning. Get a free, no-obligation quote.'

export function generateMetadata() {
  return getSeoMetadata({ path: '/get-a-quote', title, description })
}

export default async function GetQuoteRoute() {
  const [options, galleryPage] = await Promise.all([
    getOptions(),
    getSinglePostData('gallery', '/wp-json/wp/v2/pages'),
  ])
  const gallery = galleryPage?.[0]?.acf?.gallery
  const beforeAfterItems = getResidentialResults(gallery)
  const jsonLd = getWebPageSchema({
    path: '/get-a-quote',
    name: title,
    description,
    type: 'ContactPage',
  })

  return (
    <>
      <JsonLd data={jsonLd} idPrefix="quote-schema" />
      <Header />
      <main>
        <ResidentialQuotePage stats={options.stats} contactInfo={options.contact_info} beforeAfterItems={beforeAfterItems} />
        <USP showTitle={true} statsArray={options.stats.items} cards={options.usp.items} title={options.usp.section_title} description={options.usp.section_description} />
      </main>
      <Footer footerCtaData={options.footer_cta} certifications={options.certifications} contactInfo={options.contact_info} socialData={options.social_links} showFooterCta={false} />
    </>
  )
}

function getResidentialResults(gallery) {
  if (!Array.isArray(gallery)) return []

  const services = [
    { tag: 'oven-cleaning', label: 'Oven cleaning' },
    { tag: 'shower-treatment', label: 'Shower treatment' },
    { tag: 'carpet-cleaning', label: 'Carpet cleaning' },
  ]

  return services.flatMap(({ tag, label }) => {
    const item = gallery.find((entry) =>
      entry?.tag?.value === tag && entry?.before_image?.url && entry?.after_image?.url
    )
    if (!item) return []

    return [{
      label,
      beforeImage: { url: item.before_image.url, alt: `${label} — before` },
      afterImage: { url: item.after_image.url, alt: `${label} — after` },
    }]
  })
}
