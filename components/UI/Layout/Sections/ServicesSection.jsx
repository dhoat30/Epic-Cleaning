import React from "react";
import styles from "./ServicesSection.module.scss";
import Container from "@mui/material/Container";
import Image from "next/image";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import OutlinedDarkButton from "../../Buttons/OutlinedDarkButton";

export default function ServicesSection({
  title,
  subtitle,
  description,
  cards,
  sectionCtaGroup,
}) {
  if (!cards) return null;

  const cardsJSX = cards.map((card, index) => {
    return (
      <div key={index} className="card">
        <div className="content-wrapper">
          {card?.subtitle && (
            <Typography variant="h6" component="div" className="subtitle">
              {card?.subtitle}
            </Typography>
          )}

          <Typography variant="h4" component="h3" className="title">
            {card?.title}
          </Typography>

          {/* set html dangerously  */}
          <div
            className="description body1"
            dangerouslySetInnerHTML={{ __html: card?.description }}
          />
          {card?.cta_group?.cta && (
            <Link href={card.cta_group.cta.url} className="cta">
              <Button variant={card.cta_group.cta_type} color="primary">
                {card.cta_group.cta.title}
              </Button>
            </Link>
          )}
        </div>
      </div>
    );
  });
  return (
    <Section id="our-services">
      <Container maxWidth="xl" className="container">
        <div className="title-wrapper">
          <Typography variant="h5" component="div" className="subtile">
            {subtitle}
          </Typography>
          <Typography variant="h2" component="h2" className="title">
            {title}
          </Typography>
          {/* set html dangerously  */}
          <div
            className="description body1"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
        {/* cards */}
        <div className="cards-wrapper">
          {sectionCtaGroup?.cta && (
            <div className="section-cta">
              <Link href={sectionCtaGroup.cta.url}>
                <Button variant="contained">{sectionCtaGroup.cta.title}</Button>
              </Link>
            </div>
          )}
          {cardsJSX}
        </div>
      </Container>
    </Section>
  );
}
const Section = ({ className = "", ...props }) =>
  React.createElement("section", {
    ...props,
    className: `${styles.section} ${className}`.trim(),
  });
