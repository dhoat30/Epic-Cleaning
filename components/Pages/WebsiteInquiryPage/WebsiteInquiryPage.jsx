"use client";
import React from "react";
import styles from "./WebsiteInquiryPage.module.scss";

import Container from "@mui/material/Container";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import Typography from "@mui/material/Typography";
import { lightTheme } from "@/utils/themeSettings";
import dynamic from "next/dynamic";
import Image from "next/image";
import WebsiteInquiryLongForm from "@/components/UI/Forms/WebsiteInquiryLongForm";

const WebsiteEnquiryForm = dynamic(() =>
  import("@/components/UI/Forms/WebsiteEnquiryForm")
);

export default function WebsiteInquiryPage({ data }) {
  return (
    <ThemeProvider theme={lightTheme}>
      <Section>
        <Container maxWidth="lg" className="container">
          <div className="form-container">
            <WebsiteInquiryLongForm className="row-max form-component" />
          </div>
          <div className="content-container">
            <Typography
              variant="h5"
              color="secondary.main"
              component="div"
              className="subtitle"
            >
              {data.acf.hero_section.subtitle}
            </Typography>
            <Typography
              variant="h4"
              color="white"
              component="h1"
              className="title"
            >
              {data.acf.hero_section.title}
            </Typography>
            <Typography
              variant="body1"
              color="white"
              component="p"
              className="description"
            >
              {data.acf.hero_section.description}
            </Typography>
            <div
              className="image-wrapper"
              style={{
                paddingBottom: `${
                  (data.acf.hero_section.graphic.desktop.height /
                    data.acf.hero_section.graphic.desktop.width) *
                  100
                }%`,
              }}
            >
              <Image
                src={data.acf.hero_section.graphic.desktop.url}
                alt={data.acf.hero_section.graphic.desktop.alt}
                fill
                priority={true}
                sizes="(max-width: 1000px) 100vw, 40vw"
              />
            </div>
          </div>
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
