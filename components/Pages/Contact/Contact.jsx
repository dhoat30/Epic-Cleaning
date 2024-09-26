"use client";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
import styled from "@emotion/styled";
import TechLogos from "@/components/UI/TechLogos/TechLogos";

import dynamic from "next/dynamic";

const ContactForm = dynamic(() => import("@/components/UI/Forms/ContactForm"));
export default function Contact({ pageData, techLogos }) {
  return (
    <>
      <ContainerStyled maxWidth="xl" className="row">
        <Box>
          <Typography variant="h2" component="h1" color="white">
            {pageData.acf.hero_section.title}
          </Typography>
          <Typography variant="h6" component="h2" sx={{ marginTop: "16px" }}>
            {pageData.acf.hero_section.description}
          </Typography>
        </Box>
        <Paper className="contact-form-wrapper" variant="outlined">
          <ContactForm />
        </Paper>
      </ContainerStyled>
      <TechLogos data={techLogos} />
    </>
  );
}
const ContainerStyled = styled(Container)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 40px;
    padding-top: 80px;
    padding-bottom: 40px;
  }
  @media (max-width: 600px) {
    padding: 80px 0 40px 0;
  }
  gap: 80px;
  padding-top: 80px;
  padding-bottom: 80px;
  .contact-form-wrapper {
    padding: 0 16px;
    border-radius: 16px;
    background: var(--black);
    min-height: 563px;
  }
`;
