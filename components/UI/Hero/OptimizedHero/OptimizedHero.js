import { Suspense } from "react";
import Skeleton from "../../Skeleton/Skeleton";
import HeroContent from "./HeroContent";
import styles from './Hero.module.css'
import HeroImage from "./HeroImage";
import Video from "../../Video/Video";
export default async function OptimizedHero({ data, heroUSP }) {
    if (!data || !data.image) return null
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
    else {
        graphicComponent = <HeroImage image={data.image} />
    }
    return (
        <>
            <section className={`${styles.heroSection}`}>
                <div className={`${styles.container} max-width-xl`}>
                    <HeroContent title={heroData.title} subtitle={heroData.subtitle} description={heroData.description} ctaArray={heroData.ctaArray} heroUSP={heroUSP} />
                    {graphicComponent}
                </div>
            </section>


        </>

    )
}