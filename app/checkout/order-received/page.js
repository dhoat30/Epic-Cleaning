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

    return (
        <>
            <main>
                <ThankYou title="Thank You for Your Order!" description="We have received your order and are currently processing it. A confirmation email has been sent to your registered email address containing the details of your order and a unique order ID for your reference." />
            </main>
        </>

    )
}
