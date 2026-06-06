export const SITE_URL = 'https://epiccleaning.co.nz';
export const SITE_NAME = 'Epic Cleaning Tauranga';
export const BUSINESS_NAME = 'Epic Cleaning';
export const LOGO_URL = `${SITE_URL}/logo.png`;

export const SAME_AS = [
  'https://www.facebook.com/profile.php?id=61564460975703',
  'https://www.instagram.com/epic_cleaning_tauranga/',
  'https://www.youtube.com/@EpicCleaningTauranga',
];

export const ORGANIZATION_ID = `${SITE_URL}#organization`;
export const WEBSITE_ID = `${SITE_URL}#website`;
export const LOCAL_BUSINESS_ID = `${SITE_URL}#localbusiness`;
export const DEFAULT_RATING = {
  ratingValue: '4.9',
  bestRating: '5',
  reviewCount: '90',
  worstRating: '1',
};

export const CLEANING_SERVICE_TYPES = [
  'Residential cleaning',
  'Commercial cleaning',
  'Industrial cleaning',
  'Carpet cleaning',
  'Builders cleaning',
  'Office cleaning',
];

export const absoluteUrl = (path = '/') => {
  if (!path) return SITE_URL;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;

  return new URL(path, SITE_URL).toString();
};

export const stripHtml = (value = '') =>
  value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();

export const getPrimaryImageUrl = (value) => {
  if (!value) return null;

  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value)) {
    return getPrimaryImageUrl(value[0]);
  }

  if (typeof value === 'object') {
    return value.url || value.src || null;
  }

  return null;
};

export const getBreadcrumbName = (segment = '') =>
  segment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

export const getBreadcrumbItems = (path = '/') => {
  const url = new URL(path || '/', SITE_URL);
  const segments = url.pathname.split('/').filter(Boolean);

  return [
    {
      name: 'Home',
      path: '/',
    },
    ...segments.map((segment, index) => ({
      name: getBreadcrumbName(segment),
      path: `/${segments.slice(0, index + 1).join('/')}`,
    })),
  ];
};

export const getBreadcrumbListSchema = (path = '/') => ({
  '@type': 'BreadcrumbList',
  '@id': `${absoluteUrl(path)}#breadcrumb`,
  itemListElement: getBreadcrumbItems(path).map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: LOGO_URL,
  },
  sameAs: SAME_AS,
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      telephone: '+64-800-080-056',
      email: 'admin@epiccleaning.co.nz',
      areaServed: 'NZ',
      availableLanguage: 'en',
    },
  ],
  award: 'IICRC certified cleaning company',
});

export const getLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'CleaningService'],
  '@id': LOCAL_BUSINESS_ID,
  name: SITE_NAME,
  telephone: '+64-800-080-056',
  email: 'admin@epiccleaning.co.nz',
  description:
    'Epic Cleaning offers professional residential, commercial, and industrial cleaning services in Tauranga.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '20 Landing Drive, Pyes Pa',
    addressLocality: 'Tauranga',
    addressRegion: 'Bay of Plenty',
    postalCode: '3112',
    addressCountry: 'NZ',
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Tauranga',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Bay of Plenty',
    },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '07:00',
      closes: '18:00',
    },
  ],
  priceRange: '$$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ...DEFAULT_RATING,
  },
  makesOffer: CLEANING_SERVICE_TYPES.map((name) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name,
      provider: {
        '@id': LOCAL_BUSINESS_ID,
      },
      areaServed: {
        '@type': 'City',
        name: 'Tauranga',
      },
    },
  })),
  parentOrganization: {
    '@id': ORGANIZATION_ID,
  },
});

export const getWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: {
    '@id': ORGANIZATION_ID,
  },
  inLanguage: 'en-NZ',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/blogs?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

export const getWebPageSchema = ({
  path,
  name,
  description,
  image,
  type = 'WebPage',
  idSuffix = 'webpage',
  mainEntity,
}) => {
  const url = absoluteUrl(path);
  const primaryImage = getPrimaryImageUrl(image);

  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${url}#${idSuffix}`,
    url,
    name,
    description,
    isPartOf: {
      '@id': WEBSITE_ID,
    },
    about: {
      '@id': LOCAL_BUSINESS_ID,
    },
    breadcrumb: getBreadcrumbListSchema(path),
    inLanguage: 'en-NZ',
    ...(primaryImage && {
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: primaryImage,
      },
    }),
    ...(mainEntity && { mainEntity }),
  };
};

export const getCollectionPageSchema = ({
  path,
  name,
  description,
  image,
  items = [],
}) =>
  getWebPageSchema({
    path,
    name,
    description,
    image,
    type: 'CollectionPage',
    mainEntity: items.length
      ? {
          '@type': 'ItemList',
          itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            url: absoluteUrl(item.path),
          })),
        }
      : undefined,
  });

export const getServiceSchema = ({
  path,
  name,
  description,
  image,
  serviceType,
}) => {
  const url = absoluteUrl(path);
  const primaryImage = getPrimaryImageUrl(image);

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    url,
    name,
    description,
    serviceType: serviceType || name,
    provider: {
      '@id': LOCAL_BUSINESS_ID,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ...DEFAULT_RATING,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Tauranga, Bay of Plenty, New Zealand',
    },
    ...(primaryImage && { image: primaryImage }),
  };
};

export const getFAQPageSchema = ({
  path,
  name,
  description,
  image,
  idSuffix = 'webpage',
  questions = [],
}) =>
  getWebPageSchema({
    path,
    name,
    description,
    image,
    type: 'FAQPage',
    idSuffix,
    mainEntity: questions.map((item) => ({
      '@type': 'Question',
      name: stripHtml(item.question),
      acceptedAnswer: {
        '@type': 'Answer',
        text: stripHtml(item.answer),
      },
    })),
  });

export const getBlogPostingSchema = ({
  path,
  headline,
  description,
  image,
  datePublished,
  dateModified,
  authorName,
  wordCount,
}) => {
  const url = absoluteUrl(path);
  const primaryImage = getPrimaryImageUrl(image);

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#blogposting`,
    headline,
    name: headline,
    description,
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
    },
    datePublished,
    dateModified,
    wordCount,
    ...(primaryImage && { image: [primaryImage] }),
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@id': ORGANIZATION_ID,
    },
  };
};
