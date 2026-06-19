import React from "react";
import styles from "./CommercialCleaningQuotePage.module.scss";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import Image from "next/image";
import CommercialCleaningQuoteForm from "./CommercialCleaningQuoteForm";

const fallbackHero = {
  title:
    '<h1>Get a Fixed Quote for <strong>Commercial Cleaning</strong> in 24 Hours</h1>',
  description:
    "<p>Offices, retail, restaurants, schools and more — across Tauranga and the Bay of Plenty. <strong>No 12-month contracts. No subcontracting.</strong></p>",
  subtitle: "Commercial cleaning",
};

const benefits = [
  {
    title: "Free, no-obligation site visit",
    description: "Usually booked within 24 hours",
  },
  {
    title: "IICRC-certified technicians",
    description: "$10M public liability insured",
  },
  {
    title: "No lock-in contracts",
    description: "Pause or cancel anytime",
  },
    {
    title: "Industrial-grade machinery",
    description: "Built for commercial-scale jobs",
  },
];

export default function CommercialCleaningQuotePage({
  pageData,
  accreditations,
  stats,
  phoneNumber,
}) {
  const heroSection =
    pageData?.acf?.sections?.find(
      (section) => section.acf_fc_layout === "hero_section"
    ) || fallbackHero;

  const title = heroSection.title || fallbackHero.title;
  const description = heroSection.description || fallbackHero.description;
  const subtitle = heroSection.subtitle || fallbackHero.subtitle;
  const propertiesCleaned =
    stats?.items?.find((item) => item.label?.toLowerCase().includes("properties"))
      ?.value || "1150+";
  const rating =
    stats?.items?.find((item) => item.label?.toLowerCase().includes("rating"))
      ?.value || "4.9";

  return (
    <main className={styles.page}>
      <Container maxWidth="xl" className={styles.container}>
        <section className={`${styles.heroGrid} gap-40`}>
          <div className={`${styles.contentColumn} `}>
            <span className={"section-eyebrow "}>
              No Fixed Contract
            </span>

            <div
              className={`${styles.title} heading1`}
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <div
              className={`heading5 mt-16 `}
              dangerouslySetInnerHTML={{ __html: description }}
            />

            <div className={`${styles.benefitList} mt-32`}>
              {benefits.map((benefit) => (
                <div className={styles.benefitItem} key={benefit.title}>
                  <div className={styles.checkIcon}>
                    <CheckRoundedIcon aria-hidden="true" />
                  </div>
                  <div>
                    <Typography
                      variant="subtitle1"
                      component="h2"
                      className={styles.benefitTitle}
                    >
                      {benefit.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      component="p"
                      className={styles.benefitDescription}
                    >
                      {benefit.description}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>

            <div className={`${styles.accreditationCard} grid gap-16 mt-40`}>
              <Typography
                variant="overline"
                component="p"
                className={styles.accreditationTitle}
              >
                Certified & accredited
              </Typography>
              <div className={styles.accreditationLogos}>
                {accreditations?.map((item, index) => {
                  const image = item.image || item.certification_image;

                  if (!image?.url) return null;

                  return (
                    <div className={styles.accreditationLogo} key={`${image.url}-${index}`}>
                      <Image
                        src={image.url}
                        alt={image.alt || "Epic Cleaning accreditation"}
                        width={image.width || 180}
                        height={image.height || 80}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={`${styles.statsStrip} mt-24 flex gap-16`}>
              <Typography variant="subtitle1" component="span">
                <StarBorderRoundedIcon aria-hidden="true" />
                {rating}★ on Google
              </Typography>
              <Typography variant="subtitle1" component="span">
                <BusinessRoundedIcon aria-hidden="true" />
                {propertiesCleaned} properties cleaned
              </Typography>
              <Typography variant="subtitle1" component="span">
                <PlaceOutlinedIcon aria-hidden="true" />
                Locally owned
              </Typography>
            </div>
          </div>

          <aside className={styles.formCard} aria-label="Request a quote form">
            <div className={styles.formHeader}>
              <Typography variant="h4" component="h2" className={styles.formTitle}>
                Request your free quote
              </Typography>
              <Typography
                variant="body1"
                component="p"
                className={`${styles.formDescription} mt-8`}
              >
                We'll respond within 24 hours, usually faster.
              </Typography>
            </div>
            <CommercialCleaningQuoteForm phoneNumber={phoneNumber} />
          </aside>
        </section>
      </Container>
    </main>
  );
}
