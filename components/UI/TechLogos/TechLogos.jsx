"use client";
import styles from "./TechLogos.module.scss";
import Typography from "@mui/material/Typography";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export default function TechLogos({ data }) {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true },
    [Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  if (!data) return null;

  const logos = data.logos.map((item, index) => (
    <div className={styles.logoSlide} key={index}>
      <div className={styles.logoWrapper}>
        <Image
          src={item.logo.url}
          alt={item.logo.alt || "Client logo"}
          fill
          sizes="220px"
        />
      </div>
    </div>
  ));

  return (
    <section className={styles.section}>
      <div className={styles.titleRow}>
        <span className={styles.rule} />
        <Typography variant="overline" component="p" className={styles.title}>
          {data.title}
        </Typography>
        <span className={styles.rule} />
      </div>
      <div className={styles.logoViewport} ref={emblaRef}>
        <div className={styles.logoTrack}>{logos}</div>
      </div>
    </section>
  );
}
