import React from "react";
import styles from "./ZigZagCardsSection.module.scss";
import Container from "@mui/material/Container";
import CenterAlignHeadings from "../../Headings/CenterAlignHeadings";
import Image from "next/image";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export default function ZigZagCardsSection({ title, subtitle, cards }) {
  if (!cards) return null;

  const cardsJSX = cards.map((card, index) => {
    return (
      <div key={index} className="card">
        <div className="image-wrapper" style={{ paddingBottom: "500px" }}>
          <Image
            src={card.image.url}
            alt={card.image.alt}
            fill
            sizes="(max-width: 1100px) 100vw, 50vw"
          />
        </div>
        <div className="content-wrapper">
          <Typography variant="h6" component="div" className="subtitle">
            {card.content.subtitle}
          </Typography>
          <Typography variant="h4" component="h3" className="title">
            {card.content.title}
          </Typography>

          {/* set html dangerously  */}
          <div
            className="description body1"
            dangerouslySetInnerHTML={{ __html: card.content.description }}
          />
          {card.cta_group.cta && (
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
    <Section id="who-we-serve">
      <Container maxWidth="xl" className="container">
        <CenterAlignHeadings title={title} subtitle={subtitle} />
        <div className="cards-wrapper">{cardsJSX}</div>
      </Container>
    </Section>
  );
}
const Section = ({ className = "", ...props }) =>
  React.createElement("section", {
    ...props,
    className: `${styles.section} ${className}`.trim(),
  });
