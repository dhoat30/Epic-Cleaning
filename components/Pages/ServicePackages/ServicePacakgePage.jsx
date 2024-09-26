"use client";
import ServicePackageCard from "@/components/UI/Card/ServicePackageCard";
import CenterAlignHeroTop from "@/components/UI/Hero/CenterAlignHeroTop";

import styled from "@emotion/styled";
import Container from "@mui/material/Container";

export default function ServicePackagePage({ pageData, servicesPackagesData }) {
  console.log(servicesPackagesData);
  const heroData = {
    desktopImage: pageData.acf.hero_section.graphic.desktop,
    mobileImage: pageData.acf.hero_section.graphic.mobile,
    title: pageData.acf.hero_section.title,
  };

  const servicePackages = servicesPackagesData?.map((item, index) => {
    console.log(item);
    return (
      <ServicePackageCard
        className="card"
        key={index}
        title={item.acf.hero_section.title}
        description={item.acf.hero_section.description}
        price={item.acf.cta_section.service_price}
        ctaLabel={"Learn more"}
        ctaLink={`/service-packages/${item.slug}`}
        image={item.acf.hero_section.image}
      />
    );
  });

  return (
    <>
      <CenterAlignHeroTop data={heroData} />
      <Section>
        <Container className="cards-wrapper" maxWidth="xl">
          {servicePackages}
        </Container>
      </Section>
    </>
  );
}
const Section = styled.section`
  padding: 80px 0;
  .cards-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;
