"use client";
import styles from "./NotFoundPage.module.scss";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
export default function NotFoundPage() {
  return (
    <Section maxWidth="lg">
      <Box className={styles.content}>
        <Typography
          variant="h1"
          component="h1"
          className="image-text"
          align="center"
        >
          404
        </Typography>
        <Typography
          variant="h6"
          component="h1"
          className="image-text"
          align="center"
        >
          This page could not be found.
        </Typography>
        <Link href="/">
          <Button size="large" variant="contained" align="center">
            Back to Home
          </Button>
        </Link>
      </Box>
    </Section>
  );
}

const Section = ({ className = "", ...props }) =>
  React.createElement(Container, {
    ...props,
    className: `${styles.section} ${className}`.trim(),
  });
