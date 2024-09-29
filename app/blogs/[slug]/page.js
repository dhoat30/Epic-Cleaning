import { getSingleBlog, getOptions } from '@/utils/fetchData'
import SingleBlog from '@/components/Pages/BlogsPage/SingleBlog'
import { Suspense } from 'react'
import styles from './Blogs.module.css'
import BlogMetaInfo from '@/components/UI/Meta/BlogMetaInfo'
import BlogHero from '@/components/UI/Hero/BlogHero'
import Skeleton from '@/components/UI/Skeleton/Skeleton'
import BottomSocialShare from '@/components/UI/SocialShare/BottomSocialShare'
import BlogTableOfContent from '@/components/UI/TableOfContent/BlogTableOfContent'
import Header from '@/components/UI/Header/Header'
import Footer from '@/components/UI/Footer/Footer'
import BreadCrumb from '@/components/UI/BreadCrumb/BreadCrumb'

export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    const slug = params.slug

    // fetch data
    const data = await getSingleBlog(slug)

    // optionally access and extend (rather than replace) parent metadata
    // const previousImages = (await parent).openGraph?.images || []
    if (data.length > 0) {
        const seoData = data[0].yoast_head_json
        return {
            title: seoData.title,
            description: seoData.description,
            metadataBase: new URL('https://epiccleaning.co.nz'),
            openGraph: {
                title: seoData.title,
                description: seoData.description,
                url: `https://epiccleaning.co.nz/blogs/${slug}`,
                siteName: "epiccleaning.co.nz",
                images: [
                    {
                        url: seoData.og_image && seoData.og_image[0].url,
                        width: 800,
                        height: 600,
                    },
                    {
                        url: seoData?.og_image && seoData.og_image[0].url,
                        width: 1800,
                        height: 1600,
                    },
                ],
                type: 'article',
            },
        }
    }

}
function countWords(text) {
    // Remove any extra spaces and split the text into words
    const words = text.trim().split(/\s+/);
    return words.length;
}

export async function HeroSection({ slug }) {

    const data = await getSingleBlog(slug)
    if (!data.length) return null
    return (
        <BlogHero
            className="hero-section mt-16"
            videoID={data[0].acf.youtube_video_id ? data[0].acf.youtube_video_id : null}
            featuredImage={data[0].acf.blog_featured_image}
        />
    )
}
export default async function singleProject({ params }) {

    const slug = params.slug
    const data = await getSingleBlog(slug)
    const options = await getOptions()

    if (!data.length) return null

    //meta info 
    const metaData = {
        publishedDate: data[0].date_gmt,
        authorFirstName: data[0].acf.user.user_firstname,
        authorLastName: data[0].acf.user.user_lastname
    };

    let publishedDate = new Date(metaData.publishedDate);
    // Create an array of abbreviated month names
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    // Format the date in "9 Jul, 2024" format
    publishedDate = `${publishedDate.getDate()} ${months[publishedDate.getMonth()]}, ${publishedDate.getFullYear()}`;

    // share buttons 
    const postUrl = `${process.env.siteUrl}/blogs/ ${data[0].slug}`;
    const postTitle = data[0].title.rendered;
    const postDescription = data[0].excerpt.rendered;
    //schema data
    const jsonLd = {
        "@context": "http://schema.org",
        "@type": "BlogPosting",
        "headline": data[0].yoast_head_json.title,
        "name": data[0].yoast_head_json.title,
        "datePublished": data[0].yoast_head_json.article_published_time,
        "dateModified": data[0].yoast_head_json.article_modified_time,
        "description": data[0].yoast_head_json.description,
        "url": `${process.env.siteUrl} /blogs/${slug} `,
        "wordCount": `${countWords(data[0].content.rendered)} `,
        "image": [
            data[0].yoast_head_json?.og_image ? data[0].yoast_head_json.og_image[0].url : null,
        ],
        "author": {
            "@type": "Person",
            "name": data[0].yoast_head_json.author,
            "image": {
                "@type": "ImageObject",
                "@id": process.env.gurpreet,
                "url": process.env.gurpreet,
                "height": "96",
                "width": "96"
            }
        },
        "publisher": {
            "@type": "Organization",
            "@id": process.env.siteUrl,
            "name": process.env.name,
            "logo": {
                "@type": "ImageObject",
                "@id": process.env.darkLogo,
                "url": process.env.darkLogo
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${process.env.siteUrl} /blogs/${slug} `
        },

    }

    return (
        <>
            <Header />
            <main className={styles.blogMain} style={{ background: "var( --light-surface-container-low)" }}>

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />

                <section className={`container max-width-xl ${styles.wrapper}`}>
                    <BlogTableOfContent data={data[0].toc ? data[0].toc : null} />
                    <div className='main-content-wrapper'>
                        <BreadCrumb />
                        <div className="title-wrapper">
                            <h1
                                className="title h1 bold"
                            >
                                {data[0].title.rendered}
                            </h1>
                        </div>


                        <BlogMetaInfo
                            className='meta mt-16'
                            authorFirstName={metaData.authorFirstName}
                            authorLastName={metaData.authorLastName}
                            publishDate={publishedDate}
                            categoryDetails={data[0].category_details}
                        />
                        {/* hero image */}
                        <Suspense fallback={<Skeleton className="mt-16" height="56.25%" />}>
                            <HeroSection slug={slug} />
                        </Suspense>
                        <SingleBlog content={data[0].content.rendered} />
                        <BottomSocialShare
                            url={postUrl}
                            title={postTitle}
                            description={postDescription}
                        />
                    </div>

                </section>


            </main>
            <Footer footerCtaData={options.footer_cta} certifications={options.certifications} contactInfo={options.contact_info} socialData={options.social_links} />
        </>

    )
}


