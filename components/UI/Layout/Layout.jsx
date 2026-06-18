// "use client";
import React from "react";
import ZigZagCardsSection from "./Sections/ZigZagCardsSection";
import RowSection from "./Sections/RowSection";
import ServicesSection from "./Sections/ServicesSection";
import RegularProcess from "./Sections/Process/RegularProcess";
import ProjectsSection from "./Sections/ProjectsSection";

import ServiceTabs from "./Sections/ServiceTabs";
import Packages from "./Sections/Packages";
import FaqAccordionSection from "./Sections/FaqAccordionSection/FaqAccordionSection";
import ServiceChecklist from "./Sections/ServiceChecklist";
import ProblemChecklistSection from "./Sections/ProblemChecklistSection/ProblemChecklistSection";
import EditorialServices from "./Sections/EditorialServices/EditorialServices";
import LargeCardsCarousel from "./Sections/LargeCardsCarousel/LargeCardsCarousel";
import OptimizedHero from "../Hero/OptimizedHero/OptimizedHero";
import TextRow from "./Sections/TextRow/TextRow";
import TechLogos from "../TechLogos/TechLogos";
import GoogleReviewsCarousel from "../GoogleReviews/GoogleReviewsCarousel";
export default function Layout({ sections, projectsData, data, options, reviewsData }) {
  if (!sections) return null;
  const sectionsJSX = sections.map((section, index) => {
    if (section.acf_fc_layout === "hero_section") {
      return (
        <React.Fragment key={index}>
          <OptimizedHero data={section} heroUSP={options?.hero_usp} />
        </React.Fragment>
      );
    }
    if (section.acf_fc_layout === "text_row") {
      return <TextRow key={index} title={section.title} description={section.description} />;
    }
    if(section.acf_fc_layout === "show_client_logos") { 
      return  <TechLogos data={options.clients_logos} />
    }
     if(section.acf_fc_layout === "show_google_reviews") { 
      return  <GoogleReviewsCarousel data={reviewsData}/>
    }
    if (section.acf_fc_layout === "zigzag_cards") {
      return (
        <ZigZagCardsSection
          key={index}
          title={section.title}
          subtitle={section.subtitle}
          cards={section.cards}
        />
      );
    }
    if (section.acf_fc_layout === "row") {
      return (
        <RowSection
          key={index}
          subtitle={section.subtitle}
          title={section.title}
          description={section.description}
          imageAlignment={section.image_alignment}
          image={section.image}
          ctaGroup={section.cta_group}
          bulletPoints={section.bullet_points}
          showBeforeAfterImages={section.show_before_after_images}
          beforeImage={
            section.show_before_after_images &&
            section.before_after_images.before_image
          }
          afterImage={
            section.show_before_after_images &&
            section.before_after_images.after_image
          }
        />
      );
    }
    if (section.acf_fc_layout === "services") {
      return (
        <ServicesSection
          key={index}
          title={section.title}
          subtitle={section.subtitle}
          description={section.description}
          cards={section.card}
          sectionCtaGroup={section.cta_group}
        />
      );
    }
    if (section.acf_fc_layout === "process") {
      return (
        <RegularProcess
          key={index}
          subtitle={section.subtitle}
          title={section.title}
          description={section.description}
          cards={section.cards}
          ctaLink={section.cta_link}
          ctaNote={section.cta_note || section.note}
        />
      );
    }

    if (section.acf_fc_layout === "projects") {
      return (
        <ProjectsSection
          key={index}
          title={section.title}
          subtitle={section.subtitle}
          description={section.description}
          cards={section.select_projects}
          projectsData={projectsData}
        />
      );
    }

    if (section.acf_fc_layout === "services_tab") {
      return (
        <ServiceTabs
          key={index}
          title={section.title}
          description={section.description}
          cards={section.cards}
        />
      );
    }

    if (section.acf_fc_layout === "packages") {
      return (
        <Packages
          key={index}
          serviceName={section.service_name}
          title={section.title}
          packagesArray={section.package}
          termsAndConditions={section.terms_conditions}
        />
      );
    }
    if (section.acf_fc_layout === "local_faq") {
      return (
        <FaqAccordionSection
          key={index}
          title={section.section_title}
          description={section.section_description}
          qaData={section.items}
        />
      );
    }
    if (section.acf_fc_layout === "service_checklist") {
      return (
        <ServiceChecklist
          key={index}
          title={section.title}
          description={section.description}
          cards={section.items}
        />
      );
    }
    if (section.acf_fc_layout === "problem_checklist_section") {
      return (
        <ProblemChecklistSection
          key={index}
          subtitle={section.subtitle}
          title={section.title}
          description={section.description}
          checklistCard={section.checklist_card}
          topCard={section.top_card}
          bottomCard={section.bottom_card}
          pivotCard={section.pivot_card}
        />
      );
    }
    if (section.acf_fc_layout === "editorial_services_section") {
      return (
        <EditorialServices
          key={index}
          eyebrowText={section.eyebrow_text}
          title={section.title}
          description={section.description}
          cards={section.cards}
        />
      );
    }
    if (section.acf_fc_layout === "large_cards_section") {
      return (
        <LargeCardsCarousel
          key={index}
          title={section.title}
          description={section.description}
          cards={section.cards}
        />
      );
    }
  });

  return <div>{sectionsJSX} </div>;
}
