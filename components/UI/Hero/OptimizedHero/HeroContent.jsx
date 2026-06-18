
import styles from "./HeroContent.module.scss";
import React from "react";


import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import PhoneIcon from '@mui/icons-material/Phone';import Image from "next/image";
import Link from "next/link";

export default function HeroContent({
  title,
  subtitle,
  description,
  ctaArray,
  className,
  heroUSP,
  compact = false,
  showAccreditations = true,
}) {
  const titleHasHtml = containsHtml(title);
  const descriptionHasHtml = containsHtml(description);
  let ctaComponent = null;
  if (ctaArray?.length > 0) {
    const primaryCta = ctaArray[0]?.cta_link || ctaArray[0]?.link;

    ctaComponent = (
      <div className={compact ? styles.heroButtonWrapper : styles.singleButtonWrapper}>
        {primaryCta?.url && (
          <Link href={primaryCta.url}>
            <Button variant="contained" size="large">
              {primaryCta.title}
              <ArrowForwardRoundedIcon aria-hidden="true" />
            </Button>
          </Link>
        )}
        {compact && (
          <Link href="tel:+64800080056" >
            <Button className={styles.phoneButton} variant="text" size="large">
              <PhoneIcon aria-hidden="true" />
              {process.env.NEXT_PUBLIC_PHONE}
            </Button>
          </Link>
        )}
      </div>
    );
  }
  // check if heroUSP object is available and has a value
  let heroUSPComponent = null;
  if (heroUSP) {
    heroUSPComponent = (
      <div className={styles.heroUspWrapper}>
        <div className={styles.textUspWrapper}>
          {heroUSP.text_usp.map((item, index) => {
            return (
              <div key={index} className={styles.uspItem}>
                <CheckCircleIcon sx={{ color: "currentColor", fontSize: 18 }} />
                <Typography component="span" variant="body2" sx={{ fontWeight: 600, color: "currentColor" }}>
                  {item.value}
                </Typography>
              </div>
            );
          })}
        </div>
        {showAccreditations && <div className={styles.imageUspWrapper}>
          {heroUSP.image_usp &&
            heroUSP.image_usp.map((item, index) => {
              return (
                <Image
                  key={index}
                  src={item.image.url}
                  alt={item.image.alt}
                  width={item.image.width}
                  height={item.image.height}
                />
              );
            })}
        </div>}
      </div>
    );
  }

  return (
    <div className={`${className || ""} ${compact ? styles.compact : ""}`}>
      {/* <Typography
        className="subtitle"
        component="div"
        variant="h5"
      >
        {subtitle}
      </Typography> */}
      {titleHasHtml ? (
        <div
          className={`${styles.title} heading1`}
          dangerouslySetInnerHTML={{ __html: title }}
        />
      ) : (
        <Typography
          component="h1"
          variant="h1"
          className={styles.title}
        >
          {title}
        </Typography>
      )}
      {descriptionHasHtml ? (
        <div
          className={`${styles.description} heading6 mt-16`}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      ) : (
        <Typography
          component="p"
          variant="h6"
          className={`${styles.description} mt-16`}
        >
          {description}
        </Typography>
      )}
      {ctaComponent}
      {heroUSPComponent}
    </div>
  );
}

const Div = ({ className = "", ...props }) =>
  React.createElement("div", {
    ...props,
    className: `${styles.div} ${className}`.trim(),
  });

const containsHtml = (value) =>
  typeof value === "string" && /<\/?[a-z][\s\S]*>/i.test(value);
