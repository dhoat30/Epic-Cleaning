import { Suspense } from "react";
import Skeleton from "../../Skeleton/Skeleton";
import HeroContent from "./HeroContent";
import styles from './Hero.module.css'
import HeroImage from "./HeroImage";
import Video from "../../Video/Video";
import BeforeAfter from "../../BeforeAfterSlider/BeforeAfter";
import AccreditationStrip from "./AccreditationStrip";

export default async function OptimizedHero({ data, heroUSP }) {
    if (!data || !data.image) return null
    console.log(data.before_after_images?.after_image)

    const heroData = {
        subtitle: data.subtitle,
        title: data.title,
        description: data.description,
        image: data.image,
        ctaArray: data.buttons,
    };
    let graphicComponent = null;
    if (data.show_video) {
        if (data.video_options === "enter_youtube_id") {
            if (data.youtube_id) {
                graphicComponent = <Video videoID={data.youtube_id} placeholderImage={data.image} showCompressedImage={true} />
            }
        }
    }
    else if (data.show_before_after_images) {
        const beforeAfterImage = {
            beforeImage: data.before_after_images?.before_image,
            afterImage: data.before_after_images?.after_image
        }
        graphicComponent = <div className="border-radius-12 overflow-hidden"><BeforeAfter data={beforeAfterImage} /></div>
    }
    else {
        graphicComponent = <HeroImage image={data.image} />
    }
    return (
        <>
            <section className={`${styles.heroSection}`}>
                <div className={`${styles.container} max-width-xl`}>
                    <HeroContent
                        className={styles.heroContent}
                        title={heroData.title}
                        subtitle={heroData.subtitle}
                        description={heroData.description}
                        ctaArray={heroData.ctaArray}
                        heroUSP={heroUSP}
                        compact
                        showAccreditations={false}
                    />
                    <div className={styles.heroMedia}>
                        {graphicComponent}
                    </div>
                </div>
                <AccreditationStrip accreditations={heroUSP?.image_usp} />
            </section>


        </>

    )
}
