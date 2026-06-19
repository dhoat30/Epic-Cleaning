import styles from "./BeforeAfterMasonry.module.scss";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import React from "react";
import { ReactCompareSlider } from "react-compare-slider";

export default function BeforeAfterMasonry({ data, showTitle, priority }) {
  if (!data.afterImage || !data.beforeImage) return null;
  return (
    <Container>
      {showTitle && (
        <Typography component="h2" variant="h3" className="title" color="white">
          Before & After
        </Typography>
      )}

      <div className={styles.imageFrame}>
        <ReactCompareSlider
          className={styles.imageWrapper}
          onlyHandleDraggable={true}
          style={{
            paddingBottom: `${
              (data.beforeImage.height / data.beforeImage.width) * 100
            }%`,
            touchAction: "pan-y",
          }}
          itemTwo={
            <Image
              src={data.beforeImage.url}
              alt={data.beforeImage.alt ? data.beforeImage.alt : "Before"}
              priority={priority}
              fill
            />
          }
          itemOne={
            <Image
              src={data.afterImage.url}
              alt={data.afterImage.alt ? data.afterImage.alt : "After"}
              fill
              priority={priority}
            />
          }
        />
        <span className={`${styles.imageBadge} ${styles.beforeBadge}`}>
          Before
        </span>
        <span className={`${styles.imageBadge} ${styles.afterBadge}`}>
          After
        </span>
      </div>
    </Container>
  );
}
const Container = ({ className = "", ...props }) =>
  React.createElement("section", {
    ...props,
    className: `${styles.container} ${className}`.trim(),
  });
