import React from "react";
import styles from "./RegularProcess.module.scss";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";

export default function RegularProcess({
  subtitle,
  title,
  description,
  cards,
  ctaLink,
  ctaNote,
}) {
  if (!cards) return null;

  return (
    <Section>
      <Container maxWidth="xl" className={styles.container}>
        <div className={styles.titleWrapper}>
        <div className={"section-eyebrow section-eyebrow-dark"}>How it works</div>
          {title && (
            <Typography variant="h2" component="h2" className={`${styles.title } mt-16`} color={"var(--dark-on-surface)"}>
              {title}
            </Typography>
          )}
          {description && (
            <div
              className={`${styles.description} heading5 mt-16`} 
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>

        <div className={styles.stepsWrapper}>
          {cards.map((item, index) => (
            <div className={styles.stepCard} key={`${item.title}-${index}`}>
              <div className={styles.stepNumber}>{index + 1}</div>
              <Typography variant="h4" component="h3" className={styles.stepTitle}>
                {item.title}
              </Typography>
              <div
                className={styles.stepDescription}
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </div>
          ))}
        </div>

        {ctaLink && (
          <div className={styles.ctaWrapper}>
            <Link href={ctaLink.url}>
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                className={styles.ctaButton}
              >
                {ctaLink.title}
              </Button>
            </Link>
            <div className={styles.ctaNote}>No obligation. Usually booked within 24 hours.</div>
          </div>
        )}
      </Container>
    </Section>
  );
}

const Section = ({ className = "", ...props }) =>
  React.createElement("section", {
    ...props,
    className: `${styles.section} ${className}`.trim(),
  });
