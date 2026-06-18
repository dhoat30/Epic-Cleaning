import styles from "./Copyright.module.scss";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React from "react";

export default function Copyright() {
  return (
    <PaperStyle>
      <Container maxWidth="xl">
        <div className={`${styles.contentWrapper} flex justify-between align-center gap-24`}>
          <div className={`${styles.copyrightWrapper} flex flex-wrap align-center`}>
            <Typography variant="body1" component="span">
              © {new Date().getFullYear()} Epic Cleaning. All rights reserved.
            </Typography>
            <a href="https://webduel.co.nz" rel="nofollow" target="_blank" className={styles.creditLink}>
              <Typography variant="body1" component="span">
                Designed &amp; developed by <strong>WebDuel</strong>
              </Typography>
            </a>
          </div>
          <div className={`${styles.policyLinks} flex flex-wrap align-center`}>
            <Link href="/privacy-policy" className={styles.policyLink}>
              <Typography variant="body1" component="span">
                Privacy policy
              </Typography>
            </Link>
            <Link href="/terms-and-conditions" className={styles.policyLink}>
              <Typography variant="body1" component="span">
                Terms and conditions
              </Typography>
            </Link>
          </div>
        </div>
      </Container>
    </PaperStyle>
  );
}
const PaperStyle = ({ className = "", ...props }) =>
  React.createElement("div", {
    ...props,
    className: `${styles.paperStyle} ${className}`.trim(),
  });
