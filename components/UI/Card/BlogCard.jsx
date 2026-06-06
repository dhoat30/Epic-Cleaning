import styles from "./BlogCard.module.scss";
import React from "react";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function BlogCard({
  title,
  description,
  image,
  ctaLabel,
  ctaLink,
  authorFirstName,
  authorLastName,
  publishDate,
  categoryDetails,
}) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const d = new Date(publishDate);
  const formattedDate = `${d.getDate()} ${months[d.getMonth()]}, ${d.getFullYear()}`;
  const category = categoryDetails?.[0]?.name;

  return (
    <article className={styles.card}>
      <Link href={ctaLink} className={styles.imageLink} aria-label={title}>
        <div className={styles.imageWrapper}>
          {image && (
            <Image
              src={image.url}
              alt={title}
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
              quality={80}
              className={styles.image}
            />
          )}
        </div>
      </Link>

      <div className={styles.content}>
        {category && (
          <span className={styles.category}>{category}</span>
        )}

        <Typography variant="h6" component="h2" className={styles.title}>
          <Link href={ctaLink}>{title}</Link>
        </Typography>

        <div className={styles.meta}>
          <Typography variant="body2" component="span" className={styles.author}>
            {authorFirstName} {authorLastName}
          </Typography>
          <span className={styles.dot} />
          <Typography variant="body2" component="span" className={styles.date}>
            {formattedDate}
          </Typography>
        </div>

        {description && (
          <Typography
            variant="body2"
            component="div"
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        {ctaLink && (
          <Link href={ctaLink} className={styles.readMore}>
            {ctaLabel || "Read More"}
            <ArrowForwardIcon className={styles.arrow} />
          </Link>
        )}
      </div>
    </article>
  );
}
