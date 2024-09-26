"use client";
import WorkCard from "@/components/UI/Card/WorkCard";
import CategoryTopFilter from "@/components/UI/Filters/CatgoryTopFilter";
import CenterAlignHero from "@/components/UI/Hero/CenterAlignHero";
import React from "react";
import Container from "@mui/material/Container";
import TechLogos from "@/components/UI/TechLogos/TechLogos";
import FooterCta from "@/components/UI/CTA/FooterCta";

export default function OurWorkPage({
  pageData,
  projectsData,
  categoryData,
  techLogos,
}) {
  const heroData = {
    subtitle: pageData.acf.hero_section.subtitle,
    title: pageData.acf.hero_section.title,
    description: pageData.acf.hero_section.description,
    desktopImage: pageData.acf.hero_section.graphic.desktop,
    mobileImage: pageData.acf.hero_section.graphic.mobile,
    ctaLabel: pageData.acf.hero_section.cta.label,
    ctaLink: pageData.acf.hero_section.cta.url,
  };
  // projects cards
  const projectCards = projectsData.map((item, index) => {
    return (
      <WorkCard
        key={index}
        title={item.title.rendered}
        image={item.acf.hero_section.graphic.desktop}
        ctaLabel="View now"
        ctaLink={`/our-work/${item.slug}`}
      />
    );
  });
  return (
    <>
      <CenterAlignHero data={heroData} />
      {/* <CategoryTopFilter data={categoryData} /> */}
      <Container className="row " maxWidth="xl">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "32px",
            margin: "40px 0 80px 0",
          }}
        >
          {projectCards}
        </div>
      </Container>
      <TechLogos data={techLogos} />
      <FooterCta />
    </>
  );
}
