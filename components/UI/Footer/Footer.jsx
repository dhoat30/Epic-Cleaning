"use client";
import styles from "./Footer.module.scss";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import NewsletterForm from "../Forms/NewsletterForm";
import { services, commercialLinks, informationLinks } from "./FooterLinks";
import Copyright from "./Copyright";
import ContactInfo from "./ContactInfo";
import FooterCta from "../CTA/FooterCta";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function AccordionCol({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${styles.linksCol} ${open ? styles.isOpen : ""}`}>
      <button
        className={styles.accordionTrigger}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <Typography variant="overline" component="span" className={styles.colHeading}>
          {title}
        </Typography>
        <span className={styles.accordionIcon}>
          {open ? <RemoveIcon fontSize="small" /> : <AddIcon fontSize="small" />}
        </span>
      </button>
      <div className={styles.accordionBody}>
        {children}
      </div>
    </div>
  );
}

export default function Footer({
  footerCtaData,
  showFooterCta = true,
  certifications,
  contactInfo,
  socialData,
}) {
  return (
    <>
      {showFooterCta && (
        <FooterCta
          title={footerCtaData.title}
          description={footerCtaData.description}
          cta={footerCtaData.cta_link}
        />
      )}

      <footer className={styles.footer}>
        <Container maxWidth="xl">
          <div className={styles.grid}>
          {/* Column 1 — branding, certifications, newsletter (never accordion) */}
          <div className={styles.brandCol}>
            <div className={styles.certSection}>
              <Typography variant="overline" component="p" className={styles.colHeading}>
                Certifications
              </Typography>
              <div className={styles.certLogos}>
                {certifications.cards.map((item, index) => (
                  <Image
                    key={index}
                    src={item.certification_image.url}
                    alt={item.alt || "certification"}
                    width={item.certification_image.width}
                    height={item.certification_image.height}
                    className={styles.certLogo}
                  />
                ))}
              </div>
            </div>

            <div className={styles.newsletterBox}>
              <Typography variant="body2" component="p" className={styles.newsletterTitle}>
                Get cleaning tips &amp; tricks every month
              </Typography>
              <NewsletterForm
                formName="Newsletter Form"
                formType="newsletter-form"
                emailRoute={"/api/newsletter-hubspot"}
                emailTo="designer@epiccleaning.co.nz"
                btnLabel="Subscribe"
              />
            </div>
          </div>

          {/* Column 2 — Services */}
          <AccordionCol title="Services">
            <ul className={styles.linkList}>
              {services.map((link, index) => (
                <li key={index}>
                  <Link href={link.url} className={styles.navLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionCol>

          {/* Column 3 — Commercial */}
          <AccordionCol title="Commercial">
            <ul className={styles.linkList}>
              {commercialLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.url} className={styles.navLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionCol>

          {/* Column 4 — Information */}
          <AccordionCol title="Information">
            <ul className={styles.linkList}>
              {informationLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.url} className={styles.navLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionCol>

          {/* Column 5 — Contact, hours, social */}
          <AccordionCol title="Contact & Info">
            <div className={styles.contactInner}>
              <ContactInfo contactInfo={contactInfo} />

              <div className={styles.hoursSection}>
                <Typography variant="overline" component="p" className={styles.colHeading}>
                  Business Hours
                </Typography>
                <div className={styles.hoursRow}>
                  <Typography variant="body2" component="span">Mon – Sun</Typography>
                  <Typography variant="body2" component="span" className={styles.hoursTime}>7:00 AM – 6:00 PM</Typography>
                </div>
              </div>

              <div className={styles.socialSection}>
                <Typography variant="overline" component="p" className={styles.colHeading}>
                  Follow Us
                </Typography>
                <div className={styles.socialLinks}>
                  {socialData.length > 0 &&
                    socialData.map((social, index) => (
                      <Link
                        key={index}
                        aria-label={social.social_media_name}
                        href={social.link}
                        target="_blank"
                        className={styles.socialLink}
                      >
                        <Image
                          src={social.social_media_icon.url}
                          alt={social.social_media_name}
                          width={20}
                          height={20}
                        />
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </AccordionCol>
          </div>
        </Container>
      </footer>

      <Copyright />
    </>
  );
}
