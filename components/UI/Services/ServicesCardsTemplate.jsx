"use client";
import styles from "./ServicesCardsTemplate.module.scss";
import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ServiceCard from "../Card/ServiceCard";
export default function ServicesCardsTemplate({
  subtitle,
  title,
  description,
  cards,
  archivePageSlug,
}) {
  if (!cards.length > 0) return null;

  const serviceCards = cards.map((item, key) => {
    return (
      <ServiceCard
        key={key}
        cta={{
          label: "LEARN MORE",
          link: `/${archivePageSlug}/${item.slug}`,
        }}
        image={item.acf.hero_section.image}
        title={item.title.rendered}
        description={item.excerpt?.rendered}
      />
    );
  });
  return (
    <Section className="mt-8">
      <Container maxWidth="xl">
        {subtitle && (
          <Typography component="h3" variant="h3" className="subtitle">
            {subtitle}
          </Typography>
        )}

        <div className="title-row">
          <Typography
            variant="h2"
            component="h2"
            className="title"
            align="center"
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            className="description"
            align="center"
          >
            {description}
          </Typography>
        </div>
        <div className="cards-wrapper mt-32">{serviceCards} </div>
      </Container>
    </Section>
  );
}

const Section = ({ className = "", ...props }) =>
  React.createElement("section", {
    ...props,
    className: `${styles.section} ${className}`.trim(),
  });
