import styles from "./FooterCta.module.scss";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import React from "react";

export default function FooterCta({ title, description, cta }) {
  return (
    <Section component="section">
      <Container maxWidth="lg">
        <div className="wrapper">
          <div className="content-wrapper">
            <Typography
              component="h2"
              variant="h2"
              align="center"
              color="white"
              className="title"
            >
              {title}
            </Typography>
            <Typography
              component="p"
              variant="body1"
              align="center"
              color="white"
              className="description mt-16"
            >
              {description}
            </Typography>
            <div className="button-wrapper">
              <Link href={cta.url}>
                <Button
                  size="large"
                  variant="contained"
                  className={styles.button}
                >
                  {cta.title}
                </Button>
              </Link>

              {/* <Link href="/get-a-quote">
              <Button
                size="large"
                variant="outlined"
              >
                {cta.label}
              </Button>
            </Link> */}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
const Section = ({ className = "", ...props }) =>
  React.createElement(Box, {
    ...props,
    className: `${styles.section} ${className}`.trim(),
  });
