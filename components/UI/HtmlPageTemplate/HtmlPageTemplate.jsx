"use client";
import styles from "./HtmlPageTemplate.module.scss";
import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import BreadcrumbHero from "../Hero/BreadcrumbHero";
export default function HtmlPageTemplate({ pageData }) {
  if (!pageData) return null;
  return (
    <>
      <BreadcrumbHero title={pageData.title.rendered} />
      <ContainerStyled maxWidth="lg">
        <Box className="content">
          <Typography
            className="body1"
            variant="body1"
            component="div"
            dangerouslySetInnerHTML={{ __html: pageData.content.rendered }}
          ></Typography>
        </Box>
      </ContainerStyled>
    </>
  );
}
const TitleWrapper = ({ className = "", ...props }) =>
  React.createElement("div", {
    ...props,
    className: `${styles.titleWrapper} ${className}`.trim(),
  });
const ContainerStyled = ({ className = "", ...props }) =>
  React.createElement(Container, {
    ...props,
    className: `${styles.containerStyled} ${className}`.trim(),
  });
