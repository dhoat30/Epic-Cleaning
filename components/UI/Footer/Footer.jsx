"use client";
import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import NewsletterForm from "../Forms/NewsletterForm";
import { footerLinks } from "./FooterLinks";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHub from "@mui/icons-material/GitHub";
import YouTube from "@mui/icons-material/YouTube";
import Copyright from "./Copyright";
import ContactInfo from "./ContactInfo";
import FooterCta from "../CTA/FooterCta";
export default function Footer({ footerCtaData, showFooterCta = true }) {
  return (
    <>
      {showFooterCta && (
        <FooterCta
          title={footerCtaData.title}
          description={footerCtaData.description}
          cta={footerCtaData.cta_link}
        />
      )}

      <FooterSection>
        <ContainerStyled maxWidth="lg" className="row">
          {/* logo wrapper */}
          <div className="footer-wrapper">
            <div className="logo-wrapper">
              <Link href="/">
                <Image
                  src="/logo.png"
                  width="120"
                  height="120"
                  alt="Webduel Logo"
                />
              </Link>
              <Typography
                variant="body1"
                component="p"
                sx={{ marginTop: "16px" }}
              >
                A full-cycle digital service agency. We do from design to
                end-to-end development to maintenance.
              </Typography>
              <div className="newsletter-wrapper" style={{ marginTop: "24px" }}>
                <NewsletterForm
                  className="newsletter-form"
                  formName="Newsletter Form"
                  formType="newsletter-form"
                  emailRoute={"/api/newsletter-hubspot"}
                  emailTo="designer@webduel.co.nz"
                  btnLabel="Subscribe to newsletter"
                />
              </div>
            </div>
            <div className="footer-useful-links links-container">
              <Typography
                variant="h6"
                component="div"
                color="white"
                sx={{ marginBottom: "8px" }}
              >
                Useful Links
              </Typography>
              <div component="ul" sx={{ margin: 0, padding: 0 }}>
                {footerLinks.map((link, index) => {
                  return (
                    <li key={index}>
                      <Link href={link.url}>
                        <Typography
                          variant="body1"
                          component="span"
                          sx={{ padding: "6px 0", display: "block" }}
                        >
                          {link.label}
                        </Typography>
                      </Link>
                    </li>
                  );
                })}
              </div>
            </div>
            <div className="contact-wrapper">
              <div className="contact-section">
                <Typography
                  variant="h6"
                  component="div"
                  color="white"
                  sx={{ marginBottom: "8px" }}
                >
                  Contact
                </Typography>
                <ContactInfo />
              </div>

              <div className="social-wrapper">
                <Typography
                  variant="h6"
                  component="div"
                  color="white"
                  sx={{ marginBottom: "8px" }}
                >
                  Follow Us
                </Typography>
                <div className="social-links">
                  <Link
                    aria-label="Facebook Link"
                    href="https://www.facebook.com/webduel"
                    target="_blank"
                  >
                    <FacebookIcon sx={{ fontSize: 32, color: "#959DA5" }} />
                  </Link>
                  {/* <Link href="https://www.facebook.com/webduel">
                <Instagram sx={{ fontSize: 32, color: "#959DA5" }} />
              </Link> */}
                  <Link
                    aria-label="Youtube Link Link"
                    href="https://www.youtube.com/@webduel"
                    target="_blank"
                  >
                    <YouTube sx={{ fontSize: 32, color: "#959DA5" }} />
                  </Link>
                  <Link
                    aria-label="Github Link"
                    href="https://github.com/dhoat30"
                    target="_blank"
                  >
                    <GitHub sx={{ fontSize: 32, color: "#959DA5" }} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </ContainerStyled>
      </FooterSection>
      {/* copyright container */}
      <Copyright />
    </>
  );
}
const FooterSection = styled.section`
  padding: 40px 0;
  background: var(--light-surface-container-high);
  @media (max-width: 900px) {
    padding: 32px 0;
  }
`;
const ContainerStyled = styled(Container)`
  .footer-wrapper {
    display: grid;
    gap: 40px;
    grid-template-columns: 1fr 1fr 1fr;
    @media (max-width: 900px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
    .logo-wrapper {
      max-width: 300px;
    }
    .links-container {
      a {
        color: var(--dark-on-surface);
      }
    }
  }
  .footer-useful-links {
    a {
      &:hover {
        span {
          color: var(--dark-secondary);
        }
      }
    }
  }
  .contact-wrapper {
    /* @media (max-width: 900px) {
      grid-column: span 2;
    } */

    .social-wrapper {
      margin-top: 24px;
      .social-links {
        a {
          margin: 0 8px 0 0;
          &:hover {
            svg {
              path {
                fill: var(--dark-secondary);
              }
            }
          }
        }
      }
    }
  }
`;
