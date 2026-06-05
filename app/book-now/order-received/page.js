import Header from '@/components/UI/Header/Header';
import ThankYou from '@/components/UI/ThankYou/ThankYou';
import { getSeoMetadata } from '@/utils/metadata';

export const metadata = {
    ...getSeoMetadata({
        path: '/book-now/order-received',
        title: 'Thank You for Your Order!',
        description: 'Epic Cleaning has received your order.',
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

                <ThankYou title="Thank You for Your Order!" description="We have received your order and are currently processing it." />
            </main>
        </>

    )
}
