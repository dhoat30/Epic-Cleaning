"use client";
import React from "react";
import styles from "./RegularProcess.module.scss";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { theme } from "@/utils/themeSettings";
import { ThemeProvider } from "@mui/material/styles";
export default function RegularProcess({ title, description, cards }) {
  if (!cards) return null;

  const stepCards = cards.map((item, index) => {
    return (
      <div className="step-wrapper" key={index}>
        <div className="title">
          <div className="step-title-number-wrapper">
            <div className="step-number">{index + 1}</div>
            <Typography
              variant="h6"
              component="h3"
              color="var(--dark-on-secondary-container)"
            >
              {item.title}
            </Typography>
          </div>

          <div className="border"></div>
        </div>
        <div className="content">
          <Typography
            variant="body1"
            component="div"
            className="description"
            dangerouslySetInnerHTML={{ __html: item.description }}
          ></Typography>
        </div>
      </div>
    );
  });
  return (
    <ThemeProvider theme={theme}>
      <Section>
        <Container maxWidth="lg" className="container">
          <div className="title-wrapper">
            <Typography variant="h2" component="h2" className="title">
              {title}
            </Typography>
            <div
              className="description body1"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>

          <div className="steps-wrapper">{stepCards}</div>
        </Container>
      </Section>
    </ThemeProvider>
  );
}
const Section = ({ className = "", ...props }) =>
  React.createElement("section", {
    ...props,
    className: `${styles.section} ${className}`.trim(),
  });
