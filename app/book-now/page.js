import Checkout from '@/components/Pages/Checkout/Checkout'
import Footer from '@/components/UI/Footer/Footer';
import Header from '@/components/UI/Header/Header';
import { getOptions, getSinglePostData, getAllPosts, getSingleServicePackage } from '@/utils/fetchData'



export const metadata = {
    metadataBase: new URL('https://epiccleaning.co.nz'),
    title: 'Checkout | webduel',
    robots: {
        index: false,
        follow: true,
        nocache: true,
        googleBot: {
            index: false,
            follow: true,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default async function Page({ searchParams }) {
    const options = await getOptions()
    const { serviceName, packageName, price, description } = searchParams
    return (
        <>
            <Header />
            <main >
                <Checkout serviceName={serviceName} packageName={packageName} price={price} description={description} />
            </main>
            <Footer footerCtaData={options.footer_cta} certifications={options.certifications} contactInfo={options.contact_info} socialData={options.social_links} showFooterCta={false} />
        </>

    )
}
