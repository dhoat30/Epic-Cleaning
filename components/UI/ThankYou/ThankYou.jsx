"use client";
import React from "react";
import styles from "./ThankYou.module.scss";
import Container from "@mui/material/Container";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Button from "@mui/material/Button";

export default function ThankYou({
  title = "Thanks for your enquiry.",
  description = "We have received your information and we will get back you soon.",
}) {
  return (
    <Section>
      <Container maxWidth="sm" className="container">
        <div className="image-container">
          <div className="image-wrapper">
            <Image src="/congrats.png" alt="Thank you" fill />
          </div>
        </div>
        <div className="content-wrapper">
          <Typography
            variant="h4"
            component="h1"
            align="center"
            color="var(--light-on-surface)"
          >
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            component="p"
            align="center"
            color="var(--light-on-surface-variant)"
          >
            {description}
          </Typography>
          <div className="button-wrapper">
            <Link href="/">
              <Button variant="outlined" color="primary" size="large">
                Go back to Home
              </Button>
            </Link>
            <Link href="/blogs">
              <Button variant="contained" color="primary" size="large">
                Read our blogs
              </Button>
            </Link>
          </div>
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
