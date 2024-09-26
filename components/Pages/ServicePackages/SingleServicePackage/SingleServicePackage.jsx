"use client";
import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import ServiceCTA from "@/components/UI/CTA/ServiceCTA";
import ServiceSection from "./ServiceSection";
export default function SingleServicePackage({ data }) {
  console.log(data);
  const heroImage = data?.acf?.hero_section?.image;
  const title = data?.acf?.hero_section?.title;
  const description = data?.acf?.hero_section?.description;
  const ctaData = {
    ctaLabel: "Buy now",
    ctaLink: "/checkout",
    slug: data?.slug,
    price: data?.acf?.cta_section?.service_price,
    frequency: data?.acf?.cta_section?.frequency,
    itemsArr: data?.acf?.cta_section?.service_items,
  };

  return (
    <>
      <Section>
        <Container maxWidth="xl">
          <div className="wrapper">
            <div className="main-content-wrapper">
              <div
                className="hero-image-wrapper"
                style={{
                  paddingBottom: `${
                    (heroImage.height / heroImage.width) * 100
                  }%`,
                }}
              >
                <Image
                  src={heroImage.url}
                  alt={heroImage.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 70vw"
                />
              </div>
              <div className="intro-wrapper">
                <Typography className="title" variant="h3" component="h1">
                  {title}
                </Typography>
                <Typography
                  className="description"
                  variant="body1"
                  component="p"
                >
                  {description}
                </Typography>
                <ServiceCTA data={ctaData} className="cta-wrapper-mobile" />
              </div>
              <ServiceSection data={data.acf.layout} />
            </div>
            <ServiceCTA data={ctaData} className="cta-wrapper" />
          </div>
        </Container>
      </Section>
    </>
  );
}
const Section = styled.section`
  margin-top: 80px;
  margin-bottom: 40px;
  .wrapper {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 32px;
    align-items: start;
    @media (max-width: 1200px) {
      display: block;
    }
    .main-content-wrapper {
      grid-column: 1 / span 8;

      .hero-image-wrapper {
        position: relative;
        width: 100%;
        border-radius: 12px;
        img {
          border-radius: 12px;
        }
      }
      .intro-wrapper {
        padding: 24px 0;
        .description {
          margin-top: 8px;
        }
        .cta-wrapper-mobile {
          display: none;
          @media (max-width: 1200px) {
            display: block;
            margin-top: 16px;
          }
        }
      }
    }
    .cta-wrapper {
      grid-column: 9 / span 4;
      position: sticky;
      top: 80px;
      border-radius: 12px;
      @media (max-width: 1200px) {
        display: none;
      }
    }
  }
`;
