import styles from "./FooterCta.module.scss";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import Link from "next/link";
import React from "react";

export default function FooterCta({ title, description, cta }) {
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE;
  const phoneHref = phoneNumber?.replace(/[^\d+]/g, "");
  const trustItems = [
    { icon: <GppGoodOutlinedIcon />, label: "$5M insured" },
    { icon: <StarBorderRoundedIcon />, label: "4.9★ rating · 90+ reviews" },
    { icon: <AccessTimeRoundedIcon />, label: "Quote in 24hrs" },
    { icon: <PlaceOutlinedIcon />, label: "Locally owned" },
  ];

  return (
    <Section component="section">
      <Container maxWidth="xl" className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.contentWrapper}>
        
                <div
          className={`${styles.title} heading2 mt-16`}
          dangerouslySetInnerHTML={{ __html: title }}
        />
            <Typography
              component="p"
              variant="h5"
              className={`${styles.description} mt-16`} 
             color="var(--dark-on-surface-variant)"
            >
              {description}
            </Typography>


            <div className={`${styles.buttonWrapper} flex justify-center gap-16 mt-40`}>
              {cta?.url && (
              <Link href={cta.url}>
                <Button
                  size="large"
                  variant="contained"
                  className={styles.button}
                  endIcon={<ArrowForwardRoundedIcon />}
                >
                  {cta.title}
                </Button>
              </Link>
              )}

              {phoneNumber && (
                <Link href={`tel:${phoneHref}`} className={styles.phoneLink}>
                  <Button
                    size="large"
                    variant="outlined"
                    className={styles.phoneButton}
                    startIcon={<PhoneRoundedIcon />}
                  >
                    {phoneNumber}
                  </Button>
                </Link>
              )}
            </div>
          </div>
          <div className={`${styles.trustStrip} flex justify-center `} >
            {trustItems.map((item) => (
              <div className={styles.trustItem} key={item.label}>
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function HighlightedTitle({ title }) {
  const highlightText = "Spotless Space";

  if (!title?.includes(highlightText)) {
    return title;
  }

  const [before, after] = title.split(highlightText);

  return (
    <>
      {before}
      <span>{highlightText}</span>
      {after}
    </>
  );
}

const Section = ({ className = "", ...props }) =>
  React.createElement(Box, {
    ...props,
    className: `${styles.section} ${className}`.trim(),
  });
