'use client';
import React from "react";
import styles from "./GoogleReviewsCarousel.module.scss";

import { useCallback, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import useEmblaCarousel from "embla-carousel-react";
import CarouselArrows from "../CarouselArrows/CarouselArrows";
import Link from "next/link";
import Button from "@mui/material/Button";
import CallMadeOutlinedIcon from "@mui/icons-material/CallMadeOutlined";
import GoogleReviewCard from "./GoogleReviewCard/GoogleReviewCard";
import Typography from "@mui/material/Typography";

export default function GoogleReviewsCarousel({ data }) {
  const filteredReviewData = data?.filter((item) => {
    return (
      item.starRating === "FIVE" &&
      typeof item.comment === "string" &&
      item.comment.length > 250
    );
  }) || [];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: filteredReviewData.length > 3,
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const previous = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollTo = useCallback((index) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);
  if (!data) return null;

  const testimonialCardsJSX = filteredReviewData.map(
    (item, index) => {
      if (index > 10) return null;
      return (
        <div className={styles.slide} key={index}>
          <GoogleReviewCard
            className={styles.reviewCard}
            name={item.reviewer.displayName}
            description={item.comment}
            customerPic={item.reviewer.profilePhotoUrl}
          />
        </div>
      );
    }
  );

  return (
    <Section>
      <Container maxWidth="xl">
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.ratingBadge}>
              <span className={styles.ratingScore}>4.9</span>
              <span className={styles.ratingStars}>★★★★★</span>
              <span className={styles.ratingCount}>from 90+ Google reviews</span>
            </div>
            <Typography variant="h2" component="h2" className={styles.title}>
              What Our Customers Say
            </Typography>
            <Typography variant="body1" component="p" className={styles.description}>
              Real reviews from real Tauranga customers — pulled directly from Google.
            </Typography>
          </div>
          <div className={styles.arrowsWrapper}>
            <CarouselArrows next={next} previous={previous} />
          </div>
        </div>
      </Container>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.track}>{testimonialCardsJSX}</div>
      </div>
      <div className={styles.dots} aria-label="Review carousel pagination">
        {scrollSnaps.map((_, index) => (
          <button
            type="button"
            key={index}
            className={`${styles.dot} ${index === selectedIndex ? styles.dotSelected : ""}`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to review ${index + 1}`}
            aria-current={index === selectedIndex ? "true" : undefined}
          />
        ))}
      </div>
      <Container maxWidth="xl" className="cta-wrapper mt-32">
        <Link href={"https://g.page/r/CSHFRoJPsK-TEAE/review"} target="_blank">
          <Button variant={`contained`} endIcon={<CallMadeOutlinedIcon />}>
            Leave a Review
          </Button>
        </Link>
        <Link href="/testimonials">
          <Button variant={`outlined`}>
            Read More Reviews
          </Button>
        </Link>
      </Container>
    </Section>
  );
}

const Section = ({ className = "", ...props }) =>
  React.createElement("section", {
    ...props,
    className: `${styles.section} ${className}`.trim(),
  });
