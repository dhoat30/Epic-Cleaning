import styles from "./ServicePackageCard.module.scss";
import React from "react";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import Button from "@mui/material/Button";
export default function ServicePackageCard({
  title,
  description,
  price,
  image,
  ctaLink,
  ctaLabel,
  className,
}) {
  if (!image) return null;
  return (
    <PaperStyle className={`${className} card-wrapper`} elevation={0}>
      <Link className="link-wrapper" href={ctaLink}>
        <div className="image-wrapper">
          <Image
            src={image.url}
            alt={image.alt}
            fill
            priority={true}
            sizes=""
          />
        </div>
        <div className="content-wrapper">
          <Typography className="title" component="h2" variant="h4">
            {title}
          </Typography>
          <Typography className="description" component="p" variant="body1">
            {description}
          </Typography>
          <Typography className="price" component="div" variant="h4">
            ${price}
          </Typography>
          <Button className="button" variant="contained" size="large">
            {ctaLabel}
          </Button>
        </div>
      </Link>
    </PaperStyle>
  );
}
const PaperStyle = ({ className = "", ...props }) =>
  React.createElement(Paper, {
    ...props,
    className: `${styles.paperStyle} ${className}`.trim(),
  });
