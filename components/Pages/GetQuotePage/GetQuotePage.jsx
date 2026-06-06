"use client";
import React from "react";
import styles from "./GetQuotePage.module.scss";

import Container from "@mui/material/Container";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import Typography from "@mui/material/Typography";
import { lightTheme } from "@/utils/themeSettings";
import HeroImage from "@/components/UI/Hero/OptimizedHero/HeroImage";
import Video from "@/components/UI/Video/Video";
import USP from "@/components/UI/USP/USP";
import GetQuoteForm from "@/components/UI/Forms/GetQuoteForm";
import GetRegularCleaningForm from "@/components/UI/Forms/GetRegualrCleaningForm";
// const WebsitePriceCalculatorForm = dynamic(() =>
//   import("@/components/UI/Forms/WebsitePriceCalculatorForm")
// );

export default function GetQuotePage({ data, websitePackageOffer, regularCleaningForm=false }) {
  let graphicComponent = null;
  if (data.acf.hero_section.show_video) {
    if (data.acf.hero_section.video_options === "enter_youtube_id") {
      if (data.acf.hero_section.youtube_id) {
        graphicComponent = (
          <Video
            videoID={data.acf.hero_section.youtube_id}
            placeholderImage={data.acf.hero_section.image}
            showCompressedImage={true}
          />
        );
      }
    }
  } else {
    graphicComponent = <HeroImage image={data.acf.hero_section.image} />;
  }
  return (
    <ThemeProvider theme={lightTheme}>
      <Section>
        <Container maxWidth="lg" className="container">
          <div className="content-container">
            <Typography variant="h2" component="h1" className="subtitle">
              {data.acf.hero_section.subtitle}
            </Typography>

            <Typography
              variant="body1"
              component="p"
              className="description mt-16"
            >
              {data.acf.hero_section.description}
            </Typography>
            <div className="graphic-wrapper mt-24">{graphicComponent}</div>
            {/* usp section  */}
            {websitePackageOffer && (
              <USP data={websitePackageOffer} showTitle={true} />
            )}
          </div>
          <div className="form-container">
           
            {
              regularCleaningForm ?  <GetRegularCleaningForm
              className="row-max form-component"
              title={data.acf.hero_section.title}
            />:  <GetQuoteForm
              className="row-max form-component"
              title={data.acf.hero_section.title}
            />
            }
          
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
