"use client";
import React from "react";
import styles from "./BreadcrumbHero.module.scss";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
export default function BreadcrumbHero({
  title,
  description,
  showBreadcrumb = true,
}) {
  return (
    <TitleWrapper className="title-wrapper ">
      <Container maxWidth="lg" className="Container">
        {showBreadcrumb && <BreadCrumb className="justify-center" />}

        <div className="title">
          <Typography variant="h2" component="h1">
            {title}
          </Typography>
          <Typography variant="body1" component="p" className="mt-16">
            {description}
          </Typography>
        </div>
      </Container>
    </TitleWrapper>
  );
}

const TitleWrapper = ({ className = "", ...props }) =>
  React.createElement("div", {
    ...props,
    className: `${styles.titleWrapper} ${className}`.trim(),
  });
