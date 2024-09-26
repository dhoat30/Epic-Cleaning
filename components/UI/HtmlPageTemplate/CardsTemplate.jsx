"use client";

import React from "react";
import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import BlogCard from "../Card/BlogCard";

export default function CardsTemplate({
  cardsDataArr,
  heroData,
  oneByOneAspectRatio,
}) {
  if (!cardsDataArr || !heroData) return null;
  const cards = cardsDataArr.map((item, index) => {
    return (
      <BlogCard
        oneByOneAspectRatio={oneByOneAspectRatio}
        key={index}
        title={item.title}
        image={item.image}
        ctaLink={item.ctaLink}
        ctaLabel={item.ctaLabel ? item.ctaLabel : "LEARN MORE"}
        description={item?.description}
        authorFirstName={item.authorFirstName}
        authorLastName={item.authorLastName}
        profilePic={item.profilePic}
        publishDate={item.publishDate}
      />
    );
  });
  return (
    <>
      <Section>
        <Container maxWidth="xl">
          <div className="title-wrapper">
            <Typography variant="h1">{heroData.title}</Typography>
            <Typography
              variant="h6"
              component="div"
              className="subtitle"
              dangerouslySetInnerHTML={{ __html: heroData.description }}
            ></Typography>
          </div>
        </Container>
      </Section>
      <CardsSection>
        <Container maxWidth="xl" className="cards-wrapper">
          {cards}
        </Container>
      </CardsSection>
    </>
  );
}

const Section = styled.section`
  border-top: 1px solid var(--dark-outline-variant);
  border-bottom: 1px solid var(--dark-outline-variant);
  padding: 180px 0 40px 0;
  background: var(--black);
  @media (max-width: 1020px) {
    padding: 80px 0 40px 0;
  }
  .title-wrapper {
    max-width: 800px;
    margin: 0 auto 0 0;
    .subtitle {
      margin-top: 16px !important;
    }
  }
  .cards-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    @media (max-width: 1300px) {
      gap: 16px;
    }
    @media (max-width: 950px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
    gap: 32px;
    margin-top: 40px;
  }
`;
const CardsSection = styled.section`
  padding: 80px 0;
  .cards-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    @media (max-width: 820px) {
      grid-template-columns: 1fr;
    }
  }
`;
