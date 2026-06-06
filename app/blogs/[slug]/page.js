import { getSingleBlog, getOptions, getSinglePostData, getAllPosts } from '@/utils/fetchData'
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
import JsonLd from '@/components/UI/Meta/JsonLd'
import { SITE_URL, getBlogPostingSchema, getWebPageSchema, stripHtml } from '@/utils/schema'
import { getSeoMetadata } from '@/utils/metadata'

export async function generateStaticParams() {
  const posts = await getAllPosts("wp-json/wp/v2/posts")
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }) {
  const slug = params.slug
  const data = await getSinglePostData(slug, "/wp-json/wp/v2/posts")

  return getSeoMetadata({
    seoData: data?.[0]?.yoast_head_json,
    path: `/blogs/${slug}`,
    type: 'article',
  })
}

function countWords(text) {
    const plainText = stripHtml(text)
    return plainText ? plainText.split(/\s+/).length : 0
}

async function HeroSection({ slug }) {
    const data = await getSingleBlog(slug)

    if (!data.length) return null

    return (
        <BlogHero
            className="hero-section mt-16"
            videoID={data[0].acf.youtube_video_id || null}
            featuredImage={data[0].acf.blog_featured_image}
        />
    )
}

export default async function singleProject({ params }) {

    const slug = params.slug
    const data = await getSingleBlog(slug)
    const options = await getOptions()

    if (!data.length) return null
    const seoData = data[0].yoast_head_json

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
    const postUrl = `${SITE_URL}/blogs/${data[0].slug}`;
    const postTitle = data[0].title.rendered;
    const postDescription = data[0].excerpt.rendered;
    const jsonLd = [
        getWebPageSchema({
            path: `/blogs/${slug}`,
            name: seoData?.title,
            description: seoData?.description,
            image: seoData?.og_image,
        }),
        getBlogPostingSchema({
            path: `/blogs/${slug}`,
            headline: seoData?.title,
            description: seoData?.description,
            image: seoData?.og_image,
            datePublished: seoData?.article_published_time,
            dateModified: seoData?.article_modified_time,
            authorName: seoData?.author || `${metaData.authorFirstName} ${metaData.authorLastName}`,
            wordCount: countWords(data[0].content.rendered),
        }),
    ]

    return (
        <>
            <JsonLd data={jsonLd} idPrefix="blog-schema" />
            <Header />
            <main className={styles.blogMain} style={{ background: "var( --light-surface-container-lowest)" }}>
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
