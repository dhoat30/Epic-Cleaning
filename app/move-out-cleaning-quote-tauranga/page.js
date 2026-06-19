import Header from "@/components/UI/Header/Header";
import Footer from "@/components/UI/Footer/Footer";
import JsonLd from "@/components/UI/Meta/JsonLd";
import MoveOutCleaningQuotePage from "@/components/Pages/MoveOutCleaningQuotePage/MoveOutCleaningQuotePage";
import { getOptions, getSinglePostData } from "@/utils/fetchData";
import { getSeoMetadata } from "@/utils/metadata";
import { getServiceSchema, getWebPageSchema } from "@/utils/schema";

const pagePath = "/move-out-cleaning-quote-tauranga";
const title = "Move-Out & Move-In Cleaning Quote Tauranga | Epic Cleaning";
const description =
  "Get a fast quote for move-out cleaning, move-in cleaning, and carpet shampoo in Tauranga. IICRC-certified, insured, and locally owned.";

export async function generateMetadata() {
  return getSeoMetadata({
    path: pagePath,
    title,
    description,
  });
}

export default async function MoveOutCleaningQuoteRoute() {
  const [options, galleryPage] = await Promise.all([
    getOptions(),
    getSinglePostData("gallery", "/wp-json/wp/v2/pages"),
  ]);
  const beforeAfterItems = getQuoteBeforeAfterItems(
    galleryPage?.[0]?.acf?.gallery
  );
  const pageSchema = getWebPageSchema({
    path: pagePath,
    name: "Move-Out Cleaning Quote Tauranga",
    description,
    type: "ContactPage",
    idSuffix: "move-out-cleaning-quote",
  });
  const serviceSchema = getServiceSchema({
    path: pagePath,
    name: "Move-Out Cleaning Tauranga",
    description,
    serviceType: "Move-out cleaning, move-in cleaning, and carpet cleaning",
  });

  return (
    <>
      <Header />
      <JsonLd
        data={[pageSchema, serviceSchema]}
        idPrefix="move-out-cleaning-quote-schema"
      />
      <MoveOutCleaningQuotePage
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

const beforeAfterTargets = [
  {
    label: "Oven cleaning",
    match: ["oven cleaning"],
  },
  {
    label: "Carpet cleaning",
    match: ["carpet cleaning"],
  },
  {
    label: "Vinyl strip & polish",
    match: ["vinyl strip polish", "vinyl strip", "vinyl"],
  },
  {
    label: "Shower treatment",
    match: ["shower treatment"],
  },
  {
    label: "Dusting",
    match: ["dusting"],
  },
  {
    label: "Stain removal",
    match: ["stain removal"],
  },
];

function getQuoteBeforeAfterItems(galleryData = []) {
  if (!Array.isArray(galleryData)) return [];

  return beforeAfterTargets
    .map((target) => {
      const item = galleryData.find((galleryItem) => {
        const tagLabel = normalizeGalleryValue(galleryItem?.tag?.label);
        const tagValue = normalizeGalleryValue(galleryItem?.tag?.value);

        return (
          galleryItem?.before_image?.url &&
          galleryItem?.after_image?.url &&
          target.match.some(
            (match) => tagLabel.includes(match) || tagValue.includes(match)
          )
        );
      });

      if (!item) return null;

      return {
        label: target.label,
        beforeImage: item.before_image,
        afterImage: item.after_image,
      };
    })
    .filter(Boolean);
}

function normalizeGalleryValue(value = "") {
  return value.toString().toLowerCase().replace(/[-_]/g, " ").trim();
}
