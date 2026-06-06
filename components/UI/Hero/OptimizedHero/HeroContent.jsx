"use client";
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
  let ctaComponent = null;
  if (ctaArray?.length > 0) {
    ctaComponent = (
      <div className={compact ? "hero-button-wrapper" : "single-button-wrapper"}>
        <Link href={ctaArray[0].cta_link.url}>
          <Button variant="contained" size="large">
            {ctaArray[0].cta_link.title}
            <ArrowForwardRoundedIcon aria-hidden="true" />
          </Button>
        </Link>
        {compact && (
          <Link href="tel:+64800080056" >
            <Button variant="outlined" size="large">
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
      <div className="hero-usp-wrapper">
        <div className="text-usp-wrapper">
          {heroUSP.text_usp.map((item, index) => {
            return (
              <div key={index} className={styles.uspItem}>
                <CheckCircleIcon sx={{ color: "white", fontSize: 18 }} />
                <Typography component="span" variant="body2" sx={{ fontWeight: 600, color: "white" }}>
                  {item.value}
                </Typography>
              </div>
            );
          })}
        </div>
        {showAccreditations && <div className="image-usp-wrapper">
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
    <Div className={`${className || ""} ${compact ? styles.compact : ""}`}>
      {/* <Typography
        className="subtitle"
        component="div"
        variant="h5"
      >
        {subtitle}
      </Typography> */}
      <Typography
        component="h1"
        variant="h1"
        className="title"
      >
        {title}
      </Typography>
      <Typography
        component="p"
        variant="body1"
        className="description"
      >
        {description}
      </Typography>
      {ctaComponent}
      {heroUSPComponent}
    </Div>
  );
}

const Div = ({ className = "", ...props }) =>
  React.createElement("div", {
    ...props,
    className: `${styles.div} ${className}`.trim(),
  });
