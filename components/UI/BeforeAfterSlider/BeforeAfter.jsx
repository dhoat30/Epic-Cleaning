"use client";
import styles from "./BeforeAfter.module.scss";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import React from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

export default function BeforeAfter({ data, showTitle }) {
  if (!data.afterImage || !data.beforeImage) return null;
  return (
    <Container>
      {showTitle && (
        <Typography component="h2" variant="h3" className="title" color="white">
          Before & After
        </Typography>
      )}

      <ReactCompareSlider
        className="image-wrapper"
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
            fill
          />
        }
        itemOne={
          <Image
            src={data.afterImage.url}
            alt={data.afterImage.alt ? data.afterImage.alt : "Before"}
            fill
          />
        }
      />
    </Container>
  );
}
const Container = ({ className = "", ...props }) =>
  React.createElement("section", {
    ...props,
    className: `${styles.container} ${className}`.trim(),
  });
