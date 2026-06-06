"use client";
import styles from "./BlogMetaInfo.module.scss";
import React from "react";
import Image from "next/image";
import Typography from "@mui/material/Typography";
export default function BlogMetaInfo({
  authorFirstName,
  authorLastName,
  publishDate,
  className,
  categoryDetails,
}) {
  return (
    <Wrapper className={`${className}`}>
      <div className="text-wrapper">
        <Typography variant="body2" component="span">
          {categoryDetails[0]?.name}
        </Typography>
        <Typography
          variant="body2"
          component="span"
          className="divider"
          color="var(--light-on-surface-variant)"
        >
          |
        </Typography>
        <Typography
          variant="body2"
          component="span"
          color="var(--light-on-surface-variant)"
          className="meta-info"
        >
          {publishDate}
        </Typography>
      </div>
    </Wrapper>
  );
}
const Wrapper = ({ className = "", ...props }) =>
  React.createElement("div", {
    ...props,
    className: `${styles.wrapper} ${className}`.trim(),
  });
