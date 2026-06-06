"use client";
import React from "react";
import styles from "./CenterAlignHeroTop.module.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Image from "next/image";
import Link from "next/link";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function CenterAlignHeroTop({ data }) {
  const matches = useMediaQuery("(min-width:800px)");

  return (
    <Section component="section">
      <Box className="container">
        <Box className="image-wrapper flexGrow-1">
          <div className="bulb"></div>
          <Image src={data?.desktopImage.url} alt="hero" fill priority={true} />
        </Box>
        <Container className="row " maxWidth="xl">
          <Box className="content-wrapper">
            {data && data.subtitle ? (
              <Typography
                className="subtitle"
                component="h2"
                variant="h4"
                color="secondary.main"
                align="center"
              >
                {data.subtitle}
              </Typography>
            ) : null}
            {data && data.title ? (
              <Typography
                component="h1"
                variant="h2"
                color="white"
                className="title"
                align="center"
              >
                {data.title}
              </Typography>
            ) : null}

            {data && data.description ? (
              <Typography
                component="p"
                variant="h5"
                align="center"
                color=" var(--dark-on-surface)"
              >
                {data.description}
              </Typography>
            ) : null}
            {data && data.ctaLink ? (
              <Box className="button-wrapper">
                <Link href={data.ctaLink}>
                  <Button variant="contained" size="large">
                    {data.ctaLabel}
                  </Button>
                </Link>
              </Box>
            ) : null}
          </Box>
        </Container>
      </Box>
    </Section>
  );
}

const Section = ({ className = "", ...props }) =>
  React.createElement(Box, {
    ...props,
    className: `${styles.section} ${className}`.trim(),
  });
