import HomePage from '@/components/Pages/HomePage'
import Hero from '@/components/UI/Hero/Hero';
import { getOptions, getPageData } from "@/utils/fetchData";

import OptimizedHero from '@/components/UI/Hero/OptimizedHero/OptimizedHero';


export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  // const id = params.id

  // fetch data
  const data = await getPageData("home-page");

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []
  if (!data.length) return {}
  const seoData = data[0].yoast_head_json
  return {
    title: seoData.title,
    description: seoData.description,
    metadataBase: new URL('https://webduel.co.nz'),
    alternates: {
      canonical: `https://webduel.co.nz`,
    },
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      url: 'https://webduel.co.nz',
      siteName: 'webduel',

      images: [
        {
          url: seoData?.og_image[0] && seoData.og_image[0].url,
          width: 800,
          height: 600,
        },
        {
          url: seoData?.og_image[0] && seoData.og_image[0].url,
          width: 1800,
          height: 1600,
        },
      ],
      type: 'website',
    },
  }
}


export default async function Home() {
  const data = await getPageData("home-page");
  const options = await getOptions()
  return (
    <>
      <main >
        <OptimizedHero slug="home-page" />
        {/* <HomePage data={data} techLogos={options.tech_logos} /> */}
      </main>

    </>

  )
}
