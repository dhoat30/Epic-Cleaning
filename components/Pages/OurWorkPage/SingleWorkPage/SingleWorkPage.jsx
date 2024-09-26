"use client";
import JustImageHero from "@/components/UI/Hero/JustImageHero";
import React from "react";
import ProjectTitleSection from "./ProjectTitleSection";
import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import ProjectResults from "./ProjectResults";
import SiteLink from "./SiteLink";
import BeforeAfter from "./BeforeAfter";
import SingleProjectContentSections from "./SingleProjectContentSections";
import TechStack from "./TechStack";
import SubNav from "@/components/UI/Header/SubNav/SubNav";
export default function SingleWorkPage({ data, techLogos }) {
  const heroData = {
    desktopImage: data?.acf.hero_section.graphic.desktop,
  };
  const projectTitleSectionData = {
    title: data?.acf?.hero_section.title,
    services: data?.acf.services_offered,
  };
  const siteLinkData = {
    label: data?.acf.website_information.website_name,
    link: data?.acf.website_information.link,
  };
  const beforeAfterData = {
    beforeImage: data?.acf.before_after_image.before_image,
    afterImage: data?.acf.before_after_image.after_image,
  };
  const singleProjectContentSectionsDataArr = data.acf.content_layout;
  const resultsDataArr = data.acf.results;
  const techStackDataArr = data.acf.tech_stack;

  // Check if content_layout is defined and is an array before filtering
  const subNavDataArr =
    data?.acf?.content_layout && Array.isArray(data.acf.content_layout)
      ? data.acf.content_layout.filter((item) =>
          item.acf_fc_layout.includes("phase")
        )
      : [];

  return (
    <>
      <SubNav dataArr={subNavDataArr} />
      <JustImageHero desktopImage={heroData.desktopImage} />
      <ProjectTitleSection
        title={projectTitleSectionData.title}
        services={projectTitleSectionData.services}
      />
      <ContainerStyled className="row " maxWidth="xl">
        <div className="content-wrapper">
          <SiteLink data={siteLinkData} />
          <BeforeAfter data={beforeAfterData} />
          <SingleProjectContentSections
            dataArr={singleProjectContentSectionsDataArr}
          />
        </div>
        <div className="results-wrapper" id="results">
          <ProjectResults data={resultsDataArr} />
          <TechStack dataArr={techStackDataArr} techLogos={techLogos} />
        </div>
      </ContainerStyled>
    </>
  );
}
const ContainerStyled = styled(Container)`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 40px;
  align-items: start;

  .content-wrapper {
    grid-column: 1 / span 8;
  }
  .results-wrapper {
    grid-column: 9 / span 4;
    border-left: 1px solid #47464f;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  @media (max-width: 1080px) {
    display: block;

    .results-wrapper {
      border-left: none;
    }
  }
`;
