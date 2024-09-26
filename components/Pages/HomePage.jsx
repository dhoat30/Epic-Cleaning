"use client";
import React from "react";
import Hero from "../UI/Hero/Hero";
import Card from "../UI/Card/Card";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import RowCard from "../UI/Card/RowCard";
import RowCardTabs from "../UI/Card/RowCardTabs";
import TechLogos from "../UI/TechLogos/TechLogos";
import FooterCta from "../UI/CTA/FooterCta";
export default function HomePage({ data, techLogos }) {
  // regular cards
  const cards = data[0].acf.usp.cards.map((item, index) => {
    if (item.card_width === "full") {
      return (
        <RowCard
          key={index}
          title={item.title}
          description={item.description}
          image={item.graphic}
          ctaLabel={item.cta.cta_label}
          ctaLink={item.cta.cta_link}
          imgAlignment={item.image_alignment}
        />
      );
    } else if (item.card_width === "half") {
      return (
        <Card
          key={index}
          title={item.title}
          description={item.description}
          image={item.graphic}
          ctaLabel={item.cta.cta_label}
          ctaLink={item.cta.cta_link}
          imgAlignment={item.image_alignment}
        />
      );
    }
  });
  // cards with tabs
  const cardsWithTabs = data[0].acf.usp.row_card_with_tabs.map(
    (item, index) => {
      return (
        <RowCardTabs
          key={index}
          title={item.title}
          description={item.description}
          image={item.graphic}
          ctaLabel={item.cta.cta_label}
          ctaLink={item.cta.cta_link}
          imgAlignment={item.image_alignment}
          tabsData={item.tabs}
        />
      );
    }
  );
  return (
    <>
      <UspContainer component="section">
        <Container component="div" maxWidth="xl" className="cards-wrapper">
          {cards}
          {cardsWithTabs}
        </Container>
      </UspContainer>
      <TechLogos data={techLogos} />
      <FooterCta />
    </>
  );
}
const UspContainer = styled(Box)`
  padding-bottom: 80px;
  background: var(--dark-surface-container-lowest);
  .cards-wrapper {
    display: grid;
    gap: 32px;
    grid-template-columns: repeat(2, 1fr);
    @media (max-width: 1020px) {
      grid-template-columns: repeat(1, 1fr);
      padding: 8px !important;
    }
  }
`;
