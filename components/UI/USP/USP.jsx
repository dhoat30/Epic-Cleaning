"use client";
import styles from "./USP.module.scss";
import React from "react";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
export default function USP({
  title,
  description,
  cards,
  showTitle = false,
  statsArray,
}) {
  return (
    <Section>
      <Container maxWidth="xl" className="container">
        {showTitle && (
          <div className="title-wrapper">
            <Typography variant="h2" component="h2" className="title">
              {title}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              className="description mt-16"
            >
              {description}
            </Typography>
            {statsArray && statsArray.length > 0 && (
              <div className="stats-wrapper mt-24">
                {statsArray.map((stat, index) => (
                  <div key={index} className="stat">
                    <Typography
                      variant="h2"
                      component="div"
                      className="title"
                      color="var(--dark-on-surface)"
                      align="center"
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      className="description"
                      color="var(--dark-on-surface)"
                      align="center"
                    >
                      {stat.label}
                    </Typography>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <div className="cards-wrapper">
          {cards &&
            cards.length > 0 &&
            cards.map((card, index) => (
              <div key={index} className="card">
                <Image
                  src={card.icon.url}
                  alt={card.icon.alt}
                  width="80"
                  height="80"
                  className="image"
                />
                <div className="content">
                  <Typography
                    variant="h6"
                    component="h3"
                    className="title mt-16"
                    color="var(--dark-on-surface)"
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    className="description mt-8"
                    color="var(--dark-on-surface-variant)"
                  >
                    {card.description}
                  </Typography>
                </div>
              </div>
            ))}
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
