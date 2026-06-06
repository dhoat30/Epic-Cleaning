"use client";
import styles from "./CardsTemplate.module.scss";

import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import BlogCard from "../Card/BlogCard";

export default function CardsTemplate({
  cardsDataArr,
  heroData,
  oneByOneAspectRatio,
  searchQuery,
}) {
  if (!cardsDataArr || !heroData) return null;
  const normalizedSearchQuery = searchQuery?.trim().toLowerCase();
  const visibleCards = normalizedSearchQuery
    ? cardsDataArr.filter((item) => {
        const searchableText = [
          item.title,
          item.description,
          item.authorFirstName,
          item.authorLastName,
          ...(item.categoryDetails || []).map((category) => category.name),
        ]
          .filter(Boolean)
          .join(" ")
          .replace(/<[^>]*>/g, " ")
          .toLowerCase();

        return searchableText.includes(normalizedSearchQuery);
      })
    : cardsDataArr;

  const cards = visibleCards.map((item, index) => {
    return (
      <BlogCard
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
        categoryDetails={item.categoryDetails}
      />
    );
  });
  return (
    <>
      <Section>
        <Container maxWidth="xl">
          <div className="title-wrapper">
            <Typography variant="h2" component="h1" align="center">
              {heroData.title}
            </Typography>
            <Typography
              align="center"
              variant="body1"
              component="div"
              className="subtitle mt-24"
              dangerouslySetInnerHTML={{ __html: heroData.description }}
            ></Typography>
          </div>
        </Container>
      </Section>
      <CardsSection>
        <Container maxWidth="xl" className="cards-wrapper">
          {cards.length ? (
            cards
          ) : (
            <Typography variant="body1" component="p" className="empty-state">
              No posts found.
            </Typography>
          )}
        </Container>
      </CardsSection>
    </>
  );
}

const Section = ({ className = "", ...props }) =>
  React.createElement("section", {
    ...props,
    className: `${styles.section} ${className}`.trim(),
  });
const CardsSection = ({ className = "", ...props }) =>
  React.createElement("section", {
    ...props,
    className: `${styles.cardsSection} ${className}`.trim(),
  });
