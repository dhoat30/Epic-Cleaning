import Header from '@/components/UI/Header/Header';
import ThankYou from '@/components/UI/ThankYou/ThankYou';
import { getSeoMetadata } from '@/utils/metadata';

export const metadata = {
    ...getSeoMetadata({
        path: '/form-submitted/thank-you',
        title: 'Thank You',
        description: 'Thank you for contacting Epic Cleaning.',
    }),
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
                <ThankYou />
            </main>
        </>

    )
}
