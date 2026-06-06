"use client";
import styles from "./HtmlPageTemplate.module.scss";
import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
export default function HtmlPageTemplate({ pageData }) {
  return (
    <Paper elevation={1}>
      <ContainerStyled maxWidth="xl">
        <Box className="title">
          <Typography variant="h2" component="h1" color="white">
            {pageData.title.rendered}
          </Typography>
        </Box>
        <Box className="content">
          <Typography
            variant="body1"
            component="div"
            dangerouslySetInnerHTML={{ __html: pageData.content.rendered }}
          ></Typography>
        </Box>
      </ContainerStyled>
    </Paper>
  );
}
const ContainerStyled = ({ className = "", ...props }) =>
  React.createElement(Container, {
    ...props,
    className: `${styles.containerStyled} ${className}`.trim(),
  });
