"use client";
import styled from "@emotion/styled";

import Container from "@mui/material/Container";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import Typography from "@mui/material/Typography";
import { lightTheme } from "@/utils/themeSettings";
import dynamic from "next/dynamic";
import Image from "next/image";
import WebsitePriceCalculatorForm from "@/components/UI/Forms/WebsitePriceCalculatorForm";
import Video from "@/components/UI/Video/Video";
import USP from "@/components/UI/USP/USP";
// const WebsitePriceCalculatorForm = dynamic(() =>
//   import("@/components/UI/Forms/WebsitePriceCalculatorForm")
// );

export default function WebsiteDesignPriceCalculator({
  data,
  websitePackageOffer,
}) {
  return (
    <ThemeProvider theme={lightTheme}>
      <Section>
        <Container maxWidth="lg" className="container">
          <div className="form-container">
            <WebsitePriceCalculatorForm className="row-max form-component" />
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
              component="h2"
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
            {data.acf.hero_section.graphic.desktop &&
            !data.acf.hero_section.has_a_video ? (
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
            ) : (
              <Video
                placeholderImage={data.acf.hero_section.video.thumbnail}
                videoID={data.acf.hero_section.video.video_id}
              />
            )}
            {/* usp section  */}
            {websitePackageOffer && (
              <USP data={websitePackageOffer} showTitle={true} />
            )}
          </div>
        </Container>
      </Section>
    </ThemeProvider>
  );
}
const Section = styled.section`
  background: var(--light-surface-container-low);
  padding: 120px 0 160px 0;
  @media (max-width: 600px) {
    padding: 80px 0 24px 0;
  }
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: var(--light-surface-container-low);
    gap: 16px;
    align-items: start;
    @media (max-width: 1000px) {
      grid-template-columns: 1fr;
    }
    @media (max-width: 600px) {
      padding: 0;
    }
    .form-container {
      background: var(--light-surface-container);

      //remove the top border radius
      border-radius: 12px;
    }
    .content-container {
      position: sticky;
      top: 80px;
      padding: 24px;
      background: var(--dark-surface-container);
      border-radius: 12px;
      @media (max-width: 600px) {
        padding: 24px 16px;
      }
      .title {
        margin: 8px 0;
      }
      .image-wrapper {
        position: relative;
        width: 100%;
      }
      .MuiContainer-root {
        padding: 0 !important;
        margin-top: 16px;
      }
    }
  }
`;
