import { getOptions, getSinglePostData } from "@/utils/fetchData";
import { getSeoMetadata } from "@/utils/metadata";
import { getWebPageSchema } from "@/utils/schema";
import JsonLd from "@/components/UI/Meta/JsonLd";
import CommercialCleaningQuotePage from "@/components/Pages/CommercialCleaningQuotePage/CommercialCleaningQuotePage";
import { notFound } from "next/navigation";
import Header from "@/components/UI/Header/Header";
import Footer from "@/components/UI/Footer/Footer";
const pagePath = "/commercial-cleaning-quote";
const pageSlug = "commercial-cleaning-quote";

export async function generateMetadata() {
  const data = await getSinglePostData(pageSlug, "/wp-json/wp/v2/pages");

  return getSeoMetadata({
    seoData: data?.[0]?.yoast_head_json,
    path: pagePath,
    title: "Get a Fixed Quote for Commercial Cleaning in 24 Hours",
    description:
      "Offices, retail, restaurants, schools and more across Tauranga and the Bay of Plenty. No 12-month contracts. No subcontracting.",
  });
}

export default async function CommercialCleaningQuoteRoute() {
  const [postData, options] = await Promise.all([
    getSinglePostData(pageSlug, "/wp-json/wp/v2/pages"),
    getOptions(),
  ]);

  if (!postData?.length) {
    notFound();
  }

  const pageData = postData[0];
  const seoData = pageData?.yoast_head_json;
  const jsonLd = getWebPageSchema({
    path: pagePath,
    name: seoData?.title || "Commercial Cleaning Quote",
    description:
      seoData?.description ||
      "Get a fixed quote for commercial cleaning in Tauranga within 24 hours.",
    image: seoData?.og_image,
    type: "ContactPage",
    idSuffix: "commercial-cleaning-quote",
  });

  return (
    <>
    <Header/> 
      <JsonLd data={jsonLd} idPrefix="commercial-cleaning-quote-schema" />
      <CommercialCleaningQuotePage
        pageData={pageData}
        accreditations={
          options?.hero_usp?.image_usp?.length
            ? options.hero_usp.image_usp
            : options?.certifications?.cards
        }
        stats={options?.stats}
        phoneNumber={process.env.NEXT_PUBLIC_PHONE}
      />
      <Footer showFooterCta={false} footerCtaData={options.footer_cta} certifications={options.certifications} contactInfo={options.contact_info} socialData={options.social_links} />
    </>
  );
}
