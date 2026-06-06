//import css file 
import './globals.css'
import './tokens.css'
// Import slick css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Work_Sans } from 'next/font/google'

import ClientProvider from '@/components/Providers/ClientProvider';
import JsonLd from '@/components/UI/Meta/JsonLd';
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_SOCIAL_IMAGE,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
} from '@/utils/metadata';
import {
  getLocalBusinessSchema,
  getOrganizationSchema,
  getWebsiteSchema,
} from '@/utils/schema';

import Script from 'next/script'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: DEFAULT_SOCIAL_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
    locale: 'en_NZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_SOCIAL_IMAGE],
  },
};

// fonts settings

const work_sans = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-work-sans',
  preload: true
})

export default function RootLayout({ children }) {
  const GTM_ID = 'GTM-NDXM6D'
  const schemaGraph = [
    getOrganizationSchema(),
    getLocalBusinessSchema(),
    getWebsiteSchema(),
  ];



  return (
    <html lang="en-NZ" className={`${work_sans.variable}`}>
      <Script
          id="gtm-script"
          strategy="lazyOnload" // or "lazyOnload" if you prefer
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s);j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i;
              f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `
          }}
        />
      <body >
        <JsonLd data={schemaGraph} idPrefix="site-schema" />
               {/* 3) GTM noscript fallback */}
               <noscript>
          <iframe 
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} 
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
            loading='lazy'
          />
        </noscript>
        
      <ClientProvider>
          {children}
        </ClientProvider>

      </body>
    </html>
  )
}
