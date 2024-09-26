import Image from "next/image";

export default async function HeroImage({ image }) {

    return (
        <div className="image-wrapper" style={{
            borderRadius: "12px", overflow: "hidden",
            width: "100%", position: "relative", paddingBottom: `${(image.height / image.width) * 100
                }%`,
        }}>
            <Image
                src={image.sizes.large}
                alt={image.alt ? image.alt : heroData.title}
                fill
                priority={true}
                sizes="(max-width: 1200px) 100vw, 50vw"
            />
        </div>
    )
}