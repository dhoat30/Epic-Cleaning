import React from "react";
import Image from "next/image";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import MoveOutCleaningQuoteForm from "./MoveOutCleaningQuoteForm";
import BeforeAfterResults from "./BeforeAfterResults";
import styles from "./MoveOutCleaningQuotePage.module.scss";

const benefits = [
  {
    title: "End-of-tenancy detail clean",
    description: "Kitchen, bathrooms, skirting, surfaces, and move-out touch points.",
  },
  {
    title: "Carpet shampoo available",
    description: "Add carpet cleaning to the same quote so the whole job is handled once.",
  },
  {
    title: "Fast Tauranga availability",
    description: "Ideal when keys, inspections, or settlement dates are coming up quickly.",
  },
  {
    title: "Insured, certified team",
    description: "Locally owned cleaners with professional gear and IICRC training.",
  },
];

const steps = [
  "Tell us the property size",
  "Choose carpet shampoo if needed",
  "Get a clear quote fast",
];

export default function MoveOutCleaningQuotePage({
  beforeAfterItems = [],
  accreditations = [],
  stats,
  phoneNumber,
}) {
  const propertiesCleaned =
    stats?.items?.find((item) => item.label?.toLowerCase().includes("properties"))
      ?.value || "1150+";
  const rating =
    stats?.items?.find((item) => item.label?.toLowerCase().includes("rating"))
      ?.value || "4.9";

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Container maxWidth="xl" className={styles.container}>
          <div className={`${styles.heroGrid} grid gap-48`}>
            <div className={styles.contentColumn}>
              {/* <span className="section-eyebrow">Move-out cleaning · Tauranga</span> */}

              <div className={`${styles.title} heading1`}>
                <h1>
                  Move-Out &amp; Move-In Cleaning <strong>Quotes</strong>
                </h1>
              </div>

              <Typography
                variant="h5"
                component="p"
                className={`${styles.description} mt-16`}
              >
                Get a fast, no-obligation quote for end-of-tenancy, move-in, and
                carpet shampoo cleaning across Tauranga and the Bay of Plenty.
              </Typography>

              <div className={`${styles.benefitList} grid gap-16 mt-32`}>
                {benefits.map((benefit) => (
                  <div className={styles.benefitItem} key={benefit.title}>
                    <span className={styles.checkIcon}>
                      <CheckRoundedIcon aria-hidden="true" />
                    </span>
                    <div className={styles.benefitCopy}>
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

              <div className={`${styles.proofGrid} grid gap-16 mt-32`}>
                <div className={styles.processCard}>
                  <Typography
                    variant="overline"
                    component="p"
                    className={styles.cardEyebrow}
                  >
                    Simple quote process
                  </Typography>
                  <ol className={`${styles.stepList} grid gap-16 mt-16`}>
                    {steps.map((step, index) => (
                      <li key={step}>
                        <span>{index + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className={styles.equipmentCard}>
                  <Image
                    src="/epic-cleaning-machines.jpg"
                    alt="Epic Cleaning professional cleaning equipment"
                    fill
                    sizes="(max-width: 900px) 100vw, 380px"
                  />
                  <div className={styles.equipmentOverlay}>
                    <Typography variant="subtitle1" component="p">
                      Professional equipment for carpets, floors, kitchens, and
                      bathrooms.
                    </Typography>
                  </div>
                </div>
              </div>

              <div className={`${styles.statsStrip} flex flex-wrap gap-16 mt-24`}>
                <Typography variant="subtitle1" component="span">
                  <StarBorderRoundedIcon aria-hidden="true" />
                  {rating}★ · 90+ reviews
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

            <aside className={styles.formCard} aria-label="Move-out cleaning quote form">
              <div className={styles.formHeader}>
                <Typography variant="h4" component="h2" className={styles.formTitle}>
                  Request your move-out quote
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  className={`${styles.formDescription} mt-8`}
                >
                  We will respond quickly with the next available booking options.
                </Typography>
              </div>
              <MoveOutCleaningQuoteForm phoneNumber={phoneNumber} />
            </aside>
          </div>
        </Container>
      </section>

      <BeforeAfterResults items={beforeAfterItems} />

      <section className={styles.trustSection}>
        <Container maxWidth="xl" className={styles.container}>
          <div className={`${styles.trustGrid} grid gap-24`}>
            <div className={styles.trustCopy}>
              <Typography
                variant="overline"
                component="p"
                className={styles.cardEyebrow}
              >
                Why Epic Cleaning
              </Typography>
              <Typography variant="h3" component="h2" className={styles.trustTitle}>
                One team for the clean, carpets, and final detail.
              </Typography>
              <Typography
                variant="body1"
                component="p"
                className={`${styles.trustDescription} mt-12`}
              >
                Move-out cleans often need more than a quick wipe down. Epic
                Cleaning brings trained cleaners, professional carpet equipment,
                and insured service so the job is handled properly before the
                next inspection or handover.
              </Typography>
            </div>

            <div className={`${styles.trustCards} grid gap-16`}>
              <div className={styles.trustCard}>
                <GppGoodOutlinedIcon aria-hidden="true" />
                <span>$10M insured</span>
              </div>
              <div className={styles.trustCard}>
                <VerifiedOutlinedIcon aria-hidden="true" />
                <span>IICRC certified</span>
              </div>
              <div className={styles.trustCard}>
                <AccessTimeRoundedIcon aria-hidden="true" />
                <span>Fast response</span>
              </div>
            </div>

            <div className={styles.accreditationCard}>
              <Typography
                variant="overline"
                component="p"
                className={styles.cardEyebrow}
              >
                Certified &amp; accredited
              </Typography>
              <div className={`${styles.accreditationLogos} flex flex-wrap gap-8 mt-16`}>
                {accreditations?.map((item, index) => {
                  const image = item.image || item.certification_image;

                  if (!image?.url) return null;

                  return (
                    <div
                      className={styles.accreditationLogo}
                      key={`${image.url}-${index}`}
                    >
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
          </div>
        </Container>
      </section>
    </main>
  );
}
