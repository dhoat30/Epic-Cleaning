"use client";

import React, { useState } from "react";
import styles from "./EditorialServices.module.scss";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import Image from "next/image";
import Link from "next/link";

export default function EditorialServices({
  eyebrowText,
  title,
  description,
  cards,
}) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

  if (!cards?.length) return null;

  const activeCard = cards[imageIndex] || cards[0];
  const activeImage = activeCard?.image;

  return (
    <Section>
      <Container maxWidth="xl" className={styles.container}>
        <div className={styles.sectionHeader}>
          {eyebrowText && <div className="section-eyebrow">{eyebrowText}</div>}
          {title && (
            <div
              className={`${styles.title} heading2 `} 
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )}
          {description && (
            <Typography variant="h5" component="p" className={`${styles.description} heading5 mt-16`}>
              {description}
            </Typography>
          )}
        </div>

        <div className={styles.grid}>
          <div className={styles.imageColumn}>
            {activeImage?.url ? (
              <div className={styles.imageWrapper}>
                <Image
                  src={activeImage.url}
                  alt={activeImage.alt || activeCard.title || ""}
                  fill
                  sizes="(max-width: 1000px) 100vw, 46vw"
                />
              </div>
            ) : (
              <div className={styles.imagePlaceholder}>
                <span>Select an industry</span>
              </div>
            )}
          </div>

          <div className={styles.accordionColumn}>
            {cards.map((card, index) => {
              const isActive = expandedIndex === index;
              const panelId = `editorial-service-panel-${index}`;
              const buttonId = `editorial-service-button-${index}`;

              return (
                <div
                  className={`${styles.accordionItem} ${
                    isActive ? styles.active : ""
                  }`}
                  key={`${card.title}-${index}`}
                >
                  <button
                    className={styles.accordionButton}
                    type="button"
                    id={buttonId}
                    aria-expanded={isActive}
                    aria-controls={panelId}
                    onClick={() => {
                      setImageIndex(index);
                      setExpandedIndex((currentIndex) =>
                        currentIndex === index ? null : index
                      );
                    }}
                  >
                    <span>{card.title}</span>
                    <ExpandMoreIcon aria-hidden="true" />
                  </button>

                  {isActive && (
                    <div
                      className={styles.accordionPanel}
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                    >
                      {card.description && (
                        <div
                          className={styles.cardDescription}
                          dangerouslySetInnerHTML={{ __html: card.description }}
                        />
                      )}
                      {card.link?.url && (
                        <Link href={card.link.url} className={styles.cardLink}>
                          <Button
                            variant="text"
                            endIcon={<ArrowForwardRoundedIcon />}
                          >
                            {card.link.title || "Learn more"}
                          </Button>
                        </Link>
                      )}
                      {card.image?.url && (
                        <div className={styles.mobileImageWrapper}>
                          <Image
                            src={card.image.url}
                            alt={card.image.alt || card.title || ""}
                            fill
                            sizes="100vw"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
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
