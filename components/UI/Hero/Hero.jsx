"use client";
import React from "react";
import styles from "./Hero.module.scss";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Image from "next/image";
import Link from "next/link";
export default function Hero({ data }) {
  return (
    <Section component="section">
      <Container className="row" maxWidth="xl">
        <Box className="content-wrapper">
          <Typography
            className="subtitle"
            component="h2"
            variant="h4"
            color="secondary.main"
          >
            {data.subtitle}
          </Typography>
          <Typography
            component="h1"
            variant="h2"
            color="white"
            className="title"
          >
            {data.title}
          </Typography>
          <Typography
            component="p"
            variant="h6"
            color=" var(--dark-on-surface)"
          >
            {data.description}
          </Typography>
          <Box className="button-wrapper">
            <Link href={data.ctaLink}>
              <Button variant="contained" size="large">
                {data.ctaLabel}
              </Button>
            </Link>
          </Box>
        </Box>
        <Box
          className="image-wrapper flexGrow-1"
          style={{
            paddingBottom: `${
              (data.desktopImage.height / data.desktopImage.width) * 100
            }%`,
          }}
        >
          <div className="bulb"></div>
          <Image
            src={data.desktopImage.url}
            alt="hero"
            fill
            priority={true}
            sizes="(max-width: 1200px) 100vw, 50vw"
          />
        </Box>
      </Container>
    </Section>
  );
}
const Section = ({ className = "", ...props }) =>
  React.createElement(Box, {
    ...props,
    className: `${styles.section} ${className}`.trim(),
  });
