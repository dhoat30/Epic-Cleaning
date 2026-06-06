"use client";
import React from "react";
import styles from "./CenterAlignHero.module.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Image from "next/image";
import Link from "next/link";

export default function CenterAlignHero({ data }) {
  return (
    <Section component="section">
      <Box className="container">
        <Box className="image-wrapper flexGrow-1">
          <div className="bulb"></div>
          <Image src={data?.desktopImage.url} alt="hero" fill priority={true} />
        </Box>
        <Container className="row " maxWidth="xl">
          <Box className="content-wrapper">
            <Typography
              className="subtitle"
              component="h2"
              variant="h4"
              color="secondary.main"
              align="center"
            >
              {data?.subtitle}
            </Typography>
            <Typography
              component="h1"
              variant="h2"
              color="white"
              className="title"
              align="center"
            >
              {data?.title}
            </Typography>
            <Typography
              component="p"
              variant="h5"
              align="center"
              color=" var(--dark-on-surface)"
            >
              {data?.description}
            </Typography>
            {data?.ctaLink && (
              <Box className="button-wrapper">
                <Link href={data.ctaLink}>
                  <Button variant="contained" size="large">
                    {data.ctaLabel}
                  </Button>
                </Link>
              </Box>
            )}
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
