import GetQuotePage from "@/components/Pages/GetQuotePage/GetQuotePage"
export const metadata = {
    title: "Get an Instant Quote for Your Project | webduel Tauranga",
    description: "Looking to transform your ideas into reality? Detail your project requirements with webduel's Instant Quote form! Receive precise, competitive pricing fast, and start building your dream project today.",
    metadataBase: new URL('https://webduel.co.nz'),
    alternates: {
        canonical: `https://webduel.co.nz/get-a-quote`,
    },
    openGraph: {
        title: "Get an Instant Quote for Your Project | WebDuel Tauranga",
        description: "Looking to transform your ideas into reality? Detail your project requirements with Webduel's Instant Quote form! Receive precise, competitive pricing fast, and start building your dream project today.",
        metadataBase: new URL('https://webduel.co.nz'),
        url: 'https://webduel.co.nz',
        siteName: 'webduel',
        images: [
            {
                url: "/black-logo.jpg",
                width: 800,
                height: 600,
            },

        ],
        type: 'website',
    },
}
export default function Home() {
    return (
        <>
            <main >
                <GetQuotePage />
            </main>
        </>

    )
}
