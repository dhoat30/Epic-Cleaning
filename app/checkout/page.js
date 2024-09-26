import Checkout from '@/components/Pages/Checkout/Checkout'
import Contact from '@/components/Pages/Contact/Contact'
import { getPageData, getOptions, getServicePackages } from '@/utils/fetchData'



export const metadata = {
    metadataBase: new URL('https://webduel.co.nz'),
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

export default async function Page() {

    const allServicePackages = await getServicePackages()

    return (
        <>
            <main >
                <Checkout servicePackages={allServicePackages} />
            </main>
        </>

    )
}
