import styles from "./Copyright.module.scss";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React from "react";

export default function Copyright() {
  return (
    <PaperStyle>
      <Container maxWidth="xl" className="content-wrapper">
        <div className="copyright-wrapper">
          <Typography variant="body1" component="span">
            © {new Date().getFullYear()} Epic Cleaning. All rights reserved
          </Typography>
          <a href="https://webduel.co.nz" rel="nofollow" target="_blank">
            <Typography variant="body1" component="span">
              Designed & Developed by web<strong>duel</strong>
            </Typography>
          </a>
        </div>
        <div className="policy-links">
          <Link href="/privacy-policy">
            <Typography variant="body1" component="span">
              Privacy Policy
            </Typography>
          </Link>
          <Link href="/terms-and-conditions">
            <Typography variant="body1" component="span">
              Terms and Conditions
            </Typography>
          </Link>
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
