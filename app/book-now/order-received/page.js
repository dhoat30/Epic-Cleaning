import Header from '@/components/UI/Header/Header';
import ThankYou from '@/components/UI/ThankYou/ThankYou';

export const metadata = {
    metadataBase: new URL('https://epiccleaning.co.nz'),
    title: 'Thank You',
       alternates: {
        canonical: `/order-received`,
    },
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
            <Header />
            <main>

                <ThankYou title="Thank You for Your Order!" description="We have received your order and are currently processing it." />
            </main>
        </>

    )
}
