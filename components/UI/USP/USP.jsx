"use client";
import styles from "./USP.module.scss";
import React from "react";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
export default function USP({
  title,
  description,
  cards,
  showTitle = false,
  statsArray,
}) {
  return (
    <Section>
      <Container maxWidth="xl" className={styles.container}>
        {showTitle && (
          <div className={styles.titleWrapper}>
            <div className="section-eyebrow section-eyebrow-dark">Why Epic</div>
            <Typography variant="h2" component="h2" className={styles.title}>
              {title}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              className={styles.description}
            >
              {description}
            </Typography>
            {statsArray && statsArray.length > 0 && (
              <div className={styles.statsWrapper}>
                {statsArray.map((stat, index) => (
                  <div key={index} className={styles.stat}>
                    <Typography
                      variant="h2"
                      component="div"
                      className={styles.statValue}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      className={styles.statLabel}
                    >
                      {stat.label}
                    </Typography>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <div className={styles.cardsWrapper}>
          {cards &&
            cards.length > 0 &&
            cards.map((card, index) => (
              <div key={index} className={styles.card}>
                {card.icon?.url && (
                  <div className={styles.iconWrapper}>
                    <Image
                      src={card.icon.url}
                      alt={card.icon.alt || ""}
                      width="56"
                      height="56"
                      className={styles.image}
                    />
                  </div>
                )}
                <div className={styles.content}>
                  <Typography
                    variant="h6"
                    component="h3"
                    className={styles.cardTitle}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    className={styles.cardDescription}
                  >
                    {card.description}
                  </Typography>
                </div>
              </div>
            ))}
        </div>
      </Container>
    </Section>
  );
}
const Section = ({ className = "", ...props }) =>
  React.createElement("section", {
    ...props,
    className: `${styles.section} ${className}`.trim(),
  });
