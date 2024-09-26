"use client";
import React from "react";
import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
export default function HtmlPageTemplate({ pageData }) {
  if (!pageData) return null;
  return (
    <Paper elevation={1} style={{ background: "var(--black)" }}>
      <ContainerStyled maxWidth="lg">
        <Box className="title">
          <Typography variant="h2" component="h1" color="var(--white)">
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
const ContainerStyled = styled(Container)`
  padding-top: 80px;
  padding-bottom: 80px;
  h1 {
    color: var(--white);
  }
  .content {
    color: var(--white);
    strong {
      color: var(--white);
    }
    h2 {
      font-size: 2rem;
      margin-bottom: 8px;
      margin-top: 40px;
      color: var(--white);
    }
    h3 {
      font-size: 1.5rem;
      margin-top: 40px;
    }
    p {
      color: var(--white);
    }
  }
`;
