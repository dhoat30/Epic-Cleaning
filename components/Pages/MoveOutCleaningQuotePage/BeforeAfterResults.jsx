"use client";

import React from "react";
import Typography from "@mui/material/Typography";
import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
  ReactCompareSliderImage,
} from "react-compare-slider";
import styles from "./MoveOutCleaningQuotePage.module.scss";

export default function BeforeAfterResults({ items = [] }) {
  if (!items.length) return null;

  return (
    <section className={styles.beforeAfterSection}>
      <div className={`${styles.beforeAfterHeader} text-center`}>
        <span className="section-eyebrow">Real results</span>
        <Typography variant="h3" component="h2" className={styles.beforeAfterTitle}>
          See what a proper move clean can include
        </Typography>
        {/* <Typography
          variant="body1"
          component="p"
          className={`${styles.beforeAfterDescription} mt-12`}
        >
          Before-and-after examples from the gallery: ovens, carpets, vinyl
          floors, showers, dusting, and stain removal.
        </Typography> */}
      </div>

      <div className={`${styles.beforeAfterGrid} grid gap-24`}>
        {items.map((item) => (
          <article className={styles.resultCard} key={item.label}>
            <div className={styles.compareFrame}>
              <ReactCompareSlider
                className={styles.compareSlider}
                onlyHandleDraggable
                itemOne={
                  <ReactCompareSliderImage
                    src={item.beforeImage.url}
                    alt={item.beforeImage.alt || `${item.label} before`}
                    loading="lazy"
                    decoding="async"
                  />
                }
                itemTwo={
                  <ReactCompareSliderImage
                    src={item.afterImage.url}
                    alt={item.afterImage.alt || `${item.label} after`}
                    loading="lazy"
                    decoding="async"
                  />
                }
                handle={
                  <ReactCompareSliderHandle
                    buttonStyle={{
                      width: 46,
                      height: 46,
                      borderColor: "rgba(255, 255, 255, 0.88)",
                      backgroundColor: "rgba(4, 59, 81, 0.76)",
                    }}
                    linesStyle={{
                      width: 2,
                      backgroundColor: "rgba(255, 255, 255, 0.88)",
                    }}
                  />
                }
              />
              <span className={`${styles.resultBadge} ${styles.beforeBadge}`}>
                Before
              </span>
              <span className={`${styles.resultBadge} ${styles.afterBadge}`}>
                After
              </span>
            </div>
            <div className={styles.resultCaption}>
              <Typography variant="subtitle1" component="h3">
                {item.label}
              </Typography>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
