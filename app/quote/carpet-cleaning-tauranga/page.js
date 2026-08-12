import Header from "@/components/UI/Header/Header";
import Footer from "@/components/UI/Footer/Footer";
import JsonLd from "@/components/UI/Meta/JsonLd";
import CarpetCleaningQuotePage from "@/components/Pages/CarpetCleaningQuotePage/CarpetCleaningQuotePage";
import { getOptions, getSinglePostData } from "@/utils/fetchData";
import { getSeoMetadata } from "@/utils/metadata";
import { getServiceSchema, getWebPageSchema } from "@/utils/schema";

const pagePath = "/quote/carpet-cleaning";
const title = "Carpet Cleaning Quote Tauranga | Epic Cleaning";
const description =
  "Get a fast carpet cleaning quote in Tauranga for stain removal, odour treatment, and move-out carpet cleaning. IICRC-certified, insured, and locally owned.";

export async function generateMetadata() {
  return getSeoMetadata({
    path: pagePath,
    title,
    description,
  });
}

export default async function CarpetCleaningQuoteRoute() {
  const [options, galleryPage] = await Promise.all([
    getOptions(),
    getSinglePostData("gallery", "/wp-json/wp/v2/pages"),
  ]);
  const beforeAfterItems = getQuoteBeforeAfterItems(galleryPage?.[0]?.acf?.gallery);
  const pageSchema = getWebPageSchema({
    path: pagePath,
    name: "Carpet Cleaning Quote Tauranga",
    description,
    type: "ContactPage",
    idSuffix: "carpet-cleaning-quote",
  });
  const serviceSchema = getServiceSchema({
    path: pagePath,
    name: "Carpet Cleaning Tauranga",
    description,
    serviceType: "Carpet cleaning, stain treatment, and move-out carpet cleaning",
  });

  return (
    <>
      <Header />
      <JsonLd
        data={[pageSchema, serviceSchema]}
        idPrefix="carpet-cleaning-quote-schema"
      />
      <CarpetCleaningQuotePage
        beforeAfterItems={beforeAfterItems}
        accreditations={
          options?.hero_usp?.image_usp?.length
            ? options.hero_usp.image_usp
            : options?.certifications?.cards
        }
        stats={options?.stats}
        phoneNumber={process.env.NEXT_PUBLIC_PHONE}
      />
      <Footer
        showFooterCta={false}
        footerCtaData={options.footer_cta}
        certifications={options.certifications}
        contactInfo={options.contact_info}
        socialData={options.social_links}
      />
    </>
  );
}

const carpetGalleryMatches = [
  "carpet cleaning",
  "carpet",
  "stain removal",
  "stain",
  "odour",
  "odor",
];

function getQuoteBeforeAfterItems(galleryData = []) {
  if (!Array.isArray(galleryData)) return [];

  return galleryData
    .filter((galleryItem) => {
      const tagLabel = normalizeGalleryValue(galleryItem?.tag?.label);
      const tagValue = normalizeGalleryValue(galleryItem?.tag?.value);

      return (
        galleryItem?.before_image?.url &&
        galleryItem?.after_image?.url &&
        carpetGalleryMatches.some(
          (match) => tagLabel.includes(match) || tagValue.includes(match)
        )
      );
    })
    .slice(0, 6)
    .map((item, index) => ({
      label:
        item?.tag?.label ||
        item?.tag?.value ||
        `Carpet cleaning result ${index + 1}`,
      beforeImage: item.before_image,
      afterImage: item.after_image,
    }));
}

function normalizeGalleryValue(value = "") {
  return value.toString().toLowerCase().replace(/[-_]/g, " ").trim();
}
