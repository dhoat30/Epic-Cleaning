"use client";
import styles from "./ProjectsSection.module.scss";
import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "@/utils/themeSettings";
import Image from "next/image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Link from "next/link";
export default function ProjectsSection({
  title,
  subtitle,
  description,
  cards,
  projectsData,
}) {
  // filter all projects with the selected projects
  const projectsDataArr = projectsData.filter((project) =>
    cards.includes(project.id)
  );

  const cardsJSX = projectsDataArr.map((card, index) => {
    return (
      <Link
        className={`card card-${index + 1}`}
        key={index}
        href={`/projects/${card.slug}`}
      >
        <div className="image-wrapper">
          <Image
            src={card.acf.gallery[0].url}
            alt={
              card.acf.gallery[0].alt
                ? card.acf.gallery[0].alt
                : card.title.rendered
            }
            fill
            priority={true}
            sizes="100vw"
            className="hero-image"
          />
        </div>
        <div className="content-wrapper">
          <Typography variant="subtitle1" component="h4" className="title">
            {card.title.rendered}
          </Typography>
          <Typography variant="subtitle1" component="p" className="description">
            <LocationOnIcon className={styles.locationIcon} />
            {card.acf.location}
          </Typography>
        </div>
      </Link>
    );
  });
  return (
    <ThemeProvider theme={lightTheme}>
      <Section>
        <Container maxWidth="xl">
          <div className="subtitle-row">
            <Typography component="h3" variant="h3" className="subtitle">
              {subtitle}
            </Typography>
          </div>
          <div className="title-row">
            <Typography variant="h2" component="h2" className="title">
              {title}
            </Typography>
            <Typography variant="h5" component="p" className="subtitle">
              {description}
            </Typography>
          </div>

          <div className="cards">{cardsJSX}</div>
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
