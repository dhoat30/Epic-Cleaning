export const SITE_URL = 'https://epiccleaning.co.nz';
export const SITE_NAME = 'Epic Cleaning Tauranga';
export const DEFAULT_TITLE = 'Cleaning Services Tauranga - Epic Cleaning Services';
export const DEFAULT_DESCRIPTION =
  'Professional residential, commercial, and industrial cleaning services in Tauranga and the Bay of Plenty.';
export const DEFAULT_SOCIAL_IMAGE = '/logo.png';

export const getSeoImageUrl = (seoData) =>
  seoData?.og_image?.[0]?.url || DEFAULT_SOCIAL_IMAGE;

export const getSeoMetadata = ({
  seoData,
  path = '/',
  type = 'website',
  title: fallbackTitle = DEFAULT_TITLE,
  description: fallbackDescription = DEFAULT_DESCRIPTION,
}) => {
  const title = seoData?.title || fallbackTitle;
  const description = seoData?.description || fallbackDescription;
  const imageUrl = getSeoImageUrl(seoData);
  const url = new URL(path, SITE_URL).toString();

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_NZ',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
};
