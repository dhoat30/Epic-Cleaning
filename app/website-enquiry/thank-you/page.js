import ThankYou from '@/components/UI/ThankYou/ThankYou';
import { getPageData } from '@/utils/fetchData'

export const metadata = {
    metadataBase: new URL('https://webduel.co.nz'),
    title: 'Thank You',
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
    const data = await getPageData("website-enquiry")
    return (
        <>
            <main>
                <ThankYou />
            </main>
        </>

    )
}
