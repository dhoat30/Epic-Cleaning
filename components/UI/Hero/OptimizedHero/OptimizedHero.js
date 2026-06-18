
import HeroContent from "./HeroContent";
import styles from "./Hero.module.scss";
import HeroImage from "./HeroImage";
import Video from "../../Video/Video";
import BeforeAfter from "../../BeforeAfterSlider/BeforeAfter";
import AccreditationStrip from "./AccreditationStrip";
import Container from "@mui/material/Container";
export default async function OptimizedHero({ data, heroUSP }) {
    if (!data ) return null

    const heroData = {
        subtitle: data.subtitle,
        title: data.title,
        description: data.description,
        image: data.image || data.youtube?.placeholder_image,
        ctaArray: data.buttons || data.cta,
    };
    let graphicComponent = null;
    const youtubeID = data.youtube_id || data.youtube?.youtube_id;
    const shouldShowVideo = data.show_video || data.graphic_type === "youtube_video";
    const shouldShowBeforeAfter = data.show_before_after_images || data.graphic_type === "before_after";

    if (shouldShowVideo && youtubeID) {
        graphicComponent = <Video videoID={youtubeID} placeholderImage={heroData.image} showCompressedImage={true} />
    }
    else if (shouldShowBeforeAfter) {
        const beforeAfterImage = {
            beforeImage: data.before_after_images?.before_image,
            afterImage: data.before_after_images?.after_image
        }
        graphicComponent = <div className="border-radius-12 overflow-hidden"><BeforeAfter data={beforeAfterImage} /></div>
    }
    else if (heroData.image) {
        graphicComponent = <HeroImage image={heroData.image} />
    }
    return (
        <>
            <section className={`${styles.heroSection}`}>
                <Container className={`${styles.container} `} maxWidth="xl">
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
                    {graphicComponent && (
                        <div className={styles.heroMedia}>
                            {graphicComponent}
                        </div>
                    )}
                </Container>
                <AccreditationStrip accreditations={heroUSP?.image_usp} />
            </section>


        </>

    )
}
