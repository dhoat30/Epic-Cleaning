import styles from "./RowSection.module.scss";
import React from "react";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Button from "@mui/material/Button";
import Link from "next/link";
import Container from "@mui/material/Container";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BeforeAfter from "../../BeforeAfterSlider/BeforeAfter";

export default function RowSection({
  title,
  subtitle,
  description,
  imageAlignment,
  image,
  ctaGroup,
  bulletPoints,
  showBeforeAfterImages,
  beforeImage,
  afterImage,
}) {
  const imgPadding = (image.height / image.width) * 100;
  const contentAlignment = imageAlignment === "left" ? "2 / 3" : "1 / 2";
  return (
    <Section className="">
      <Container maxWidth="xl">
        <div className="wrapper">
          <div
            className="content-wrapper"
            style={{ gridColumn: contentAlignment }}
          >
            <Typography variant="h6" component="div" className="subtitle">
              {subtitle}
            </Typography>
            <Typography variant="h3" component="h2" className="title">
              {title}
            </Typography>

            <div
              className="description body1 mb-16 mt-16"
              dangerouslySetInnerHTML={{ __html: description }}
            />

            {bulletPoints.length > 0 &&
              bulletPoints.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="bullet-point flex align-center gap-8 mt-8"
                  >
                    <CheckCircleIcon
                      className={styles.checkIcon}
                    />
                    <Typography
                      variant="subtitle1"
                      component="span"
                      color="var(--light-on-primary-fixed-variant)"
                    >
                      {item.text}
                    </Typography>
                  </div>
                );
              })}
            {ctaGroup.cta && (
              <Link href={ctaGroup.cta.url} className="cta">
                <Button variant={ctaGroup.cta_type} color="primary">
                  {ctaGroup.cta.title}
                </Button>
              </Link>
            )}
          </div>

          {/* image wrapper */}
          {showBeforeAfterImages ? (
            <div className="image-container">
              <BeforeAfter
                showTitle={false}
                data={{ beforeImage, afterImage }}
              />
            </div>
          ) : (
            <div
              className="image-wrapper border-radius-12"
              style={{ paddingBottom: `${imgPadding}%` }}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes="(max-width: 1100px) 100vw, 50vw"
              />
            </div>
          )}
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
