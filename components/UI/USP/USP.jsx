"use client";
import styles from "./USP.module.scss";
import React, { useId } from "react";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Container from "@mui/material/Container";

export default function USP({
  title,
  description,
  cards,
  showTitle = false,
  statsArray,
}) {
  const titleId = useId();
  const hasTitle = showTitle && Boolean(title);
  const hasStats = showTitle && statsArray?.length > 0;
  const hasHeader = hasTitle || (showTitle && description) || hasStats;
  const hasCards = cards?.length > 0;

  if (!hasHeader && !hasCards) return null;

  return (
    <section className={styles.section} aria-labelledby={hasTitle ? titleId : undefined}>
      <Container maxWidth="xl" className={styles.container}>
        {hasHeader && (
          <div className={styles.header}>
            <div className={styles.titleWrapper}>
              <p className={styles.eyebrow}><span aria-hidden="true" />Why Epic</p>
              {hasTitle && (
                <Typography id={titleId} variant="h2" component="h2" className={styles.title}>
                  {title}
                </Typography>
              )}
              {description && (
                <Typography variant="body1" component="p" className={styles.description}>
                  {description}
                </Typography>
              )}
            </div>
            {hasStats && (
              <dl className={styles.statsWrapper}>
                {statsArray.map((stat, index) => (
                  <div key={`${stat.label}-${index}`} className={styles.stat}>
                    <dt className={styles.statLabel}>{stat.label}</dt>
                    <dd className={styles.statValue}>{stat.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        )}
        {hasCards && (
          <div className={styles.cardsWrapper}>
            {cards.map((card, index) => (
              <div key={`${card.title}-${index}`} className={styles.card}>
                <div className={styles.cardHeading}>
                  {card.icon?.url && (
                    <div className={styles.iconWrapper}>
                      <Image
                        src={card.icon.url}
                        alt=""
                        width={40}
                        height={40}
                        className={styles.image}
                      />
                    </div>
                  )}
                  <Typography variant="h6" component="h3" className={styles.cardTitle}>
                    {card.title}
                  </Typography>
                </div>
                {card.description && (
                  <Typography variant="body1" component="p" className={styles.cardDescription}>
                    {card.description}
                  </Typography>
                )}
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
