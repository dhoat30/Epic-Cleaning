"use client";

import React, { useCallback, useEffect, useState } from "react";
import styles from "./LargeCardsCarousel.module.scss";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";

export default function LargeCardsCarousel({ title, description, cards }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index) => emblaApi?.scrollTo(index), [emblaApi]);

  const updateCarouselState = useCallback(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    updateCarouselState();
    emblaApi.on("select", updateCarouselState);
    emblaApi.on("reInit", updateCarouselState);

    return () => {
      emblaApi.off("select", updateCarouselState);
      emblaApi.off("reInit", updateCarouselState);
    };
  }, [emblaApi, updateCarouselState]);

  if (!cards?.length) return null;

  return (
    <Section>
      <Container maxWidth="lg" className={styles.sectionHeader}> 
 <div className="section-eyebrow section-eyebrow-dark">Services</div>
          {title && (
            <div
              className={styles.title}
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )}
          {description && (
            <Typography
              variant="h5"
              component="p"
              className={`${styles.description } heading5 mt-16`}
            >
              {description}
            </Typography>
          )}
      </Container>
      <Container maxWidth="xl" className={`${styles.container} grid gap-56 mt-56`}>
     

        <div className={styles.carousel}>
          <div className={styles.viewport} ref={emblaRef}>
            <div className={styles.track}>
              {cards.map((card, index) => (
                <div className={styles.slide} key={`${card.title}-${index}`}>
                  <ServiceCard card={card} index={index} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </Container>
      <div className={`${styles.footerContainer} mt-40`}>

          <div className={styles.carouselFooter}>
            {/* <div className={styles.dots} aria-label="Service carousel pagination">
              {scrollSnaps.map((_, index) => (
                <button
                  type="button"
                  key={index}
                  className={`${styles.dot} ${
                    index === selectedIndex ? styles.dotSelected : ""
                  }`}
                  onClick={() => scrollTo(index)}
                  aria-label={`Go to service ${index + 1}`}
                  aria-current={index === selectedIndex ? "true" : undefined}
                />
              ))}
            </div> */}

            <div className={styles.arrows}>
              <IconButton
                type="button"
                className={styles.arrowButton}
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                aria-label="Previous service"
              >
                <ArrowBackRoundedIcon />
              </IconButton>
              <IconButton
                type="button"
                className={styles.arrowButton}
                onClick={scrollNext}
                disabled={!canScrollNext}
                aria-label="Next service"
              >
                <ArrowForwardRoundedIcon />
              </IconButton>
            </div>
          </div>
      </div>
    </Section>
  );
}

function ServiceCard({ card, index }) {
  const cardContent = (
    <article className={styles.card}>
      {card.image?.url && (
        <Image
          src={card.image.url}
          alt={card.image.alt || card.title || ""}
          fill
          sizes="(max-width: 700px) 86vw, (max-width: 1200px) 54vw, 520px"
          priority={index < 2}
        />
      )}
      <div className={styles.cardOverlay}>
        <div className={styles.cardNumber}>{String(index + 1).padStart(2, "0")}</div>
        {card.title && (
          <Typography variant="h3" component="h3" className={styles.cardTitle}>
            {card.title}
          </Typography>
        )}
        {card.description && (
          <div
            className={styles.cardDescription}
            dangerouslySetInnerHTML={{ __html: card.description }}
          />
        )}
      </div>
    </article>
  );

  if (card.link?.url) {
    return (
      <Link href={card.link.url} className={styles.cardLink}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

const Section = ({ className = "", ...props }) =>
  React.createElement("section", {
    ...props,
    className: `${styles.section} ${className}`.trim(),
  });
