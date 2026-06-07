"use client";

import Image from "next/image";
import Typography from "@mui/material/Typography";
import styles from "./Hero.module.css";
import Container from "@mui/material/Container";
export default function AccreditationStrip({ accreditations }) {
  if (!accreditations?.length) return null;

  return (
    <Container maxWidth="xl">
      <div className={styles.accreditationStrip} >
      <Typography
        component="h2"
        variant="subtitle1"
        className={styles.accreditationTitle}
        style={{ lineHeight: "110%", fontWeight: 600 }}
      >
        Certified & accredited
      </Typography>
      <div className={styles.accreditationLogos}>
        {accreditations.map((item, index) => (
          <div className={styles.accreditationItem} key={index}>
            <Image
              src={item.image.url}
              alt={item.image.alt || "Epic Cleaning accreditation"}
              width={item.image.width}
              height={item.image.height}
            />
            <Typography
              component="p"
              variant="body2"
              className={styles.accreditationCaption}
            >
              {item.image.alt || "Accredited cleaning provider"}
            </Typography>
          </div>
        ))}
      </div>
      </div>
    </Container>
  );
}
